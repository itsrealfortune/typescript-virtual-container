import { WebTermRenderer } from "./webTermRenderer";
import type { VirtualShell } from "../VirtualShell";
import type { ShellStream } from "../types/streams";

function toChunk(bytes: Uint8Array): Buffer {
  const g = globalThis as unknown as Record<string, { from: (d: Uint8Array) => Buffer } | undefined>;
  return g.Buffer?.from(bytes) ?? (bytes as unknown as Buffer);
}

// ── Types ──────────────────────────────────────────────────────────────

export interface TerminalContent {
  type: "terminal";
  termRenderer: WebTermRenderer;
  dataListeners: Array<(chunk: Buffer) => void>;
  preEl?: HTMLPreElement;
  stream?: ShellStream;
}

export interface ThunarContent {
  type: "thunar";
  path: string;
}

export interface AboutContent {
  type: "about";
}

export type WindowContent = TerminalContent | ThunarContent | AboutContent;

export interface DesktopWindow {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  focused: boolean;
  zIndex: number;
  content: WindowContent;
}

export interface DesktopState {
  active: boolean;
  windows: DesktopWindow[];
  menuOpen: boolean;
  clock: string;
  focusedWindowId: string | null;
}

// ── Keyboard encoding (mirrors app.ts keyToBytes) ─────────────────────

function desktopKeyToBytes(e: KeyboardEvent): Uint8Array | null {
  const enc = new TextEncoder();

  if (e.ctrlKey && !e.altKey) {
    const k = e.key.toLowerCase();
    if (k.length === 1 && k >= "a" && k <= "z") return new Uint8Array([k.charCodeAt(0) - 96]);
    if (e.key === "[")  return new Uint8Array([27]);
    if (e.key === "\\") return new Uint8Array([28]);
    if (e.key === "]")  return new Uint8Array([29]);
    if (e.key === "_" || e.key === "/") return new Uint8Array([31]);
    if (e.key === "Backspace") return new Uint8Array([8]);
  }

  if (e.altKey && !e.ctrlKey && e.key.length === 1) {
    return new Uint8Array([27, e.key.charCodeAt(0)]);
  }

  switch (e.key) {
    case "ArrowUp":    return new Uint8Array([27, 91, 65]);
    case "ArrowDown":  return new Uint8Array([27, 91, 66]);
    case "ArrowRight": return new Uint8Array([27, 91, 67]);
    case "ArrowLeft":  return new Uint8Array([27, 91, 68]);
    case "Backspace":  return new Uint8Array([127]);
    case "Enter":      return new Uint8Array([13]);
    case "Tab":        return new Uint8Array([9]);
    case "Escape":     return new Uint8Array([27]);
    default:
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        return enc.encode(e.key);
      }
      return null;
  }
}

// ── Desktop Manager ───────────────────────────────────────────────────

export class DesktopManager {
  private shell: VirtualShell;
  private container: HTMLElement;
  private active = false;
  private windows: DesktopWindow[] = [];
  private zCounter = 100;
  private menuOpen = false;
  private nextWinId = 0;
  private clockInterval?: ReturnType<typeof setInterval>;
  private onExit: (() => void) | null = null;
  private dragState: { win: DesktopWindow; startX: number; startY: number; origX: number; origY: number } | null = null;
  private _renderGuard = false;

  constructor(shell: VirtualShell, container: HTMLElement) {
    this.shell = shell;
    this.container = container;
    this.setupEventDelegation();
  }

  isActive(): boolean { return this.active; }

  setOnExit(cb: () => void): void { this.onExit = cb; }

  start(): void {
    if (this.active) return;
    this.active = true;
    this.container.style.display = "";
    // Step 1: just show the background
  }

  stop(): void {
    if (!this.active) return;
    this.active = false;
    this.container.style.display = "none";
    if (this.clockInterval) clearInterval(this.clockInterval);
    this.clockInterval = undefined;
    this.windows = [];
    this.menuOpen = false;
    this.dragState = null;
    this.onExit?.();
  }

