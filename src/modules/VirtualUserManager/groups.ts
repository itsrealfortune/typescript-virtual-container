import type VirtualFileSystem from "../VirtualFileSystem";

/** Persisted group record stored in /etc/group. */
export interface VirtualGroupRecord {
	/** Group name (e.g. "sudo", "users"). */
	name: string;
	/** Numeric group ID. */
	gid: number;
	/** Comma-separated list of supplementary members (password field is always "x"). */
	members: string[];
}

/**
 * Manages Linux-style groups backed by /etc/group in the virtual filesystem.
 *
 * Standard /etc/group format: `name:password:gid:member1,member2,...`
 * The password field is always "x" (shadow passwords are not used for groups).
 *
 * @example
 * ```ts
 * const groups = new VirtualGroupManager(vfs);
 * await groups.initialize();
 *
 * groups.createGroup("developers", 2000);
 * groups.addMember("developers", "alice");
 * groups.addMember("developers", "bob");
 *
 * console.log(groups.getMembers("developers")); // ["alice", "bob"]
 * console.log(groups.getUserGroups("alice"));   // ["alice", "developers"]
 * ```
 */
export class VirtualGroupManager {
	private readonly _groupsPath = "/etc/group";
	private readonly _groups = new Map<string, VirtualGroupRecord>();
	private _nextGid = 2000;

	constructor(private readonly _vfs: VirtualFileSystem) {}

	/**
	 * Loads groups from /etc/group in the virtual filesystem.
	 * Parses standard group file format and populates internal state.
	 */
	public initialize(): void {
		this._loadFromVfs();
		// Ensure essential system groups exist
		this._ensureSystemGroups();
	}

	/**
	 * Creates a new group with an auto-assigned GID.
	 *
	 * @param name Group name.
	 * @param gid Optional explicit GID. Auto-assigned if not provided.
	 * @throws When the group already exists or the name is invalid.
	 */
	public createGroup(name: string, gid?: number): VirtualGroupRecord {
		VirtualGroupManager._validateGroupName(name);
		if (this._groups.has(name)) {
			throw new Error(`groupadd: group '${name}' already exists`);
		}

		const assignedGid = gid ?? this._nextGid++;
		if (gid !== undefined && gid >= this._nextGid) {
			this._nextGid = gid + 1;
		}

		const record: VirtualGroupRecord = { name, gid: assignedGid, members: [] };
		this._groups.set(name, record);
		void this._persist();
		return record;
	}

	/**
	 * Deletes a group. Does not remove users from the system.
	 *
	 * @param name Group name to delete.
	 * @throws When the group does not exist.
	 */
	public deleteGroup(name: string): void {
		if (!this._groups.has(name)) {
			throw new Error(`groupdel: group '${name}' does not exist`);
		}

		this._groups.delete(name);
		void this._persist();
	}

	/**
	 * Adds a user as a supplementary member of a group.
	 *
	 * @param groupName Target group.
	 * @param username User to add.
	 * @throws When the group does not exist or user is already a member.
	 */
	public addMember(groupName: string, username: string): void {
		const group = this._groups.get(groupName);
		if (!group) {
			throw new Error(`gpasswd: group '${groupName}' does not exist`);
		}

		if (group.members.includes(username)) {
			return; // Already a member — idempotent
		}

		group.members.push(username);
		void this._persist();
	}

	/**
	 * Removes a user from a group's supplementary member list.
	 *
	 * @param groupName Target group.
	 * @param username User to remove.
	 * @throws When the group does not exist.
	 */
	public removeMember(groupName: string, username: string): void {
		const group = this._groups.get(groupName);
		if (!group) {
			throw new Error(`gpasswd: group '${groupName}' does not exist`);
		}

		group.members = group.members.filter((m) => m !== username);
		void this._persist();
	}

	/**
	 * Returns the group record by name.
	 *
	 * @param name Group name.
	 * @returns Group record or undefined if not found.
	 */
	public getGroup(name: string): VirtualGroupRecord | undefined {
		return this._groups.get(name);
	}

	/**
	 * Returns the group record by GID.
	 *
	 * @param gid Numeric group ID.
	 * @returns Group record or undefined if not found.
	 */
	public getGroupByGid(gid: number): VirtualGroupRecord | undefined {
		for (const group of this._groups.values()) {
			if (group.gid === gid) {
				return group;
			}
		}
	}

	/**
	 * Resolves a group name to its GID.
	 *
	 * @param name Group name.
	 * @returns GID number, or null if group not found.
	 */
	public getGidByName(name: string): number | null {
		return this._groups.get(name)?.gid ?? null;
	}

	/**
	 * Resolves a GID to its group name.
	 *
	 * @param gid Numeric group ID.
	 * @returns Group name, or null if GID not found.
	 */
	public getNameByGid(gid: number): string | null {
		for (const group of this._groups.values()) {
			if (group.gid === gid) {
				return group.name;
			}
		}
		return null;
	}

	/**
	 * Returns all supplementary members of a group.
	 *
	 * @param name Group name.
	 * @returns Array of usernames.
	 */
	public getMembers(name: string): string[] {
		return this._groups.get(name)?.members ?? [];
	}

	/**
	 * Returns all groups a user belongs to (by supplementary membership).
	 * Does NOT include the user's primary group — use separately.
	 *
	 * @param username Target user.
	 * @returns Array of group names.
	 */
	public getUserSupplementaryGroups(username: string): string[] {
		const result: string[] = [];
		for (const group of this._groups.values()) {
			if (group.members.includes(username)) {
				result.push(group.name);
			}
		}
		return result;
	}

