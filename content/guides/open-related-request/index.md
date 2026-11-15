---
title: Open a related request from a response
nav_title: Open a related request
description: Use an ID from an inventory response to open a saved request with its address filled in.
track: debug
weight: 15
---

Keep a parameterized request in a collection and use **Node details** to open it with a value from another response. This example follows a product ID from the [Catalog API]({{< relref "/guides/catalog-api" >}}) inventory to a product detail request.

## Prepare requests

1. Start the Catalog API. Save a **GET** request named **Read product** with the address `http://127.0.0.1:8787/products/:id`. Leave the path parameter empty.
2. In another request tab, send `GET http://127.0.0.1:8787/inventory`.

## Open the match

1. In the response **Tree**, right-click **Studio Headphones** in **DATA** and choose **Node details**. Under **Members**, select **id**.
2. Under **In your collection**, select **Read product**. Its address now ends in `/products/p-101`.
3. Select **Send**. Expect **200 OK**, an `id` of `p-101`, and a `name` of `Studio Headphones`. Keep the saved address parameterized so you can pick a different ID next time.

{{< screenshot name="related-request" alt="Node details for product ID p-101 with Read product suggested under In your collection" >}}
