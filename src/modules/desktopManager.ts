/**
 * desktopManager.ts — XFCE-like desktop environment manager for browser rendering.
 *
 * Manages a virtual desktop with draggable, resizable, minimizable windows
 * containing terminals, file managers (Thunar), text editors, about dialogs,
 * and task managers. Supports session persistence via localStorage.
 *
 * Key features:
 *  - Window management (create, close, minimize, maximize, focus, drag, resize)
 *  - Terminal windows backed by WebTermRenderer and VirtualShell
 *  - Thunar file manager with context menus and file operations
 *  - Nano editor integration for in-browser text editing
 *  - Task manager with live process list
 *  - Session save/restore via localStorage
 *
 * Public API:
 *  - DesktopManager     — main class managing the desktop and all windows
 *  - DesktopWindow      — interface representing a single window
 *  - WindowContent      — union type for window content variants
 */
import type { VirtualShell } from "../modules/VirtualShell";
import type { ShellStream } from "../types/streams";
import { keyToBytes } from "../utils/keyToBytes";
import { clearSession, loadSession, saveSession } from "./sessionManager";
import { ThunarManager } from "./thunarManager";
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
  maximized: boolean;
  savedRect: { x: number; y: number; width: number; height: number } | null;
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

/**
 * XFCE-like desktop environment manager for browser rendering.
 *
 * Manages a virtual desktop with draggable, resizable, minimizable windows
 * containing terminals, file managers, text editors, about dialogs, and task
 * managers. Supports session persistence via localStorage.
 *
 * @example
 * ```ts
 * const shell = new VirtualShell("desktop-vm");
 * await shell.ensureInitialized();
 *
 * const desktop = new DesktopManager(shell, document.getElementById("desktop")!);
 * desktop.setOnExit(() => console.log("Desktop closed"));
 *
 * // Start the desktop (returns a promise that resolves on stop)
 * desktop.start();
 *
 * // Create windows programmatically
 * desktop.createTerminalWindow();
 * desktop.createThunarWindow("/home/user");
 * desktop.createEditorWindow("/home/user/notes.txt");
 * ```
 */
export class DesktopManager {
  private _shell: VirtualShell;
  private _container: HTMLElement;
  private _active = false;
  private _windows: DesktopWindow[] = [];
  private _zCounter = 100;
  private _menuOpen = false;
  private _nextWinId = 0;
  private clockInterval?: ReturnType<typeof setInterval>;
  private _onExit: (() => void) | null = null;
  private _stopResolve: (() => void) | null = null;
  private _dragState: { win: DesktopWindow; startX: number; startY: number; origX: number; origY: number } | null = null;
  private _resizeState: { win: DesktopWindow; startX: number; startY: number; origW: number; origH: number } | null = null;
  private _renderGuard = false;
  private readonly _trashPath = "/root/.local/share/Trash/files";
  private _docListeners: Array<{ target: EventTarget; type: string; fn: EventListener }> = [];
  /** Global document listeners that must be cleaned up on stop(). */
  private _globalDocListeners: Array<{ type: string; fn: EventListener }> = [];
  private _pendingTimeouts: Set<ReturnType<typeof setTimeout>> = new Set();
  private _thunar: ThunarManager;

  /**
   * Creates a desktop manager bound to a VirtualShell and DOM container.
   * @param shell - VirtualShell providing filesystem and command execution.
   * @param container - DOM element to render the desktop into.
   */
  constructor(shell: VirtualShell, container: HTMLElement) {
    this._shell = shell;
    this._container = container;
    this._thunar = new ThunarManager({
      shell: this._shell,
      windows: this._windows,
      trashPath: this._trashPath,
      renderWindowElement: (w) => this._renderWindowElement(w),
      showContextMenu: (x, y, items) => this._showContextMenu(x, y, items),
      closeContextMenu: () => this._closeContextMenu(),
      createEditorWindow: (path) => this.createEditorWindow(path),
      escapeHtml: (s) => this._escapeHtml(s),
    }, container);
    this._setupEventDelegation();
  }

