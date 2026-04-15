import type {
	VfsSnapshot,
	VfsSnapshotDirectoryNode,
	VfsSnapshotNode,
} from "../types/vfs";
import type { InternalDirectoryNode, InternalNode } from "./internalTypes";

function serializeNode(node: InternalNode): VfsSnapshotNode {
	if (node.type === "file") {
		return {
			type: "file",
			name: node.name,
			mode: node.mode,
			createdAt: node.createdAt.toISOString(),
			updatedAt: node.updatedAt.toISOString(),
			compressed: node.compressed,
			contentBase64: node.content.toString("base64"),
		};
	}

	return serializeDirectory(node);
}

function serializeDirectory(
	node: InternalDirectoryNode,
): VfsSnapshotDirectoryNode {
	return {
		type: "directory",
		name: node.name,
		mode: node.mode,
		createdAt: node.createdAt.toISOString(),
		updatedAt: node.updatedAt.toISOString(),
		children: Array.from(node.children.values()).map((child) =>
			serializeNode(child),
		),
	};
}

function deserializeNode(node: VfsSnapshotNode): InternalNode {
	if (node.type === "file") {
		return {
			type: "file",
			name: node.name,
			mode: node.mode,
			createdAt: new Date(node.createdAt),
			updatedAt: new Date(node.updatedAt),
			content: Buffer.from(node.contentBase64, "base64"),
			compressed: node.compressed,
		};
	}

	return deserializeDirectory(node);
}

function deserializeDirectory(
	node: VfsSnapshotDirectoryNode,
): InternalDirectoryNode {
	return {
		type: "directory",
		name: node.name,
		mode: node.mode,
		createdAt: new Date(node.createdAt),
		updatedAt: new Date(node.updatedAt),
		children: new Map<string, InternalNode>(
			node.children.map((child) => [child.name, deserializeNode(child)]),
		),
	};
}

export function createSnapshot(root: InternalDirectoryNode): VfsSnapshot {
	return { root: serializeDirectory(root) };
}

export function applySnapshot(
	rootTarget: InternalDirectoryNode,
	snapshot: VfsSnapshot,
): void {
	const root = deserializeDirectory(snapshot.root);
	rootTarget.name = root.name;
	rootTarget.mode = root.mode;
	rootTarget.createdAt = root.createdAt;
	rootTarget.updatedAt = root.updatedAt;
	rootTarget.children = root.children;
}
