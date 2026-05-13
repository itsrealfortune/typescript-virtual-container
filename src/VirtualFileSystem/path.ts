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

export function splitPath(normalizedPath: string): string[] {
	return normalizedPath.split("/").filter(Boolean);
}

export function getNode(
	root: InternalDirectoryNode,
	targetPath: string,
): InternalNode {
	const normalized = normalizePath(targetPath);
	if (normalized === "/") {
		return root;
	}

	const parts = splitPath(normalized);
	let current: InternalNode = root;

	for (const part of parts) {
		if (current.type !== "directory") {
			throw new Error(`Path '${normalized}' does not exist.`);
		}

		// @ts-expect-error - We just checked that current is a directory
		const next = current.children[part];
		if (!next) {
			throw new Error(`Path '${normalized}' does not exist.`);
		}
		current = next;
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
