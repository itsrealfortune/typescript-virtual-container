/** biome-ignore-all lint/style/useNamingConvention: ENV VARIABLES */
import { executeStatements } from "../SSHMimic/executor";
import type { VirtualShell } from "../VirtualShell";
import { parseScript } from "../VirtualShell/shellParser";
import type {
    CommandMode,
    CommandResult,
    ShellEnv,
} from "../types/commands";
import { expandAsync } from "../utils/expand";
import { tokenizeCommand } from "../utils/tokenize";
import { resolveModule } from "./registry";

export function makeDefaultEnv(authUser: string, hostname: string): ShellEnv {
	return {
		vars: {
			PATH: "/usr/local/bin:/usr/bin:/bin",
			HOME: `/home/${authUser}`,
			USER: authUser,
			LOGNAME: authUser,
			SHELL: "/bin/sh",
			TERM: "xterm-256color",
			HOSTNAME: hostname,
			PS1: "\\u@\\h:\\w\\$ ",
		},
		lastExitCode: 0,
	};
}

function resolveVfsBinary(
	name: string,
	env: ShellEnv,
	shell: VirtualShell,
	authUser: string,
): string | null {
	if (name.startsWith("/")) {
		if (!shell.vfs.exists(name)) return null;
		try {
			const st = shell.vfs.stat(name);
			if (st.type !== "file") return null;
			if (!(st.mode & 0o111)) return null;
			if (
				(name.startsWith("/sbin/") || name.startsWith("/usr/sbin/")) &&
				authUser !== "root"
			)
				return null;
			return name;
		} catch {
			return null;
		}
	}

	const pathDirs = (env.vars.PATH ?? "/usr/local/bin:/usr/bin:/bin").split(":");
	for (const dir of pathDirs) {
		if ((dir === "/sbin" || dir === "/usr/sbin") && authUser !== "root")
			continue;
		const full = `${dir}/${name}`;
		if (!shell.vfs.exists(full)) continue;
		try {
			const st = shell.vfs.stat(full);
			if (st.type !== "file") continue;
			if (!(st.mode & 0o111)) continue;
			return full;
		} catch {}
	}
	return null;
}

export async function runCommandDirect(
	name: string,
	args: string[],
	authUser: string,
	hostname: string,
	mode: CommandMode,
	cwd: string,
	shell: VirtualShell,
	stdin: string | undefined,
	env: ShellEnv,
): Promise<CommandResult> {
	const aliasVal = env.vars[`__alias_${name}`];
	if (aliasVal) {
		return runCommand(
			`${aliasVal} ${args.join(" ")}`,
			authUser,
			hostname,
			mode,
			cwd,
			shell,
			stdin,
			env,
		);
	}

	const mod = resolveModule(name);
	if (!mod) {
		const vfsBinary = resolveVfsBinary(name, env, shell, authUser);
		if (vfsBinary) {
			const stubContent = shell.vfs.readFile(vfsBinary);
			const builtinMatch = stubContent.match(/exec\s+builtin\s+(\S+)/);
			if (builtinMatch) {
				const builtinMod = resolveModule(builtinMatch[1]!);
				if (builtinMod) {
					return await builtinMod.run({
						authUser,
						hostname,
						activeSessions: shell.users.listActiveSessions(),
						rawInput: [name, ...args].join(" "),
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
				return await shMod.run({
					authUser,
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
		}
		return { stderr: `${name}: command not found`, exitCode: 127 };
	}

	try {
		return await mod.run({
			authUser,
			hostname,
			activeSessions: shell.users.listActiveSessions(),
			rawInput: [name, ...args].join(" "),
			mode,
			args,
			stdin,
			cwd,
			shell,
			env,
		});
	} catch (error: unknown) {
		return {
			stderr: error instanceof Error ? error.message : "Command failed",
			exitCode: 1,
		};
	}
}

export async function runCommand(
	rawInput: string,
	authUser: string,
	hostname: string,
	mode: CommandMode,
	cwd: string,
	shell: VirtualShell,
	stdin?: string,
	env?: ShellEnv,
): Promise<CommandResult> {
	const trimmed = rawInput.trim();
	if (trimmed.length === 0) return { exitCode: 0 };

	const shellEnv: ShellEnv = env ?? makeDefaultEnv(authUser, hostname);

	const rawTokens = tokenizeCommand(trimmed);
	const rawFirstWord = rawTokens[0]?.toLowerCase() ?? "";
	const aliasVal = shellEnv.vars[`__alias_${rawFirstWord}`];
	const aliasExpanded = aliasVal
		? trimmed.replace(rawFirstWord, aliasVal)
		: trimmed;

	const hasOperators =
		/(?<![|&])[|](?![|])/.test(aliasExpanded) ||
		aliasExpanded.includes(">") ||
		aliasExpanded.includes("<") ||
		aliasExpanded.includes("&&") ||
		aliasExpanded.includes("||") ||
		aliasExpanded.includes(";");

	if (hasOperators) {
		const script = parseScript(aliasExpanded);
		if (!script.isValid)
			return { stderr: script.error || "Syntax error", exitCode: 1 };
		try {
			return await executeStatements(
				script.statements,
				authUser,
				hostname,
				mode,
				cwd,
				shell,
				shellEnv,
			);
		} catch (error: unknown) {
			return {
				stderr: error instanceof Error ? error.message : "Execution failed",
				exitCode: 1,
			};
		}
	}

	const expanded = await expandAsync(
		aliasExpanded,
		shellEnv.vars,
		shellEnv.lastExitCode,
		(sub) =>
			runCommand(
				sub,
				authUser,
				hostname,
				mode,
				cwd,
				shell,
				undefined,
				shellEnv,
			).then((r) => r.stdout ?? ""),
	);

	const parts = tokenizeCommand(expanded.trim());
	const commandName = parts[0]?.toLowerCase() ?? "";
	const args = parts.slice(1);
	const mod = resolveModule(commandName);

	if (!mod) {
		const vfsBinary = resolveVfsBinary(commandName, shellEnv, shell, authUser);
		if (vfsBinary) {
			const stubContent = shell.vfs.readFile(vfsBinary);
			const builtinMatch = stubContent.match(/exec\s+builtin\s+(\S+)/);
			if (builtinMatch) {
				const builtinName = builtinMatch[1]!;
				const builtinMod = resolveModule(builtinName);
				if (builtinMod) {
					return await builtinMod.run({
						authUser,
						hostname,
						activeSessions: shell.users.listActiveSessions(),
						rawInput: [commandName, ...args].join(" "),
						mode,
						args,
						stdin,
						cwd,
						shell,
						env: shellEnv,
					});
				}
			}
			const shMod = resolveModule("sh");
			if (shMod) {
				return await shMod.run({
					authUser,
					hostname,
					activeSessions: shell.users.listActiveSessions(),
					rawInput: `sh -c ${JSON.stringify(stubContent)}`,
					mode,
					args: ["-c", stubContent, "--", ...args],
					stdin,
					cwd,
					shell,
					env: shellEnv,
				});
			}
		}

		return { stderr: `${commandName}: command not found`, exitCode: 127 };
	}

	try {
		return await mod.run({
			authUser,
			hostname,
			activeSessions: shell.users.listActiveSessions(),
			rawInput: expanded,
			mode,
			args,
			stdin,
			cwd,
			shell,
			env: shellEnv,
		});
	} catch (error: unknown) {
		return {
			stderr: error instanceof Error ? error.message : "Command failed",
			exitCode: 1,
		};
	}
}
