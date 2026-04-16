import { SshClient } from "./SSHClient";
import { type SftpMimic, SshMimic } from "./SSHMimic/index";
import VirtualFileSystem from "./VirtualFileSystem";
import { VirtualShell } from "./VirtualShell";
import { VirtualUserManager } from "./VirtualUserManager";

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
	SshClient,
	VirtualFileSystem,
	VirtualShell,
	SshMimic as VirtualSshServer,
	VirtualUserManager,
	type SftpMimic as VirtualSftpServer,
};

export {
	getArg,
	getFlag,
	ifFlag,
} from "./commands/command-helpers";
