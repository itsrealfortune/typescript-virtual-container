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

// ANSI to HTML — supports 8-color, 16-color, 256-color, 24-bit RGB
const ANSI_FG: Record<number, string> = {
  30: '#000', 31: '#c00', 32: '#0c0', 33: '#cc0',
  34: '#00c', 35: '#c0c', 36: '#0cc', 37: '#ccc',
  90: '#555', 91: '#f55', 92: '#5f5', 93: '#ff5',
  94: '#55f', 95: '#f5f', 96: '#5ff', 97: '#fff',
};
const ANSI_BG: Record<number, string> = {
  40: '#000', 41: '#c00', 42: '#0c0', 43: '#cc0',
  44: '#00c', 45: '#c0c', 46: '#0cc', 47: '#ccc',
  100: '#555', 101: '#f55', 102: '#5f5', 103: '#ff5',
  104: '#55f', 105: '#f5f', 106: '#5ff', 107: '#fff',
};

// xterm 256-color palette (first 16 = ANSI, 16-231 = 6x6x6 cube, 232-255 = grayscale)
function xterm256(n: number): string {
  if (n < 16) {
    const basic = [...Object.values(ANSI_FG)];
    return basic[n] ?? '#ccc';
  }
  if (n < 232) {
    const i = n - 16;
    const r = Math.floor(i / 36) * 51;
    const g = Math.floor((i % 36) / 6) * 51;
    const b = (i % 6) * 51;
    return `rgb(${r},${g},${b})`;
  }
  const v = 8 + (n - 232) * 10;
  return `rgb(${v},${v},${v})`;
}

