import * as path from "node:path";
import type { InternalDirectoryNode, InternalNode } from "./internalTypes";

export function normalizePath(rawPath: string): string {
	if (!rawPath || rawPath.trim() === "") {
		return "/";
	}

	const normalized = path.posix.normalize(
		rawPath.startsWith("/") ? rawPath : `/${rawPath}`,
	);
	return normalized === "" ? "/" : normalized;
}

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
