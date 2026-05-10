export { HoneyPot } from "./Honeypot/index";
export { SshClient } from "./SSHClient/index";
export { SftpMimic as VirtualSftpServer, SshMimic as VirtualSshServer } from "./SSHMimic/index";
export { default as VirtualFileSystem } from "./VirtualFileSystem/index";
export { VirtualPackageManager } from "./VirtualPackageManager/index";
export { VirtualShell } from "./VirtualShell/index";
export { VirtualUserManager } from "./VirtualUserManager/index";

export type {
	AuditLogEntry,
	HoneyPotStats
} from "./Honeypot/index";
export type {
	CommandContext,
	CommandMode,
	CommandOutcome,
	CommandResult,
	NanoEditorSession,
	ShellEnv,
	ShellModule,
	SudoChallenge
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
	WriteFileOptions
} from "./types/vfs";
export type { VfsOptions, VfsPersistenceMode } from "./VirtualFileSystem/index";
export type { ShellProperties } from "./VirtualShell/index";

export type {
	InstalledPackage, PackageDefinition,
	PackageFile
} from "./VirtualPackageManager/index";

export {
	assertDiff, diffSnapshots,
	formatDiff
} from "./utils/vfsDiff";
export type {
	VfsDiff,
	VfsDiffEntry,
	VfsDiffModified
} from "./utils/vfsDiff";

export {
	getArg,
	getFlag,
	ifFlag
} from "./commands/command-helpers";

