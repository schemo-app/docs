import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

const preview = await readFile(new URL('./catalog-preview.png', import.meta.url));

const categories = [
    { id: 'audio', name: 'Audio' },
    { id: 'office', name: 'Office' },
    { id: 'travel', name: 'Travel' },
];

const products = [
    { id: 'p-101', name: 'Studio Headphones', category: 'audio', price: 129, inStock: true },
    { id: 'p-102', name: 'Compact Speaker', category: 'audio', price: 89, inStock: true },
    { id: 'p-103', name: 'Desk Lamp', category: 'office', price: 54, inStock: false },
    { id: 'p-104', name: 'Notebook Stand', category: 'office', price: 42, inStock: true },
    { id: 'p-105', name: 'Travel Case', category: 'travel', price: 32, inStock: true },
];

function json(response, status, value, headers = {}) {
    response.writeHead(status, { 'Content-Type': 'application/json', ...headers });
    response.end(JSON.stringify(value));
}

const client = { id: 'catalog-docs', secret: 'catalog-secret' };
const signingKey = 'catalog-demo-signing-key';

function base64url(value) {
    return Buffer.from(value).toString('base64url');
}

function sign(claims) {
    const head = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' })) + '.' + base64url(JSON.stringify(claims));
    return head + '.' + createHmac('sha256', signingKey).update(head).digest('base64url');
}

function verified(header) {
    const token = /^Bearer (.+)$/.exec(header ?? '')?.[1];
    const [head, body, signature] = token?.split('.') ?? [];
    if (!signature) return null;
    const expected = createHmac('sha256', signingKey).update(head + '.' + body).digest();
    const given = Buffer.from(signature, 'base64url');
    if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
    const claims = JSON.parse(Buffer.from(body, 'base64url').toString());
    return claims.exp > Date.now() / 1000 ? claims : null;
}

async function readBody(request, limit = 16_384) {
    const parts = [];
    let size = 0;
    for await (const part of request) {
        size += part.length;
        if (size > limit) throw new Error('Payload too large');
        parts.push(part);
    }
    return Buffer.concat(parts);
}

async function receiveAttachment(request, response) {
    const contentType = request.headers['content-type'];
    if (!contentType?.toLowerCase().startsWith('multipart/form-data;')) {
        return json(response, 415, { error: 'Expected multipart/form-data' });
    }

    let body;
    try {
        body = await readBody(request, 1024 * 1024);
    } catch {
        return json(response, 413, { error: 'Upload exceeds 1 MiB' });
    }

    let form;
    try {
        form = await new Response(body, { headers: { 'Content-Type': contentType } }).formData();
    } catch {
        return json(response, 400, { error: 'Could not read the multipart body' });
    }

    const label = form.get('label');
    const file = form.get('file');
    if (typeof label !== 'string' || !label.trim() || !file || typeof file === 'string' || !file.size) {
        return json(response, 400, { error: 'Expected a label and a nonempty file' });
    }

    return json(response, 200, { label, filename: file.name, bytes: file.size });
}

function clientOf(request, form) {
    const basic = /^Basic (.+)$/.exec(request.headers.authorization ?? '')?.[1];
    if (basic) {
        const [id, secret] = Buffer.from(basic, 'base64').toString().split(':');
        return { id, secret };
    }
    return { id: form.get('client_id'), secret: form.get('client_secret') };
}

// The ledger number is past 2^53 on purpose, so it has to be written out by hand.
function orderJson(id) {
    return JSON.stringify({
        id,
        orderId: '01J9Z3F7Q8M2W6V4T1R5N0KX3C',
        customer: { email: 'ada@example.com', ip: '192.168.10.24' },
        placedAt: '2026-11-14T09:30:00Z',
        updated: 1794648600,
        trackingUrl: 'https://tracking.example.com/parcels/CAT-3207',
        labelColour: '#3a7bd5',
        checksum: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        items: [
            { product: 'p-101', quantity: 1, price: 129 },
            { product: 'p-105', quantity: 2, price: 32 },
        ],
        ledgerEntry: 0,
    }).replace('"ledgerEntry":0', '"ledgerEntry":9007199254740993');
}

