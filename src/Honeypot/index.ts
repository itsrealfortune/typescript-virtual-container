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
import type { SshMimic } from "../SSHMimic";
import type { SftpMimic } from "../SSHMimic/sftp";
import type { PerfLogger } from "../utils/perfLogger";
import { createPerfLogger } from "../utils/perfLogger";
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
}

const perf: PerfLogger = createPerfLogger("HoneyPot");


/**
 * HoneyPot audit and event tracking utility.
 *
 * Singleton-like helper that attaches listeners to virtual shell components
 * and maintains an audit log of all activity.
 */
export class HoneyPot {
	private auditLog: AuditLogEntry[] = [];
	private stats: HoneyPotStats = {
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
	};

	private maxLogSize: number;

	/**
	 * Creates a new HoneyPot instance.
	 *
	 * @param maxLogSize Maximum audit log entries to retain (default: 10000).
	 */
	constructor(maxLogSize: number = 10000) {
		this.maxLogSize = maxLogSize;
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
		this.attachVirtualShell(shell);
		this.attachVirtualFileSystem(vfs);
		this.attachVirtualUserManager(users);
		if (ssh) {
			this.attachSshMimic(ssh);
		}
		if (sftp) {
			this.attachSftpMimic(sftp);
		}
	}

	/**
	 * Attaches to VirtualShell events.
	 */
	private attachVirtualShell(shell: VirtualShell): void {
		(shell as EventEmitter).on("initialized", () => {
			this.log("VirtualShell", "initialized", {});
		});

		(shell as EventEmitter).on("command", (data: Record<string, unknown>) => {
			this.stats.commands++;
			this.log("VirtualShell", "command", data);
		});

		(shell as EventEmitter).on(
			"session:start",
			(data: Record<string, unknown>) => {
				this.stats.sessionStarts++;
				this.log("VirtualShell", "session:start", data);
			},
		);
	}

	/**
	 * Attaches to VirtualFileSystem events.
	 */
	private attachVirtualFileSystem(vfs: VirtualFileSystem): void {
		(vfs as EventEmitter).on("file:read", (data: Record<string, unknown>) => {
			this.stats.fileReads++;
			this.log("VirtualFileSystem", "file:read", data);
		});

		(vfs as EventEmitter).on("file:write", (data: Record<string, unknown>) => {
			this.stats.fileWrites++;
			this.log("VirtualFileSystem", "file:write", data);
		});

		(vfs as EventEmitter).on("dir:create", (data: Record<string, unknown>) => {
			this.log("VirtualFileSystem", "dir:create", data);
		});

		(vfs as EventEmitter).on("mirror:flush", () => {
			this.log("VirtualFileSystem", "mirror:flush", {});
		});
	}

	/**
	 * Attaches to VirtualUserManager events.
	 */
	private attachVirtualUserManager(users: VirtualUserManager): void {
		(users as EventEmitter).on("initialized", () => {
			this.log("VirtualUserManager", "initialized", {});
		});

		(users as EventEmitter).on("user:add", (data: Record<string, unknown>) => {
			this.stats.userCreated++;
			this.log("VirtualUserManager", "user:add", data);
		});

		(users as EventEmitter).on(
			"user:delete",
			(data: Record<string, unknown>) => {
				this.stats.userDeleted++;
				this.log("VirtualUserManager", "user:delete", data);
			},
		);

		(users as EventEmitter).on(
			"session:register",
			(data: Record<string, unknown>) => {
				this.log("VirtualUserManager", "session:register", data);
			},
		);

		(users as EventEmitter).on(
			"session:unregister",
			(data: Record<string, unknown>) => {
				this.stats.sessionEnds++;
				this.log("VirtualUserManager", "session:unregister", data);
			},
		);
	}

