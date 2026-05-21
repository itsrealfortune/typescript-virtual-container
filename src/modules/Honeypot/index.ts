/**
 * Honeypot tracking and auditing module for virtual shell events.
 *
 * Attaches listeners to VirtualShell, VirtualFileSystem, VirtualUserManager,
 * SshMimic, and SftpMimic instances to log all activity for security auditing,
 * anomaly detection, and forensic analysis.
 *
 * @module honeypot
 */

import type { EventEmitter } from "node:events";
import { type PerfLogger, createPerfLogger } from "../../utils/perfLogger";
import type { SshMimic } from "../SSHMimic";
import type { SftpMimic } from "../SSHMimic/sftp";
import type VirtualFileSystem from "../VirtualFileSystem";
import type { VirtualShell } from "../VirtualShell";
import type { VirtualUserManager } from "../VirtualUserManager";

/**
 * Audit log entry recorded for each event.
 */
export interface AuditLogEntry {
	timestamp: string;
	type: string;
	source: string;
	details: Record<string, unknown>;
}

/**
 * Statistics tracker for honeypot activity.
 */
export interface HoneyPotStats {
	authAttempts: number;
	authSuccesses: number;
	authFailures: number;
	commands: number;
	fileWrites: number;
	fileReads: number;
	sessionStarts: number;
	sessionEnds: number;
	userCreated: number;
	userDeleted: number;
	clientConnects: number;
	clientDisconnects: number;
	shellFreezes: number;
	shellThaws: number;
	keysAdded: number;
	keysRemoved: number;
	snapshotsRestored: number;
	snapshotsImported: number;
	mounts: number;
	unmounts: number;
	symlinksCreated: number;
	nodesRemoved: number;
	authLockouts: number;
}

const perf: PerfLogger = createPerfLogger("HoneyPot");

/**
 * HoneyPot audit and event tracking utility.
 *
 * Singleton-like helper that attaches listeners to virtual shell components
 * and maintains an audit log of all activity. Tracks authentication attempts,
 * file operations, commands, sessions, and system events for security analysis.
 *
 * @example
 * ```ts
 * const honeypot = new HoneyPot(10000); // retain 10k log entries
 * honeypot.attach(shell, vfs, users, sshMimic, sftpMimic);
 *
 * // After activity, inspect the audit log
 * console.log(honeypot.getAuditLog()); // Array of AuditLogEntry
 * console.log(honeypot.getStats());    // HoneyPotStats with counters
 *
 * // Detect anomalies (brute force, privilege escalation, etc.)
 * const anomalies = honeypot.detectAnomalies();
 * ```
 */
export class HoneyPot {
	private _auditLog: AuditLogEntry[] = [];
	private _stats: HoneyPotStats = {
		authAttempts: 0,
		authSuccesses: 0,
		authFailures: 0,
		commands: 0,
		fileWrites: 0,
		fileReads: 0,
		sessionStarts: 0,
		sessionEnds: 0,
		userCreated: 0,
		userDeleted: 0,
		clientConnects: 0,
		clientDisconnects: 0,
		shellFreezes: 0,
		shellThaws: 0,
		keysAdded: 0,
		keysRemoved: 0,
		snapshotsRestored: 0,
		snapshotsImported: 0,
		mounts: 0,
		unmounts: 0,
		symlinksCreated: 0,
		nodesRemoved: 0,
		authLockouts: 0,
	};

	private _maxLogSize: number;
	/** Reference kept so VFS events can ping the shell's idle manager. */
	private _shell: VirtualShell | null = null;

	/**
	 * Creates a new HoneyPot instance.
	 *
	 * @param maxLogSize Maximum audit log entries to retain (default: 10000).
	 */
	constructor(maxLogSize: number = 10000) {
		perf.mark("constructor");
		this._maxLogSize = maxLogSize;
	}

