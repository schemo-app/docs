---
title: Start a collection from an OpenAPI URL
nav_title: Import an OpenAPI URL
description: Import a spec by link and send one of the requests Schemo generates.
track: build
weight: 4
---

Import a spec URL to turn its operations into editable requests. This walkthrough uses the local [Catalog API]({{< relref "/guides/catalog-api" >}}) and ends with a request that returns two audio products.

## Import and inspect

1. Start the Catalog API. Open **Import** with **Cmd/Ctrl + O** and choose **OpenAPI → By link**.
2. Enter `http://127.0.0.1:8787/openapi.json` and press **Enter**.
3. Under **Where**, choose **New collection “Catalog API”**. When the button shows **Import 4**, select it.

{{< screenshot page="/docs/features/import-and-export" name="import-openapi" alt="OpenAPI import by link with four Catalog API operations ready to import" >}}

## Run an operation

1. In **Catalog API**, open **List products**. Hover over `{{baseUrl}}` in the address. It should resolve to `http://127.0.0.1:8787`, the server address from the spec. If you see a different address, check whether the active environment or **Globals** overrides `baseUrl`.
2. In **Params**, set `category` to `audio` and enable the row.
3. Select **Send**. Expect **200 OK** and two products in the response, **Studio Headphones** and **Compact Speaker**.

When importing your own API, use the URL of its YAML or JSON spec. See [Import and export]({{< relref "/docs/features/import-and-export#before-you-send" >}}) for what to check before sending a generated request.
