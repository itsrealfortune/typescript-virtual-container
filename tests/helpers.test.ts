import { describe, expect, test } from "bun:test";
import { assertPathAccess } from "../src/SSHMimic/commands/helpers";

describe("assertPathAccess", () => {
	test("blocks non-root access to auth store", () => {
		expect(() =>
			assertPathAccess("alice", "/virtual-env-js/.auth/htpasswd", "cat"),
		).toThrow("cat: permission denied: /virtual-env-js/.auth/htpasswd");
	});

	test("allows root access to auth store", () => {
		expect(() =>
			assertPathAccess("root", "/virtual-env-js/.auth/htpasswd", "cat"),
		).not.toThrow();
	});

	test("allows non-root access outside protected paths", () => {
		expect(() =>
			assertPathAccess("alice", "/home/alice/README.txt", "cat"),
		).not.toThrow();
	});
});
