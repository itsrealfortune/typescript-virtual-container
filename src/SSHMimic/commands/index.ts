export type CommandMode = 'shell' | 'exec';

export interface ShellModule {
  name: string;
  params: string[];
  run: (ctx: CommandContext) => CommandResult;
  aliases?: string[];
}

export interface CommandContext {
  authUser: string;
  rawInput: string;
  mode: CommandMode;
  args: string[];
}

export interface CommandResult {
  stdout?: string;
  stderr?: string;
  clearScreen?: boolean;
  closeSession?: boolean;
  exitCode?: number;
}

const COMMANDS: ShellModule[] = [
  {
    name: 'pwd',
    params: [],
    run: () => ({ stdout: '/virtual-env-js', exitCode: 0 })
  },
  {
    name: 'whoami',
    params: [],
    run: ({ authUser }) => ({ stdout: authUser, exitCode: 0 })
  },
  {
    name: 'who',
    params: [],
    run: ({ authUser }) => ({ stdout: `${authUser} pts/0 2026-04-14 10:00 (localhost)`, exitCode: 0 })
  },
  {
    name: 'hostname',
    params: [],
    run: () => ({ stdout: 'typescript-vm', exitCode: 0 })
  },
  {
    name: 'clear',
    params: [],
    run: () => ({ clearScreen: true, exitCode: 0 })
  },
  {
    name: 'help',
    params: [],
    run: () => ({ stdout: `Builtins: ${COMMANDS.map((cmd) => cmd.name).join(' ')}`, exitCode: 0 })
  },
  {
    name: 'exit',
    params: [],
    run: () => ({ closeSession: true, exitCode: 0 })
  }
];

function resolveModule(name: string): ShellModule | undefined {
  const lowered = name.toLowerCase();
  return COMMANDS.find((cmd) => cmd.name === lowered || cmd.aliases?.includes(lowered));
}

function parseInput(rawInput: string): { commandName: string; args: string[] } {
  const parts = rawInput.trim().split(/\s+/).filter(Boolean);
  return {
    commandName: parts[0]?.toLowerCase() ?? '',
    args: parts.slice(1)
  };
}

export function runCommand(rawInput: string, authUser: string, mode: CommandMode): CommandResult {
  const trimmed = rawInput.trim();

  if (trimmed.length === 0) {
    return { exitCode: 0 };
  }

  const { commandName, args } = parseInput(trimmed);
  const mod = resolveModule(commandName);

  if (!mod) {
    return {
      stderr: `Command '${trimmed}' not found`,
      exitCode: 127
    };
  }

  return mod.run({
    authUser,
    rawInput: trimmed,
    mode,
    args
  });
}
