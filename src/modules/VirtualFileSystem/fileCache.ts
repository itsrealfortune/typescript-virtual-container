/**
 * Realistic file cache with disk I/O simulation and configurable eviction policies.
 *
 * Simulates disk read/write latencies and supports multiple cache eviction
 * strategies: LRU (Least Recently Used), LFU (Least Frequently Used), FIFO.
 */

/** Eviction policy for the file cache. */
export type CacheEvictionPolicy = "lru" | "lfu" | "fifo";

/** Disk I/O simulation parameters. */
export interface DiskIoParams {
	/** Simulated read latency in milliseconds. Default: 5ms (SSD-like). */
	readLatencyMs: number;
	/** Simulated write latency in milliseconds. Default: 10ms (SSD-like). */
	writeLatencyMs: number;
	/** Simulated sequential read throughput in bytes/ms. Default: 500 (500 MB/s SSD). */
	sequentialReadThroughput: number;
	/** Simulated sequential write throughput in bytes/ms. Default: 300 (300 MB/s SSD). */
	sequentialWriteThroughput: number;
}

/** Default disk I/O params for SSD-like behavior. */
const DEFAULT_DISK_IO: DiskIoParams = {
	readLatencyMs: 5,
	writeLatencyMs: 10,
	sequentialReadThroughput: 500,
	sequentialWriteThroughput: 300,
};

/** Default disk I/O params for HDD-like behavior (slower). */
export const HDD_DISK_IO: DiskIoParams = {
	readLatencyMs: 15,
	writeLatencyMs: 20,
	sequentialReadThroughput: 150,
	sequentialWriteThroughput: 100,
};

/** Default disk I/O params for NVMe-like behavior (faster). */
export const NVME_DISK_IO: DiskIoParams = {
	readLatencyMs: 0.1,
	writeLatencyMs: 0.2,
	sequentialReadThroughput: 3500,
	sequentialWriteThroughput: 2500,
};

/** Cache entry with metadata for eviction decisions. */
interface CacheEntry {
	/** File content buffer. */
	content: Buffer;
	/** When the entry was added to cache (for FIFO). */
	insertedAt: number;
	/** When the entry was last accessed (for LRU). */
	lastAccessedAt: number;
	/** How many times the entry has been accessed (for LFU). */
	accessCount: number;
	/** Size of the content in bytes. */
	size: number;
}

/** Statistics about cache performance. */
export interface CacheStats {
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

/** Configuration options for the file cache. */
export interface FileCacheOptions {
	/** Maximum number of entries in cache. Default: 1000. */
	maxEntries?: number;
	/** Maximum total memory usage in bytes. Default: 64 MB. */
	maxMemoryBytes?: number;
	/** Eviction policy to use. Default: "lru". */
	policy?: CacheEvictionPolicy;
	/** Disk I/O simulation parameters. */
	diskIo?: Partial<DiskIoParams>;
	/** Enable/disable disk I/O simulation. Default: true. */
	simulateDiskIo?: boolean;
}

/**
 * File cache with realistic disk  * Simulates disk I/O latencies and supports multiple eviction policies.
 */
export class FileCache {
	private readonly _cache = new Map<string, CacheEntry>();
	private readonly _maxEntries: number;
	private readonly _maxMemoryBytes: number;
	private readonly _policy: CacheEvictionPolicy;
	private readonly _diskIo: DiskIoParams;
	private readonly _simulateDiskIo: boolean;
	private _hits = 0;
	private _misses = 0;
	private _evictions = 0;
	private _totalMemoryUsage = 0;

	constructor(options: FileCacheOptions = {}) {
		this._maxEntries = options.maxEntries ?? 1000;
		this._maxMemoryBytes = options.maxMemoryBytes ?? 64 * 1024 * 1024; // 64 MB
		this._policy = options.policy ?? "lru";
		this._simulateDiskIo = options.simulateDiskIo ?? true;
		const io = options.diskIo ?? {};
		this._diskIo = {
			readLatencyMs: io.readLatencyMs ?? DEFAULT_DISK_IO.readLatencyMs,
			writeLatencyMs: io.writeLatencyMs ?? DEFAULT_DISK_IO.writeLatencyMs,
			sequentialReadThroughput: io.sequentialReadThroughput ?? DEFAULT_DISK_IO.sequentialReadThroughput,
			sequentialWriteThroughput: io.sequentialWriteThroughput ?? DEFAULT_DISK_IO.sequentialWriteThroughput,
		};
	}

