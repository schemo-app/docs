---
title: Start a collection from an OpenAPI URL
description: Import a spec by link, choose an environment, and call a generated request.
track: build
weight: 4
---

When a team gives you an OpenAPI spec, import the URL to get editable requests and path parameters for its operations.

## Import and inspect

1. Start the [Catalog API]({{< relref "/guides/catalog-api" >}}). Open **Import** with **Cmd/Ctrl + O** and choose **OpenAPI → By link**.
2. Enter `http://127.0.0.1:8787/openapi.json` and press **Enter**.
3. Check the preview for four requests. Under **Where**, choose a new collection, then complete the import.

{{< screenshot page="/docs/features/import-and-export" name="import-openapi" alt="OpenAPI import by link with four Catalog API operations ready to import" >}}

## Run an operation

Open the generated `GET /products` request and inspect the address and **Params**. If the address uses `{{baseUrl}}`, select the **Catalog · local** environment and confirm that it points to the server you started. Set the `category` query parameter to `audio`, enable its row, and send the request. Expect **200 OK** and two products.

For an operation with a path parameter, supply its value under **Params → Path**. Review inherited authorization before sending a protected request. See [HTTP]({{< relref "/docs/protocols/http" >}}) for the path and header controls.
