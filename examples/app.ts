import { VirtualShell } from '../src/index.js';
import { WebTermRenderer } from '../src/modules/webTermRenderer.js';
import type { ShellStream } from '../src/types/streams.js';

// ── Wait for IndexedDB fs shim ────────────────────────────────────────────────
// biome-ignore lint/suspicious/noExplicitAny: globalThis shim
await (globalThis as any).__fsReady__;

if (navigator.storage?.persist) {
  await navigator.storage.persist().catch(() => undefined);
}

// ── Terminal element ──────────────────────────────────────────────────────────

const terminal = document.getElementById('terminal') as HTMLPreElement;
const scrollbackEl = document.getElementById('scrollback') as HTMLPreElement;
terminal.focus();
document.addEventListener('click', () => {
  if (!window.getSelection()?.toString()) terminal.focus();
});

// ── Measure character cell size ───────────────────────────────────────────────

function measureCharCell(): { w: number; h: number } {
  const probe = document.createElement('span');
  probe.style.cssText = 'position:absolute;visibility:hidden;white-space:pre;';
  probe.textContent = 'X';
  terminal.appendChild(probe);
  const rect = probe.getBoundingClientRect();
  terminal.removeChild(probe);
  return { w: rect.width || 8, h: rect.height || 16 };
}

function getTermSize(): { cols: number; rows: number } {
  const { w, h } = measureCharCell();
  const wrapper = document.getElementById('terminal-wrapper') ?? terminal;
  return {
    cols: Math.max(1, Math.floor(terminal.clientWidth / w)),
    rows: Math.max(1, Math.floor(wrapper.clientHeight / h)),
  };
}

// ── Renderer ──────────────────────────────────────────────────────────────────

const { cols, rows } = getTermSize();
const renderer = new WebTermRenderer(rows, cols);

let rafPending = false;
const wrapper = document.getElementById('terminal-wrapper') as HTMLDivElement;
let fullscreenMode = false;
function flush(): void {
  if (rafPending) return;
  rafPending = true;
  requestAnimationFrame(() => {
    rafPending = false;
    const cleared = renderer.consumeCleared();
    if (cleared) fullscreenMode = true;
    scrollbackEl.innerHTML = renderer.renderScrollbackHtml();
    terminal.innerHTML = renderer.renderHtml();
    if (fullscreenMode) {
      // Always wipe scrollback DOM in fullscreen — lines leaked by scrollUp must not show
      renderer.clearScrollback();
      scrollbackEl.innerHTML = '';
      if (!cleared && renderer.scrollbackLength > 0) {
        fullscreenMode = false;
        wrapper.classList.remove('fullscreen');
        terminal.scrollIntoView(false);
      } else {
        wrapper.classList.add('fullscreen');
        wrapper.scrollTop = 0;
      }
    } else {
      wrapper.classList.remove('fullscreen');
      terminal.scrollIntoView(false);
    }
  });
}

// ── ShellStream bridge ────────────────────────────────────────────────────────

// Listeners registered by shell.ts via stream.on("data"|"close")
const dataListeners: ((chunk: Buffer) => void)[] = [];
const closeListeners: (() => void)[] = [];

const stream: ShellStream = {
  write: (data: string) => { renderer.write(data); flush(); },
  exit: () => undefined,
  end: () => { for (const l of closeListeners) l(); },
  on: (event: 'data' | 'close', listener: ((chunk: Buffer) => void) & (() => void)) => {
    if (event === 'data') dataListeners.push(listener);
    else if (event === 'close') closeListeners.push(listener as () => void);
  },
};

// ── Keyboard → bytes ──────────────────────────────────────────────────────────

interface BufferShim { from(data: Uint8Array): Buffer }
function toChunk(bytes: Uint8Array): Buffer {
  // biome-ignore lint/style/useNamingConvention: Buffer is the shim's exported name
  const g = globalThis as unknown as { Buffer?: BufferShim };
  return g.Buffer ? g.Buffer.from(bytes) : (bytes as unknown as Buffer);
}

