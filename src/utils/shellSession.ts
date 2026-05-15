import * as path from "node:path";
import { resolvePath } from "../commands/helpers";
import { userHome } from "../commands/runtime";
import type VirtualFileSystem from "../VirtualFileSystem";

// ── History ───────────────────────────────────────────────────────────────────

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

export function saveHistory(vfs: VirtualFileSystem, authUser: string, history: string[]): void {
	const data = history.length > 0 ? `${history.join("\n")}\n` : "";
	vfs.writeFile(`${userHome(authUser)}/.bash_history`, data);
}

// ── Last login ────────────────────────────────────────────────────────────────

export interface LastLogin {
	at: string;
	from: string;
}

export function readLastLogin(vfs: VirtualFileSystem, authUser: string): LastLogin | null {
	const p = authUser === "root" ? "/root/.lastlog.json" : `/home/${authUser}/.lastlog`;
	if (!vfs.exists(p)) return null;
	try {
		return JSON.parse(vfs.readFile(p)) as LastLogin;
	} catch {
		return null;
	}
}

export function writeLastLogin(vfs: VirtualFileSystem, authUser: string, from: string): void {
	const p = authUser === "root" ? "/root/.lastlog.json" : `/home/${authUser}/.lastlog`;
	vfs.writeFile(p, JSON.stringify({ at: new Date().toISOString(), from }));
}

// ── Path completion ───────────────────────────────────────────────────────────

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
