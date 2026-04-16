import { HoneyPot } from "./Honeypot/index";
import { SshClient } from "./SSHClient/index";
import { SftpMimic, SshMimic } from "./SSHMimic/index";
import VirtualFileSystem from "./VirtualFileSystem/index";
import { VirtualShell } from "./VirtualShell/index";
import { VirtualUserManager } from "./VirtualUserManager/index";

export type {
	AuditLogEntry,
	HoneyPotStats,
} from "./Honeypot/index";
export type {
	CommandContext,
	CommandMode,
	CommandOutcome,
	CommandResult,
	NanoEditorSession,
	ShellModule,
	SudoChallenge,
} from "./types/commands";
export type { ExecStream, ShellStream } from "./types/streams";
export type {
	RemoveOptions,
	VfsBaseNode,
	VfsDirectoryNode,
	VfsFileNode,
	VfsNodeStats,
	VfsNodeType,
	VfsSnapshot,
	VfsSnapshotBaseNode,
	VfsSnapshotDirectoryNode,
	VfsSnapshotFileNode,
	VfsSnapshotNode,
	WriteFileOptions,
} from "./types/vfs";

export {
	HoneyPot,
	SshClient,
	VirtualFileSystem,
	SftpMimic as VirtualSftpServer,
	VirtualShell,
	SshMimic as VirtualSshServer,
	VirtualUserManager,
};

export {
	getArg,
	getFlag,
	ifFlag,
} from "./commands/command-helpers";
