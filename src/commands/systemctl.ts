import * as path from "node:path";
import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

const UNIT_DIRS = ["/etc/systemd/system", "/lib/systemd/system"];
const WANTS_DIR = "/etc/systemd/system/multi-user.target.wants";

/** Control the systemd system and service manager. */
export const systemctlCommand: ShellModule = {
	name: "systemctl",
	description: "Control the systemd system and service manager",
	category: "system",
	params: ["[options] <subcommand> [name...]"],
	run: ({ shell, args }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: [
					"Usage: systemctl [OPTIONS...] COMMAND [NAME...]",
					"",
					"Commands:",
					"  list-units [pattern]   List loaded units",
					"  status [pattern]       Show unit status",
					"  start NAME...          Start (activate) units",
					"  stop NAME...           Stop (deactivate) units",
					"  enable NAME...         Enable units",
					"  disable NAME...        Disable units",
					"  is-active NAME...      Check if units are active",
					"  is-enabled NAME...     Check if units are enabled",
					"  daemon-reload          Reload systemd manager config",
					"  list-unit-files        List installed unit files",
					"",
					"Options:",
					"  -h, --help        Show this help",
				].join("\n"),
				exitCode: 0,
			};
		}

		const vfs = shell.vfs;
		const positionals = args.filter((a) => !a.startsWith("-"));

		if (positionals.length === 0) {
			return listUnits(vfs);
		}

		const subcommand = positionals[0]!;
		const names = positionals.slice(1);

		switch (subcommand) {
			case "list-units":
				return listUnits(vfs, names[0]);
			case "list-unit-files":
				return listUnitFiles(vfs);
			case "daemon-reload":
				return { stdout: "", exitCode: 0 };
			case "start":
			case "stop":
			case "restart":
			case "reload":
				if (names.length === 0) {
					return {
						stderr: `systemctl: missing unit name for '${subcommand}'`,
						exitCode: 1,
					};
				}
				return { stdout: "", exitCode: 0 };
			case "enable":
			case "disable":
				if (names.length === 0) {
					return {
						stderr: `systemctl: missing unit name for '${subcommand}'`,
						exitCode: 1,
					};
				}
				return toggleEnable(vfs, subcommand, names);
			case "status":
				if (names.length === 0) {
					return listUnits(vfs);
				}
				return showStatus(vfs, names[0]!);
			case "is-active":
				if (names.length === 0) {
					return { stderr: "systemctl: missing unit name", exitCode: 1 };
				}
				return checkActive(vfs, names);
			case "is-enabled":
				if (names.length === 0) {
					return { stderr: "systemctl: missing unit name", exitCode: 1 };
				}
				return checkEnabled(vfs, names);
			default:
				return {
					stderr: `systemctl: unknown command '${subcommand}'`,
					exitCode: 1,
				};
		}
	},
};

function listServiceFiles(vfs: {
	list: (d: string) => string[];
	exists: (p: string) => boolean;
}): string[] {
	const files: string[] = [];
	for (const dir of UNIT_DIRS) {
		if (!vfs.exists(dir)) {
			continue;
		}
		try {
			const entries = vfs.list(dir);
			for (const e of entries) {
				if (e.endsWith(".service")) {
					files.push(path.posix.join(dir, e));
				}
			}
		} catch {
			// directory may not be readable
		}
	}
	return files.sort();
}

function readDescription(
	vfs: { readFile: (p: string) => string },
	unitPath: string
): string {
	try {
		const content = vfs.readFile(unitPath);
		const m = content.match(/^Description=(.+)$/m);
		return m ? m[1]! : "(unknown)";
	} catch {
		return "(unknown)";
	}
}

function isEnabled(
	vfs: { exists: (p: string) => boolean },
	unitName: string
): boolean {
	return vfs.exists(path.posix.join(WANTS_DIR, unitName));
}

function listUnits(
	vfs: {
		list: (d: string) => string[];
		exists: (p: string) => boolean;
		readFile: (p: string) => string;
	},
	pattern?: string
) {
	const files = listServiceFiles(vfs);
	const lines = [
		"UNIT                      LOAD   ACTIVE SUB     DESCRIPTION",
		"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
	];

	for (const f of files) {
		const name = path.posix.basename(f);
		if (pattern && !name.includes(pattern)) {
			continue;
		}
		const desc = readDescription(vfs, f);
		const enabled = isEnabled(vfs, name);
		const active = enabled ? "active" : "inactive";
		const sub = enabled ? "running" : "dead";
		lines.push(
			`${name.padEnd(25)} loaded ${active.padEnd(7)} ${sub.padEnd(7)} ${desc}`
		);
	}

	if (files.length === 0) {
		lines.push("(no unit files found)");
	}

	lines.push("", `${files.length} units listed.`);
	return { stdout: `${lines.join("\n")}\n`, exitCode: 0 };
}

