import type { ShellModule } from '../../types/commands';
import { joinListWithType, resolvePath } from './helpers';

export const lsCommand: ShellModule = {
  name: 'ls',
  params: ['[path]'],
  run: ({ vfs, cwd, args }) => {
    const targetArg = args.find((arg) => !arg.startsWith('-'));
    const target = resolvePath(cwd, targetArg ?? cwd);
    const items = vfs.list(target).filter((name) => !name.startsWith('.'));
    const rendered = joinListWithType(target, items, (p) => vfs.stat(p));
    return { stdout: rendered, exitCode: 0 };
  }
};
