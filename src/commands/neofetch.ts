import { buildNeofetchOutput } from "../modules/neofetch";
import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";
import { getAllEnvVars } from "./set";

export const neofetchCommand: ShellModule = {
	name: "neofetch",
	description: "System info display",
	category: "misc",
	params: ["[--off]"],
	run: ({ args, authUser, hostname, shell }) => {
		const env = getAllEnvVars(authUser);

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
				shell: env.SHELL,
				shellProps: shell.properties,
				terminal: env.TERM,
				uptimeSeconds: Math.floor((Date.now() - (shell._startTime ?? Date.now())) / 1000),
				packages: (() => {
					const pm = (shell as unknown as { packageManager?: { installedCount(): number } }).packageManager;
					const count = pm ? pm.installedCount() : 0;
					return `${count} (dpkg)`;
				})(),
			}),
			exitCode: 0,
		};
	},
};
