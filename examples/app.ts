/** biome-ignore-all lint/suspicious/noControlCharactersInRegex: need to parse ANSI */
import { makeDefaultEnv, runCommand, userHome } from '../src/commands/runtime.js';
import { VirtualShell } from '../src/index.js';
import { type LoginBannerState, buildLoginBanner } from '../src/SSHMimic/loginBanner.js';
import { buildPrompt } from '../src/SSHMimic/prompt.js';
import type { CommandResult } from '../src/types/commands.js';

const HOSTNAME = 'my-vm';
const MAX_HISTORY = 500;

const out = document.getElementById('output') as HTMLElement;
const cmd = document.getElementById('cmd') as HTMLInputElement;
cmd.focus();

// ANSI to HTML
const FG_COLORS: Record<number, string> = {
  30: '#000', 31: '#c00', 32: '#0c0', 33: '#cc0',
  34: '#00c', 35: '#c0c', 36: '#0cc', 37: '#ccc',
  90: '#555', 91: '#f55', 92: '#5f5', 93: '#ff5',
  94: '#55f', 95: '#f5f', 96: '#5ff', 97: '#fff',
};
const BG_COLORS: Record<number, string> = {
  40: '#000', 41: '#c00', 42: '#0c0', 43: '#cc0',
  44: '#00c', 45: '#c0c', 46: '#0cc', 47: '#ccc',
};

function ansiToHtml(s: string): string {
  let html = '';
  let bold = false, fg = '', bg = '';
  for (const part of s.split(/(\x1b\[[0-9;]*m)/)) {
    const m = part.match(/^\x1b\[([0-9;]*)m$/);
    if (m) {
      for (const code of m[1].split(';').map(Number)) {
        if (code === 0) { bold = false; fg = ''; bg = ''; }
        else if (code === 1) bold = true;
        else if (FG_COLORS[code]) fg = FG_COLORS[code];
        else if (BG_COLORS[code]) bg = BG_COLORS[code];
      }
    } else if (part) {
      const style = [
        fg ? `color:${fg}` : '',
        bg ? `background:${bg}` : '',
        bold ? 'font-weight:bold' : '',
      ].filter(Boolean).join(';');
      const escaped = part.replace(/&/g, '&amp;').replace(/</g, '&lt;');
      html += style ? `<span style="${style}">${escaped}</span>` : escaped;
    }
  }
  return html;
}

function print(s: string): void {
  out.innerHTML += ansiToHtml(s);
  out.scrollTop = out.scrollHeight;
}

function printPrompt(): void {
  const cwdLabel = cwd === userHome(authUser) ? '~' : (cwd.split('/').at(-1) || '/');
  out.innerHTML += ansiToHtml(buildPrompt(authUser, HOSTNAME, cwdLabel));
  out.scrollTop = out.scrollHeight;
}

// Wait for IndexedDB fs shim to preload memCache before any existsSync call
// biome-ignore lint/suspicious/noExplicitAny: globalThis shim readiness
await (globalThis as any).__fsReady__;

// Shell
const shell = new VirtualShell(HOSTNAME, undefined, {
  mode: 'fs',
  snapshotPath: '/vfs-data',
  flushIntervalMs: 10_000,
});

const vfs = shell.vfs;

// Bootstrap strategy:
//   1. restoreMirror — loads snapshot from IndexedDB-backed fs shim into VFS
//   2. Only ensureInitialized if /bin missing (true first run, not a reload)
await vfs.restoreMirror();

const isFirstRun = !vfs.exists('/bin');
if (isFirstRun) {
  await shell.ensureInitialized();
  if (!vfs.exists('/root')) vfs.mkdir('/root', 0o700);
  vfs.writeFile('/root/README.txt', `Welcome to ${HOSTNAME}\n`);
  await vfs.flushMirror();
}

window.addEventListener('beforeunload', () => {
  vfs.flushMirror();
});

// Session state
let authUser = 'root';
let cwd = userHome(authUser);
const shellEnv = makeDefaultEnv(authUser, HOSTNAME);
shellEnv.vars.PWD = cwd;

function applyResult(result: CommandResult): void {
  if (result.switchUser) {
    authUser = result.switchUser;
    cwd = result.nextCwd ?? userHome(authUser);
    shellEnv.vars.USER = authUser;
    shellEnv.vars.LOGNAME = authUser;
    shellEnv.vars.HOME = userHome(authUser);
    shellEnv.vars.PWD = cwd;
  } else if (result.nextCwd) {
    cwd = result.nextCwd;
    shellEnv.vars.PWD = cwd;
  }
}

// History
function historyPath(): string {
  return `${userHome(authUser)}/.bash_history`;
}

function loadHistory(): string[] {
  try {
    if (!vfs.exists(historyPath())) return [];
    return (vfs.readFile(historyPath()) as string)
      .split('\n')
      .map((l: string) => l.trim())
      .filter((l: string) => l.length > 0);
  } catch { return []; }
}

function saveHistory(): void {
  vfs.writeFile(historyPath(), history.length > 0 ? `${history.join('\n')}\n` : '');
}

let history: string[] = loadHistory();
let historyIdx = -1;

// Input

function readLastLogin(): LoginBannerState | null {
  try {
    if (!vfs.exists('/root/.lastlog')) return null;
    return JSON.parse(vfs.readFile('/root/.lastlog'));
  } catch { return null; }
}

function writeLastLogin(): void {
  vfs.writeFile('/root/.lastlog', JSON.stringify({
    at: new Date().toISOString(),
    from: 'browser',
  }));
}

const banner = buildLoginBanner(HOSTNAME, shell.properties, readLastLogin());
print(banner);
writeLastLogin();
await vfs.flushMirror();
printPrompt();

cmd.addEventListener('keydown', async (e: KeyboardEvent) => {
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIdx < history.length - 1) {
      historyIdx++;
      cmd.value = history[history.length - 1 - historyIdx];
    }
    return;
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIdx > 0) {
      historyIdx--;
      cmd.value = history[history.length - 1 - historyIdx];
    } else {
      historyIdx = -1;
      cmd.value = '';
    }
    return;
  }

  if (e.key !== 'Enter') return;

  const value = cmd.value.trim();
  cmd.value = '';
  historyIdx = -1;

  print(`${value}\n`);

  if (value) {
    history.push(value);
    if (history.length > MAX_HISTORY) history = history.slice(history.length - MAX_HISTORY);
    saveHistory();
  }

  try {
    const result = await runCommand(
      value,
      authUser,
      HOSTNAME,
      'shell',
      cwd,
      shell,
      undefined,
      shellEnv,
    );

    if (result.clearScreen) out.innerHTML = '';
    if (result.stdout) print(result.stdout);
    if (result.stderr) print(result.stderr);

    applyResult(result);
    await vfs.flushMirror();

    if (result.closeSession) {
      print('\nSession closed.\n');
      return;
    }
  } catch (err) {
    print(`${String(err)}\n`);
  }

  printPrompt();
});