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

	test("allows non-root access to /etc/shadow", () => {
		// /etc/shadow is not in PROTECTED_PREFIXES
		expect(() =>
			assertPathAccess("alice", "/etc/shadow", "cat"),
		).not.toThrow();
	});

	test("allows root access to /etc/shadow", () => {
		expect(() =>
			assertPathAccess("root", "/etc/shadow", "cat"),
		).not.toThrow();
	});

	test("allows non-root access to /etc/passwd", () => {
		// /etc/passwd is not in PROTECTED_PREFIXES
		expect(() =>
			assertPathAccess("alice", "/etc/passwd", "cat"),
		).not.toThrow();
	});

	test("allows non-root access to /etc/group", () => {
		// /etc/group is not in PROTECTED_PREFIXES
		expect(() =>
			assertPathAccess("alice", "/etc/group", "cat"),
		).not.toThrow();
	});

	test("allows user access to /home/alice", () => {
		expect(() =>
			assertPathAccess("alice", "/home/alice", "ls"),
		).not.toThrow();
	});

	test("allows user access to /tmp", () => {
		expect(() =>
			assertPathAccess("alice", "/tmp", "ls"),
		).not.toThrow();
	});

	test("different commands have proper error messages", () => {
		expect(() =>
			assertPathAccess("alice", "/etc/htpasswd", "grep"),
		).toThrow("grep: permission denied: /etc/htpasswd");
	});

	test("different commands (ls) have proper error messages", () => {
		expect(() =>
			assertPathAccess("alice", "/etc/htpasswd", "ls"),
		).toThrow("ls: permission denied: /etc/htpasswd");
	});

	test("root access to home directories", () => {
		expect(() =>
			assertPathAccess("root", "/home/alice/private.txt", "cat"),
		).not.toThrow();
	});

	test("allows non-root access to /usr/bin", () => {
		expect(() =>
			assertPathAccess("alice", "/usr/bin", "ls"),
		).not.toThrow();
	});

	test("allows non-root access to /var", () => {
		expect(() =>
			assertPathAccess("alice", "/var/log", "ls"),
		).not.toThrow();
	});

	test("blocks specific protected paths only", () => {
		expect(() =>
			assertPathAccess("alice", "/etc/public.txt", "cat"),
		).not.toThrow();
	});
});
