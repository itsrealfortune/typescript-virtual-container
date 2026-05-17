import type { VirtualShell } from "../VirtualShell";
import type { ShellStream } from "../types/streams";
import { keyToBytes } from "../utils/keyToBytes";
import { WebTermRenderer } from "./webTermRenderer";
import { ThunarManager } from "./thunarManager";
import { saveSession, loadSession, clearSession } from "./sessionManager";

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

export interface TaskManagerContent {
  type: "taskmanager";
  refreshInterval?: ReturnType<typeof setInterval>;
}

export interface EditorContent {
  type: "editor";
  path: string;
  dirty: boolean;
}

export type WindowContent = TerminalContent | ThunarContent | AboutContent | EditorContent | TaskManagerContent;

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
  private resizeState: { win: DesktopWindow; startX: number; startY: number; origW: number; origH: number } | null = null;
  private _renderGuard = false;
  private readonly trashPath = "/root/.local/share/Trash/files";
  private docListeners: Array<{ target: EventTarget; type: string; fn: EventListener }> = [];
  private pendingTimeouts: Set<ReturnType<typeof setTimeout>> = new Set();
  private thunar: ThunarManager;

  constructor(shell: VirtualShell, container: HTMLElement) {
    this.shell = shell;
    this.container = container;
    this.thunar = new ThunarManager({
      shell: this.shell,
      windows: this.windows,
      trashPath: this.trashPath,
      renderWindowElement: (w) => this.renderWindowElement(w),
      showContextMenu: (x, y, items) => this.showContextMenu(x, y, items),
      closeContextMenu: () => this.closeContextMenu(),
      createEditorWindow: (path) => this.createEditorWindow(path),
      escapeHtml: (s) => this.escapeHtml(s),
    }, container);
    this.setupEventDelegation();
  }

  isActive(): boolean { return this.active; }

  setOnExit(cb: () => void): void { this.onExit = cb; }

  start(): Promise<void> {
    if (this.active) return Promise.resolve();
    this.active = true;
    this.container.style.display = "block";
    this.renderAll();
    this.restoreSession();
    this.addDocListener(window, "beforeunload", () => saveSession(this.windows));
    this.clockInterval = setInterval(() => this.updateClock(), 30_000);
    return new Promise<void>((resolve) => {
      this.stopResolve = resolve;
    });
  }

  stop(): void {
    if (!this.active) return;
    this.active = false;
    clearSession();
    this.container.style.display = "none";
    if (this.clockInterval) clearInterval(this.clockInterval);
    this.clockInterval = undefined;
    for (const w of this.windows) {
      if (w.content.type === "taskmanager" && w.content.refreshInterval) {
        clearInterval(w.content.refreshInterval);
      }
    }
    this.windows = [];
    this.menuOpen = false;
    this.dragState = null;
    this.resizeState = null;
    for (const id of this.pendingTimeouts) clearTimeout(id);
    this.pendingTimeouts.clear();
    this.removeAllDocListeners();
    this.stopResolve?.();
    this.stopResolve = null;
    this.onExit?.();
  }

  private restoreSession(): void {
    const saved = loadSession();
    if (!saved || saved.length === 0) return;
    const created: Array<{ saved: typeof saved[number]; id: string }> = [];
    for (const sw of saved) {
      let id: string;
      switch (sw.contentType) {
        case "terminal": id = this.createTerminalWindow(); break;
        case "thunar":   id = this.createThunarWindow(sw.contentPath); break;
        case "editor":   id = this.createEditorWindow(sw.contentPath); break;
        case "about":    id = this.createAboutWindow(); break;
        default: continue;
      }
      created.push({ saved: sw, id });
    }
    for (const { saved: sw, id } of created) {
      const w = this.windows.find(ww => ww.id === id);
      if (!w) continue;
      w.x = sw.x;
      w.y = sw.y;
      w.width = sw.width;
      w.height = sw.height;
      w.minimized = sw.minimized;
      w.zIndex = sw.zIndex;
    }
    this.zCounter = Math.max(this.zCounter, ...saved.map(s => s.zIndex)) + 1;
    this.renderAll();
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

    const bytes = keyToBytes(e);
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

  createTaskManagerWindow(): string {
    const id = this.createWindow({
      title: "Task Manager",
      width: 640,
      height: 420,
      content: { type: "taskmanager" },
    });
    const w = this.windows.find(ww => ww.id === id);
    if (w && w.content.type === "taskmanager") {
      w.content.refreshInterval = setInterval(() => {
        const el = this.container.querySelector(`.desktop-window[data-win-id="${id}"]`) as HTMLElement | null;
        if (el) this.renderTaskManagerContent(el, id);
      }, 3000);
    }
    return id;
  }

  closeWindow(id: string): void {
    const idx = this.windows.findIndex((w) => w.id === id);
    if (idx === -1) return;
    const w = this.windows[idx]!;
    if (w.content.type === "taskmanager" && w.content.refreshInterval) {
      clearInterval(w.content.refreshInterval);
    }
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
        <div class="win-resize-handle"></div>
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
      this.thunar.renderContent(el, win.content);
    } else if (win.content.type === "about") {
      this.renderAboutContent(el);
    } else if (win.content.type === "editor") {
      this.renderEditorContent(el, win.id, win.content);
    } else if (win.content.type === "taskmanager") {
      this.renderTaskManagerContent(el, win.id);
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

      // Window content click → focus (don't block pathbar clicks)
      const winEl = target.closest(".desktop-window");
      if (winEl) {
        const id = winEl.getAttribute("data-win-id");
        if (id) {
          this.focusWindow(id);
          if (!target.closest(".thunar-pathbar")) {
            e.stopPropagation();
            return;
          }
        }
      }

      // Desktop icons
      const icon = target.closest(".desktop-icon");
      if (icon) {
        const action = icon.getAttribute("data-action");
        if (action === "terminal") this.createTerminalWindow();
        else if (action === "home") this.createThunarWindow("/root");
        else if (action === "editor") this.createEditorWindow();
        else if (action === "taskmanager") this.createTaskManagerWindow();
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

      // Task Manager: close desktop window
      if (target.classList.contains("taskmgr-close")) {
        const closeWinId = target.getAttribute("data-win-id");
        if (closeWinId) this.closeWindow(closeWinId);
        e.stopPropagation();
        return;
      }

      // Task Manager: kill button
      if (target.classList.contains("taskmgr-kill")) {
        const pid = Number(target.getAttribute("data-pid"));
        if (pid) {
          const sessions = this.shell.users.listActiveSessions();
          const sessionIdx = pid - 1000;
          if (sessionIdx >= 0 && sessionIdx < sessions.length) {
            this.shell.users.unregisterSession(sessions[sessionIdx]!.id);
          } else {
            this.shell.users.killProcess(pid);
          }
          const winId = target.closest(".desktop-window")?.getAttribute("data-win-id");
          if (winId) this.renderTaskManagerContent(
            this.container.querySelector(`.desktop-window[data-win-id="${winId}"]`) as HTMLElement,
            winId,
          );
        }
        e.stopPropagation();
        return;
      }

      // Task Manager: refresh button
      if (target.classList.contains("taskmgr-refresh") || target.closest(".taskmgr-refresh")) {
        const btn = target.classList.contains("taskmgr-refresh")
          ? target
          : target.closest(".taskmgr-refresh") as HTMLElement;
        const winId = btn.getAttribute("data-win-id");
        if (winId) this.renderTaskManagerContent(
          this.container.querySelector(`.desktop-window[data-win-id="${winId}"]`) as HTMLElement,
          winId,
        );
        e.stopPropagation();
        return;
      }

      // Menu items
      if (target.classList.contains("menu-item")) {
        const action = target.getAttribute("data-action");
        if (action === "terminal") this.createTerminalWindow();
        else if (action === "thunar") this.createThunarWindow();
        else if (action === "editor") this.createEditorWindow();
        else if (action === "taskmanager") this.createTaskManagerWindow();
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

    // Close context menu on click elsewhere
    this.addDocListener(document, "click", () => this.closeContextMenu());

    // Mouse down for window resizing
    this.container.addEventListener("mousedown", (e) => {
      const handle = (e.target as HTMLElement).closest(".win-resize-handle");
      if (!handle) return;
      const winEl = handle.closest(".desktop-window") as HTMLElement | null;
      if (!winEl) return;
      const id = winEl.getAttribute("data-win-id");
      if (!id) return;
      const win = this.windows.find((w) => w.id === id);
      if (!win) return;
      this.resizeState = { win, startX: e.clientX, startY: e.clientY, origW: win.width, origH: win.height };
      e.preventDefault();
      e.stopPropagation();
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

    // Mouse move for dragging/resizing — not tracked in docListeners so it survives stop()/start() cycles
    document.addEventListener("mousemove", (e) => {
      if (this.resizeState) {
        const dx = e.clientX - this.resizeState.startX;
        const dy = e.clientY - this.resizeState.startY;
        this.resizeState.win.width = Math.max(240, this.resizeState.origW + dx);
        this.resizeState.win.height = Math.max(120, this.resizeState.origH + dy);
        this.renderWindowPositions();
        return;
      }
      if (!this.dragState) return;
      const dx = e.clientX - this.dragState.startX;
      const dy = e.clientY - this.dragState.startY;
      this.dragState.win.x = Math.max(0, this.dragState.origX + dx);
      this.dragState.win.y = Math.max(0, this.dragState.origY + dy);
      this.renderWindowPositions();
    });

    // Mouse up to end drag/resize — same reason as mousemove above
    document.addEventListener("mouseup", () => {
      this.dragState = null;
      this.resizeState = null;
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

    // Editor: delegate keydown (Ctrl+S save, stop propagation to terminal)
    this.container.addEventListener("keydown", (e) => {
      const textarea = e.target as HTMLElement;
      if (!textarea.classList.contains("editor-textarea")) return;
      e.stopPropagation();
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        const winId = textarea.getAttribute("data-win-id");
        if (winId) this.saveEditor(winId);
      }
    });

    // Editor: delegate input → dirty flag
    this.container.addEventListener("input", (e) => {
      const textarea = e.target as HTMLElement;
      if (!textarea.classList.contains("editor-textarea")) return;
      const winId = textarea.getAttribute("data-win-id");
      if (!winId) return;
      const w = this.windows.find((ww) => ww.id === winId);
      if (!w || w.content.type !== "editor") return;
      w.content.dirty = true;
      const dot = textarea.closest(".win-content")?.querySelector(".editor-dirty") as HTMLElement | null;
      if (dot) dot.style.display = "";
      if (!w.title.startsWith("*")) w.title = `*${w.title}`;
    });

    // Editor: delegate save button click
    this.container.addEventListener("click", (e) => {
      const btn = (e.target as HTMLElement).closest(".editor-save-btn") as HTMLElement | null;
      if (!btn) return;
      e.stopPropagation();
      const winId = btn.getAttribute("data-win-id");
      if (winId) this.saveEditor(winId);
    }, true); // capture phase so it fires before the generic click handler
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
      panel.innerHTML = `
        <div class="xfce-menu-button">
          <i class="fa-solid fa-paw xfce-logo"></i>
          Applications
        </div>
        <div class="xfce-window-list"></div>
        <div class="xfce-tray">
          <span class="xfce-tray-icon" title="Network"><i class="fa-solid fa-wifi"></i></span>
          <span class="xfce-tray-icon" title="Volume"><i class="fa-solid fa-volume-high"></i></span>
        </div>
        <div class="xfce-clock">
          <span class="xfce-clock-time"></span>
          <span class="xfce-clock-date"></span>
        </div>
      `;
      this.container.prepend(panel);

      // Delegated click on window list — attached once
      const list = panel.querySelector(".xfce-window-list") as HTMLElement;
      list.addEventListener("click", (e) => {
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

    // Update only what changes: task buttons, clock, menu
    const list = panel.querySelector(".xfce-window-list") as HTMLElement;
    list.innerHTML = this.windows.map((w) =>
      `<span class="xfce-taskbutton${w.focused ? " active" : ""}" data-win-id="${w.id}">${this.escapeHtml(w.title)}</span>`
    ).join("");

    const now = new Date();
    const timeEl = panel.querySelector(".xfce-clock-time");
    const dateEl = panel.querySelector(".xfce-clock-date");
    if (timeEl) timeEl.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    if (dateEl) dateEl.textContent = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });

    let menu = panel.querySelector(".xfce-menu") as HTMLElement | null;
    if (this.menuOpen && !menu) {
      menu = document.createElement("div");
      menu.className = "xfce-menu";
      menu.innerHTML = `
        <div class="menu-category">System</div>
        <div class="menu-item" data-action="terminal"><span class="menu-item-icon"><i class="fa-solid fa-terminal"></i></span>Terminal</div>
        <div class="menu-item" data-action="thunar"><span class="menu-item-icon"><i class="fa-solid fa-folder-open"></i></span>File Manager</div>
        <div class="menu-item" data-action="editor"><span class="menu-item-icon"><i class="fa-solid fa-file-pen"></i></span>Text Editor</div>
        <div class="menu-item" data-action="taskmanager"><span class="menu-item-icon"><i class="fa-solid fa-chart-bar"></i></span>Task Manager</div>
        <div class="menu-separator"></div>
        <div class="menu-item" data-action="about"><span class="menu-item-icon"><i class="fa-solid fa-circle-info"></i></span>About Fortune GNU/Linux</div>
        <div class="menu-separator"></div>
        <div class="menu-item" data-action="logout"><span class="menu-item-icon"><i class="fa-solid fa-power-off"></i></span>Log Out</div>
      `;
      panel.appendChild(menu);
    } else if (!this.menuOpen && menu) {
      menu.remove();
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
      <div class="desktop-icon" data-action="taskmanager">
        <div class="desktop-icon-img taskmgr-icon"><i class="fa-solid fa-chart-bar"></i></div>
        <span>Task Manager</span>
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
      el.style.width = `${w.width}px`;
      el.style.height = `${w.height}px`;
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

  }

  private saveEditor(winId: string): void {
    const w = this.windows.find((ww) => ww.id === winId);
    if (!w || w.content.type !== "editor") return;
    const el = this.container.querySelector(`.desktop-window[data-win-id="${winId}"]`);
    if (!el) return;
    const textarea = el.querySelector(".editor-textarea") as HTMLTextAreaElement | null;
    if (!textarea) return;

    // If path is still untitled, prompt for a filename before saving
    if (w.content.path.endsWith("untitled.txt")) {
      const input = window.prompt("Save as:", "untitled.txt");
      if (!input?.trim()) return;
      const name = input.trim();
      const dir = w.content.path.substring(0, w.content.path.lastIndexOf("/"));
      w.content.path = `${dir}/${name}`;
      // Update the path label in the toolbar
      const pathEl = el.querySelector(".editor-path") as HTMLElement | null;
      if (pathEl) pathEl.textContent = w.content.path;
    }

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

  private renderTaskManagerContent(el: HTMLElement, winId: string): void {
    const contentArea = el.querySelector(".win-content") as HTMLElement;
    if (!contentArea) return;

    const sessions = this.shell.users.listActiveSessions();
    const processes = this.shell.users.listProcesses();
    const desktopWindows = this.windows.filter(w => w.id !== winId && w.content.type !== "taskmanager");

    let rows = "";

    for (const w of desktopWindows) {
      const icon = w.content.type === "terminal" ? "fa-terminal"
        : w.content.type === "thunar" ? "fa-folder-open"
        : w.content.type === "editor" ? "fa-file-pen"
        : w.content.type === "about" ? "fa-circle-info"
        : "fa-window-restore";
      rows += `<tr>
        <td>—</td>
        <td>root</td>
        <td><i class="fa-solid ${icon}"></i> ${this.escapeHtml(w.title)}</td>
        <td>desktop</td>
        <td><span class="taskmgr-status running">running</span></td>
        <td><button class="taskmgr-close" data-win-id="${w.id}">Close</button></td>
      </tr>`;
    }

    for (let i = 0; i < sessions.length; i++) {
      const s = sessions[i]!;
      const pid = 1000 + i;
      rows += `<tr>
        <td>${pid}</td>
        <td>${this.escapeHtml(s.username)}</td>
        <td>bash</td>
        <td>${this.escapeHtml(s.tty)}</td>
        <td><span class="taskmgr-status running">running</span></td>
        <td><button class="taskmgr-kill" data-pid="${pid}">Kill</button></td>
      </tr>`;
    }
    for (const p of processes) {
      const statusClass = p.status === "running" ? "running" : p.status === "stopped" ? "stopped" : "done";
      rows += `<tr>
        <td>${p.pid}</td>
        <td>${this.escapeHtml(p.username)}</td>
        <td>${this.escapeHtml(p.command)}</td>
        <td>${this.escapeHtml(p.tty)}</td>
        <td><span class="taskmgr-status ${statusClass}">${p.status}</span></td>
        <td><button class="taskmgr-kill" data-pid="${p.pid}">Kill</button></td>
      </tr>`;
    }

    const total = desktopWindows.length + sessions.length + processes.length;

    contentArea.innerHTML = `
      <div class="taskmgr-toolbar">
        <span class="taskmgr-count">${total} processes</span>
        <button class="taskmgr-refresh" data-win-id="${winId}"><i class="fa-solid fa-rotate"></i> Refresh</button>
      </div>
      <div class="taskmgr-table-wrap">
        <table class="taskmgr-table">
          <thead><tr><th>PID</th><th>User</th><th>Command</th><th>TTY</th><th>Status</th><th></th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  }

  private updateClock(): void {
    const panel = this.container.querySelector("#desktop-panel");
    if (!panel) return;
    const now = new Date();
    const timeEl = panel.querySelector(".xfce-clock-time");
    const dateEl = panel.querySelector(".xfce-clock-date");
    if (timeEl) timeEl.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    if (dateEl) dateEl.textContent = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
  }

  private showContextMenu(x: number, y: number, items: Array<{ label: string; icon: string; danger?: boolean; action: () => void }>): void {
    this.closeContextMenu();
    const menu = document.createElement("div");
    menu.className = "desktop-context-menu";
    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
    for (let i = 0; i < items.length; i++) {
      const item = items[i]!;
      const el = document.createElement("div");
      el.className = `ctx-item${item.danger ? " ctx-danger" : ""}`;
      el.innerHTML = `<i class="${item.icon}"></i><span>${this.escapeHtml(item.label)}</span>`;
      el.setAttribute("data-ctx-index", String(i));
      menu.appendChild(el);
    }
    // Single delegated listener — avoids one closure per item surviving after menu.remove()
    menu.addEventListener("click", (e) => {
      const el = (e.target as HTMLElement).closest(".ctx-item") as HTMLElement | null;
      if (!el) return;
      e.stopPropagation();
      const idx = Number(el.getAttribute("data-ctx-index"));
      this.closeContextMenu();
      items[idx]?.action();
    });
    this.container.appendChild(menu);
    // Clamp to viewport
    const rect = menu.getBoundingClientRect();
    if (rect.right > window.innerWidth) menu.style.left = `${x - rect.width}px`;
    if (rect.bottom > window.innerHeight) menu.style.top = `${y - rect.height}px`;
  }

  private closeContextMenu(): void {
    this.container.querySelector(".desktop-context-menu")?.remove();
  }

  private escapeHtml(s: string): string {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
}
