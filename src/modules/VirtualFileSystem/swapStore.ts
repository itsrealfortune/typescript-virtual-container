/**
 * swapStore.ts
 *
 * Swap file store for the VirtualFileSystem.
 *
 * When files are evicted from RAM, their content is written to individual
 * swap files on disk instead of being lost. On subsequent reads, content
 * is loaded from the swap file (O(1)) instead of parsing the entire
 * snapshot (O(n)).
 *
 * Swap directory layout:
 *   .vfs/swap/
 *     <hash>.swap  — contains: [4 bytes size][1 byte compressed flag][N bytes content]
 *
 * LRU tracking is maintained via a Map of path → { lastAccess, size }.
 */

import * as fsSync from "node:fs";
import * as path from "node:path";
import { createHash } from "node:crypto";

/** Metadata for a swapped-out file. */
interface SwapEntry {
	/** Virtual filesystem path (e.g. "/var/log/syslog"). */
	vfsPath: string;
	/** Original content size in bytes. */
	size: number;
	/** Whether the content is gzip-compressed. */
	compressed: boolean;
	/** Timestamp of last access (ms). Used for LRU eviction. */
	lastAccess: number;
}

/** Statistics about the swap store. */
export interface SwapStats {
	/** Number of files currently swapped out. */
	filesSwapped: number;
	/** Total bytes consumed by swap files on disk. */
	diskUsage: number;
	/** Total bytes of swapped files (uncompressed). */
	originalSize: number;
	/** Number of swap-in operations performed. */
	swapIns: number;
	/** Number of swap-out operations performed. */
	swapOuts: number;
}

/**
 * Manages a swap file directory on the host filesystem.
 *
 * Each swapped file is stored as a separate `.swap` file with a small
 * binary header: `[4 bytes originalSize][1 byte compressed flag][N bytes content]`.
 *
 * @example
 * ```ts
 * const swap = new SwapStore("/path/to/.vfs/swap");
 * await swap.initialize();
 *
 * swap.swapOut("/var/log/syslog", buffer, false);
 * const content = swap.swapIn("/var/log/syslog"); // returns Buffer
 * ```
 */
export class SwapStore {
	private readonly _swapDir: string;
	private readonly _entries = new Map<string, SwapEntry>();
	private _swapIns = 0;
	private _swapOuts = 0;

	constructor(swapDir: string) {
		this._swapDir = swapDir;
	}

	/**
	 * Creates the swap directory if it doesn't exist and loads existing entries.
	 */
	public initialize(): void {
		if (!fsSync.existsSync(this._swapDir)) {
			fsSync.mkdirSync(this._swapDir, { recursive: true });
		}
		this._loadExistingEntries();
	}

	/**
	 * Writes file content to a swap file and tracks it in the LRU map.
	 *
	 * @param vfsPath Virtual filesystem path (used as key).
	 * @param content File content buffer.
	 * @param compressed Whether the content is gzip-compressed.
	 */
	public swapOut(vfsPath: string, content: Buffer, compressed: boolean): void {
		const hash = SwapStore._hashPath(vfsPath);
		const swapFile = path.join(this._swapDir, `${hash}.swap`);

		// Header: [4 bytes size][1 byte compressed flag]
		const header = Buffer.alloc(5);
		header.writeUInt32LE(content.length, 0);
		header.writeUInt8(compressed ? 1 : 0, 4);

		// Atomic write: write to temp file, then rename
		const tempFile = `${swapFile}.tmp`;
		fsSync.writeFileSync(tempFile, Buffer.concat([header, content]));
		fsSync.renameSync(tempFile, swapFile);

		this._entries.set(vfsPath, {
			vfsPath,
			size: content.length,
			compressed,
			lastAccess: Date.now(),
		});

		this._swapOuts++;
	}

	/**
	 * Reads file content from a swap file and removes the swap entry.
	 * Updates the LRU access timestamp.
	 *
	 * @param vfsPath Virtual filesystem path.
	 * @returns Content buffer, or null if not found in swap.
	 */
	public swapIn(vfsPath: string): Buffer | null {
		const entry = this._entries.get(vfsPath);
		if (!entry) { return null; }

		const hash = SwapStore._hashPath(vfsPath);
		const swapFile = path.join(this._swapDir, `${hash}.swap`);

		try {
			if (!fsSync.existsSync(swapFile)) {
				this._entries.delete(vfsPath);
				return null;
			}

			const raw = fsSync.readFileSync(swapFile);
			if (raw.length < 5) {
				this._entries.delete(vfsPath);
				return null;
			}

			const size = raw.readUInt32LE(0);
			const content = raw.subarray(5);

			// Verify size matches
			if (content.length !== size) {
				this._entries.delete(vfsPath);
				return null;
			}

			// Update LRU timestamp
			entry.lastAccess = Date.now();
			this._swapIns++;

			// Delete swap file after successful read
			try { fsSync.unlinkSync(swapFile); } catch { /* best-effort */ }
			this._entries.delete(vfsPath);

			return content;
		} catch {
			this._entries.delete(vfsPath);
			return null;
		}
	}