function keyToBytes(e: KeyboardEvent): Uint8Array | null {
  const enc = new TextEncoder();

  if (e.ctrlKey && !e.altKey) {
    const k = e.key.toLowerCase();
    if (k.length === 1 && k >= 'a' && k <= 'z') return new Uint8Array([k.charCodeAt(0) - 96]);
    if (e.key === '[')  return new Uint8Array([27]);
    if (e.key === '\\') return new Uint8Array([28]);
    if (e.key === ']')  return new Uint8Array([29]);
    if (e.key === '_' || e.key === '/') return new Uint8Array([31]);
    if (e.key === 'Backspace') return new Uint8Array([8]);
  }

  if (e.altKey && !e.ctrlKey && e.key.length === 1) {
    return new Uint8Array([27, e.key.charCodeAt(0)]);
  }

  switch (e.key) {
    case 'ArrowUp':    return new Uint8Array([27, 91, 65]);
    case 'ArrowDown':  return new Uint8Array([27, 91, 66]);
    case 'ArrowRight': return new Uint8Array([27, 91, 67]);
    case 'ArrowLeft':  return new Uint8Array([27, 91, 68]);
    case 'Home':       return new Uint8Array([27, 91, 72]);
    case 'End':        return new Uint8Array([27, 91, 70]);
    case 'PageUp':     return new Uint8Array([27, 91, 53, 126]);
    case 'PageDown':   return new Uint8Array([27, 91, 54, 126]);
    case 'Delete':     return new Uint8Array([27, 91, 51, 126]);
    case 'Insert':     return new Uint8Array([27, 91, 50, 126]);
    case 'F1':         return new Uint8Array([27, 79, 80]);
    case 'F2':         return new Uint8Array([27, 79, 81]);
    case 'F3':         return new Uint8Array([27, 79, 82]);
    case 'F4':         return new Uint8Array([27, 79, 83]);
    case 'Backspace':  return new Uint8Array([127]);
    case 'Enter':      return new Uint8Array([13]);
    case 'Tab':        return new Uint8Array([9]);
    case 'Escape':     return new Uint8Array([27]);
    default:
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        return enc.encode(e.key);
      }
      return null;
  }
}

terminal.addEventListener('keydown', (e: KeyboardEvent) => {
  // Allow browser shortcuts (Ctrl+C copy, Ctrl+V paste, F12, etc.)
  if (e.metaKey) return;
  if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'a') && !e.altKey) {
    // Let Ctrl+C pass through to shell (it's also used for copy but shell needs it)
    // Only block if there's a selection (user is copying)
    if (e.key !== 'c' || !window.getSelection()?.toString()) {
      e.preventDefault();
    }
  } else {
    e.preventDefault();
  }

  const bytes = keyToBytes(e);
  if (!bytes) return;

  for (const l of dataListeners) l(toChunk(bytes));
  terminal.scrollTop = terminal.scrollHeight;
});

// Paste support
terminal.addEventListener('paste', (e: ClipboardEvent) => {
  e.preventDefault();
  const text = e.clipboardData?.getData('text') ?? '';
  if (!text) return;
  const enc = new TextEncoder();
  const bytes = enc.encode(text);
  for (const l of dataListeners) l(toChunk(bytes));
  terminal.scrollTop = terminal.scrollHeight;
});

// ── Resize ────────────────────────────────────────────────────────────────────

window.addEventListener('resize', () => {
  const { cols: newCols, rows: newRows } = getTermSize();
  renderer.resize(newRows, newCols);
  flush();
  // shell.ts listens to stream resize via terminalSize ref — not exposed,
  // but a full redraw from the shell side happens on next output anyway.
});

// ── GPU detection ─────────────────────────────────────────────────────────────

function detectGpu(): string | undefined {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (!gl) return undefined;
    const ext = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
    if (!ext) return undefined;
    return (gl as WebGLRenderingContext).getParameter(ext.UNMASKED_RENDERER_WEBGL) as string || undefined;
  } catch { return undefined; }
}

// ── Shell setup ───────────────────────────────────────────────────────────────

const HOSTNAME = 'my-vm';

const shell = new VirtualShell(HOSTNAME, {
  kernel: '6.1.0-web-amd64',
  os: 'Fortune GNU/Linux (Web)',
  arch: navigator.userAgent.includes('arm64') || navigator.userAgent.includes('aarch64') ? 'aarch64' : 'x86_64',
  resolution: `${window.screen.width}x${window.screen.height}`,
  gpu: detectGpu(),
}, {
  mode: 'fs',
  snapshotPath: '/vfs-data',
  flushIntervalMs: 10_000,
});

await shell.vfs.restoreMirror();

const isFirstRun = !shell.vfs.exists('/bin');
if (isFirstRun) {
  await shell.ensureInitialized();
  if (!shell.vfs.exists('/root')) shell.vfs.mkdir('/root', 0o700);
  shell.vfs.writeFile('/root/README.txt', `Welcome to ${HOSTNAME}\n`);
  await shell.vfs.flushMirror();
} else {
  await shell.ensureInitialized();
}

window.addEventListener('beforeunload', () => { shell.vfs.flushMirror(); });

// ── Start interactive session ─────────────────────────────────────────────────

shell.startInteractiveSession(stream, 'root', null, 'browser', { cols, rows });