import {Worker} from "node:worker_threads";
import {resolve, dirname} from "node:path";
import {existsSync} from "node:fs";
import {fileURLToPath} from "node:url";
import type {HostMessage, WorkerMessage} from "./types";

const __dirname = dirname(fileURLToPath(import.meta.url));

function resolveWorkerScript(): string {
	const tsPath = resolve(__dirname, "worker.ts");
	if (existsSync(tsPath)) {
		return tsPath;
	}
	return resolve(__dirname, "worker.js");
}

export interface SandboxedShellOptions {
	execTimeoutMs?: number;
	workerScript?: string;
}

export interface ExecResult {
	exitCode: number;
	stdout: string;
	stderr: string;
}

export class SandboxedShell {
	private _worker: Worker;
	private _pending: Map<
		string,
		{
			resolve: (result: ExecResult) => void;
			reject: (err: Error) => void;
			timer: ReturnType<typeof setTimeout>;
		}
	> = new Map();
	private _nextId = 0;
	private _ready: Promise<void>;
	private _readyResolve!: () => void;
	private _readyReject!: (err: Error) => void;
	private _execTimeoutMs: number;

	constructor(_hostname = "sandbox", options: SandboxedShellOptions = {}) {
		this._execTimeoutMs = options.execTimeoutMs ?? 30_000;

		const workerPath = options.workerScript ?? resolveWorkerScript();
		this._worker = new Worker(workerPath);

		this._ready = new Promise<void>((resolve, reject) => {
			this._readyResolve = resolve;
			this._readyReject = reject;
		});

		this._worker.on("message", (msg: WorkerMessage) => {
			switch (msg.type) {
				case "ready":
					this._readyResolve();
					break;
				case "result":
				case "error": {
					const pending = this._pending.get(msg.id);
					if (!pending) {
						return;
					}
					clearTimeout(pending.timer);
					this._pending.delete(msg.id);
					if (msg.type === "result") {
						pending.resolve({
							exitCode: msg.exitCode,
							stdout: msg.stdout,
							stderr: msg.stderr,
						});
					} else {
						pending.reject(new Error(msg.message));
					}
					break;
				}
				default:
					break;
			}
		});

		this._worker.on("error", (err: Error) => {
			this._readyReject(err);
			for (const [, pending] of this._pending) {
				clearTimeout(pending.timer);
				pending.reject(err);
			}
			this._pending.clear();
		});

		this._worker.on("exit", (code) => {
			const err = new Error(`SandboxedShell worker exited with code ${code}`);
			this._readyReject(err);
			for (const [, pending] of this._pending) {
				clearTimeout(pending.timer);
				pending.reject(err);
			}
			this._pending.clear();
		});

		this._post({type: "init"});
	}

	async exec(cmd: string, user = "root", cwd = "/root"): Promise<ExecResult> {
		await this._ready;
		return new Promise<ExecResult>((resolve, reject) => {
			const id = String(this._nextId++);
			const timer = setTimeout(() => {
				this._pending.delete(id);
				reject(
					new Error(
						`SandboxedShell exec timed out after ${this._execTimeoutMs}ms`
					)
				);
			}, this._execTimeoutMs);
			this._pending.set(id, {resolve, reject, timer});
			this._post({type: "exec", id, cmd, user, cwd});
		});
	}

	terminate(): void {
		this._post({type: "terminate"});
		setTimeout(() => {
			try {
				this._worker.terminate();
			} catch {
				/* already terminated */
			}
		}, 1000);
	}

	private _post(msg: HostMessage): void {
		try {
			this._worker.postMessage(msg);
		} catch {
			/* worker already terminated */
		}
	}
}

export default SandboxedShell;
