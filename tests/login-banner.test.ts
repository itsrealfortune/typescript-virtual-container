import { describe, expect, test } from "bun:test";
import { buildLoginBanner } from "../src/modules/SSHMimic/loginBanner";
import type { ShellProperties } from "../src/modules/VirtualShell";

const DEFAULT_PROPS: ShellProperties = {
	kernel: "6.8.0-fortune",
	arch: "x86_64",
	os: "Fortune GNU/Linux x64",
};

describe("buildLoginBanner", () => {
	test("includes hostname, kernel, and arch", () => {
		const banner = buildLoginBanner("fortress", DEFAULT_PROPS, null);
		expect(banner).toContain("Linux fortress");
		expect(banner).toContain("6.8.0-fortune");
		expect(banner).toContain("x86_64");
	});

	test("includes warranty notice", () => {
		const banner = buildLoginBanner("vm", DEFAULT_PROPS, null);
		expect(banner).toContain("ABSOLUTELY NO WARRANTY");
		expect(banner).toContain("free software");
	});

	test("includes last login when provided", () => {
		const banner = buildLoginBanner("vm", DEFAULT_PROPS, {
			at: "2024-03-15T10:30:00Z",
			from: "192.168.1.100",
		});
		expect(banner).toContain("Last login:");
		expect(banner).toContain("192.168.1.100");
	});

	test("handles null last login gracefully", () => {
		const banner = buildLoginBanner("vm", DEFAULT_PROPS, null);
		expect(banner).not.toContain("Last login:");
	});

	test("handles invalid date string in lastLogin", () => {
		const banner = buildLoginBanner("vm", DEFAULT_PROPS, {
			at: "not-a-date",
			from: "10.0.0.1",
		});
		expect(banner).toContain("Last login: not-a-date from 10.0.0.1");
	});

	test("uses CRLF line endings", () => {
		const banner = buildLoginBanner("vm", DEFAULT_PROPS, null);
		expect(banner).toContain("\r\n");
	});

	test("ends with CRLF", () => {
		const banner = buildLoginBanner("vm", DEFAULT_PROPS, null);
		expect(banner.endsWith("\r\n")).toBe(true);
	});

	test("handles empty from address", () => {
		const banner = buildLoginBanner("vm", DEFAULT_PROPS, {
			at: "2024-01-01T00:00:00Z",
			from: "",
		});
		expect(banner).toContain("from unknown");
	});
});
