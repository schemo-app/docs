---
title: Descriptions and response examples
linkTitle: Descriptions and examples
weight: 13
description: Document a request and keep representative responses alongside it.
---

Save a request before writing its description or keeping examples. Use **Description** to record when to call the endpoint, which inputs to send, and what a caller can expect.

## Edit a description

Open **Description** and select **Add description**. To change existing text, double-click the description or select the **Edit description** pencil. In the visual editor, use the toolbar to add headings, lists, links, or inline code. Open **Insert** for a table or a code block.

{{< screenshot name="description-visual" alt="The visual description editor with its formatting toolbar above a saved request's heading, list, and table" >}}

Select **Markdown source** beside the pencil to edit or paste Markdown directly. Select it again to return to the visual editor. Both views edit the same description. Select **Finish editing** to return to the rendered page. Schemo saves the description automatically.

{{< screenshot name="description-markdown" alt="Markdown source for the same request description with a heading, list, and table" >}}

## Keep a response

1. Send the saved request.
2. In the response tab row, choose **To examples** on a supported response.
3. Give the example a name that describes the case, such as **200 – Audio products**.
4. Open the request's **Examples** tab and select the example to review it without sending the request again.

{{< screenshot name="saved-response" alt="The Examples tab showing a saved response for the audio products request" >}}

You can keep examples for different outcomes. An example belongs to the saved request. **History** keeps the exchanges you actually ran and shows their original timing and status.

## Blank examples

Use a blank example to document an error or a response your API does not return yet.

1. Open **Examples** on a saved HTTP request. Choose **Blank example**. If you already have examples, open the picker beside the example name first.
2. Enter a name such as **Order not found** and replace the status code with `404`.
3. In **Body**, enter `{"error":"Order not found"}`. Use **Headers** to edit or add response headers. A blank example starts with a JSON `Content-Type`.

## Publish examples {#share-the-documentation}

For a collection you intend to publish, review the descriptions and examples that readers will see. See [Schemo Cloud]({{< relref "/docs/integrations/cloud#publish-a-collection" >}}) for publication options.