function productsXml() {
    const rows = products.map(product => (
        `  <product id="${product.id}" category="${product.category}" inStock="${product.inStock}">\n` +
        `    <name>${product.name}</name>\n    <price currency="USD">${product.price}</price>\n  </product>`
    ));
    return '<?xml version="1.0" encoding="UTF-8"?>\n<catalog>\n' + rows.join('\n') + '\n</catalog>\n';
}

function jsonApiProduct(product) {
    const { id, category, ...attributes } = product;

    return {
        type: 'products',
        id,
        attributes,
        relationships: { category: { data: { type: 'categories', id: category } } },
    };
}

function openApi(origin) {
    const product = {
        type: 'object',
        required: ['name', 'category', 'price'],
        properties: {
            id: { type: 'string', readOnly: true, example: 'p-101' },
            name: { type: 'string', example: 'Studio Headphones' },
            category: { type: 'string', enum: categories.map(({ id }) => id) },
            price: { type: 'number', example: 129 },
            inStock: { type: 'boolean', readOnly: true },
        },
    };
    const ok = (description, schema) => ({ description, content: { 'application/json': { schema } } });
    return {
        openapi: '3.1.0',
        info: { title: 'Catalog API', version: '1.0.0', description: 'The local demo API from the Schemo documentation.' },
        servers: [{ url: origin }],
        components: {
            schemas: { Product: product },
            securitySchemes: {
                apiKey: { type: 'apiKey', in: 'header', name: 'X-API-Key' },
                oauth: { type: 'oauth2', flows: { clientCredentials: { tokenUrl: origin + '/token', scopes: { 'orders:read': 'Read orders' } } } },
            },
        },
        paths: {
            '/products': {
                get: {
                    summary: 'List products',
                    parameters: [{ name: 'category', in: 'query', schema: { type: 'string', example: 'audio' } }],
                    responses: { 200: ok('Products in the category', { type: 'array', items: { $ref: '#/components/schemas/Product' } }) },
                },
                post: {
                    summary: 'Create a product',
                    requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } } },
                    responses: { 201: ok('The new product', { $ref: '#/components/schemas/Product' }) },
                },
            },
            '/account': {
                get: { summary: 'Read the demo account', security: [{ apiKey: [] }], responses: { 200: ok('The account', { type: 'object' }) } },
            },
            '/orders/{id}': {
                get: {
                    summary: 'Read an order',
                    security: [{ oauth: ['orders:read'] }],
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', example: 'o-3207' } }],
                    responses: { 200: ok('The order', { type: 'object' }), 404: { description: 'No such order' } },
                },
            },
        },
    };
}

// GraphQL at /graphql: a small executor over plain objects. It understands what the documentation
// sends, introspection included, and is not a complete GraphQL server.
const graphTypes = {
    Query: {
        products: ['[Product!]!', { category: 'Category' }],
        product: ['Product', { id: 'ID!' }],
    },
    Mutation: {
        addToCart: ['CartLine!', { productId: 'ID!', quantity: 'Int' }],
    },
    Product: {
        id: ['ID!'], name: ['String!'], category: ['Category!'], price: ['Float!'], inStock: ['Boolean!'],
        related: ['[Product!]!'],
    },
    CartLine: { product: ['Product!'], quantity: ['Int!'], total: ['Float!'] },
};
const graphEnums = { Category: categories.map(({ id }) => id.toUpperCase()) };
const graphScalars = ['ID', 'String', 'Float', 'Int', 'Boolean'];

