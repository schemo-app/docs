---
title: Fix a request field from a response
nav_title: Fix a request field
description: Follow a validation error to the value in your request and send the corrected body.
track: debug
weight: 14
---

When the server names an invalid input in a supported JSON error response, Schemo can take you back to the request field. Use the [Catalog API]({{< relref "/guides/catalog-api" >}}) to try it with a negative price.

## Send an invalid body

1. Start the Catalog API. Create a **POST** request to `http://127.0.0.1:8787/products`.
2. Open **Body**, choose **JSON**, and paste this object.

   ```json
   {
     "name": "Travel Pouch",
     "category": "travel",
     "price": -1
   }
   ```

3. Select **Send**. The API returns status `422` with a validation error under `errors.price`.

## Find the field

1. In the response **Tree**, expand **errors**, then **price**. Right-click the message **Use a price of zero or more.** and choose **Node details**.
2. Under **Fault in the request**, select **body · price**. Schemo opens the request **Body** and selects the value `-1`.

{{< screenshot name="field-diagnosis" alt="Node details showing Fault in the request and a link to the price field for a 422 response" >}}

3. Close **Node details**, change the selected price to `24`, and send again. Expect **201 Created** and a product with ID `p-demo` and price `24`.

See [Node inspector]({{< relref "/docs/features/node-inspector#request-errors" >}}) for where Schemo takes you when the error names a query parameter or header.
