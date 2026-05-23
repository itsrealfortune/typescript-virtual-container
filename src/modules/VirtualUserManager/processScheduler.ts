/**
 * Process scheduler for fair CPU time allocation between virtual processes.
 *
 * Implements a priority-based round-robin scheduler inspired by Linux CFS:
 * - Nice values from -20 (highest priority) to 19 (lowest priority)
 * - Timeslice proportional to priority weight
 * - Automatic rotation through running processes
 * - CPU time tracking and fair-share enforcement
 */

import type { VirtualProcess } from "./index";

/**
 * Process scheduling priority.
 * Maps to Linux-compatible nice values (-20 to 19).
 */
export type ProcessPriority =
	| "idle" // 19
	| "very_low" // 15
	| "low" // 10
	| "normal" // 0 (default)
	| "high" // -10
	| "very_high" // -15
	| "realtime"; // -20

/**
 * Nice value to priority weight mapping.
 * Higher weight = more CPU time per timeslice.
 * Based on Linux CFS weight formula: 1024 / 1.25^(nice)
 */
const NICE_WEIGHTS: Record<number, number> = {
	"-20": 88761,
	"-19": 71755,
	"-18": 56483,
	"-17": 46273,
	"-16": 36291,
	"-15": 29154,
	"-14": 23254,
	"-13": 18705,
	"-12": 14949,
	"-11": 11916,
	"-10": 9548,
	"-9": 7620,
	"-8": 6100,
	"-7": 4904,
	"-6": 3906,
	"-5": 3121,
	"-4": 2501,
	"-3": 1991,
	"-2": 1586,
	"-1": 1277,
	"0": 1024,
	"1": 820,
	"2": 655,
	"3": 526,
	"4": 423,
	"5": 335,
	"6": 272,
	"7": 215,
	"8": 172,
	"9": 137,
	"10": 110,
	"11": 87,
	"12": 70,
	"13": 56,
	"14": 45,
	"15": 36,
	"16": 29,
	"17": 23,
	"18": 18,
	"19": 15,
};

/** Priority name to nice value mapping. */
const PRIORITY_TO_NICE: Record<ProcessPriority, number> = {
	idle: 19,
	very_low: 15,
	low: 10,
	normal: 0,
	high: -10,
	very_high: -15,
	realtime: -20,
};

/** Configuration options for the process scheduler. */
export interface SchedulerConfig {
	/**
	 * Base timeslice in milliseconds for a normal-priority process.
	 * Default: 100ms. Higher priority processes get proportionally more.
	 */
	baseTimesliceMs?: number;
	/**
	 * Maximum timeslice cap to prevent any single process from monopolizing.
	 * Default: 500ms.
	 */
	maxTimesliceMs?: number;
	/**
	 * Minimum timeslice to ensure progress for low-priority processes.
	 * Default: 10ms.
	 */
	minTimesliceMs?: number;
	/**
	 * Enable fair-share CPU enforcement. When true, processes that exceed
	 * their fair CPU share within a window are throttled (yield forced).
	 * Default: true.
	 */
	enforceFairShare?: boolean;
	/**
	 * CPU accounting window duration in ms.
	 * Default: 1000ms (1 second).
	 */
	accountingWindowMs?: number;
}

/** Statistics about scheduler performance. */
export interface SchedulerStats {
	/** Total number of scheduling decisions (context switches). */
	scheduleCount: number;
	/** Total CPU time allocated across all processes (ms). */
	totalCpuTimeMs: number;
	/** Number of processes currently in the run queue. */
	runQueueLength: number;
	/** Number of processes throttled for exceeding fair share. */
	throttleCount: number;
	/** Number of times a process was preempted due to timeslice expiry. */
	preemptCount: number;
	/** Average timeslice duration across all scheduling decisions (ms). */
	avgTimesliceMs: number;
	/** Current CPU window start timestamp. */
	windowStart: number;
	/** Per-process CPU time in current window: pid → ms consumed. */
	processCpuTime: Map<number, number>;
}

