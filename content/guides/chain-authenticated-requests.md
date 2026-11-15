---
title: Pass a token from one request to another
nav_title: Pass a token
description: Capture a token into an environment variable and reuse it automatically in a protected request.
track: automate
weight: 21
---

Use a response capture when an API returns the credential or identifier needed for the next call. Schemo refreshes the variable when you send the first request again.

## Capture a token {#capture-a-fresh-token}

1. Start the [Catalog API]({{< relref "/guides/catalog-api" >}}) and select **Catalog · local**.
2. Save `POST {{baseUrl}}/token` as **Get an access token**. Use the [client credentials JSON body]({{< relref "/guides/catalog-api#get-a-token" >}}) and send it.
3. In **Body → Tree**, open the node actions on `access_token` and choose **Save to a variable**. Name it `accessToken` and choose **Catalog · local**. Keep **Secret** and **Update on send** selected, then save the capture.

{{< screenshot page="/docs/features/node-inspector" name="save-to-variable" alt="Save to a variable with the active environment, Secret, and update-on-send options" >}}

## Send the request {#send-the-protected-request}

Save `GET {{baseUrl}}/orders/o-3207` as **Read order**. Under **Authorization**, choose **Bearer token** and set **Token** to `{{accessToken}}`. Send the request and check for **200 OK**. Sending **Get an access token** again refreshes the same variable. The next **Read order** uses its current value.

Open **Scripts → Captures** on **Get an access token** to find the recorded rule. Run the source request first when the value is missing or expired. See [Node inspector]({{< relref "/docs/features/node-inspector#reuse-a-value-in-the-next-request" >}}) for captures from bodies, headers, and cookies.
