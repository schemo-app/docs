---
title: Replay a browser request
weight: 3
---

Use [Schemo Bridge]({{< relref "/docs/integrations/browser-capture" >}}) to inspect what a site sent and reproduce the API call in the desktop client.

1. Start Schemo and arm capture on the browser tab.
2. Perform the action that triggers the request. Open **Capture** in Schemo and find the URL.
3. Select the exchange and inspect its method, parameters, response, and headers.
4. Repeat it from Schemo. If you need to change inputs first, open the request in the editor and review the URL and authorization before sending.

Repeating a request sends it to the original API. For a request that creates or changes data, use a test environment if the action should only be reproduced for debugging.