/**
 * Process scheduler that manages CPU time allocation between running processes.
 *
 * Uses a priority-weighted round-robin algorithm:
 * 1. Each process has a nice value (-20 to 19, default 0)
 * 2. Nice value maps to a weight (higher priority = higher weight)
 * 3. Timeslice = baseTimeslice × (weight / normalWeight)
 * 4. Processes are rotated through the run queue
 * 5. CPU time is tracked per-window for fair-share enforcement
 */
export class ProcessScheduler {
	private readonly _baseTimesliceMs: number;
	private readonly _maxTimesliceMs: number;
	private readonly _minTimesliceMs: number;
	private readonly _enforceFairShare: boolean;
	private readonly _accountingWindowMs: number;
	private _scheduleCount = 0;
	private _totalCpuTimeMs = 0;
	private _throttleCount = 0;
	private _preemptCount = 0;
	private _windowStart = Date.now();
	private _processCpuTime = new Map<number, number>();

	constructor(config: SchedulerConfig = {}) {
		this._baseTimesliceMs = config.baseTimesliceMs ?? 100;
		this._maxTimesliceMs = config.maxTimesliceMs ?? 500;
		this._minTimesliceMs = config.minTimesliceMs ?? 10;
		this._enforceFairShare = config.enforceFairShare ?? true;
		this._accountingWindowMs = config.accountingWindowMs ?? 1000;
	}

	/**
	 * Calculate the timeslice for a process based on its nice value.
	 * @param nice - Nice value (-20 to 19).
	 * @returns Timeslice in milliseconds.
	 */
	calculateTimeslice(nice: number): number {
		const weight = NICE_WEIGHTS[nice as keyof typeof NICE_WEIGHTS] ?? 1024;
		const normalWeight = 1024;
		const ratio = weight / normalWeight;
		const timeslice = this._baseTimesliceMs * ratio;
		return Math.max(
			this._minTimesliceMs,
			Math.min(this._maxTimesliceMs, timeslice),
		);
	}

	/**
	 * Get the weight for a nice value.
	 * @param nice - Nice value (-20 to 19).
	 * @returns Weight value (higher = more CPU time).
	 */
	static getNiceWeight(nice: number): number {
		return NICE_WEIGHTS[nice as keyof typeof NICE_WEIGHTS] ?? 1024;
	}

	/**
	 * Convert a priority name to a nice value.
	 * @param priority - Priority name.
	 * @returns Nice value (-20 to 19).
	 */
	static priorityToNice(priority: ProcessPriority): number {
		return PRIORITY_TO_NICE[priority];
	}

	/**
	 * Convert a nice value to a priority name.
	 * @param nice - Nice value (-20 to 19).
	 * @returns Priority name.
	 */
	static niceToPriority(nice: number): ProcessPriority {
		for (const [name, value] of Object.entries(PRIORITY_TO_NICE)) {
			if (value === nice) {
				return name as ProcessPriority;
			}
		}
		// Find closest
		let closest: ProcessPriority = "normal";
		let minDiff = Math.abs(nice);
		for (const [name, value] of Object.entries(PRIORITY_TO_NICE)) {
			const diff = Math.abs(nice - value);
			if (diff < minDiff) {
				minDiff = diff;
				closest = name as ProcessPriority;
			}
		}
		return closest;
	}

	/**
	 * Validate a nice value.
	 * @param nice - Nice value to validate.
	 * @returns True if valid (-20 to 19).
	 */
	static isValidNice(nice: number): boolean {
		return nice >= -20 && nice <= 19 && Number.isInteger(nice);
	}

	/**
	 * Record CPU time for a process.
	 * @param pid - Process ID.
	 * @param elapsedMs - Milliseconds of CPU time consumed.
	 */
	recordCpuTime(pid: number, elapsedMs: number): void {
		const current = this._processCpuTime.get(pid) ?? 0;
		this._processCpuTime.set(pid, current + elapsedMs);
		this._totalCpuTimeMs += elapsedMs;
	}

