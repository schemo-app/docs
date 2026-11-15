---
title: Run a collection against an environment
track: automate
weight: 23
description: Use a collection runner to check requests against different API instances.
---

Run a collection after an API change, or check how the same requests behave with a different environment. This example runs two requests together and reproduces a failing assertion by changing one variable.

## Prepare requests {#prepare-the-requests}

1. Start the [Catalog API]({{< relref "/guides/catalog-api" >}}). Save these two GET requests into a collection, or import **Catalog checks** from the [Postman guide]({{< relref "/guides/migrate-from-postman" >}}).

   | Request | Address |
   | --- | --- |
   | List products | `{{baseUrl}}/products?category={{category}}` |
   | Read inventory | `{{baseUrl}}/inventory` |

2. In the list request, use the `{{category}}` variable as the query value. If you imported the collection, replace its literal `audio` value in **Params**.
3. Set up an environment with `baseUrl` set to `http://127.0.0.1:8787` and `category` set to `audio`.
4. In the list request's post-response **Scripts** editor, add this check if you created the request manually.

   ```javascript
   pm.test('Returns two audio products', function () {
     pm.expect(pm.response.code).to.equal(200);
     pm.expect(pm.response.json().length).to.equal(2);
   });
   ```

## Run and compare

Select the environment and open the collection. Select **Run all**, then open **Runs**. Both requests return **200**, and the list request's assertion passes.

Create a second environment with the same `baseUrl` and `category` set to `travel`. Select it and start another run. The list request still returns **200**, but its assertion fails because the response has one product. Open the failed result to see the assertion and the response. Use the run selector to return to the earlier result.

{{< screenshot name="run-with-failure" alt="The Catalog travel run showing 200 responses and a failed assertion with expected 2, got 1" >}}

For a comparison across API instances, change `baseUrl` in the second environment. Keep the variable names the same. If a request is pinned to an environment, clear or update the pin before comparing. Run [WebSocket]({{< relref "/docs/protocols/websocket" >}}) and [SSE]({{< relref "/docs/protocols/sse" >}}) requests individually.
