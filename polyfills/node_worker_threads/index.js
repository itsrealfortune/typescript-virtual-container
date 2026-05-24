/**
 * Polyfill for `node:worker_threads` — browser environments (esbuild-compatible).
 */

const _MessageChannel = globalThis.MessageChannel;
const _MessagePort = globalThis.MessagePort;
const _Worker = globalThis.Worker;

export { _MessageChannel as MessageChannel, _MessagePort as MessagePort };

export const isMainThread = true;
export const workerData = null;
export const parentPort = null;

class EventEmitter {
	constructor() {
		this._listeners = new Map();
	}

	on(event, fn) {
		const list = this._listeners.get(event) ?? [];
		list.push(fn);
		this._listeners.set(event, list);
		return this;
	}

	once(event, fn) {
		const wrapper = (...args) => {
			this.off(event, wrapper);
			fn(...args);
		};
		return this.on(event, wrapper);
	}

	off(event, fn) {
		const list = this._listeners.get(event) ?? [];
		this._listeners.set(event, list.filter((l) => l !== fn));
		return this;
	}

	emit(event, ...args) {
		const list = this._listeners.get(event) ?? [];
		list.forEach((fn) => fn(...args));
		return list.length > 0;
	}
}

export class Worker extends EventEmitter {
	constructor(filename, options = {}) {
		super();

		const workerType = options.type === "module" ? "module" : "classic";
		const url = filename instanceof URL
			? filename
			: new globalThis.URL(String(filename), globalThis.location?.href ?? "file:///");

		this._webWorker = new _Worker(url.href, { type: workerType });

		if (options.workerData !== undefined) {
			this._webWorker.postMessage(
				{ __workerData__: options.workerData },
				options.transferList ?? []
			);
		}

		this._webWorker.addEventListener("message", (ev) => this.emit("message", ev.data));
		this._webWorker.addEventListener("messageerror", (ev) => this.emit("messageerror", ev.data));
		this._webWorker.addEventListener("error", (ev) => {
			this.emit("error", ev.error instanceof Error ? ev.error : new Error(ev.message));
		});
	}

	postMessage(value, transferList) {
		this._webWorker.postMessage(value, transferList ?? []);
	}

	terminate() {
		this._webWorker.terminate();
		this.emit("exit", 0);
		return Promise.resolve(0);
	}

	get threadId() { return 1; }
}