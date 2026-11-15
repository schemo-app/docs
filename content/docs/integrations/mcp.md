---
title: MCP
weight: 2
---

Schemo exposes selected workspaces to MCP clients through a local Streamable HTTP server.

## Connect a client

1. Open **Settings → MCP server** and enable **Run the MCP server**.
2. Choose the workspaces the client may access.
3. Copy **The agent’s configuration** and paste it into your MCP client.

The default address is `http://127.0.0.1:9300/mcp`. The access token belongs to this installation. Keep it private and reissue it if you need to revoke the existing configuration.

## Choose permissions

| Setting | Effect |
| --- | --- |
| **Workspaces** | Sets which workspaces the client can read. |
| **Send requests** | Lets the client make real requests with the selected workspace's environment and authorization. |
| **Ask before sending** | Prompts for confirmation in Schemo before a send. |
| **Edit saved data** | Allows creating, editing, moving, and deleting supported saved data. |

Use secret variables for credentials that should be masked. Inline credentials stored directly in a saved request may be visible to a client that can read that workspace. See the [MCP tool and permissions reference](https://github.com/schemo-app/schemo/blob/v0.5.0/docs/MCP.md).
