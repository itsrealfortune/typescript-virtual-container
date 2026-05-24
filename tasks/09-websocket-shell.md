# Task: Transport — WebSocket shell

**Priority:** P2
**Estimated effort:** 1 week
**Dependencies:** None

## Context

Currently noted as "may never be" in TODO.md. Would complete the transport trio: SSH (sshd), Web (HTTP/iframe), WebSocket (real-time).

## Subtasks

### 1. WebSocket server
- [ ] Create a `VirtualWebSocketServer` that wraps a `VirtualShell`
- [ ] Handle connection open/close
- [ ] Handle authentication (token in URL or initial message)
- [ ] Handle terminal resize (sending dimensions)

### 2. Message protocol
- [ ] Define a simple message format (JSON or line-delimited)
- [ ] `data` — shell input/output
- [ ] `resize` — terminal dimensions
- [ ] `exit` — close signal
- [ ] `error` — error messages
- [ ] `ping`/`pong` — keepalive

### 3. WebSocket client (web terminal)
- [ ] Create a `WebSocketShellClient` class on the client side
- [ ] Connect to the WebSocket server
- [ ] Display output in a terminal (xterm.js or equivalent)
- [ ] Send keyboard input
- [ ] Handle reconnection

### 4. Integration with existing code
- [ ] Allow using WebSocket shell in the XFCE desktop (terminal window)
- [ ] Standalone mode: `node server.js --transport ws`
- [ ] SSH mode: SSH → WebSocket bridge for web clients

### 5. Security
- [ ] Mandatory authentication by default
- [ ] Per-connection rate limiting
- [ ] Configurable idle timeout
- [ ] Message size validation (DoS prevention)

## Acceptance Criteria

- A client can connect, send commands, and receive output in real time
- Terminal resize is handled
- Multiple simultaneous sessions are isolated
- Reconnection works without session loss (if configured)
- Latency is < 50ms for character echo

## Notes

- Use the `ws` module (WebSocket) on the server side (or `bun:` websocket)
- On the client side, use the native `WebSocket` API or `xterm.js` for rendering
- See `src/modules/SSHMimic/shell.ts` for interactive session management
- See `src/modules/webTermRenderer.ts` for web terminal rendering
- Resize requires sending simulated SIGWINCH signals to the shell
