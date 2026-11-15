---
title: Import a cURL request
weight: 1
---

Paste a cURL command into Schemo to inspect and edit the request before you send it.

## Import and verify

1. Open a new HTTP request tab. Paste this command into the address field.

   ```sh
   curl 'https://jsonplaceholder.typicode.com/posts?userId=1' -H 'Accept: application/json'
   ```

2. Check that the method is **GET**, **Params** contains `userId=1`, and **Headers** contains `Accept: application/json`.
3. Select **Send** and confirm that the response contains an array of posts.

## Keep the request

Save it to a collection using the save icon beside **Send**. If a command contains a credential, move the value into a secret environment variable before sharing the request or exporting it. See [Collections and environments]({{< relref "/docs/features/collections-and-environments" >}}).
