---
title: Run a collection
track: automate
weight: 23
description: Run saved requests, find a failed test, and verify the fix.
---

Use a collection run to check several endpoints at once. In this example, both requests return **200 OK**, but one test fails because the request sends the wrong category.

## Prepare requests {#prepare-the-requests}

1. Start the [Catalog API]({{< relref "/guides/catalog-api" >}}). Save these two GET requests in a collection named **Catalog checks**, or import it from the [Postman guide]({{< relref "/guides/migrate-from-postman" >}}).

   | Request | Address |
   | --- | --- |
   | List audio products | `{{baseUrl}}/products?category={{category}}` |
   | Read inventory | `{{baseUrl}}/inventory` |

2. In the list request, use the `{{category}}` variable as the query value. If you imported the collection, replace its literal `audio` value in **Params**.
3. In the active environment, set `baseUrl` to `http://127.0.0.1:8787` and `category` to `travel` to reproduce the failure.
4. In the list request's post-response **Scripts** editor, add this check if you created the request manually.

   ```javascript
   pm.test('Returns two audio products', function () {
     pm.expect(pm.response.code).to.equal(200);
     pm.expect(pm.response.json().length).to.equal(2);
   });
   ```

{{< anchor "run-and-compare" >}}

## Find the failure

1. Open **Catalog checks**, select **Run all**, then open **Runs**. Both requests have status `200`. The **Tests** column shows **0 of 1** for **List audio products**.
2. Select **Errors 1** to show only failed requests. This includes requests whose response arrived successfully but failed a test.
3. Select **0 of 1** in the **Tests** column. **Returns two audio products** reports **expected 2, got 1**. Choose **Open request** to see the saved request and the response from that run. The response **Body** contains one travel product, and **Params** uses `{{category}}` for the category filter.

{{< screenshot name="run-with-failure" alt="The Errors 1 control and the open Tests popover for a 200 response, with expected 2, got 1" >}}

## Run again

1. Open **Edit variables…** from the environment menu and change `category` to `audio` in the same environment.
2. Return to **Catalog checks → Runs** and select **Repeat**. Turn off the **Errors** filter if it is still on.
3. In the new run, check that **List audio products** shows **1 of 1** in **Tests** and the **Errors** count is `0`.

Use the run selector to reopen the earlier result and check the response that originally failed. Run [WebSocket]({{< relref "/docs/protocols/websocket" >}}) and [SSE]({{< relref "/docs/protocols/sse" >}}) requests individually.
