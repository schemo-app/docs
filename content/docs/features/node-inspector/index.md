---
title: Node inspector
weight: 2
description: Decode tokens and timestamps, copy paths and types, and reuse a response value in the next request.
---

Select any value in the **Tree** view of a JSON response and Schemo shows where it sits and what it can do with it. The bar above the tree turns into a breadcrumb with the value's type, and its menu offers copy, save, and check actions.

## Node actions {#open-the-node-actions}

1. Send a request and open **Body → Tree**.
2. Select a key or value. The bar above the tree shows the path, such as `$ › access_token`, and the value's type.
3. Open the menu beside the type, right-click the row, or press **Cmd/Ctrl + Alt + I**.

Select a breadcrumb segment to move to the parent value.

{{< screenshot name="node-actions" alt="The node actions menu for access_token, with Copy the value, Copy path, Copy for JavaScript, Save to a variable, Add a script assertion, and Node details" >}}

| Action | What it does |
| --- | --- |
| **Copy the value** | Copies the value. |
| **Copy path** | Copies the JSONPath, such as `$.customer.email`. |
| **Copy for JavaScript** | Copies an expression for scripts, such as `pm.response.json().access_token`. |
| **Save to a variable** | Stores the value in the active environment or in globals. See [Reuse a value in the next request](#reuse-a-value-in-the-next-request). |
| **Add a script assertion** | Appends a check to the request's post-response script, for example `pm.test("scope", () => pm.expect(pm.response.json().scope).to.equal("orders:read"));`. Save the request to keep it. |
| **Node details** | Opens the details panel described below. |

## Node details {#read-a-value-in-node-details}

**Node details** shows the value's type and size, its full text, and how Schemo reads it. Try it on the [Catalog API]({{< relref "/guides/catalog-api" >}}): send **Get an access token** and open the details of `access_token`. Schemo recognizes a JWT and decodes its header and claims, including when the token was issued and when it expires.

{{< screenshot name="jwt-details" alt="Node details for access_token decoding the JWT: algorithm HS256, issuer, subject, audience, scope, and issue and expiry times" >}}

Schemo recognizes these values in strings and numbers:

| Reading | What you see |
| --- | --- |
| **Token (JWT)** | Algorithm, type, key ID, issuer, subject, audience, scope, and the issue, not-before, and expiry times, plus the decoded claims. |
| **Unix time** | Whether the number is in seconds or milliseconds, and the moment it stands for. |
| **Date and time** | The moment in your time zone, and how long ago or how soon it is. |
| **UUID**, **ULID**, **MongoDB ObjectId** | The version, and the creation time when the ID contains one. |
| **Address** | The scheme, host, path, query, and fragment of a URL. |
| **Email address**, **IP address** | The name and domain, or whether the address is public, private, loopback, or another range. |
| **Colour** | A swatch for a hex color. |
| **Data address**, **Base64** | The media type and size, and the decoded content. |
| **JSON inside the text** | The parsed structure of a JSON document stored as a string. |
| **Digest** | Which hash function produced a hex string of that length. |
| **Too large for JavaScript** | A warning that a JSON integer is outside JavaScript's safe integer range. Open **Raw** to check the digits received from the server. |

The tree also shows a readable date beside timestamps, so you can scan `placedAt` or `updated` without opening the panel.

Under **Address**, Node details lists the value's location as JSONPath, a jq filter, JavaScript, Python, and a Postman expression. Select a line to copy it.

## Request errors

When a supported JSON error response names a request field, **Node details** can show **Fault in the request**. Select the field link to open **Params** or **Headers**, or highlight the value in the JSON **Body** editor. See [Fix a request field from a response]({{< relref "/guides/fix-a-request-field" >}}).

## Related requests

For a value such as `productId`, **In your collection** can suggest saved requests with a matching parameter in their address. Select a suggestion to open an editable request with the value filled in. Review the address before sending it. See [Open a related request from a response]({{< relref "/guides/open-related-request" >}}).

## Objects and arrays {#use-an-object-or-array}

For an object or array, Node details lists its members and adds actions under **Use**:

- **Copy as written** copies the JSON exactly as the server sent it.
- **Copy as a type** generates a TypeScript, Go, Python `TypedDict`, or JSON Schema definition from the value.
- **Use as the request body** puts the value into the open request's JSON body. Choose **As it is**, or **Without what the server writes** to drop server-managed fields such as `created_at`, `updated_at`, and `_links` before you send the object back. Schemo asks before it replaces an existing body.

## Reuse values {#reuse-a-value-in-the-next-request}

A value saved with **Update on send** becomes a capture: Schemo reads it again every time the source request runs. Use it to pass a token or an ID from one request to the next.

1. Send **Get an access token**, select `access_token`, and choose **Save to a variable**.
2. Name it `accessToken` and choose where it goes: the active environment or **Globals**. Schemo marks a token as **Secret** by default, which masks it in the interface and leaves it out of exports.
3. Keep **Update on send** selected and choose **Save**.
4. In **Read order**, open **Authorization**, choose **Bearer token**, and enter `{{accessToken}}`. Send it and the API returns the order.

{{< screenshot name="save-to-variable" alt="The Save to a variable form for access_token with the name, the Catalog · local environment, and the Secret and Update on send options" >}}

Captures of the request appear under **Scripts → Captures**, each with its source and destination. Pause a capture to keep the current value, or remove it. You can also save a response header or cookie to a variable from the **Headers** and **Cookies** tabs.

Try [Pass a token from one request to another]({{< relref "/guides/chain-authenticated-requests" >}}) or [Turn a response value into a regression check]({{< relref "/guides/turn-response-into-check" >}}) for complete workflows.
