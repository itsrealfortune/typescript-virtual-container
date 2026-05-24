import type {ShellModule} from "../types/commands";
import {resolveModule} from "./registry";

export const builtinCommand: ShellModule = {
	name: "builtin",
	description: "Run a shell builtin (skip shell functions and aliases)",
	category: "shell",
	params: ["<builtin> [args...]"],
	run: ({args, authUser, uid, gid, hostname, mode, cwd, shell, stdin, env}) => {
		if (args.length === 0) {
			return {stderr: "builtin: missing argument", exitCode: 1};
		}
		const name = args[0]?.toLowerCase() ?? "";
		const mod = resolveModule(name);
		if (!mod) {
			return {stderr: `builtin: ${name}: not a shell builtin`, exitCode: 1};
		}
		return mod.run({
			authUser,
			uid,
			gid,
			hostname,
			activeSessions: shell.users.listActiveSessions(),
			rawInput: args.join(" "),
			mode,
			args: args.slice(1),
			stdin,
			cwd,
			shell,
			env,
		});
	},
};
