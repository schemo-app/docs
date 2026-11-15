---
title: Server-Sent Events
linkTitle: SSE
weight: 5
---

Choose **SSE** and enter the HTTP or HTTPS URL of the event stream. Configure headers or authorization if needed and select **Connect**.

## Read the stream

Schemo displays events as they arrive from a successful `text/event-stream` response. The log shows event names, IDs, and data when the server sends them. Search the log by event or value. Select **Stop** when you finish.

A stream can remain open between events. If the connection closes immediately, check the HTTP status and response content type. If it stays open with an empty log, confirm that the endpoint has an event to send and that any intermediary flushes event data.
