---
title: Local data and credentials
weight: 1
---

## Data directory

Schemo stores its database under `~/.schemo` by default. The `SCHEMO_DATA_DIR` environment variable overrides the data directory when the app starts.

The SQLite database can hold request content, history, cookies, and locally saved credentials. It is unencrypted. Account refresh tokens are kept in the OS credential store.

## Secrets and exports

Use secret variables when a value should be masked in ordinary previews and history. Review collection exports before sharing them, especially if you explicitly include credentials. Requests that carry inline credentials can expose them to MCP clients with read access to the workspace.

## Sync

Local workspaces are available without a Schemo Cloud account. When you link a workspace to a server, eligible workspace data is synchronized subject to the server's permissions and your sync settings. For implementation details, see [Data, sync, and protection](https://github.com/schemo-app/schemo/blob/v0.5.0/docs/DATA.md).
