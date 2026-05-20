import type { ShellModule } from "../types/commands";
import { resolveSysctlPath } from "../modules/sysctl";

/**
 * Get or set kernel parameters.
 * @category system
 * @params ["[-w] [name=value | name]"]
 */
export const sysctlCommand: ShellModule = {
	name: "sysctl",
	description: "Get or set kernel parameters",
	category: "system",
	params: ["[-w] [name=value | name]"],
	run: ({ shell, args }) => {
		const pairs = args.filter((a) => a !== "-w" && a.includes("="));
		const queries = args.filter((a) => a !== "-w" && !a.includes("="));

		if (pairs.length > 0) {
			const results: string[] = [];
			for (const pair of pairs) {
				const [name, ...rest] = pair.split("=");
				const value = rest.join("=");
				if (!name) continue;
				const path = `/proc/sys/${name}`;
				const resolved = resolveSysctlPath(shell.sysctl, path);
				if (!resolved) {
					return { stderr: `sysctl: cannot stat '${name}': No such file or directory`, exitCode: 1 };
				}
				resolved.set(value.trim());
				const v = resolved.value;
				results.push(`${name} = ${typeof v === "number" ? v : v}`);
			}
			return { stdout: `${results.join("\n")}\n`, exitCode: 0 };
		}

		if (queries.length > 0) {
			const results: string[] = [];
			for (const name of queries) {
				const path = `/proc/sys/${name}`;
				const resolved = resolveSysctlPath(shell.sysctl, path);
				if (!resolved) {
					return { stderr: `sysctl: cannot stat '${name}': No such file or directory`, exitCode: 1 };
				}
				const v = resolved.value;
				results.push(`${name} = ${typeof v === "number" ? v : v}`);
			}
			return { stdout: `${results.join("\n")}\n`, exitCode: 0 };
		}

		// List all parameters
		const lines: string[] = [];
		const walk = (obj: Record<string, unknown>, prefix: string) => {
			for (const [k, v] of Object.entries(obj)) {
				const path = prefix ? `${prefix}.${k}` : k;
				if (typeof v === "object" && v !== null && !Array.isArray(v)) {
					walk(v as Record<string, unknown>, path);
				} else {
					lines.push(`${path} = ${v}`);
				}
			}
		};
		walk(shell.sysctl as unknown as Record<string, unknown>, "");
		return { stdout: `${lines.sort().join("\n")}\n`, exitCode: 0 };
	},
};
