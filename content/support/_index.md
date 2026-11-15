---
title: Troubleshooting
linkTitle: Support
weight: 3
---

## Startup {#schemo-does-not-start}

Check the supported OS and runtime for your package in [Installation]({{< relref "/docs/getting-started/installation" >}}). The Windows build uses WebView2. The Linux package uses GTK 3 and WebKitGTK 4.1.

## Connection errors {#a-request-cannot-connect}

Check the URL, active environment, and resolved variable values. Review the connection error or **Timings** to see which phase failed. Follow [Diagnose TLS and proxy errors]({{< relref "/guides/fix-tls-and-proxy" >}}) to test the proxy tunnel or add a trusted root certificate.

## Schema errors {#graphql-or-grpc-cannot-load-a-schema}

Check that the endpoint exposes GraphQL introspection or gRPC server reflection. If the server does not expose it, load local [GraphQL schema files]({{< relref "/docs/protocols/graphql" >}}) or [gRPC service definitions]({{< relref "/docs/protocols/grpc" >}}).

## Updates {#where-do-i-get-an-update}

Open the app's update settings to check for a new version or [download a package from GitHub](https://github.com/schemo-app/schemo/releases/latest). The app verifies signatures before installing updates. Background downloads are optional and the app applies a downloaded update when you choose to update and restart.

## Cloud sync {#cloud-changes-are-missing}

Open [Troubleshoot sync]({{< relref "sync" >}}) to interpret the status in **Settings → Account** and check run history or secret values.

## Get more help

- [Browser capture setup]({{< relref "/docs/integrations/browser-capture" >}})
- [Find, back up, or move local data]({{< relref "local-data" >}})
- [Report an issue](https://github.com/schemo-app/schemo/issues)
