---
title: Import and export
weight: 7
description: Bring in Postman, Insomnia, OpenAPI, HAR, and cURL, and share collections as files or commands.
---

Open **Import** with **Cmd/Ctrl + O**, from the command palette, or from **File → Import…** in the app menu. To import into an existing collection, open the collection's menu in the sidebar and choose **Import into the collection…**.

{{< screenshot name="import-sources" alt="The Import dialog listing Another workspace, Published page, Schemo, Postman, Insomnia, OpenAPI, HAR, and cURL" >}}

## Choose a source

| Source | Input | What it brings in |
| --- | --- | --- |
| **Another workspace** | Collections selected in Schemo | Copies the selected collections from another workspace into the active one. |
| **Published page** | Page URL | Recreates a collection someone [published with Schemo Cloud]({{< relref "/docs/integrations/cloud#publish-a-collection" >}}) from the requests and variables on the page. |
| **Schemo** | JSON file | Restores the saved collections and environments in a Schemo export. |
| **Postman** | JSON file or link | Reads v2.0 and v2.1 collections and Postman environment exports. See [Migrate from Postman]({{< relref "/guides/migrate-from-postman" >}}). |
| **Insomnia** | JSON file | Reads collections and environments from an Insomnia v4 export. |
| **OpenAPI** | YAML or JSON file or link | Creates a collection from Swagger 2.0 or OpenAPI 3.0 or 3.1, with requests for its operations. |
| **HAR** | HAR file | Recreates the recorded requests as editable requests. Use the original recording to review past responses and timings. |
| **cURL** | Pasted commands | Creates requests from one or more `curl` commands. |

For file input, drag the file into the dialog or choose it. For URL input, paste the address and press **Enter**.

OpenAPI import reads parameters, supported authorization, and request bodies where the spec supplies them. Schemo resolves `$ref` entries within the spec. Bundle any external references into the document before importing. For a worked example, see [Start a collection from an OpenAPI URL]({{< relref "/guides/import-openapi" >}}).

## Import destination {#choose-where-it-goes}

**Where** controls where collections appear in the active workspace. Choose **New collection** to add them at the top level, or choose an existing collection or folder to nest the imported collections under it. When copying from **Another workspace**, the top-level choice is **As separate collections**. The import button shows how many requests will be added when importing a file, link, or pasted command.

## Before you send

- Check the active environment and the resolved API address. OpenAPI import creates a `baseUrl` variable under the imported collection's **Variables**. Fill it in if the spec leaves the server address open. An environment or global variable of the same name can override this collection value.
- Fill in required values in **Params**, including any [path parameters]({{< relref "/docs/protocols/http#fill-a-path-parameter" >}}).
- Review **Authorization** and fill in redacted secrets or missing credentials.
- Re-select upload files and local schemas if their saved paths are unavailable on this machine.

## Paste cURL {#paste-a-single-command}

You do not need the dialog for one request. Paste a `curl` command into the address field of a request tab and Schemo fills in the method, query parameters, headers, and body. See [Import a cURL request]({{< relref "/guides/import-curl" >}}).

## Export a collection

Open the collection's menu and choose **Export**, or press **Cmd/Ctrl + Shift + E**.

{{< screenshot name="export-formats" alt="The Export dialog for Catalog API with Schemo, Postman, OpenAPI 3.1, Insomnia, and cURL formats and the Include secret values option" >}}

| Format | Use it to |
| --- | --- |
| **Schemo** (`.json`) | Keep everything Schemo stores: scripts, examples, descriptions, and other protocols. |
| **Postman** (`.json`) | Open the collection in Postman. |
| **OpenAPI 3.1** (`.yaml`) | Describe the API for other tools. |
| **Insomnia** (`.json`) | Open the collection in Insomnia. |
| **cURL** (text) | Get one command per request. |

Choose **Copy** to put the export on the clipboard or **Save…** to write a file. Secret values are left out unless you select **Include secret values**. Review a file that includes secrets before you share it.

## Copy one request

Open the menu on the arrow beside **Send** to copy the link or the request as cURL, fetch (JS), wget, HTTPie, or PowerShell. In the sidebar, a request's menu also offers **Copy as cURL** and **Copy the address**.

Schemo lists any omissions after copying. An unresolved variable stays as `{{name}}`. Copying uses an OAuth token already held in Schemo, and getting a new token is a separate action. For **Digest auth**, add the credentials in the tool that will run the request.

File contents stay on disk. For a **Binary file** body, cURL and PowerShell refer to the local file by path. For **Form data** with a file, cURL and HTTPie include the text fields and the file path. Update the path if you run the command on another machine. If the chosen format omits the upload, use one of these formats or add the upload to the generated code.

## Import .env {#import-environment-variables}

1. Open the environment menu in the header and choose **Edit variables…**.
2. Select an environment, or select **Globals** to make the values available across the workspace.
3. Choose **Import .env → Choose file…**. Save these lines in a `.env` file to try the import with the [Catalog API]({{< relref "/guides/catalog-api" >}}).

   ```dotenv
   baseUrl=http://127.0.0.1:8787
   API_KEY=catalog-demo
   ```

Schemo replaces matching keys in the selected scope and keeps the other variables. Full-line comments are skipped. Names containing `TOKEN`, `SECRET`, `PASSWORD`, `KEY`, or `AUTH` are imported as secrets. After importing into a named environment, select it in the header to use its values.

To verify the import, send `GET {{baseUrl}}/account` with the header `X-API-Key: {{API_KEY}}`. The Catalog API returns **200 OK**. See [Variables and environment overrides]({{< relref "/docs/features/template-variables" >}}) for how Schemo resolves both values.
