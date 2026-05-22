/**
 * 13 - Process Scheduler with Priority-Based CPU Allocation
 * 
 * Demonstrates the full scheduler API: nice values, CFS weights,
 * fair-share enforcement, timeslice calculation, process registration,
 * priority changes, CPU accounting, and scheduler statistics.
 */

import { VirtualShell } from "../src";

const shell = new VirtualShell("scheduler-demo");
await shell.ensureInitialized();

// ── Enable scheduler ────────────────────────────────────────────────
console.log("--- Enable scheduler ---");

shell.users.enableScheduler({
	baseTimesliceMs: 100,
	maxTimesliceMs: 500,
	minTimesliceMs: 10,
	enforceFairShare: true,
	accountingWindowMs: 1000,
});

console.log("Scheduler enabled:", shell.users.isSchedulerEnabled());
console.log("Config: base=100ms, max=500ms, min=10ms, fair-share=on");

// ── Nice value to priority mapping ─────────────────────────────────
console.log("\n--- Nice value to Priority mapping ---");

const niceValues = [-20, -15, -10, -5, 0, 5, 10, 15, 19];
for (const nice of niceValues) {
	const pid = shell.users.registerProcess("root", "test", ["test"], "pts/0", undefined, 1, nice);
	const priority = shell.users.getProcessPriority(pid);
	shell.users.unregisterProcess(pid);
	console.log(`  nice ${String(nice).padStart(3)} -> ${String(priority).padEnd(12)}`);
}

// ── Process registration ───────────────────────────────────────────
console.log("\n--- Process registration ---");

const processes = [
	{ name: "nginx", nice: -10, cmd: ["nginx", "-g", "daemon off;"] },
	{ name: "node", nice: 0, cmd: ["node", "server.js"] },
	{ name: "backup", nice: 15, cmd: ["tar", "-czf", "/backup/full.tar.gz", "/"] },
	{ name: "cron", nice: 19, cmd: ["cron", "-f"] },
];

const pids: number[] = [];
for (const proc of processes) {
	const pid = shell.users.registerProcess("root", proc.name, proc.cmd, "pts/0", undefined, 1, proc.nice);
	pids.push(pid);
	console.log(`  PID ${pid}: ${proc.name} (nice ${proc.nice}, priority: ${shell.users.getProcessPriority(pid)})`);
}

// ── CPU accounting ─────────────────────────────────────────────────
console.log("\n--- CPU accounting ---");

for (const pid of pids) {
	const elapsed = 50;
	const throttled = shell.users.recordAndCheckThrottle(pid, elapsed);
	const cpuTime = shell.users.getSchedulerCpuTime(pid);
	console.log(`  PID ${pid}: ${cpuTime}ms consumed, throttled: ${throttled}`);
}

// ── Priority boosting ──────────────────────────────────────────────
console.log("\n--- Priority boosting ---");

const backupPid = pids.find((pid) => shell.users.getProcessNice(pid) === 15)!;
console.log(`  Before: PID ${backupPid} nice=${shell.users.getProcessNice(backupPid)}, priority=${shell.users.getProcessPriority(backupPid)}`);

shell.users.setProcessNice(backupPid, -5);
console.log(`  After:  PID ${backupPid} nice=${shell.users.getProcessNice(backupPid)}, priority=${shell.users.getProcessPriority(backupPid)}`);

// ── Scheduler statistics ───────────────────────────────────────────
console.log("\n--- Scheduler statistics ---");

const stats = shell.users.getSchedulerStats();
if (stats) {
	console.log(`  Run queue: ${stats.runQueueLength} processes`);
	console.log(`  Total CPU time: ${stats.totalCpuTimeMs}ms`);
	console.log(`  Throttle count: ${stats.throttleCount}`);
	console.log(`  Preempt count: ${stats.preemptCount}`);
	console.log(`  Avg timeslice: ${stats.avgTimesliceMs}ms`);
}

// ── Process cleanup ────────────────────────────────────────────────
console.log("\n--- Process cleanup ---");

for (const pid of pids) {
	shell.users.killProcess(pid, 9);
	shell.users.unregisterProcess(pid);
	console.log(`  PID ${pid} terminated`);
}
