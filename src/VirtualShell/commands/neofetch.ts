import { buildNeofetchOutput } from "../../../modules/neofetch";
import type { ShellModule } from "../../types/commands";
import { ifFlag } from "./command-helpers";
import { getAllEnvVars } from "./set";

export const neofetchCommand: ShellModule = {
	name: "neofetch",
	params: ["[--off]"],
	run: ({ args, authUser, hostname, shellProps }) => {
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
				shellProps: shellProps,
				terminal: env.TERM,
			}),
			exitCode: 0,
		};
	},
};
