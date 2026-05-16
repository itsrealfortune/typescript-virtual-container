/** biome-ignore-all lint/style/useNamingConvention: ENV VARIABLES */
import { executeStatements } from "../SSHMimic/executor";
import type { VirtualShell } from "../VirtualShell";
import { parseScript } from "../VirtualShell/shellParser";
import type {
	CommandMode,
	CommandResult,
	ShellEnv,
} from "../types/commands";
import { expandAsync, expandBraces, expandGlob } from "../utils/expand";
import { tokenizeCommand } from "../utils/tokenize";
import { resolveModule } from "./registry";

// Module-level compiled regexes — avoids recompilation on every runCommand call
const ASSIGN_RE      = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/;
const RE_FOR         = /\bfor\s+\w+\s+in\b/;
const RE_WHILE       = /\bwhile\s+/;
const RE_IF          = /\bif\s+/;
const RE_FUNC_BRACE  = /\w+\s*\(\s*\)\s*\{/;
const RE_FUNC_KW     = /\bfunction\s+\w+/;
const RE_ARITH       = /\(\(\s*.+\s*\)\)/;
const RE_PIPE        = /(?<![|&])[|](?![|])/;
const RE_OPERATORS   = /[><;&]|\|\|/;

/** Returns the home directory path for a given user. Root lives at /root. */
export function userHome(authUser: string): string {
	return authUser === "root" ? "/root" : `/home/${authUser}`;
}

/**
 * Apply a user switch: reset PS1/USER/HOME/LOGNAME in shellEnv and re-source
 * the new user's .bashrc. Call this after setting authUser = newUser.
 */
export async function applyUserSwitch(
	newUser: string,
	hostname: string,
	cwd: string,
	shellEnv: ShellEnv,
	shell: VirtualShell,
): Promise<void> {
	shellEnv.vars.USER = newUser;
	shellEnv.vars.LOGNAME = newUser;
	shellEnv.vars.HOME = userHome(newUser);
	shellEnv.vars.PS1 = makeDefaultEnv(newUser, hostname).vars.PS1 ?? "";
	const rcPath = `${userHome(newUser)}/.bashrc`;
	if (!shell.vfs.exists(rcPath)) return;
	for (const raw of shell.vfs.readFile(rcPath).split("\n")) {
		const l = raw.trim();
		if (!l || l.startsWith("#")) continue;
		try { await runCommand(l, newUser, hostname, "shell", cwd, shell, undefined, shellEnv); } catch { /* ignore */ }
	}
}

export function makeDefaultEnv(authUser: string, hostname: string): ShellEnv {
	return {
		vars: {
			PATH: "/usr/local/bin:/usr/bin:/bin",
			HOME: userHome(authUser),
			USER: authUser,
			LOGNAME: authUser,
			SHELL: "/bin/bash",
			TERM: "xterm-256color",
			HOSTNAME: hostname,
			PS1: authUser === "root"
				? "\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] "
				: "\\[\\e[37;1m\\][\\[\\e[35;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[0m\\]\\$ ",
			"0": "/bin/bash",
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

	const rawPath = env.vars.PATH ?? "/usr/local/bin:/usr/bin:/bin";
	// Cache split PATH on the env object to avoid re-splitting on every binary lookup
	if (!env._pathDirs || env._pathRaw !== rawPath) {
		env._pathRaw = rawPath;
		env._pathDirs = rawPath.split(":");
	}
	const pathDirs = env._pathDirs;
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

/** Run a VFS stub file as a command, handling `exec builtin <name>` and `sh -c` stubs. */
async function runVfsStub(
	vfsBinary: string,
	cmdName: string,
	args: string[],
	rawInput: string,
	authUser: string,
	hostname: string,
	mode: CommandMode,
	cwd: string,
	shell: VirtualShell,
	env: ShellEnv,
	stdin: string | undefined,
): Promise<CommandResult> {
	const stubContent = shell.vfs.readFile(vfsBinary);
	const builtinMatch = stubContent.match(/exec\s+builtin\s+(\S+)/);
	if (builtinMatch) {
		const builtinMod = resolveModule(builtinMatch[1]!);
		if (builtinMod) {
			return builtinMod.run({
				authUser, hostname,
				activeSessions: shell.users.listActiveSessions(),
				rawInput, mode, args, stdin, cwd, shell, env,
			});
		}
		// Guard: missing builtin — stop here to avoid sh -c infinite loop
		return { stderr: `${cmdName}: exec builtin '${builtinMatch[1]}' not found`, exitCode: 127 };
	}
	const shMod = resolveModule("sh");
	if (shMod) {
		return shMod.run({
			authUser, hostname,
			activeSessions: shell.users.listActiveSessions(),
			rawInput: `sh -c ${JSON.stringify(stubContent)}`,
			mode,
			args: ["-c", stubContent, "--", ...args],
			stdin, cwd, shell, env,
		});
	}
	return { stderr: `${cmdName}: command not found`, exitCode: 127 };
}
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
	background = false,
	abortController?: AbortController,
): Promise<CommandResult> {
	// Anti-loop guard: track call depth via env to avoid infinite recursion
	_callDepth++;
	if (_callDepth > MAX_CALL_DEPTH) {
		_callDepth--;
		return { stderr: `${name}: maximum call depth (${MAX_CALL_DEPTH}) exceeded`, exitCode: 126 };
	}
	// Register as visible process only at the outermost call level
	const isTopLevel = _callDepth === 1;
	const pid = isTopLevel
		? shell.users.registerProcess(authUser, name, [name, ...args], env.vars.__TTY ?? "?", abortController)
		: -1;
	try {
		if (background && abortController?.signal.aborted) {
			return { stderr: "", exitCode: 130 };
		}
		return await _runCommandDirectInner(name, args, authUser, hostname, mode, cwd, shell, stdin, env);
	} finally {
		_callDepth--;
		if (isTopLevel && pid !== -1) {
			if (background) {
				shell.users.markProcessDone(pid);
			} else {
				shell.users.unregisterProcess(pid);
			}
		}
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
	const assignRe = ASSIGN_RE;
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

	// Shell function defined via sh.ts (stored as __func_<name>)
	const funcBody = env.vars[`__func_${name}`];
	if (funcBody) {
		const shMod = resolveModule("sh");
		if (!shMod) return { stderr: `${name}: sh not available`, exitCode: 127 };
		const savedPositional: Record<string, string | undefined> = {};
		args.forEach((a, i) => {
			savedPositional[String(i + 1)] = env.vars[String(i + 1)];
			env.vars[String(i + 1)] = a;
		});
		savedPositional["0"] = env.vars["0"];
		env.vars["0"] = name;
		try {
			return await shMod.run({
				authUser, hostname,
				activeSessions: shell.users.listActiveSessions(),
				rawInput: funcBody,
				mode,
				args: ["-c", funcBody],
				stdin,
				cwd,
				shell,
				env,
			});
		} finally {
			for (const [k, v] of Object.entries(savedPositional)) {
				if (v === undefined) delete env.vars[k];
				else env.vars[k] = v;
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
			return runVfsStub(vfsBinary, name, args, [name, ...args].join(" "),
				authUser, hostname, mode, cwd, shell, env, stdin);
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

	// History expansion: !! and !n
	if (trimmed === '!!' || /^!-?\d+$/.test(trimmed) || trimmed.startsWith('!! ')) {
		const histPath = `${shellEnv.vars.HOME ?? `/home/${authUser}`}/.bash_history`;
		if (shell.vfs.exists(histPath)) {
			const lines = shell.vfs.readFile(histPath).split('\n').filter(Boolean);
			let cmd: string | undefined;
			if (trimmed === '!!' || trimmed.startsWith('!! ')) {
				cmd = lines[lines.length - 1];
			} else {
				const n = parseInt(trimmed.slice(1), 10);
				cmd = n > 0 ? lines[n - 1] : lines[lines.length + n];
			}
			if (cmd) {
				const suffix = trimmed.startsWith('!! ') ? trimmed.slice(3) : '';
				return runCommand(`${cmd}${suffix ? ` ${suffix}` : ''}`, authUser, hostname, mode, cwd, shell, stdin, shellEnv);
			}
		}
		return { stderr: `${trimmed}: event not found`, exitCode: 1 };
	}

	const rawTokens = tokenizeCommand(trimmed);
	const rawFirstWord = rawTokens[0]?.toLowerCase() ?? "";
	const aliasVal = shellEnv.vars[`__alias_${rawFirstWord}`];
	const aliasExpanded = aliasVal
		? trimmed.replace(rawFirstWord, aliasVal)
		: trimmed;

	// Detect sh-syntax constructs that must be handled by the sh interpreter
	const isShScript =
		RE_FOR.test(aliasExpanded) ||
		RE_WHILE.test(aliasExpanded) ||
		RE_IF.test(aliasExpanded) ||
		RE_FUNC_BRACE.test(aliasExpanded) ||
		RE_FUNC_KW.test(aliasExpanded) ||
		RE_ARITH.test(aliasExpanded);

	const hasOperators = RE_PIPE.test(aliasExpanded) || RE_OPERATORS.test(aliasExpanded);

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
	const assignRe = ASSIGN_RE;
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
	const rawArgs = parts.slice(1);
	const args: string[] = [];
	for (const token of rawArgs) {
		for (const brace of expandBraces(token)) {
			for (const glob of expandGlob(brace, cwd, shell.vfs)) args.push(glob);
		}
	}
	const mod = resolveModule(commandName);

	if (!mod) {
		const vfsBinary = resolveVfsBinary(commandName, shellEnv, shell, authUser);
		if (vfsBinary) {
			return runVfsStub(vfsBinary, commandName, args, expanded,
				authUser, hostname, mode, cwd, shell, shellEnv, stdin);
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