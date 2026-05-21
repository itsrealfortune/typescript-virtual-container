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
}

export type IdleState = "active" | "frozen";

/**
 * Manages freeze/thaw lifecycle for idle VirtualShell instances.
 *
 * Serialises the VFS tree to a compact binary buffer after a period of
 * inactivity, freeing memory and suspending the auto-flush timer.
 * The tree is reconstructed on next activity in ~0.1 ms.
 */
export class IdleManager extends EventEmitter {
	private readonly _vfs: VirtualFileSystem;
	private readonly _idleThresholdMs: number;
	private readonly _checkIntervalMs: number;

	private _state: IdleState = "active";
	private _lastActivity = Date.now();
	private _frozenBuffer: Buffer | null = null;
	private _checkTimer: ReturnType<typeof setInterval> | null = null;

	/** Emitted when the shell is frozen (VFS tree released). */
	declare on: ((event: "freeze", listener: () => void) => this) &
		((event: "thaw", listener: () => void) => this) &
		((event: string, listener: (...args: unknown[]) => void) => this);

	/**
	 * Create an IdleManager for a VirtualShell's VFS.
	 * @param vfs - The VirtualFileSystem to manage.
	 * @param options - Idle configuration (threshold, check interval).
	 */
	constructor(vfs: VirtualFileSystem, options: IdleManagerOptions = {}) {
		super();
		this._vfs = vfs;
		this._idleThresholdMs = options.idleThresholdMs ?? 60_000;
		this._checkIntervalMs = options.checkIntervalMs ?? 15_000;
	}

	/** Start monitoring for idle. Call once after shell initialisation. */
	public start(): void {
		if (this._checkTimer) return;
		this._lastActivity = Date.now();
		this._checkTimer = setInterval(() => this._check(), this._checkIntervalMs);
		// Don't block process exit
		if (typeof this._checkTimer === "object" && this._checkTimer !== null && "unref" in this._checkTimer) {
			(this._checkTimer as NodeJS.Timeout).unref();
		}
	}

	/** Stop monitoring and thaw if frozen. Call on shell destroy. */
	public async stop(): Promise<void> {
		if (this._checkTimer) {
			clearInterval(this._checkTimer);
			this._checkTimer = null;
		}
		if (this._state === "frozen") this._thaw();
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
		if (this._state === "frozen") this._thaw();
	}

	/** Current idle state. */
	public get state(): IdleState {
		return this._state;
	}

	/** Ms since last activity. */
	public get idleMs(): number {
		return Date.now() - this._lastActivity;
	}

	// ── Internal ──────────────────────────────────────────────────────────────

	private _check(): void {
		if (this._state === "frozen") return; // already frozen
		if (Date.now() - this._lastActivity >= this._idleThresholdMs) {
			void this._freeze();
		}
	}

	private async _freeze(): Promise<void> {
		if (this._state === "frozen") return;
		// Flush any pending writes before freezing
		await this._vfs.stopAutoFlush();
		// Serialise the live tree to a compact binary buffer
		this._frozenBuffer = this._vfs.encodeBinary();
		// Release the live tree — GC can now collect all InternalNode objects
		this._vfs.releaseTree();
		this._state = "frozen";
		this.emit("freeze");
	}

	private _thaw(): void {
		if (this._state !== "frozen" || !this._frozenBuffer) return;
		// Reconstruct the tree from the frozen buffer (~0.07 ms — pure CPU, no I/O)
		const root = decodeVfs(this._frozenBuffer);
		this._vfs.importRootTree(root);
		this._frozenBuffer = null;
		this._state = "active";
		this.emit("thaw");
	}
}
