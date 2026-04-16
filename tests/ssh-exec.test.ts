import { describe, expect, test } from "bun:test";
import { VirtualShell } from "../src";
import { runExec } from "../src/SSHMimic/exec";

describe("SSH exec inline commands", () => {
	test("runExec sends stdout, stderr, and exit code for inline commands", async () => {
		const shell = new VirtualShell("localhost");
		const stdout: string[] = [];
		const stderr: string[] = [];
		let exitCode: number = -1;

		const stream = {
			write(data: string) {
				stdout.push(data);
			},
			stderr: {
				write(data: string) {
					stderr.push(data);
				},
			},
			exit(code: number) {
				exitCode = code;
			},
			end() {
				return undefined;
			},
		};

		await shell.ensureInitialized();

		const endPromise = new Promise<void>((resolve) => {
			stream.end = () => {
				resolve();
				return;
			};
		});

		runExec(stream as never, "echo hello", "root", "localhost", shell);
		await endPromise;

		expect(stdout.join("")).toContain("hello");
		expect(stderr.join("")).toBe("");
		expect(exitCode).toBe(0);
	});
});
