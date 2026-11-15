---
title: Collections and environments
weight: 3
description: Save requests in collections and reuse them across environments.
---

Save related requests in a collection. Use folders to group them and put shared authorization or variables at the collection or folder level.

## Create a collection

1. In the sidebar, select **+** beside **Collections** and create **JSONPlaceholder**.
2. Return to the request from [Quick start]({{< relref "/docs/getting-started/quick-start" >}}).
3. Use the save icon beside **Send**, select the collection, and name the request **List posts**.

## Organise requests {#organise-requests-in-the-sidebar}

- Open a collection's context menu to add a folder, run it, or jump to its authorization and variables.
- Drag a request or folder to reorder it or move it into another collection. Use **Move to** in the context menu when the destination is easier to find by name.
- Use **Rename** or **Duplicate** from the same menu. Hold **Cmd/Ctrl** while opening a saved request to keep it in its own tab.

## Environment setup {#use-an-environment-variable}

1. Open the environment menu in the header and create an environment named **Demo**.
2. Add a variable named `baseUrl` with the value `https://jsonplaceholder.typicode.com`. Enable the row and select **Demo** as the active environment.
3. In **List posts**, replace the address with the template below, save the request, and send it again.

   ```text
   {{baseUrl}}/posts?userId=1
   ```

The request resolves to the same endpoint as before. To use the request with another API instance, create or select an environment that defines `baseUrl` for that instance.

{{< screenshot name="environment" alt="The List posts request saved under JSONPlaceholder, with a baseUrl variable in the address and the Demo environment selected" >}}

## Reuse settings

{{< screenshot name="environment-editor" alt="The environment manager with Catalog · local selected and the baseUrl variable visible" >}}

Put environment-specific values in environments and shared defaults in collection or folder variables. Use secret variables for credentials you want masked in normal request previews. See [Local data]({{< relref "/support/local-data" >}}) for storage and export behavior.

Use the request's environment control to [pin an environment]({{< relref "/docs/features/template-variables" >}}) when a single request needs to keep using it while the rest of the workspace switches.

When the requests are ready, [run the collection]({{< relref "/docs/features/scripts-and-runs" >}}).
