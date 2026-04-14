import type VirtualFileSystem from '../VirtualFileSystem';
import type { ExecStream } from '../types/streams';
import { runCommand } from './commands';

export function runExec(stream: ExecStream, cmd: string, authUser: string, vfs: VirtualFileSystem): void {
  Promise.resolve(runCommand(cmd, authUser, 'exec', '/home/' + authUser, vfs)).then((result) => {
    if (result.stdout) {
      stream.write(`${result.stdout}\n`);
    }

    if (result.stderr) {
      stream.stderr.write(`${result.stderr}\n`);
    }

    stream.exit(result.exitCode ?? 0);

    stream.end();
  });
}
