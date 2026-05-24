import type { MacAddress } from "./types";

let _macCounter = 1;

/**
 * Generate the next MAC address in sequence (02:42:0a:00:01:xx).
 * @returns A unicast MAC address string.
 */
export function nextMac(): MacAddress {
	const n = _macCounter++;
	return `02:42:0a:00:01:${n.toString(16).padStart(2, "0")}`;
}

/**
 * Convert a dotted-decimal IPv4 string to a 32-bit integer.
 * @param ip - IPv4 address (e.g. "192.168.1.1").
 * @returns 32-bit unsigned integer.
 */
export function ipToInt(ip: string): number {
	return (
		ip
			.split(".")
			.reduce((acc, oct) => (acc << 8) + Number.parseInt(oct, 10), 0) >>> 0
	);
}

/**
 * Convert a 32-bit integer to a dotted-decimal IPv4 string.
 * @param n - 32-bit unsigned integer.
 * @returns Dotted-decimal IPv4 string.
 */
export function intToIp(n: number): string {
	return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(
		"."
	);
}

/**
 * Parse a CIDR notation into a network base integer and netmask.
 * @param cidr - CIDR string (e.g. "10.0.1.0/24").
 * @returns Network base integer and bitmask.
 */
export function cidrRange(cidr: string): { network: number; mask: number } {
	const [ip = "10.0.1.0", bits = "24"] = cidr.split("/");
	const mask = ~(2 ** (32 - Number.parseInt(bits, 10)) - 1);
	const network = ipToInt(ip) & mask;
	return { network, mask };
}