  getFocusedTerminal(): { stream: ShellStream; dataListeners: Array<(chunk: Buffer) => void>; preEl: HTMLPreElement } | null {
    for (const w of this.windows) {
      if (w.content.type === "terminal" && w.focused && !w.minimized) {
        return {
          stream: w.content.stream!,
          dataListeners: w.content.dataListeners,
          preEl: w.content.preEl!,
        };
      }
    }
    return null;
  }

  handleKeyDown(e: KeyboardEvent): void {
    if (!this.active) return;

    if (e.key === "Escape" && this.menuOpen) {
      this.menuOpen = false;
      this.renderPanel();
      return;
    }

    const focusedTerm = this.getFocusedTerminal();
    if (!focusedTerm) return;

    if (e.metaKey) return;
    if (e.ctrlKey && (e.key === "c" || e.key === "v") && !e.altKey) {
      e.preventDefault();
    } else {
      e.preventDefault();
    }

    const bytes = desktopKeyToBytes(e);
    if (!bytes) return;
    for (const l of focusedTerm.dataListeners) l(toChunk(bytes));
  }

  handlePaste(e: ClipboardEvent): void {
    const focusedTerm = this.getFocusedTerminal();
    if (!focusedTerm) return;
    e.preventDefault();
    const text = e.clipboardData?.getData("text") ?? "";
    if (!text) return;
    const enc = new TextEncoder();
    const bytes = enc.encode(text);
    for (const l of focusedTerm.dataListeners) l(toChunk(bytes));
  }

  createTerminalWindow(): string {
    const cols = 80;
    const rows = 24;
    const termRenderer = new WebTermRenderer(rows, cols);

    const dataListeners: Array<(chunk: Buffer) => void> = [];
    const closeListeners: Array<() => void> = [];

    const id = this.createWindow({
      title: "Terminal",
      width: 720,
      height: 440,
      content: {
        type: "terminal",
        termRenderer,
        dataListeners,
        stream: null as unknown as ShellStream,
      } as TerminalContent,
    });

    const winId = id; // capture window id for the closure
    const stream: ShellStream = {
      write: (data: string) => {
        termRenderer.write(data);
        this.renderTerminalContentById(winId);
      },
      exit: () => undefined,
      end: () => { for (const l of closeListeners) l(); },
      on: (event: "data" | "close", listener: ((chunk: Buffer) => void) & (() => void)) => {
        if (event === "data") dataListeners.push(listener);
        else if (event === "close") closeListeners.push(listener as () => void);
      },
    };

    // Attach stream to the window
    const w = this.windows.find((ww) => ww.id === winId);
    if (w && w.content.type === "terminal") {
      (w.content as TerminalContent).stream = stream;
    }

    // Start shell asynchronously so the calling command can finish first
    setTimeout(() => {
      this.shell.startInteractiveSession(stream, "root", null, "desktop", { cols, rows });
    }, 0);

    return id;
  }

  createThunarWindow(path = "/root"): string {
    return this.createWindow({
      title: `Thunar: ${path}`,
      width: 600,
      height: 400,
      content: { type: "thunar", path },
    });
  }

  createAboutWindow(): string {
    return this.createWindow({
      title: "About Fortune GNU/Linux",
      width: 400,
      height: 280,
      content: { type: "about" },
    });
  }

  closeWindow(id: string): void {
    const idx = this.windows.findIndex((w) => w.id === id);
    if (idx === -1) return;
    this.windows.splice(idx, 1);
    if (this.windows.length > 0) {
      this.focusWindow(this.windows[this.windows.length - 1]!.id);
    }
    this.renderAll();
  }

  toggleMinimize(id: string): void {
    const w = this.windows.find((ww) => ww.id === id);
    if (!w) return;
    w.minimized = !w.minimized;
    if (!w.minimized) this.focusWindow(id);
    else this.renderAll();
  }

  focusWindow(id: string): void {
    for (const w of this.windows) w.focused = false;
    const w = this.windows.find((ww) => ww.id === id);
    if (w) {
      w.focused = true;
      w.zIndex = ++this.zCounter;
      w.minimized = false;
    }
    this.renderAll();
  }

