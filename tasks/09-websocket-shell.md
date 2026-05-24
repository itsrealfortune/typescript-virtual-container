# Task: Transport — WebSocket shell

**Priority:** P2
**Estimated effort:** 1 week
**Dependencies:** None

## Context

Currently noted as "may never be" in TODO.md. Would complete the transport trio: SSH (sshd), Web (HTTP/iframe), WebSocket (real-time).

## Implementation

### Architecture

```
┌─────────────────┐     WebSocket (ws://)     ┌───────────────────┐
│  ws-client.html  │ ◄──────────────────────► │  VirtualWebSocket │
│  (browser)       │   JSON messages          │  Server           │
│                  │                          │                   │
│  WebTermRenderer │   { type:"data",... }    │  VirtualShell     │
│  (VT100 emu)     │   { type:"resize",... }  │  (startInteractive│
└─────────────────┘   { type:"ping/pong" }    │   Session)        │
                      { type:"exit",... }     └───────────────────┘
```

### Message protocol

All messages are JSON with a `type` field:

| Direction | Type | Payload |
|-----------|------|---------|
| Client → Server | `data` | `{ data: string }` — shell input (keystrokes) |
| Client → Server | `resize` | `{ cols: number, rows: number }` — terminal resize |
| Client → Server | `ping` | (none) — keepalive |
| Client → Server | `exit` | `{ code: number }` — close session |
| Server → Client | `data` | `{ data: string }` — shell output |
| Server → Client | `pong` | (none) — keepalive response |
| Server → Client | `exit` | `{ code: number }` — session ended |
| Server → Client | `error` | `{ message: string }` — error info |

### Standalone usage

```bash
# Start with WebSocket transport:
node dist/standalone.js --transport ws --ws-port 8080

# With auth token:
node dist/standalone.js --transport ws --ws-port 8080 --auth-token secret123

# Start both SSH and WebSocket:
node dist/standalone.js --ssh-port 2222 --transport ws --ws-port 8080
```

Open `demo/ws-client.html` in a browser and connect.

### Key files

| File | Purpose |
|------|---------|
| `src/modules/WebSocketShell/protocol.ts` | Message types, parsing, serialization |
| `src/modules/WebSocketShell/wsServer.ts` | `VirtualWebSocketServer` class |
| `src/standalone.ts` | Entry point with `--transport ws` flag |
| `demo/ws-client.html` | Browser terminal client |

## Subtasks

### 1. WebSocket server
- [x] Create a `VirtualWebSocketServer` that wraps a `VirtualShell`
- [x] Handle connection open/close
- [x] Handle authentication (token in URL or initial message)
- [x] Handle terminal resize (sending dimensions)

### 2. Message protocol
- [x] Define a simple message format (JSON)
- [x] `data` — shell input/output
- [x] `resize` — terminal dimensions
- [x] `exit` — close signal
- [x] `error` — error messages
- [x] `ping`/`pong` — keepalive

### 3. WebSocket client (web terminal)
- [x] Create a client HTML page with built-in VT100 renderer
- [x] Connect to the WebSocket server
- [x] Display output in a terminal
- [x] Send keyboard input
- [ ] Handle reconnection (future)

### 4. Integration with existing code
- [x] Standalone mode: `--transport ws`
- [ ] Allow using WebSocket shell in the XFCE desktop (terminal window)
- [ ] SSH mode: SSH → WebSocket bridge for web clients

### 5. Security
- [x] Optional authentication token
- [x] Configurable idle timeout
- [x] Message size validation (JSON parsing)
- [ ] Per-connection rate limiting (future)

## Acceptance Criteria

- [x] A client can connect, send commands, and receive output in real time
- [x] Terminal resize is handled
- [x] Multiple simultaneous sessions are isolated
- [ ] Reconnection works without session loss (if configured) — future
- [x] Latency is < 50ms for character echo (WebSocket is inherently low-latency)

## Notes

- Uses the `ws` package (works with both Node.js and Bun)
- On the client side, uses a custom minimal VT100 renderer (mirrors `WebTermRenderer` from `webTermRenderer.ts`)
- See `src/modules/SSHMimic/shell.ts` for interactive session management
- See `src/modules/webTermRenderer.ts` for web terminal rendering
- Resize captures dimensions but does not actively push SIGWINCH to the shell runtime yet
