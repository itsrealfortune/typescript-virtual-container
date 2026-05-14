/** biome-ignore-all lint/suspicious/noControlCharactersInRegex: need to parse ANSI */
import { getCommandNames } from '../src/commands/registry.js';
import { makeDefaultEnv, runCommand, userHome } from '../src/commands/runtime.js';
import { VirtualShell } from '../src/index.js';
import { resolvePath } from '../src/modules/shellRuntime.js';
import { type LoginBannerState, buildLoginBanner } from '../src/SSHMimic/loginBanner.js';
import { buildPrompt } from '../src/SSHMimic/prompt.js';
import type { CommandResult } from '../src/types/commands.js';

const HOSTNAME = 'my-vm';
const MAX_HISTORY = 500;

const terminal = document.getElementById('terminal') as HTMLElement;
const out = document.getElementById('output') as HTMLElement;
const cmd = document.getElementById('cmd') as HTMLInputElement;

function scrollToBottom(): void {
  terminal.scrollTop = terminal.scrollHeight;
}

cmd.focus();
document.addEventListener('click', () => {
  if (!window.getSelection()?.toString()) cmd.focus();
});

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

// All output goes into a single <span> appended to #output.
// #output is pre-wrap so \n = newline, no extra divs needed.
function print(s: string): void {
  const span = document.createElement('span');
  span.innerHTML = ansiToHtml(s);
  if (inputLineEl) {
    out.insertBefore(span, inputLineEl);
  } else {
    out.appendChild(span);
  }
  scrollToBottom();
}

// Live input line — sits at bottom of #output as an inline element
let inputLineEl: HTMLSpanElement | null = null;

function printPrompt(): void {
  if (inputLineEl) { inputLineEl.remove(); inputLineEl = null; }
  cmd.value = '';

  inputLineEl = document.createElement('span');
  inputLineEl.className = 'input-line';

  const promptSpan = document.createElement('span');
  const cwdLabel = cwd === userHome(authUser) ? '~' : (cwd.split('/').at(-1) || '/');
  promptSpan.innerHTML = ansiToHtml(buildPrompt(authUser, HOSTNAME, cwdLabel));

  const textSpan = document.createElement('span');
  textSpan.className = 'typed';

  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  cursor.textContent = '\u00a0';

  inputLineEl.appendChild(promptSpan);
  inputLineEl.appendChild(textSpan);
  inputLineEl.appendChild(cursor);
  out.appendChild(inputLineEl);
  scrollToBottom();
}

cmd.addEventListener('input', () => {
  if (!inputLineEl) return;
  (inputLineEl.querySelector('.typed') as HTMLSpanElement).textContent = cmd.value;
  scrollToBottom();
});

// Wait for IndexedDB fs shim memCache
// biome-ignore lint/suspicious/noExplicitAny: globalThis shim
await (globalThis as any).__fsReady__;

const shell = new VirtualShell(HOSTNAME, undefined, {
  mode: 'fs',
  snapshotPath: '/vfs-data',
  flushIntervalMs: 10_000,
});

const vfs = shell.vfs;

await vfs.restoreMirror();

const isFirstRun = !vfs.exists('/bin');
if (isFirstRun) {
  await shell.ensureInitialized();
  if (!vfs.exists('/root')) vfs.mkdir('/root', 0o700);
  vfs.writeFile('/root/README.txt', `Welcome to ${HOSTNAME}\n`);
  await vfs.flushMirror();
}

window.addEventListener('beforeunload', () => { vfs.flushMirror(); });

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
function historyPath(): string { return `${userHome(authUser)}/.bash_history`; }

function loadHistory(): string[] {
  try {
    if (!vfs.exists(historyPath())) return [];
    return (vfs.readFile(historyPath()) as string)
      .split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 0);
  } catch { return []; }
}

function saveHistory(): void {
  vfs.writeFile(historyPath(), history.length > 0 ? `${history.join('\n')}\n` : '');
}

let history: string[] = loadHistory();
let historyIdx = -1;

// Login banner + lastlog
function readLastLogin(): LoginBannerState | null {
  try {
    if (!vfs.exists('/root/.lastlog')) return null;
    return JSON.parse(vfs.readFile('/root/.lastlog'));
  } catch { return null; }
}

