---
title: GraphQL
weight: 2
---

Choose **GQL** in the method menu and enter the API's GraphQL endpoint. Use **Headers** and **Authorization** if the endpoint requires credentials.

## Load the schema

Open **Schema** and select **Load from server** to read the endpoint through introspection. If introspection is disabled, use **Import** to add schema files or a folder. Once loaded, browse types and operations. Use **Generate example** to start from an operation in the schema.

## Send an operation

In **Query**, enter a GraphQL document. For example, this query asks the endpoint for the name of its root query type.

```graphql
query SchemaName {
  __schema {
    queryType {
      name
    }
  }
}
```

The example requires introspection. For an API query that takes variables, enter them as a JSON object in **Variables**. When the document contains multiple operations, choose one under **Operation**. Select **Send** and review `data` and `errors` in the response. An HTTP 200 can still carry GraphQL errors.