	/**
	 * Attaches honeypot listeners to all provided event emitters.
	 *
	 * @param shell VirtualShell instance.
	 * @param vfs VirtualFileSystem instance.
	 * @param users VirtualUserManager instance.
	 * @param ssh SshMimic instance (optional).
	 * @param sftp SftpMimic instance (optional).
	 */
	public attach(
		shell: VirtualShell,
		vfs: VirtualFileSystem,
		users: VirtualUserManager,
		ssh?: SshMimic,
		sftp?: SftpMimic,
	): void {
		perf.mark("attach");
		this._shell = shell;
		this._attachVirtualShell(shell);
		this._attachVirtualFileSystem(vfs);
		this._attachVirtualUserManager(users);
		if (ssh) {
			this._attachSshMimic(ssh);
		}
		if (sftp) {
			this._attachSftpMimic(sftp);
		}
	}

	/** Attaches to VirtualShell events (commands, sessions, freeze/thaw). */
	private _attachVirtualShell(shell: VirtualShell): void {
		(shell as EventEmitter).on("initialized", () => {
			this._log("VirtualShell", "initialized", {});
		});

		(shell as EventEmitter).on("command", (data: Record<string, unknown>) => {
			this._stats.commands++;
			this._log("VirtualShell", "command", data);
		});

		(shell as EventEmitter).on(
			"session:start",
			(data: Record<string, unknown>) => {
				this._stats.sessionStarts++;
				this._log("VirtualShell", "session:start", data);
			},
		);

		(shell as EventEmitter).on("shell:freeze", () => {
			this._stats.shellFreezes++;
			this._log("VirtualShell", "shell:freeze", {});
		});

		(shell as EventEmitter).on("shell:thaw", () => {
			this._stats.shellThaws++;
			this._log("VirtualShell", "shell:thaw", {});
		});
	}

	/** Attaches to VirtualFileSystem events (reads, writes, mounts, snapshots). */
	private _attachVirtualFileSystem(vfs: VirtualFileSystem): void {
		(vfs as EventEmitter).on("file:read", (data: Record<string, unknown>) => {
			this._stats.fileReads++;
			this._shell?.pingIdle();
			this._log("VirtualFileSystem", "file:read", data);
		});

		(vfs as EventEmitter).on("file:write", (data: Record<string, unknown>) => {
			this._stats.fileWrites++;
			this._shell?.pingIdle();
			this._log("VirtualFileSystem", "file:write", data);
		});

		(vfs as EventEmitter).on("dir:create", (data: Record<string, unknown>) => {
			this._shell?.pingIdle();
			this._log("VirtualFileSystem", "dir:create", data);
		});

		(vfs as EventEmitter).on("mirror:flush", () => {
			this._log("VirtualFileSystem", "mirror:flush", {});
		});

		(vfs as EventEmitter).on("snapshot:restore", (data: Record<string, unknown>) => {
			this._stats.snapshotsRestored++;
			this._log("VirtualFileSystem", "snapshot:restore", data);
		});

		(vfs as EventEmitter).on("snapshot:import", (data: Record<string, unknown>) => {
			this._stats.snapshotsImported++;
			this._log("VirtualFileSystem", "snapshot:import", data);
		});

		(vfs as EventEmitter).on("mount", (data: Record<string, unknown>) => {
			this._stats.mounts++;
			this._shell?.pingIdle();
			this._log("VirtualFileSystem", "mount", data);
		});

		(vfs as EventEmitter).on("unmount", (data: Record<string, unknown>) => {
			this._stats.unmounts++;
			this._log("VirtualFileSystem", "unmount", data);
		});

		(vfs as EventEmitter).on("symlink:create", (data: Record<string, unknown>) => {
			this._stats.symlinksCreated++;
			this._shell?.pingIdle();
			this._log("VirtualFileSystem", "symlink:create", data);
		});

		(vfs as EventEmitter).on("node:remove", (data: Record<string, unknown>) => {
			this._stats.nodesRemoved++;
			this._shell?.pingIdle();
			this._log("VirtualFileSystem", "node:remove", data);
		});
	}

