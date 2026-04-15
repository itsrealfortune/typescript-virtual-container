import type { ShellModule } from "../types/commands";
import { getAllEnvVars } from "./set";

export const envCommand: ShellModule = {
	name: "env",
	params: ["[VAR=value...] [command]"],
	run: ({ authUser }) => {
		// For now, just display all environment variables
		// In a full implementation, this would also handle running commands with modified env

		const allVars = getAllEnvVars(authUser);
		const envVarsOutput = Object.entries(allVars)
			.map(([key, value]) => `${key}=${value}`)
			.sort()
			.join("\n");

		return {
			stdout: envVarsOutput,
			exitCode: 0,
		};
	},
};
