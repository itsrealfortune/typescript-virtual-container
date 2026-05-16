export { HoneyPot } from "./Honeypot/index";
export { SshClient } from "./SSHClient/index";
export { SftpMimic as VirtualSftpServer, SshMimic as VirtualSshServer } from "./SSHMimic/index";
export type { SftpMimicOptions as VirtualSftpServerOptions } from "./SSHMimic/sftp";
export { default as VirtualFileSystem } from "./VirtualFileSystem/index";
export { VirtualPackageManager } from "./VirtualPackageManager/index";
export { VirtualNetworkManager } from "./modules/VirtualNetworkManager";
export type { VirtualInterface, VirtualRoute, VirtualArpEntry } from "./modules/VirtualNetworkManager";
export { VirtualShell } from "./VirtualShell/index";
export { VirtualUserManager } from "./VirtualUserManager/index";
export type { VirtualActiveSession, VirtualProcess, VirtualUserRecord, ProcessStatus } from "./VirtualUserManager/index";
export { IdleManager } from "./VirtualShell/idleManager";
export type { IdleManagerOptions, IdleState } from "./VirtualShell/idleManager";

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
	PasswordChallenge,
	ShellEnv,
	ShellModule,
	SudoChallenge
} from "./types/commands";
export type { ExecStream, ShellStream } from "./types/streams";
export type {
	MountOptions,
	MountPoint,
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
export type { ShellProperties, VirtualShellVfsLike, VirtualShellVfsOptions } from "./VirtualShell/index";
export type {
	PipelineCommand,
	Pipeline,
	Statement,
	Script,
	LogicalOp
} from "./types/pipeline";

export { NanoEditor } from "./modules/nanoEditor";
export type { NanoEditorOptions, NanoExitReason } from "./modules/nanoEditor";

export { parseArgs } from "./commands/command-helpers";

export { createPerfLogger } from "./utils/perfLogger";
export type { PerfLogger } from "./utils/perfLogger";

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
export type { ArgParseOptions } from "./commands/command-helpers";

