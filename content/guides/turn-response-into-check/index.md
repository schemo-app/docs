---
title: Turn a response value into a regression check
description: Generate a test from a JSON value and run it with the saved request.
track: automate
weight: 22
---

When a response contains a value your UI or integration depends on, use the value itself to generate a post-response check.

1. Start the [Catalog API]({{< relref "/guides/catalog-api" >}}). Save a GET request to `{{baseUrl}}/account`. Set its **API key** in **Authorization**, with name `X-API-Key`, placement **Header**, and value `catalog-demo`.
2. Send the request. In **Body → Tree**, open the node actions for `role` and choose **Add a script assertion**.
3. Open the request's **Scripts** tab. The generated post-response check compares `role` with the observed value `reader`. Save the request.
4. Send it again and open the response **Scripts** tab. The assertion should pass. You can run the same check with other requests in a [collection run]({{< relref "/guides/run-a-collection" >}}).

{{< screenshot name="role-check" alt="The response Scripts tab showing the generated role assertion passed" >}}

Use **Copy for JavaScript** from the same menu if you want the expression for a more specific test. For expected behavior that varies across environments, read the expected value from a variable instead of hard-coding it. See the [script reference]({{< relref "/docs/features/script-reference" >}}).