	/**
	 * Get file content from cache or simulate disk read.
	 * @param path - File path to read.
	 * @param diskReadFn - Function to read from disk if not in cache.
	 * @returns File content as Buffer.
	 */
	async get(path: string, diskReadFn: () => Buffer | Promise<Buffer>): Promise<Buffer> {
		const entry = this._cache.get(path);
		if (entry) {
			this._hits++;
			entry.lastAccessedAt = Date.now();
			entry.accessCount++;
			return Buffer.from(entry.content);
		}

		this._misses++;

		// Simulate disk read latency
		if (this._simulateDiskIo) {
			const content = await diskReadFn();
			const transferTime = content.length / this._diskIo.sequentialReadThroughput;
			const totalLatency = this._diskIo.readLatencyMs + transferTime;
			await this._delay(totalLatency);
			this._set(path, content);
			return content;
		}

		const content = await diskReadFn();
		this._set(path, content);
		return content;
	}

	/**
	 * Synchronous version of get (for non-async contexts).
	 * Note: Disk I/O simulation uses synchronous delay.
	 * @param path - File path to read.
	 * @param diskReadFn - Function to read from disk if not in cache.
	 * @returns File content as Buffer.
	 */
	getSync(path: string, diskReadFn: () => Buffer): Buffer {
		const entry = this._cache.get(path);
		if (entry) {
			this._hits++;
			entry.lastAccessedAt = Date.now();
			entry.accessCount++;
			return Buffer.from(entry.content);
		}

		this._misses++;

		const content = diskReadFn();

		// Simulate disk read latency (synchronous)
		if (this._simulateDiskIo) {
			const transferTime = content.length / this._diskIo.sequentialReadThroughput;
			const totalLatency = this._diskIo.readLatencyMs + transferTime;
			this._syncDelay(totalLatency);
		}

		this._set(path, content);
		return content;
	}

	/**
	 * Write file content to cache and simulate disk write.
	 * @param path - File path to write.
	 * @param content - Content to write.
	 * @param diskWriteFn - Function to write to disk.
	 */
	async set(path: string, content: Buffer, diskWriteFn?: (data: Buffer) => void | Promise<void>): Promise<void> {
		// Simulate disk write latency
		if (this._simulateDiskIo && diskWriteFn) {
			const transferTime = content.length / this._diskIo.sequentialWriteThroughput;
			const totalLatency = this._diskIo.writeLatencyMs + transferTime;
			await diskWriteFn(content);
			await this._delay(totalLatency);
		} else if (diskWriteFn) {
			await diskWriteFn(content);
		}

		this._set(path, content);
	}

	/**
	 * Synchronous version of set.
	 * @param path - File path to write.
	 * @param content - Content to write.
	 * @param diskWriteFn - Function to write to disk.
	 */
	setSync(path: string, content: Buffer, diskWriteFn?: (data: Buffer) => void): void {
		// Simulate disk write latency (synchronous)
		if (this._simulateDiskIo && diskWriteFn) {
			diskWriteFn(content);
			const transferTime = content.length / this._diskIo.sequentialWriteThroughput;
			const totalLatency = this._diskIo.writeLatencyMs + transferTime;
			this._syncDelay(totalLatency);
		} else if (diskWriteFn) {
			diskWriteFn(content);
		}

		this._set(path, content);
	}

	/**
	 * Check if a path is in cache.
	 * @param path - File path to check.
	 * @returns True if path is cached.
	 */
	has(path: string): boolean {
		return this._cache.has(path);
	}

	/**
	 * Remove a path from cache.
	 * @param path - File path to remove.
	 * @returns True if path was in cache.
	 */
	delete(path: string): boolean {
		const entry = this._cache.get(path);
		if (entry) {
			this._totalMemoryUsage -= entry.size;
			this._cache.delete(path);
			return true;
		}
		return false;
	}

	/**
	 * Clear all cache entries.
	 */
	clear(): void {
		this._cache.clear();
		this._totalMemoryUsage = 0;
	}

	/**
	 * Get cache statistics.
	 * @returns CacheStats object with hit/miss/eviction counts.
	 */
	getStats(): CacheStats {
		const total = this._hits + this._misses;
		return {
			hits: this._hits,
			misses: this._misses,
			evictions: this._evictions,
			entries: this._cache.size,
			memoryUsage: this._totalMemoryUsage,
			hitRate: total > 0 ? (this._hits / total) * 100 : 0,
		};
	}

