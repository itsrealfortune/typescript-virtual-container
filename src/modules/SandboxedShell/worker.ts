import { parentPort } from "node:worker_threads";
import { VirtualShell } from "../VirtualShell";
import type { HostMessage, WorkerMessage } from "./types";

if (!parentPort) {
	throw new Error("SandboxedShell worker must run as a Worker thread");
}

const port = parentPort;
let shell: VirtualShell | null = null;

function send(msg: WorkerMessage): void {
	port.postMessage(msg);
}

async function handleExec(msg: HostMessage & { type: "exec" }): Promise<void> {
	if (!shell) {
		send({ type: "error", id: msg.id, message: "Shell not initialized" });
		return;
	}
	try {
		const result = await shell.executeCommand(msg.cmd, msg.user, msg.cwd);
		send({
			type: "result",
			id: msg.id,
			exitCode: result.exitCode ?? 0,
			stdout: result.stdout ?? "",
			stderr: result.stderr ?? "",
		});
	} catch (err: unknown) {
		send({
			type: "error",
			id: msg.id,
			message: err instanceof Error ? err.message : String(err),
		});
	}
}

async function handleInit(): Promise<void> {
	try {
		shell = new VirtualShell("sandbox", undefined, { mode: "memory" });
		await shell.ensureInitialized();
		globalThis.fetch = (() => {
			const f = (
				_input: RequestInfo | URL,
				_init?: RequestInit
			): Promise<Response> => {
				throw new Error("fetch() is disabled in sandboxed shell");
			};
			return Object.assign(f, { preconnect: () => {} });
		})() as unknown as typeof fetch;
		send({ type: "ready" });
	} catch (err: unknown) {
		send({
			type: "error",
			id: "init",
			message: err instanceof Error ? err.message : String(err),
		});
	}
}

port.on("message", (msg: HostMessage) => {
	switch (msg.type) {
		case "init":
			void handleInit();
			break;
		case "exec":
			void handleExec(msg);
			break;
		case "terminate":
			port.close();
			break;
		default:
			break;
	}
});
