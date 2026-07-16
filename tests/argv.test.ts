import { describe, expect, test } from "bun:test";
import { getFlag, getOptionInt, getOptionString } from "../src/utils/argv";

describe("getFlag", () => {
	test("returns true for present flag", () => {
		expect(getFlag(["--verbose"], "--verbose")).toBe(true);
	});

	test("returns false for absent flag", () => {
		expect(getFlag([], "--verbose")).toBe(false);
	});

	test("finds flag among other args", () => {
		expect(getFlag(["-a", "-b", "-c"], "-b")).toBe(true);
	});

	test("false if similar flag exists", () => {
		expect(getFlag(["--version"], "--verbose")).toBe(false);
	});

	test("multiple occurrences still true", () => {
		expect(getFlag(["-v", "-v"], "-v")).toBe(true);
	});
});

describe("getOptionString", () => {
	test("returns value for --name VALUE form", () => {
		expect(getOptionString(["--output", "out.txt"], "--output", "")).toBe(
			"out.txt"
		);
	});

	test("returns value for --name=VALUE form", () => {
		expect(getOptionString(["--output=out.txt"], "--output", "")).toBe(
			"out.txt"
		);
	});

	test("returns fallback when option absent", () => {
		expect(getOptionString([], "--output", "default")).toBe("default");
	});

	test("next arg starting with -- is not a value", () => {
		expect(getOptionString(["--output", "--other"], "--output", "")).toBe("");
	});

	test("falls back when next arg is another flag", () => {
		expect(getOptionString(["--name", "--flag"], "--name", "def")).toBe("def");
	});
});

describe("getOptionInt", () => {
	test("returns integer for --name VALUE form", () => {
		expect(getOptionInt(["--port", "8080"], "--port", 0)).toBe(8080);
	});

	test("returns integer for --name=VALUE form", () => {
		expect(getOptionInt(["--port=8080"], "--port", 0)).toBe(8080);
	});

	test("returns fallback when option absent", () => {
		expect(getOptionInt([], "--port", 2222)).toBe(2222);
	});

	test("returns NaN for unparseable value", () => {
		expect(getOptionInt(["--port", "abc"], "--port", 0)).toBeNaN();
	});

	test("handles negative integers", () => {
		expect(getOptionInt(["--level", "-1"], "--level", 0)).toBe(-1);
	});
});
