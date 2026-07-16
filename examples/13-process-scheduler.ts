/**
 * 13 - Process Scheduler with Priority-Based CPU Allocation
 *
 * Demonstrates the full scheduler API: nice values, CFS weights,
 * fair-share enforcement, timeslice calculation, process registration,
 * priority changes, CPU accounting, and scheduler statistics.
 */

import { VirtualShell } from "../src";

const SHELL = new VirtualShell("scheduler-demo");
await SHELL.ensureInitialized();

// ── Enable scheduler ────────────────────────────────────────────────
console.log("--- Enable scheduler ---");

SHELL.users.enableScheduler({
	baseTimesliceMs: 100,
	maxTimesliceMs: 500,
	minTimesliceMs: 10,
	enforceFairShare: true,
	accountingWindowMs: 1000,
});

console.log("Scheduler enabled:", SHELL.users.isSchedulerEnabled());
console.log("Config: base=100ms, max=500ms, min=10ms, fair-share=on");

// ── Nice value to priority mapping ─────────────────────────────────
console.log("\n--- Nice value to Priority mapping ---");

const NICE_VALUES = [-20, -15, -10, -5, 0, 5, 10, 15, 19];
for (const NICE of NICE_VALUES) {
	const PID = SHELL.users.registerProcess(
		"root",
		"test",
		["test"],
		"pts/0",
		undefined,
		1,
		NICE
	);
	const PRIORITY = SHELL.users.getProcessPriority(PID);
	SHELL.users.unregisterProcess(PID);
	console.log(`  nice ${String(NICE).padStart(3)} -> ${PRIORITY.padEnd(12)}`);
}

// ── Process registration ───────────────────────────────────────────
console.log("\n--- Process registration ---");

const PROCESSES = [
	{ name: "nginx", nice: -10, cmd: ["nginx", "-g", "daemon off;"] },
	{ name: "node", nice: 0, cmd: ["node", "server.js"] },
	{
		name: "backup",
		nice: 15,
		cmd: ["tar", "-czf", "/backup/full.tar.gz", "/"],
	},
	{ name: "cron", nice: 19, cmd: ["cron", "-f"] },
];

const PIDS: number[] = [];
for (const PROC of PROCESSES) {
	const PID = SHELL.users.registerProcess(
		"root",
		PROC.name,
		PROC.cmd,
		"pts/0",
		undefined,
		1,
		PROC.nice
	);
	PIDS.push(PID);
	console.log(
		`  PID ${PID}: ${PROC.name} (nice ${PROC.nice}, priority: ${SHELL.users.getProcessPriority(PID)})`
	);
}

// ── CPU accounting ─────────────────────────────────────────────────
console.log("\n--- CPU accounting ---");

for (const PID of PIDS) {
	const ELAPSED = 50;
	const THROTTLED = SHELL.users.recordAndCheckThrottle(PID, ELAPSED);
	const CPU_TIME = SHELL.users.getSchedulerCpuTime(PID);
	console.log(`  PID ${PID}: ${CPU_TIME}ms consumed, throttled: ${THROTTLED}`);
}

// ── Priority boosting ──────────────────────────────────────────────
console.log("\n--- Priority boosting ---");

const BACKUP_PID = PIDS.find((pid) => SHELL.users.getProcessNice(pid) === 15)!;
console.log(
	`  Before: PID ${BACKUP_PID} nice=${SHELL.users.getProcessNice(BACKUP_PID)}, priority=${SHELL.users.getProcessPriority(BACKUP_PID)}`
);

SHELL.users.setProcessNice(BACKUP_PID, -5);
console.log(
	`  After:  PID ${BACKUP_PID} nice=${SHELL.users.getProcessNice(BACKUP_PID)}, priority=${SHELL.users.getProcessPriority(BACKUP_PID)}`
);

// ── Scheduler statistics ───────────────────────────────────────────
console.log("\n--- Scheduler statistics ---");

const STATS = SHELL.users.getSchedulerStats();
if (STATS) {
	console.log(`  Run queue: ${STATS.runQueueLength} processes`);
	console.log(`  Total CPU time: ${STATS.totalCpuTimeMs}ms`);
	console.log(`  Throttle count: ${STATS.throttleCount}`);
	console.log(`  Preempt count: ${STATS.preemptCount}`);
	console.log(`  Avg timeslice: ${STATS.avgTimesliceMs}ms`);
}

// ── Process cleanup ────────────────────────────────────────────────
console.log("\n--- Process cleanup ---");

for (const PID of PIDS) {
	SHELL.users.killProcess(PID, 9);
	SHELL.users.unregisterProcess(PID);
	console.log(`  PID ${PID} terminated`);
}
