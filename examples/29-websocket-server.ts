/**
 * 29 - WebSocket Shell Server
 *
 * Demonstrates the WebSocket shell transport — a browser-accessible terminal
 * server backed by VirtualShell.
 *
 * Start the server:
 *   bun examples/29-websocket-server.ts
 *
 * Then open `demo/ws-client.html` in a browser (or any WebSocket client)
 * and connect to ws://localhost:8080?user=demo
 *
 * With auth token:
 *   TOKEN=supersecret bun examples/29-websocket-server.ts
 *   # Connect via: ws://localhost:8080?user=demo&token=supersecret
 */

import { VirtualShell } from "../src/modules/VirtualShell/index";
import { VirtualWebSocketServer } from "../src/modules/WebSocketShell/wsServer";

const shell = new VirtualShell("websocket-demo");
await shell.ensureInitialized();
shell.users.setPassword("demo", "demo");

const token = process.env.TOKEN;

const server = new VirtualWebSocketServer({
	port: 8080,
	shell,
	authToken: token,
	idleTimeoutMs: 600_000, // 10 min idle before disconnect
});

server.start();

console.log("WebSocket server ready at ws://localhost:8080");
console.log("  Username: demo");
if (token) {
	console.log(`  Auth token: ${token} (required via ?token= in URL)`);
} else {
	console.log("  Auth token: none (omit ?token=)");
}
console.log("Open demo/ws-client.html in your browser to connect.");

// ── Graceful shutdown ──────────────────────────────────────────────

process.on("SIGINT", async () => {
	console.log("\nShutting down...");
	await server.stop();
	process.exit(0);
});

process.on("SIGTERM", async () => {
	console.log("\nShutting down...");
	await server.stop();
	process.exit(0);
});
