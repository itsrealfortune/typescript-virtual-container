import type { ExecStream } from '../types/streams';
import { runCommand } from './commands';

export function runExec(stream: ExecStream, cmd: string, authUser: string): void {
  const result = runCommand(cmd, authUser, 'exec');

  if (result.stdout) {
    stream.write(`${result.stdout}\n`);
  }

  if (result.stderr) {
    stream.stderr.write(`${result.stderr}\n`);
  }

  stream.exit(result.exitCode ?? 0);

  stream.end();
}
