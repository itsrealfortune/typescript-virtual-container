/** @internal */
export type InternalNode = InternalFileNode | InternalStubNode | InternalDirectoryNode;

interface InternalBaseNode {
	name: string;
	mode: number;
	/** Unix timestamp in ms — avoids Date object overhead (~80 bytes each). */
	createdAt: number;
	/** Unix timestamp in ms. */
	updatedAt: number;
}

/** @internal */
export interface InternalFileNode extends InternalBaseNode {
	type: "file";
	content: Buffer;
	compressed: boolean;
	/** When true, content has been purged from RAM. Reloaded from snapshot on demand. */
	evicted?: true;
	/** Byte length of the original (uncompressed) content — preserved when evicted. */
	size?: number;
}

/**
 * Lazy stub — stores static rootfs file content as a plain string.
 * No Buffer allocation until the file is actually read or written.
 * On first write, promoted to a real InternalFileNode.
 * @internal
 */
export interface InternalStubNode extends InternalBaseNode {
	type: "stub";
	/** Raw UTF-8 content — never compressed, never evicted. */
	stubContent: string;
}

/** @internal */
export interface InternalDirectoryNode extends InternalBaseNode {
	type: "directory";
	/** Null-prototype object — avoids Map overhead (~40% less RAM per entry). */
	children: Record<string, InternalNode>;
	/** Cached child count — avoids O(n) Object.keys() on hot paths. */
	_childCount: number;
}
