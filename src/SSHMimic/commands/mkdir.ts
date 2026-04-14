import type { ShellModule } from '../../types/commands';
import { resolvePath } from './helpers';

export const mkdirCommand: ShellModule = {
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
};