function writeLastLogin(): void {
  vfs.writeFile('/root/.lastlog', JSON.stringify({ at: new Date().toISOString(), from: 'browser' }));
}

print(buildLoginBanner(HOSTNAME, shell.properties, readLastLogin()));
writeLastLogin();
await vfs.flushMirror();
printPrompt();


// Tab completion
function listPathCompletions(prefix: string): string[] {
  const slashIndex = prefix.lastIndexOf('/');
  const dirPart  = slashIndex >= 0 ? prefix.slice(0, slashIndex + 1) : '';
  const namePart = slashIndex >= 0 ? prefix.slice(slashIndex + 1)    : prefix;
  const basePath = resolvePath(cwd, dirPart || '.');
  try {
    return vfs.list(basePath)
      .filter((e: string) => !e.startsWith('.') && e.startsWith(namePart))
      .map((e: string) => {
        const fullPath = `${basePath}/${e}`.replace(/\/+/g, '/');
        const st = vfs.stat(fullPath);
        return `${dirPart}${e}${st.type === 'directory' ? '/' : ''}`;
      })
      .sort();
  } catch { return []; }
}

const commandNames = Array.from(new Set(getCommandNames())).sort();

function getCompletions(line: string): [string[], string] {
  const token = line.split(/\s+/).at(-1) ?? '';
  const isFirstToken = line.trimStart() === token;
  const cmdHits  = isFirstToken ? commandNames.filter(n => n.startsWith(token)) : [];
  const pathHits = listPathCompletions(token);
  const hits = Array.from(new Set([...cmdHits, ...pathHits])).sort();
  return [hits, token];
}

// Input handler
cmd.addEventListener('keydown', async (e: KeyboardEvent) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const line = cmd.value;
    const [hits, token] = getCompletions(line);
    if (hits.length === 0) return;
    if (hits.length === 1) {
      // Unique match — complete inline
      cmd.value = line.slice(0, line.length - token.length) + hits[0];
      if (inputLineEl) (inputLineEl.querySelector('.typed') as HTMLSpanElement).textContent = cmd.value;
    } else {
      // Multiple matches — print them below current line, re-prompt
      const prevLine = inputLineEl;
      inputLineEl = null;
      prevLine?.querySelector('.cursor')?.remove();
      out.appendChild(document.createTextNode('\n'));
      print(`${hits.join('  ')}
`);
      printPrompt();
      cmd.value = line;
      if (inputLineEl) ((inputLineEl as HTMLSpanElement).querySelector('.typed') as HTMLSpanElement).textContent = cmd.value;
    }
    return;
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIdx < history.length - 1) {
      historyIdx++;
      cmd.value = history[history.length - 1 - historyIdx];
      if (inputLineEl) (inputLineEl.querySelector('.typed') as HTMLSpanElement).textContent = cmd.value;
    }
    return;
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIdx > 0) { historyIdx--; cmd.value = history[history.length - 1 - historyIdx]; }
    else { historyIdx = -1; cmd.value = ''; }
    if (inputLineEl) (inputLineEl.querySelector('.typed') as HTMLSpanElement).textContent = cmd.value;
    return;
  }

  if (e.key !== 'Enter') return;

  const value = cmd.value.trim();
  historyIdx = -1;

  // Freeze input line: remove cursor span, null the ref (keeps prompt+typed in DOM)
  if (inputLineEl) {
    inputLineEl.querySelector('.cursor')?.remove();
    inputLineEl = null;
  }

  // Newline after the frozen line
  out.appendChild(document.createTextNode('\n'));

  if (value) {
    history.push(value);
    if (history.length > MAX_HISTORY) history = history.slice(history.length - MAX_HISTORY);
    saveHistory();
  }

  try {
    const result = await runCommand(value, authUser, HOSTNAME, 'shell', cwd, shell, undefined, shellEnv);

    if (result.clearScreen) out.innerHTML = '';
    if (result.stdout) print(`${result.stdout.trim()}\n`);
    if (result.stderr) print(`${result.stderr.trim()}\n`);

    applyResult(result);
    await vfs.flushMirror();

    if (result.closeSession) { print('\nSession closed.\n'); return; }
  } catch (err) {
    print(`${String(err)}\n`);
  }

  printPrompt();
});