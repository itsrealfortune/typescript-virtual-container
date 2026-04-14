import * as path from 'node:path';
import type { CommandMode, CommandResult, ShellModule } from '../../types/commands';
import type VirtualFileSystem from '../../VirtualFileSystem';

function resolvePath(cwd: string, inputPath: string): string {
  if (!inputPath || inputPath.trim() === '') {
    return cwd;
  }
  return inputPath.startsWith('/')
    ? path.posix.normalize(inputPath)
    : path.posix.normalize(path.posix.join(cwd, inputPath));
}

function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => Array<number>(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i += 1) {
    dp[i]![0] = i;
  }
  for (let j = 0; j <= b.length; j += 1) {
    dp[0]![j] = j;
  }

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i]![j] = Math.min(
        dp[i - 1]![j]! + 1,
        dp[i]![j - 1]! + 1,
        dp[i - 1]![j - 1]! + cost
      );
    }
  }

  return dp[a.length]![b.length]!;
}

function resolveReadablePath(vfs: VirtualFileSystem, cwd: string, inputPath: string): string {
  const exactPath = resolvePath(cwd, inputPath);
  if (vfs.exists(exactPath)) {
    return exactPath;
  }

  const parent = path.posix.dirname(exactPath);
  const fileName = path.posix.basename(exactPath);
  const siblings = vfs.list(parent);

  const caseInsensitive = siblings.filter((name) => name.toLowerCase() === fileName.toLowerCase());
  if (caseInsensitive.length === 1) {
    return path.posix.join(parent, caseInsensitive[0]!);
  }

  const near = siblings.filter((name) => levenshtein(name.toLowerCase(), fileName.toLowerCase()) <= 1);
  if (near.length === 1) {
    return path.posix.join(parent, near[0]!);
  }

  return exactPath;
}

function joinListWithType(cwd: string, items: string[], statAt: (p: string) => { type: 'file' | 'directory' }): string {
  return items
    .map((name) => {
      const childPath = resolvePath(cwd, name);
      const stats = statAt(childPath);
      return stats.type === 'directory' ? `${name}/` : name;
    })
    .join('  ');
}

const COMMANDS: ShellModule[] = [
  {
    name: 'pwd',
    params: [],
    run: ({ cwd }) => ({ stdout: cwd, exitCode: 0 })
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
    name: 'ls',
    params: ['[path]'],
    run: ({ vfs, cwd, args }) => {
      const target = resolvePath(cwd, args[0] ?? cwd);
      const items = vfs.list(target);
      const rendered = joinListWithType(target, items, (p) => vfs.stat(p));
      return { stdout: rendered, exitCode: 0 };
    }
  },
  {
    name: 'cd',
    params: ['[path]'],
    run: ({ vfs, cwd, args, mode }) => {
      const target = resolvePath(cwd, args[0] ?? '/virtual-env-js');
      const stats = vfs.stat(target);
      if (stats.type !== 'directory') {
        return { stderr: `cd: not a directory: ${target}`, exitCode: 1 };
      }

      if (mode === 'exec') {
        return { exitCode: 0 };
      }

      return { nextCwd: target, exitCode: 0 };
    }
  },
  {
    name: 'cat',
    params: ['<file>'],
    run: ({ vfs, cwd, args }) => {
      const fileArg = args[0];
      if (!fileArg) {
        return { stderr: 'cat: missing file operand', exitCode: 1 };
      }

      const target = resolveReadablePath(vfs, cwd, fileArg);
      return { stdout: vfs.readFile(target), exitCode: 0 };
    }
  },
  {
    name: 'mkdir',
    params: ['<dir>'],
    run: ({ vfs, cwd, args }) => {
      if (args.length === 0) {
        return { stderr: 'mkdir: missing operand', exitCode: 1 };
      }

      for (const dir of args) {
        vfs.mkdir(resolvePath(cwd, dir));
      }
      return { exitCode: 0 };
    }
  },
  {
    name: 'touch',
    params: ['<file>'],
    run: ({ vfs, cwd, args }) => {
      if (args.length === 0) {
        return { stderr: 'touch: missing file operand', exitCode: 1 };
      }

      for (const file of args) {
        const target = resolvePath(cwd, file);
        if (!vfs.exists(target)) {
          vfs.writeFile(target, '');
        }
      }
      return { exitCode: 0 };
    }
  },
  {
    name: 'rm',
    params: ['[-r|-rf] <path>'],
    run: ({ vfs, cwd, args }) => {
      if (args.length === 0) {
        return { stderr: 'rm: missing operand', exitCode: 1 };
      }

      const recursive = args.includes('-r') || args.includes('-rf') || args.includes('-fr');
      const targets = args.filter((arg) => !arg.startsWith('-'));

      if (targets.length === 0) {
        return { stderr: 'rm: missing operand', exitCode: 1 };
      }

      for (const target of targets) {
        vfs.remove(resolvePath(cwd, target), { recursive });
      }

      return { exitCode: 0 };
    }
  },
  {
    name: 'tree',
    params: ['[path]'],
    run: ({ vfs, cwd, args }) => {
      const target = resolvePath(cwd, args[0] ?? cwd);
      return { stdout: vfs.tree(target), exitCode: 0 };
    }
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

export function runCommand(
  rawInput: string,
  authUser: string,
  mode: CommandMode,
  cwd: string,
  vfs: VirtualFileSystem
): CommandResult {
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

  try {
    return mod.run({
      authUser,
      rawInput: trimmed,
      mode,
      args,
      cwd,
      vfs
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Command failed';
    return { stderr: message, exitCode: 1 };
  }
}
