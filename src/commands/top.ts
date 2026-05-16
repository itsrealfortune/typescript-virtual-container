import * as os from "node:os";
import type { ShellModule } from "../types/commands";

export const topCommand: ShellModule = {
	name: "top",
	description: "Display processes",
	category: "system",
	params: [],
	run: ({ shell }) => {
		const uptimeSec = Math.floor((Date.now() - shell.startTime) / 1000);
		const sessions = shell.users.listActiveSessions();
		const procs = shell.users.listProcesses();
		const totalMem = os.totalmem();
		const freeMem = os.freemem();
		const usedMem = totalMem - freeMem;
		const loadAverages = os.loadavg();

		const lines: string[] = [];

		const uptimeStr = `${Math.floor(uptimeSec / 3600)}:${String(Math.floor((uptimeSec % 3600) / 60)).padStart(2, "0")}`;
		lines.push(`top - ${new Date().toLocaleTimeString()} up ${uptimeStr},  ${sessions.length} user(s), load average: ${loadAverages.map((l) => l.toFixed(2)).join(", ")}`);
		lines.push(`Tasks: ${sessions.length + procs.length} total,   ${procs.filter((p) => p.status === "running").length || 1} running`);

		const memTotalMb = (totalMem / 1024 / 1024).toFixed(0);
		const memUsedMb = (usedMem / 1024 / 1024).toFixed(0);
		const memFreeMb = (freeMem / 1024 / 1024).toFixed(0);
		lines.push(`MiB Mem : ${memTotalMb.padStart(8)} total, ${memFreeMb.padStart(8)} free, ${memUsedMb.padStart(8)} used`);

		const swapTotal = Math.floor(totalMem * 0.5);
		const swapUsed = Math.floor(swapTotal * 0.05);
		const swapFree = swapTotal - swapUsed;
		lines.push(`MiB Swap: ${String(swapTotal).padStart(8)} total, ${String(swapFree).padStart(8)} free, ${String(swapUsed).padStart(8)} used`);

		lines.push("");
		lines.push("  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND");

		sessions.forEach((s, i) => {
			const pid = 1000 + i;
			const virt = Math.floor(Math.random() * 200000 + 50000);
			const res = Math.floor(Math.random() * 10000 + 2000);
			const shr = Math.floor(res * 0.6);
			const cpu = (Math.random() * 5).toFixed(1);
			const mem = ((res / (totalMem / 1024)) * 100).toFixed(1);
			lines.push(`${String(pid).padStart(5)} ${s.username.padEnd(8).slice(0, 8)}  20   0 ${String(virt).padStart(7)} ${String(res).padStart(6)} ${String(shr).padStart(6)} S  ${cpu.padStart(4)} ${mem.padStart(5)}   0:00.00 bash`);
		});

		procs.forEach((p) => {
			const virt = Math.floor(Math.random() * 50000 + 10000);
			const res = Math.floor(Math.random() * 5000 + 500);
			const shr = Math.floor(res * 0.5);
			const cpu = (Math.random() * 10).toFixed(1);
			const mem = ((res / (totalMem / 1024)) * 100).toFixed(1);
			const status = p.status === "running" ? "R" : "S";
			lines.push(`${String(p.pid).padStart(5)} ${p.username.padEnd(8).slice(0, 8)}  20   0 ${String(virt).padStart(7)} ${String(res).padStart(6)} ${String(shr).padStart(6)} ${status} ${cpu.padStart(4)} ${mem.padStart(5)}   0:00.00 ${p.command}`);
		});

		return { stdout: lines.join("\n") + "\n", exitCode: 0 };
	},
};
