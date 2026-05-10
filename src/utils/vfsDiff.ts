/**
 * vfsDiff.ts
 *
 * Snapshot diff tooling for `VirtualFileSystem`.
 *
 * Compares two VFS snapshots and returns structured diff results suitable
 * for test assertions, audit logging, and deployment verification.
 *
 * @example
 * ```ts
 * import { diffSnapshots, formatDiff } from "typescript-virtual-container/utils/vfsDiff";
 *
 * const before = shell.vfs.toSnapshot();
 * await client.exec("npm install && mkdir -p /app");
 * const after = shell.vfs.toSnapshot();
 *
 * const diff = diffSnapshots(before, after);
 * console.log(formatDiff(diff));
 *
 * // Test assertions
 * expect(diff.added).toContain("/app");
 * expect(diff.modified).toContain("/etc/hosts");
 * expect(diff.removed).not.toContain("/tmp/needed-file");
 * ```
 */

import type { VfsSnapshot, VfsSnapshotNode, VfsSnapshotFileNode, VfsSnapshotDirectoryNode } from "../types/vfs";

// ─── types ────────────────────────────────────────────────────────────────────

/** A single changed file entry in a diff result. */
export interface VfsDiffEntry {
	/** Absolute VFS path of the changed node. */
	path: string;
	/** Node type — `"file"` or `"directory"`. */
	type: "file" | "directory";
}

/** A modified file entry — includes before/after content for files. */
export interface VfsDiffModified extends VfsDiffEntry {
	type: "file";
	/** Content before the change (decoded from base64). */
	before: string;
	/** Content after the change (decoded from base64). */
	after: string;
}

/** Full result of a snapshot diff operation. */
export interface VfsDiff {
	/** Paths present in `after` but not in `before`. */
	added: VfsDiffEntry[];
	/** Paths present in `before` but not in `after`. */
	removed: VfsDiffEntry[];
	/** Files whose content or mode changed between snapshots. */
	modified: VfsDiffModified[];
	/** True when there are no differences. */
	clean: boolean;
}

// ─── internal helpers ─────────────────────────────────────────────────────────

function flattenSnapshot(
	node: VfsSnapshotNode,
	prefix: string,
	out: Map<string, VfsSnapshotNode>,
): void {
	const path = prefix === "" ? "/" : prefix;
	out.set(path, node);
	if (node.type === "directory") {
		for (const child of (node as VfsSnapshotDirectoryNode).children ?? []) {
			flattenSnapshot(child, `${prefix}/${child.name}`, out);
		}
	}
}

function decodeContent(node: VfsSnapshotFileNode): string {
	try {
		return Buffer.from(node.contentBase64, "base64").toString("utf8");
	} catch {
		return node.contentBase64;
	}
}

// ─── public API ───────────────────────────────────────────────────────────────

/**
 * Compute the diff between two VFS snapshots.
 *
 * @param before  Snapshot taken before the operation.
 * @param after   Snapshot taken after the operation.
 * @param options Optional filtering options.
 * @returns A structured `VfsDiff` result.
 */
