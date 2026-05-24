import type { ShellModule } from "../types/commands";

/** Remove shell variable or function. */
export const unsetCommand: ShellModule = {
	name: "unset",
	description: "Remove shell variable or function",
	category: "shell",
	params: ["[-fv] <NAME>..."],
	run: ({ args, env }) => {
		let unsetFunc = false;
		let unsetVar = true;

		const names: string[] = [];
		for (const arg of args) {
			if (arg === "-f") {
				unsetFunc = true;
				unsetVar = false;
				continue;
			}
			if (arg === "-v") {
				unsetVar = true;
				unsetFunc = false;
				continue;
			}
			names.push(arg);
		}

		for (const name of names) {
			if (unsetVar) {
				delete env.vars[name];
			}
			if (unsetFunc) {
				delete env.vars[`__func_${name}`];
			}
		}
		return { exitCode: 0 };
	},
};
