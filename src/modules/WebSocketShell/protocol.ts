/**
 * WebSocket shell message protocol.
 *
 * All messages are JSON with a `type` discriminator.
 * Designed for use with {@link VirtualWebSocketServer} and the browser client.
 *
 * @module protocol
 */

/** Base message with type discriminator. */
export interface WsMessage {
	type: "data" | "resize" | "ping" | "pong" | "exit" | "error";
}

/** Shell input from client to server — keystrokes or pasted text. */
export interface WsDataMessage extends WsMessage {
	type: "data";
	/** UTF-8 shell input data (characters, escape sequences). */
	data: string;
}

/** Terminal resize notification from client to server. */
export interface WsResizeMessage extends WsMessage {
	type: "resize";
	/** New terminal width in columns. */
	cols: number;
	/** New terminal height in rows. */
	rows: number;
}

/** Keepalive ping from client to server. Server responds with {@link WsPongMessage}. */
export interface WsPingMessage extends WsMessage {
	type: "ping";
}

/** Keepalive pong response from server to client. */
export interface WsPongMessage extends WsMessage {
	type: "pong";
}

/** Session close signal. Either side can send this. */
export interface WsExitMessage extends WsMessage {
	type: "exit";
	/** Exit code (0 = success, non-zero = error). */
	code: number;
}

/** Error notification from server to client. */
export interface WsErrorMessage extends WsMessage {
	type: "error";
	/** Human-readable error description. */
	message: string;
}

/** Union of all message types the client may send. */
export type WsClientMessage = WsDataMessage | WsResizeMessage | WsPingMessage | WsExitMessage;

/** Union of all message types the server may send. */
export type WsServerMessage = WsDataMessage | WsPongMessage | WsExitMessage | WsErrorMessage;

/** Authenticated user info extracted during the WebSocket handshake. */
export interface WsUser {
	/** Authenticated username. */
	username: string;
	/** Unique session identifier (UUID v4). */
	sessionId: string;
}

/**
 * Parse a raw WebSocket message into a typed {@link WsClientMessage}.
 *
 * Returns `null` if the message is not valid JSON or does not match any
 * known message schema. Malformed messages are silently dropped to prevent
 * DoS via garbage input.
 *
 * @param raw - Incoming message payload (string or Buffer).
 * @returns A parsed client message, or `null` if parsing fails.
 */
export function parseClientMessage(raw: string | Buffer): WsClientMessage | null {
	if (typeof raw !== "string") {
		raw = Buffer.from(raw).toString("utf8");
	}
	let parsed: unknown;
	try {
		parsed = JSON.parse(raw);
	} catch {
		return null;
	}
	if (typeof parsed !== "object" || parsed === null) {
		return null;
	}
	const msg = parsed as Record<string, unknown>;
	const type = msg.type;
	if (type === "data" && typeof msg.data === "string") {
		return { type: "data", data: msg.data } as WsDataMessage;
	}
	if (type === "resize" && typeof msg.cols === "number" && typeof msg.rows === "number") {
		return { type: "resize", cols: msg.cols, rows: msg.rows } as WsResizeMessage;
	}
	if (type === "ping") {
		return { type: "ping" } as WsPingMessage;
	}
	if (type === "exit") {
		return { type: "exit", code: typeof msg.code === "number" ? msg.code : 0 } as WsExitMessage;
	}
	return null;
}

/**
 * Serialize a server message to JSON for sending over the WebSocket.
 *
 * @param msg - The message to serialize.
 * @returns JSON string ready to send via `ws.send()`.
 */
export function serializeMessage(msg: WsServerMessage): string {
	return JSON.stringify(msg);
}