	/**
	 * Attaches to SshMimic events.
	 */
	private attachSshMimic(ssh: SshMimic): void {
		(ssh as EventEmitter).on("start", (data: Record<string, unknown>) => {
			this.log("SshMimic", "start", data);
		});

		(ssh as EventEmitter).on("stop", () => {
			this.log("SshMimic", "stop", {});
		});

		(ssh as EventEmitter).on(
			"auth:success",
			(data: Record<string, unknown>) => {
				this.stats.authAttempts++;
				this.stats.authSuccesses++;
				this.log("SshMimic", "auth:success", data);
			},
		);

		(ssh as EventEmitter).on(
			"auth:failure",
			(data: Record<string, unknown>) => {
				this.stats.authAttempts++;
				this.stats.authFailures++;
				this.log("SshMimic", "auth:failure", data);
			},
		);

		(ssh as EventEmitter).on("client:connect", () => {
			this.stats.clientConnects++;
			this.log("SshMimic", "client:connect", {});
		});

		(ssh as EventEmitter).on(
			"client:disconnect",
			(data: Record<string, unknown>) => {
				this.stats.clientDisconnects++;
				this.log("SshMimic", "client:disconnect", data);
			},
		);
	}

	/**
	 * Attaches to SftpMimic events.
	 */
	private attachSftpMimic(sftp: SftpMimic): void {
		(sftp as EventEmitter).on("start", (data: Record<string, unknown>) => {
			this.log("SftpMimic", "start", data);
		});

		(sftp as EventEmitter).on("stop", () => {
			this.log("SftpMimic", "stop", {});
		});

		(sftp as EventEmitter).on(
			"auth:success",
			(data: Record<string, unknown>) => {
				this.stats.authAttempts++;
				this.stats.authSuccesses++;
				this.log("SftpMimic", "auth:success", data);
			},
		);

		(sftp as EventEmitter).on(
			"auth:failure",
			(data: Record<string, unknown>) => {
				this.stats.authAttempts++;
				this.stats.authFailures++;
				this.log("SftpMimic", "auth:failure", data);
			},
		);

		(sftp as EventEmitter).on("client:connect", () => {
			this.stats.clientConnects++;
			this.log("SftpMimic", "client:connect", {});
		});

		(sftp as EventEmitter).on(
			"client:disconnect",
			(data: Record<string, unknown>) => {
				this.stats.clientDisconnects++;
				this.log("SftpMimic", "client:disconnect", data);
			},
		);
	}

	/**
	 * Records an audit log entry.
	 *
	 * @param source Event source (e.g., "SshMimic", "VirtualFileSystem").
	 * @param type Event type.
	 * @param details Event-specific data.
	 */
	private log(
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

		this.auditLog.push(entry);

		// Trim log if exceeds max size
		if (this.auditLog.length > this.maxLogSize) {
			this.auditLog = this.auditLog.slice(-this.maxLogSize);
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
		return this.auditLog.filter(
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
		return Object.freeze({ ...this.stats });
	}

	/**
	 * Clears audit log and resets statistics.
	 */
	public reset(): void {
		this.auditLog = [];
		this.stats = {
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
		};
	}

	/**
	 * Returns recent log entries in reverse chronological order.
	 *
	 * @param limit Number of recent entries to return (default: 100).
	 * @returns Recent audit log entries.
	 */
	public getRecent(limit: number = 100): AuditLogEntry[] {
		return this.auditLog.slice(Math.max(0, this.auditLog.length - limit));
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
		const anomalies: Array<{
			type: string;
			severity: "low" | "medium" | "high";
			message: string;
		}> = [];

		// High auth failure rate
		if (
			this.stats.authAttempts > 0 &&
			this.stats.authFailures / this.stats.authAttempts > 0.5
		) {
			anomalies.push({
				type: "high_auth_failure_rate",
				severity: "medium",
				message: `Auth failure rate: ${(
					(this.stats.authFailures / this.stats.authAttempts) * 100
				).toFixed(1)}%`,
			});
		}

		// Excessive auth failures in short time
		if (this.stats.authFailures > 10) {
			anomalies.push({
				type: "excessive_auth_failures",
				severity: "high",
				message: `${this.stats.authFailures} authentication failures detected`,
			});
		}

		// Unusual command execution volume
		if (this.stats.commands > 1000) {
			anomalies.push({
				type: "high_command_volume",
				severity: "low",
				message: `${this.stats.commands} commands executed`,
			});
		}

		// Unusual file write volume
		if (this.stats.fileWrites > 500) {
			anomalies.push({
				type: "high_write_volume",
				severity: "medium",
				message: `${this.stats.fileWrites} file write operations`,
			});
		}

		return anomalies;
	}
}

export default HoneyPot;
