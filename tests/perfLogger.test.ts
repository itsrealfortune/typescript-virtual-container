import { describe, expect, test } from "bun:test";
import { createPerfLogger } from "../src/utils/perfLogger";

describe("createPerfLogger", () => {
	test("returns disabled logger by default", () => {
		const log = createPerfLogger("test");
		expect(log.enabled).toBe(false);
	});

	test("disabled mark does not throw", () => {
		const log = createPerfLogger("test");
		expect(() => log.mark("step1")).not.toThrow();
	});

	test("disabled done does not throw", () => {
		const log = createPerfLogger("test");
		expect(() => log.done()).not.toThrow();
	});

	test("disabled done with label does not throw", () => {
		const log = createPerfLogger("test");
		expect(() => log.done("finished")).not.toThrow();
	});

	test("multiple marks on disabled logger are no-ops", () => {
		const log = createPerfLogger("test");
		log.mark("a");
		log.mark("b");
		log.mark("c");
		expect(log.enabled).toBe(false);
	});
});
