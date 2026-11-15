---
title: WebSocket
weight: 4
---

Choose **WS** and enter a `wss://` or `ws://` endpoint. Set any query parameters, headers, or authorization required by the server for the handshake.

## Exchange messages

1. Select **Connect** and wait for **Connected**.
2. In **Message**, choose the format and enter a message. Send it while the connection is open.
3. Read sent and received messages in the log. Use **Saved messages** to reuse a message.
4. Select **Disconnect** to close the connection.

If the connection fails, check the endpoint, handshake status, and authorization. If it opens but no message comes back, check whether the server expects a particular payload or a subscription message.
