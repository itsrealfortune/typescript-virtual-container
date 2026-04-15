import type { ShellModule } from "../../types/commands";
import { getEnvVar, setEnvVar } from "./set";

export const exportCommand: ShellModule = {
	name: "export",
	params: ["[VAR=value]"],
	run: ({ args }) => {
		// export VAR=value or export VAR (to make it available to child processes)
		if (args.length === 0) {
			// List all exported variables
			return {
				stdout: "# export command - sets variables for child processes",
				exitCode: 0,
			};
		}

		// Parse VAR=value format
		for (const arg of args) {
			if (arg.includes("=")) {
				const [varName, varValue] = arg.split("=", 2);
				if (varName && varValue !== undefined) {
					setEnvVar(varName, varValue);
				}
			} else {
				// export VAR_NAME makes it available but we just set it
				setEnvVar(arg, getEnvVar(arg) || "");
			}
		}

		return { exitCode: 0 };
	},
};
