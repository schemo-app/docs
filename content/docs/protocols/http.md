---
title: HTTP
weight: 1
---

Use HTTP for a request with a method, URL, headers, and optional body. See [Quick start]({{< relref "/docs/getting-started/quick-start" >}}) for a working GET example.

## Build the request

- Set the method and URL. Use **Params** to edit the query string.
- Use **Headers** to set fields such as `Accept` or `Content-Type`. Query parameters and headers can be edited as rows or as text in bulk.
- On methods that carry a body, use **Body** for JSON, XML, form fields, raw text, or a file.
- Select **Send**. Check the status and open [Response inspector]({{< relref "/docs/features/response-inspector" >}}) for the body and timing details.

## Configure authorization

Open **Authorization** and choose Basic, Bearer, API key, JWT, AWS SigV4, Digest, or OAuth 2.0 as required by the API. Use **Inherit** when the parent collection or folder provides authorization.

For values that differ across API instances, use `{{variable}}` references and choose an [environment]({{< relref "/docs/features/collections-and-environments" >}}). This lets the same request use a different base URL or credential.

## Import a cURL command

Paste the full command into the request address field. Review the translated method, headers, and body before sending. See [Import a cURL request]({{< relref "/guides/import-curl" >}}) for an example.
