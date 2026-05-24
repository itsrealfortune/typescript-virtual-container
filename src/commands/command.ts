import type {
	CommandContext,
	CommandResult,
	ShellModule,
} from "../types/commands";
import {resolveModule} from "./registry";

function runCommandVfsStub(
	vfsBinary: string,
	cmdName: string,
	args: string[],
	ctx: CommandContext
): CommandResult | Promise<CommandResult> {
	const {authUser, hostname, mode, cwd, shell, stdin, env} = ctx;
	const stubContent = shell.vfs.readFile(vfsBinary);
	const builtinMatch = stubContent.match(/exec\s+builtin\s+(\S+)/);
	if (builtinMatch) {
		const builtinMod = resolveModule(builtinMatch[1] as string);
		if (builtinMod) {
			return builtinMod.run({
				authUser,
				uid: shell.users.getUid(authUser),
				gid: shell.users.getGid(authUser),
				hostname,
				activeSessions: shell.users.listActiveSessions(),
				rawInput: [cmdName, ...args].join(" "),
				mode,
				args,
				stdin,
				cwd,
				shell,
				env,
			});
		}
	}
	const shMod = resolveModule("sh");
	if (shMod) {
		return shMod.run({
			authUser,
			uid: shell.users.getUid(authUser),
			gid: shell.users.getGid(authUser),
			hostname,
			activeSessions: shell.users.listActiveSessions(),
			rawInput: `sh -c ${JSON.stringify(stubContent)}`,
			mode,
			args: ["-c", stubContent, "--", ...args],
			stdin,
			cwd,
			shell,
			env,
		});
	}
	return {stderr: `${cmdName}: command not found`, exitCode: 127};
}

export const commandCommand: ShellModule = {
	name: "command",
	description: "Run a command or display info about it",
	category: "shell",
	params: ["[-vVp] <command> [args...]"],
	run: ({args, authUser, uid, gid, hostname, mode, cwd, shell, stdin, env}) => {
		if (args.length === 0) {
			return {stderr: "command: missing argument", exitCode: 1};
		}

		const flags = new Set(
			[...args].filter((a) => a.startsWith("-") && !a.includes("="))
		);
		const names = args.filter((a) => !flags.has(a));
		const hasV = flags.has("-v");
		const hasVv = flags.has("-V");
		const hasP = flags.has("-p");
		const hasRun = !(hasV || hasVv);

		const pathDirs = (
			hasP
				? "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
				: (env?.vars?.PATH ?? "/usr/local/bin:/usr/bin:/bin")
		).split(":");

		if (hasRun && names.length > 0) {
			const cmdName = names[0] as string;
			const cmdArgs = names.slice(1);
			const builtin = resolveModule(cmdName);
			if (builtin) {
				return builtin.run({
					authUser,
					uid,
					gid,
					hostname,
					activeSessions: shell.users.listActiveSessions(),
					rawInput: names.join(" "),
					mode,
					args: cmdArgs,
					stdin,
					cwd,
					shell,
					env,
				});
			}
			for (const dir of pathDirs) {
				const full = `${dir}/${cmdName}`;
				if (shell.vfs.exists(full)) {
					return runCommandVfsStub(full, cmdName, cmdArgs, {
						authUser,
						uid,
						gid,
						hostname,
						mode,
						cwd,
						shell,
						stdin,
						env,
						rawInput: names.join(" "),
						args: cmdArgs,
						activeSessions: shell.users.listActiveSessions(),
					});
				}
			}
			return {stderr: `${cmdName}: not found`, exitCode: 127};
		}

		if (hasV || hasVv) {
			const lines: string[] = [];
			let exitCode = 0;
			for (const name of names) {
				const builtin = resolveModule(name);
				const isFunc = `__func_${name}` in env.vars;

				if (hasVv) {
					if (builtin) {
						lines.push(`${name} is a shell builtin`);
					} else if (isFunc) {
						lines.push(`${name} is a function`);
					} else {
						let found = false;
						for (const dir of pathDirs) {
							const full = `${dir}/${name}`;
							if (shell.vfs.exists(full)) {
								lines.push(`${name} is ${full}`);
								found = true;
								break;
							}
						}
						if (!found) {
							lines.push(`${name}: not found`);
							exitCode = 1;
						}
					}
				} else if (builtin || isFunc) {
					lines.push(name);
				} else {
					let found = false;
					for (const dir of pathDirs) {
						const full = `${dir}/${name}`;
						if (shell.vfs.exists(full)) {
							lines.push(full);
							found = true;
							break;
						}
					}
					if (!found) {
						exitCode = 1;
					}
				}
			}
			return {stdout: lines.join("\n"), exitCode};
		}

		return {stdout: "", exitCode: 0};
	},
};
