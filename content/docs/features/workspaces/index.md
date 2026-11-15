---
title: Workspaces
weight: 10
description: Keep collections and environments grouped by project or team.
---

A workspace is the context for the collections and environments you see in the sidebar and use when sending requests. Use one workspace for related APIs or for a team that shares those requests.

## Choose where to work

Open the workspace menu above the sidebar and select a workspace. Create another workspace from that menu when you want a separate set of collections and environments.

When recording or importing a request, check which workspace is active and choose the collection where it belongs. Use the title-bar environment menu to switch the active environment in that workspace.

## Team workspaces {#create-a-team-workspace}

Use **Personal** for requests and environments you manage yourself. Use **Team** to share a workspace through Schemo Cloud. Creating a team workspace requires [sign-in]({{< relref "/docs/integrations/cloud#sign-in" >}}) and a plan that includes shared workspaces.

1. Open the workspace menu and choose **New workspace…**.
2. Enter a name, pick a colour, and choose **Team**.
3. Under **Members**, add an invitation row. Enter an email and choose a role, or use the organisation's default. Add more rows for additional people.
4. Select **Create workspace**. Schemo creates the workspace and sends the invitations.

{{< screenshot name="team-create" alt="The new team workspace form with two test email addresses ready to invite" >}}

## Manage invitations {#review-members-and-invitations}

Open the workspace menu, choose **Manage…**, and select the team workspace. **Your role** shows which changes you can make. In **Members**, you can see who has joined and which invitations still await a response.

{{< screenshot name="team-invitations" alt="The Platform team workspace showing its owner and two pending invitations" >}}

With permission to manage the team, you can change a member's role, remove a member, or revoke an invitation before it is accepted. To invite someone from this screen, add an invitation row, fill in the email and role, and press **Enter**. Someone with read-only access can browse and send saved requests. Changes to collections, environments, and cookies require write access.

## Leave or delete

Open the workspace menu, choose **Manage…**, and select the team workspace. The action at the bottom depends on your permissions.

- **Leave the workspace** removes your membership and the workspace from your device. The other members keep access to the workspace and its data.
- **Delete the workspace** is available to members with permission to delete it. It removes the workspace for everyone. A member with that permission can restore a deleted cloud workspace from **Trash** in the cloud panel during the retention period.

If the workspace was active, Schemo switches to another workspace after you confirm.

See [Schemo Cloud]({{< relref "/docs/integrations/cloud" >}}) for device sync, and [Import and export]({{< relref "/docs/features/import-and-export" >}}) to move collections between workspaces.
