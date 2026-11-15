---
title: Export just the response rows you need
description: Filter a JSON array, choose columns, and save the result as CSV.
track: debug
weight: 13
---

Turn an array response into a spreadsheet extract from the response pane.

1. Start the [Catalog API]({{< relref "/guides/catalog-api" >}}) and send `GET {{baseUrl}}/products`. The response contains five products.
2. Open **Body → Table** and enter `audio` in **Filter rows…**. Two results remain. If the response contains several arrays, choose the one you want from **Array** first.
3. Use **Columns** to keep `id`, `name`, `category`, and `price`. Keep `category` visible because the filter searches visible cell values.
4. Select `price` once to sort ascending. Select **CSV** and choose where to save it.

The CSV uses the visible columns and every matching row in the current sort order, including rows on other table pages. In this example **Compact Speaker** (89) comes before **Studio Headphones** (129).

{{< screenshot name="filtered-table" alt="The product table filtered to audio, with four visible columns and the two matching products sorted by price" >}}
