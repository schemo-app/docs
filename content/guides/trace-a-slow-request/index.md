---
title: Find where a slow request spent its time
description: Use History and Timings to tell connection setup, server wait, and download apart.
track: debug
weight: 12
---

A duration tells you a request was slow. The **Timings** tab shows which phase used the time, and **History** gives you the same measurements for earlier runs.

## Send a slow request {#reproduce-a-slow-reply}

1. Start the [Catalog API]({{< relref "/guides/catalog-api" >}}) and send `GET {{baseUrl}}/slow`.
2. Open **Timings** in the response. The demo waits about 1.5 seconds before sending its first byte. Most of that time appears under **Waiting for the answer**.
3. Send `GET {{baseUrl}}/products` for a quick comparison against the same server.

{{< screenshot name="slow-timings" alt="The Timings tab showing that most of the local slow request was spent waiting for the answer" >}}

## Find it again

Open **History** with **Cmd/Ctrl + Y** and select **Slow**. Open the `/slow` record and review its original timings. The connection note tells you whether a connection was reused. Check that note when comparing DNS, TCP, or TLS time between sends.