function listUnitFiles(vfs: {
	list: (d: string) => string[];
	exists: (p: string) => boolean;
}) {
	const files = listServiceFiles(vfs);
	const lines = [
		"UNIT FILE                  STATE",
		"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
	];

	for (const f of files) {
		const name = path.posix.basename(f);
		const state = isEnabled(vfs, name) ? "enabled" : "disabled";
		lines.push(`${name.padEnd(27)} ${state}`);
	}

	if (files.length === 0) {
		lines.push("(no unit files found)");
	}

	lines.push("", `${files.length} unit files listed.`);
	return { stdout: `${lines.join("\n")}\n`, exitCode: 0 };
}

function toggleEnable(
	vfs: {
		list: (d: string) => string[];
		exists: (p: string) => boolean;
		symlink: (t: string, l: string) => void;
		remove: (p: string) => void;
	},
	action: string,
	names: string[]
) {
	const results: string[] = [];
	for (const name of names) {
		const unitName = name.endsWith(".service") ? name : `${name}.service`;
		const unitPath = findUnit(unitName, vfs);
		if (!unitPath) {
			results.push(
				`Failed to ${action} unit: Unit file ${unitName} does not exist.`
			);
			continue;
		}

		const wantsLink = path.posix.join(WANTS_DIR, unitName);

		if (action === "enable") {
			if (!vfs.exists(WANTS_DIR)) {
				results.push(`Cannot enable ${unitName}: ${WANTS_DIR} does not exist.`);
				continue;
			}
			if (vfs.exists(wantsLink)) {
				results.push(`Unit ${unitName} is already enabled.`);
			} else {
				vfs.symlink(unitPath, wantsLink);
				results.push(`Created symlink ${wantsLink} -> ${unitPath}.`);
			}
		} else if (vfs.exists(wantsLink)) {
			vfs.remove(wantsLink);
			results.push(`Removed symlink ${wantsLink}.`);
		} else {
			results.push(`Unit ${unitName} is not enabled.`);
		}
	}

	return { stdout: `${results.join("\n")}\n`, exitCode: 0 };
}

function findUnit(
	unitName: string,
	vfs: { list: (d: string) => string[]; exists: (p: string) => boolean }
): string | undefined {
	for (const dir of UNIT_DIRS) {
		const p = path.posix.join(dir, unitName);
		if (vfs.exists(p)) {
			return p;
		}
	}
}

function showStatus(
	vfs: {
		list: (d: string) => string[];
		exists: (p: string) => boolean;
		readFile: (p: string) => string;
	},
	name: string
) {
	const unitName = name.endsWith(".service") ? name : `${name}.service`;
	const unitPath = findUnit(unitName, vfs);
	if (!unitPath) {
		return { stderr: `Unit ${unitName} could not be found.`, exitCode: 3 };
	}

	const desc = readDescription(vfs, unitPath);
	const enabled = isEnabled(vfs, unitName);
	const active = enabled ? "active" : "inactive";
	const sub = enabled ? "running" : "dead";
	const state = enabled ? "enabled" : "disabled";

	return {
		stdout: `${[
			`* ${unitName} - ${desc}`,
			`     Loaded: loaded (${unitPath}; ${state})`,
			`     Active: ${active} (${sub}) since ...`,
			"   Main PID: ...",
		].join("\n")}\n`,
		exitCode: 0,
	};
}

function checkActive(
	vfs: { list: (d: string) => string[]; exists: (p: string) => boolean },
	names: string[]
) {
	const lines: string[] = [];
	for (const name of names) {
		const unitName = name.endsWith(".service") ? name : `${name}.service`;
		const exists = findUnit(unitName, vfs);
		if (exists) {
			const ok = isEnabled(vfs, unitName);
			lines.push(`${unitName} ${ok ? "active" : "inactive"}`);
		} else {
			lines.push(`${unitName} unknown`);
		}
	}
	const exitCode = lines.every((l) => l.endsWith("active")) ? 0 : 3;
	return { stdout: `${lines.join("\n")}\n`, exitCode };
}

function checkEnabled(
	vfs: { list: (d: string) => string[]; exists: (p: string) => boolean },
	names: string[]
) {
	const lines: string[] = [];
	for (const name of names) {
		const unitName = name.endsWith(".service") ? name : `${name}.service`;
		const ok = isEnabled(vfs, unitName);
		lines.push(`${unitName} ${ok ? "enabled" : "disabled"}`);
	}
	const exitCode = lines.every((l) => l.endsWith("enabled")) ? 0 : 1;
	return { stdout: `${lines.join("\n")}\n`, exitCode };
}