  /** Returns true if the desktop is currently active and rendered. */
  isActive(): boolean { return this._active; }

  /** Set a callback invoked when the desktop is stopped. */
  setOnExit(cb: () => void): void { this._onExit = cb; }

  /**
   * Start the desktop environment. Renders the desktop UI and restores
   * any previously saved session. Returns a promise that resolves when
   * `stop()` is called.
   */
  start(): Promise<void> {
    if (this._active) return Promise.resolve();
    this._active = true;
    this._container.style.display = "block";
    this._renderAll();
    this._restoreSession();
    this._addDocListener(window, "beforeunload", () => saveSession(this._windows));
    this.clockInterval = setInterval(() => this._updateClock(), 30_000);
    return new Promise<void>((resolve) => {
      this._stopResolve = resolve;
    });
  }

  /**
   * Stop the desktop environment. Clears all windows, stops the clock,
   * removes event listeners, and resolves the start() promise.
   */
  stop(): void {
    if (!this._active) return;
    this._active = false;
    clearSession();
    this._container.style.display = "none";
    if (this.clockInterval) clearInterval(this.clockInterval);
    this.clockInterval = undefined;
    for (const w of this._windows) {
      if (w.content.type === "taskmanager" && w.content.refreshInterval) {
        clearInterval(w.content.refreshInterval);
      }
    }
    this._windows = [];
    this._menuOpen = false;
    this._dragState = null;
    this._resizeState = null;
    for (const id of this._pendingTimeouts) clearTimeout(id);
    this._pendingTimeouts.clear();
    this._removeAllDocListeners();
    this._stopResolve?.();
    this._stopResolve = null;
    this._onExit?.();
  }

