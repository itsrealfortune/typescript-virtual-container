---
title: 29 - WebSocket Shell Server
group: Examples
---

# Example 29 — WebSocket Shell Server

## The Scenario

SSH is powerful, but not every user has an SSH client. A WebSocket-based shell server lets you expose a terminal directly in the browser — no client software required. This is especially useful for web-based labs, demo environments, and browser-accessible bastion hosts.

This example demonstrates a browser-accessible terminal server using `VirtualWebSocketServer`, with optional auth token, idle timeout, and graceful shutdown.

## Modules Used

### `VirtualShell`
The central simulation container. Manages VFS, user accounts, process space, and command execution.

### `VirtualWebSocketServer`
A WebSocket server that accepts browser connections and presents a full terminal session backed by `VirtualShell`. Each connection gets its own isolated interactive shell session.

```ts
import { VirtualShell } from "../src/modules/VirtualShell/index";
import { VirtualWebSocketServer } from "../src/modules/WebSocketShell/wsServer";
```

## Step-by-Step Walkthrough

### Step 1 — Create and Initialize the Shell

```ts
const shell = new VirtualShell("websocket-demo");
await shell.ensureInitialized();
shell.users.setPassword("demo", "demo");
```

Creates a `VirtualShell` with hostname `"websocket-demo"`. `ensureInitialized()` populates the VFS with a minimal Linux filesystem. A `demo` user is created with password `demo`.

### Step 2 — Configure the WebSocket Server

```ts
const token = process.env.TOKEN;

const server = new VirtualWebSocketServer({
	port: 8080,
	shell,
	authToken: token,
	idleTimeoutMs: 600_000, // 10 min idle before disconnect
});
```

Constructor options:
- `port`: TCP port to bind the WebSocket server.
- `shell`: The `VirtualShell` instance backing all terminal sessions.
- `authToken`: Optional bearer token required via `?token=` query parameter in the WebSocket URL. If `undefined`, no auth is required.
- `idleTimeoutMs`: Maximum idle time before the server disconnects a client. Defaults to 10 minutes.

### Step 3 — Start the Server

```ts
server.start();
```

Binds the WebSocket server to `0.0.0.0:8080`. After this, clients can connect.

### Step 4 — Open the Client

```html
demo/ws-client.html
```

The companion HTML file (`demo/ws-client.html`) is a standalone terminal client with:

- **Connect bar**: Enter `ws://host:port?user=demo&token=...` and click Connect.
- **VT100 renderer**: Renders terminal output in a `<pre>` element, matching the library's built-in `WebTermRenderer`.
- **Keyboard input**: Sends keystrokes as JSON messages over the WebSocket.
- **Paste support**: Ctrl+Shift+V pastes clipboard content.
- **Resize handling**: Sends terminal resize events on window resize.

### Step 5 — Graceful Shutdown

```ts
process.on("SIGINT", async () => {
	await server.stop();
	process.exit(0);
});
```

`server.stop()` closes all active connections and unbinds the WebSocket listener. The example hooks both `SIGINT` and `SIGTERM` for clean termination under any signal.

## Protocol

The WebSocket shell uses a JSON message protocol:

| Type | Direction | Payload | Description |
|------|-----------|---------|-------------|
| `data` | Client → Server | `{ type: "data", data: "ls\n" }` | Send terminal input |
| `data` | Server → Client | `{ type: "data", data: "...output..." }` | Receive terminal output |
| `resize` | Client → Server | `{ type: "resize", cols: 80, rows: 24 }` | Terminal resize |
| `ping` | Bidirectional | `{ type: "ping" }` | Keepalive (server responds with `pong`) |
| `pong` | Bidirectional | `{ type: "pong" }` | Keepalive response |
| `exit` | Server → Client | `{ type: "exit", code: 0 }` | Session ended |
| `error` | Server → Client | `{ type: "error", message: "..." }` | Error notification |

Auth is handled via the WebSocket URL query parameter `?token=...`. The server checks `req.url` for the token during the upgrade handshake and rejects unauthorized connections with a 403 status code.

## Running the Example

```bash
# Start the server (no auth)
bun examples/29-websocket-server.ts

# Start with auth
TOKEN=supersecret bun examples/29-websocket-server.ts
```

Then open `demo/ws-client.html` in a browser and connect to `ws://localhost:8080?user=demo`. If using auth, append `&token=supersecret`.

## Expected Output

```
WebSocket server ready at ws://localhost:8080
  Username: demo
  Auth token: none (omit ?token=)
Open demo/ws-client.html in your browser to connect.
```

After a client connects, terminal output appears in the browser. Typing `ls` shows the virtual filesystem contents. `exit` or Ctrl+D ends the session.

## Key Concepts

- **Browser-native terminal**: No SSH client needed — just a WebSocket-capable browser. The `demo/ws-client.html` client includes a full VT100 renderer.
- **Session isolation**: Each WebSocket connection gets an independent `VirtualShell` session via `startInteractiveSession()`. Sessions share no state beyond the read-only VFS.
- **JSON message protocol**: Messages are JSON-encoded for debuggability and extensibility. Binary payloads are also supported for future optimization.
- **Auth via URL parameter**: Stateless token-based auth in the WebSocket upgrade handshake. No cookies or sessions required.
- **Idle timeout**: Connections are automatically cleaned up after `idleTimeoutMs` of inactivity. Prevents resource leaks from abandoned browser tabs.
- **Graceful shutdown**: `server.stop()` drains active connections and unbinds the listener cleanly. Works with process signals or programmatic calls.
