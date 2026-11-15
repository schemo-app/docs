---
title: Try the Catalog API
track: build
weight: 1
description: Run a local API and follow the illustrated request and response examples.
---

The Catalog API supplies the sample products, inventory relationships, tokens, orders, cookies, events, and binary data used in the screenshots. It runs locally and uses only Node.js built-ins.

## Start the demo API

Save [catalog.mjs]({{< relref "/" >}}examples/catalog.mjs) and [catalog-preview.png]({{< relref "/" >}}examples/catalog-preview.png) in the same folder. Run the script with Node.js.

```sh
node catalog.mjs
```

If port 8787 is taken, start it with another port, such as `PORT=8790 node catalog.mjs`. Keep it running while you work through the examples. In Schemo, create an environment called **Catalog · local**, set `baseUrl` to `http://127.0.0.1:8787`, and select that environment. You can also paste the full address into a request.

## Try the endpoints

| Method or protocol | Address | What to try |
| --- | --- | --- |
| GET | `{{baseUrl}}/products?category=audio` | Edit [query parameters]({{< relref "/docs/protocols/http#edit-query-parameters-and-headers" >}}). |
| GET | `{{baseUrl}}/products/p-101` | Read a product by ID from a [related request]({{< relref "/guides/open-related-request" >}}). |
| POST | `{{baseUrl}}/products` | Send a [JSON body]({{< relref "/docs/features/request-body#try-a-json-body" >}}) and check for **201 Created**. |
| POST | `{{baseUrl}}/attachments` | [Upload an image and a label]({{< relref "/guides/upload-a-file" >}}) and confirm the received byte count. |
| GET | `{{baseUrl}}/inventory` | Follow a [JSON:API relationship]({{< relref "/docs/features/response-inspector#follow-jsonapi-relationships" >}}). |
| GET | `{{baseUrl}}/session` | Inspect a [session cookie]({{< relref "/docs/features/cookies" >}}). |
| GET | `{{baseUrl}}/account` | Send an [API key]({{< relref "/docs/features/authorization#try-an-api-key" >}}). |
| SSE | `{{baseUrl}}/events` | Watch [stock updates]({{< relref "/docs/protocols/sse" >}}) arrive one at a time. |
| GET | `{{baseUrl}}/catalog.bin` | Open [Hex]({{< relref "/docs/features/response-inspector#preview-or-save-a-binary-response" >}}) and save the response. |
| GET | `{{baseUrl}}/preview.png` | Preview an image and switch between **Fit** and **100%**. |
| POST | `{{baseUrl}}/token` | Get a JWT with the client credentials below and [decode it]({{< relref "/docs/features/node-inspector#read-a-value-in-node-details" >}}). |
| GET | `{{baseUrl}}/orders/o-3207` | Send the token as a Bearer token and [chain the requests]({{< relref "/docs/features/node-inspector#reuse-a-value-in-the-next-request" >}}). |
| GET | `{{baseUrl}}/products.xml` | Read an XML response. |
| GET | `{{baseUrl}}/slow` | Wait 1.5 seconds and find the call with the [Slow filter]({{< relref "/docs/features/history-and-transfer#find-a-previous-request" >}}). |
| GET | `{{baseUrl}}/openapi.json` | [Import the API]({{< relref "/guides/import-openapi" >}}) as a collection. |

The POST example returns the new product in its response. The list endpoint continues to serve the original five products.

Send a negative price to get a structured validation error and [jump back to the field in the request]({{< relref "/guides/fix-a-request-field" >}}).

## Get a token

`POST /token` accepts the OAuth 2.0 client credentials grant with client ID `catalog-docs` and secret `catalog-secret`. Send them as a form, as Basic credentials, or as a JSON body:

```json
{
  "grant_type": "client_credentials",
  "client_id": "catalog-docs",
  "client_secret": "catalog-secret"
}
```

The token is valid for an hour. `GET /orders/o-3207` returns **401 Unauthorized** without it. To have Schemo fetch the token for you, follow the [OAuth client credentials walkthrough]({{< relref "/docs/features/authorization#try-it-with-the-catalog-api" >}}).
