import * as path from "node:path";
import type {ShellModule} from "../types/commands";
import {ifFlag} from "./command-helpers";

const AT_DIR = "/var/spool/at";

export const atCommand: ShellModule = {
	name: "at",
	description: "Schedule delayed execution of commands",
	category: "system",
	params: ["[options] <time-spec>"],
	run: ({shell, args, authUser}) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: [
					"Usage: at [options] <time-spec>",
					"  -l, --list       List pending jobs (alias: atq)",
					"  -d, --del JOBID  Delete a job (alias: atrm)",
					"  -c JOBID         Show job content",
					"  -f FILE          Read job from file instead of stdin",
					"  -h, --help       Show this help",
					"",
					"Time specs: now, noon, midnight, HH:MM, HH:MM YYYY-MM-DD",
					"            +N minutes/hours/days/weeks",
				].join("\n"),
				exitCode: 0,
			};
		}

		const vfs = shell.vfs;

		if (ifFlag(args, ["-l", "--list"])) {
			return listJobs(vfs);
		}

		const delIdx =
			args.indexOf("-d") === -1 ? args.indexOf("--del") : args.indexOf("-d");
		if (delIdx !== -1 && delIdx + 1 < args.length) {
			return deleteJob(vfs, args[delIdx + 1]!);
		}

		const cIdx = args.indexOf("-c");
		if (cIdx !== -1 && cIdx + 1 < args.length) {
			return showJob(vfs, args[cIdx + 1]!);
		}

		const filtered = args.filter((a) => !a.startsWith("-"));
		const timeSpec = filtered[0];
		if (!timeSpec) {
			return {stderr: "at: no time specified", exitCode: 1};
		}

		const fileIdx = args.indexOf("-f");
		let jobContent: string;
		if (fileIdx !== -1 && fileIdx + 1 < args.length) {
			const filePath = args[fileIdx + 1]!;
			if (!vfs.exists(filePath)) {
				return {stderr: `at: ${filePath}: No such file`, exitCode: 1};
			}
			jobContent = vfs.readFile(filePath);
		} else {
			jobContent = "echo 'at job executed'\n";
		}

		return scheduleJob(vfs, timeSpec, jobContent, authUser);
	},
};

export const atqCommand: ShellModule = {
	name: "atq",
	description: "List pending at jobs",
	category: "system",
	params: [],
	run: ({shell}) => listJobs(shell.vfs),
};

export const atrmCommand: ShellModule = {
	name: "atrm",
	description: "Delete pending at jobs",
	category: "system",
	params: ["<jobid>..."],
	run: ({shell, args}) => {
		const vfs = shell.vfs;
		const ids = args.filter((a) => !a.startsWith("-"));
		if (ids.length === 0) {
			return {stderr: "atrm: missing job ID", exitCode: 1};
		}
		for (const id of ids) {
			const r = deleteJob(vfs, id);
			if (r.exitCode !== 0) {
				return r;
			}
		}
		return {stdout: "", exitCode: 0};
	},
};

function ensureDir(
	vfs: {
		exists: (p: string) => boolean;
		mkdir: (p: string, mode?: number) => void;
	},
	dir: string
) {
	if (!vfs.exists(dir)) {
		vfs.mkdir(dir, 0o755);
	}
}

function listJobs(vfs: {
	list: (d: string) => string[];
	exists: (p: string) => boolean;
	readFile: (p: string) => string;
	mkdir: (p: string, mode?: number) => void;
}) {
	ensureDir(vfs, AT_DIR);

	if (!vfs.exists(AT_DIR)) {
		return {stdout: "No at jobs.\n", exitCode: 0};
	}

	const entries: string[] = [];
	try {
		const names = vfs.list(AT_DIR);
		for (const name of names) {
			if (name === "." || name === "..") {
				continue;
			}
			try {
				const content = vfs.readFile(path.posix.join(AT_DIR, name));
				const meta = parseJobFile(name, content);
				entries.push(
					`${meta.id.padEnd(6)} ${meta.time.padEnd(20)} ${meta.user}`
				);
			} catch {
				entries.push(`${name.padEnd(6)} (corrupt)`);
			}
		}
	} catch {
		// no entries
	}

	if (entries.length === 0) {
		return {stdout: "No at jobs.\n", exitCode: 0};
	}

	return {
		stdout: `${"Job".padEnd(6)} ${"Time".padEnd(20)} User\n${entries.join("\n")}\n`,
		exitCode: 0,
	};
}

