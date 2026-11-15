// A gRPC companion to catalog.mjs: the catalog.v1.Inventory service from catalog.proto, with server
// reflection, over plain HTTP/2 on 127.0.0.1. It uses only Node.js built-ins, so the protobuf
// encoding is written out by hand for these few messages.
import { createServer } from 'node:http2';

const products = [
    { id: 'p-101', name: 'Studio Headphones', category: 'audio', price: 129, inStock: true, quantity: 14 },
    { id: 'p-102', name: 'Compact Speaker', category: 'audio', price: 89, inStock: true, quantity: 6 },
    { id: 'p-103', name: 'Desk Lamp', category: 'office', price: 54, inStock: false, quantity: 0 },
    { id: 'p-104', name: 'Notebook Stand', category: 'office', price: 42, inStock: true, quantity: 21 },
    { id: 'p-105', name: 'Travel Case', category: 'travel', price: 32, inStock: true, quantity: 9 },
];

const STRING = 9, DOUBLE = 1, INT32 = 5, BOOL = 8;

function varint(value) {
    const bytes = [];
    while (value > 127) {
        bytes.push((value & 127) | 128);
        value = Math.floor(value / 128);
    }
    bytes.push(value);
    return Buffer.from(bytes);
}

function key(field, wire) {
    return varint(field * 8 + wire);
}

// Proto3 leaves out fields that hold their default value, and so do these writers.
const pb = {
    bytes: (field, value) => value.length ? Buffer.concat([key(field, 2), varint(value.length), value]) : Buffer.alloc(0),
    string: (field, value) => pb.bytes(field, Buffer.from(value ?? '')),
    int: (field, value) => value ? Buffer.concat([key(field, 0), varint(value)]) : Buffer.alloc(0),
    bool: (field, value) => pb.int(field, value ? 1 : 0),
    double: (field, value) => {
        if (!value) return Buffer.alloc(0);
        const number = Buffer.alloc(8);
        number.writeDoubleLE(value);
        return Buffer.concat([key(field, 1), number]);
    },
    message: (...parts) => Buffer.concat(parts),
};

// Reads a message into field number → list of raw values: numbers for varints, buffers otherwise.
function decode(buffer) {
    const fields = {};
    let at = 0;
    const read = () => {
        let value = 0, scale = 1, byte;
        do {
            byte = buffer[at++];
            value += (byte & 127) * scale;
            scale *= 128;
        } while (byte & 128);
        return value;
    };
    while (at < buffer.length) {
        const tag = read();
        const wire = tag & 7;
        let value;
        if (wire === 0) value = read();
        else if (wire === 1) { value = buffer.subarray(at, at + 8); at += 8; }
        else if (wire === 2) { const length = read(); value = buffer.subarray(at, at + length); at += length; }
        else if (wire === 5) { value = buffer.subarray(at, at + 4); at += 4; }
        else throw new Error('Unsupported wire type ' + wire);
        (fields[tag >> 3] ??= []).push(value);
    }
    return fields;
}

const text = (fields, number) => fields[number]?.[0]?.toString() ?? '';

function productMessage(product) {
    return pb.message(pb.string(1, product.id), pb.string(2, product.name), pb.string(3, product.category),
        pb.double(4, product.price), pb.bool(5, product.inStock));
}

function stockMessage(product) {
    return pb.message(pb.string(1, product.id), pb.string(2, product.name), pb.bool(3, product.inStock),
        pb.int(4, product.quantity));
}

// The descriptor that reflection hands out; it says the same as catalog.proto.
function field(name, number, type, jsonName = name) {
    return pb.message(pb.string(1, name), pb.int(3, number), pb.int(4, 1), pb.int(5, type), pb.string(10, jsonName));
}

function messageType(name, ...fields) {
    return pb.message(pb.string(1, name), ...fields.map(value => pb.bytes(2, value)));
}

function method(name, input, output, streaming = false) {
    return pb.message(pb.string(1, name), pb.string(2, '.catalog.v1.' + input), pb.string(3, '.catalog.v1.' + output),
        pb.bool(6, streaming));
}