	/** Attaches to VirtualUserManager events (users, sessions, keys). */
	private _attachVirtualUserManager(users: VirtualUserManager): void {
		(users as EventEmitter).on("initialized", () => {
			this._log("VirtualUserManager", "initialized", {});
		});

		(users as EventEmitter).on("user:add", (data: Record<string, unknown>) => {
			this._stats.userCreated++;
			this._log("VirtualUserManager", "user:add", data);
		});

		(users as EventEmitter).on(
			"user:delete",
			(data: Record<string, unknown>) => {
				this._stats.userDeleted++;
				this._log("VirtualUserManager", "user:delete", data);
			},
		);

		(users as EventEmitter).on(
			"session:register",
			(data: Record<string, unknown>) => {
				this._log("VirtualUserManager", "session:register", data);
			},
		);

		(users as EventEmitter).on(
			"session:unregister",
			(data: Record<string, unknown>) => {
				this._stats.sessionEnds++;
				this._log("VirtualUserManager", "session:unregister", data);
			},
		);

		(users as EventEmitter).on(
			"key:add",
			(data: Record<string, unknown>) => {
				this._stats.keysAdded++;
				this._log("VirtualUserManager", "key:add", data);
			},
		);

		(users as EventEmitter).on(
			"key:remove",
			(data: Record<string, unknown>) => {
				this._stats.keysRemoved++;
				this._log("VirtualUserManager", "key:remove", data);
			},
		);
	}

	/** Attaches to SshMimic events (auth attempts, connections). */
	private _attachSshMimic(ssh: SshMimic): void {
		(ssh as EventEmitter).on("start", (data: Record<string, unknown>) => {
			this._log("SshMimic", "start", data);
		});

		(ssh as EventEmitter).on("stop", () => {
			this._log("SshMimic", "stop", {});
		});

		(ssh as EventEmitter).on(
			"auth:success",
			(data: Record<string, unknown>) => {
				this._stats.authAttempts++;
				this._stats.authSuccesses++;
				this._log("SshMimic", "auth:success", data);
			},
		);

		(ssh as EventEmitter).on(
			"auth:failure",
			(data: Record<string, unknown>) => {
				this._stats.authAttempts++;
				this._stats.authFailures++;
				this._log("SshMimic", "auth:failure", data);
			},
		);

		(ssh as EventEmitter).on(
			"auth:lockout",
			(data: Record<string, unknown>) => {
				this._stats.authLockouts++;
				this._log("SshMimic", "auth:lockout", data);
			},
		);

		(ssh as EventEmitter).on("client:connect", () => {
			this._stats.clientConnects++;
			this._log("SshMimic", "client:connect", {});
		});

		(ssh as EventEmitter).on(
			"client:disconnect",
			(data: Record<string, unknown>) => {
				this._stats.clientDisconnects++;
				this._log("SshMimic", "client:disconnect", data);
			},
		);
	}

	/** Attaches to SftpMimic events (auth, connections). */
	private _attachSftpMimic(sftp: SftpMimic): void {
		(sftp as EventEmitter).on("start", (data: Record<string, unknown>) => {
			this._log("SftpMimic", "start", data);
		});

		(sftp as EventEmitter).on("stop", () => {
			this._log("SftpMimic", "stop", {});
		});

		(sftp as EventEmitter).on(
			"auth:success",
			(data: Record<string, unknown>) => {
				this._stats.authAttempts++;
				this._stats.authSuccesses++;
				this._log("SftpMimic", "auth:success", data);
			},
		);

		(sftp as EventEmitter).on(
			"auth:failure",
			(data: Record<string, unknown>) => {
				this._stats.authAttempts++;
				this._stats.authFailures++;
				this._log("SftpMimic", "auth:failure", data);
			},
		);

		(sftp as EventEmitter).on("client:connect", () => {
			this._stats.clientConnects++;
			this._log("SftpMimic", "client:connect", {});
		});

		(sftp as EventEmitter).on(
			"client:disconnect",
			(data: Record<string, unknown>) => {
				this._stats.clientDisconnects++;
				this._log("SftpMimic", "client:disconnect", data);
			},
		);
	}

