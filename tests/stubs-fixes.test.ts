import { describe, expect, test } from "bun:test";
import { cpCommand } from "../src/commands/cp";
import { grepCommand } from "../src/commands/grep";
import { mvCommand } from "../src/commands/mv";
import { printfCommand } from "../src/commands/printf";
import { readCommand } from "../src/commands/read";
import { rmCommand } from "../src/commands/rm";
import { csplitCommand, splitCommand } from "../src/commands/textutils";
import VirtualFileSystem from "../src/modules/VirtualFileSystem";
import type { CommandContext, CommandResult } from "../src/types/commands";

function runCmd(cmd: { run: (ctx: CommandContext) => CommandResult | Promise<CommandResult> }, ctx: CommandContext): CommandResult {
	return cmd.run(ctx) as CommandResult;
}

function makeContext(overrides: Partial<CommandContext> = {}): CommandContext {
	const vfs = new VirtualFileSystem();
	return {
		shell: {
			vfs,
			users: {
				getUid: () => 0,
				getGid: () => 0,
			},
			packageManager: {
				isInstalled: () => true,
			},
		} as never,
		authUser: "root",
		hostname: "test",
		activeSessions: [],
		rawInput: "",
		mode: "exec" as never,
		cwd: "/tmp",
		args: [],
		stdin: "",
		uid: 0,
		gid: 0,
		env: { vars: {} as Record<string, string>, lastExitCode: 0 },
		...overrides,
	} as unknown as CommandContext;
}

describe("csplit", () => {
	test("splits file on regex pattern", () => {
		const ctx = makeContext({
			args: ["/tmp/input", "/split/"],
			cwd: "/",
		});
		ctx.shell.vfs.writeFile("/tmp/input", "before\nsplit\nafter\n");
		const result = runCmd(csplitCommand, ctx);
		expect(result.exitCode).toBe(0);
		expect(ctx.shell.vfs.exists("/xx00")).toBe(true);
		expect(ctx.shell.vfs.exists("/xx01")).toBe(true);
		expect(ctx.shell.vfs.readFile("/xx00")).toBe("before");
		expect(ctx.shell.vfs.readFile("/xx01")).toBe("split\nafter");
	});

	test("returns error for missing file", () => {
		const ctx = makeContext({ args: ["/nonexistent", "/pat/"] });
		const result = runCmd(csplitCommand, ctx);
		expect(result.exitCode).toBe(1);
		expect(result.stderr).toContain("No such file");
	});

	test("returns error for missing pattern", () => {
		const ctx = makeContext({ args: ["/tmp/input"] });
		ctx.shell.vfs.writeFile("/tmp/input", "content");
		const result = runCmd(csplitCommand, ctx);
		expect(result.exitCode).toBe(1);
		expect(result.stderr).toContain("missing pattern");
	});

	test("respects -f prefix", () => {
		const ctx = makeContext({
			args: ["-f", "chunk", "/tmp/input", "/sep/"],
			cwd: "/",
		});
		ctx.shell.vfs.writeFile("/tmp/input", "a\nsep\nb\n");
		runCmd(csplitCommand, ctx);
		expect(ctx.shell.vfs.exists("/chunk00")).toBe(true);
		expect(ctx.shell.vfs.exists("/chunk01")).toBe(true);
	});

	test("respects -n digits", () => {
		const ctx = makeContext({
			args: ["-n", "3", "/tmp/input", "/sep/"],
			cwd: "/",
		});
		ctx.shell.vfs.writeFile("/tmp/input", "a\nsep\nb\n");
		runCmd(csplitCommand, ctx);
		const entries = ctx.shell.vfs.list("/");
		expect(entries.some((e: string) => e.startsWith("xx000"))).toBe(true);
	});

	test("-s suppresses size output", () => {
		const ctx = makeContext({
			args: ["-s", "/tmp/input", "/sep/"],
			cwd: "/",
		});
		ctx.shell.vfs.writeFile("/tmp/input", "a\nsep\nb\n");
		const result = runCmd(csplitCommand, ctx);
		expect(result.stdout).toBeUndefined();
		expect(result.exitCode).toBe(0);
	});
});

