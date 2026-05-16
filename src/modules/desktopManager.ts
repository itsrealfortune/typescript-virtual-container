import type { VirtualShell } from "../VirtualShell";
import type { ShellStream } from "../types/streams";
import { WebTermRenderer } from "./webTermRenderer";

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

export interface EditorContent {
  type: "editor";
  path: string;
  dirty: boolean;
}

export type WindowContent = TerminalContent | ThunarContent | AboutContent | EditorContent;

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
  private stopResolve: (() => void) | null = null;
  private dragState: { win: DesktopWindow; startX: number; startY: number; origX: number; origY: number } | null = null;
  private _renderGuard = false;
  private readonly trashPath = "/root/.local/share/Trash/files";
  private docListeners: Array<{ target: EventTarget; type: string; fn: EventListener }> = [];
  private pendingTimeouts: Set<ReturnType<typeof setTimeout>> = new Set();

  constructor(shell: VirtualShell, container: HTMLElement) {
    this.shell = shell;
    this.container = container;
    this.setupEventDelegation();
  }

  isActive(): boolean { return this.active; }

  setOnExit(cb: () => void): void { this.onExit = cb; }

  start(): Promise<void> {
    if (this.active) return Promise.resolve();
    this.active = true;
    this.container.style.display = "block";
    this.renderAll();
    this.clockInterval = setInterval(() => this.updateClock(), 30_000);
    return new Promise<void>((resolve) => {
      this.stopResolve = resolve;
    });
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
    for (const id of this.pendingTimeouts) clearTimeout(id);
    this.pendingTimeouts.clear();
    this.removeAllDocListeners();
    this.stopResolve?.();
    this.stopResolve = null;
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
    const tid = setTimeout(() => {
      this.pendingTimeouts.delete(tid);
      this.shell.startInteractiveSession(stream, "root", null, "desktop", { cols, rows });
    }, 0);
    this.pendingTimeouts.add(tid);

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

  createEditorWindow(path = "/root/untitled.txt"): string {
    const id = this.createWindow({
      title: `Mousepad — ${path.split("/").pop()}`,
      width: 640,
      height: 480,
      content: { type: "editor", path, dirty: false },
    });
    // Attach save/input listeners via event delegation (handled in setupEventDelegation)
    return id;
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
    } else if (win.content.type === "editor") {
      this.renderEditorContent(el, win.id, win.content);
    }
  }

  private addDocListener(target: EventTarget, type: string, fn: EventListener): void {
    target.addEventListener(type, fn);
    this.docListeners.push({ target, type, fn });
  }

  private removeAllDocListeners(): void {
    for (const { target, type, fn } of this.docListeners) {
      target.removeEventListener(type, fn);
    }
    this.docListeners = [];
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
        else if (action === "editor") this.createEditorWindow();
        else if (action === "trash") this.createThunarWindow(this.trashPath);
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
        else if (action === "editor") this.createEditorWindow();
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

    // Double-click on Thunar entries
    this.container.addEventListener("dblclick", (e) => {
      const entry = (e.target as HTMLElement).closest(".thunar-entry") as HTMLElement | null;
      if (!entry) return;
      const path = entry.getAttribute("data-path");
      const type = entry.getAttribute("data-type");
      if (!path) return;
      if (type === "directory") {
        const winEl = entry.closest(".desktop-window");
        const id = winEl?.getAttribute("data-win-id");
        const w = id ? this.windows.find((ww) => ww.id === id) : null;
        if (w && w.content.type === "thunar") {
          w.content.path = path;
          w.title = `Thunar: ${path}`;
          const wEl = this.container.querySelector(`.desktop-window[data-win-id="${w.id}"] .win-content`) as HTMLElement | null;
          if (wEl) wEl.removeAttribute("data-thunar-path");
          this.renderWindowElement(w);
        }
      } else {
        this.createEditorWindow(path);
      }
      e.stopPropagation();
    });

    // Context menu on Thunar entries
    this.container.addEventListener("contextmenu", (e) => {
      const entry = (e.target as HTMLElement).closest(".thunar-entry") as HTMLElement | null;
      if (!entry) { this.closeContextMenu(); return; }
      const path = entry.getAttribute("data-path");
      const type = entry.getAttribute("data-type");
      if (!path) return;
      e.preventDefault();
      e.stopPropagation();
      const inTrash = path.startsWith(this.trashPath);
      const winEl = entry.closest(".desktop-window");
      const winId = winEl?.getAttribute("data-win-id") ?? null;
      this.showContextMenu(e.clientX, e.clientY, inTrash
        ? [
            { label: "Restore", icon: "fa-solid fa-rotate-left", action: () => this.trashRestore(path, winId) },
            { label: "Delete permanently", icon: "fa-solid fa-circle-xmark", danger: true, action: () => this.trashDelete(path, winId) },
          ]
        : [
            { label: type === "directory" ? "Open folder" : "Open", icon: type === "directory" ? "fa-solid fa-folder-open" : "fa-solid fa-file-pen", action: () => {
                if (type === "directory") {
                  const w = winId ? this.windows.find((ww) => ww.id === winId) : null;
                  if (w && w.content.type === "thunar") {
                    w.content.path = path;
                    w.title = `Thunar: ${path}`;
                    const wEl = this.container.querySelector(`.desktop-window[data-win-id="${w.id}"] .win-content`) as HTMLElement | null;
                    if (wEl) wEl.removeAttribute("data-thunar-path");
                    this.renderWindowElement(w);
                  }
                } else { this.createEditorWindow(path); }
              }
            },
            { label: "Rename", icon: "fa-solid fa-pencil", action: () => this.renamePrompt(path, winId) },
            { label: "Move to Trash", icon: "fa-solid fa-trash-can", danger: true, action: () => this.moveToTrash(path, winId) },
          ]
      );
    });

    // Close context menu on click elsewhere
    this.addDocListener(document, "click", () => this.closeContextMenu());

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
    this.addDocListener(document, "mousemove", (e) => {
      if (!this.dragState) return;
      const me = e as MouseEvent;
      const dx = me.clientX - this.dragState.startX;
      const dy = me.clientY - this.dragState.startY;
      this.dragState.win.x = Math.max(0, this.dragState.origX + dx);
      this.dragState.win.y = Math.max(0, this.dragState.origY + dy);
      this.renderWindowPositions();
    });

    // Mouse up to end drag
    this.addDocListener(document, "mouseup", () => {
      this.dragState = null;
    });

    // Paste delegation for terminal windows
    this.container.addEventListener("paste", (e: ClipboardEvent) => {
      this.handlePaste(e);
    });

    // Keyboard input for desktop terminal windows (document-level so focus doesn't matter)
    this.addDocListener(document, "keydown", (e) => {
      if (!this.active) return;
      if ((e.target as HTMLElement)?.classList?.contains("editor-textarea")) return;
      this.handleKeyDown(e as KeyboardEvent);
    });
  }
  // private measureCell(_renderer: WebTermRenderer): { w: number; h: number } {
  //   const probe = document.createElement("span");
  //   probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre;font:inherit;";
  //   probe.textContent = "X";
  //   this.container.appendChild(probe);
  //   const rect = probe.getBoundingClientRect();
  //   this.container.removeChild(probe);
  //   return { w: rect.width || 8, h: rect.height || 16 };
  // }

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
    const date = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });

    panel.innerHTML = `
      <div class="xfce-menu-button">
        <i class="fa-solid fa-paw xfce-logo"></i>
        Applications
      </div>
      <div class="xfce-window-list">
        ${this.windows.map((w) =>
          `<span class="xfce-taskbutton${w.focused ? " active" : ""}" data-win-id="${w.id}">${this.escapeHtml(w.title)}</span>`
        ).join("")}
      </div>
      <div class="xfce-tray">
        <span class="xfce-tray-icon" title="Network"><i class="fa-solid fa-wifi"></i></span>
        <span class="xfce-tray-icon" title="Volume"><i class="fa-solid fa-volume-high"></i></span>
      </div>
      <div class="xfce-clock">
        <span class="xfce-clock-time">${time}</span>
        <span class="xfce-clock-date">${date}</span>
      </div>
      ${this.menuOpen ? `
        <div class="xfce-menu">
          <div class="menu-category">System</div>
          <div class="menu-item" data-action="terminal"><span class="menu-item-icon"><i class="fa-solid fa-terminal"></i></span>Terminal</div>
          <div class="menu-item" data-action="thunar"><span class="menu-item-icon"><i class="fa-solid fa-folder-open"></i></span>File Manager</div>
          <div class="menu-item" data-action="editor"><span class="menu-item-icon"><i class="fa-solid fa-file-pen"></i></span>Text Editor</div>
          <div class="menu-separator"></div>
          <div class="menu-item" data-action="about"><span class="menu-item-icon"><i class="fa-solid fa-circle-info"></i></span>About Fortune GNU/Linux</div>
          <div class="menu-separator"></div>
          <div class="menu-item" data-action="logout"><span class="menu-item-icon"><i class="fa-solid fa-power-off"></i></span>Log Out</div>
        </div>
      ` : ""}
    `;

    // Task button clicks → focus/minimize (use event delegation, no per-button listeners)
    const list = panel.querySelector(".xfce-window-list");
    if (list) {
      const fresh = list.cloneNode(true) as HTMLElement;
      list.replaceWith(fresh);
      fresh.addEventListener("click", (e) => {
        e.stopPropagation();
        const btn = (e.target as HTMLElement).closest(".xfce-taskbutton") as HTMLElement | null;
        if (!btn) return;
        const id = btn.getAttribute("data-win-id");
        if (!id) return;
        const w = this.windows.find((ww) => ww.id === id);
        if (!w) return;
        if (w.focused && !w.minimized) { this.toggleMinimize(id); }
        else { this.focusWindow(id); }
      });
    }
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
        <div class="desktop-icon-img term-icon"><i class="fa-solid fa-terminal"></i></div>
        <span>Terminal</span>
      </div>
      <div class="desktop-icon" data-action="home">
        <div class="desktop-icon-img home-icon"><i class="fa-solid fa-folder-open"></i></div>
        <span>Home</span>
      </div>
      <div class="desktop-icon" data-action="editor">
        <div class="desktop-icon-img editor-icon"><i class="fa-solid fa-file-pen"></i></div>
        <span>Text Editor</span>
      </div>
      <div class="desktop-icon" data-action="trash">
        <div class="desktop-icon-img trash-icon"><i class="fa-solid fa-trash-can"></i></div>
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
    if (contentArea.getAttribute("data-thunar-path") === targetPath) return;
    contentArea.setAttribute("data-thunar-path", targetPath);
    const parentPath = targetPath === "/" ? null : targetPath.replace(/\/[^/]+$/, "") || "/";
    const parentEntry = parentPath
      ? `<div class="thunar-entry" data-path="${this.escapeHtml(parentPath)}" data-type="directory"><span class="thunar-icon"><i class="fa-solid fa-folder"></i></span><span>..</span></div>`
      : "";
    let listing = "";
    try {
      const entries = this.shell.vfs.list(targetPath);
      listing = entries
        .filter((e) => e !== "." && e !== "..")
        .map((e: string) => {
          try {
            const st = this.shell.vfs.stat(`${targetPath}/${e}`);
            const icon = st.type === "directory"
              ? `<i class="fa-solid fa-folder"></i>`
              : `<i class="fa-regular fa-file"></i>`;
            const fullPath = `${targetPath}/${e}`;
            return `<div class="thunar-entry" data-path="${this.escapeHtml(fullPath)}" data-type="${st.type}"><span class="thunar-icon">${icon}</span><span>${this.escapeHtml(e)}</span></div>`;
          } catch {
            return `<div class="thunar-entry"><span class="thunar-icon"><i class="fa-solid fa-circle-question"></i></span><span>${this.escapeHtml(e)}</span></div>`;
          }
        })
        .join("");
    } catch {
      listing = `<div class="thunar-error">Could not read ${this.escapeHtml(targetPath)}</div>`;
    }
    contentArea.innerHTML = `
      <div class="thunar-pathbar">Location: ${this.escapeHtml(targetPath)}</div>
      <div class="thunar-listing">${parentEntry}${listing}</div>
    `;
  }

  private renderEditorContent(el: HTMLElement, winId: string, content: EditorContent): void {
    const contentArea = el.querySelector(".win-content") as HTMLElement;
    if (!contentArea) return;
    if (contentArea.querySelector(".editor-textarea")) return;

    let fileText = "";
    try { fileText = this.shell.vfs.readFile(content.path); } catch { /* new file */ }

    contentArea.innerHTML = `
      <div class="editor-toolbar">
        <button class="editor-save-btn" data-win-id="${winId}">Save</button>
        <span class="editor-path">${this.escapeHtml(content.path)}</span>
        <span class="editor-dirty" data-win-id="${winId}" style="display:none">●</span>
      </div>
      <textarea class="editor-textarea" data-win-id="${winId}" spellcheck="false">${this.escapeHtml(fileText)}</textarea>
    `;

    const textarea = contentArea.querySelector(".editor-textarea") as HTMLTextAreaElement;
    const dirtyDot = contentArea.querySelector(".editor-dirty") as HTMLElement;

    textarea.addEventListener("input", () => {
      content.dirty = true;
      dirtyDot.style.display = "";
      const w = this.windows.find((ww) => ww.id === winId);
      if (w && !w.title.startsWith("*")) w.title = `*${w.title}`;
    });

    textarea.addEventListener("keydown", (e) => {
      e.stopPropagation(); // don't send keys to terminal
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        this.saveEditor(winId);
      }
    });

    contentArea.querySelector(".editor-save-btn")?.addEventListener("click", (e) => {
      e.stopPropagation();
      this.saveEditor(winId);
    });
  }

  private saveEditor(winId: string): void {
    const w = this.windows.find((ww) => ww.id === winId);
    if (!w || w.content.type !== "editor") return;
    const el = this.container.querySelector(`.desktop-window[data-win-id="${winId}"]`);
    if (!el) return;
    const textarea = el.querySelector(".editor-textarea") as HTMLTextAreaElement | null;
    if (!textarea) return;
    try {
      this.shell.vfs.writeFile(w.content.path, textarea.value);
      w.content.dirty = false;
      w.title = `Mousepad — ${w.content.path.split("/").pop()}`;
      const dirtyDot = el.querySelector(".editor-dirty") as HTMLElement | null;
      if (dirtyDot) dirtyDot.style.display = "none";
      const titleEl = el.querySelector(".win-title");
      if (titleEl) titleEl.textContent = w.title;
    } catch (err) {
      console.error("editor save failed", err);
    }
  }

  private renderAboutContent(el: HTMLElement): void {
    const contentArea = el.querySelector(".win-content") as HTMLElement;
    if (!contentArea) return;
    contentArea.innerHTML = `
      <div class="about-dialog">
        <div class="about-logo"><i class="fa-brands fa-linux"></i></div>
        <h2>Fortune GNU/Linux 1.0 Nyx</h2>
        <p>A simulated Linux environment running entirely in your browser.</p>
        <p>Kernel: ${this.shell.properties.kernel}</p>
        <p>Architecture: ${this.shell.properties.arch}</p>
        <p class="about-close-hint">Close this window to return</p>
      </div>
    `;
  }

  private updateClock(): void {
    const timeEl = this.container.querySelector(".xfce-clock-time");
    const dateEl = this.container.querySelector(".xfce-clock-date");
    if (!timeEl || !dateEl) return;
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    dateEl.textContent = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
  }

  private showContextMenu(x: number, y: number, items: Array<{ label: string; icon: string; danger?: boolean; action: () => void }>): void {
    this.closeContextMenu();
    const menu = document.createElement("div");
    menu.className = "desktop-context-menu";
    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
    for (const item of items) {
      const el = document.createElement("div");
      el.className = `ctx-item${item.danger ? " ctx-danger" : ""}`;
      el.innerHTML = `<i class="${item.icon}"></i><span>${this.escapeHtml(item.label)}</span>`;
      el.addEventListener("click", (e) => { e.stopPropagation(); this.closeContextMenu(); item.action(); });
      menu.appendChild(el);
    }
    this.container.appendChild(menu);
    // Clamp to viewport
    const rect = menu.getBoundingClientRect();
    if (rect.right > window.innerWidth) menu.style.left = `${x - rect.width}px`;
    if (rect.bottom > window.innerHeight) menu.style.top = `${y - rect.height}px`;
  }

  private closeContextMenu(): void {
    this.container.querySelector(".desktop-context-menu")?.remove();
  }

  private ensureTrashDir(): void {
    const parts = this.trashPath.split("/").filter(Boolean);
    let cur = "";
    for (const p of parts) {
      cur += `/${p}`;
      if (!this.shell.vfs.exists(cur)) this.shell.vfs.mkdir(cur, 0o700);
    }
  }

  private refreshThunarWindow(winId: string | null): void {
    if (!winId) return;
    const w = this.windows.find((ww) => ww.id === winId);
    if (!w || w.content.type !== "thunar") return;
    const wEl = this.container.querySelector(`.desktop-window[data-win-id="${winId}"] .win-content`) as HTMLElement | null;
    if (wEl) wEl.removeAttribute("data-thunar-path");
    this.renderWindowElement(w);
  }

  private moveToTrash(path: string, winId: string | null): void {
    this.ensureTrashDir();
    const name = path.split("/").pop() ?? "file";
    let dest = `${this.trashPath}/${name}`;
    let i = 1;
    while (this.shell.vfs.exists(dest)) dest = `${this.trashPath}/${name}.${i++}`;
    try {
      const content = this.shell.vfs.readFile(path);
      this.shell.vfs.writeFile(dest, content);
      this.shell.vfs.remove(path);
    } catch {
      // directory: not supported for now, just remove
      try { this.shell.vfs.remove(path, { recursive: true }); } catch { /* ignore */ }
    }
    this.refreshThunarWindow(winId);
  }

  private trashRestore(path: string, winId: string | null): void {
    const name = path.split("/").pop() ?? "file";
    const dest = `/root/${name}`;
    try {
      const content = this.shell.vfs.readFile(path);
      this.shell.vfs.writeFile(dest, content);
      this.shell.vfs.remove(path);
    } catch { /* ignore */ }
    this.refreshThunarWindow(winId);
  }

  private trashDelete(path: string, winId: string | null): void {
    try { this.shell.vfs.remove(path, { recursive: true }); } catch { /* ignore */ }
    this.refreshThunarWindow(winId);
  }

  private renamePrompt(path: string, winId: string | null): void {
    const oldName = path.split("/").pop() ?? "";
    const newName = window.prompt("Rename:", oldName);
    if (!newName || newName === oldName) return;
    const dir = path.substring(0, path.lastIndexOf("/"));
    const dest = `${dir}/${newName}`;
    try {
      const content = this.shell.vfs.readFile(path);
      this.shell.vfs.writeFile(dest, content);
      this.shell.vfs.remove(path);
    } catch { /* ignore */ }
    this.refreshThunarWindow(winId);
  }

  private escapeHtml(s: string): string {
    const div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }
}
