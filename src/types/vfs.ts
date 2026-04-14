/** Supported virtual node kinds. */
export type VfsNodeType = "file" | "directory";

/** Shared metadata fields available on file and directory stats. */
export interface VfsBaseNode {
	/** Node name without parent path. */
	name: string;
	/** Absolute normalized node path. */
	path: string;
	/** POSIX-like mode bits. */
	mode: number;
	/** Node creation timestamp. */
	createdAt: Date;
	/** Last update timestamp. */
	updatedAt: Date;
}

/** Stat shape returned for file nodes. */
export interface VfsFileNode extends VfsBaseNode {
	type: "file";
	/** True when file content stored as gzip bytes. */
	compressed: boolean;
	/** Stored byte length (compressed when compressed=true). */
	size: number;
}

/** Stat shape returned for directory nodes. */
export interface VfsDirectoryNode extends VfsBaseNode {
	type: "directory";
	/** Number of direct children in directory. */
	childrenCount: number;
}

/** Union of file and directory stat responses. */
export type VfsNodeStats = VfsFileNode | VfsDirectoryNode;

/** Optional behavior flags for writeFile operations. */
export interface WriteFileOptions {
	/** POSIX-like mode to apply on create or overwrite. */
	mode?: number;
	/** Store content compressed with gzip. */
	compress?: boolean;
}

/** Optional behavior flags for remove operations. */
export interface RemoveOptions {
	/** Allow deleting non-empty directory trees. */
	recursive?: boolean;
}

/** Base snapshot node schema used for archive serialization. */
export interface VfsSnapshotBaseNode {
	name: string;
	mode: number;
	/** ISO-8601 creation timestamp. */
	createdAt: string;
	/** ISO-8601 update timestamp. */
	updatedAt: string;
}

/** Serialized snapshot shape for file nodes. */
export interface VfsSnapshotFileNode extends VfsSnapshotBaseNode {
	type: "file";
	compressed: boolean;
	/** Base64-encoded raw file bytes. */
	contentBase64: string;
}

/** Serialized snapshot shape for directory nodes. */
export interface VfsSnapshotDirectoryNode extends VfsSnapshotBaseNode {
	type: "directory";
	children: VfsSnapshotNode[];
}

/** Union of serialized snapshot node variants. */
export type VfsSnapshotNode = VfsSnapshotFileNode | VfsSnapshotDirectoryNode;

/** Top-level serialized filesystem snapshot. */
export interface VfsSnapshot {
	root: VfsSnapshotDirectoryNode;
}
