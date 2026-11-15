---
title: Troubleshooting
linkTitle: Support
weight: 3
cascade:
  type: docs
---

## Schemo does not start

Check the supported OS and runtime for your package in [Installation]({{< relref "/docs/getting-started/installation" >}}). The Windows build uses WebView2. The Linux package uses GTK 3 and WebKitGTK 4.1.

## A request cannot connect

Check the URL, active environment, and resolved variable values. Review the connection error or **Timings** to see which phase failed. If your network requires a proxy or a private CA, check your connection settings and add the trusted certificate for your network.

## GraphQL or gRPC cannot load a schema

Check that the endpoint exposes GraphQL introspection or gRPC server reflection. If the server does not expose it, load local [GraphQL schema files]({{< relref "/docs/protocols/graphql" >}}) or [gRPC service definitions]({{< relref "/docs/protocols/grpc" >}}).

## Where do I get an update?

Open the app's update settings to check for a new version or [download a package from GitHub](https://github.com/schemo-app/schemo/releases/latest). The app verifies signatures before installing updates. Background downloads are optional and the app applies a downloaded update when you choose to update and restart.

## Get more help

- [Browser capture setup]({{< relref "/docs/integrations/browser-capture" >}})
- [Local data and credentials]({{< relref "local-data" >}})
- [Report an issue](https://github.com/schemo-app/schemo/issues)