function deleteJob(
	vfs: {exists: (p: string) => boolean; remove: (p: string) => void},
	jobId: string
) {
	const jobPath = path.posix.join(AT_DIR, jobId);
	if (!vfs.exists(jobPath)) {
		return {stderr: `atrm: job ${jobId} not found`, exitCode: 1};
	}
	vfs.remove(jobPath);
	return {stdout: "", exitCode: 0};
}

function showJob(
	vfs: {exists: (p: string) => boolean; readFile: (p: string) => string},
	jobId: string
) {
	const jobPath = path.posix.join(AT_DIR, jobId);
	if (!vfs.exists(jobPath)) {
		return {stderr: `at: job ${jobId} not found`, exitCode: 1};
	}
	const content = vfs.readFile(jobPath);
	return {stdout: `${content}\n`, exitCode: 0};
}

function scheduleJob(
	vfs: {
		list: (d: string) => string[];
		exists: (p: string) => boolean;
		mkdir: (p: string, mode?: number) => void;
		writeFile: (
			p: string,
			content: string | Buffer,
			options?: {mode?: number}
		) => void;
	},
	timeSpec: string,
	content: string,
	user: string
) {
	ensureDir(vfs, AT_DIR);

	const now = new Date();
	const targetTime = parseTimeSpec(timeSpec, now);
	const jobId = String(
		Math.floor(now.getTime() / 1000) + Math.floor(Math.random() * 1000)
	);

	const jobFile = [
		`# at job ${jobId}`,
		`# scheduled at ${targetTime.toISOString()}`,
		`# by ${user}`,
		"cd /",
		content.trim(),
	].join("\n");

	vfs.writeFile(path.posix.join(AT_DIR, jobId), jobFile, {mode: 0o644});

	return {
		stdout: `job ${jobId} at ${targetTime.toLocaleString()}\n`,
		exitCode: 0,
	};
}

function parseTimeSpec(spec: string, now: Date): Date {
	const t = spec.toLowerCase().trim();

	if (t === "now") {
		return new Date(now.getTime() + 60000);
	}
	if (t === "noon") {
		return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0);
	}
	if (t === "midnight") {
		return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0);
	}
	if (t === "teatime") {
		return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 0);
	}

	const plusMatch = t.match(/^\+\s*(\d+)\s*(minute|hour|day|week)s?$/);
	if (plusMatch) {
		const n = Number(plusMatch[1]);
		const unit = plusMatch[2];
		const ms =
			unit === "minute"
				? 60000
				: unit === "hour"
					? 3600000
					: unit === "day"
						? 86400000
						: 604800000;
		return new Date(now.getTime() + n * ms);
	}

	const hhmmMatch = t.match(
		/^(\d{1,2}):(\d{2})(?:\s+(\d{4})-(\d{2})-(\d{2}))?$/
	);
	if (hhmmMatch) {
		const h = Number(hhmmMatch[1]);
		const m = Number(hhmmMatch[2]);
		if (hhmmMatch[3]) {
			return new Date(
				Number(hhmmMatch[3]),
				Number(hhmmMatch[4]) - 1,
				Number(hhmmMatch[5]),
				h,
				m
			);
		}
		const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
		return d <= now ? new Date(d.getTime() + 86400000) : d;
	}

	return new Date(now.getTime() + 3600000);
}

function parseJobFile(
	name: string,
	content: string
): {id: string; time: string; user: string} {
	const lines = content.split("\n");
	const timeLine = lines.find((l) => l.startsWith("# scheduled at "));
	const userLine = lines.find((l) => l.startsWith("# by "));
	return {
		id: name,
		time: timeLine
			? timeLine.replace("# scheduled at ", "").replace("T", " ").slice(0, 16)
			: "unknown",
		user: userLine ? userLine.replace("# by ", "") : "unknown",
	};
}
