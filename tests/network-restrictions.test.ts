import {describe, expect, test} from "bun:test";
import {
	isPrivateHostname,
	checkOutboundRestriction,
	honeypotResponse,
} from "../src/utils/networkRestrictions";

describe("isPrivateHostname", () => {
	test("detects RFC1918 10.x.x.x", () => {
		expect(isPrivateHostname("10.0.0.1")).toBe(true);
		expect(isPrivateHostname("10.255.255.255")).toBe(true);
	});

	test("detects RFC1918 172.16-31.x.x", () => {
		expect(isPrivateHostname("172.16.0.1")).toBe(true);
		expect(isPrivateHostname("172.31.255.255")).toBe(true);
		expect(isPrivateHostname("172.32.0.1")).toBe(false);
	});

	test("detects RFC1918 192.168.x.x", () => {
		expect(isPrivateHostname("192.168.0.1")).toBe(true);
		expect(isPrivateHostname("192.168.255.255")).toBe(true);
	});

	test("detects loopback", () => {
		expect(isPrivateHostname("127.0.0.1")).toBe(true);
		expect(isPrivateHostname("127.255.255.255")).toBe(true);
	});

	test("detects link-local", () => {
		expect(isPrivateHostname("169.254.1.1")).toBe(true);
	});

	test("detects IPv6 loopback", () => {
		expect(isPrivateHostname("::1")).toBe(true);
	});

	test("detects IPv6 unique-local", () => {
		expect(isPrivateHostname("fc00::1")).toBe(true);
		expect(isPrivateHostname("fd12:3456::1")).toBe(true);
	});

	test("detects IPv6 link-local", () => {
		expect(isPrivateHostname("fe80::1")).toBe(true);
	});

	test("allows public IPs", () => {
		expect(isPrivateHostname("8.8.8.8")).toBe(false);
		expect(isPrivateHostname("1.1.1.1")).toBe(false);
		expect(isPrivateHostname("93.184.216.34")).toBe(false);
	});

	test("allows hostnames", () => {
		expect(isPrivateHostname("example.com")).toBe(false);
		expect(isPrivateHostname("google.com")).toBe(false);
	});
});

describe("checkOutboundRestriction", () => {
	test("allow-all mode permits everything", () => {
		expect(
			checkOutboundRestriction("http://192.168.1.1", {mode: "allow-all"})
		).toEqual({allowed: true, honeypot: false});
	});

	test("block-private blocks RFC1918", () => {
		const result = checkOutboundRestriction("http://10.0.0.1/test", {
			mode: "block-private",
		});
		expect(result.allowed).toBe(false);
		expect(result.reason).toBe("private address");
	});

	test("block-private allows public IPs", () => {
		expect(
			checkOutboundRestriction("http://8.8.8.8/test", {mode: "block-private"})
		).toEqual({allowed: true, honeypot: false});
	});

	test("block-private allows hostnames", () => {
		expect(
			checkOutboundRestriction("http://example.com/test", {
				mode: "block-private",
			})
		).toEqual({allowed: true, honeypot: false});
	});

	test("block-private with honeypot flag", () => {
		const result = checkOutboundRestriction("http://192.168.1.1/test", {
			mode: "block-private",
			honeypot: true,
		});
		expect(result.allowed).toBe(false);
		expect(result.honeypot).toBe(true);
	});

	test("blocklist blocks matching domain", () => {
		const result = checkOutboundRestriction("http://evil.com/malware", {
			mode: "blocklist",
			blocklist: ["evil.com"],
		});
		expect(result.allowed).toBe(false);
		expect(result.reason).toBe("blocklisted");
	});

	test("blocklist blocks subdomain", () => {
		const result = checkOutboundRestriction("http://sub.evil.com/test", {
			mode: "blocklist",
			blocklist: ["evil.com"],
		});
		expect(result.allowed).toBe(false);
	});

	test("blocklist allows non-listed domains", () => {
		expect(
			checkOutboundRestriction("http://good.com/test", {
				mode: "blocklist",
				blocklist: ["evil.com"],
			})
		).toEqual({allowed: true, honeypot: false});
	});

	test("allowlist blocks domains not in list", () => {
		const result = checkOutboundRestriction("http://evil.com/test", {
			mode: "allowlist",
			allowlist: ["good.com"],
		});
		expect(result.allowed).toBe(false);
		expect(result.reason).toBe("not in allowlist");
	});

	test("allowlist permits listed domains", () => {
		expect(
			checkOutboundRestriction("http://good.com/test", {
				mode: "allowlist",
				allowlist: ["good.com"],
			})
		).toEqual({allowed: true, honeypot: false});
	});

	test("undefined config returns allowed", () => {
		expect(
			checkOutboundRestriction("http://192.168.1.1/test", undefined)
		).toEqual({allowed: true, honeypot: false});
	});

	test("no mode defaults to allow-all", () => {
		expect(checkOutboundRestriction("http://192.168.1.1/test", {})).toEqual({
			allowed: true,
			honeypot: false,
		});
	});
});

describe("honeypotResponse", () => {
	test("returns a fake nginx response", async () => {
		const res = honeypotResponse("http://10.0.0.1/test");
		expect(res.status).toBe(200);
		expect(res.headers.get("server")).toBe("nginx/1.24.0");
		const body = await res.text();
		expect(body).toContain("Welcome to nginx");
	});
});
