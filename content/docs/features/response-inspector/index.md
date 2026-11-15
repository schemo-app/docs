---
title: Response inspector
weight: 1
description: Read JSON, inspect request timings, and save binary responses.
---

The response pane shows what the endpoint returned. The toolbar displays the status, request duration, and body size.

## Explore JSON

| View | Use it to |
| --- | --- |
| **Tree** | Expand nested objects or arrays and find a field or value. |
| **Raw** | Read the response source. Use the format action when you need indentation. |
| **Map** | Explore the structure and field types. |
| **Table** | Browse an array as rows. Filter, sort, and export the data as CSV. |

Send the request from [Quick start]({{< relref "/docs/getting-started/quick-start" >}}) and select **Table**. Each post becomes a row. Select a column heading to sort the rows, or use search to find a value.

{{< screenshot name="table" alt="The posts response displayed as a table with userId, id, title, and body columns" >}}

## Inspect headers and timings

Use **Headers** to check the response metadata and **Cookies** to see cookie activity for the request. Open **Timings** to see recorded phases such as DNS, connection, TLS, and download when available.

## Preview or save a binary response

- Images and videos support **Preview** and **Hex**. Images also offer **Fit** and **100%**.
- Other binary responses open in **Hex**, which shows up to the first 256 bytes.
- Select the download icon in the response tab row to save the body to a file.

For a saved request, use **To examples** on a supported response to keep it with the request. You can reopen it from the request's **Examples** tab.
