import { HoneyPot } from "./Honeypot/index";
import { SshClient } from "./SSHClient/index";
import { SftpMimic, SshMimic } from "./SSHMimic/index";
import VirtualFileSystem from "./VirtualFileSystem/index";
import { VirtualShell } from "./VirtualShell/index";
import { VirtualUserManager } from "./VirtualUserManager/index";
import { VirtualPackageManager } from "./VirtualPackageManager/index";

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
	ShellEnv,
	ShellModule,
	SudoChallenge,
} from "./types/commands";
export type { ShellProperties } from "./VirtualShell/index";
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
export type { VfsOptions, VfsPersistenceMode } from "./VirtualFileSystem/index";

export type {
	PackageDefinition,
	PackageFile,
	InstalledPackage,
} from "./VirtualPackageManager/index";

export {
	diffSnapshots,
	formatDiff,
	assertDiff,
} from "./utils/vfsDiff";
export type {
	VfsDiff,
	VfsDiffEntry,
	VfsDiffModified,
} from "./utils/vfsDiff";

export {
	HoneyPot,
	SshClient,
	VirtualFileSystem,
	SftpMimic as VirtualSftpServer,
	VirtualShell,
	SshMimic as VirtualSshServer,
	VirtualUserManager,
	VirtualPackageManager,
};

export {
	getArg,
	getFlag,
	ifFlag,
} from "./commands/command-helpers";
