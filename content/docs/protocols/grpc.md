---
title: gRPC
weight: 3
---

Choose **gRPC** in the method menu. Enter the server address, such as `host:port` or `grpcs://host:port` for TLS.

## Choose a method

1. Open **Schema**. Use **Load from server** if the server exposes reflection.
2. If reflection is unavailable, use **Import** and add the relevant `.proto` files or a folder containing the service definitions and their imports.
3. Select a service and method. Schemo supports unary and server-streaming calls.

## Invoke the method

Use **Body** to fill the request message in JSON. Enter any required keys in **Metadata**. Select **Invoke**.

A unary method returns a single response. A server-streaming method delivers messages as they arrive. Check the gRPC status and response metadata if the call fails before returning data.
