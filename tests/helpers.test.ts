import { describe, expect, test } from "bun:test";
import { assertPathAccess } from "../src/commands/helpers";

describe("assertPathAccess", () => {
	test("blocks non-root access to auth store", () => {
		expect(() =>
			assertPathAccess("alice", "/etc/htpasswd", "cat"),
		).toThrow("cat: permission denied: /etc/htpasswd");
	});

	test("allows root access to auth store", () => {
		expect(() =>
			assertPathAccess("root", "/etc/htpasswd", "cat"),
		).not.toThrow();
	});

	test("allows non-root access outside protected paths", () => {
		expect(() =>
			assertPathAccess("alice", "/home/alice/README.txt", "cat"),
		).not.toThrow();
	});
});
