import { describe, expect, test } from "bun:test";
import { VirtualShell } from "../src";
import { executePipeline } from "../src/SSHMimic/executor";
import { parseShellPipeline } from "../src/VirtualShell/shellParser";

describe("Pipeline parser and executor", () => {
	test("parses simple pipeline", () => {
		const pipeline = parseShellPipeline("echo hello | grep h");
		expect(pipeline.isValid).toBe(true);
		expect(pipeline.commands).toHaveLength(2);
		expect(pipeline.commands[0]?.name).toBe("echo");
		expect(pipeline.commands[1]?.name).toBe("grep");
	});

	test("handles invalid syntax", () => {
		const pipeline = parseShellPipeline("echo hello |");
		expect(pipeline.isValid).toBe(false);
		expect(pipeline.error).toBeDefined();
	});

	test("executes simple pipeline", async () => {
		const shell = new VirtualShell("localhost");
		const pipeline = parseShellPipeline("echo hello | grep h");

		const result = await executePipeline(
			pipeline,
			"root",
			"localhost",
			"shell",
			"/",
			shell,
		);

		expect(result.exitCode).toBe(0);
		expect(result.stdout).toContain("hello");
	});
});