  // ── Internal ──────────────────────────────────────────────────────

  private createWindow(opts: { title: string; width: number; height: number; content: WindowContent }): string {
    const id = `win-${++this.nextWinId}`;
    const count = this.windows.length;
    const offset = count * 30;
    const win: DesktopWindow = {
      id,
      title: opts.title,
      x: 60 + offset,
      y: 40 + offset,
      width: opts.width,
      height: opts.height,
      minimized: false,
      focused: true,
      zIndex: ++this.zCounter,
      content: opts.content,
    };
    for (const w of this.windows) w.focused = false;
    this.windows.push(win);
    // Create DOM element synchronously (not guarded) so it exists for stream writes
    this.ensureWindowElement(win);
    this.renderWindowElement(win);
    this.renderAll();
    return id;
  }

  private ensureWindowElement(win: DesktopWindow): HTMLElement {
    let el = this.container.querySelector(`.desktop-window[data-win-id="${win.id}"]`) as HTMLElement;
    if (!el) {
      el = document.createElement("div");
      el.className = "desktop-window";
      el.setAttribute("data-win-id", win.id);
      el.innerHTML = `
        <div class="win-header">
          <span class="win-title">${this.escapeHtml(win.title)}</span>
          <div class="win-controls">
            <button class="win-min">─</button>
            <button class="win-close">✕</button>
          </div>
        </div>
        <div class="win-content"></div>
      `;
      this.container.appendChild(el);
    }
    return el;
  }

  private renderWindowElement(win: DesktopWindow): void {
    const el = this.ensureWindowElement(win);
    el.style.left = `${win.x}px`;
    el.style.top = `${win.y}px`;
    el.style.width = `${win.width}px`;
    el.style.height = `${win.height}px`;
    el.style.zIndex = String(win.zIndex);
    el.classList.toggle("win-focused", win.focused);

    if (win.content.type === "terminal") {
      this.renderTerminalContentById(win.id);
    } else if (win.content.type === "thunar") {
      this.renderThunarContent(el, win.content);
    } else if (win.content.type === "about") {
      this.renderAboutContent(el);
    }
  }

