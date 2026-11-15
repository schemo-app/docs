---
title: Scripts and collection runs
weight: 3
---

Use pre-request scripts to prepare a request. Use post-response scripts to check what the API returned. Scripts can live on individual requests, folders, or collections.

## Check a response

Open **Scripts** on the saved request from [Quick start]({{< relref "/docs/getting-started/quick-start" >}}). In the post-response editor, add this check.

```javascript
pm.test('Returns posts for user 1', function () {
  pm.expect(pm.response.code).to.equal(200);
  const posts = pm.response.json();
  pm.expect(posts[0].userId).to.equal(1);
});
```

Send the request and open **Scripts** in the response pane to see the test result. If the test fails, check the returned body and the active environment.

## Run a collection

Open the collection and select **Run all**. The runner executes saved requests in order using the collection's settings and the selected environment. Open **Runs** to review the latest run and inspect failures by request. You can repeat a run to compare the result after a change.
