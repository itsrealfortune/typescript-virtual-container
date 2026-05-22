/** Supported virtual node kinds. */
export type VfsNodeType = "file" | "directory" | "device";

/** Shared metadata fields available on file and directory stats. */
export interface VfsBaseNode {
	/** Node name without parent path. */
	name: string;
	/** Absolute normalized node path. */
	path: string;
	/** POSIX-like mode bits. */
	mode: number;
	/** Owner user ID (0 = root). */
	uid: number;
	/** Owner group ID (0 = root). */
	gid: number;
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

/** Stat shape returned for device nodes. */
export interface VfsDeviceNode extends VfsBaseNode {
	type: "device";
	/** Device kind identifier. */
	deviceKind: string;
	/** Major device number. */
	major: number;
	/** Minor device number. */
	minor: number;
}

/** Union of file, directory, and device stat responses. */
export type VfsNodeStats = VfsFileNode | VfsDirectoryNode | VfsDeviceNode;

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
	/** Owner user ID (0 = root). */
	uid: number;
	/** Owner group ID (0 = root). */
	gid: number;
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

/** Serialized snapshot shape for device nodes. */
export interface VfsSnapshotDeviceNode extends VfsSnapshotBaseNode {
	type: "device";
	/** Device kind identifier. */
	deviceKind: string;
	/** Major device number. */
	major: number;
	/** Minor device number. */
	minor: number;
}

/** Serialized snapshot shape for directory nodes. */
export interface VfsSnapshotDirectoryNode extends VfsSnapshotBaseNode {
	type: "directory";
	children: VfsSnapshotNode[];
}

/** Union of serialized snapshot node variants. */
export type VfsSnapshotNode = VfsSnapshotFileNode | VfsSnapshotDeviceNode | VfsSnapshotDirectoryNode;

/** Top-level serialized filesystem snapshot. */
export interface VfsSnapshot {
	root: VfsSnapshotDirectoryNode;
}

/** Options for mounting a host directory into the VFS. */
export interface MountOptions {
	/** Absolute path inside the VM (e.g. `"/app"`). */
	vPath: string;
	/** Path on the host filesystem. Relative paths resolved from `process.cwd()`. */
	hostPath: string;
	/** When `true` (default), write operations inside the mount throw `EROFS`. */
	readOnly?: boolean;
}

/** Describes an active mount point. */
export interface MountPoint {
	vPath:    string;
	hostPath: string;
	readOnly: boolean;
}

/** Cache eviction policy for the file cache. */
export type VfsCacheEvictionPolicy = "lru" | "lfu" | "fifo";

/** Disk I/O simulation parameters for the file cache. */
export interface VfsDiskIoParams {
	/** Simulated read latency in milliseconds. */
	readLatencyMs: number;
	/** Simulated write latency in milliseconds. */
	writeLatencyMs: number;
	/** Simulated sequential read throughput in bytes/ms. */
	sequentialReadThroughput: number;
	/** Simulated sequential write throughput in bytes/ms. */
	sequentialWriteThroughput: number;
}

/** Configuration options for the VFS file cache. */
export interface VfsCacheOptions {
	/** Enable file caching. Default: false. */
	enabled?: boolean;
	/** Maximum number of entries in cache. Default: 1000. */
	maxEntries?: number;
	/** Maximum total memory usage in bytes. Default: 64 MB. */
	maxMemoryBytes?: number;
	/** Eviction policy to use. Default: "lru". */
	policy?: VfsCacheEvictionPolicy;
	/** Disk I/O simulation parameters. */
	diskIo?: Partial<VfsDiskIoParams>;
	/** Enable/disable disk I/O simulation. Default: true. */
	simulateDiskIo?: boolean;
}

/** Cache statistics from the VFS file cache. */
export interface VfsCacheStats {
	/** Total number of cache hits. */
	hits: number;
	/** Total number of cache misses. */
	misses: number;
	/** Total number of cache evictions. */
	evictions: number;
	/** Current number of entries in cache. */
	entries: number;
	/** Current total memory usage of cache in bytes. */
	memoryUsage: number;
	/** Hit rate as a percentage (0-100). */
	hitRate: number;
}
