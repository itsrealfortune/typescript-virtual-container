import * as os from "node:os";
import type { ShellModule } from "../types/commands";

const C = {
	reset:   "\x1b[0m",
	bold:    "\x1b[1m",
	rev:     "\x1b[7m",
	green:   "\x1b[32m",
	cyan:    "\x1b[36m",
	yellow:  "\x1b[33m",
	red:     "\x1b[31m",
	blue:    "\x1b[34m",
	magenta: "\x1b[35m",
	white:   "\x1b[97m",
	bgBlue:  "\x1b[44m",
	bgGreen: "\x1b[42m",
	bgRed:   "\x1b[41m",
	dim:     "\x1b[2m",
};

function bar(ratio: number, width: number): string {
	const filled = Math.round(ratio * width);
	const empty = width - filled;
	const color = ratio > 0.8 ? C.red : ratio > 0.5 ? C.yellow : C.green;
	return `${color}${"█".repeat(filled)}${C.dim}${"░".repeat(empty)}${C.reset}`;
}

function fmtBytes(b: number): string {
	if (b >= 1024 ** 3) return `${(b / 1024 ** 3).toFixed(1)}G`;
	if (b >= 1024 ** 2) return `${(b / 1024 ** 2).toFixed(1)}M`;
	if (b >= 1024)      return `${(b / 1024).toFixed(1)}K`;
	return `${b}B`;
}

