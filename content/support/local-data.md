---
title: Local data and credentials
weight: 1
description: Find the Schemo database, back it up, or move selected collections to another installation.
---

## Data directory

Schemo stores its database under `~/.schemo` by default. The `SCHEMO_DATA_DIR` environment variable overrides the data directory when the app starts.

The database is named `app.db`. It can hold request content, history, cookies, and locally saved credentials. SQLite stores it unencrypted. Account refresh tokens and saved publication passwords are kept in the OS credential store.

## Move collections {#move-selected-collections}

1. In the source workspace, export each collection you need in **Schemo** format. This carries its saved requests, nested folders, scripts, examples, and the exported environments.
2. On the destination, switch to the intended workspace and use **Import → Schemo**. Check the preview before importing.
3. Select the imported environment, fill in any omitted secrets, and reconnect request files or local schema files if their paths differ on the new machine. Send one request with a known response to verify the move.

See [Import and export]({{< relref "/docs/features/import-and-export#export-a-collection" >}}) for the format selector and export options. Use the database backup below when you also need the local history, cookies, settings, or drafts.

## Back up local data

1. Quit Schemo completely. This gives SQLite a chance to finish writes before you copy files.
2. Open the [data directory](#data-directory) and copy `app.db` into a secure backup folder. If `app.db-wal` or `app.db-shm` still exists, keep those files with the matching database.
3. Keep request upload files and local schema files you may need. The database stores their paths.

To recover a backup, quit Schemo and move the destination's current database and its companion files to a separate folder first. Copy the backed-up database and any companions into the destination data directory. Launch Schemo, verify the workspace and history, and sign in again if the destination lacks your existing OS credentials.

## Secrets and exports

Use secret variables when a value should be masked in ordinary previews and history. Review collection exports before sharing them, especially if you explicitly include credentials. Requests that carry inline credentials can expose them to MCP clients with read access to the workspace.

## Sync

Local workspaces are available without a Schemo Cloud account. Linked workspaces sync eligible data according to the server's permissions and your sync settings. A restored linked workspace can receive newer server changes when sync resumes. See [Troubleshoot sync]({{< relref "/support/sync" >}}) for status messages and [Data, sync, and protection](https://github.com/schemo-app/schemo/blob/v0.5.0/docs/DATA.md) for implementation details.