	/**
	 * Get CPU time consumed by a process in the current window.
	 * @param pid - Process ID.
	 * @returns CPU time in ms.
	 */
	getProcessCpuTime(pid: number): number {
		return this._processCpuTime.get(pid) ?? 0;
	}

	/**
	 * Check if a process has exceeded its fair CPU share.
	 * @param pid - Process ID.
	 * @param nice - Process nice value.
	 * @param totalRunningProcesses - Total number of running processes.
	 * @returns True if the process should be throttled.
	 */
	shouldThrottle(
		pid: number,
		nice: number,
		totalRunningProcesses: number,
	): boolean {
		if (!this._enforceFairShare || totalRunningProcesses <= 1) {
			return false;
		}

		const now = Date.now();
		const windowElapsed = now - this._windowStart;

		// Reset window if expired
		if (windowElapsed >= this._accountingWindowMs) {
			this._windowStart = now;
			this._processCpuTime.clear();
			return false;
		}

		const processCpu = this._processCpuTime.get(pid) ?? 0;
		const weight = ProcessScheduler.getNiceWeight(nice);

		// Calculate total weight of all running processes
		// For simplicity, assume average weight if we don't have full data
		const avgWeight = 1024; // normal priority weight
		const totalWeight = totalRunningProcesses * avgWeight;

		// Fair share = (process weight / total weight) × window elapsed
		const fairShare = (weight / totalWeight) * windowElapsed;

		// Throttle if process has consumed 2× its fair share
		return processCpu > fairShare * 2;
	}

	/**
	 * Perform a scheduling decision.
	 * Returns the recommended action for the given process.
	 * @param process - Current process being considered.
	 * @param totalRunningProcesses - Total number of running processes.
	 * @returns Scheduling recommendation.
	 */
	schedule(
		process: VirtualProcess,
		totalRunningProcesses: number,
	): SchedulerAction {
		const nice = (process as VirtualProcess & { nice?: number }).nice ?? 0;
		const timeslice = this.calculateTimeslice(nice);

		// Check if process should be throttled
		if (this.shouldThrottle(process.pid, nice, totalRunningProcesses)) {
			this._throttleCount++;
			return { action: "throttle", reason: "exceeded fair share" };
		}

		// Record scheduling decision
		this._scheduleCount++;

		return {
			action: "run",
			timesliceMs: timeslice,
			reason: `timeslice ${timeslice}ms (nice ${nice})`,
		};
	}

	/**
	 * Record that a process was preempted due to timeslice expiry.
	 */
	recordPreemption(): void {
		this._preemptCount++;
	}

	/**
	 * Get scheduler statistics.
	 * @returns SchedulerStats object.
	 */
	getStats(): SchedulerStats {
		return {
			scheduleCount: this._scheduleCount,
			totalCpuTimeMs: this._totalCpuTimeMs,
			runQueueLength: this._processCpuTime.size,
			throttleCount: this._throttleCount,
			preemptCount: this._preemptCount,
			avgTimesliceMs:
				this._scheduleCount > 0
					? this._totalCpuTimeMs / this._scheduleCount
					: 0,
			windowStart: this._windowStart,
			processCpuTime: new Map(this._processCpuTime),
		};
	}

	/**
	 * Reset scheduler statistics.
	 */
	resetStats(): void {
		this._scheduleCount = 0;
		this._totalCpuTimeMs = 0;
		this._throttleCount = 0;
		this._preemptCount = 0;
	}

	/**
	 * Reset the CPU accounting window.
	 */
	resetWindow(): void {
		this._windowStart = Date.now();
		this._processCpuTime.clear();
	}

	/**
	 * Remove a process from CPU tracking.
	 * @param pid - Process ID to remove.
	 */
	removeProcess(pid: number): void {
		this._processCpuTime.delete(pid);
	}
}

/** Scheduling action returned by the scheduler. */
export interface SchedulerAction {
	/** Recommended action. */
	action: "run" | "throttle" | "yield";
	/** Reason for the action. */
	reason: string;
	/** Timeslice duration in ms (only for "run" actions). */
	timesliceMs?: number;
}
