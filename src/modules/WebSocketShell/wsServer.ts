/**
 * WebSocket shell transport for VirtualShell.
 *
 * Bridges a browser-based terminal client to the VirtualShell runtime over
 * WebSocket, using a JSON message protocol defined in {@link protocol}.
 *
 * Each WebSocket connection creates an isolated interactive shell session
 * via {@link VirtualShell.startInteractiveSession}. Sessions are fully
 * isolated — separate VFS state, user identity, and TTY.
 *
 * Usage (standalone):
 * ```bash
 * node dist/standalone.js --transport ws --ws-port 8080
 * ```
 *
 * Then open `demo/ws-client.html` in a browser and connect.
 *
 * @module wsServer
 */

import { randomUUID } from "node:crypto";
import { WebSocketServer, type RawData } from "ws";
import type { ShellStream } from "../../types/streams";
import type { VirtualShell } from "../VirtualShell";
import { parseClientMessage, serializeMessage, type WsUser } from "./protocol";

/** Options for {@link VirtualWebSocketServer}. */
export interface VirtualWebSocketServerOptions {
	/** TCP port to listen on (default: 8080 when used via `--ws-port`). */
	port: number;
	/** Network interface to bind to (default: `"0.0.0.0"`). */
	hostname?: string;
	/** Shared VirtualShell instance — each connection gets its own session. */
	shell: VirtualShell;
	/**
	 * Optional bearer-style auth token.
	 * If set, clients must pass `?token=<value>` in the WebSocket URL.
	 * Connections without a matching token are rejected with code 4001.
	 */
	authToken?: string;
	/**
	 * Idle timeout in milliseconds (default: 300000 = 5 min).
	 * Connections idle longer than this are closed with code 4002.
	 * Set to 0 to disable.
	 */
	idleTimeoutMs?: number;
}

/**
 * WebSocket-based shell server.
 *
 * Listens for WebSocket connections and bridges each to a VirtualShell
 * interactive session. Supports auth token, idle timeout, terminal resize,
 * and keepalive ping/pong.
 *
 * @example
 * ```ts
 * const server = new VirtualWebSocketServer({
 *   port: 8080,
 *   shell: virtualShell,
 *   authToken: "secret123",
 * });
 * server.start();
 * ```
 */
export class VirtualWebSocketServer {
	private readonly _wss: WebSocketServer;
	private readonly _shell: VirtualShell;
	private readonly _authToken?: string;
	private readonly _idleTimeoutMs: number;

	/**
	 * Create a new WebSocket shell server.
	 *
	 * The server starts listening immediately in the constructor.
	 * Call {@link start} to log the listening address, or just let it run.
	 *
	 * @param options - Server configuration.
	 */
	constructor(options: VirtualWebSocketServerOptions) {
		this._shell = options.shell;
		this._authToken = options.authToken;
		this._idleTimeoutMs = options.idleTimeoutMs ?? 300_000;

		this._wss = new WebSocketServer({
			port: options.port,
			host: options.hostname ?? "0.0.0.0",
		});

		this._wss.on("connection", (ws, req) => {
			const url = new URL(
				req.url ?? "/",
				`http://${req.headers.host ?? "localhost"}`
			);
			const token = url.searchParams.get("token");

			// Auth check — reject with error message and close code 4001
			if (this._authToken && token !== this._authToken) {
				ws.send(
					serializeMessage({ type: "error", message: "Authentication failed" })
				);
				ws.close(4001, "Authentication failed");
				return;
			}

			const user: WsUser = {
				username: url.searchParams.get("user") ?? "websocket",
				sessionId: randomUUID(),
			};

			const terminalSize = {
				cols: Number.parseInt(url.searchParams.get("cols") ?? "80", 10),
				rows: Number.parseInt(url.searchParams.get("rows") ?? "24", 10),
			};

			// Idle timeout management
			let idleTimer: ReturnType<typeof setTimeout> | null = null;
			const resetIdle = () => {
				if (idleTimer) {
					clearTimeout(idleTimer);
				}
				if (this._idleTimeoutMs > 0) {
					idleTimer = setTimeout(() => {
						ws.send(
							serializeMessage({ type: "error", message: "Idle timeout" })
						);
						ws.close(4002, "Idle timeout");
					}, this._idleTimeoutMs);
				}
			};

			// ShellStream bridges WebSocket ↔ VirtualShell
			const dataListeners: ((chunk: Buffer) => void)[] = [];
			const closeListeners: (() => void)[] = [];

			const stream: ShellStream = {
				write: (data: string) => {
					if (ws.readyState === ws.OPEN) {
						ws.send(serializeMessage({ type: "data", data }));
					}
				},
				exit: (code: number) => {
					ws.send(serializeMessage({ type: "exit", code }));
					ws.close(4000, `Session ended with code ${code}`);
				},
				end: () => {
					for (const l of closeListeners) {
						l();
					}
					ws.close();
				},
				on: (event: "data" | "close", listener) => {
					if (event === "data") {
						dataListeners.push(listener as (chunk: Buffer) => void);
					} else if (event === "close") {
						closeListeners.push(listener as () => void);
					}
				},
			};

			// Forward WebSocket messages as shell input
			ws.on("message", (raw: RawData) => {
				resetIdle();
				let rawBuf: Buffer;
				if (Buffer.isBuffer(raw)) {
					rawBuf = raw;
				} else if (typeof raw === "string") {
					rawBuf = Buffer.from(raw);
				} else if (Array.isArray(raw)) {
					rawBuf = Buffer.concat(raw);
				} else {
					rawBuf = Buffer.from(new Uint8Array(raw as ArrayBuffer));
				}
				const msg = parseClientMessage(rawBuf);
				if (!msg) {
					return;
				}

				switch (msg.type) {
					case "data":
						for (const l of dataListeners) {
							l(Buffer.from(msg.data, "utf8"));
						}
						break;
					case "resize":
						terminalSize.cols = msg.cols;
						terminalSize.rows = msg.rows;
						break;
					case "ping":
						ws.send(serializeMessage({ type: "pong" }));
						break;
					case "exit":
						for (const l of closeListeners) {
							l();
						}
						break;
					default:
						break;
				}
			});

			// Cleanup on connection close
			ws.on("close", () => {
				if (idleTimer) {
					clearTimeout(idleTimer);
				}
				for (const l of closeListeners) {
					l();
				}
			});

			ws.on("error", () => {
				for (const l of closeListeners) {
					l();
				}
			});

			resetIdle();

			// Start the interactive shell session
			this._shell.startInteractiveSession(
				stream,
				user.username,
				user.sessionId,
				req.socket.remoteAddress ?? "127.0.0.1",
				terminalSize
			);
		});
	}

	/**
	 * Log the listening address to the console.
	 * The server is already listening after construction; this is purely
	 * informational.
	 */
	start(): void {
		console.log(
			`[WebSocketShell] Listening on ws://0.0.0.0:${(this._wss.address() as { port: number }).port}`
		);
	}

	/**
	 * Gracefully stop the WebSocket server.
	 * Closes all existing connections and stops accepting new ones.
	 *
	 * @returns A promise that resolves when the server has closed.
	 */
	stop(): Promise<void> {
		return new Promise((resolve) => {
			this._wss.close(() => resolve());
		});
	}
}