function typeRef(text) {
    if (text.endsWith('!')) return { kind: 'NON_NULL', name: null, ofType: typeRef(text.slice(0, -1)) };
    if (text.startsWith('[')) return { kind: 'LIST', name: null, ofType: typeRef(text.slice(1, -1)) };
    const kind = graphScalars.includes(text) ? 'SCALAR' : graphEnums[text] ? 'ENUM' : 'OBJECT';
    return { kind, name: text, ofType: null };
}

function introspection() {
    const named = (kind, name, rest = {}) => ({
        kind, name, fields: null, inputFields: null, enumValues: null, possibleTypes: null, ...rest,
    });
    return {
        queryType: { name: 'Query' },
        mutationType: { name: 'Mutation' },
        subscriptionType: null,
        types: [
            ...Object.entries(graphTypes).map(([name, fields]) => named('OBJECT', name, {
                fields: Object.entries(fields).map(([field, [type, args = {}]]) => ({
                    name: field,
                    type: typeRef(type),
                    args: Object.entries(args).map(([arg, argType]) => ({ name: arg, type: typeRef(argType) })),
                })),
            })),
            ...Object.entries(graphEnums).map(([name, values]) => named('ENUM', name, {
                enumValues: values.map(value => ({ name: value })),
            })),
            ...graphScalars.map(name => named('SCALAR', name)),
        ],
    };
}

function graphProduct(product) {
    return {
        __typename: 'Product',
        ...product,
        category: product.category.toUpperCase(),
        related: () => products
            .filter(other => other.category === product.category && other.id !== product.id)
            .map(graphProduct),
    };
}

const graphRoots = {
    query: {
        __typename: 'Query',
        __schema: introspection,
        products: ({ category }) => products
            .filter(product => !category || product.category === category.toLowerCase())
            .map(graphProduct),
        product: ({ id }) => {
            const product = products.find(item => item.id === id);
            return product ? graphProduct(product) : null;
        },
    },
    mutation: {
        __typename: 'Mutation',
        addToCart: ({ productId, quantity = 1 }) => {
            const product = products.find(item => item.id === productId);
            if (!product) throw new Error(`No product with id "${productId}"`);
            if (!product.inStock) throw new Error(`${product.name} is out of stock`);
            return { __typename: 'CartLine', product: graphProduct(product), quantity, total: product.price * quantity };
        },
    },
};

const graphToken = /\.\.\.|[!$():=@[\]{}]|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|"(?:\\.|[^"\\])*"|[_A-Za-z]\w*/g;