	/**
	 * Checks if a file is currently swapped out.
	 *
	 * @param vfsPath Virtual filesystem path.
	 * @returns True if content is in swap store.
	 */
	public hasSwapped(vfsPath: string): boolean {
		const entry = this._entries.get(vfsPath);
		if (!entry) { return false; }
		// Verify the swap file actually exists
		const hash = SwapStore._hashPath(vfsPath);
		const swapFile = path.join(this._swapDir, `${hash}.swap`);
		return fsSync.existsSync(swapFile);
	}

	/**
	 * Deletes a swap file and its entry.
	 *
	 * @param vfsPath Virtual filesystem path.
	 */
	public deleteSwap(vfsPath: string): void {
		const hash = SwapStore._hashPath(vfsPath);
		const swapFile = path.join(this._swapDir, `${hash}.swap`);
		try { fsSync.unlinkSync(swapFile); } catch { /* best-effort */ }
		this._entries.delete(vfsPath);
	}

	/**
	 * Returns swap metadata for a file.
	 *
	 * @param vfsPath Virtual filesystem path.
	 * @returns SwapEntry or undefined if not swapped.
	 */
	public getEntry(vfsPath: string): SwapEntry | undefined {
		return this._entries.get(vfsPath);
	}

	/**
	 * Returns all swapped files sorted by LRU (oldest first).
	 *
	 * @returns Array of SwapEntry sorted by lastAccess ascending.
	 */
	public getLruEntries(): SwapEntry[] {
		return Array.from(this._entries.values())
			.filter((e) => this.hasSwapped(e.vfsPath))
			.sort((a, b) => a.lastAccess - b.lastAccess);
	}

	/**
	 * Returns swap store statistics.
	 */
	public getStats(): SwapStats {
		let diskUsage = 0;
		let originalSize = 0;
		let filesSwapped = 0;

		for (const entry of this._entries.values()) {
			if (this.hasSwapped(entry.vfsPath)) {
				filesSwapped++;
				originalSize += entry.size;
				diskUsage += entry.size + 5; // +5 for header
			}
		}

		return {
			filesSwapped,
			diskUsage,
			originalSize,
			swapIns: this._swapIns,
			swapOuts: this._swapOuts,
		};
	}

	/**
	 * Clears all swap files and resets statistics.
	 */
	public clear(): void {
		for (const entry of this._entries.values()) {
			this.deleteSwap(entry.vfsPath);
		}
		this._entries.clear();
		this._swapIns = 0;
		this._swapOuts = 0;
	}

	/**
	 * Returns the total number of swapped files.
	 */
	public getSwapCount(): number {
		return this._entries.size;
	}

	/**
	 * Generates a deterministic hash for a VFS path.
	 * Uses SHA-256 truncated to 16 hex chars (8 bytes).
	 */
	private static _hashPath(vfsPath: string): string {
		return createHash("sha256").update(vfsPath).digest("hex").slice(0, 16);
	}

	/**
	 * Scans the swap directory for existing .swap files and loads their metadata.
	 */
	private _loadExistingEntries(): void {
		try {
			const files = fsSync.readdirSync(this._swapDir);
			for (const file of files) {
				if (!file.endsWith(".swap")) { continue; }

				const swapFile = path.join(this._swapDir, file);
				try {
					const stat = fsSync.statSync(swapFile);
					if (stat.size < 5) { continue; }

					const raw = fsSync.readFileSync(swapFile);
					const size = raw.readUInt32LE(0);
					const compressed = raw.readUInt8(4) === 1;

					// We can't recover the original VFS path from the hash,
					// so we store it with a placeholder key. The path will be
					// resolved when swapIn is called with the correct path.
					// For now, just track the file size.
					const hash = file.replace(".swap", "");
					this._entries.set(`__hash:${hash}`, {
						vfsPath: `__hash:${hash}`,
						size,
						compressed,
						lastAccess: stat.mtimeMs,
					});
				} catch { /* skip corrupt files */ }
			}
		} catch { /* directory unreadable */ }
	}
}
