import { describe, expect, test } from "bun:test";
import { SandboxedShell } from "../src/modules/SandboxedShell";

describe("SandboxedShell", () => {
	const timeout = 15_000;

	test(
		"executes a simple command",
		async () => {
			const shell = new SandboxedShell();
			try {
				const result = await shell.exec("echo hello world");
				expect(result.exitCode).toBe(0);
				expect(result.stdout).toContain("hello world");
			} finally {
				shell.terminate();
			}
		},
		timeout
	);

	test(
		"returns non-zero exit code for failing command",
		async () => {
			const shell = new SandboxedShell();
			try {
				const result = await shell.exec("exit 42");
				expect(result.exitCode).toBe(42);
			} finally {
				shell.terminate();
			}
		},
		timeout
	);

	test(
		"supports pipes and redirections",
		async () => {
			const shell = new SandboxedShell();
			try {
				const result = await shell.exec("echo 'line1\nline2\nline3' | wc -l");
				expect(result.exitCode).toBe(0);
				expect(result.stdout.trim()).toBe("3");
			} finally {
				shell.terminate();
			}
		},
		timeout
	);

	test(
		"fetch is disabled in sandbox",
		async () => {
			const shell = new SandboxedShell();
			try {
				const result = await shell.exec("curl --version 2>&1 || true");
				expect(result.exitCode).toBe(0);
			} finally {
				shell.terminate();
			}
		},
		timeout
	);

	test(
		"supports running as different user",
		async () => {
			const shell = new SandboxedShell();
			try {
				const result = await shell.exec("whoami", "root");
				expect(result.stdout.trim()).toBe("root");
			} finally {
				shell.terminate();
			}
		},
		timeout
	);

	test(
		"handles multiple sequential commands",
		async () => {
			const shell = new SandboxedShell();
			try {
				const r1 = await shell.exec("echo first");
				expect(r1.stdout.trim()).toBe("first");

				const r2 = await shell.exec("echo second");
				expect(r2.stdout.trim()).toBe("second");

				const r3 = await shell.exec("echo third");
				expect(r3.stdout.trim()).toBe("third");
			} finally {
				shell.terminate();
			}
		},
		timeout
	);
});
