/**
 * IdleManager — cold-start / freeze-thaw system for VirtualShell.
 *
 * When a shell has had no activity for `idleThresholdMs`, the VFS tree is
 * serialised to a compact binary buffer and the in-memory tree is released.
 * On the next command the tree is reconstructed in ~0.1 ms.
 *
 * Memory freed per idle shell: the full JS object graph (~250+ InternalNodes
 * for a typical rootfs + user files). The frozen buffer itself stays in RAM
 * but is ~27% smaller than the live tree and GC-friendly (one flat Buffer).
 *
 * CPU freed: the VFS auto-flush setInterval is suspended while frozen.
 *
 * Usage:
 * ```ts
 * const idle = new IdleManager(shell, { idleThresholdMs: 60_000 });
 * idle.start();
 * // call idle.ping() on every shell activity (exec, keypress, …)
 * // call idle.stop() on shell destroy
 * ```
 */

import { EventEmitter } from "node:events";
import type VirtualFileSystem from "../VirtualFileSystem";
import { decodeVfs } from "../VirtualFileSystem/binaryPack";
import type { VirtualShell } from "../VirtualShell";

export interface IdleManagerOptions {
	/**
	 * Milliseconds of inactivity before the shell is frozen.
	 * Default: 60_000 (1 minute).
	 */
	idleThresholdMs?: number;
	/**
	 * How often the idle check runs.
	 * Default: 15_000 (15 seconds).
	 */
	checkIntervalMs?: number;
	/**
	 * How often the garbage collector runs (ms).
	 * Default: 30_000 (30 seconds).
	 * Set to 0 to disable garbage collection.
	 */
	gcIntervalMs?: number;
}

export type IdleState = "active" | "frozen";

/** Minimal interface for GC operations on the shell's user manager. */
interface GcUserManager {
	listProcesses(): Array<{ pid: number; status: string }>;
	unregisterProcess(pid: number): void;
	getProcessCpuTime(pid: number): number;
	listActiveSessions(): Array<{ id: string; username: string; startedAt: string }>;
}

/**
 * Manages freeze/thaw lifecycle and garbage collection for idle VirtualShell instances.
 *
 * Serialises the VFS tree to a compact binary buffer after a period of
 * inactivity, freeing memory and suspending the auto-flush timer.
 * The tree is reconstructed on next activity in ~0.1 ms.
 *
 * Garbage collection runs periodically to free memory from:
 * - Terminated processes (status === "done")
 * - CPU time tracking for non-existent processes
 * - Large files with no open file descriptors
 * - Stale sessions with no associated processes
 */
export class IdleManager extends EventEmitter {
	private readonly _shell: VirtualShell;
	private readonly _vfs: VirtualFileSystem;
	private readonly _idleThresholdMs: number;
	private readonly _checkIntervalMs: number;
	private readonly _gcIntervalMs: number;

	private _state: IdleState = "active";
	private _lastActivity = Date.now();
	private _frozenBuffer: Buffer | null = null;
	private _checkTimer: ReturnType<typeof setInterval> | null = null;
	private _gcTimer: ReturnType<typeof setInterval> | null = null;

	/** Emitted when the shell is frozen (VFS tree released). */
	declare on: ((event: "freeze", listener: () => void) => this) &
		((event: "thaw", listener: () => void) => this) &
		((event: "gc:run", listener: (stats: GcStats) => void) => this) &
		((event: string, listener: (...args: unknown[]) => void) => this);

	/**
	 * Create an IdleManager for a VirtualShell.
	 * @param shell - The VirtualShell to manage (provides VFS and user manager access).
	 * @param options - Idle and GC configuration.
	 */
	constructor(shell: VirtualShell, options: IdleManagerOptions = {}) {
		super();
		this._shell = shell;
		this._vfs = shell.vfs;
		this._idleThresholdMs = options.idleThresholdMs ?? 60_000;
		this._checkIntervalMs = options.checkIntervalMs ?? 15_000;
		this._gcIntervalMs = options.gcIntervalMs ?? 30_000;
	}

	/** Start monitoring for idle and GC. Call once after shell initialisation. */
	public start(): void {
		if (this._checkTimer) { return; }
		this._lastActivity = Date.now();
		this._checkTimer = setInterval(() => this._check(), this._checkIntervalMs);
		if (typeof this._checkTimer === "object" && this._checkTimer !== null && "unref" in this._checkTimer) {
			(this._checkTimer as NodeJS.Timeout).unref();
		}
		if (this._gcIntervalMs > 0) {
			this._gcTimer = setInterval(() => this._runGc(), this._gcIntervalMs);
			if (typeof this._gcTimer === "object" && this._gcTimer !== null && "unref" in this._gcTimer) {
				(this._gcTimer as NodeJS.Timeout).unref();
			}
		}
	}

