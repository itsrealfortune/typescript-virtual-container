import * as path from 'node:path';
import type VirtualFileSystem from '../VirtualFileSystem';
import type { ShellStream } from '../types/streams';
import { runCommand } from './commands';
import { buildPrompt } from './prompt';

export function startShell(stream: ShellStream, authUser: string, vfs: VirtualFileSystem): void {
  let lineBuffer = '';
  let cwd = '/virtual-env-js';
  const buildCurrentPrompt = (): string => buildPrompt(authUser, 'typescript-vm', path.posix.basename(cwd) || '/');

  stream.write('Welcome to typescript-vm\r\n');
  stream.write(buildCurrentPrompt());

  stream.on('data', (chunk: Buffer) => {
    const input = chunk.toString('utf8');

    for (const ch of input) {
      if (ch === '\u0004') {
        stream.write('logout\r\n');
        stream.exit(0);
        stream.end();
        return;
      }

      if (ch === '\u0003') {
        lineBuffer = '';
        stream.write('^C\r\n');
        stream.write(buildCurrentPrompt());
        continue;
      }

      if (ch === '\r' || ch === '\n') {
        const line = lineBuffer.trim();
        lineBuffer = '';
        stream.write('\r\n');

        if (line.length > 0) {
          const result = runCommand(line, authUser, 'shell', cwd, vfs);

          if (result.clearScreen) {
            stream.write('\u001b[2J\u001b[H');
          }

          if (result.stdout) {
            stream.write(`${result.stdout}\r\n`);
          }

          if (result.stderr) {
            stream.write(`${result.stderr}\r\n`);
          }

          if (result.closeSession) {
            stream.write('logout\r\n');
            stream.exit(result.exitCode ?? 0);
            stream.end();
            return;
          }

          if (result.nextCwd) {
            cwd = result.nextCwd;
          }
        }

        stream.write(buildCurrentPrompt());
        continue;
      }

      if (ch === '\u007f' || ch === '\b') {
        if (lineBuffer.length > 0) {
          lineBuffer = lineBuffer.slice(0, -1);
          stream.write('\b \b');
        }
        continue;
      }

      lineBuffer += ch;
      stream.write(ch);
    }
  });
}
