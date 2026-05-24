import { describe, expect, test } from "bun:test";
import { formatLoginDate } from "../src/modules/SSHMimic/loginFormat";

describe("formatLoginDate", () => {
	test("formats a known date correctly", () => {
		const date = new Date("2024-01-15T09:30:45Z");
		const result = formatLoginDate(date);
		expect(result).toMatch(/^Mon Jan 15 09:30:45 2024$/);
	});

	test("pads single-digit day/month", () => {
		const date = new Date("2024-03-05T01:02:03Z");
		const result = formatLoginDate(date);
		expect(result).toMatch(/ 05 01:02:03/);
	});

	test("handles end of year", () => {
		const date = new Date("2024-12-31T23:59:59Z");
		const result = formatLoginDate(date);
		expect(result).toMatch(/Dec 31 23:59:59 2024/);
	});

	test("handles different weekdays correctly", () => {
		const wed = new Date("2024-01-03T12:00:00Z");
		expect(formatLoginDate(wed)).toMatch(/^Wed/);

		const fri = new Date("2024-01-05T12:00:00Z");
		expect(formatLoginDate(fri)).toMatch(/^Fri/);
	});
});