function ansiToHtml(s: string): string {
  let html = '';
  let bold = false, fg = '', bg = '';
  for (const part of s.split(/(\x1b\[[0-9;]*m)/)) {
    const m = part.match(/^\x1b\[([0-9;]*)m$/);
    if (m) {
      const codes = m[1].split(';').map(Number);
      let i = 0;
      while (i < codes.length) {
        const code = codes[i]!;
        if (code === 0) { bold = false; fg = ''; bg = ''; }
        else if (code === 1) bold = true;
        else if (code === 38 && codes[i + 1] === 2) {
          // 24-bit fg: 38;2;R;G;B
          fg = `rgb(${codes[i+2]},${codes[i+3]},${codes[i+4]})`;
          i += 4;
        } else if (code === 48 && codes[i + 1] === 2) {
          // 24-bit bg: 48;2;R;G;B
          bg = `rgb(${codes[i+2]},${codes[i+3]},${codes[i+4]})`;
          i += 4;
        } else if (code === 38 && codes[i + 1] === 5) {
          // 256-color fg: 38;5;N
          fg = xterm256(codes[i + 2] ?? 0);
          i += 2;
        } else if (code === 48 && codes[i + 1] === 5) {
          // 256-color bg: 48;5;N
          bg = xterm256(codes[i + 2] ?? 0);
          i += 2;
        } else if (ANSI_FG[code]) { fg = ANSI_FG[code]; }
        else if (ANSI_BG[code]) { bg = ANSI_BG[code]; }
        i++;
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

// Password challenge state
let passwordMode = false;
type ChallengeHandler = (input: string) => Promise<void>;
let activeChallengeHandler: ChallengeHandler | null = null;

function buildInputLine(promptHtml: string): void {
  if (inputLineEl) { inputLineEl.remove(); inputLineEl = null; }
  cmd.value = '';
  inputLineEl = document.createElement('span');
  inputLineEl.className = 'input-line';
  const promptSpan = document.createElement('span');
  promptSpan.innerHTML = promptHtml;
  const textSpan = document.createElement('span');
  textSpan.className = 'typed';
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  cursor.textContent = ' ';
  const afterSpan = document.createElement('span');
  afterSpan.className = 'after-cursor';
  inputLineEl.appendChild(promptSpan);
  inputLineEl.appendChild(textSpan);
  inputLineEl.appendChild(cursor);
  inputLineEl.appendChild(afterSpan);
  out.appendChild(inputLineEl);
  scrollToBottom();
}

function printPrompt(): void {
  passwordMode = false;
  activeChallengeHandler = null;
  const promptStr = shellEnv.vars.PS1
    ? buildPrompt(authUser, HOSTNAME, '', shellEnv.vars.PS1, cwd)
    : buildPrompt(authUser, HOSTNAME, cwd === userHome(authUser) ? '~' : (cwd.split('/').at(-1) || '/'));
  buildInputLine(ansiToHtml(promptStr));
}

function printChallengePrompt(text: string, handler: ChallengeHandler): void {
  passwordMode = true;
  activeChallengeHandler = handler;
  buildInputLine(text.replace(/&/g, '&amp;').replace(/</g, '&lt;'));
}

function syncCursor(): void {
  if (!inputLineEl) return;
  // In password mode: never show typed text
  const val = passwordMode ? '' : cmd.value;
  const pos = passwordMode ? 0 : (cmd.selectionStart ?? cmd.value.length);
  const before = val.slice(0, pos);
  const ch = val[pos] ?? ' ';
  const after = val.slice(pos + (val[pos] ? 1 : 0));
  (inputLineEl.querySelector('.typed') as HTMLSpanElement).textContent = before;
  (inputLineEl.querySelector('.cursor') as HTMLSpanElement).textContent = ch;
  (inputLineEl.querySelector('.after-cursor') as HTMLSpanElement).textContent = after;
  scrollToBottom();
}

cmd.addEventListener('input', () => { syncCursor(); });

// Wait for IndexedDB fs shim memCache
// biome-ignore lint/suspicious/noExplicitAny: globalThis shim
await (globalThis as any).__fsReady__;

// Request persistent storage so the browser doesn't evict IndexedDB under pressure.
// Best-effort — silently ignored if the API is unavailable or denied.
if (navigator.storage?.persist) {
  await navigator.storage.persist().catch(() => undefined);
}

function detectWebGlGpu(): string | undefined {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (!gl) return undefined;
    const ext = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
    if (!ext) return undefined;
    return (gl as WebGLRenderingContext).getParameter(ext.UNMASKED_RENDERER_WEBGL) as string || undefined;
  } catch { return undefined; }
}

const shell = new VirtualShell(HOSTNAME, {
  kernel: '6.1.0-web-amd64',
  os: 'Fortune GNU/Linux (Web)',
  arch: navigator.userAgent.includes('arm64') || navigator.userAgent.includes('aarch64') ? 'aarch64' : 'x86_64',
  resolution: `${window.screen.width}x${window.screen.height}`,
  gpu: detectWebGlGpu(),
}, {
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

// Session stack for nested su sessions
const sessionStack: Array<{ authUser: string; cwd: string }> = [];

function applyResult(result: CommandResult): void {
  if (result.switchUser) {
    sessionStack.push({ authUser, cwd });
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

function handleClose(): void {
  if (sessionStack.length > 0) {
    const prev = sessionStack.pop()!;
    authUser = prev.authUser;
    cwd = prev.cwd;
    shellEnv.vars.USER = authUser;
    shellEnv.vars.LOGNAME = authUser;
    shellEnv.vars.HOME = userHome(authUser);
    shellEnv.vars.PWD = cwd;
    print('logout\n');
    printPrompt();
  } else {
    print('\nlogout\n');
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

// Source login/rc files so PS1, aliases, exports are ready before first prompt.
// Inline per-line execution: collects stdout (echo in rc files prints), per-line error isolation.
async function sourceRcFile(filePath: string): Promise<void> {
  if (!vfs.exists(filePath)) return;
  const lines = vfs.readFile(filePath).split('\n');
  for (const raw of lines) {
    const l = raw.trim();
    if (!l || l.startsWith('#')) continue;
    try {
      const r = await runCommand(l, authUser, HOSTNAME, 'shell', cwd, shell, undefined, shellEnv);
      if (r.stdout) print(r.stdout);
    } catch { /* ignore */ }
  }
}
await sourceRcFile('/etc/environment');
await sourceRcFile(`${userHome(authUser)}/.profile`);
await sourceRcFile(`${userHome(authUser)}/.bashrc`);

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
      syncCursor();
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
      syncCursor();
    }
    return;
  }

  if (e.key === 'd' && e.ctrlKey) {
    e.preventDefault();
    // Only act on empty input (matches bash Ctrl+D behaviour)
    if (cmd.value.length === 0) {
      if (inputLineEl) {
        inputLineEl.querySelector('.cursor')?.remove();
        (inputLineEl.querySelector('.after-cursor') as HTMLSpanElement | null)?.remove();
        inputLineEl = null;
      }
      out.appendChild(document.createTextNode('\n'));
      handleClose();
    }
    return;
  }

  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Home' || e.key === 'End') {
    // Let the browser move cmd's internal cursor, then sync visual cursor on next tick
    setTimeout(syncCursor, 0);
    return;
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIdx < history.length - 1) {
      historyIdx++;
      cmd.value = history[history.length - 1 - historyIdx];
      syncCursor();
    }
    return;
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIdx > 0) { historyIdx--; cmd.value = history[history.length - 1 - historyIdx]; }
    else { historyIdx = -1; cmd.value = ''; }
    syncCursor();
    return;
  }

  if (e.key !== 'Enter') return;

  const value = cmd.value;
  const trimmed = value.trim();
  historyIdx = -1;

  // Freeze input line
  if (inputLineEl) {
    // In password mode: blank the frozen line (never show password in DOM)
    (inputLineEl.querySelector('.typed') as HTMLSpanElement).textContent = passwordMode ? '' : trimmed;
    inputLineEl.querySelector('.cursor')?.remove();
    (inputLineEl.querySelector('.after-cursor') as HTMLSpanElement | null)?.remove();
    inputLineEl = null;
  }

  out.appendChild(document.createTextNode('\n'));

  // Active challenge (password/confirm flow)
  if (activeChallengeHandler) {
    const handler = activeChallengeHandler;
    activeChallengeHandler = null;
    passwordMode = false;
    await handler(value);
    return;
  }

  if (trimmed) {
    history.push(trimmed);
    if (history.length > MAX_HISTORY) history = history.slice(history.length - MAX_HISTORY);
    saveHistory();
  }

  try {
    const result = await runCommand(trimmed, authUser, HOSTNAME, 'shell', cwd, shell, undefined, shellEnv);

    if (result.clearScreen) out.innerHTML = '';
    if (result.stdout) print(`${result.stdout.trim()}\n`);
    if (result.stderr) print(`${result.stderr.trim()}\n`);

    applyResult(result);
    await vfs.flushMirror();

    if (result.closeSession) { handleClose(); return; }

    // Handle password/sudo challenge returned by the command
    if (result.sudoChallenge) {
      const challenge = result.sudoChallenge;
      const makeHandler = (_promptText: string): ChallengeHandler => async (input: string) => {
        if (!challenge.onPassword) { printPrompt(); return; }
        try {
          const { result: res, nextPrompt } = await challenge.onPassword(input, shell);
          if (res === null && nextPrompt) {
            printChallengePrompt(nextPrompt, makeHandler(nextPrompt));
          } else {
            if (res?.stdout) print(`${res.stdout.trim()}\n`);
            if (res?.stderr) print(`${res.stderr.trim()}\n`);
            printPrompt();
          }
        } catch (err) {
          print(`${String(err)}\n`);
          printPrompt();
        }
      };
      printChallengePrompt(challenge.prompt, makeHandler(challenge.prompt));
      return;
    }
  } catch (err) {
    print(`${String(err)}\n`);
  }

  printPrompt();
});