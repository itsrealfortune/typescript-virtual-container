import { describe, expect, test } from "bun:test";
import {
    getArg,
    getFlag,
    ifFlag,
} from "../src/SSHMimic/commands/command-helpers";

describe("command-helpers", () => {
	test("ifFlag detects plain and inline flag forms", () => {
		expect(ifFlag(["-l", "docs"], ["-l", "--long"])).toBe(true);
		expect(ifFlag(["--user=root", "whoami"], "--user")).toBe(true);
		expect(ifFlag(["docs"], ["-l", "--long"])).toBe(false);
	});

	test("getFlag returns value for adjacent and inline forms", () => {
		expect(getFlag(["-u", "root", "id"], ["-u", "--user"])).toBe("root");
		expect(getFlag(["--user=alice", "id"], ["-u", "--user"])).toBe("alice");
		expect(getFlag(["-i", "whoami"], "-i")).toBe("whoami");
		expect(getFlag(["-o"], "-o")).toBe(true);
		expect(getFlag(["pwd"], ["-u", "--user"])).toBeUndefined();
	});

	test("getArg skips bool and value flags", () => {
		const args = ["-i", "-u", "root", "sh", "-c", "whoami"];
		const options = { flags: ["-i"], flagsWithValue: ["-u"] };

		expect(getArg(args, 0, options)).toBe("sh");
		expect(getArg(args, 1, options)).toBe("-c");
		expect(getArg(args, 2, options)).toBe("whoami");
		expect(getArg(args, 3, options)).toBeUndefined();
	});

	test("getArg keeps tokens after -- as positional", () => {
		const args = ["-n", "--", "-n", "hello"];
		const options = { flags: ["-n"] };

		expect(getArg(args, 0, options)).toBe("-n");
		expect(getArg(args, 1, options)).toBe("hello");
	});
});
