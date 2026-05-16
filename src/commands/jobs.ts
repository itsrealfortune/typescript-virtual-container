import type { ShellModule } from "../types/commands";
import type { VirtualProcess } from "../VirtualUserManager";

function parseJobspec(arg: string | undefined, procs: VirtualProcess[]): VirtualProcess | undefined {
	if (!arg) {
		// Default to most recent background job
		return procs.filter((p) => p.status !== "stopped").pop();
	}
	const pid = parseInt(arg.replace(/^%/, ""), 10);
	return procs.find((p) => p.pid === pid);
}

export const jobsCommand: ShellModule = {
	name: "jobs",
	description: "List active jobs",
	category: "shell",
	params: [],
	run: ({ shell }) => {
		const procs = shell.users.listProcesses();
		if (procs.length === 0) return { stdout: "", exitCode: 0 };

		const lines = procs.map((p, i) => {
			const label = `[${i + 1}]`;
			const status = p.status === "running" ? "running" : p.status === "done" ? "done" : "stopped";
			return `${label}  ${String(p.pid).padStart(5)} ${status.padEnd(8)} ${p.argv.join(" ")}`;
		});

		return { stdout: lines.join("\n") + "\n", exitCode: 0 };
	},
};

export const bgCommand: ShellModule = {
	name: "bg",
	description: "Resume a suspended job in the background",
	category: "shell",
	params: ["[%jobspec]"],
	run: ({ args, shell }) => {
		const procs = shell.users.listProcesses();
		const proc = parseJobspec(args[0], procs);
		if (!proc) {
			return { stderr: `bg: ${args[0] ?? "%1"}: no such job`, exitCode: 1 };
		}
		if (proc.status === "done") {
			return { stderr: `bg: ${args[0]}: job has finished`, exitCode: 1 };
		}
		proc.status = "running";
		return { stdout: `[${procs.indexOf(proc) + 1}]  ${proc.pid}  ${proc.argv.join(" ")} &\n`, exitCode: 0 };
	},
};

export const fgCommand: ShellModule = {
	name: "fg",
	description: "Resume a suspended job in the foreground",
	category: "shell",
	params: ["[%jobspec]"],
	run: ({ args, shell }) => {
		const procs = shell.users.listProcesses();
		const proc = parseJobspec(args[0], procs);
		if (!proc) {
			return { stderr: `fg: ${args[0] ?? "%1"}: no such job`, exitCode: 1 };
		}
		if (proc.status === "done") {
			return { stderr: `fg: ${args[0]}: job has finished`, exitCode: 1 };
		}
		proc.status = "running";
		return { stdout: `${proc.argv.join(" ")}\n`, exitCode: 0 };
	},
};
