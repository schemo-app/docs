---
title: Quick start
weight: 2
description: Send a GET request in Schemo and read the JSON response.
---

Send a request to [JSONPlaceholder](https://jsonplaceholder.typicode.com/) and inspect a list of posts. The example uses a public endpoint that requires no credentials.

## Set up the request

1. Select **+** in the tab bar to open a request.
2. Leave the method set to **GET** and paste the address into the request field.

   ```text
   https://jsonplaceholder.typicode.com/posts?userId=1
   ```

3. Open **Params**. The `userId` row should contain `1`. Editing this row updates the query in the address.

## Send and read the response

Select **Send**. The lower pane shows the status, elapsed time, body size, and response tabs. A successful request returns **200 OK** and an array of posts. In **Body → Tree**, expand a post to inspect its `userId`, `id`, `title`, and `body`.

{{< screenshot name="request" alt="A GET request to JSONPlaceholder with userId set to 1 and an expanded JSON post in the response tree" >}}

## Save the request

Use the save icon beside **Send**. Choose a collection and name the request **List posts**. If you need a collection first, create one with **+** beside **Collections** in the sidebar.

Next, [inspect the response as a table]({{< relref "/docs/features/response-inspector" >}}) or [reuse the request with an environment]({{< relref "/docs/features/collections-and-environments" >}}).
