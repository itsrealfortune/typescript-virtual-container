/**
 * Permission enforcement helpers for VFS operations.
 *
 * POSIX permission model:
 * - Root (uid 0): full access except execute without any x bit
 * - Owner: owner rwx bits
 * - Group: group rwx bits (if gid matches)
 * - Other: other rwx bits
 *
 * Special bits:
 * - setuid (0o4000): execute with owner's uid
 * - setgid (0o2000): execute with owner's gid, or new files inherit group
 * - sticky (0o1000): only owner can delete files in directory
 */

import type { InternalDirectoryNode } from "./internalTypes";
import { getNodeNormalized, normalizePath } from "./path";

/** Permission check flags */
export const R_OK = 4;
export const W_OK = 2;
export const X_OK = 1;

/**
 * Check if `uid`/`gid` can access `targetPath` with the given permission bits.
 * Throws EACCES on failure.
 * @param root - Root directory node of the VFS tree.
 * @param targetPath - Absolute VFS path to check.
 * @param uid - User ID requesting access.
 * @param gid - Group ID of the requesting user.
 * @param want - Permission bitmask (R_OK=4, W_OK=2, X_OK=1).
 */
export function enforceAccess(
	root: InternalDirectoryNode,
	targetPath: string,
	uid: number,
	gid: number,
	want: number,
): void {
	const normalized = normalizePath(targetPath);
	const node = getNodeNormalized(root, normalized);

	// Root bypass (except execute)
	if (uid === 0) {
		if (want & X_OK && (node.mode & 0o111) === 0) {
				throw new Error(`EACCES: permission denied: '${normalized}'`);
			}
		return;
	}

	let perm = 0;
	if (uid === node.uid) {
		perm = (node.mode >> 6) & 7;
	} else if (gid === node.gid) {
		perm = (node.mode >> 3) & 7;
	} else {
		perm = node.mode & 7;
	}

	if ((perm & want) !== want) {
		throw new Error(`EACCES: permission denied: '${normalized}'`);
	}
}

/**
 * Check X_OK on every parent directory component of `targetPath`.
 * Required for path traversal. Throws EACCES on failure.
 * @param root - Root directory node of the VFS tree.
 * @param targetPath - Absolute VFS path to traverse.
 * @param uid - User ID requesting access.
 * @param gid - Group ID of the requesting user.
 */
export function enforcePathTraversal(
	root: InternalDirectoryNode,
	targetPath: string,
	uid: number,
	gid: number,
): void {
	const normalized = normalizePath(targetPath);
	if (normalized === "/") { return; }

	const parts = normalized.split("/").filter(Boolean);
	let currentPath = "";

	for (let i = 0; i < parts.length - 1; i++) {
		currentPath += `/${parts[i]}`;
		try {
			enforceAccess(root, currentPath, uid, gid, X_OK);
		} catch (err: unknown) {
			// If parent doesn't exist yet, it will be created — skip the check.
			// Otherwise re-throw as EACCES.
			if (err instanceof Error && err.message.includes("does not exist")) {
				return;
			}
			throw new Error(`EACCES: permission denied: '${currentPath}'`);
		}
	}
}

/**
 * Check if `uid`/`gid` can delete `name` inside `dirPath`.
 * Sticky bit: only root, directory owner, or file owner can delete.
 * @param root - Root directory node of the VFS tree.
 * @param dirPath - Absolute VFS path of the parent directory.
 * @param name - Name of the file/directory to delete.
 * @param uid - User ID requesting deletion.
 * @param gid - Group ID of the requesting user.
 */
export function enforceDelete(
	root: InternalDirectoryNode,
	dirPath: string,
	name: string,
	uid: number,
	gid: number,
): void {
	const normalized = normalizePath(dirPath);
	const dir = getNodeNormalized(root, normalized) as InternalDirectoryNode;

	// Check write + execute on parent directory
	enforceAccess(root, normalized, uid, gid, W_OK | X_OK);

	// Sticky bit check
	if (dir.mode & 0o1000 && uid !== 0 && uid !== dir.uid) {
			// Not root or directory owner — check if user owns the target file
			const target = dir.children[name];
			if (target && target.uid !== uid) {
				throw new Error(`EACCES: permission denied: cannot delete '${name}' (sticky bit)`);
			}
		}
}

/**
 * Check if `uid` can change ownership of `targetPath`.
 * Only root can chown.
 * @param uid - User ID attempting the chown operation.
 */
export function enforceChown(
	uid: number,
): void {
	if (uid !== 0) {
		throw new Error("EPERM: operation not permitted: chown");
	}
}

/**
 * Check if `uid` can change mode of `targetPath`.
 * Must be owner or root.
 * @param root - Root directory node of the VFS tree.
 * @param targetPath - Absolute VFS path of the node.
 * @param uid - User ID attempting the chmod operation.
 */
export function enforceChmod(
	root: InternalDirectoryNode,
	targetPath: string,
	uid: number,
): void {
	const normalized = normalizePath(targetPath);
	const node = getNodeNormalized(root, normalized);
	if (uid !== 0 && uid !== node.uid) {
		throw new Error(`EPERM: operation not permitted: chmod '${normalized}'`);
	}
}

/**
 * Resolve the effective uid for executing a file, respecting setuid.
 * @param root - Root directory node of the VFS tree.
 * @param targetPath - Absolute VFS path of the executable.
 * @param originalUid - Original user ID before setuid resolution.
 * @returns Effective UID (file owner's uid if setuid, otherwise originalUid).
 */
export function resolveEffectiveUid(
	root: InternalDirectoryNode,
	targetPath: string,
	originalUid: number,
): number {
	const normalized = normalizePath(targetPath);
	const node = getNodeNormalized(root, normalized);
	if (node.type !== "file") { return originalUid; }
	if (node.mode & 0o4000) { return node.uid; // setuid
}
	return originalUid;
}

/**
 * Resolve the effective gid for executing a file, respecting setgid.
 * @param root - Root directory node of the VFS tree.
 * @param targetPath - Absolute VFS path of the executable.
 * @param originalGid - Original group ID before setgid resolution.
 * @returns Effective GID (file owner's gid if setgid, otherwise originalGid).
 */
export function resolveEffectiveGid(
	root: InternalDirectoryNode,
	targetPath: string,
	originalGid: number,
): number {
	const normalized = normalizePath(targetPath);
	const node = getNodeNormalized(root, normalized);
	if (node.type !== "file") { return originalGid; }
	if (node.mode & 0o2000) { return node.gid; // setgid
}
	return originalGid;
}

/**
 * Check if a file is executable by `uid`/`gid`.
 * @param root - Root directory node of the VFS tree.
 * @param targetPath - Absolute VFS path of the file.
 * @param uid - User ID attempting execution.
 * @param gid - Group ID of the user.
 * @returns True if the file has execute permission for the user.
 */
export function isExecutable(
	root: InternalDirectoryNode,
	targetPath: string,
	uid: number,
	gid: number,
): boolean {
	const normalized = normalizePath(targetPath);
	try {
		const node = getNodeNormalized(root, normalized);
		if (node.type !== "file") { return false; }

		if (uid === 0) { return (node.mode & 0o111) !== 0; }

		let perm = 0;
		if (uid === node.uid) { perm = (node.mode >> 6) & 7; }
		else if (gid === node.gid) { perm = (node.mode >> 3) & 7; }
		else { perm = node.mode & 7; }

		return (perm & 1) === 1;
	} catch {
		return false;
	}
}
