export type CommandMode = 'shell' | 'exec';

export interface CommandResult {
  stdout?: string;
  stderr?: string;
  clearScreen?: boolean;
  closeSession?: boolean;
  exitCode?: number;
}

export interface CommandContext {
  authUser: string;
  rawInput: string;
  mode: CommandMode;
  args: string[];
}

export interface ShellModule {
  name: string;
  params: string[];
  run: (ctx: CommandContext) => CommandResult;
  aliases?: string[];
}
