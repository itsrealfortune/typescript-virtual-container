// node:net polyfill — browser stub. TCP sockets not available in browser.
function notImpl(name) {
	return function () {
		throw new Error(`node:net: ${name} not implemented in browser`);
	};
}

export class Socket {
	connect() { notImpl("Socket.connect")(); }
	on() { return this; }
	once() { return this; }
	off() { return this; }
	emit() { return false; }
	pipe() { return this; }
	end() { notImpl("Socket.end")(); }
	destroy() { notImpl("Socket.destroy")(); }
	setEncoding() { return this; }
	setTimeout() { return this; }
	setNoDelay() { return this; }
	setKeepAlive() { return this; }
	address() { return null; }
	remoteAddress = "127.0.0.1";
	remotePort = 0;
}

export class Server {
	listen() { notImpl("Server.listen")(); }
	close() { notImpl("Server.close")(); }
	on() { return this; }
	once() { return this; }
	off() { return this; }
	emit() { return false; }
	address() { return null; }
}

export function createServer(connectionListener) {
	const server = new Server();
	if (connectionListener) server.on("connection", connectionListener);
	return server;
}

export function createConnection(port, host, connectionListener) {
	const socket = new Socket();
	if (connectionListener) socket.once("connect", connectionListener);
	notImpl("createConnection")();
	return socket;
}

export function connect(port, host, connectionListener) {
	return createConnection(port, host, connectionListener);
}

export function isIP(input) {
	if (typeof input !== "string") return 0;
	const parts = input.split(".");
	if (parts.length !== 4) return 0;
	return parts.every((p) => {
		const n = parseInt(p, 10);
		return !Number.isNaN(n) && n >= 0 && n <= 255;
	}) ? 4 : 0;
}

export function isIPv4(input) { return isIP(input) === 4; }

export function isIPv6(input) {
	if (typeof input !== "string") return false;
	return input.includes(":") && input.split(":").length >= 2;
}

export default { Socket, Server, createServer, createConnection, connect, isIP, isIPv4, isIPv6 };
