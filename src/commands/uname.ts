import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

/**
 * Print system information (kernel name, version, machine type).
 * @category system
 * @params ["[-a] [-s] [-r] [-m]"]
 */
export const unameCommand: ShellModule = {
	name: "uname",
	description: "Print system information",
	category: "system",
	params: ["[-a] [-s] [-r] [-m]"],
	run: ({ shell, args }) => {
		const all = ifFlag(args, ["-a"]);
		const sysname = "Linux";
		const release = shell.properties?.kernel ?? "5.15.0";
		const machine = shell.properties?.arch ?? "x86_64";
		const hostname = shell.hostname;
		if (all)
			return {
				stdout: `${sysname} ${hostname} ${release} #1 SMP ${machine} GNU/Linux`,
				exitCode: 0,
			};
		if (ifFlag(args, ["-r"])) return { stdout: release, exitCode: 0 };
		if (ifFlag(args, ["-m"])) return { stdout: machine, exitCode: 0 };
		return { stdout: sysname, exitCode: 0 };
	},
};
