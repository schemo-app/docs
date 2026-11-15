---
title: Upload a file with form data
description: Send a file and a text field in one multipart request and check what the server received.
track: build
weight: 7
---

Use **Form data** when an endpoint expects a file alongside text fields, such as a product image with a label. This example uses the [Catalog API]({{< relref "/guides/catalog-api" >}}), which reports the filename and byte count it received.

## Build the form

1. Start the Catalog API and keep [catalog-preview.png]({{< relref "/" >}}examples/catalog-preview.png) handy.
2. Open an HTTP request. Set the method to **POST**, enter `http://127.0.0.1:8787/attachments`, and select **Body → Format → Form data**.
3. Add a row named `label` and enter `Catalog preview` as its value.
4. Add another row named `file`. Use **Make it a file field** on that row, select **Choose a file**, and pick `catalog-preview.png`. Keep both rows enabled.
5. Select **Send**. Schemo fills in the `Content-Type` header including the multipart boundary. If you copied the request from somewhere, remove any hand-written `Content-Type` first so the generated one can take effect.

## Check the upload

In **Body → Tree**, look for **200 OK**, the label, the filename, and `207629` bytes. The demo reports the upload and discards the file.

{{< screenshot name="multipart-upload" alt="A multipart request with a label and catalog-preview.png, and the 200 OK response with the filename and byte count" >}}

If the demo returns **400 Bad Request**, check the two field names and make sure the second row is a file field with a file selected. On another API, use its documented field names, such as `image` or `attachment`. If the endpoint expects the file bytes as the entire body, choose [Binary file]({{< relref "/docs/features/request-body#attach-a-file" >}}).
