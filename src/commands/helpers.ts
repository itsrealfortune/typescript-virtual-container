/**
 * helpers.ts — command utility functions.
 *
 * Provides path resolution, permission checking, protected-path enforcement,
 * and package manager accessors used by shell commands.
 */
import * as path from "node:path";
import type VirtualFileSystem from "../modules/VirtualFileSystem";
import type { VirtualPackageManager } from "../modules/VirtualPackageManager";
import type { VirtualShell } from "../modules/VirtualShell";

const PROTECTED_PREFIXES = ["/.virtual-env-js/.auth", "/etc/htpasswd"] as const;

/**
 * Resolves a path string against the virtual file system.
 * Supports `~` as shorthand for the home directory. If `inputPath` is
 * absolute it is returned as-is; otherwise it is joined to `cwd`.
 *
 * @param cwd       - The current working directory
 * @param inputPath - The path string to resolve
 * @param homeDir   - The home directory to use for `~` expansion (defaults to `/root`)
 * @returns The normalized absolute path
 */
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

/**
 * Throw an error if a non-root user attempts to access a protected path.
 * Protected paths include auth directories and password files.
 * @param authUser - Authenticated username.
 * @param targetPath - Path being accessed.
 * @param operation - Description of the operation (e.g. "read", "write").
 */
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

/**
 * Strips the filename from a URL path, extracting the last path segment.
 * Removes query strings and fragments first. Returns `"index.html"` when
 * no segment is found.
 *
 * @param url - The URL or path string to process
 * @returns The extracted filename, or "index.html" as a fallback
 */
export function stripUrlFilename(url: string): string {
	const cleaned = url.split("?")[0]?.split("#")[0] ?? url;
	const lastPart = cleaned.split("/").filter(Boolean).pop();
	return lastPart && lastPart.length > 0 ? lastPart : "index.html";
}

function levenshtein(a: string, b: string): number {
	const alen = a.length;
	const blen = b.length;
	const dp: number[][] = Array.from({ length: alen + 1 }, () =>
		Array<number>(blen + 1).fill(0),
	);

	for (let i = 0; i <= alen; i++) {
		const row = dp[i] as number[];
		row[0] = i;
	}
	for (let j = 0; j <= blen; j++) {
		const row0 = dp[0] as number[];
		row0[j] = j;
	}

	for (let i = 1; i <= alen; i++) {
		const row = dp[i] as number[];
		const prevRow = dp[i - 1] as number[];
		for (let j = 1; j <= blen; j++) {
			const cost = a[i - 1] === b[j - 1] ? 0 : 1;
			row[j] = Math.min(
				(prevRow[j] as number) + 1,
				(row[j - 1] as number) + 1,
				(prevRow[j - 1] as number) + cost,
			);
		}
	}

	const lastRow = dp[alen] as number[];
	return lastRow[blen] as number;
}

/**
 * Resolves a path with readable error messages by attempting an exact match
 * first, then falling back to case-insensitive matching, and finally to a
 * Levenshtein-distance (≤1) fuzzy match against sibling entries.
 *
 * @param vfs       - The virtual file system instance
 * @param cwd       - The current working directory
 * @param inputPath - The path string to resolve
 * @returns The best matching path (exact, case-insensitive, or fuzzy)
 */
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
		return path.posix.join(parent, caseInsensitive[0] as string);
	}

	const near = siblings.filter(
		(name) => levenshtein(name.toLowerCase(), fileName.toLowerCase()) <= 1,
	);
	if (near.length === 1) {
		return path.posix.join(parent, near[0] as string);
	}

	return exactPath;
}

/**
 * Returns the active package manager associated with the given shell.
 *
 * @param shell - The VirtualShell instance
 * @returns The VirtualPackageManager, or undefined if none is configured
 */
export function getPackageManager(
	shell: VirtualShell,
): VirtualPackageManager | undefined {
	return shell.packageManager;
}

/**
 * POSIX-style permission check: does `authUser` have `want` access to `filePath`?
 * `want` is a bitmask: 4=R_OK, 2=W_OK, 1=X_OK, 0=F_OK (check existence).
 * Root bypasses all checks. Throws on EACCES.
 *
 * @param vfs - VirtualFileSystem for permission checking.
 * @param users - User manager for UID/GID resolution.
 * @param authUser - Authenticated username.
 * @param filePath - Path to check permissions on.
 * @param want - Permission bitmask (R_OK=4, W_OK=2, X_OK=1, F_OK=0).
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
