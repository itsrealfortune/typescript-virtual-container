import { describe, expect, test } from "bun:test";
import { getArg, getFlag, ifFlag } from "../src/commands/command-helpers";

describe("command-helpers", () => {
	test("ifFlag detects plain and inline flag forms", () => {
		expect(ifFlag(["-l", "docs"], ["-l", "--long"])).toBe(true);
		expect(ifFlag(["--user=root", "whoami"], "--user")).toBe(true);
		expect(ifFlag(["docs"], ["-l", "--long"])).toBe(false);
	});

	test("ifFlag with multiple flags checks all", () => {
		expect(ifFlag(["-l", "-h"], ["-l", "--long"])).toBe(true);
		expect(ifFlag(["-h"], ["-l", "--long"])).toBe(false);
		expect(ifFlag(["-l"], ["-l", "--long"])).toBe(true);
	});

	test("ifFlag empty args returns false", () => {
		expect(ifFlag([], ["-l", "--long"])).toBe(false);
	});

	test("ifFlag single flag array", () => {
		expect(ifFlag(["-n"], "-n")).toBe(true);
		expect(ifFlag(["-m"], "-n")).toBe(false);
	});

	test("getFlag returns value for adjacent and inline forms", () => {
		expect(getFlag(["-u", "root", "id"], ["-u", "--user"])).toBe("root");
		expect(getFlag(["--user=alice", "id"], ["-u", "--user"])).toBe("alice");
		expect(getFlag(["-i", "whoami"], "-i")).toBe("whoami");
		expect(getFlag(["-o"], "-o")).toBe(true);
		expect(getFlag(["pwd"], ["-u", "--user"])).toBeUndefined();
	});

	test("getFlag with multiple flag aliases", () => {
		expect(getFlag(["-u", "john"], ["-u", "--user", "-U"])).toBe("john");
		expect(getFlag(["--user=mary"], ["-u", "--user"])).toBe("mary");
		expect(getFlag(["-U", "admin"], ["-u", "--user", "-U"])).toBe("admin");
	});

	test("getFlag inline with equals", () => {
		expect(getFlag(["--option=value"], "--option")).toBe("value");
		expect(getFlag(["--opt=123"], "--opt")).toBe("123");
	});

	test("getFlag first occurrence", () => {
		expect(getFlag(["-u", "first", "-u", "second"], "-u")).toBe("first");
	});

	test("getFlag with boolean flag", () => {
		expect(getFlag(["-v"], "-v")).toBe(true);
		expect(getFlag(["-v", "file.txt"], "-v")).toBe("file.txt");
	});

	test("getArg skips bool and value flags", () => {
		const args = ["-i", "-u", "root", "sh", "-c", "whoami"];
		const options = { flags: ["-i"], flagsWithValue: ["-u"] };

		expect(getArg(args, 0, options)).toBe("sh");
		expect(getArg(args, 1, options)).toBe("-c");
		expect(getArg(args, 2, options)).toBe("whoami");
		expect(getArg(args, 3, options)).toBeUndefined();
	});

	test("getArg with no flags", () => {
		const args = ["file1", "file2", "file3"];
		const options = { flags: [], flagsWithValue: [] };

		expect(getArg(args, 0, options)).toBe("file1");
		expect(getArg(args, 1, options)).toBe("file2");
		expect(getArg(args, 2, options)).toBe("file3");
	});

	test("getArg empty args", () => {
		const args: string[] = [];
		const options = { flags: ["-n"] };

		expect(getArg(args, 0, options)).toBeUndefined();
	});

	test("getArg skips values for flagsWithValue", () => {
		const args = ["-d", ":", "-f", "1", "input.txt"];
		const options = { flagsWithValue: ["-d", "-f"] };

		expect(getArg(args, 0, options)).toBe("input.txt");
	});

	test("getArg keeps tokens after -- as positional", () => {
		const args = ["-n", "--", "-n", "hello"];
		const options = { flags: ["-n"] };

		expect(getArg(args, 0, options)).toBe("-n");
		expect(getArg(args, 1, options)).toBe("hello");
	});

	test("getArg -- blocks all flag processing", () => {
		const args = ["-a", "--", "-a", "-b", "-c"];
		const options = { flags: ["-a", "-b", "-c"] };

		expect(getArg(args, 0, options)).toBe("-a");
		expect(getArg(args, 1, options)).toBe("-b");
		expect(getArg(args, 2, options)).toBe("-c");
	});

	test("getArg with mixed flags and positionals", () => {
		const args = ["-v", "file1", "-o", "output.txt", "file2"];
		const options = { flags: ["-v"], flagsWithValue: ["-o"] };

		expect(getArg(args, 0, options)).toBe("file1");
		expect(getArg(args, 1, options)).toBe("file2");
	});

	test("getArg at end of args", () => {
		const args = ["a", "b", "c"];
		expect(getArg(args, 5, {})).toBeUndefined();
	});
});
