import type {ShellModule} from "../types/commands";
import {ifFlag} from "./command-helpers";

interface Rule {
	target: string;
	deps: string[];
	cmds: string[];
}

export const makeCommand: ShellModule = {
	name: "make",
	description: "Build targets from a Makefile",
	category: "development",
	params: ["[options] [target...]"],
	run: ({shell, args, cwd}) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: [
					"Usage: make [options] [target...]",
					"  -C <dir>       Change to directory before reading Makefile",
					"  -f <file>      Use file as Makefile",
					"  -n, --dry-run  Print commands without executing",
					"  -s, --silent   Silent operation",
					"  -h, --help     Show this help",
					"",
					"Build targets from Makefile in current directory.",
				].join("\n"),
				exitCode: 0,
			};
		}

		const dryRun = ifFlag(args, ["-n", "--dry-run"]);
		const silent = ifFlag(args, ["-s", "--silent"]);

		const fIdx = args.indexOf("-f");
		const makefile =
			fIdx !== -1 && fIdx + 1 < args.length ? args[fIdx + 1]! : null;

		const cIdx = args.indexOf("-C");
		const dir = cIdx !== -1 && cIdx + 1 < args.length ? args[cIdx + 1]! : cwd;

		const targets = args.filter(
			(a) => !a.startsWith("-") && a !== args[fIdx + 1] && a !== args[cIdx + 1]
		);

		const mfPath = makefile
			? makefile.startsWith("/")
				? makefile
				: `${dir}/${makefile}`
			: `${dir}/Makefile`;

		if (!shell.vfs.exists(mfPath)) {
			const gmf = `${dir}/GNUmakefile`;
			if (shell.vfs.exists(gmf)) {
				return runMakefile(shell, gmf, targets, dryRun, silent, dir);
			}
			const bmf = `${dir}/makefile`;
			if (shell.vfs.exists(bmf)) {
				return runMakefile(shell, bmf, targets, dryRun, silent, dir);
			}
			return {
				stderr: "make: *** No targets specified and no makefile found.  Stop.",
				exitCode: 2,
			};
		}

		return runMakefile(shell, mfPath, targets, dryRun, silent, dir);
	},
};

function runMakefile(
	shell: {
		vfs: {readFile: (p: string) => string; exists: (p: string) => boolean};
	},
	mfPath: string,
	targets: string[],
	dryRun: boolean,
	silent: boolean,
	_dir: string
) {
	const content = shell.vfs.readFile(mfPath);
	const rules = parseMakefile(content);

	if (rules.length === 0) {
		return {
			stdout: `make: Nothing to be done for '${targets[0] ?? "all"}'.`,
			exitCode: 0,
		};
	}

	const toBuild = targets.length > 0 ? targets : ["all"];
	const stdout: string[] = [];

	for (const tgt of toBuild) {
		const rule = rules.find((r) => r.target === tgt);
		if (!rule) {
			return {
				stderr: `make: *** No rule to make target '${tgt}'.  Stop.`,
				exitCode: 2,
			};
		}

		for (const dep of rule.deps) {
			if (!shell.vfs.exists(dep)) {
				const depRule = rules.find((r) => r.target === dep);
				if (!depRule) {
					return {
						stderr: `make: *** No rule to make target '${dep}', needed by '${tgt}'.  Stop.`,
						exitCode: 2,
					};
				}
				if (!silent) {
					stdout.push("make: Entering unknown directory");
				}
			}
		}

		for (const cmd of rule.cmds) {
			const display = cmd.startsWith("@") ? cmd.slice(1) : cmd;
			if (!(silent || dryRun)) {
				stdout.push(display);
			} else if (dryRun) {
				stdout.push(display);
			}
		}
	}

	if (stdout.length === 0) {
		stdout.push(`make: Nothing to be done for '${toBuild.join(" ")}'.`);
	}

	return {stdout: `${stdout.join("\n")}\n`, exitCode: 0};
}

function parseMakefile(content: string): Rule[] {
	const rules: Rule[] = [];
	const lines = content.split("\n");
	let current: Rule | null = null;

	for (const raw of lines) {
		const line = raw.trim();

		if (!line || line.startsWith("#")) {
			continue;
		}

		if (line.startsWith("\t") || line.startsWith(" ")) {
			const cmd = line.replace(/^[\t ]+/, "");
			if (current) {
				current.cmds.push(cmd);
			}
			continue;
		}

		const targetMatch = line.match(/^([a-zA-Z0-9_.-/]+)\s*:\s*(.*)$/);
		if (targetMatch) {
			if (current) {
				rules.push(current);
			}
			const target = targetMatch[1]!;
			const depsStr = targetMatch[2]!.trim();
			const deps = depsStr ? depsStr.split(/\s+/) : [];
			current = {target, deps, cmds: []};
		}
	}

	if (current) {
		rules.push(current);
	}

	return rules;
}