const fileName = 'catalog/v1/catalog.proto';
const descriptor = pb.message(
    pb.string(1, fileName),
    pb.string(2, 'catalog.v1'),
    ...[
        messageType('GetProductRequest', field('id', 1, STRING)),
        messageType('Product', field('id', 1, STRING), field('name', 2, STRING), field('category', 3, STRING),
            field('price', 4, DOUBLE), field('in_stock', 5, BOOL, 'inStock')),
        messageType('WatchStockRequest', field('category', 1, STRING)),
        messageType('StockUpdate', field('id', 1, STRING), field('name', 2, STRING),
            field('in_stock', 3, BOOL, 'inStock'), field('quantity', 4, INT32)),
    ].map(value => pb.bytes(4, value)),
    pb.bytes(6, pb.message(pb.string(1, 'Inventory'),
        pb.bytes(2, method('GetProduct', 'GetProductRequest', 'Product')),
        pb.bytes(2, method('WatchStock', 'WatchStockRequest', 'StockUpdate', true)))),
    pb.string(12, 'proto3'),
);
const symbols = ['catalog.v1.Inventory', 'catalog.v1.Inventory.GetProduct', 'catalog.v1.Inventory.WatchStock',
    'catalog.v1.GetProductRequest', 'catalog.v1.Product', 'catalog.v1.WatchStockRequest', 'catalog.v1.StockUpdate'];

function reflect(request) {
    const fields = decode(request);
    const answer = body => pb.message(pb.string(1, text(fields, 1)), pb.bytes(2, request), body);
    const files = () => pb.bytes(4, pb.bytes(1, descriptor));
    const missing = what => pb.bytes(7, pb.message(pb.int(1, 5), pb.string(2, what + ' not found')));
    if (fields[7]) {
        return answer(pb.bytes(6, pb.bytes(1, pb.string(1, 'catalog.v1.Inventory'))));
    }
    if (fields[3]) return answer(text(fields, 3) === fileName ? files() : missing(text(fields, 3)));
    if (fields[4]) return answer(symbols.includes(text(fields, 4)) ? files() : missing(text(fields, 4)));
    return answer(missing('extension'));
}

// gRPC frames each message with a compression flag and a four-byte length.
function frame(message) {
    const head = Buffer.alloc(5);
    head.writeUInt32BE(message.length, 1);
    return Buffer.concat([head, message]);
}

function* unframe(buffer) {
    let at = 0;
    while (buffer.length - at >= 5) {
        const length = buffer.readUInt32BE(at + 1);
        if (buffer.length - at - 5 < length) break;
        yield buffer.subarray(at + 5, at + 5 + length);
        at += 5 + length;
    }
    return buffer.subarray(at);
}

function fail(stream, status, message) {
    stream.respond({ ':status': 200, 'content-type': 'application/grpc', 'grpc-status': String(status),
        'grpc-message': encodeURIComponent(message) }, { endStream: true });
}

function open(stream) {
    stream.respond({ ':status': 200, 'content-type': 'application/grpc', 'x-catalog-region': 'local' },
        { waitForTrailers: true });
    stream.on('wantTrailers', () => stream.sendTrailers({ 'grpc-status': '0' }));
}

const NOT_FOUND = 5, UNIMPLEMENTED = 12;

const server = createServer();
server.on('stream', (stream, headers) => {
    // A client that goes away mid-call resets the stream; that ends the call, not the server.
    stream.on('error', () => {});
    const path = headers[':path'];
    let pending = Buffer.alloc(0);
    const messages = [];

    if (path.endsWith('/ServerReflectionInfo')) {
        open(stream);
        stream.on('data', chunk => {
            const reader = unframe(Buffer.concat([pending, chunk]));
            let next;
            while (!(next = reader.next()).done) stream.write(frame(reflect(next.value)));
            pending = next.value;
        });
        stream.on('end', () => stream.end());
        return;
    }

    stream.on('data', chunk => {
        const reader = unframe(Buffer.concat([pending, chunk]));
        let next;
        while (!(next = reader.next()).done) messages.push(decode(next.value));
        pending = next.value;
    });
    stream.on('end', () => {
        const request = messages[0] ?? {};
        if (path === '/catalog.v1.Inventory/GetProduct') {
            const product = products.find(item => item.id === text(request, 1));
            if (!product) return fail(stream, NOT_FOUND, `No product with id "${text(request, 1)}"`);
            open(stream);
            stream.end(frame(productMessage(product)));
            return;
        }
        if (path === '/catalog.v1.Inventory/WatchStock') {
            const category = text(request, 1);
            const list = products.filter(item => !category || item.category === category);
            open(stream);
            let index = 0;
            const timer = setInterval(() => {
                if (stream.destroyed) return clearInterval(timer);
                if (index === list.length) {
                    clearInterval(timer);
                    return stream.end();
                }
                stream.write(frame(stockMessage(list[index++])));
            }, 400);
            stream.on('close', () => clearInterval(timer));
            return;
        }
        fail(stream, UNIMPLEMENTED, `Unknown method ${path}`);
    });
});

const port = Number(process.env.GRPC_PORT ?? 50051);
server.listen(port, '127.0.0.1', () => {
    console.log(`Catalog gRPC is running at 127.0.0.1:${port}`);
});
