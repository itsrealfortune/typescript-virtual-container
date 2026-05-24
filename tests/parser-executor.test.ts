import { describe, expect, test } from "bun:test";
import { VirtualShell } from "../src";
import { executePipeline } from "../src/modules/SSHMimic/executor";
import {
	consumeHeredocs,
	parseScript,
	parseShellPipeline,
} from "../src/modules/VirtualShell/shellParser";

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
			shell
		);

		expect(result.exitCode).toBe(0);
		expect(result.stdout).toContain("hello");
	});
});

// ─── Heredoc tests ────────────────────────────────────────────────────────

describe("consumeHeredocs - heredoc preprocessing", () => {
	test("basic heredoc converted to here-string", () => {
		const result = consumeHeredocs("cat << EOF\nhello world\nEOF");
		expect(result).toBe("cat <<< 'hello world'");
	});

	test("strip-tab heredoc", () => {
		const result = consumeHeredocs("cat <<- TAB\n\t\thello\nTAB");
		expect(result).toBe("cat <<< 'hello'");
	});

	test("here-string <<< preserved", () => {
		const result = consumeHeredocs("cat <<< 'hello world'");
		expect(result).toBe("cat <<< 'hello world'");
	});

	test("heredoc inside quotes skipped", () => {
		const result = consumeHeredocs('echo "x << stuff"');
		expect(result).toBe('echo "x << stuff"');
	});

	test("multi-line heredoc body", () => {
		const result = consumeHeredocs("cat << EOF\nline1\nline2\nline3\nEOF");
		expect(result).toBe("cat <<< 'line1\nline2\nline3'");
	});

	test("heredoc via parseScript makes hereString available", () => {
		const result = parseScript("cat << EOF\nhello\nEOF");
		const cmd = result.statements?.[0]?.pipeline?.commands?.[0];
		expect(cmd?.hereString).toBe("hello");
	});
});
