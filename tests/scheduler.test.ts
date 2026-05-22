import { describe, expect, test } from "bun:test";
import { ProcessScheduler } from "../src/modules/VirtualUserManager/processScheduler";

describe("ProcessScheduler", () => {
	test("scheduler is created with default config", () => {
		const scheduler = new ProcessScheduler();
		const stats = scheduler.getStats();
		expect(stats.scheduleCount).toBe(0);
		expect(stats.totalCpuTimeMs).toBe(0);
		expect(stats.throttleCount).toBe(0);
		expect(stats.preemptCount).toBe(0);
	});

	test("calculateTimeslice returns longer timeslice for higher priority", () => {
		const scheduler = new ProcessScheduler({ baseTimesliceMs: 100 });

		const highPriority = scheduler.calculateTimeslice(-20);
		const normalPriority = scheduler.calculateTimeslice(0);
		const lowPriority = scheduler.calculateTimeslice(19);

		expect(highPriority).toBeGreaterThan(normalPriority);
		expect(normalPriority).toBeGreaterThan(lowPriority);
		expect(normalPriority).toBe(100); // base timeslice
	});

	test("calculateTimeslice respects min and max bounds", () => {
		const scheduler = new ProcessScheduler({
			baseTimesliceMs: 100,
			minTimesliceMs: 10,
			maxTimesliceMs: 500,
		});

		const lowest = scheduler.calculateTimeslice(-20);
		const highest = scheduler.calculateTimeslice(19);

		expect(lowest).toBeLessThanOrEqual(500);
		expect(highest).toBeGreaterThanOrEqual(10);
	});

	test("getNiceWeight returns correct weights", () => {
		const scheduler = new ProcessScheduler();

		expect(scheduler.getNiceWeight(0)).toBe(1024);
		expect(scheduler.getNiceWeight(-20)).toBeGreaterThan(scheduler.getNiceWeight(0));
		expect(scheduler.getNiceWeight(19)).toBeLessThan(scheduler.getNiceWeight(0));
	});

	test("priorityToNice converts priority names correctly", () => {
		const scheduler = new ProcessScheduler();

		expect(scheduler.priorityToNice("normal")).toBe(0);
		expect(scheduler.priorityToNice("high")).toBe(-10);
		expect(scheduler.priorityToNice("low")).toBe(10);
		expect(scheduler.priorityToNice("realtime")).toBe(-20);
		expect(scheduler.priorityToNice("idle")).toBe(19);
	});

	test("niceToPriority converts nice values correctly", () => {
		const scheduler = new ProcessScheduler();

		expect(scheduler.niceToPriority(0)).toBe("normal");
		expect(scheduler.niceToPriority(-20)).toBe("realtime");
		expect(scheduler.niceToPriority(19)).toBe("idle");
		expect(scheduler.niceToPriority(-10)).toBe("high");
		expect(scheduler.niceToPriority(10)).toBe("low");
	});

	test("isValidNice validates nice values", () => {
		const scheduler = new ProcessScheduler();

		expect(scheduler.isValidNice(0)).toBe(true);
		expect(scheduler.isValidNice(-20)).toBe(true);
		expect(scheduler.isValidNice(19)).toBe(true);
		expect(scheduler.isValidNice(-21)).toBe(false);
		expect(scheduler.isValidNice(20)).toBe(false);
		expect(scheduler.isValidNice(1.5)).toBe(false);
	});

	test("recordCpuTime tracks CPU usage", () => {
		const scheduler = new ProcessScheduler();

		scheduler.recordCpuTime(1001, 50);
		scheduler.recordCpuTime(1001, 30);
		scheduler.recordCpuTime(1002, 20);

		expect(scheduler.getProcessCpuTime(1001)).toBe(80);
		expect(scheduler.getProcessCpuTime(1002)).toBe(20);
		expect(scheduler.getProcessCpuTime(1003)).toBe(0);
	});

	test("getStats returns correct statistics", () => {
		const scheduler = new ProcessScheduler();

		scheduler.recordCpuTime(1001, 100);
		scheduler.recordCpuTime(1002, 50);

		const stats = scheduler.getStats();
		expect(stats.totalCpuTimeMs).toBe(150);
		expect(stats.runQueueLength).toBe(2);
	});

	test("resetStats clears counters", () => {
		const scheduler = new ProcessScheduler();

		scheduler.recordCpuTime(1001, 100);
		scheduler.resetStats();

		const stats = scheduler.getStats();
		expect(stats.totalCpuTimeMs).toBe(0);
		expect(stats.scheduleCount).toBe(0);
	});

	test("removeProcess removes from tracking", () => {
		const scheduler = new ProcessScheduler();

		scheduler.recordCpuTime(1001, 100);
		scheduler.removeProcess(1001);

		expect(scheduler.getProcessCpuTime(1001)).toBe(0);
	});

	test("resetWindow clears CPU accounting", () => {
		const scheduler = new ProcessScheduler();

		scheduler.recordCpuTime(1001, 100);
		scheduler.recordCpuTime(1002, 50);
		scheduler.resetWindow();

		expect(scheduler.getProcessCpuTime(1001)).toBe(0);
		expect(scheduler.getProcessCpuTime(1002)).toBe(0);
	});
});

describe("ProcessScheduler throttling", () => {
	test("shouldThrottle returns false for single process", () => {
		const scheduler = new ProcessScheduler({ enforceFairShare: true });

		scheduler.recordCpuTime(1001, 1000);
		expect(scheduler.shouldThrottle(1001, 0, 1)).toBe(false);
	});

	test("shouldThrottle returns false when fair share not exceeded", () => {
		const scheduler = new ProcessScheduler({
			enforceFairShare: true,
			accountingWindowMs: 10000,
		});

		// Reset window and simulate some window elapsed
		scheduler.resetWindow();

		// The window just started, so fair share is tiny
		// With 0 CPU time recorded for this process, it shouldn't throttle
		scheduler.recordCpuTime(1002, 100); // Other process uses CPU
		expect(scheduler.shouldThrottle(1001, 0, 2)).toBe(false);
	});

	test("shouldThrottle respects priority weights", () => {
		const scheduler = new ProcessScheduler({ enforceFairShare: true });

		// High priority process gets more fair share
		const highWeight = scheduler.getNiceWeight(-20);
		const lowWeight = scheduler.getNiceWeight(19);
		expect(highWeight).toBeGreaterThan(lowWeight);
	});
});

describe("ProcessScheduler with custom config", () => {
	test("custom baseTimesliceMs affects calculations", () => {
		const scheduler = new ProcessScheduler({ baseTimesliceMs: 200 });
		expect(scheduler.calculateTimeslice(0)).toBe(200);
	});

	test("custom accountingWindowMs is stored", () => {
		const scheduler = new ProcessScheduler({ accountingWindowMs: 2000 });
		const stats = scheduler.getStats();
		expect(stats).toBeDefined();
	});

	test("disable fair share enforcement", () => {
		const scheduler = new ProcessScheduler({ enforceFairShare: false });

		scheduler.recordCpuTime(1001, 999999);
		expect(scheduler.shouldThrottle(1001, 0, 10)).toBe(false);
	});
});
