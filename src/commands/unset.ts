import type { ShellModule } from "../types/commands";
import { setEnvVar } from "./set";

export const unsetCommand: ShellModule = {
	name: "unset",
	params: ["<VAR...>"],
	run: ({ args }) => {
		if (args.length === 0) {
			return { stderr: "unset: missing variable name", exitCode: 1 };
		}

		// Unset (remove) all specified variables
		for (const varName of args) {
			setEnvVar(varName, "");
		}

		return { exitCode: 0 };
	},
};
