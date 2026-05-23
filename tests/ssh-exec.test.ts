import {describe, expect, test} from "bun:test";
import {VirtualShell} from "../src";
import {runExec} from "../src/modules/SSHMimic/exec";

describe("SSH exec inline commands", () => {
	test("runExec sends stdout, stderr, and exit code for inline commands", async () => {
		const shell = new VirtualShell("localhost");
		const stdout: string[] = [];
		const stderr: string[] = [];
		let exitCode = -1;

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
			end() {},
		};

		await shell.ensureInitialized();

		const endPromise = new Promise<void>((resolve) => {
			stream.end = () => {
				resolve();
			};
		});

		runExec(stream as never, "echo hello", "root", "localhost", shell);
		await endPromise;

		expect(stdout.join("")).toContain("hello");
		expect(stderr.join("")).toBe("");
		expect(exitCode).toBe(0);
	});
});