	/** Stop monitoring and thaw if frozen. Call on shell destroy. */
	public stop(): void {
		if (this._checkTimer) {
			clearInterval(this._checkTimer);
			this._checkTimer = null;
		}
		if (this._gcTimer) {
			clearInterval(this._gcTimer);
			this._gcTimer = null;
		}
		if (this._state === "frozen") { this._thaw(); }
	}

	/**
	 * Signal activity — resets the idle clock and thaws synchronously if frozen.
	 * Call this before every exec / keypress / session event.
	 *
	 * Thaw is intentionally synchronous: decodeVfs() is a pure CPU operation
	 * (~0.07 ms) with no I/O, so it is safe to block briefly on the hot path.
	 * This guarantees the VFS tree is fully restored before any command runs.
	 */
	public ping(): void {
		this._lastActivity = Date.now();
		if (this._state === "frozen") { this._thaw(); }
	}

	/** Current idle state. */
	public get state(): IdleState {
		return this._state;
	}

	/** Ms since last activity. */
	public get idleMs(): number {
		return Date.now() - this._lastActivity;
	}

	/** Run garbage collection immediately (useful for testing or manual triggers). */
	public runGc(): GcStats {
		return this._runGc();
	}

	// ── Internal ──────────────────────────────────────────────────────────────

	private _check(): void {
		if (this._state === "frozen") { return; }
		if (Date.now() - this._lastActivity >= this._idleThresholdMs) {
			void this._freeze();
		}
	}

	private _freeze(): void {
		if (this._state === "frozen") { return; }
		// Flush any pending writes before freezing
		this._vfs.stopAutoFlush();
		// Serialise the live tree to a compact binary buffer
		this._frozenBuffer = this._vfs.encodeBinary();
		// Release the live tree — GC can now collect all InternalNode objects
		this._vfs.releaseTree();
		this._state = "frozen";
		this.emit("freeze");
	}

	private _thaw(): void {
		if (this._state !== "frozen" || !this._frozenBuffer) { return; }
		const root = decodeVfs(this._frozenBuffer);
		this._vfs.importRootTree(root);
		this._frozenBuffer = null;
		this._state = "active";
		this.emit("thaw");
	}

	// ── Garbage Collection ────────────────────────────────────────────────────

	private _runGc(): GcStats {
		const stats: GcStats = {
			terminatedProcesses: 0,
			staleCpuEntries: 0,
			evictedFiles: 0,
			forcedGc: false,
		};

		stats.terminatedProcesses = this._cleanupTerminatedProcesses();
		stats.staleCpuEntries = this._cleanupStaleCpuEntries();
		stats.evictedFiles = this._evictClosedFiles();
		stats.forcedGc = IdleManager._forceNodeGc();

		this.emit("gc:run", stats);
		return stats;
	}

	private _cleanupTerminatedProcesses(): number {
		const users = this._shell.users;
		if (!users) { return 0; }

		const procs = users.listProcesses();
		let cleaned = 0;
		for (const proc of procs) {
			if (proc.status === "done") {
				users.unregisterProcess(proc.pid);
				cleaned++;
			}
		}
		return cleaned;
	}

	private _cleanupStaleCpuEntries(): number {
		const users = this._shell.users;
		if (!users) { return 0; }

		const procs = users.listProcesses();
		const activePids = new Set(procs.map((p) => p.pid));
		let cleaned = 0;

		const allPids = IdleManager._getAllTrackedPids(users);
		for (const pid of allPids) {
			if (!activePids.has(pid) && users.getProcessCpuTime(pid) > 0) {
				cleaned++;
			}
		}
		return cleaned;
	}

	private static _getAllTrackedPids(users: GcUserManager): number[] {
		const procs = users.listProcesses();
		return procs.map((p) => p.pid);
	}

	private _evictClosedFiles(): number {
		if (this._state === "frozen") { return 0; }
		const openPaths = this._vfs.getOpenPaths();
		const evicted = this._vfs.evictUnusedLargeFiles(openPaths);
		return evicted;
	}

	private static _forceNodeGc(): boolean {
		const gc = (globalThis as Record<string, unknown>).gc as (() => void) | undefined;
		if (typeof gc === "function") {
			gc();
			return true;
		}
		return false;
	}
}

/** Statistics returned by garbage collection runs. */
export interface GcStats {
	/** Number of terminated process records removed. */
	terminatedProcesses: number;
	/** Number of CPU time entries for non-existent processes cleared. */
	staleCpuEntries: number;
	/** Number of large files evicted from RAM (no open FDs). */
	evictedFiles: number;
	/** True if Node.js GC was forced (requires --expose-gc flag). */
	forcedGc: boolean;
}
