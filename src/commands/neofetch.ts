import { buildNeofetchOutput } from "../modules/neofetch";
import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

/**
 * Display system information in a decorative format.
 * @category system
 * @params ["[--off]"]
 */
export const neofetchCommand: ShellModule = {
	name: "neofetch",
	description: "System info display",
	category: "system",
	params: ["[--off]"],
	run: ({ args, authUser, hostname, shell, env }) => {
		if (!shell.packageManager.isInstalled("neofetch")) {
			return {
				stderr:
					"bash: neofetch: command not found\nHint: install it with: apt install neofetch\n",
				exitCode: 127,
			};
		}
		if (ifFlag(args, "--help")) {
			return {
				stdout: "Usage: neofetch [--off]",
				exitCode: 0,
			};
		}

		if (ifFlag(args, "--off")) {
			return {
				stdout: `${authUser}@${hostname}`,
				exitCode: 0,
			};
		}

		return {
			stdout: buildNeofetchOutput({
				user: authUser,
				host: hostname,
				shell: env.vars.SHELL,
				shellProps: shell.properties,
				terminal: env.vars.TERM,
				uptimeSeconds: Math.floor((Date.now() - shell.startTime) / 1000),
				packages: (() => {
					const count = shell.packageManager?.installedCount() ?? 0;
					return `${count} (dpkg)`;
				})(),
			}),
			exitCode: 0,
		};
	},
};