function parseGraph(source) {
    const tokens = source.replace(/#[^\n]*/g, '').match(graphToken) ?? [];
    let at = 0;
    const peek = () => tokens[at];
    const next = () => {
        if (at >= tokens.length) throw new Error('Unexpected end of the document');
        return tokens[at++];
    };
    const expect = token => {
        const got = next();
        if (got !== token) throw new Error(`Expected "${token}", found "${got}"`);
    };
    const value = () => {
        const token = next();
        if (token === '$') return { variable: next() };
        if (token === '[') {
            const list = [];
            while (peek() !== ']') list.push(value());
            next();
            return list;
        }
        if (token === '{') {
            const object = {};
            while (peek() !== '}') {
                const name = next();
                expect(':');
                object[name] = value();
            }
            next();
            return object;
        }
        if (token.startsWith('"')) return JSON.parse(token);
        if (/^-?\d/.test(token)) return Number(token);
        return { true: true, false: false, null: null }[token] ?? token;
    };
    const args = () => {
        const out = {};
        if (peek() !== '(') return out;
        next();
        while (peek() !== ')') {
            const name = next();
            expect(':');
            out[name] = value();
        }
        next();
        return out;
    };
    const skipDirectives = () => {
        while (peek() === '@') {
            next();
            next();
            args();
        }
    };
    const selectionSet = () => {
        expect('{');
        const selections = [];
        while (peek() !== '}') {
            if (peek() === '...') {
                next();
                if (peek() === 'on' || peek() === '{') {
                    if (peek() === 'on') {
                        next();
                        next();
                    }
                    skipDirectives();
                    selections.push({ inline: selectionSet() });
                } else {
                    selections.push({ spread: next() });
                    skipDirectives();
                }
                continue;
            }
            let name = next(), alias;
            if (peek() === ':') {
                next();
                alias = name;
                name = next();
            }
            const fieldArgs = args();
            skipDirectives();
            selections.push({ name, alias, args: fieldArgs, selections: peek() === '{' ? selectionSet() : null });
        }
        next();
        return selections;
    };
    const operations = [], fragments = {};
    while (at < tokens.length) {
        if (peek() === '{') {
            operations.push({ type: 'query', defaults: {}, selections: selectionSet() });
            continue;
        }
        const keyword = next();
        if (keyword === 'fragment') {
            const name = next();
            expect('on');
            next();
            skipDirectives();
            fragments[name] = selectionSet();
            continue;
        }
        if (keyword !== 'query' && keyword !== 'mutation') throw new Error(`Unsupported definition "${keyword}"`);
        const name = /^[_A-Za-z]/.test(peek()) ? next() : undefined;
        const defaults = {};
        if (peek() === '(') {
            next();
            while (peek() !== ')') {
                expect('$');
                const variable = next();
                expect(':');
                while (!['=', '$', ')'].includes(peek())) next();
                if (peek() === '=') {
                    next();
                    defaults[variable] = value();
                }
            }
            next();
        }
        skipDirectives();
        operations.push({ type: keyword, name, defaults, selections: selectionSet() });
    }
    return { operations, fragments };
}

function runGraph({ query, variables, operationName }) {
    const { operations, fragments } = parseGraph(String(query ?? ''));
    const operation = operationName
        ? operations.find(item => item.name === operationName)
        : operations.length === 1 ? operations[0] : undefined;
    if (!operation) throw new Error(operationName ? `Unknown operation "${operationName}"` : 'Choose an operation to run');
    const values = { ...operation.defaults, ...(variables ?? {}) };
    const bind = raw => {
        if (Array.isArray(raw)) return raw.map(bind);
        if (raw && typeof raw === 'object') {
            if ('variable' in raw) return values[raw.variable] ?? null;
            return Object.fromEntries(Object.entries(raw).map(([name, item]) => [name, bind(item)]));
        }
        return raw;
    };
    const flatten = selections => selections.flatMap(selection => {
        if (selection.inline) return flatten(selection.inline);
        if (selection.spread) {
            if (!fragments[selection.spread]) throw new Error(`Unknown fragment "${selection.spread}"`);
            return flatten(fragments[selection.spread]);
        }
        return [selection];
    });
    const resolve = (value, selections, typeName) => {
        if (value == null || !selections) return value ?? null;
        if (Array.isArray(value)) return value.map(item => resolve(item, selections, typeName));
        const out = {};
        for (const selection of flatten(selections)) {
            let field = value[selection.name];
            if (field === undefined) {
                throw new Error(`Cannot query field "${selection.name}" on type "${value.__typename ?? typeName}"`);
            }
            if (typeof field === 'function') field = field(bind(selection.args));
            out[selection.alias ?? selection.name] = resolve(field, selection.selections, selection.name);
        }
        return out;
    };
    return resolve(graphRoots[operation.type], operation.selections, operation.type);
}

const server = createServer(async (request, response) => {
    const { pathname, searchParams } = new URL(request.url, 'http://127.0.0.1:8787');

    if (request.method === 'GET' && pathname === '/openapi.json') {
        return json(response, 200, openApi('http://' + request.headers.host));
    }

    if (request.method === 'POST' && pathname === '/graphql') {
        // GraphQL reports its own errors in the body, so a query that fails is still 200 OK.
        try {
            const body = await readBody(request);
            return json(response, 200, { data: runGraph(JSON.parse(body.toString())) });
        } catch (error) {
            return json(response, 200, { data: null, errors: [{ message: error.message }] });
        }
    }

    if (request.method === 'GET' && pathname === '/products') {
        const category = searchParams.get('category');
        const filtered = category ? products.filter(product => product.category === category) : products;
        return json(response, 200, filtered);
    }

    const productId = /^\/products\/([^/]+)$/.exec(pathname)?.[1];
    if (request.method === 'GET' && productId) {
        const product = products.find(item => item.id === productId);
        return product
            ? json(response, 200, product)
            : json(response, 404, { error: 'Unknown product' });
    }

    if (request.method === 'GET' && pathname === '/inventory') {
        return json(response, 200, {
            data: products.map(jsonApiProduct),
            included: categories.map(({ id, name }) => ({ type: 'categories', id, attributes: { name } })),
        }, { 'Content-Type': 'application/vnd.api+json' });
    }

    if (request.method === 'POST' && pathname === '/products') {
        let text;
        try {
            text = (await readBody(request)).toString();
        } catch {
            return json(response, 413, { error: 'Payload too large' });
        }
        try {
            const { name, category, price } = JSON.parse(text);
            if (!name || !category || typeof price !== 'number') {
                return json(response, 400, { error: 'Expected a name, category, and numeric price' });
            }
            if (price < 0) {
                return json(response, 422, {
                    message: 'Product validation failed',
                    errors: { price: ['Use a price of zero or more.'] },
                });
            }
            return json(response, 201, { id: 'p-demo', name, category, price, inStock: true });
        } catch {
            return json(response, 400, { error: 'Expected a JSON object' });
        }
    }

    if (request.method === 'POST' && pathname === '/attachments') {
        return receiveAttachment(request, response);
    }

    if (request.method === 'POST' && pathname === '/token') {
        // OAuth clients post a form; a JSON body lets the same call be typed into a plain request.
        let form;
        try {
            const text = (await readBody(request)).toString();
            form = request.headers['content-type']?.startsWith('application/json')
                ? new URLSearchParams(JSON.parse(text))
                : new URLSearchParams(text);
        } catch {
            return json(response, 400, { error: 'invalid_request' });
        }
        if (form.get('grant_type') !== 'client_credentials') {
            return json(response, 400, { error: 'unsupported_grant_type' });
        }
        const caller = clientOf(request, form);
        if (caller.id !== client.id || caller.secret !== client.secret) {
            return json(response, 401, { error: 'invalid_client' });
        }
        const now = Math.floor(Date.now() / 1000);
        const scope = form.get('scope') || 'orders:read';
        return json(response, 200, {
            access_token: sign({
                iss: 'http://127.0.0.1:8787', sub: client.id, aud: 'catalog-api', scope, iat: now, exp: now + 3600,
            }),
            token_type: 'Bearer',
            expires_in: 3600,
            scope,
        });
    }

    const order = /^\/orders\/([\w-]+)$/.exec(pathname);
    if (request.method === 'GET' && order) {
        if (!verified(request.headers.authorization)) {
            return json(response, 401, { error: 'Send a Bearer token from POST /token' });
        }
        if (order[1] !== 'o-3207') return json(response, 404, { error: 'No such order' });
        response.writeHead(200, { 'Content-Type': 'application/json' });
        return response.end(orderJson(order[1]));
    }

    if (request.method === 'GET' && pathname === '/products.xml') {
        response.writeHead(200, { 'Content-Type': 'application/xml' });
        return response.end(productsXml());
    }

    if (request.method === 'GET' && pathname === '/slow') {
        await new Promise(resolve => setTimeout(resolve, 1500));
        return json(response, 200, { products: products.length, waited: '1.5 s' });
    }

    if (request.method === 'GET' && pathname === '/session') {
        return json(response, 200, { session: 'demo' }, {
            'Set-Cookie': 'catalog_session=demo; Path=/; HttpOnly; SameSite=Lax',
        });
    }

    if (request.method === 'GET' && pathname === '/account') {
        return request.headers['x-api-key'] === 'catalog-demo'
            ? json(response, 200, { account: 'Catalog demo', role: 'reader' })
            : json(response, 401, { error: 'Supply the Catalog demo key in X-API-Key' });
    }

    if (request.method === 'GET' && pathname === '/preview.png') {
        response.writeHead(200, { 'Content-Type': 'image/png' });
        return response.end(preview);
    }

    if (request.method === 'GET' && pathname === '/events') {
        response.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' });
        response.flushHeaders();
        let index = 0;
        const timer = setInterval(() => {
            const product = products[index];
            response.write('event: stock\nid: ' + (index + 1) + '\ndata: ' + JSON.stringify(product) + '\n\n');
            index += 1;
            if (index === products.length) response.end();
        }, 700);
        response.on('close', () => clearInterval(timer));
        return;
    }

    if (request.method === 'GET' && pathname === '/catalog.bin') {
        response.writeHead(200, {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename="catalog.bin"',
        });
        return response.end(Buffer.concat([
            Buffer.from('SCHEMO CATALOG\x00\x01'),
            Buffer.from(JSON.stringify(products)),
        ]));
    }

    json(response, 404, { error: 'Unknown demo endpoint' });
});

// A WebSocket written out by hand keeps the demo free of dependencies: text frames, ping and close.
function frame(text) {
    const payload = Buffer.from(text);
    const head = payload.length < 126
        ? Buffer.from([0x81, payload.length])
        : Buffer.from([0x81, 126, payload.length >> 8, payload.length & 255]);
    return Buffer.concat([head, payload]);
}

function* frames(buffer) {
    let at = 0;
    while (buffer.length - at >= 6) {
        const opcode = buffer[at] & 15;
        let length = buffer[at + 1] & 127;
        let offset = at + 2;
        if (length === 126) { length = buffer.readUInt16BE(offset); offset += 2; }
        else if (length === 127) return;
        if (buffer.length < offset + 4 + length) return;
        const mask = buffer.subarray(offset, offset + 4);
        const payload = Buffer.from(buffer.subarray(offset + 4, offset + 4 + length).map((byte, i) => byte ^ mask[i % 4]));
        yield { opcode, payload };
        at = offset + 4 + length;
    }
}

server.on('upgrade', (request, socket) => {
    if (new URL(request.url, 'http://127.0.0.1').pathname !== '/ws') return socket.destroy();
    const accept = createHash('sha1').update(request.headers['sec-websocket-key'] + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');
    socket.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ' + accept + '\r\n\r\n');
    const send = value => socket.write(frame(JSON.stringify(value)));
    const timers = new Set();
    send({ type: 'welcome', channels: ['stock'], hint: 'Send {"type":"subscribe","channel":"stock"}' });

    socket.on('data', buffer => {
        for (const { opcode, payload } of frames(buffer)) {
            if (opcode === 8) return socket.end(Buffer.from([0x88, 0]));
            if (opcode === 9) { socket.write(Buffer.concat([Buffer.from([0x8a, payload.length]), payload])); continue; }
            if (opcode !== 1) continue;
            let message;
            try { message = JSON.parse(payload.toString()); } catch { message = null; }
            if (message?.type === 'subscribe' && message.channel === 'stock') {
                send({ type: 'subscribed', channel: 'stock' });
                products.forEach((product, index) => {
                    const update = { type: 'stock', id: product.id, name: product.name, inStock: product.inStock };
                    timers.add(setTimeout(() => send(update), 400 * (index + 1)));
                });
            } else {
                send({ type: 'echo', received: message ?? payload.toString() });
            }
        }
    });
    socket.on('close', () => timers.forEach(clearTimeout));
    socket.on('error', () => timers.forEach(clearTimeout));
});

const port = Number(process.env.PORT ?? 8787);

server.listen(port, '127.0.0.1', () => {
    console.log('Catalog API at http://127.0.0.1:' + port);
});
