---
title: Troubleshoot sync
weight: 3
description: Diagnose a sync status, missing data, or a conflict in a linked workspace.
---

Open **Settings → Account** and look at the sync status. The workspace indicator in the status bar tells you whether the active workspace is synced or local only. The [Schemo Cloud guide]({{< relref "/docs/integrations/cloud#sync" >}}) shows where both controls are.

## Read the status

| Status | What to check |
| --- | --- |
| **Sync is off** | Turn on **Sync this device** to resume. If the switch is unavailable, check that the account has a linked workspace. |
| **No connection to the server** | Check the server address and connection. The row can show the last exchange, pending changes, and the next retry. Choose **Retry** after reconnecting. |
| **This workspace is no longer in the account** | Verify the account and server, then check whether the workspace still exists or is still shared with you. |
| **The account does not allow this** | Check your workspace role and ask its owner if you need write access. |
| **The server refused** | Choose **Retry**. If it happens again, record the time, app version, workspace type, and the action immediately before the failure. |
| **A conflict in …** | Choose **Open the workspace**, review the server's version of the affected item, and reapply the intended edit if it still belongs there. |

## Missing changes {#a-change-is-missing-on-another-device}

1. Confirm that both devices use the same server and account, then open the same linked workspace.
2. Check **Sync this device** on both and use **Sync now** where available. Check the **Last exchange** time and any pending-change count.
3. For collection run results, check **Run history** on the device that ran the collection. For environment secrets, check **Secret values** on the sending device and verify that the receiving member's role can read secrets.

Drafts, open tabs, and app settings live on the device that created them. To move saved requests between workspaces manually, use [Import and export]({{< relref "/docs/features/import-and-export" >}}).
