export { HoneyPot } from "./modules/Honeypot/index";
export { SshClient } from "./modules/SSHClient/index";
export { SftpMimic as VirtualSftpServer, SshMimic as VirtualSshServer } from "./modules/SSHMimic/index";
export type { SftpMimicOptions as VirtualSftpServerOptions } from "./modules/SSHMimic/sftp";
export { default as VirtualFileSystem } from "./modules/VirtualFileSystem/index";
export { VirtualNetworkManager } from "./modules/VirtualNetworkManager";
export type { VirtualArpEntry, VirtualInterface, VirtualRoute } from "./modules/VirtualNetworkManager";
export { VirtualPackageManager } from "./modules/VirtualPackageManager/index";
export { VirtualProxy } from "./modules/VirtualProxy";
export { IdleManager } from "./modules/VirtualShell/idleManager";
export type { IdleManagerOptions, IdleState } from "./modules/VirtualShell/idleManager";
export { VirtualShell } from "./modules/VirtualShell/index";
export { Baie, VirtualSwitch } from "./modules/VirtualSwitch";
export type { DnsRecord, LoadBalancerRule, MacAddress, Packet, PacketResult, TrafficRule, VmPort } from "./modules/VirtualSwitch";
export { VirtualUserManager } from "./modules/VirtualUserManager/index";
export type { ProcessStatus, VirtualActiveSession, VirtualProcess, VirtualUserRecord } from "./modules/VirtualUserManager/index";
export { VirtualVpn } from "./modules/VirtualVpn";
export type { VpnOptions } from "./modules/VirtualVpn";

export type {
	AuditLogEntry,
	HoneyPotStats
} from "./modules/Honeypot/index";
export type { VfsOptions, VfsPersistenceMode } from "./modules/VirtualFileSystem/index";
export type { ShellProperties, VirtualShellVfsLike, VirtualShellVfsOptions } from "./modules/VirtualShell/index";
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
export type {
	LogicalOp, Pipeline, PipelineCommand, Script, Statement
} from "./types/pipeline";
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

export { NanoEditor } from "./modules/nanoEditor";
export type { NanoEditorOptions, NanoExitReason } from "./modules/nanoEditor";

export { parseArgs } from "./commands/command-helpers";

export { createPerfLogger } from "./utils/perfLogger";
export type { PerfLogger } from "./utils/perfLogger";

export type {
	InstalledPackage, PackageDefinition,
	PackageFile
} from "./modules/VirtualPackageManager/index";

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

