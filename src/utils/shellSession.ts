import * as path from "node:path";
import { resolvePath } from "../commands/helpers";
import { userHome } from "../commands/runtime";
import type VirtualFileSystem from "../VirtualFileSystem";

// ── History ───────────────────────────────────────────────────────────────────

/**
 * Loads the shell command history for a user from the VFS.
 * Creates an empty history file if none exists.
 * @param vfs - The virtual file system instance.
 * @param authUser - The authenticated username.
 * @returns An array of history lines, with empty lines removed.
 */
export function loadHistory(vfs: VirtualFileSystem, authUser: string): string[] {
	const historyPath = `${userHome(authUser)}/.bash_history`;
	if (!vfs.exists(historyPath)) {
		vfs.writeFile(historyPath, "");
		return [];
	}
	return vfs.readFile(historyPath)
		.split("\n")
		.map((l: string) => l.trim())
		.filter((l: string) => l.length > 0);
}

/**
 * Saves shell command history for a user to the VFS.
 * Each entry is written on its own line to `.bash_history`.
 * @param vfs - The virtual file system instance.
 * @param authUser - The authenticated username.
 * @param history - The ordered list of history entries to persist.
 */
export function saveHistory(vfs: VirtualFileSystem, authUser: string, history: string[]): void {
	const data = history.length > 0 ? `${history.join("\n")}\n` : "";
	vfs.writeFile(`${userHome(authUser)}/.bash_history`, data);
}

// ── Last login ────────────────────────────────────────────────────────────────

export interface LastLogin {
	at: string;
	from: string;
}

/**
 * Reads the last-login timestamp for a user from the VFS.
 * @param vfs - The virtual file system instance.
 * @param authUser - The authenticated username.
 * @returns The `LastLogin` object, or `null` if no record exists or parsing fails.
 */
export function readLastLogin(vfs: VirtualFileSystem, authUser: string): LastLogin | null {
	const p = authUser === "root" ? "/root/.lastlog.json" : `/home/${authUser}/.lastlog`;
	if (!vfs.exists(p)) return null;
	try {
		return JSON.parse(vfs.readFile(p)) as LastLogin;
	} catch {
		return null;
	}
}

/**
 * Writes the current timestamp as the last login for a user to the VFS.
 * @param vfs - The virtual file system instance.
 * @param authUser - The authenticated username.
 * @param from - An identifier for the origin of the login session (e.g. `"web"` or `"ssh"`).
 */
export function writeLastLogin(vfs: VirtualFileSystem, authUser: string, from: string): void {
	const p = authUser === "root" ? "/root/.lastlog.json" : `/home/${authUser}/.lastlog`;
	vfs.writeFile(p, JSON.stringify({ at: new Date().toISOString(), from }));
}

// ── Path completion ───────────────────────────────────────────────────────────

/**
 * Lists path completions for tab-completion in the shell.
 * Filters directory entries that match the given prefix, hides dot-files
 * unless the prefix itself starts with a dot, and appends `"/"` to directories.
 * @param vfs - The virtual file system instance.
 * @param cwd - The current working directory to resolve relative paths against.
 * @param prefix - The partial path to complete (e.g. `"/usr/lo"` or `"./fo"`).
 * @returns A sorted array of matching completion candidates.
 */
export function listPathCompletions(vfs: VirtualFileSystem, cwd: string, prefix: string): string[] {
	const slashIndex = prefix.lastIndexOf("/");
	const dirPart = slashIndex >= 0 ? prefix.slice(0, slashIndex + 1) : "";
	const namePart = slashIndex >= 0 ? prefix.slice(slashIndex + 1) : prefix;
	const basePath = resolvePath(cwd, dirPart || ".");
	try {
		return vfs
			.list(basePath)
			.filter((e: string) => e.startsWith(namePart))
			.filter((e: string) => namePart.startsWith(".") || !e.startsWith("."))
			.map((e: string) => {
				const fullPath = path.posix.join(basePath, e);
				const st = vfs.stat(fullPath);
				return `${dirPart}${e}${st.type === "directory" ? "/" : ""}`;
			})
			.sort();
	} catch {
		return [];
	}
}
