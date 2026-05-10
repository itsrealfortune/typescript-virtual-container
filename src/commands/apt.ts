import type { ShellModule } from "../types/commands";
import { ifFlag, } from "./command-helpers";
import { getPackageManager } from "./helpers";

/**
 * APT package manager front-end (simulated).
 * @category package
 * @params ["<install|remove|update|upgrade|search|show|list> [pkg...]"]
 */
export const aptCommand: ShellModule = {
	name: "apt",
	aliases: ["apt-get"],
	description: "Package manager",
	category: "package",
	params: ["<install|remove|update|upgrade|search|show|list> [pkg...]"],
	run: ({ args, shell, authUser }) => {
		const pm = getPackageManager(shell);
		if (!pm) return { stderr: "apt: package manager not initialised", exitCode: 1 };

		const sub = args[0]?.toLowerCase();
		const rest = args.slice(1);

		const quiet = ifFlag(rest, ["-q", "--quiet", "-qq"]);
		const purge = ifFlag(rest, ["--purge"]);
		const pkgs = rest.filter((a) => !a.startsWith("-"));

		// Non-root check
		const restricted = ["install", "remove", "purge", "upgrade", "update"];
		if (restricted.includes(sub ?? "") && authUser !== "root") {
			return {
				stderr: "E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)\nE: Unable to acquire the dpkg frontend lock, are you root?",
				exitCode: 100,
			};
		}

		switch (sub) {
			case "install": {
				if (pkgs.length === 0)
					return { stderr: "apt: no packages specified", exitCode: 1 };
				const { output, exitCode } = pm.install(pkgs, { quiet });
				return { stdout: output || undefined, exitCode };
			}

			case "remove":
			case "purge": {
				if (pkgs.length === 0)
					return { stderr: "apt: no packages specified", exitCode: 1 };
				const { output, exitCode } = pm.remove(pkgs, {
					purge: sub === "purge" || purge,
					quiet,
				});
				return { stdout: output || undefined, exitCode };
			}

			case "update": {
				return {
					stdout: [
						"Hit:1 fortune://packages.fortune.local aurora InRelease",
						"Hit:2 fortune://security.fortune.local aurora-security InRelease",
						"Reading package lists... Done",
						"Building dependency tree... Done",
						"Reading state information... Done",
						`All packages are up to date.`,
					].join("\n"),
					exitCode: 0,
				};
			}

			case "upgrade": {
				return {
					stdout: [
						"Reading package lists... Done",
						"Building dependency tree... Done",
						"Reading state information... Done",
						"Calculating upgrade... Done",
						"0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.",
					].join("\n"),
					exitCode: 0,
				};
			}

			case "search": {
				const term = pkgs[0];
				if (!term)
					return { stderr: "apt: search requires a term", exitCode: 1 };
				const results = pm.search(term);
				if (results.length === 0)
					return {
						stdout: `Sorting... Done\nFull Text Search... Done\n(no results)`,
						exitCode: 0,
					};
				const lines = results.map(
					(p) => `${p.name}/${p.section ?? "misc"} ${p.version} amd64\n  ${p.shortDesc ?? p.description}`,
				);
				return {
					stdout: `Sorting... Done\nFull Text Search... Done\n${lines.join("\n")}`,
					exitCode: 0,
				};
			}

			case "show": {
				const name = pkgs[0];
				if (!name) return { stderr: "apt: show requires a package name", exitCode: 1 };
				const info = pm.show(name);
				if (!info)
					return { stderr: `N: Unable to locate package ${name}`, exitCode: 100 };
				return { stdout: info, exitCode: 0 };
			}

			case "list": {
				const installedFlag = ifFlag(rest, ["--installed"]);
				if (installedFlag) {
					const pkgList = pm.listInstalled();
					if (pkgList.length === 0)
						return { stdout: "Listing... Done\n(no packages installed)", exitCode: 0 };
					const lines = pkgList.map(
						(p) => `${p.name}/${p.section} ${p.version} ${p.architecture} [installed]`,
					);
					return { stdout: `Listing... Done\n${lines.join("\n")}`, exitCode: 0 };
				}
				// all available
				const all = pm.listAvailable();
				const lines = all.map(
					(p) => `${p.name}/${p.section ?? "misc"} ${p.version} amd64`,
				);
				return { stdout: `Listing... Done\n${lines.join("\n")}`, exitCode: 0 };
			}

			default: {
				return {
					stdout: [
						"Usage: apt [options] command",
						"",
						"Commands:",
						"  install <pkg...>   Install packages",
						"  remove <pkg...>    Remove packages",
						"  purge <pkg...>     Remove packages and config files",
						"  update             Refresh package index",
						"  upgrade            Upgrade all packages",
						"  search <term>      Search in package descriptions",
						"  show <pkg>         Show package details",
						"  list [--installed] List packages",
					].join("\n"),
					exitCode: 0,
				};
			}
		}
	},
};

export const aptCacheCommand: ShellModule = {
	name: "apt-cache",
	description: "Query the package cache",
	category: "package",
	params: ["<search|show|policy> [pkg]"],
	run: ({ args, shell }) => {
		const pm = getPackageManager(shell);
		if (!pm) return { stderr: "apt-cache: package manager not initialised", exitCode: 1 };

		const sub = args[0]?.toLowerCase();
		const pkgName = args[1];

		switch (sub) {
			case "search": {
				if (!pkgName) return { stderr: "Need a search term", exitCode: 1 };
				const results = pm.search(pkgName);
				return {
					stdout: results
						.map((p) => `${p.name} - ${p.shortDesc ?? p.description}`)
						.join("\n") || "(no results)",
					exitCode: 0,
				};
			}
			case "show": {
				if (!pkgName) return { stderr: "Need a package name", exitCode: 1 };
				const info = pm.show(pkgName);
				return info
					? { stdout: info, exitCode: 0 }
					: { stderr: `N: Unable to locate package ${pkgName}`, exitCode: 100 };
			}
			case "policy": {
				if (!pkgName) return { stderr: "Need a package name", exitCode: 1 };
				const def = pm.findInRegistry(pkgName);
				if (!def)
					return { stderr: `N: Unable to locate package ${pkgName}`, exitCode: 100 };
				const inst = pm.isInstalled(pkgName);
				return {
					stdout: [
						`${pkgName}:`,
						`  Installed: ${inst ? def.version : "(none)"}`,
						`  Candidate: ${def.version}`,
						`  Version table:`,
						`     ${def.version} 500`,
						`        500 fortune://packages.fortune.local aurora/main amd64 Packages`,
					].join("\n"),
					exitCode: 0,
				};
			}
			default:
				return { stderr: `apt-cache: unknown command '${sub ?? ""}'`, exitCode: 1 };
		}
	},
};
