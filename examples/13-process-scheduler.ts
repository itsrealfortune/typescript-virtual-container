/**
 * Example 13: Process scheduler with priority-based CPU allocation
 *
 * Demonstrates the VFS process scheduler with nice values, fair-share
 * enforcement, and priority-based timeslice allocation.
 */
import { VirtualShell } from "../src";

const shell = new VirtualShell("scheduler-demo");

// Enable the process scheduler
shell.users.enableScheduler({
	baseTimesliceMs: 100,
	maxTimesliceMs: 500,
	minTimesliceMs: 10,
	enforceFairShare: true,
	accountingWindowMs: 1000,
});

console.log("Scheduler enabled:", shell.users.isSchedulerEnabled());

// Run commands with different nice values
async function runWithNice(cmd: string, nice: number) {
	const result = await shell.executeCommand(cmd, "root", "/");
	console.log(`nice ${nice}: ${cmd} → exit ${result.exitCode}`);
}

// Run various commands with different priorities
await runWithNice("echo 'low priority task'", 15);
await runWithNice("echo 'normal task'", 0);
await runWithNice("echo 'high priority task'", -10);
await runWithNice("echo 'realtime task'", -20);

// Check scheduler stats
const stats = shell.users.getSchedulerStats();
if (stats) {
	console.log("\nScheduler stats:", {
		scheduleCount: stats.scheduleCount,
		totalCpuTimeMs: stats.totalCpuTimeMs,
		throttleCount: stats.throttleCount,
		preemptCount: stats.preemptCount,
	});
}

// Change priority of a running process
const pid = shell.users.registerProcess("root", "sleep", ["sleep", "60"], "pts/0");
console.log(`\nRegistered process ${pid} (sleep 60)`);
console.log("Initial nice:", shell.users.getProcessNice(pid));
console.log("Initial priority:", shell.users.getProcessPriority(pid));

// Boost priority
shell.users.setProcessNice(pid, -15);
console.log("After boost — nice:", shell.users.getProcessNice(pid));
console.log("After boost — priority:", shell.users.getProcessPriority(pid));

// Get timeslice for this process
const timeslice = shell.users.getProcessTimeslice(pid);
console.log("Recommended timeslice:", `${timeslice}ms`);

// Cleanup
shell.users.killProcess(pid, 9);
shell.users.unregisterProcess(pid);
console.log("\nProcess terminated");
