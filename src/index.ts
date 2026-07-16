export { getArg, getFlag, ifFlag, parseArgs } from "./commands/command-helpers";
export type { ArgParseOptions } from "./commands/command-helpers";
export {
	assertPathAccess,
	checkFilePermission,
	resolvePath,
	resolveReadablePath,
} from "./commands/helpers";
export { DesktopManager } from "./modules/desktopManager";
export type {
	AboutContent,
	DesktopState,
	DesktopWindow,
	EditorContent,
	TaskManagerContent,
	TerminalContent,
	ThunarContent,
	WindowContent,
} from "./modules/desktopManager";
export { HoneyPot } from "./modules/Honeypot/index";
export type {
	AuditLogEntry,
	HoneyPotStats,
} from "./modules/Honeypot/index";
export {
	bootstrapLinuxRootfs,
	getStaticRootfsSnapshot,
	refreshProc,
	syncEtcPasswd,
} from "./modules/linuxRootfs";
export { NanoEditor } from "./modules/nanoEditor";
export type { NanoEditorOptions, NanoExitReason } from "./modules/nanoEditor";
export type { NeofetchInfo } from "./modules/neofetch";
export { PacmanGame } from "./modules/pacmanGame";
export type { PacmanGameOptions } from "./modules/pacmanGame";
export {
	shellQuote,
	toTtyLines,
	withTerminalSize,
} from "./modules/shellRuntime";
export type { TerminalSize } from "./modules/shellRuntime";
export { SandboxedShell } from "./modules/SandboxedShell/index";
export type {
	SandboxedShellOptions,
	ExecResult,
} from "./modules/SandboxedShell/index";
export { SshClient } from "./modules/SSHClient/index";
export { runExec } from "./modules/SSHMimic/exec";
export { loadOrCreateHostKey } from "./modules/SSHMimic/hostKey";
export {
	SftpMimic as VirtualSftpServer,
	SshMimic as VirtualSshServer,
} from "./modules/SSHMimic/index";
export { buildLoginBanner } from "./modules/SSHMimic/loginBanner";
export type { LoginBannerState } from "./modules/SSHMimic/loginBanner";
export { handleScp, runScpSink, runScpSource } from "./modules/SSHMimic/scp";
export type { SftpMimicOptions as VirtualSftpServerOptions } from "./modules/SSHMimic/sftp";
export type { SysctlState } from "./modules/sysctl";
export { ThunarManager } from "./modules/thunarManager";
export {
	decodeVfs,
	encodeVfs,
	forkDirTree,
	isBinarySnapshot,
} from "./modules/VirtualFileSystem/binaryPack";
export {
	FileCache,
	HDD_DISK_IO,
	NVME_DISK_IO,
} from "./modules/VirtualFileSystem/fileCache";
export type {
	CacheEvictionPolicy,
	CacheStats,
	DiskIoParams,
	FileCacheOptions,
} from "./modules/VirtualFileSystem/fileCache";
export { default as VirtualFileSystem } from "./modules/VirtualFileSystem/index";
export type {
	VfsOptions,
	VfsPersistenceMode,
} from "./modules/VirtualFileSystem/index";
export { JournalOp } from "./modules/VirtualFileSystem/journal";
export {
	enforceAccess,
	enforceChmod,
	enforceChown,
	enforceDelete,
	enforcePathTraversal,
	isExecutable,
	R_OK,
	resolveEffectiveGid,
	resolveEffectiveUid,
	W_OK,
	X_OK,
} from "./modules/VirtualFileSystem/permissions";
export { SwapStore } from "./modules/VirtualFileSystem/swapStore";
export type { SwapStats } from "./modules/VirtualFileSystem/swapStore";
export {
	randomMac,
	VirtualNetworkManager,
} from "./modules/VirtualNetworkManager";
export type {
	ConntrackEntry,
	FirewallRule,
	PolicyRule,
	RoutingTable,
	VirtualArpEntry,
	VirtualInterface,
	VirtualRoute,
} from "./modules/VirtualNetworkManager";
export { VirtualPackageManager } from "./modules/VirtualPackageManager/index";
export type {
	InstalledPackage,
	PackageDefinition,
	PackageFile,
} from "./modules/VirtualPackageManager/index";
export { VirtualProxy } from "./modules/VirtualProxy";
export { IdleManager } from "./modules/VirtualShell/idleManager";
export type {
	GcStats,
	IdleManagerOptions,
	IdleState,
} from "./modules/VirtualShell/idleManager";
export { VirtualShell } from "./modules/VirtualShell/index";
export type {
	ShellProperties,
	VirtualShellResourceCaps,
	VirtualShellVfsLike,
	VirtualShellVfsOptions,
} from "./modules/VirtualShell/index";
export {
	parseScript,
	parseShellPipeline,
} from "./modules/VirtualShell/shellParser";
export { Baie, VirtualSwitch } from "./modules/VirtualSwitch";
export type {
	DnsRecord,
	LoadBalancerRule,
	LoadBalancerTarget,
	MacAddress,
	Packet,
	PacketResult,
	TrafficRule,
	VmPort,
} from "./modules/VirtualSwitch";
export {
	ProcessScheduler,
	VirtualUserManager,
} from "./modules/VirtualUserManager/index";
export type {
	ProcessPriority,
	ProcessStatus,
	SchedulerAction,
	SchedulerConfig,
	SchedulerStats,
	VirtualActiveSession,
	VirtualProcess,
	VirtualUserRecord,
} from "./modules/VirtualUserManager/index";
export {
	resolveSignal,
	signalDefaultAction,
	SIGNALS,
} from "./modules/VirtualUserManager/signals";
export type {
	SignalHandler,
	SignalName,
} from "./modules/VirtualUserManager/signals";
export { VirtualVpn } from "./modules/VirtualVpn";
export type { VpnOptions } from "./modules/VirtualVpn";
export { WebTermRenderer } from "./modules/webTermRenderer";
export type { Cell } from "./modules/webTermRenderer";
export type {
	CommandContext,
	CommandMode,
	CommandOutcome,
	CommandResult,
	NanoEditorSession,
	PasswordChallenge,
	ShellEnv,
	ShellModule,
	SudoChallenge,
} from "./types/commands";
export type {
	CommandGroup,
	LogicalOp,
	Pipeline,
	PipelineCommand,
	Script,
	Statement,
	Subshell,
} from "./types/pipeline";
export type { ExecStream, ShellStream } from "./types/streams";
export type {
	MountOptions,
	MountPoint,
	RemoveOptions,
	VfsBaseNode,
	VfsCacheEvictionPolicy,
	VfsCacheOptions,
	VfsCacheStats,
	VfsDeviceNode,
	VfsDirectoryNode,
	VfsDiskIoParams,
	VfsFileNode,
	VfsNodeStats,
	VfsNodeType,
	VfsSnapshot,
	VfsSnapshotBaseNode,
	VfsSnapshotDeviceNode,
	VfsSnapshotDirectoryNode,
	VfsSnapshotFileNode,
	VfsSnapshotNode,
	WriteFileOptions,
} from "./types/vfs";
export {
	evalArith,
	expandAsync,
	expandBraces,
	expandGlob,
	expandSync,
} from "./utils/expand";
export { globToRegex } from "./utils/glob";
export { keyToBytes } from "./utils/keyToBytes";
export { createPerfLogger } from "./utils/perfLogger";
export type { PerfLogger } from "./utils/perfLogger";
export {
	listPathCompletions,
	loadHistory,
	readLastLogin,
	saveHistory,
	writeLastLogin,
} from "./utils/shellSession";
export type { LastLogin } from "./utils/shellSession";
export { tokenizeCommand } from "./utils/tokenize";
export {
	assertDiff,
	diffSnapshots,
	formatDiff,
} from "./utils/vfsDiff";
export type { VfsDiff, VfsDiffEntry, VfsDiffModified } from "./utils/vfsDiff";

/**
 * WebSocket shell server — bridges a browser terminal to VirtualShell.
 * See {@link VirtualWebSocketServer} for full documentation.
 * @module
 */
export { VirtualWebSocketServer } from "./modules/WebSocketShell/wsServer";
export type { VirtualWebSocketServerOptions } from "./modules/WebSocketShell/wsServer";