  private setupEventDelegation(): void {
    // Delegate click events
    this.container.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (!this.active) return;

      // Close button
      if (target.classList.contains("win-close")) {
        const id = target.closest(".desktop-window")?.getAttribute("data-win-id");
        if (id) this.closeWindow(id);
        e.stopPropagation();
        return;
      }

      // Minimize button
      if (target.classList.contains("win-min")) {
        const id = target.closest(".desktop-window")?.getAttribute("data-win-id");
        if (id) this.toggleMinimize(id);
        e.stopPropagation();
        return;
      }

      // Window header click → focus
      const header = target.closest(".win-header");
      if (header) {
        const id = header.closest(".desktop-window")?.getAttribute("data-win-id");
        if (id) {
          this.focusWindow(id);
          e.stopPropagation();
          return;
        }
      }

      // Window content click → focus
      const winEl = target.closest(".desktop-window");
      if (winEl) {
        const id = winEl.getAttribute("data-win-id");
        if (id) {
          this.focusWindow(id);
          e.stopPropagation();
          return;
        }
      }

      // Desktop icons
      const icon = target.closest(".desktop-icon");
      if (icon) {
        const action = icon.getAttribute("data-action");
        if (action === "terminal") this.createTerminalWindow();
        else if (action === "home") this.createThunarWindow("/root");
        e.stopPropagation();
        return;
      }

      // Panel menu button
      if (target.classList.contains("xfce-menu-button") || target.closest(".xfce-menu-button")) {
        this.menuOpen = !this.menuOpen;
        this.renderPanel();
        e.stopPropagation();
        return;
      }

      // Menu items
      if (target.classList.contains("menu-item")) {
        const action = target.getAttribute("data-action");
        if (action === "terminal") this.createTerminalWindow();
        else if (action === "thunar") this.createThunarWindow();
        else if (action === "about") this.createAboutWindow();
        else if (action === "logout") this.stop();
        this.menuOpen = false;
        this.renderPanel();
        return;
      }

      // Click outside menu → close it
      if (this.menuOpen) {
        this.menuOpen = false;
        this.renderPanel();
      }
    });

    // Mouse down for window dragging
    this.container.addEventListener("mousedown", (e) => {
      const header = (e.target as HTMLElement).closest(".win-header");
      if (!header) return;
      const winEl = header.closest(".desktop-window") as HTMLElement | null;
      if (!winEl) return;
      const id = winEl.getAttribute("data-win-id");
      if (!id) return;
      const win = this.windows.find((w) => w.id === id);
      if (!win) return;
      this.focusWindow(id);

      this.dragState = {
        win,
        startX: e.clientX,
        startY: e.clientY,
        origX: win.x,
        origY: win.y,
      };
      e.preventDefault();
    });

    // Mouse move for dragging
    document.addEventListener("mousemove", (e) => {
      if (!this.dragState) return;
      const dx = e.clientX - this.dragState.startX;
      const dy = e.clientY - this.dragState.startY;
      this.dragState.win.x = Math.max(0, this.dragState.origX + dx);
      this.dragState.win.y = Math.max(0, this.dragState.origY + dy);
      this.renderWindowPositions();
    });

    // Mouse up to end drag
    document.addEventListener("mouseup", () => {
      this.dragState = null;
    });

    // Paste delegation for terminal windows
    this.container.addEventListener("paste", (e: ClipboardEvent) => {
      this.handlePaste(e);
    });
  }
  private measureCell(_renderer: WebTermRenderer): { w: number; h: number } {
    const probe = document.createElement("span");
    probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre;font:inherit;";
    probe.textContent = "X";
    this.container.appendChild(probe);
    const rect = probe.getBoundingClientRect();
    this.container.removeChild(probe);
    return { w: rect.width || 8, h: rect.height || 16 };
  }

  // ── Rendering ──────────────────────────────────────────────────────

  private renderAll(): void {
    if (this._renderGuard) return;
    this._renderGuard = true;
    try {
      this.renderPanel();
      this.renderDesktopIcons();
      this.renderWindows();
    } finally {
      this._renderGuard = false;
    }
  }

  private renderPanel(): void {
    let panel = this.container.querySelector("#desktop-panel") as HTMLElement;
    if (!panel) {
      panel = document.createElement("div");
      panel.id = "desktop-panel";
      this.container.prepend(panel);
    }

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    panel.innerHTML = `
      <div class="xfce-menu-button">Applications</div>
      <div class="xfce-window-list">
        ${this.windows.map((w) =>
          `<span class="xfce-taskbutton${w.focused ? " active" : ""}" data-win-id="${w.id}">${w.title}</span>`
        ).join("")}
      </div>
      <div class="xfce-tray">
        <span class="xfce-clock">${time}</span>
      </div>
      ${this.menuOpen ? `
        <div class="xfce-menu">
          <div class="menu-item" data-action="terminal">Terminal</div>
          <div class="menu-item" data-action="thunar">File Manager</div>
          <div class="menu-separator"></div>
          <div class="menu-item" data-action="about">About</div>
          <div class="menu-separator"></div>
          <div class="menu-item" data-action="logout">Log Out</div>
        </div>
      ` : ""}
    `;

    // Task button clicks → focus/minimize
    panel.querySelectorAll(".xfce-taskbutton").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = (btn as HTMLElement).getAttribute("data-win-id");
        if (!id) return;
        const w = this.windows.find((ww) => ww.id === id);
        if (!w) return;
        if (w.focused && !w.minimized) { this.toggleMinimize(id); }
        else { this.focusWindow(id); }
      });
    });
  }

  private renderDesktopIcons(): void {
    let area = this.container.querySelector("#desktop-area") as HTMLElement;
    if (!area) {
      area = document.createElement("div");
      area.id = "desktop-area";
      this.container.appendChild(area);
    }
    area.innerHTML = `
      <div class="desktop-icon" data-action="terminal">
        <div class="desktop-icon-img term-icon"></div>
        <span>Terminal</span>
      </div>
      <div class="desktop-icon" data-action="home">
        <div class="desktop-icon-img home-icon"></div>
        <span>Home</span>
      </div>
      <div class="desktop-icon" data-action="trash">
        <div class="desktop-icon-img trash-icon"></div>
        <span>Trash</span>
      </div>
    `;
  }

  private renderWindows(): void {
    const existing = this.container.querySelectorAll(".desktop-window");
    for (const el of existing) {
      const id = (el as HTMLElement).getAttribute("data-win-id");
      if (!id || !this.windows.some((w) => w.id === id && !w.minimized)) {
        el.remove();
      }
    }
    for (const w of this.windows) {
      if (w.minimized) {
        const el = this.container.querySelector(`.desktop-window[data-win-id="${w.id}"]`);
        if (el) el.remove();
      } else {
        this.renderWindowElement(w);
      }
    }
  }

  private renderWindowPositions(): void {
    for (const w of this.windows) {
      if (w.minimized) continue;
      const el = this.container.querySelector(`.desktop-window[data-win-id="${w.id}"]`) as HTMLElement;
      if (!el) continue;
      el.style.left = `${w.x}px`;
      el.style.top = `${w.y}px`;
    }
  }

  private renderTerminalContentById(winId: string): void {
    const w = this.windows.find((ww) => ww.id === winId);
    if (!w || w.content.type !== "terminal") return;
    const el = this.container.querySelector(`.desktop-window[data-win-id="${winId}"] .win-content`) as HTMLElement;
    if (!el) return;

    w.content.preEl = w.content.preEl ?? document.createElement("pre");
    const pre = w.content.preEl;
    pre.className = "win-terminal";
    pre.innerHTML = w.content.termRenderer.renderHtml();
    if (!pre.parentNode) el.appendChild(pre);
  }

  private renderThunarContent(el: HTMLElement, content: ThunarContent): void {
    const contentArea = el.querySelector(".win-content") as HTMLElement;
    if (!contentArea) return;
    const targetPath = content.path;
    let listing = "";
    try {
      const entries = this.shell.vfs.list(targetPath);
      listing = entries
        .filter((e) => e !== "." && e !== "..")
        .map((e: string) => {
          try {
            const st = this.shell.vfs.stat(`${targetPath}/${e}`);
            const icon = st.type === "directory" ? "📁" : "📄";
            return `<div class="thunar-entry"><span class="thunar-icon">${icon}</span><span>${this.escapeHtml(e)}</span></div>`;
          } catch {
            return `<div class="thunar-entry"><span class="thunar-icon">❓</span><span>${this.escapeHtml(e)}</span></div>`;
          }
        })
        .join("");
    } catch {
      listing = `<div class="thunar-error">Could not read ${this.escapeHtml(targetPath)}</div>`;
    }
    contentArea.innerHTML = `
      <div class="thunar-pathbar">Location: ${this.escapeHtml(targetPath)}</div>
      <div class="thunar-listing">${listing}</div>
    `;
  }

  private renderAboutContent(el: HTMLElement): void {
    const contentArea = el.querySelector(".win-content") as HTMLElement;
    if (!contentArea) return;
    contentArea.innerHTML = `
      <div class="about-dialog">
        <div class="about-logo">🪄</div>
        <h2>Fortune GNU/Linux 1.0 Nyx</h2>
        <p>A simulated Linux environment running entirely in your browser.</p>
        <p>Kernel: ${this.shell.properties.kernel}</p>
        <p>Architecture: ${this.shell.properties.arch}</p>
        <p class="about-close-hint">Close this window to return</p>
      </div>
    `;
  }

  // biome-ignore lint: will be used when expanded
  private updateClock(): void {
    const clock = this.container.querySelector(".xfce-clock");
    if (!clock) return;
    const now = new Date();
    clock.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  private escapeHtml(s: string): string {
    const div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }
}