	/**
	 * Reset statistics counters.
	 */
	resetStats(): void {
		this._hits = 0;
		this._misses = 0;
		this._evictions = 0;
	}

	/**
	 * Get the configured eviction policy.
	 * @returns The current eviction policy.
	 */
	getPolicy(): CacheEvictionPolicy {
		return this._policy;
	}

	/**
	 * Get disk I/O parameters.
	 * @returns Current disk I/O simulation parameters.
	 */
	getDiskIoParams(): DiskIoParams {
		return { ...this._diskIo };
	}

	/**
	 * Update disk I/O parameters.
	 * @param params - New disk I/O parameters to merge.
	 */
	updateDiskIoParams(params: Partial<DiskIoParams>): void {
		if (params.readLatencyMs !== undefined) { this._diskIo.readLatencyMs = params.readLatencyMs; }
		if (params.writeLatencyMs !== undefined) { this._diskIo.writeLatencyMs = params.writeLatencyMs; }
		if (params.sequentialReadThroughput !== undefined) { this._diskIo.sequentialReadThroughput = params.sequentialReadThroughput; }
		if (params.sequentialWriteThroughput !== undefined) { this._diskIo.sequentialWriteThroughput = params.sequentialWriteThroughput; }
	}

	/**
	 * Internal: add entry to cache, evicting if necessary.
	 */
	private _set(path: string, content: Buffer): void {
		const existing = this._cache.get(path);
		if (existing) {
			this._totalMemoryUsage -= existing.size;
		}

		const size = content.length;

		// Evict if necessary
		while (this._cache.size >= this._maxEntries || this._totalMemoryUsage + size > this._maxMemoryBytes) {
			if (!this._evictOne()) { break; }
		}

		const entry: CacheEntry = {
			content: Buffer.from(content),
			insertedAt: Date.now(),
			lastAccessedAt: Date.now(),
			accessCount: 1,
			size,
		};

		this._cache.set(path, entry);
		this._totalMemoryUsage += size;
	}

	/**
	 * Internal: evict one entry based on the configured policy.
	 * @returns True if an entry was evicted.
	 */
	private _evictOne(): boolean {
		if (this._cache.size === 0) { return false; }

		let targetKey: string | null = null;

		switch (this._policy) {
			case "lru":
				targetKey = this._findLru();
				break;
			case "lfu":
				targetKey = this._findLfu();
				break;
			case "fifo":
				targetKey = this._findFifo();
				break;
		}

		if (targetKey) {
			const entry = this._cache.get(targetKey)!;
			this._totalMemoryUsage -= entry.size;
			this._cache.delete(targetKey);
			this._evictions++;
			return true;
		}

		return false;
	}

	/**
	 * Find the least recently used entry.
	 */
	private _findLru(): string | null {
		let oldest = Number.POSITIVE_INFINITY;
		let targetKey: string | null = null;

		for (const [key, entry] of this._cache) {
			if (entry.lastAccessedAt < oldest) {
				oldest = entry.lastAccessedAt;
				targetKey = key;
			}
		}

		return targetKey;
	}

	/**
	 * Find the least frequently used entry.
	 */
	private _findLfu(): string | null {
		let lowest = Number.POSITIVE_INFINITY;
		let targetKey: string | null = null;

		for (const [key, entry] of this._cache) {
			if (entry.accessCount < lowest) {
				lowest = entry.accessCount;
				targetKey = key;
			}
		}

		return targetKey;
	}

	/**
	 * Find the first-in entry (oldest insertion).
	 */
	private _findFifo(): string | null {
		let earliest = Number.POSITIVE_INFINITY;
		let targetKey: string | null = null;

		for (const [key, entry] of this._cache) {
			if (entry.insertedAt < earliest) {
				earliest = entry.insertedAt;
				targetKey = key;
			}
		}

		return targetKey;
	}

	/**
	 * Async delay for disk I/O simulation.
	 */
	private _delay(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	/**
	 * Synchronous delay for disk I/O simulation.
	 * Note: This blocks the event loop - use sparingly.
	 */
	private _syncDelay(ms: number): void {
		if (ms <= 0) { return; }
		const start = Date.now();
		while (Date.now() - start < ms) {
			// Busy wait - simulates disk I/O blocking
		}
	}
}