	/**
	 * Returns all groups a user belongs to, including their primary group.
	 *
	 * @param username Target user.
	 * @param primaryGid User's primary GID (from VirtualUserManager).
	 * @returns Array of group names sorted alphabetically.
	 */
	public getUserAllGroups(username: string, primaryGid: number): string[] {
		const groups = new Set<string>();
		// Add primary group
		const primaryGroup = this.getGroupByGid(primaryGid);
		if (primaryGroup) {
			groups.add(primaryGroup.name);
		}
		// Add supplementary groups
		for (const group of this._groups.values()) {
			if (group.members.includes(username)) {
				groups.add(group.name);
			}
		}
		return Array.from(groups).sort();
	}

	/**
	 * Checks if a user is a member of a specific group.
	 *
	 * @param username Target user.
	 * @param groupName Target group.
	 * @param primaryGid User's primary GID (for primary group check).
	 * @returns True if user is a member (primary or supplementary).
	 */
	public isMemberOf(
		username: string,
		groupName: string,
		primaryGid: number,
	): boolean {
		const group = this._groups.get(groupName);
		if (!group) {
			return false;
		}
		// Check primary group match
		if (group.gid === primaryGid) {
			return true;
		}
		// Check supplementary membership
		return group.members.includes(username);
	}

	/**
	 * Returns all registered groups sorted by name.
	 *
	 * @returns Array of VirtualGroupRecord sorted by name.
	 */
	public listGroups(): VirtualGroupRecord[] {
		return Array.from(this._groups.values()).sort((a, b) =>
			a.name.localeCompare(b.name),
		);
	}

	/**
	 * Generates the /etc/group file content in standard Linux format.
	 *
	 * Format: `name:password:gid:member1,member2,...`
	 *
	 * @returns File content string.
	 */
	public generateGroupFile(): string {
		return this.listGroups()
			.map((g) => `${g.name}:x:${g.gid}:${g.members.join(",")}`)
			.join("\n");
	}

	/**
	 * Persists the current group state to /etc/group in the VFS.
	 */
	private _persist(): void {
		const content = this.generateGroupFile();
		this._vfs.writeFile(
			this._groupsPath,
			content.length > 0 ? `${content}\n` : "",
			{ mode: 0o644 },
		);
	}

	/**
	 * Loads groups from the VFS /etc/group file.
	 * Parses standard format: `name:password:gid:members`
	 */
	private _loadFromVfs(): void {
		this._groups.clear();

		if (!this._vfs.exists(this._groupsPath)) {
			return;
		}

		const raw = this._vfs.readFile(this._groupsPath);
		for (const line of raw.split("\n")) {
			const trimmed = line.trim();
			if (trimmed.length === 0 || trimmed.startsWith("#")) {
				continue;
			}

			const parts = trimmed.split(":");
			if (parts.length < 4) {
				continue;
			}

			const [name, _password, gidStr, membersStr] = parts;
			if (!(name && gidStr)) {
				continue;
			}

			const gid = Number.parseInt(gidStr, 10);
			if (!Number.isFinite(gid) || gid < 0) {
				continue;
			}

			const members = membersStr
				? membersStr.split(",").filter((m) => m.length > 0)
				: [];
			this._groups.set(name, { name, gid, members });

			if (gid >= this._nextGid) {
				this._nextGid = gid + 1;
			}
		}
	}

	/**
	 * Ensures essential system groups exist (mimicking a standard Linux install).
	 * These are created only if not already present from the VFS.
	 */
	private _ensureSystemGroups(): void {
		const systemGroups: Array<{ name: string; gid: number }> = [
			{ name: "root", gid: 0 },
			{ name: "daemon", gid: 1 },
			{ name: "bin", gid: 2 },
			{ name: "sys", gid: 3 },
			{ name: "adm", gid: 4 },
			{ name: "tty", gid: 5 },
			{ name: "disk", gid: 6 },
			{ name: "lp", gid: 7 },
			{ name: "mail", gid: 8 },
			{ name: "news", gid: 9 },
			{ name: "uucp", gid: 10 },
			{ name: "man", gid: 12 },
			{ name: "proxy", gid: 13 },
			{ name: "kmem", gid: 15 },
			{ name: "dialout", gid: 20 },
			{ name: "fax", gid: 21 },
			{ name: "voice", gid: 22 },
			{ name: "cdrom", gid: 24 },
			{ name: "floppy", gid: 25 },
			{ name: "tape", gid: 26 },
			{ name: "sudo", gid: 27 },
			{ name: "audio", gid: 29 },
			{ name: "dip", gid: 30 },
			{ name: "www-data", gid: 33 },
			{ name: "backup", gid: 34 },
			{ name: "operator", gid: 37 },
			{ name: "list", gid: 38 },
			{ name: "irc", gid: 39 },
			{ name: "src", gid: 40 },
			{ name: "shadow", gid: 42 },
			{ name: "utmp", gid: 43 },
			{ name: "video", gid: 44 },
			{ name: "sasl", gid: 45 },
			{ name: "plugdev", gid: 46 },
			{ name: "staff", gid: 50 },
			{ name: "games", gid: 60 },
			{ name: "users", gid: 100 },
			{ name: "nogroup", gid: 65534 },
		];

		for (const { name, gid } of systemGroups) {
			if (!this._groups.has(name)) {
				this._groups.set(name, { name, gid, members: [] });
				if (gid >= this._nextGid) {
					this._nextGid = gid + 1;
				}
			}
		}
	}

	private static _validateGroupName(name: string): void {
		if (!name || name.trim() === "") {
			throw new Error("invalid group name");
		}

		if (!/^[a-z_][a-z0-9_-]{0,31}$/i.test(name)) {
			throw new Error(`invalid group name '${name}'`);
		}
	}
}