describe("split", () => {
	test("splits file by lines", () => {
		const ctx = makeContext({ args: ["-l", "2", "/tmp/input", "part_"], cwd: "/" });
		ctx.shell.vfs.writeFile("/tmp/input", "a\nb\nc\nd\ne\n");
		const result = runCmd(splitCommand, ctx);
		expect(result.exitCode).toBe(0);
		expect(ctx.shell.vfs.exists("/part_a")).toBe(true);
		expect(ctx.shell.vfs.exists("/part_b")).toBe(true);
	});

	test("-d flag uses numeric suffixes", () => {
		const ctx = makeContext({ args: ["-d", "-l", "2", "/tmp/input", "num_"], cwd: "/" });
		ctx.shell.vfs.writeFile("/tmp/input", "a\nb\nc\nd\n");
		runCmd(splitCommand, ctx);
		expect(ctx.shell.vfs.exists("/num_00")).toBe(true);
		expect(ctx.shell.vfs.exists("/num_01")).toBe(true);
	});

	test("--additional-suffix appends to output files", () => {
		const ctx = makeContext({
			args: ["-l", "3", "--additional-suffix", ".txt", "/tmp/input", "pre_"],
			cwd: "/",
		});
		ctx.shell.vfs.writeFile("/tmp/input", "a\nb\nc\nd\ne\nf\n");
		runCmd(splitCommand, ctx);
		expect(ctx.shell.vfs.exists("/pre_a.txt")).toBe(true);
		expect(ctx.shell.vfs.exists("/pre_b.txt")).toBe(true);
	});

	test("missing file returns error", () => {
		const ctx = makeContext({ args: ["/nonexistent"] });
		const result = runCmd(splitCommand, ctx);
		expect(result.exitCode).toBe(1);
		expect(result.stderr).toContain("No such file");
	});
});

describe("printf -v", () => {
	test("-v var assigns output to variable", () => {
		const ctx = makeContext({ args: ["-v", "MYVAR", "hello %s", "world"] });
		const result = runCmd(printfCommand, ctx);
		expect(result.exitCode).toBe(0);
		expect(result.stdout).toBeUndefined();
		expect(ctx.env?.vars.MYVAR).toBe("hello world");
	});

	test("without -v prints to stdout", () => {
		const ctx = makeContext({ args: ["hello %s", "world"] });
		const result = runCmd(printfCommand, ctx);
		expect(result.exitCode).toBe(0);
		expect(result.stdout).toBe("hello world");
	});
});

describe("grep aliases", () => {
	test("grep module has egrep and fgrep aliases", () => {
		expect(grepCommand.aliases).toContain("egrep");
		expect(grepCommand.aliases).toContain("fgrep");
	});
});

describe("cp -i", () => {
	test("returns sudoChallenge when -i and dest exists", () => {
		const ctx = makeContext({
			args: ["-i", "/tmp/src.txt", "/tmp/dst.txt"],
			cwd: "/",
		});
		ctx.shell.vfs.writeFile("/tmp/src.txt", "content");
		ctx.shell.vfs.writeFile("/tmp/dst.txt", "existing");
		const result = runCmd(cpCommand, ctx);
		expect(result.sudoChallenge).toBeDefined();
		expect(result.sudoChallenge?.prompt).toContain("overwrite");
	});

	test("without -i overwrites silently", () => {
		const ctx = makeContext({
			args: ["/tmp/src.txt", "/tmp/dst.txt"],
			cwd: "/",
		});
		ctx.shell.vfs.writeFile("/tmp/src.txt", "new");
		ctx.shell.vfs.writeFile("/tmp/dst.txt", "old");
		const result = runCmd(cpCommand, ctx);
		expect(result.exitCode).toBe(0);
		expect(result.sudoChallenge).toBeUndefined();
	});
});

