---
title: Replay a browser request
track: debug
weight: 11
description: Reproduce a call a web page made, change it, and keep it in a collection.
---

When a site behaves differently from your saved requests, the fastest way to find out why is to send exactly what the browser sent. This guide uses [Schemo Bridge]({{< relref "/docs/integrations/browser-capture" >}}) to capture the call and Schemo to reproduce it.

1. Start Schemo, open **Capture**, and arm capture on the browser tab with the Schemo mark in the toolbar.
2. In the browser, do the action that makes the request, such as opening an order.
3. In **Capture**, find the request. Type part of its address in the filter, or select **Errors** if the call failed.
4. Select the row and open **Request** to compare what the browser sent with your saved request: the URL, the `authorization` and `cookie` headers, and the body.
5. Select **Repeat**. The request opens as a new tab with the browser's method, URL, headers, and body.
6. Send it. If you get the same answer as the browser, the difference is in your saved request. Remove headers one at a time and send again to find the one that matters.
7. To keep the request, press **Ctrl+S** (**Cmd+S** on macOS) and choose a collection. Replace tokens and cookies with [variables]({{< relref "/docs/features/template-variables" >}}) first, so the saved request does not hold a session that will expire.

Repeating a request calls the original API with the original credentials. For a request that creates or changes data, point it at a test environment before you send it.
