import type { ShellModule } from "../types/commands";
import { ifFlag, parseArgs } from "./command-helpers";
import { getPackageManager } from "./helpers";

/**
 * dpkg compatibility command (query/remove/list) backed by the virtual package manager.
 * @category package
 * @params ["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"]
 */
export const dpkgCommand: ShellModule = {
	name: "dpkg",
	description: "Fortune GNU/Linux package manager low-level tool",
	category: "package",
	params: ["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],
	run: ({ args, authUser, shell }) => {
		const pm = getPackageManager(shell);
		if (!pm)
			return { stderr: "dpkg: package manager not initialised", exitCode: 1 };

		const listFlag = ifFlag(args, ["-l", "--list"]);
		const statusFlag = ifFlag(args, ["-s", "--status"]);
		const listFilesFlag = ifFlag(args, ["-L", "--listfiles"]);
		const removeFlag = ifFlag(args, ["-r", "--remove"]);
		const purgeFlag = ifFlag(args, ["-P", "--purge"]);

		const { positionals } = parseArgs(args, {
			flags: [
				"-l",
				"--list",
				"-s",
				"--status",
				"-L",
				"--listfiles",
				"-r",
				"--remove",
				"-P",
				"--purge",
			],
		});

		if (listFlag) {
			const pkgList = pm.listInstalled();
			if (pkgList.length === 0) {
				return {
					stdout: [
						"Desired=Unknown/Install/Remove/Purge/Hold",
						"|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend",
						"|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)",
						"||/ Name           Version         Architecture Description",
						"+++-==============-===============-============-========================================",
						"(no packages installed)",
					].join("\n"),
					exitCode: 0,
				};
			}

			const header = [
				"Desired=Unknown/Install/Remove/Purge/Hold",
				"|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend",
				"|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)",
				"||/ Name           Version         Architecture Description",
				"+++-==============-===============-============-========================================",
			];

			const rows = pkgList.map((p) => {
				const name = p.name.padEnd(14).slice(0, 14);
				const ver = p.version.padEnd(15).slice(0, 15);
				const arch = p.architecture.padEnd(12).slice(0, 12);
				const desc = (p.description || "").slice(0, 40);
				return `ii  ${name} ${ver} ${arch} ${desc}`;
			});

			return { stdout: [...header, ...rows].join("\n"), exitCode: 0 };
		}

		if (statusFlag) {
			const pkgName = positionals[0];
			if (!pkgName)
				return { stderr: "dpkg: -s needs a package name", exitCode: 1 };
			const info = pm.show(pkgName);
			if (!info)
				return {
					stderr: `dpkg-query: package '${pkgName}' is not installed and no information is available`,
					exitCode: 1,
				};
			return { stdout: info, exitCode: 0 };
		}

		if (listFilesFlag) {
			const pkgName = positionals[0];
			if (!pkgName)
				return { stderr: "dpkg: -L needs a package name", exitCode: 1 };
			const installed = pm.listInstalled().find((p) => p.name === pkgName);
			if (!installed)
				return {
					stderr: `dpkg-query: package '${pkgName}' is not installed`,
					exitCode: 1,
				};
			if (installed.files.length === 0)
				return { stdout: "/.keep", exitCode: 0 };
			return { stdout: installed.files.join("\n"), exitCode: 0 };
		}

		if (removeFlag || purgeFlag) {
			if (authUser !== "root")
				return {
					stderr:
						"dpkg: error: requested operation requires superuser privilege",
					exitCode: 2,
				};
			if (positionals.length === 0)
				return { stderr: "dpkg: error: need an action option", exitCode: 2 };
			const { output, exitCode } = pm.remove(positionals, { purge: purgeFlag });
			return { stdout: output || undefined, exitCode };
		}

		// Default: show help
		return {
			stdout: [
				"Usage: dpkg [<option>...] <command>",
				"",
				"Commands:",
				"  -l, --list                  List packages matching given pattern",
				"  -s, --status <pkg>...       Report status of specified package",
				"  -L, --listfiles <pkg>...    List files owned by package",
				"  -r, --remove <pkg>...       Remove <pkg> but leave its configuration",
				"  -P, --purge <pkg>...        Remove <pkg> and its configuration",
			].join("\n"),
			exitCode: 0,
		};
	},
};

export const dpkgQueryCommand: ShellModule = {
	name: "dpkg-query",
	description: "Show information about installed packages",
	category: "package",
	params: ["-W [pkg] | -l [pattern]"],
	run: ({ args, shell }) => {
		const pm = getPackageManager(shell);
		if (!pm)
			return {
				stderr: "dpkg-query: package manager not initialised",
				exitCode: 1,
			};

		const listFlag = ifFlag(args, ["-l"]);
		const showFlag = ifFlag(args, ["-W", "--show"]);
		const { positionals } = parseArgs(args, {
			flags: ["-l", "-W", "--show"],
		});

		if (listFlag || showFlag) {
			const pkgList = pm.listInstalled();
			const pattern = positionals[0];
			const filtered = pattern
				? pkgList.filter((p) => p.name.includes(pattern))
				: pkgList;

			if (showFlag) {
				return {
					stdout: filtered.map((p) => `${p.name}\t${p.version}`).join("\n"),
					exitCode: 0,
				};
			}

			const rows = filtered.map((p) => {
				const name = p.name.padEnd(14).slice(0, 14);
				const ver = p.version.padEnd(15).slice(0, 15);
				return `ii  ${name} ${ver} amd64 ${(p.description || "").slice(0, 40)}`;
			});
			return {
				stdout: rows.join("\n") || "(no packages match)",
				exitCode: 0,
			};
		}

		return { stderr: "dpkg-query: need a flag (-l, -W)", exitCode: 1 };
	},
};
