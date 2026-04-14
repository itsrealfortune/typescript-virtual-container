import type { ShellModule } from '../../types/commands';
import { resolvePath } from './helpers';

export const treeCommand: ShellModule = {
  name: 'tree',
  params: ['[path]'],
  run: ({ vfs, cwd, args }) => {
    const target = resolvePath(cwd, args[0] ?? cwd);
    return { stdout: vfs.tree(target), exitCode: 0 };
  }
};