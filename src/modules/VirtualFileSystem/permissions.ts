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
 * @param root - The root parameter.
 * @param targetPath - The target file path.
 * @param uid - The uid parameter.
 * @param gid - The gid parameter.
 * @param want - The want parameter.
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
		if (want & X_OK) {
			if ((node.mode & 0o111) === 0) {
				throw new Error(`EACCES: permission denied: '${normalized}'`);
			}
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
 * @param root - The root parameter.
 * @param targetPath - The target file path.
 * @param uid - The uid parameter.
 * @param gid - The gid parameter.
 */
export function enforcePathTraversal(
	root: InternalDirectoryNode,
	targetPath: string,
	uid: number,
	gid: number,
): void {
	const normalized = normalizePath(targetPath);
	if (normalized === "/") return;

	const parts = normalized.split("/").filter(Boolean);
	let currentPath = "";

	for (let i = 0; i < parts.length - 1; i++) {
		currentPath += `/${parts[i]}`;
		try {
			enforceAccess(root, currentPath, uid, gid, X_OK);
		} catch {
			throw new Error(`EACCES: permission denied: '${currentPath}'`);
		}
	}
}

/**
 * Check if `uid`/`gid` can delete `name` inside `dirPath`.
 * Sticky bit: only root, directory owner, or file owner can delete.
 * @param root - The root parameter.
 * @param dirPath - The directory path.
 * @param name - The name parameter.
 * @param uid - The uid parameter.
 * @param gid - The gid parameter.
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
	if (dir.mode & 0o1000) {
		if (uid !== 0 && uid !== dir.uid) {
			// Not root or directory owner — check if user owns the target file
			const target = dir.children[name];
			if (target && target.uid !== uid) {
				throw new Error(`EACCES: permission denied: cannot delete '${name}' (sticky bit)`);
			}
		}
	}
}

/**
 * Check if `uid` can change ownership of `targetPath`.
 * Only root can chown.
 * @param uid - The uid parameter.
 */
export function enforceChown(
	_targetPath: string,
	uid: number,
): void {
	if (uid !== 0) {
		throw new Error(`EPERM: operation not permitted: chown`);
	}
}

/**
 * Check if `uid` can change mode of `targetPath`.
 * Must be owner or root.
 * @param root - The root parameter.
 * @param targetPath - The target file path.
 * @param uid - The uid parameter.
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
 * @param root - The root parameter.
 * @param targetPath - The target file path.
 * @param originalUid - The original user ID.
 * @returns The numeric result.
 */
export function resolveEffectiveUid(
	root: InternalDirectoryNode,
	targetPath: string,
	originalUid: number,
): number {
	const normalized = normalizePath(targetPath);
	const node = getNodeNormalized(root, normalized);
	if (node.type !== "file") return originalUid;
	if (node.mode & 0o4000) return node.uid; // setuid
	return originalUid;
}

/**
 * Resolve the effective gid for executing a file, respecting setgid.
 * @param root - The root parameter.
 * @param targetPath - The target file path.
 * @param originalGid - The original group ID.
 * @returns The numeric result.
 */
export function resolveEffectiveGid(
	root: InternalDirectoryNode,
	targetPath: string,
	originalGid: number,
): number {
	const normalized = normalizePath(targetPath);
	const node = getNodeNormalized(root, normalized);
	if (node.type !== "file") return originalGid;
	if (node.mode & 0o2000) return node.gid; // setgid
	return originalGid;
}

/**
 * Check if a file is executable by `uid`/`gid`.
 * @param root - The root parameter.
 * @param targetPath - The target file path.
 * @param uid - The uid parameter.
 * @param gid - The gid parameter.
 * @returns The success indicator.
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
		if (node.type !== "file") return false;

		if (uid === 0) return (node.mode & 0o111) !== 0;

		let perm = 0;
		if (uid === node.uid) perm = (node.mode >> 6) & 7;
		else if (gid === node.gid) perm = (node.mode >> 3) & 7;
		else perm = node.mode & 7;

		return (perm & 1) === 1;
	} catch {
		return false;
	}
}