	/**
	 * Records an audit log entry and prints to console for real-time monitoring.
	 * Trims the log if it exceeds maxLogSize.
	 *
	 * @param source Event source (e.g., "SshMimic", "VirtualFileSystem").
	 * @param type Event type identifier.
	 * @param details Event-specific data to record.
	 */
	private _log(
		source: string,
		type: string,
		details: Record<string, unknown>,
	): void {
		const entry: AuditLogEntry = {
			timestamp: new Date().toISOString(),
			type,
			source,
			details,
		};

		this._auditLog.push(entry);

		// Trim log if exceeds max size
		if (this._auditLog.length > this._maxLogSize) {
			this._auditLog = this._auditLog.slice(-this._maxLogSize);
		}

		// Console output for real-time monitoring
		console.log(`[AUDIT] ${entry.timestamp} | ${source} | ${type}`, details);
	}

	/**
	 * Returns audit log entries matching optional filters.
	 *
	 * @param type Optional event type filter.
	 * @param source Optional source filter.
	 * @returns Filtered audit log entries.
	 */
	public getAuditLog(type?: string, source?: string): AuditLogEntry[] {
		perf.mark("getAuditLog");
		return this._auditLog.filter(
			(entry) =>
				(!type || entry.type === type) && (!source || entry.source === source),
		);
	}

	/**
	 * Returns current activity statistics.
	 *
	 * @returns Snapshot of honeypot stats.
	 */
	public getStats(): Readonly<HoneyPotStats> {
		perf.mark("getStats");
		return Object.freeze({ ...this._stats });
	}

	/**
	 * Clears audit log and resets statistics.
	 */
	public reset(): void {
		perf.mark("reset");
		this._auditLog = [];
		this._stats = {
			authAttempts: 0,
			authSuccesses: 0,
			authFailures: 0,
			commands: 0,
			fileWrites: 0,
			fileReads: 0,
			sessionStarts: 0,
			sessionEnds: 0,
			userCreated: 0,
			userDeleted: 0,
			clientConnects: 0,
			clientDisconnects: 0,
			shellFreezes: 0,
			shellThaws: 0,
			keysAdded: 0,
			keysRemoved: 0,
			snapshotsRestored: 0,
			snapshotsImported: 0,
			mounts: 0,
			unmounts: 0,
			symlinksCreated: 0,
			nodesRemoved: 0,
			authLockouts: 0,
		};
	}

	/**
	 * Returns recent log entries in reverse chronological order.
	 *
	 * @param limit Number of recent entries to return (default: 100).
	 * @returns Recent audit log entries.
	 */
	public getRecent(limit: number = 100): AuditLogEntry[] {
		perf.mark("getRecent");
		return this._auditLog.slice(Math.max(0, this._auditLog.length - limit));
	}

	/**
	 * Detects potential security issues based on activity patterns.
	 *
	 * @returns Array of anomalies detected.
	 */
	public detectAnomalies(): Array<{
		type: string;
		severity: "low" | "medium" | "high";
		message: string;
	}> {
		perf.mark("detectAnomalies");
		const anomalies: Array<{
			type: string;
			severity: "low" | "medium" | "high";
			message: string;
		}> = [];

		// High auth failure rate
		if (
			this._stats.authAttempts > 0 &&
			this._stats.authFailures / this._stats.authAttempts > 0.5
		) {
			anomalies.push({
				type: "high_auth_failure_rate",
				severity: "medium",
				message: `Auth failure rate: ${(
					(this._stats.authFailures / this._stats.authAttempts) * 100
				).toFixed(1)}%`,
			});
		}

		// Excessive auth failures in short time
		if (this._stats.authFailures > 10) {
			anomalies.push({
				type: "excessive_auth_failures",
				severity: "high",
				message: `${this._stats.authFailures} authentication failures detected`,
			});
		}

		// Unusual command execution volume
		if (this._stats.commands > 1000) {
			anomalies.push({
				type: "high_command_volume",
				severity: "low",
				message: `${this._stats.commands} commands executed`,
			});
		}

		// Unusual file write volume
		if (this._stats.fileWrites > 500) {
			anomalies.push({
				type: "high_write_volume",
				severity: "medium",
				message: `${this._stats.fileWrites} file write operations`,
			});
		}

		return anomalies;
	}
}

export default HoneyPot;
