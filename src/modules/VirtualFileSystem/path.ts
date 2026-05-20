import * as path from "node:path";
import type { InternalDirectoryNode, InternalNode } from "./internalTypes";

/**
 * Normalizes a VFS path by resolving `.` and `..` segments and removing trailing slash.
 * Empty or blank input returns `"/"`.
 * @param rawPath - The path to normalize (may be relative — leading `/` is added if missing).
 * @returns The normalized absolute POSIX path.
 */
export function normalizePath(rawPath: string): string {
	if (!rawPath || rawPath.trim() === "") {
		return "/";
	}

	const normalized = path.posix.normalize(
		rawPath.startsWith("/") ? rawPath : `/${rawPath}`,
	);
	return normalized === "" ? "/" : normalized;
}

/**
 * Retrieves a node from the VFS tree by path string. Normalizes the path first.
 * @param root - The root directory node of the virtual filesystem.
 * @param targetPath - The path to look up (e.g. `"/usr/bin"`).
 * @returns The internal node at the given path.
 * @throws If any path component does not exist or an intermediate entry is not a directory.
 */
export function getNode(
	root: InternalDirectoryNode,
	targetPath: string,
): InternalNode {
	const normalized = normalizePath(targetPath);
	return getNodeNormalized(root, normalized);
}

/**
 * Like getNode but skips normalization — caller must pass an already-normalized path.
 * Avoids double normalizePath() when the caller has already normalized.
 */
export function getNodeNormalized(
	root: InternalDirectoryNode,
	normalized: string,
): InternalNode {
	if (normalized === "/") return root;

	let current: InternalNode = root;
	let i = 1; // skip leading "/"
	while (i <= normalized.length) {
		const slash = normalized.indexOf("/", i);
		const end = slash === -1 ? normalized.length : slash;
		const part = normalized.slice(i, end);
		if (part) {
			if (current.type !== "directory") {
				throw new Error(`Path '${normalized}' does not exist.`);
			}
			const next: InternalNode | undefined = (current as InternalDirectoryNode).children[part];
			if (!next) throw new Error(`Path '${normalized}' does not exist.`);
			current = next;
		}
		if (slash === -1) break;
		i = slash + 1;
	}
	return current;
}

/**
 * Resolves a path to its parent directory node and the final path component name.
 * Optionally creates intermediate directories when `createIfMissing` is set.
 * @param root - The root directory node of the virtual filesystem.
 * @param targetPath - The path whose parent to resolve.
 * @param createIfMissing - If true, missing parent directories are created via `createPath`.
 * @param createPath - Callback invoked with each missing directory path to create it.
 * @returns An object with the parent directory node and the final component name.
 * @throws If the path is root or the resolved parent is not a directory.
 */
export function getParentDirectory(
	root: InternalDirectoryNode,
	targetPath: string,
	createIfMissing: boolean,
	createPath: (pathToCreate: string) => void,
): { parent: InternalDirectoryNode; name: string } {
	const normalized = normalizePath(targetPath);
	if (normalized === "/") {
		throw new Error("Root path has no parent directory.");
	}

	const parentPath = path.posix.dirname(normalized);
	const name = path.posix.basename(normalized);

	if (!name) {
		throw new Error(`Invalid path '${targetPath}'.`);
	}

	if (createIfMissing) {
		createPath(parentPath);
	}

	const parentNode = getNode(root, parentPath);
	if (parentNode.type !== "directory") {
		throw new Error(`Parent path '${parentPath}' is not a directory.`);
	}

	return { parent: parentNode, name };
}