describe("mv -i", () => {
	test("returns sudoChallenge when -i and dest exists", () => {
		const ctx = makeContext({
			args: ["-i", "/tmp/src.txt", "/tmp/dst.txt"],
			cwd: "/",
		});
		ctx.shell.vfs.writeFile("/tmp/src.txt", "content");
		ctx.shell.vfs.writeFile("/tmp/dst.txt", "existing");
		const result = runCmd(mvCommand, ctx);
		expect(result.sudoChallenge).toBeDefined();
		expect(result.sudoChallenge?.prompt).toContain("overwrite");
	});

	test("without -i refuses to overwrite", () => {
		const ctx = makeContext({
			args: ["/tmp/src.txt", "/tmp/dst.txt"],
			cwd: "/",
		});
		ctx.shell.vfs.writeFile("/tmp/src.txt", "content");
		ctx.shell.vfs.writeFile("/tmp/dst.txt", "existing");
		const result = runCmd(mvCommand, ctx);
		expect(result.exitCode).toBe(1);
		expect(result.stderr).toContain("already exists");
	});
});

describe("rm -I", () => {
	test("prompts for > 3 files", () => {
		const ctx = makeContext({
			args: ["-I", "/tmp/a.txt", "/tmp/b.txt", "/tmp/c.txt", "/tmp/d.txt"],
			cwd: "/",
		});
		for (const f of ["/tmp/a.txt", "/tmp/b.txt", "/tmp/c.txt", "/tmp/d.txt"]) {
			ctx.shell.vfs.writeFile(f, "x");
		}
		const result = runCmd(rmCommand, ctx);
		expect(result.sudoChallenge).toBeDefined();
	});

	test("removes without prompt for <= 3 files", () => {
		const ctx = makeContext({ args: ["-I", "/tmp/a.txt", "/tmp/b.txt"], cwd: "/" });
		ctx.shell.vfs.writeFile("/tmp/a.txt", "x");
		ctx.shell.vfs.writeFile("/tmp/b.txt", "x");
		const result = runCmd(rmCommand, ctx);
		expect(result.exitCode).toBe(0);
		expect(result.sudoChallenge).toBeUndefined();
	});
});

describe("read", () => {
	test("reads input into REPLY", () => {
		const ctx = makeContext({
			args: [],
			stdin: "hello world\n",
			env: { vars: {}, lastExitCode: 0 },
		});
		const result = runCmd(readCommand, ctx);
		expect(result.exitCode).toBe(0);
		expect(ctx.env?.vars.REPLY).toBe("hello world");
	});

	test("reads into named variable", () => {
		const ctx = makeContext({
			args: ["MYVAR"],
			stdin: "test value\n",
			env: { vars: {}, lastExitCode: 0 },
		});
		runCmd(readCommand, ctx);
		expect(ctx.env?.vars.MYVAR).toBe("test value");
	});

	test("-n nchars reads limited characters", () => {
		const ctx = makeContext({
			args: ["-n", "5", "VAR"],
			stdin: "hello world\n",
			env: { vars: {}, lastExitCode: 0 },
		});
		runCmd(readCommand, ctx);
		expect(ctx.env?.vars.VAR).toBe("hello");
	});

	test("-d delim uses custom delimiter", () => {
		const ctx = makeContext({
			args: ["-d", ":", "VAR"],
			stdin: "key:value\n",
			env: { vars: {}, lastExitCode: 0 },
		});
		runCmd(readCommand, ctx);
		expect(ctx.env?.vars.VAR).toBe("key");
	});

	test("-a array reads words into array", () => {
		const ctx = makeContext({
			args: ["-a", "ARR"],
			stdin: "one two three\n",
			env: { vars: {}, lastExitCode: 0 },
		});
		runCmd(readCommand, ctx);
		expect(ctx.env?.vars["ARR[0]"]).toBe("one two three");
		expect(ctx.env?.vars["ARR[1]"]).toBe("two");
		expect(ctx.env?.vars["#ARR[@]"]).toBe("3");
	});
});