export function diffSnapshots(
	before: VfsSnapshot,
	after: VfsSnapshot,
	options: {
		/** Glob-style path prefixes to ignore (e.g. `["/proc", "/var/log"]`). */
		ignore?: string[];
	} = {},
): VfsDiff {
	const ignorePrefixes = options.ignore ?? [];

	const shouldIgnore = (path: string): boolean =>
		ignorePrefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));

	const beforeMap = new Map<string, VfsSnapshotNode>();
	const afterMap  = new Map<string, VfsSnapshotNode>();

	flattenSnapshot(before.root, "", beforeMap);
	flattenSnapshot(after.root,  "", afterMap);

	const added:    VfsDiffEntry[]    = [];
	const removed:  VfsDiffEntry[]    = [];
	const modified: VfsDiffModified[] = [];

	// Added — in after, not in before
	for (const [path, node] of afterMap) {
		if (shouldIgnore(path)) continue;
		if (!beforeMap.has(path)) {
			added.push({ path, type: node.type });
		}
	}

	// Removed — in before, not in after
	for (const [path, node] of beforeMap) {
		if (shouldIgnore(path)) continue;
		if (!afterMap.has(path)) {
			removed.push({ path, type: node.type });
		}
	}

	// Modified — in both, but content or mode changed
	for (const [path, afterNode] of afterMap) {
		if (shouldIgnore(path)) continue;
		const beforeNode = beforeMap.get(path);
		if (!beforeNode) continue; // already in added
		if (afterNode.type !== beforeNode.type) continue; // type change = add+remove

		if (afterNode.type === "file" && beforeNode.type === "file") {
			const beforeContent = decodeContent(beforeNode as VfsSnapshotFileNode);
			const afterContent  = decodeContent(afterNode  as VfsSnapshotFileNode);
			const modeChanged   = afterNode.mode !== beforeNode.mode;
			if (beforeContent !== afterContent || modeChanged) {
				modified.push({
					path,
					type: "file",
					before: beforeContent,
					after: afterContent,
				});
			}
		}
	}

	// Sort all arrays for determinism
	const sortByPath = (a: VfsDiffEntry, b: VfsDiffEntry) =>
		a.path.localeCompare(b.path);

	added.sort(sortByPath);
	removed.sort(sortByPath);
	modified.sort(sortByPath);

	return {
		added,
		removed,
		modified,
		clean: added.length === 0 && removed.length === 0 && modified.length === 0,
	};
}

/**
 * Format a `VfsDiff` as a human-readable string similar to `git diff --stat`.
 *
 * @param diff    Result from `diffSnapshots`.
 * @param options Formatting options.
 */
export function formatDiff(
	diff: VfsDiff,
	options: {
		/** Show file content changes inline. Default: false. */
		showContent?: boolean;
		/** Max chars of content to show per change. Default: 120. */
		maxContentChars?: number;
	} = {},
): string {
	if (diff.clean) return "(no changes)";

	const { showContent = false, maxContentChars = 120 } = options;
	const lines: string[] = [];

	for (const entry of diff.added) {
		lines.push(`+ ${entry.path}  [${entry.type}]`);
	}

	for (const entry of diff.removed) {
		lines.push(`- ${entry.path}  [${entry.type}]`);
	}

	for (const entry of diff.modified) {
		lines.push(`~ ${entry.path}  [modified]`);
		if (showContent) {
			const before = entry.before.slice(0, maxContentChars);
			const after  = entry.after.slice(0, maxContentChars);
			lines.push(`  before: ${JSON.stringify(before)}${entry.before.length > maxContentChars ? "…" : ""}`);
			lines.push(`  after:  ${JSON.stringify(after)}${entry.after.length > maxContentChars ? "…" : ""}`);
		}
	}

	const summary = [
		diff.added.length    > 0 ? `${diff.added.length} added`    : "",
		diff.removed.length  > 0 ? `${diff.removed.length} removed`  : "",
		diff.modified.length > 0 ? `${diff.modified.length} modified` : "",
	].filter(Boolean).join(", ");

	lines.push(`\n${summary}`);
	return lines.join("\n");
}

/**
 * Assert that a diff contains specific paths, throwing on mismatch.
 * Designed for use in test suites.
 *
 * @param diff    Result from `diffSnapshots`.
 * @param expect  Expected paths in each category.
 * @throws When any expectation is not met.
 */
export function assertDiff(
	diff: VfsDiff,
	expect: {
		added?:    string[];
		removed?:  string[];
		modified?: string[];
	},
): void {
	const addedPaths    = diff.added.map((e)    => e.path);
	const removedPaths  = diff.removed.map((e)  => e.path);
	const modifiedPaths = diff.modified.map((e) => e.path);

	for (const path of expect.added ?? []) {
		if (!addedPaths.includes(path)) {
			throw new Error(`assertDiff: expected "${path}" to be added, but it was not.\nAdded: ${JSON.stringify(addedPaths)}`);
		}
	}

	for (const path of expect.removed ?? []) {
		if (!removedPaths.includes(path)) {
			throw new Error(`assertDiff: expected "${path}" to be removed, but it was not.\nRemoved: ${JSON.stringify(removedPaths)}`);
		}
	}

	for (const path of expect.modified ?? []) {
		if (!modifiedPaths.includes(path)) {
			throw new Error(`assertDiff: expected "${path}" to be modified, but it was not.\nModified: ${JSON.stringify(modifiedPaths)}`);
		}
	}
}
