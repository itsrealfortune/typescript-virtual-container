import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { createWebShell } from "../src/web";

type Listener = () => void;

class MockRequest<T> {
	public result: T;
	public error: unknown = null;
	private readonly listeners = new Map<string, Listener[]>();

	constructor(result: T) {
		this.result = result;
	}

	addEventListener(
		type: "success" | "error" | "complete" | "abort" | "upgradeneeded",
		listener: Listener,
	): void {
		const bucket = this.listeners.get(type) ?? [];
		bucket.push(listener);
		this.listeners.set(type, bucket);
	}

	emit(type: "success" | "error" | "complete" | "abort" | "upgradeneeded"): void {
		for (const listener of this.listeners.get(type) ?? []) {
			listener();
		}
	}
}

class MockTransaction {
	public error: unknown = null;
	private readonly listeners = new Map<string, Listener[]>();

	constructor(private readonly store: Map<string, string>) {}

	objectStore(_name: string): {
		get(key: string): MockRequest<string | undefined>;
		put(value: string, key: string): MockRequest<unknown>;
	} {
		return {
			get: (key: string) => {
				const request = new MockRequest<string | undefined>(this.store.get(key));
				setTimeout(() => request.emit("success"), 0);
				return request;
			},
			put: (value: string, key: string) => {
				const request = new MockRequest<unknown>(undefined);
				setTimeout(() => {
					this.store.set(key, value);
					request.emit("success");
					setTimeout(() => {
						for (const listener of this.listeners.get("complete") ?? []) {
							listener();
						}
					}, 0);
				}, 0);
				return request;
			},
		};
	}

	addEventListener(type: "complete" | "error" | "abort", listener: Listener): void {
		const bucket = this.listeners.get(type) ?? [];
		bucket.push(listener);
		this.listeners.set(type, bucket);
	}
}

class MockDatabase {
	public readonly objectStoreNames = {
		contains: (name: string) => this.stores.has(name),
	};

	constructor(private readonly stores: Map<string, Map<string, string>>) {}

	createObjectStore(name: string): unknown {
		if (!this.stores.has(name)) {
			this.stores.set(name, new Map());
		}
		return {};
	}

	transaction(name: string, _mode: "readonly" | "readwrite"): MockTransaction {
		const store = this.stores.get(name) ?? new Map<string, string>();
		this.stores.set(name, store);
		return new MockTransaction(store);
	}

	close(): void {}
}

class MockOpenRequest {
	public readonly result: MockDatabase;
	public error: unknown = null;
	private readonly listeners = new Map<string, Listener[]>();

	constructor(result: MockDatabase) {
		this.result = result;
		setTimeout(() => {
			for (const listener of this.listeners.get("upgradeneeded") ?? []) {
				listener();
			}
			for (const listener of this.listeners.get("success") ?? []) {
				listener();
			}
		}, 0);
	}

	addEventListener(type: "upgradeneeded" | "success" | "error", listener: Listener): void {
		const bucket = this.listeners.get(type) ?? [];
		bucket.push(listener);
		this.listeners.set(type, bucket);
	}
}

class MockIndexedDbFactory {
	private readonly databases = new Map<string, MockDatabase>();

	open(name: string, _version = 1): MockOpenRequest {
		const database = this.databases.get(name) ?? new MockDatabase(new Map());
		this.databases.set(name, database);
		return new MockOpenRequest(database);
	}
}

const originalIndexedDb = Reflect.get(globalThis, "indexedDB");
const factory = new MockIndexedDbFactory();

beforeEach(() => {
	Reflect.set(globalThis, "indexedDB", factory);
});

afterEach(() => {
	Reflect.set(globalThis, "indexedDB", originalIndexedDb);
});

describe("web shell", () => {
	test("executes basic commands", async () => {
		const shell = createWebShell("web-test", { vfs: { databaseName: "web-test-basic" } });
		await shell.ensureInitialized();

		const pwd = await shell.executeCommandLine("pwd", false);
		expect(pwd.exitCode).toBe(0);
		expect(pwd.stdout?.trim()).toBe("/home/root");

		const echo = await shell.executeCommandLine("echo hello", false);
		expect(echo.exitCode).toBe(0);
		expect(echo.stdout).toBe("hello\n");
	});

	test("supports pipes and redirections", async () => {
		const shell = createWebShell("web-test", { vfs: { databaseName: "web-test-pipes" } });
		await shell.ensureInitialized();

		const piped = await shell.executeCommandLine("echo hello | cat", false);
		expect(piped.exitCode).toBe(0);
		expect(piped.stdout).toContain("hello");

		const redirected = await shell.executeCommandLine("echo stored > /tmp/web-shell.txt", false);
		expect(redirected.exitCode).toBe(0);

		const cat = await shell.executeCommandLine("cat /tmp/web-shell.txt", false);
		expect(cat.exitCode).toBe(0);
		expect(cat.stdout).toBe("stored\n");
	});

	test("persists snapshot through indexeddb", async () => {
		const databaseName = "web-test-persist";
		const firstShell = createWebShell("web-test", { vfs: { databaseName } });
		await firstShell.ensureInitialized();
		await firstShell.executeCommandLine("echo persisted > /tmp/persisted.txt", false);
		await firstShell.vfs.flushMirror();

		const secondShell = createWebShell("web-test", { vfs: { databaseName } });
		await secondShell.ensureInitialized();
		const cat = await secondShell.executeCommandLine("cat /tmp/persisted.txt", false);

		expect(cat.exitCode).toBe(0);
		expect(cat.stdout).toBe("persisted\n");
	});
});