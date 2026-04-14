import { runCommand } from './commands';

interface ExecStream {
  write(data: string): void;
  end(): void;
  exit(code: number): void;
  stderr: {
    write(data: string): void;
  };
}

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
