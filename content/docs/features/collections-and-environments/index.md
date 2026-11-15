---
title: Collections and environments
weight: 2
description: Save requests in collections and reuse them across environments.
---

Save related requests in a collection. Use folders to group them and put shared authorization or variables at the collection or folder level.

## Create a collection

1. In the sidebar, select **+** beside **Collections** and create **JSONPlaceholder**.
2. Return to the request from [Quick start]({{< relref "/docs/getting-started/quick-start" >}}).
3. Use the save icon beside **Send**, select the collection, and name the request **List posts**.

## Use an environment variable

1. Open the environment menu in the header and create an environment named **Demo**.
2. Add a variable named `baseUrl` with the value `https://jsonplaceholder.typicode.com`. Enable the row and select **Demo** as the active environment.
3. In **List posts**, replace the address with the template below, save the request, and send it again.

   ```text
   {{baseUrl}}/posts?userId=1
   ```

The request resolves to the same endpoint as before. To use the request with another API instance, create or select an environment that defines `baseUrl` for that instance.

{{< screenshot name="environment" alt="The List posts request saved under JSONPlaceholder, with a baseUrl variable in the address and the Demo environment selected" >}}

## Reuse settings

Put environment-specific values in environments and shared defaults in collection or folder variables. Use secret variables for credentials you want masked in normal request previews. See [Local data]({{< relref "/support/local-data" >}}) for storage and export behavior.

When the requests are ready, [run the collection]({{< relref "/docs/features/scripts-and-runs" >}}).