function fmtUptime(ms: number): string {
	const s   = Math.floor(ms / 1000);
	const d   = Math.floor(s / 86400);
	const h   = Math.floor((s % 86400) / 3600);
	const m   = Math.floor((s % 3600) / 60);
	const sec = s % 60;
	if (d > 0) return `${d}d ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
	return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

/**
 * Interactive system monitor — full ANSI output in exec/ssh mode, interactive panel in shell mode.
 * @category system
 * @params ["[-d delay] [-p pid]"]
 */
export const htopCommand: ShellModule = {
	name: "htop",
	description: "Interactive system monitor",
	category: "system",
	params: ["[-d delay]", "[-p pid]"],
	run: ({ shell, authUser }) => {
		// Render ANSI snapshot in all modes — real htop child_process unavailable in-process
		const totalMem  = os.totalmem();
		const freeMem   = os.freemem();
		const usedMem   = totalMem - freeMem;
		const swapTotal = Math.floor(totalMem * 0.5);
		const swapUsed  = Math.floor(swapTotal * 0.02);

		const cpus       = os.cpus();
		const cpuCount   = cpus.length || 4;
		const uptimeMs   = Date.now() - shell.startTime;
		const sessions   = shell.users.listActiveSessions();
		const taskCount  = sessions.length + shell.users.listProcesses().length + 3; // bash sessions + running cmds + kernel threads
		const now        = new Date().toTimeString().slice(0, 8);

		const memRatio  = usedMem / totalMem;
		const swapRatio = swapUsed / swapTotal;
		const barWidth  = 20;

		const lines: string[] = [];

		// ── Header ─────────────────────────────────────────────────────────────
		const cpuLoads: number[] = [];
		for (let i = 0; i < cpuCount; i++) {
			cpuLoads.push(Math.random() * 0.3 + 0.02);
		}

		// CPU bars (up to 4 shown)
		const shownCpus = Math.min(cpuCount, 4);
		for (let i = 0; i < shownCpus; i++) {
			const load  = cpuLoads[i]!;
			const pct   = (load * 100).toFixed(1).padStart(5);
			lines.push(`${C.bold}${C.cyan}${String(i + 1).padStart(3)}${C.reset}[${bar(load, barWidth)}${C.reset}] ${pct}%`);
		}
		if (cpuCount > 4) {
			lines.push(`${C.dim}    ... ${cpuCount - 4} more CPU(s) not shown${C.reset}`);
		}

		lines.push(`${C.bold}${C.cyan}Mem${C.reset}[${bar(memRatio, barWidth)}${C.reset}] ${fmtBytes(usedMem)}/${fmtBytes(totalMem)}`);
		lines.push(`${C.bold}${C.cyan}Swp${C.reset}[${bar(swapRatio, barWidth)}${C.reset}] ${fmtBytes(swapUsed)}/${fmtBytes(swapTotal)}`);

		lines.push("");

		// ── Summary line ───────────────────────────────────────────────────────
		const avgLoad = cpuLoads.slice(0, cpuCount).reduce((a, b) => a + b, 0) / cpuCount;
		const load1   = (avgLoad * cpuCount).toFixed(2);
		const load5   = (avgLoad * cpuCount * 0.9).toFixed(2);
		const load15  = (avgLoad * cpuCount * 0.8).toFixed(2);

		lines.push(
			`${C.bold}Tasks:${C.reset} ${C.green}${taskCount}${C.reset} total  ` +
			`${C.bold}Load average:${C.reset} ${load1} ${load5} ${load15}  ` +
			`${C.bold}Uptime:${C.reset} ${fmtUptime(uptimeMs)}`,
		);
		lines.push("");

		// ── Process table header ───────────────────────────────────────────────
		const hdr =
			`${C.bgBlue}${C.bold}${C.white}` +
			"  PID USER       PRI  NI  VIRT   RES  SHR S  CPU%  MEM% TIME+     COMMAND" +
			`${C.reset}`;
		lines.push(hdr);

		// Kernel / system processes
		const sysProcs = [
			{ pid: 1,   user: "root",    cmd: "systemd",        cpu: 0.0, mem: 0.1 },
			{ pid: 2,   user: "root",    cmd: "kthreadd",       cpu: 0.0, mem: 0.0 },
			{ pid: 9,   user: "root",    cmd: "rcu_sched",      cpu: (Math.random() * 0.2), mem: 0.0 },
			{ pid: 127, user: "root",    cmd: "sshd",           cpu: 0.0, mem: 0.2 },
		];

		// Active sessions (bash processes)
		let pid = 1000;
		const sessionProcs = sessions.map((s) => ({
			pid: pid++,
			user: s.username,
			cmd: "bash",
			cpu: Math.random() * 0.5,
			mem: (usedMem / totalMem * 100 / Math.max(sessions.length, 1) * 0.3),
		}));

		// Currently running commands
		const runningProcs = shell.users.listProcesses().map((p) => ({
			pid: p.pid,
			user: p.username,
			cmd: p.argv.join(" ").slice(0, 40),
			cpu: Math.random() * 2.0 + 0.1,
			mem: (usedMem / totalMem * 100 * 0.5),
		}));

		// htop itself
		const htopProc = { pid: pid++, user: authUser, cmd: "htop", cpu: 0.1, mem: 0.1 };

		const procs = [...sysProcs, ...sessionProcs, ...runningProcs, htopProc];

		for (const p of procs) {
			const virt = fmtBytes(Math.floor(Math.random() * 200 * 1024 * 1024 + 10 * 1024 * 1024));
			const res  = fmtBytes(Math.floor(Math.random() * 20 * 1024 * 1024 + 1024 * 1024));
			const shr  = fmtBytes(Math.floor(Math.random() * 5 * 1024 * 1024 + 512 * 1024));
			const cpuPct = p.cpu.toFixed(1).padStart(5);
			const memPct = p.mem.toFixed(1).padStart(5);
			const time  = `${String(Math.floor(Math.random() * 10)).padStart(2)}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}.${String(Math.floor(Math.random() * 100)).padStart(2, "0")}`;

			const userColor = p.user === "root" ? C.red : p.user === authUser ? C.green : C.cyan;
			const cmdColor  = p.cmd === "htop" ? C.green : p.cmd === "bash" ? C.cyan : C.reset;

			lines.push(
				`${String(p.pid).padStart(5)} ` +
				`${userColor}${p.user.padEnd(10).slice(0, 10)}${C.reset} ` +
				` 20   0 ` +
				`${virt.padStart(6)} ${res.padStart(6)} ${shr.padStart(5)} ` +
				`S ${cpuPct} ${memPct} ` +
				`${time.padStart(9)}  ` +
				`${cmdColor}${p.cmd}${C.reset}`,
			);
		}

		lines.push("");

		// ── Footer ─────────────────────────────────────────────────────────────
		lines.push(
			`${C.dim}${now} — htop snapshot (non-interactive mode)  ` +
			`press ${C.reset}${C.bold}q${C.reset}${C.dim} to quit in interactive mode${C.reset}`,
		);

		return { stdout: lines.join("\n"), exitCode: 0 };
	},
};
