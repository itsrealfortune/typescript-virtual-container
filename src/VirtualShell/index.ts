import { randomBytes } from "node:crypto";
import type { CommandContext, CommandResult } from "../types/commands";
import type { ShellStream } from "../types/streams";
import VirtualFileSystem from "../VirtualFileSystem";
import { VirtualUserManager } from "../VirtualUserManager";
import { createCustomCommand, registerCommand, runCommand } from "./commands";
import { startShell } from "./shell";

export interface ShellProperties {
	kernel: string;
	os: "Fortune GNU/Linux x64";
	arch: "x86_64";
}

export const defaultShellProperties: ShellProperties = {
	kernel: "1.0.0+itsrealfortune+1-amd64",
	os: "Fortune GNU/Linux x64",
	arch: "x86_64",
};

function resolveRootPassword(): string {
	const configured = process.env.SSH_MIMIC_ROOT_PASSWORD;
	if (configured && configured.trim().length > 0) {
		return configured;
	}

	const generated = randomBytes(18).toString("base64url");
	console.warn(
		`[ssh-mimic] SSH_MIMIC_ROOT_PASSWORD missing; generated ephemeral root password: ${generated}`,
	);
	return generated;
}

function resolveAutoSudoForNewUsers(): boolean {
	const configured = process.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;
	if (!configured) {
		return true;
	}

	return !["0", "false", "no", "off"].includes(configured.toLowerCase());
}

class VirtualShell {
	basePath: string = ".";
	vfs: VirtualFileSystem;
	users: VirtualUserManager;
	hostname: string;
	properties: ShellProperties;

	constructor(
		hostname: string,
		properties?: ShellProperties,
		basePath?: string,
	) {
		this.hostname = hostname;
		this.properties = properties || defaultShellProperties;
		this.basePath = basePath || ".";
		this.vfs = new VirtualFileSystem(this.basePath);
		this.users = new VirtualUserManager(
			this.vfs,
			resolveRootPassword(),
			resolveAutoSudoForNewUsers(),
		);
		this.vfs.restoreMirror().then(() => {
			this.users = new VirtualUserManager(
				this.vfs,
				resolveRootPassword(),
				resolveAutoSudoForNewUsers(),
			);
			this.users.initialize();
		});
	}

	addCommand(
		name: string,
		params: string[],
		callback: (ctx: CommandContext) => CommandResult | Promise<CommandResult>,
	): void {
		const normalized = name.trim().toLowerCase();
		if (normalized.length === 0 || /\s/.test(normalized)) {
			throw new Error("Command name must be non-empty and contain no spaces");
		}

		registerCommand(createCustomCommand(normalized, params, callback));
	}

	executeCommand(rawInput: string, authUser: string, cwd: string): void {
		runCommand(rawInput, authUser, this.hostname, "shell", cwd, this);
	}

	startInteractiveSession(
		stream: ShellStream,
		authUser: string,
		sessionId: string | null,
		remoteAddress: string,
		terminalSize: { cols: number; rows: number },
	): void {
		// Interactive shell logic
		startShell(
			this.properties,
			stream,
			authUser,
			this.hostname,
			sessionId,
			remoteAddress,
			terminalSize,
			this,
		);
	}

	/**
	 * Returns virtual filesystem instance after server started.
	 *
	 * @returns VirtualFileSystem or null when not started.
	 */
	public getVfs(): VirtualFileSystem | null {
		return this?.vfs ?? null;
	}

	/**
	 * Returns user manager instance after server started.
	 *
	 * @returns VirtualUserManager or null when not started.
	 */
	public getUsers(): VirtualUserManager | null {
		return this?.users ?? null;
	}

	/**
	 * Returns hostname shown in prompts and idents.
	 *
	 * @returns Configured hostname label.
	 */
	public getHostname(): string {
		return this?.hostname;
	}
}

export { VirtualShell };
