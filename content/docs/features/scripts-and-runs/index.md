---
title: Scripts and collection runs
weight: 4
description: Check responses with scripts and repeat checks with the collection runner.
---

Use pre-request scripts to prepare a request. Use post-response scripts to check what the API returned. Scripts can live on individual requests, folders, or collections.

Open **Scripts** in the request editor to choose the phase you are editing. Schemo runs the collection's scripts before the scripts on nested folders and the request. Use **Scripts** in the response pane for test results and script output.

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

You can also test the category filter from the [Catalog API]({{< relref "/guides/catalog-api" >}}). This check expects the two audio products from `GET /products?category=audio`.

```javascript
pm.test('Returns two audio products', function () {
  pm.expect(pm.response.code).to.equal(200);
  pm.expect(pm.response.json().length).to.equal(2);
});
```

{{< screenshot name="check-result" alt="The response Scripts tab showing one passed assertion group for the catalog request" >}}

## Read variables {#read-an-environment-variable}

The `pm.environment` object exposes the selected environment. For example, a test can read the `baseUrl` value set up in [Collections and environments]({{< relref "/docs/features/collections-and-environments#use-an-environment-variable" >}}).

```javascript
pm.test('An API host is configured', function () {
  pm.expect(typeof pm.environment.get('baseUrl')).to.equal('string');
});
```

## Run a collection

Open the collection and select **Run all**. The runner executes saved requests in order using the collection's settings and the selected environment. Open **Runs** to review the latest run, or use the run selector to open an earlier result.

{{< screenshot name="collection-run" alt="The Catalog checks collection run with two 200 responses and a passing assertion" >}}

## Inspect failures

Select **Errors** (**Show only failed requests**) to filter the run. A failed check appears here even when the server returns **200 OK**. On a failed row, select the count in **Tests** to see the check and its error. Choose **Open request** to read the response from that run. After correcting the request or its variables, select **Repeat** in **Runs** to verify the fix.

Follow [Run a collection]({{< relref "/guides/run-a-collection#find-the-failure" >}}) for a worked example.