  private _restoreSession(): void {
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
      const w = this._windows.find(ww => ww.id === id);
      if (!w) continue;
      w.x = sw.x;
      w.y = sw.y;
      w.width = sw.width;
      w.height = sw.height;
      w.minimized = sw.minimized;
      w.maximized = sw.maximized ?? false;
      w.savedRect = sw.savedRect ?? null;
      w.zIndex = sw.zIndex;
    }
    this._zCounter = Math.max(this._zCounter, ...saved.map(s => s.zIndex)) + 1;
    this._renderAll();
  }

  /**
   * Get the focused terminal window's stream and DOM element.
   * Returns null if no terminal is focused or all are minimized.
   * @returns Terminal stream, data listeners, and pre element for rendering.
   */
  getFocusedTerminal(): { stream: ShellStream; dataListeners: Array<(chunk: Buffer) => void>; preEl: HTMLPreElement } | null {
    for (const w of this._windows) {
      if (w.content.type === "terminal" && w.focused && !w.minimized) {
        const { stream, preEl } = w.content;
        if (stream === undefined || preEl === undefined) continue;
        return {
          stream,
          dataListeners: w.content.dataListeners,
          preEl,
        };
      }
    }
    return null;
  }

  /**
   * Handle a keyboard event and forward keystrokes to the focused terminal.
   * Handles Ctrl+C/V passthrough and Escape to close the panel menu.
   * @param e - Keyboard event from the browser.
   */
  handleKeyDown(e: KeyboardEvent): void {
    if (!this._active) return;

    if (e.key === "Escape" && this._menuOpen) {
      this._menuOpen = false;
      this._renderPanel();
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

  /**
   * Handle a paste event and forward the clipboard text to the focused terminal.
   * @param e - Clipboard event from the browser.
   */
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

  /**
   * Create a new terminal window with an interactive shell session.
   * @returns The unique window ID.
   */
  createTerminalWindow(): string {
    const cols = 80;
    const rows = 24;
    const termRenderer = new WebTermRenderer(rows, cols);

    const dataListeners: Array<(chunk: Buffer) => void> = [];
    const closeListeners: Array<() => void> = [];

    const id = this._createWindow({
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
        this._renderTerminalContentById(winId);
      },
      exit: () => undefined,
      end: () => { for (const l of closeListeners) l(); },
      on: (event: "data" | "close", listener: ((chunk: Buffer) => void) & (() => void)) => {
        if (event === "data") dataListeners.push(listener);
        else if (event === "close") closeListeners.push(listener as () => void);
      },
    };

    // Attach stream to the window
    const w = this._windows.find((ww) => ww.id === winId);
    if (w && w.content.type === "terminal") {
      w.content.stream = stream;
    }

    // Start shell asynchronously so the calling command can finish first
    const tid = setTimeout(() => {
      this._pendingTimeouts.delete(tid);
      this._shell.startInteractiveSession(stream, "root", null, "desktop", { cols, rows });
    }, 0);
    this._pendingTimeouts.add(tid);

    return id;
  }

  /**
   * Create a new Thunar file manager window.
   * @param path - Initial directory to browse (default: "/root").
   * @returns The unique window ID.
   */
  createThunarWindow(path = "/root"): string {
    return this._createWindow({
      title: `Thunar: ${path}`,
      width: 600,
      height: 400,
      content: { type: "thunar", path },
    });
  }

  /**
   * Create a new text editor window (Nano-based).
   * @param path - File path to open (default: "/root/untitled.txt").
   * @returns The unique window ID.
   */
  createEditorWindow(path = "/root/untitled.txt"): string {
    const id = this._createWindow({
      title: `Mousepad — ${path.split("/").pop()}`,
      width: 640,
      height: 480,
      content: { type: "editor", path, dirty: false },
    });
    // Attach save/input listeners via event delegation (handled in setupEventDelegation)
    return id;
  }

  /**
   * Create an "About" window showing system information.
   * @returns The unique window ID.
   */
  createAboutWindow(): string {
    return this._createWindow({
      title: "About Fortune GNU/Linux",
      width: 400,
      height: 280,
      content: { type: "about" },
    });
  }

  /**
   * Create a task manager window showing running processes.
   * @returns The unique window ID.
   */
  createTaskManagerWindow(): string {
    const id = this._createWindow({
      title: "Task Manager",
      width: 640,
      height: 420,
      content: { type: "taskmanager" },
    });
    const w = this._windows.find(ww => ww.id === id);
    if (w && w.content.type === "taskmanager") {
      w.content.refreshInterval = setInterval(() => {
        const el = this._container.querySelector(`.desktop-window[data-win-id="${id}"]`) as HTMLElement | null;
        if (el) this._renderTaskManagerContent(el, id);
      }, 3000);
    }
    return id;
  }

  /**
   * Close a window by ID. Removes it from the desktop and cleans up resources.
   * @param id - Window ID to close.
   */
  closeWindow(id: string): void {
    const idx = this._windows.findIndex((w) => w.id === id);
    if (idx === -1) return;
    const w = this._windows[idx];
    if (w === undefined) return;
    if (w.content.type === "taskmanager" && w.content.refreshInterval) {
      clearInterval(w.content.refreshInterval);
    }
    if (w.content.type === "terminal") {
      // End the shell stream if it exists
      if (w.content.stream && typeof w.content.stream.end === "function") w.content.stream.end();
      // Clear data listeners array (stream will be GC'd when window closes)
      w.content.dataListeners = [];
      w.content.stream = undefined;
    }
    this._windows.splice(idx, 1);
    if (this._windows.length > 0) {
      this.focusWindow((this._windows[this._windows.length - 1] as DesktopWindow).id);
    }
    this._renderAll();
  }

  /**
   * Toggle the minimized state of a window.
   * @param id - Window ID to toggle.
   */
  toggleMinimize(id: string): void {
    const w = this._windows.find((ww) => ww.id === id);
    if (!w) return;
    w.minimized = !w.minimized;
    if (!w.minimized) this.focusWindow(id);
    else this._renderAll();
  }

  /**
   * Toggle the maximized state of a window.
   * When maximizing, saves the current rect for restoration.
   * @param id - Window ID to toggle.
   */
  toggleMaximize(id: string): void {
    const w = this._windows.find((ww) => ww.id === id);
    if (!w) return;
    if (w.maximized) {
      this._unmaximize(w);
    } else {
      w.savedRect = { x: w.x, y: w.y, width: w.width, height: w.height };
      const panelEl = this._container.querySelector("#desktop-panel") as HTMLElement | null;
      const panelH = panelEl?.offsetHeight ?? 28;
      w.x = 0;
      w.y = panelH;
      w.width = this._container.clientWidth;
      w.height = this._container.clientHeight - panelH;
      w.maximized = true;
    }
    this._renderAll();
  }

  private _unmaximize(w: DesktopWindow): void {
    if (w.savedRect) {
      w.x = w.savedRect.x;
      w.y = w.savedRect.y;
      w.width = w.savedRect.width;
      w.height = w.savedRect.height;
    }
    w.maximized = false;
  }

  /**
   * Bring a window to the front and mark it as focused.
   * @param id - Window ID to focus.
   */
  focusWindow(id: string): void {
    for (const w of this._windows) w.focused = false;
    const w = this._windows.find((ww) => ww.id === id);
    if (w) {
      w.focused = true;
      w.zIndex = ++this._zCounter;
      w.minimized = false;
    }
    this._renderAll();
  }

  // ── Internal ──────────────────────────────────────────────────────

  private _createWindow(opts: { title: string; width: number; height: number; content: WindowContent }): string {
    const id = `win-${++this._nextWinId}`;
    const count = this._windows.length;
    const offset = count * 30;
    const win: DesktopWindow = {
      id,
      title: opts.title,
      x: 60 + offset,
      y: 40 + offset,
      width: opts.width,
      height: opts.height,
      minimized: false,
      maximized: false,
      savedRect: null,
      focused: true,
      zIndex: ++this._zCounter,
      content: opts.content,
    };
    for (const w of this._windows) w.focused = false;
    this._windows.push(win);
    // Create DOM element synchronously (not guarded) so it exists for stream writes
    this._ensureWindowElement(win);
    this._renderWindowElement(win);
    this._renderAll();
    return id;
  }

  private _ensureWindowElement(win: DesktopWindow): HTMLElement {
    let el = this._container.querySelector(`.desktop-window[data-win-id="${win.id}"]`) as HTMLElement;
    if (!el) {
      el = document.createElement("div");
      el.className = "desktop-window";
      el.setAttribute("data-win-id", win.id);
      el.innerHTML = `
        <div class="win-header">
          <span class="win-title">${this._escapeHtml(win.title)}</span>
          <div class="win-controls">
            <button class="win-min">─</button>
            <button class="win-max"></button>
            <button class="win-close">✕</button>
          </div>
        </div>
        <div class="win-content"></div>
        <div class="win-resize-handle"></div>
      `;
      this._container.appendChild(el);
    }
    return el;
  }

  private _renderWindowElement(win: DesktopWindow): void {
    const el = this._ensureWindowElement(win);
    el.style.left = `${win.x}px`;
    el.style.top = `${win.y}px`;
    el.style.width = `${win.width}px`;
    el.style.height = `${win.height}px`;
    el.style.zIndex = String(win.zIndex);
    el.classList.toggle("win-focused", win.focused);
    const maxBtn = el.querySelector(".win-max") as HTMLElement | null;
    if (maxBtn) maxBtn.textContent = win.maximized ? "🗗" : "□";

    if (win.content.type === "terminal") {
      this._renderTerminalContentById(win.id);
    } else if (win.content.type === "thunar") {
      this._thunar.renderContent(el, win.content);
    } else if (win.content.type === "about") {
      this._renderAboutContent(el);
    } else if (win.content.type === "editor") {
      this._renderEditorContent(el, win.id, win.content);
    } else if (win.content.type === "taskmanager") {
      this._renderTaskManagerContent(el, win.id);
    }
  }

  private _addDocListener(target: EventTarget, type: string, fn: EventListener): void {
    target.addEventListener(type, fn);
    this._docListeners.push({ target, type, fn });
  }

  private _removeAllDocListeners(): void {
    for (const { target, type, fn } of this._docListeners) {
      target.removeEventListener(type, fn);
    }
    this._docListeners = [];
    for (const { type, fn } of this._globalDocListeners) {
      document.removeEventListener(type, fn);
    }
    this._globalDocListeners = [];
  }

  private _setupEventDelegation(): void {
    // Delegate click events
    this._container.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (!this._active) return;

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

      // Maximize button
      const maxBtn = target.closest(".win-max");
      if (maxBtn) {
        const id = maxBtn.closest(".desktop-window")?.getAttribute("data-win-id");
        if (id) this.toggleMaximize(id);
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
        else if (action === "trash") this.createThunarWindow(this._trashPath);
        e.stopPropagation();
        return;
      }

      // Panel menu button
      if (target.classList.contains("xfce-menu-button") || target.closest(".xfce-menu-button")) {
        this._menuOpen = !this._menuOpen;
        this._renderPanel();
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
          const sessions = this._shell.users.listActiveSessions();
          const sessionIdx = pid - 1000;
          if (sessionIdx >= 0 && sessionIdx < sessions.length) {
            this._shell.users.unregisterSession((sessions[sessionIdx] as (typeof sessions)[number]).id);
          } else {
            this._shell.users.killProcess(pid);
          }
          const winId = target.closest(".desktop-window")?.getAttribute("data-win-id");
          if (winId) this._renderTaskManagerContent(
            this._container.querySelector(`.desktop-window[data-win-id="${winId}"]`) as HTMLElement,
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
        if (winId) this._renderTaskManagerContent(
          this._container.querySelector(`.desktop-window[data-win-id="${winId}"]`) as HTMLElement,
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
        this._menuOpen = false;
        this._renderPanel();
        return;
      }

      // Click outside menu → close it
      if (this._menuOpen) {
        this._menuOpen = false;
        this._renderPanel();
      }
    });

    // Close context menu on click elsewhere
    this._addDocListener(document, "click", () => this._closeContextMenu());

    // Mouse down for window resizing
    this._container.addEventListener("mousedown", (e) => {
      const handle = (e.target as HTMLElement).closest(".win-resize-handle");
      if (!handle) return;
      const winEl = handle.closest(".desktop-window") as HTMLElement | null;
      if (!winEl) return;
      const id = winEl.getAttribute("data-win-id");
      if (!id) return;
      const win = this._windows.find((w) => w.id === id);
      if (!win) return;
      this._resizeState = { win, startX: e.clientX, startY: e.clientY, origW: win.width, origH: win.height };
      e.preventDefault();
      e.stopPropagation();
    });

    // Mouse down for window dragging
    this._container.addEventListener("mousedown", (e) => {
      const header = (e.target as HTMLElement).closest(".win-header");
      if (!header) return;
      const winEl = header.closest(".desktop-window") as HTMLElement | null;
      if (!winEl) return;
      const id = winEl.getAttribute("data-win-id");
      if (!id) return;
      const win = this._windows.find((w) => w.id === id);
      if (!win) return;
      this.focusWindow(id);

      if (win.maximized) {
        this._unmaximize(win);
      }

      this._dragState = {
        win,
        startX: e.clientX,
        startY: e.clientY,
        origX: win.x,
        origY: win.y,
      };
      e.preventDefault();
    });

    const mouseMoveFn = (e: Event) => {
      const me = e as MouseEvent;
      if (this._resizeState) {
        const dx = me.clientX - this._resizeState.startX;
        const dy = me.clientY - this._resizeState.startY;
        this._resizeState.win.width = Math.max(240, this._resizeState.origW + dx);
        this._resizeState.win.height = Math.max(120, this._resizeState.origH + dy);
        this._renderWindowPositions();
        return;
      }
      if (!this._dragState) return;
      const dx = me.clientX - this._dragState.startX;
      const dy = me.clientY - this._dragState.startY;
      this._dragState.win.x = Math.max(0, this._dragState.origX + dx);
      this._dragState.win.y = Math.max(0, this._dragState.origY + dy);
      this._renderWindowPositions();
    };
    document.addEventListener("mousemove", mouseMoveFn);
    this._globalDocListeners.push({ type: "mousemove", fn: mouseMoveFn });

    const mouseUpFn = () => {
      this._dragState = null;
      this._resizeState = null;
    };
    document.addEventListener("mouseup", mouseUpFn);
    this._globalDocListeners.push({ type: "mouseup", fn: mouseUpFn });

    // Double-click title bar → toggle maximize
    this._container.addEventListener("dblclick", (e) => {
      if (!this._active) return;
      const header = (e.target as HTMLElement).closest(".win-header");
      if (header) {
        const id = header.closest(".desktop-window")?.getAttribute("data-win-id");
        if (id) this.toggleMaximize(id);
        e.stopPropagation();
      }
    });

    // Paste delegation for terminal windows
    this._container.addEventListener("paste", (e: ClipboardEvent) => {
      this.handlePaste(e);
    });

    // Keyboard input for desktop terminal windows (document-level so focus doesn't matter)
    this._addDocListener(document, "keydown", (e) => {
      if (!this._active) return;
      if ((e.target as HTMLElement)?.classList?.contains("editor-textarea")) return;
      this.handleKeyDown(e as KeyboardEvent);
    });

    // Editor: delegate keydown (Ctrl+S save, stop propagation to terminal)
    this._container.addEventListener("keydown", (e) => {
      const textarea = e.target as HTMLElement;
      if (!textarea.classList.contains("editor-textarea")) return;
      e.stopPropagation();
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        const winId = textarea.getAttribute("data-win-id");
        if (winId) this._saveEditor(winId);
      }
    });

    // Editor: delegate input → dirty flag
    this._container.addEventListener("input", (e) => {
      const textarea = e.target as HTMLElement;
      if (!textarea.classList.contains("editor-textarea")) return;
      const winId = textarea.getAttribute("data-win-id");
      if (!winId) return;
      const w = this._windows.find((ww) => ww.id === winId);
      if (!w || w.content.type !== "editor") return;
      w.content.dirty = true;
      const dot = textarea.closest(".win-content")?.querySelector(".editor-dirty") as HTMLElement | null;
      if (dot) dot.style.display = "";
      if (!w.title.startsWith("*")) w.title = `*${w.title}`;
    });

    // Editor: delegate save button click
    this._container.addEventListener("click", (e) => {
      const btn = (e.target as HTMLElement).closest(".editor-save-btn") as HTMLElement | null;
      if (!btn) return;
      e.stopPropagation();
      const winId = btn.getAttribute("data-win-id");
      if (winId) this._saveEditor(winId);
    }, true); // capture phase so it fires before the generic click handler
  }
  // ── Rendering ──────────────────────────────────────────────────────

  private _renderAll(): void {
    if (this._renderGuard) return;
    this._renderGuard = true;
    try {
      this._renderPanel();
      this._renderDesktopIcons();
      this._renderWindows();
    } finally {
      this._renderGuard = false;
    }
  }

  private _renderPanel(): void {
    let panel = this._container.querySelector("#desktop-panel") as HTMLElement;
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
      this._container.prepend(panel);

      // Delegated click on window list — attached once
      const list = panel.querySelector(".xfce-window-list") as HTMLElement;
      list.addEventListener("click", (e) => {
        e.stopPropagation();
        const btn = (e.target as HTMLElement).closest(".xfce-taskbutton") as HTMLElement | null;
        if (!btn) return;
        const id = btn.getAttribute("data-win-id");
        if (!id) return;
        const w = this._windows.find((ww) => ww.id === id);
        if (!w) return;
        if (w.focused && !w.minimized) { this.toggleMinimize(id); }
        else { this.focusWindow(id); }
      });
    }

    // Update only what changes: task buttons, clock, menu
    const list = panel.querySelector(".xfce-window-list") as HTMLElement;
    list.innerHTML = this._windows.map((w) =>
      `<span class="xfce-taskbutton${w.focused ? " active" : ""}" data-win-id="${w.id}">${this._escapeHtml(w.title)}</span>`
    ).join("");

    const now = new Date();
    const timeEl = panel.querySelector(".xfce-clock-time");
    const dateEl = panel.querySelector(".xfce-clock-date");
    if (timeEl) timeEl.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    if (dateEl) dateEl.textContent = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });

    let menu = panel.querySelector(".xfce-menu") as HTMLElement | null;
    if (this._menuOpen && !menu) {
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
    } else if (!this._menuOpen && menu) {
      menu.remove();
    }
  }

  private _renderDesktopIcons(): void {
    let area = this._container.querySelector("#desktop-area") as HTMLElement;
    if (!area) {
      area = document.createElement("div");
      area.id = "desktop-area";
      this._container.appendChild(area);
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

  private _renderWindows(): void {
    const existing = this._container.querySelectorAll(".desktop-window");
    for (const el of existing) {
      const id = (el as HTMLElement).getAttribute("data-win-id");
      if (!id || !this._windows.some((w) => w.id === id && !w.minimized)) {
        el.remove();
      }
    }
    for (const w of this._windows) {
      if (w.minimized) {
        const el = this._container.querySelector(`.desktop-window[data-win-id="${w.id}"]`);
        if (el) el.remove();
      } else {
        this._renderWindowElement(w);
      }
    }
  }

  private _renderWindowPositions(): void {
    for (const w of this._windows) {
      if (w.minimized) continue;
      const el = this._container.querySelector(`.desktop-window[data-win-id="${w.id}"]`) as HTMLElement;
      if (!el) continue;
      el.style.left = `${w.x}px`;
      el.style.top = `${w.y}px`;
      el.style.width = `${w.width}px`;
      el.style.height = `${w.height}px`;
    }
  }

  private _renderTerminalContentById(winId: string): void {
    const w = this._windows.find((ww) => ww.id === winId);
    if (!w || w.content.type !== "terminal") return;
    const el = this._container.querySelector(`.desktop-window[data-win-id="${winId}"] .win-content`) as HTMLElement;
    if (!el) return;

    w.content.preEl = w.content.preEl ?? document.createElement("pre");
    const pre = w.content.preEl;
    pre.className = "win-terminal";
    pre.innerHTML = w.content.termRenderer.renderHtml();
    if (!pre.parentNode) el.appendChild(pre);
  }

  private _renderEditorContent(el: HTMLElement, winId: string, content: EditorContent): void {
    const contentArea = el.querySelector(".win-content") as HTMLElement;
    if (!contentArea) return;
    if (contentArea.querySelector(".editor-textarea")) return;

    let fileText = "";
    try { fileText = this._shell.vfs.readFile(content.path); } catch { /* new file */ }

    contentArea.innerHTML = `
      <div class="editor-toolbar">
        <button class="editor-save-btn" data-win-id="${winId}">Save</button>
        <span class="editor-path">${this._escapeHtml(content.path)}</span>
        <span class="editor-dirty" data-win-id="${winId}" style="display:none">●</span>
      </div>
      <textarea class="editor-textarea" data-win-id="${winId}" spellcheck="false">${this._escapeHtml(fileText)}</textarea>
    `;

  }

  private _saveEditor(winId: string): void {
    const w = this._windows.find((ww) => ww.id === winId);
    if (!w || w.content.type !== "editor") return;
    const el = this._container.querySelector(`.desktop-window[data-win-id="${winId}"]`);
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
      this._shell.vfs.writeFile(w.content.path, textarea.value);
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

  private _renderAboutContent(el: HTMLElement): void {
    const contentArea = el.querySelector(".win-content") as HTMLElement;
    if (!contentArea) return;
    contentArea.innerHTML = `
      <div class="about-dialog">
        <div class="about-logo"><i class="fa-brands fa-linux"></i></div>
        <h2>Fortune GNU/Linux 1.0 Nyx</h2>
        <p>A simulated Linux environment running entirely in your browser.</p>
        <p>Kernel: ${this._shell.properties.kernel}</p>
        <p>Architecture: ${this._shell.properties.arch}</p>
        <p class="about-close-hint">Close this window to return</p>
      </div>
    `;
  }

  private _renderTaskManagerContent(el: HTMLElement, winId: string): void {
    const contentArea = el.querySelector(".win-content") as HTMLElement;
    if (!contentArea) return;

    const sessions = this._shell.users.listActiveSessions();
    const processes = this._shell.users.listProcesses();
    const desktopWindows = this._windows.filter(w => w.id !== winId && w.content.type !== "taskmanager");

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
        <td><i class="fa-solid ${icon}"></i> ${this._escapeHtml(w.title)}</td>
        <td>desktop</td>
        <td><span class="taskmgr-status running">running</span></td>
        <td><button class="taskmgr-close" data-win-id="${w.id}">Close</button></td>
      </tr>`;
    }

    for (let i = 0; i < sessions.length; i++) {
      const s = sessions[i] as (typeof sessions)[number];
      const pid = 1000 + i;
      rows += `<tr>
        <td>${pid}</td>
        <td>${this._escapeHtml(s.username)}</td>
        <td>bash</td>
        <td>${this._escapeHtml(s.tty)}</td>
        <td><span class="taskmgr-status running">running</span></td>
        <td><button class="taskmgr-kill" data-pid="${pid}">Kill</button></td>
      </tr>`;
    }
    for (const p of processes) {
      const statusClass = p.status === "running" ? "running" : p.status === "stopped" ? "stopped" : "done";
      rows += `<tr>
        <td>${p.pid}</td>
        <td>${this._escapeHtml(p.username)}</td>
        <td>${this._escapeHtml(p.command)}</td>
        <td>${this._escapeHtml(p.tty)}</td>
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

  private _updateClock(): void {
    const panel = this._container.querySelector("#desktop-panel");
    if (!panel) return;
    const now = new Date();
    const timeEl = panel.querySelector(".xfce-clock-time");
    const dateEl = panel.querySelector(".xfce-clock-date");
    if (timeEl) timeEl.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    if (dateEl) dateEl.textContent = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
  }

  private _showContextMenu(x: number, y: number, items: Array<{ label: string; icon: string; danger?: boolean; action: () => void }>): void {
    this._closeContextMenu();
    const menu = document.createElement("div");
    menu.className = "desktop-context-menu";
    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
    for (let i = 0; i < items.length; i++) {
      const item = items[i] as (typeof items)[number];
      const el = document.createElement("div");
      el.className = `ctx-item${item.danger ? " ctx-danger" : ""}`;
      el.innerHTML = `<i class="${item.icon}"></i><span>${this._escapeHtml(item.label)}</span>`;
      el.setAttribute("data-ctx-index", String(i));
      menu.appendChild(el);
    }
    // Single delegated listener — avoids one closure per item surviving after menu.remove()
    menu.addEventListener("click", (e) => {
      const el = (e.target as HTMLElement).closest(".ctx-item") as HTMLElement | null;
      if (!el) return;
      e.stopPropagation();
      const idx = Number(el.getAttribute("data-ctx-index"));
      this._closeContextMenu();
      items[idx]?.action();
    });
    this._container.appendChild(menu);
    // Clamp to viewport
    const rect = menu.getBoundingClientRect();
    if (rect.right > window.innerWidth) menu.style.left = `${x - rect.width}px`;
    if (rect.bottom > window.innerHeight) menu.style.top = `${y - rect.height}px`;
  }

  private _closeContextMenu(): void {
    this._container.querySelector(".desktop-context-menu")?.remove();
  }

  private _escapeHtml(s: string): string {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
}
