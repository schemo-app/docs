---
title: Paste query parameters and headers in bulk
description: Turn spreadsheet columns, a query string, or copied headers into editable rows.
track: build
weight: 3
---

If an endpoint needs several fields, copy the names and values together. Schemo turns the paste into rows you can edit or disable individually.

## Paste parameters {#paste-parameters-from-a-spreadsheet}

1. Start the [Catalog API]({{< relref "/guides/catalog-api" >}}) and open `GET {{baseUrl}}/products`.
2. In a spreadsheet, put `category` and `limit` in the first column and `audio` and `2` in the second. Select and copy both rows without the heading row.
3. In Schemo, open **Params**, focus the row editor, and paste with **Cmd/Ctrl + V**. Check the two enabled rows and the query string in the address bar.
4. Send the request. The category filter returns the two audio products. The demo ignores `limit`, so you can use its row to practise toggling or removing a parameter.

{{< screenshot name="pasted-params" alt="Two pasted query parameters in Params and the corresponding product response" >}}

You can also copy `?category=audio&limit=2` or a full URL and paste it into **Params**. This imports the query fields while keeping the request's current endpoint. New parameter rows append, including repeated names.

## Paste headers {#paste-headers-from-a-ticket-or-terminal}

Open **Headers** and paste these two lines into its row editor.

```text
Accept: application/json
X-Demo-Trace: catalog-docs
```

The same pane accepts the header fields copied from a cURL command. When a pasted header has the same name as an existing one, Schemo replaces the existing entry regardless of capitalization. If you want to edit the whole set as text, use **Bulk edit** and then return to the table to check the rows.
