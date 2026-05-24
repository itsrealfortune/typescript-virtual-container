import {afterEach, beforeEach, describe, expect, test} from "bun:test";
import * as fsSync from "node:fs";
import * as path from "node:path";
import {loadOrCreateHostKey} from "../src/modules/SSHMimic/hostKey";

const TEST_DIR = path.join(process.cwd(), ".test-hostkey");

function cleanup() {
	try {
		fsSync.rmSync(TEST_DIR, {recursive: true, force: true});
	} catch {
		/* ignore */
	}
}

describe("loadOrCreateHostKey", () => {
	beforeEach(cleanup);
	afterEach(cleanup);

	test("generates and persists a new RSA key", () => {
		const key = loadOrCreateHostKey(TEST_DIR);
		expect(key).toBeTruthy();
		expect(typeof key).toBe("string");
		expect(key).toContain("BEGIN RSA PRIVATE KEY");
	});

	test("returns PEM-encoded private key", () => {
		const key = loadOrCreateHostKey(TEST_DIR);
		expect(key.startsWith("-----BEGIN RSA PRIVATE KEY-----")).toBe(true);
		expect(key.includes("-----END RSA PRIVATE KEY-----")).toBe(true);
	});

	test("writes key to disk with restricted permissions", () => {
		loadOrCreateHostKey(TEST_DIR);
		const keyPath = path.join(TEST_DIR, ".ssh-mimic", "host_rsa");
		expect(fsSync.existsSync(keyPath)).toBe(true);
	});

	test("returns same key on subsequent calls", () => {
		const key1 = loadOrCreateHostKey(TEST_DIR);
		const key2 = loadOrCreateHostKey(TEST_DIR);
		expect(key1).toBe(key2);
	});

	test("creates .ssh-mimic directory if missing", () => {
		const dir = path.join(TEST_DIR, "nested", "path");
		const key = loadOrCreateHostKey(dir);
		expect(key).toBeTruthy();
		expect(fsSync.existsSync(path.join(dir, ".ssh-mimic", "host_rsa"))).toBe(
			true
		);
	});
});
