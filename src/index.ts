export { HoneyPot } from "./modules/Honeypot/index";
export { SshClient } from "./modules/SSHClient/index";
export { SftpMimic as VirtualSftpServer, SshMimic as VirtualSshServer } from "./modules/SSHMimic/index";
export type { SftpMimicOptions as VirtualSftpServerOptions } from "./modules/SSHMimic/sftp";
export { default as VirtualFileSystem } from "./modules/VirtualFileSystem/index";
export { VirtualNetworkManager } from "./modules/VirtualNetworkManager";
export type { FirewallRule, VirtualArpEntry, VirtualInterface, VirtualRoute } from "./modules/VirtualNetworkManager";
export { VirtualPackageManager } from "./modules/VirtualPackageManager/index";
export { VirtualProxy } from "./modules/VirtualProxy";
export { IdleManager } from "./modules/VirtualShell/idleManager";
export type { IdleManagerOptions, IdleState } from "./modules/VirtualShell/idleManager";
export { VirtualShell } from "./modules/VirtualShell/index";
export { Baie, VirtualSwitch } from "./modules/VirtualSwitch";
export type { DnsRecord, LoadBalancerRule, LoadBalancerTarget, MacAddress, Packet, PacketResult, TrafficRule, VmPort } from "./modules/VirtualSwitch";
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
	CommandGroup,
	LogicalOp, Pipeline, PipelineCommand, Script, Statement, Subshell
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

export { PacmanGame } from "./modules/pacmanGame";
export type { PacmanGameOptions } from "./modules/pacmanGame";

export { WebTermRenderer } from "./modules/webTermRenderer";
export type { Cell } from "./modules/webTermRenderer";

export { DesktopManager } from "./modules/desktopManager";
export type {
	AboutContent,
	DesktopState,
	DesktopWindow,
	EditorContent,
	TaskManagerContent,
	TerminalContent,
	ThunarContent,
	WindowContent
} from "./modules/desktopManager";

export { ThunarManager } from "./modules/thunarManager";

export { parseScript, parseShellPipeline } from "./modules/VirtualShell/shellParser";

export type { TerminalSize } from "./modules/shellRuntime";
export { shellQuote, toTtyLines, withTerminalSize } from "./modules/shellRuntime";

export { R_OK, W_OK, X_OK } from "./modules/VirtualFileSystem/permissions";
export { enforceAccess, enforcePathTraversal, enforceDelete, enforceChown, enforceChmod, isExecutable } from "./modules/VirtualFileSystem/permissions";

export { encodeVfs, decodeVfs, isBinarySnapshot } from "./modules/VirtualFileSystem/binaryPack";

export { loadOrCreateHostKey } from "./modules/SSHMimic/hostKey";
export { buildLoginBanner } from "./modules/SSHMimic/loginBanner";
export type { LoginBannerState } from "./modules/SSHMimic/loginBanner";
export { handleScp, runScpSink, runScpSource } from "./modules/SSHMimic/scp";
export { runExec } from "./modules/SSHMimic/exec";

export { bootstrapLinuxRootfs, getStaticRootfsSnapshot, syncEtcPasswd, refreshProc } from "./modules/linuxRootfs";

export { resolvePath, resolveReadablePath, assertPathAccess, checkFilePermission } from "./commands/helpers";

export { globToRegex } from "./utils/glob";
export { tokenizeCommand } from "./utils/tokenize";
export { expandBraces, expandSync, expandAsync, expandGlob, evalArith } from "./utils/expand";
export { keyToBytes } from "./utils/keyToBytes";
export { loadHistory, saveHistory, readLastLogin, writeLastLogin, listPathCompletions } from "./utils/shellSession";
export type { LastLogin } from "./utils/shellSession";

export { parseArgs, getArg, getFlag, ifFlag } from "./commands/command-helpers";
export type { ArgParseOptions } from "./commands/command-helpers";

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

export { SIGNALS, resolveSignal, signalDefaultAction } from "./modules/VirtualUserManager/signals";
export type { SignalName, SignalHandler } from "./modules/VirtualUserManager/signals";

export type { NeofetchInfo } from "./modules/neofetch";
export type { SysctlState } from "./modules/sysctl";
export type { VirtualShellResourceCaps } from "./modules/VirtualShell";

