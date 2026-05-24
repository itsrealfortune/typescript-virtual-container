import {describe, expect, test} from "bun:test";
import {buildPrompt, expandPs1} from "../src/modules/SSHMimic/prompt";

describe("expandPs1", () => {
	test("expands \\u to user", () => {
		expect(expandPs1("\\u", "alice", "host", "/home/alice")).toBe("alice");
	});

	test("expands \\h to short hostname", () => {
		expect(expandPs1("\\h", "root", "server.domain.com", "/root")).toBe(
			"server"
		);
	});

	test("expands \\H to full hostname", () => {
		expect(expandPs1("\\H", "root", "server.domain.com", "/root")).toBe(
			"server.domain.com"
		);
	});

	test("expands \\w to tilde when in home", () => {
		expect(expandPs1("\\w", "alice", "host", "/home/alice")).toBe("~");
	});

	test("expands \\w to tilde path when inside home", () => {
		expect(expandPs1("\\w", "alice", "host", "/home/alice/projects")).toBe(
			"~/projects"
		);
	});

	test("expands \\W to base directory name", () => {
		expect(expandPs1("\\W", "root", "host", "/var/log/nginx")).toBe("nginx");
	});

	test("expands \\$ to # for root", () => {
		expect(expandPs1("\\$", "root", "host", "/root")).toBe("#");
	});

	test("expands \\$ to $ for non-root", () => {
		expect(expandPs1("\\$", "alice", "host", "/home/alice")).toBe("$");
	});

	test("expands \\n to newline", () => {
		expect(expandPs1("line1\\nline2", "root", "host", "/root")).toBe(
			"line1\nline2"
		);
	});

	test("expands \\\\ to backslash", () => {
		expect(expandPs1("path\\\\to\\\\dir", "root", "host", "/root")).toBe(
			"path\\to\\dir"
		);
	});

	test("converts \\033[ and \\e[ to raw escape codes", () => {
		const result = expandPs1("\\033[31mred\\e[0m", "root", "host", "/root");
		expect(result).toBe("\x1b[31mred\x1b[0m");
	});

	test("readlineMode wraps ANSI with SOH/STX", () => {
		const result = expandPs1(
			"\\[\\033[31m\\]red\\[\\033[0m\\]",
			"root",
			"host",
			"/root",
			true
		);
		expect(result).toBe("\x01\x1b[31m\x02red\x01\x1b[0m\x02");
	});

	test("non-readline mode strips \\[ \\] markers", () => {
		const result = expandPs1(
			"\\[\\033[31m\\]red\\[\\033[0m\\]",
			"root",
			"host",
			"/root",
			false
		);
		expect(result).toBe("\x1b[31mred\x1b[0m");
	});

	test("root home is /root", () => {
		expect(expandPs1("\\w", "root", "host", "/root")).toBe("~");
		expect(expandPs1("\\w", "root", "host", "/root/etc")).toBe("~/etc");
	});

	test("full PS1 template expansion", () => {
		const result = expandPs1(
			"\\u@\\h:\\w\\$ ",
			"alice",
			"box.lan",
			"/home/alice/code"
		);
		expect(result).toBe("alice@box:~/code$ ");
	});
});

describe("buildPrompt", () => {
	test("expands PS1 when provided", () => {
		const result = buildPrompt("root", "server", "~", "\\u:\\w# ", undefined, false);
		expect(result).toContain("root");
		expect(result).toContain("~");
		expect(result).toContain("#");
	});

	function stripAnsi(s: string): string {
		// biome-ignore lint/suspicious/noControlCharactersInRegex: need raw ESC to match ANSI codes
		return s.replace(/\x1b\[[0-9;]*m/g, "");
	}

	test("returns colored default prompt for root without PS1", () => {
		const result = buildPrompt("root", "hostname", "/root", undefined, undefined, false);
		const plain = stripAnsi(result);
		expect(plain).toContain("root@hostname");
		expect(plain).toContain("#");
		expect(result).toContain("\x1b[");
	});

	test("returns colored default prompt for user without PS1", () => {
		const result = buildPrompt("alice", "box", "~", undefined, undefined, false);
		const plain = stripAnsi(result);
		expect(plain).toContain("alice@box");
		expect(plain).toContain("$");
		expect(result).toContain("\x1b[");
	});

	test("readlineMode wraps ANSI in default prompt", () => {
		const result = buildPrompt("alice", "box", "~", undefined, undefined, true);
		expect(result).toContain("\x01");
		expect(result).toContain("\x02");
	});

	test("uses fullCwd for PS1 expansion when provided", () => {
		const result = buildPrompt(
			"alice",
			"box",
			"code",
			"\\w",
			"/home/alice/code",
			false
		);
		expect(result).toBe("~/code");
	});
});
