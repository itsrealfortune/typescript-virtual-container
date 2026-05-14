/** biome-ignore-all lint/style/useNamingConvention: ENV VARIABLES */
import { executeStatements } from "../SSHMimic/executor";
import type { VirtualShell } from "../VirtualShell";
import { parseScript } from "../VirtualShell/shellParser";
import type {
	CommandMode,
	CommandResult,
	ShellEnv,
} from "../types/commands";
import { expandAsync, expandBraces } from "../utils/expand";
import { tokenizeCommand } from "../utils/tokenize";
import { resolveModule } from "./registry";

/** Returns the home directory path for a given user. Root lives at /root. */
export function userHome(authUser: string): string {
	return authUser === "root" ? "/root" : `/home/${authUser}`;
}

export function makeDefaultEnv(authUser: string, hostname: string): ShellEnv {
	return {
		vars: {
			PATH: "/usr/local/bin:/usr/bin:/bin",
			HOME: userHome(authUser),
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

const MAX_CALL_DEPTH = 8;
let _callDepth = 0;

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
	// Anti-loop guard: track call depth via env to avoid infinite recursion
	_callDepth++;
	// console.debug(`[depth=${_callDepth}] runCommandDirect: ${name}`);
	if (_callDepth > MAX_CALL_DEPTH) {
		_callDepth--;
		// console.debug(`[LOOP DETECTED] runCommandDirect blocked: ${name}`);
		return { stderr: `${name}: maximum call depth (${MAX_CALL_DEPTH}) exceeded`, exitCode: 126 };
	}
	try {
		return await _runCommandDirectInner(name, args, authUser, hostname, mode, cwd, shell, stdin, env);
	} finally {
		_callDepth--;
	}
}

async function _runCommandDirectInner(
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
	const assignRe = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/;
	const invocation = [name, ...args];
	let assignCount = 0;
	while (assignCount < invocation.length && assignRe.test(invocation[assignCount]!)) {
		assignCount += 1;
	}
	if (assignCount > 0) {
		const assignments = invocation.slice(0, assignCount).map((token) => token.match(assignRe)!);
		const remaining = invocation.slice(assignCount);
		const restored: Array<[string, string | undefined]> = [];
		for (const [, key, value] of assignments) {
			restored.push([key!, env.vars[key!]]);
			env.vars[key!] = value!;
		}
		if (remaining.length === 0) {
			return { exitCode: 0 };
		}
		try {
			const result = await runCommandDirect(
				remaining[0]!,
				remaining.slice(1),
				authUser,
				hostname,
				mode,
				cwd,
				shell,
				stdin,
				env,
			);
			return result;
		} finally {
			for (const [key, value] of restored) {
				if (value === undefined) delete env.vars[key];
				else env.vars[key] = value;
			}
		}
	}

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
				// builtin not found — stop here, don't fall through to sh -c (avoids infinite loop)
				return { stderr: `${name}: exec builtin '${builtinMatch[1]}' not found`, exitCode: 127 };
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

	// Anti-loop guard: check depth here too — catches sh -c recursive calls
	_callDepth++;
	// console.debug(`[depth=${_callDepth}] runCommand: ${trimmed.slice(0, 60)}`);
	if (_callDepth > MAX_CALL_DEPTH) {
		_callDepth--;
		// console.debug(`[LOOP DETECTED] runCommand blocked: ${trimmed.slice(0, 60)}`);
		return { stderr: `${trimmed.split(" ")[0]}: maximum call depth (${MAX_CALL_DEPTH}) exceeded`, exitCode: 126 };
	}
	try {
	const rawTokens = tokenizeCommand(trimmed);
	const rawFirstWord = rawTokens[0]?.toLowerCase() ?? "";
	const aliasVal = shellEnv.vars[`__alias_${rawFirstWord}`];
	const aliasExpanded = aliasVal
		? trimmed.replace(rawFirstWord, aliasVal)
		: trimmed;

	// Detect sh-syntax constructs that must be handled by the sh interpreter
	const isShScript =
		/\bfor\s+\w+\s+in\b/.test(aliasExpanded) ||
		/\bwhile\s+/.test(aliasExpanded) ||
		/\bif\s+/.test(aliasExpanded) ||
		/\w+\s*\(\s*\)\s*\{/.test(aliasExpanded) ||
		/\bfunction\s+\w+/.test(aliasExpanded) ||
		/\(\(\s*.+\s*\)\)/.test(aliasExpanded);

	const hasOperators =
		/(?<![|&])[|](?![|])/.test(aliasExpanded) ||
		aliasExpanded.includes(">") ||
		aliasExpanded.includes("<") ||
		aliasExpanded.includes("&&") ||
		aliasExpanded.includes("||") ||
		aliasExpanded.includes(";");

	if ((isShScript && rawFirstWord !== "sh" && rawFirstWord !== "bash") || hasOperators) {
		// sh-syntax: route through sh interpreter to handle for/while/functions
		if (isShScript && rawFirstWord !== "sh" && rawFirstWord !== "bash") {
			const shMod = resolveModule("sh");
			if (shMod) {
				return await shMod.run({
					authUser, hostname,
					activeSessions: shell.users.listActiveSessions(),
					rawInput: aliasExpanded,
					mode,
					args: ["-c", aliasExpanded],
					stdin: undefined,
					cwd,
					shell,
					env: shellEnv,
				});
			}
		}
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
	if (parts.length === 0) return { exitCode: 0 };
	const assignRe = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/;
	if (assignRe.test(parts[0]!)) {
		return runCommandDirect(
			parts[0]!,
			parts.slice(1),
			authUser,
			hostname,
			mode,
			cwd,
			shell,
			stdin,
			shellEnv,
		);
	}
	const commandName = parts[0]?.toLowerCase() ?? "";
	// Apply brace expansion to each arg token
	const args = parts.slice(1).flatMap(expandBraces);
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
	} finally {
		_callDepth--;
	}
}