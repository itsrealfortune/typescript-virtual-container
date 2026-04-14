import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import { readFile, unlink, writeFile } from 'node:fs/promises';
import * as path from 'node:path';
import type VirtualFileSystem from '../VirtualFileSystem';
import type { ShellStream } from '../types/streams';
import { getCommandNames, runCommand } from './commands';
import { buildPrompt } from './prompt';

interface NanoSession {
  targetPath: string;
  tempPath: string;
  process: ChildProcessWithoutNullStreams;
}

function shellQuote(value: string): string {
  return `'${value.replace(/'/g, `'\\''`)}'`;
}

export function startShell(stream: ShellStream, authUser: string, vfs: VirtualFileSystem): void {
  let lineBuffer = '';
  let cursorPos = 0;
  let history = loadHistory(vfs);
  let historyIndex: number | null = null;
  let historyDraft = '';
  let cwd = '/home/' + authUser;
  let nanoSession: NanoSession | null = null;
  const buildCurrentPrompt = (): string => {
    const homePath = `/home/${authUser}`;
    const cwdLabel = cwd === homePath ? '~' : path.posix.basename(cwd) || '/';
    return buildPrompt(authUser, 'typescript-vm', cwdLabel);
  };
  const commandNames = Array.from(new Set(getCommandNames())).sort();

  function resolvePath(base: string, inputPath: string): string {
    if (!inputPath || inputPath.trim() === '' || inputPath === '.') {
      return base;
    }
    return inputPath.startsWith('/')
      ? path.posix.normalize(inputPath)
      : path.posix.normalize(path.posix.join(base, inputPath));
  }

  function renderLine(): void {
    const prompt = buildCurrentPrompt();
    stream.write(`\r${prompt}${lineBuffer}\u001b[K`);

    const moveLeft = lineBuffer.length - cursorPos;
    if (moveLeft > 0) {
      stream.write(`\u001b[${moveLeft}D`);
    }
  }

  async function finishNanoEditor(): Promise<void> {
    if (!nanoSession) {
      return;
    }

    const activeSession = nanoSession;

    try {
      const updatedContent = await readFile(activeSession.tempPath, 'utf8');
      vfs.writeFile(activeSession.targetPath, updatedContent);
      await vfs.flushMirror();
    } catch {
      // If temp file does not exist, nano exited without writing.
    }

    await unlink(activeSession.tempPath).catch(() => undefined);

    nanoSession = null;
    lineBuffer = '';
    cursorPos = 0;
    stream.write('\r\n');
    renderLine();
  }

  async function startNanoEditor(targetPath: string, initialContent: string, tempPath: string): Promise<void> {
    if (vfs.exists(targetPath)) {
      await writeFile(tempPath, initialContent, 'utf8');
    }

    const command = `nano -- ${shellQuote(tempPath)}`;
    const editor = spawn('script', ['-qfec', command, '/dev/null'], {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: {
        ...process.env,
        TERM: process.env.TERM ?? 'xterm-256color'
      }
    });

    editor.stdout.on('data', (data: Buffer) => {
      stream.write(data.toString('utf8'));
    });

    editor.stderr.on('data', (data: Buffer) => {
      stream.write(data.toString('utf8'));
    });

    editor.on('error', (error: Error) => {
      stream.write(`nano: ${error.message}\r\n`);
      void finishNanoEditor();
    });

    editor.on('close', () => {
      void finishNanoEditor();
    });

    nanoSession = {
      targetPath,
      tempPath,
      process: editor
    };
  }

  function applyHistoryLine(nextLine: string): void {
    lineBuffer = nextLine;
    cursorPos = lineBuffer.length;
    renderLine();
  }

  function insertText(text: string): void {
    lineBuffer = `${lineBuffer.slice(0, cursorPos)}${text}${lineBuffer.slice(cursorPos)}`;
    cursorPos += text.length;
    renderLine();
  }

  function getTokenRange(line: string, cursor: number): { start: number; end: number } {
    let start = cursor;
    while (start > 0 && !/\s/.test(line[start - 1]!)) {
      start -= 1;
    }

    let end = cursor;
    while (end < line.length && !/\s/.test(line[end]!)) {
      end += 1;
    }

    return { start, end };
  }

  function listPathCompletions(prefix: string): string[] {
    const slashIndex = prefix.lastIndexOf('/');
    const dirPart = slashIndex >= 0 ? prefix.slice(0, slashIndex + 1) : '';
    const namePart = slashIndex >= 0 ? prefix.slice(slashIndex + 1) : prefix;
    const basePath = resolvePath(cwd, dirPart || '.');

    try {
      return vfs
        .list(basePath)
        .filter((entry) => !entry.startsWith('.'))
        .filter((entry) => entry.startsWith(namePart))
        .map((entry) => {
          const fullPath = path.posix.join(basePath, entry);
          const st = vfs.stat(fullPath);
          const suffix = st.type === 'directory' ? '/' : '';
          return `${dirPart}${entry}${suffix}`;
        })
        .sort();
    } catch {
      return [];
    }
  }

  function handleTabCompletion(): void {
    const { start, end } = getTokenRange(lineBuffer, cursorPos);
    const token = lineBuffer.slice(start, cursorPos);

    if (token.length === 0) {
      return;
    }

    const firstToken = lineBuffer.slice(0, start).trim().length === 0;
    const commandCandidates = firstToken ? commandNames.filter((name) => name.startsWith(token)) : [];
    const pathCandidates = listPathCompletions(token);
    const candidates = Array.from(new Set([...commandCandidates, ...pathCandidates])).sort();

    if (candidates.length === 0) {
      return;
    }

    if (candidates.length === 1) {
      const completed = candidates[0]!;
      const suffix = completed.endsWith('/') ? '' : ' ';
      lineBuffer = `${lineBuffer.slice(0, start)}${completed}${suffix}${lineBuffer.slice(end)}`;
      cursorPos = start + completed.length + suffix.length;
      renderLine();
      return;
    }

    stream.write('\r\n');
    stream.write(`${candidates.join('  ')}\r\n`);
    renderLine();
  }

  function pushHistory(cmd: string): void {
    if (cmd.length === 0) {
      return;
    }

    history.push(cmd);
    if (history.length > 500) {
      history = history.slice(history.length - 500);
    }

    const data = history.length > 0 ? `${history.join('\n')}\n` : '';
    vfs.writeFile('/virtual-env-js/.bash_history', data);
  }

  stream.write('Welcome to typescript-vm\r\n');
  renderLine();

  stream.on('data', async (chunk: Buffer) => {
    if (nanoSession) {
      nanoSession.process.stdin.write(chunk);
      return;
    }

    const input = chunk.toString('utf8');

    for (let i = 0; i < input.length; i += 1) {
      const ch = input[i]!;

      if (ch === '\u0004') {
        stream.write('logout\r\n');
        stream.exit(0);
        stream.end();
        return;
      }

      if (ch === '\t') {
        handleTabCompletion();
        continue;
      }

      if (ch === '\u001b') {
        const next = input[i + 1];
        const third = input[i + 2];
        const fourth = input[i + 3];

        if (next === '[' && third) {
          if (third === 'A') {
            i += 2;
            if (history.length > 0) {
              if (historyIndex === null) {
                historyDraft = lineBuffer;
                historyIndex = history.length - 1;
              } else if (historyIndex > 0) {
                historyIndex -= 1;
              }
              applyHistoryLine(history[historyIndex] ?? '');
            }
            continue;
          }

          if (third === 'B') {
            i += 2;
            if (historyIndex !== null) {
              if (historyIndex < history.length - 1) {
                historyIndex += 1;
                applyHistoryLine(history[historyIndex] ?? '');
              } else {
                historyIndex = null;
                applyHistoryLine(historyDraft);
              }
            }
            continue;
          }

          if (third === 'C') {
            i += 2;
            if (cursorPos < lineBuffer.length) {
              cursorPos += 1;
              stream.write('\u001b[C');
            }
            continue;
          }

          if (third === 'D') {
            i += 2;
            if (cursorPos > 0) {
              cursorPos -= 1;
              stream.write('\u001b[D');
            }
            continue;
          }

          if (third === '3' && fourth === '~') {
            i += 3;
            if (cursorPos < lineBuffer.length) {
              lineBuffer = `${lineBuffer.slice(0, cursorPos)}${lineBuffer.slice(cursorPos + 1)}`;
              renderLine();
            }
            continue;
          }
        }
      }

      if (ch === '\u0003') {
        lineBuffer = '';
        cursorPos = 0;
        historyIndex = null;
        historyDraft = '';
        stream.write('^C\r\n');
        renderLine();
        continue;
      }

      if (ch === '\r' || ch === '\n') {
        const line = lineBuffer.trim();
        lineBuffer = '';
        cursorPos = 0;
        historyIndex = null;
        historyDraft = '';
        stream.write('\r\n');

        if (line.length > 0) {
          const result = await Promise.resolve(runCommand(line, authUser, 'shell', cwd, vfs));

          pushHistory(line);

          if (result.openEditor) {
            await startNanoEditor(result.openEditor.targetPath, result.openEditor.initialContent, result.openEditor.tempPath);
            return;
          }

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

          await vfs.flushMirror();
        }

        renderLine();
        continue;
      }

      if (ch === '\u007f' || ch === '\b') {
        if (cursorPos > 0) {
          lineBuffer = `${lineBuffer.slice(0, cursorPos - 1)}${lineBuffer.slice(cursorPos)}`;
          cursorPos -= 1;
          renderLine();
        }
        continue;
      }

      insertText(ch);
    }
  });

  stream.on('close', () => {
    if (nanoSession) {
      nanoSession.process.kill('SIGTERM');
      nanoSession = null;
    }
  });
}

function loadHistory(vfs: VirtualFileSystem): string[] {
  const historyPath = '/virtual-env-js/.bash_history';
  if (!vfs.exists(historyPath)) {
    vfs.writeFile(historyPath, '');
    return [];
  }

  const raw = vfs.readFile(historyPath);
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}
