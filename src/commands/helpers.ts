import * as path from "node:path";
import type VirtualFileSystem from "../VirtualFileSystem";
import type { VirtualPackageManager } from "../VirtualPackageManager";
import type { VirtualShell } from "../VirtualShell";

const PROTECTED_PREFIXES = ["/.virtual-env-js/.auth", "/etc/htpasswd"] as const;

export function resolvePath(cwd: string, inputPath: string, homeDir?: string): string {
	if (!inputPath || inputPath.trim() === "") {
		return cwd;
	}
	if (inputPath.startsWith("~")) {
		const home = homeDir ?? "/root";
		return path.posix.normalize(`${home}${inputPath.slice(1)}`);
	}
	return inputPath.startsWith("/")
		? path.posix.normalize(inputPath)
		: path.posix.normalize(path.posix.join(cwd, inputPath));
}

function isProtectedPath(targetPath: string): boolean {
	const normalized = targetPath.startsWith("/")
		? path.posix.normalize(targetPath)
		: path.posix.normalize(`/${targetPath}`);

	return PROTECTED_PREFIXES.some(
		(prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`),
	);
}

export function assertPathAccess(
	authUser: string,
	targetPath: string,
	operation: string,
): void {
	if (authUser === "root") {
		return;
	}

	if (isProtectedPath(targetPath)) {
		throw new Error(`${operation}: permission denied: ${targetPath}`);
	}
}

export function stripUrlFilename(url: string): string {
	const cleaned = url.split("?")[0]?.split("#")[0] ?? url;
	const lastPart = cleaned.split("/").filter(Boolean).pop();
	return lastPart && lastPart.length > 0 ? lastPart : "index.html";
}

function levenshtein(a: string, b: string): number {
	const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
		Array<number>(b.length + 1).fill(0),
	);

	for (let i = 0; i <= a.length; i += 1) {
		dp[i]![0] = i;
	}
	for (let j = 0; j <= b.length; j += 1) {
		dp[0]![j] = j;
	}

	for (let i = 1; i <= a.length; i += 1) {
		for (let j = 1; j <= b.length; j += 1) {
			const cost = a[i - 1] === b[j - 1] ? 0 : 1;
			dp[i]![j] = Math.min(
				dp[i - 1]![j]! + 1,
				dp[i]![j - 1]! + 1,
				dp[i - 1]![j - 1]! + cost,
			);
		}
	}

	return dp[a.length]![b.length]!;
}

export function resolveReadablePath(
	vfs: VirtualFileSystem,
	cwd: string,
	inputPath: string,
): string {
	const exactPath = resolvePath(cwd, inputPath);
	if (vfs.exists(exactPath)) {
		return exactPath;
	}

	const parent = path.posix.dirname(exactPath);
	const fileName = path.posix.basename(exactPath);
	const siblings = vfs.list(parent);

	const caseInsensitive = siblings.filter(
		(name) => name.toLowerCase() === fileName.toLowerCase(),
	);
	if (caseInsensitive.length === 1) {
		return path.posix.join(parent, caseInsensitive[0]!);
	}

	const near = siblings.filter(
		(name) => levenshtein(name.toLowerCase(), fileName.toLowerCase()) <= 1,
	);
	if (near.length === 1) {
		return path.posix.join(parent, near[0]!);
	}

	return exactPath;
}

export function getPackageManager(
	shell: VirtualShell,
): VirtualPackageManager | undefined {
	return shell.packageManager;
}

/**
 * POSIX-style permission check: does `authUser` have `want` access to `filePath`?
 * `want` is a bitmask: 4=R_OK, 2=W_OK, 1=X_OK, 0=F_OK (check existence).
 * Root bypasses all checks. Throws on EACCES.
 */
export function checkFilePermission(
	vfs: VirtualFileSystem,
	users: { getUid: (u: string) => number; getGid: (u: string) => number },
	authUser: string,
	filePath: string,
	want: number,
): void {
	if (authUser === "root") return;
	if (want === 0) return; // F_OK — just existence
	assertPathAccess(authUser, filePath, "access");
	const uid = users.getUid(authUser);
	const gid = users.getGid(authUser);
	if (!vfs.checkAccess(filePath, uid, gid, want)) {
		const mode = vfs.stat(filePath).mode;
		const permStr =
			(mode & 0o400 ? "r" : "-") +
			(mode & 0o200 ? "w" : "-") +
			(mode & 0o100 ? "x" : "-") +
			(mode & 0o040 ? "r" : "-") +
			(mode & 0o020 ? "w" : "-") +
			(mode & 0o010 ? "x" : "-") +
			(mode & 0o004 ? "r" : "-") +
			(mode & 0o002 ? "w" : "-") +
			(mode & 0o001 ? "x" : "-");
		throw new Error(`access: permission denied (mode=${permStr})`);
	}
}
