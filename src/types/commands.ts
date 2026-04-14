export type CommandMode = 'shell' | 'exec';

import type VirtualFileSystem from '../VirtualFileSystem';

export interface CommandResult {
  stdout?: string;
  stderr?: string;
  clearScreen?: boolean;
  closeSession?: boolean;
  exitCode?: number;
  nextCwd?: string;
}

export interface CommandContext {
  authUser: string;
  rawInput: string;
  mode: CommandMode;
  args: string[];
  cwd: string;
  vfs: VirtualFileSystem;
}

export interface ShellModule {
  name: string;
  params: string[];
  run: (ctx: CommandContext) => CommandResult | Promise<CommandResult>;
  aliases?: string[];
}

export type CommandOutcome = CommandResult | Promise<CommandResult>;
