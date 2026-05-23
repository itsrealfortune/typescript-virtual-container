/**
 * thunarManager.ts — Thunar-like file manager for the browser desktop.
 *
 * Provides a graphical file browser with directory navigation, file operations
 * (create, delete, rename, copy path), context menus, and trash support.
 * Renders as HTML within a DesktopWindow.
 *
 * Public API:
 *  - ThunarManager — class managing file browser state and DOM rendering
 */
import type {VirtualShell} from "../modules/VirtualShell";
import type {DesktopWindow, ThunarContent} from "./desktopManager";

function copyPath(path: string): void {
	navigator.clipboard.writeText(path).catch(() => {
		const ta = document.createElement("textarea");
		ta.value = path;
		ta.style.position = "fixed";
		ta.style.opacity = "0";
		document.body.appendChild(ta);
		ta.select();
		document.execCommand("copy");
		document.body.removeChild(ta);
	});
}

interface ContextMenuItem {
	label: string;
	icon: string;
	danger?: boolean;
	action: () => void;
}

interface ThunarHost {
	readonly shell: VirtualShell;
	readonly windows: DesktopWindow[];
	readonly trashPath: string;
	renderWindowElement(w: DesktopWindow): void;
	showContextMenu(x: number, y: number, items: ContextMenuItem[]): void;
	closeContextMenu(): void;
	createEditorWindow(path?: string): void;
	escapeHtml(s: string): string;
}

/**
 * Thunar-like file manager for the browser desktop environment.
 *
 * Renders a graphical file browser with directory navigation, file operations
 * (create, delete, rename, copy path), context menus, and trash support.
 * Integrates with DesktopManager for window management.
 */
export class ThunarManager {
	private _container: HTMLElement;

	/**
	 * Create a Thunar file manager instance.
	 * @param _host - Desktop host providing shell, windows, and rendering helpers.
	 * @param container - DOM element to render the file browser into.
	 */
	constructor(
		private _host: ThunarHost,
		container: HTMLElement
	) {
		this._container = container;
		this._setupEvents(container);
	}

	private _setupEvents(container: HTMLElement): void {
		// Double-click on Thunar entries
		container.addEventListener("dblclick", (e) => {
			const entry = (e.target as HTMLElement).closest(
				".thunar-entry"
			) as HTMLElement | null;
			if (!entry) {
				return;
			}
			const path = entry.getAttribute("data-path");
			const type = entry.getAttribute("data-type");
			if (!path) {
				return;
			}
			if (type === "directory") {
				const winEl = entry.closest(".desktop-window");
				const id = winEl?.getAttribute("data-win-id");
				const w = id ? this._host.windows.find((ww) => ww.id === id) : null;
				if (w && w.content.type === "thunar") {
					w.content.path = path;
					w.title = `Thunar: ${path}`;
					const wEl = container.querySelector(
						`.desktop-window[data-win-id="${w.id}"] .win-content`
					) as HTMLElement | null;
					if (wEl) {
						wEl.removeAttribute("data-thunar-path");
					}
					this._host.renderWindowElement(w);
				}
			} else {
				this._host.createEditorWindow(path);
			}
			e.stopPropagation();
		});

		// Context menu on Thunar entries and empty space
		container.addEventListener("contextmenu", (e) => {
			const winEl = (e.target as HTMLElement).closest(
				".desktop-window"
			) as HTMLElement | null;
			const winId = winEl?.getAttribute("data-win-id") ?? null;
			const w = winId ? this._host.windows.find((ww) => ww.id === winId) : null;

			if (w && w.content.type === "thunar") {
				e.preventDefault();
				e.stopPropagation();
				const entry = (e.target as HTMLElement).closest(
					".thunar-entry"
				) as HTMLElement | null;
				if (entry) {
					const path = entry.getAttribute("data-path");
					const type = entry.getAttribute("data-type");
					if (!path) {
						return;
					}
					const inTrash = path.startsWith(this._host.trashPath);
					this._host.showContextMenu(
						e.clientX,
						e.clientY,
						inTrash
							? [
									{
										label: "Restore",
										icon: "fa-solid fa-rotate-left",
										action: () => this._trashRestore(path, winId),
									},
									{
										label: "Delete permanently",
										icon: "fa-solid fa-circle-xmark",
										danger: true,
										action: () => this._trashDelete(path, winId),
									},
								]
							: [
									{
										label: type === "directory" ? "Open folder" : "Open",
										icon:
											type === "directory"
												? "fa-solid fa-folder-open"
												: "fa-solid fa-file-pen",
										action: () => {
											if (type === "directory") {
												const w2 = this._host.windows.find(
													(ww) => ww.id === winId
												);
												if (w2 && w2.content.type === "thunar") {
													w2.content.path = path;
													w2.title = `Thunar: ${path}`;
													const wEl = container.querySelector(
														`.desktop-window[data-win-id="${w2.id}"] .win-content`
													) as HTMLElement | null;
													if (wEl) {
														wEl.removeAttribute("data-thunar-path");
													}
													this._host.renderWindowElement(w2);
												}
											} else {
												this._host.createEditorWindow(path);
											}
										},
									},
									{
										label: "Rename",
										icon: "fa-solid fa-pencil",
										action: () => this._renamePrompt(path, winId),
									},
									{
										label: "Copy Path",
										icon: "fa-solid fa-copy",
										action: () => copyPath(path),
									},
									{
										label: "Move to Trash",
										icon: "fa-solid fa-trash-can",
										danger: true,
										action: () => this._moveToTrash(path, winId),
									},
								]
					);
				} else {
					const thunarPath = w.content.path;
					this._host.showContextMenu(e.clientX, e.clientY, [
						{
							label: "New Folder",
							icon: "fa-solid fa-folder-plus",
							action: () => this._createNewFolder(thunarPath, winId),
						},
						{
							label: "New File",
							icon: "fa-solid fa-file-circle-plus",
							action: () => this._createNewFile(thunarPath, winId),
						},
					]);
				}
				return;
			}

			this._host.closeContextMenu();
		});

		// Thunar pathbar click → inline edit
		container.addEventListener("click", (e) => {
			const pathbar = (e.target as HTMLElement).closest(
				".thunar-pathbar"
			) as HTMLElement | null;
			if (!pathbar || pathbar.querySelector("input")) {
				return;
			}
			e.stopPropagation();
			const winEl = pathbar.closest(".desktop-window") as HTMLElement | null;
			const winId = winEl?.getAttribute("data-win-id");
			if (!(winId && winEl)) {
				return;
			}
			const w = this._host.windows.find((ww) => ww.id === winId);
			if (!w || w.content.type !== "thunar") {
				return;
			}

			const currentPath = w.content.path;
			pathbar.innerHTML = `<input class="thunar-path-input" type="text" value="${this._host.escapeHtml(currentPath)}" />`;
			const input = pathbar.querySelector("input") as HTMLInputElement;
			input.focus();
			input.select();

			const commit = (targetPath: string) => {
				const thunarContent = w.content as ThunarContent;
				thunarContent.path = targetPath;
				w.title = `Thunar: ${targetPath}`;
				const contentArea = winEl.querySelector(
					".win-content"
				) as HTMLElement | null;
				if (contentArea) {
					contentArea.removeAttribute("data-thunar-path");
				}
				this._host.renderWindowElement(w);
			};

			input.addEventListener("keydown", (ev) => {
				if (ev.key === "Enter") {
					ev.preventDefault();
					const val = input.value.trim();
					if (val && val !== currentPath) {
						commit(val);
					} else {
						pathbar.textContent = `Location: ${currentPath}`;
					}
				}
				if (ev.key === "Escape") {
					pathbar.textContent = `Location: ${currentPath}`;
				}
			});
			input.addEventListener("blur", () => {
				pathbar.textContent = `Location: ${currentPath}`;
			});
		});

		// ── Thunar drag-and-drop ──────────────────────────────────────────

		container.addEventListener("dragstart", (e) => {
			const entry = (e.target as HTMLElement).closest(
				".thunar-entry"
			) as HTMLElement | null;
			if (!entry) {
				return;
			}
			const path = entry.getAttribute("data-path");
			if (!path) {
				return;
			}
			const dt = e.dataTransfer;
			if (!dt) {
				return;
			}
			dt.setData("text/plain", path);
			dt.effectAllowed = "move";
		});

		container.addEventListener("dragover", (e) => {
			const entry = (e.target as HTMLElement).closest(
				".thunar-entry"
			) as HTMLElement | null;
			if (entry && entry.getAttribute("data-type") === "directory") {
				e.preventDefault();
			}
		});

		container.addEventListener("dragenter", (e) => {
			const entry = (e.target as HTMLElement).closest(
				".thunar-entry"
			) as HTMLElement | null;
			if (entry && entry.getAttribute("data-type") === "directory") {
				entry.classList.add("drag-over");
			}
		});

		container.addEventListener("dragleave", (e) => {
			const entry = (e.target as HTMLElement).closest(
				".thunar-entry"
			) as HTMLElement | null;
			if (entry) {
				entry.classList.remove("drag-over");
			}
		});

		container.addEventListener("drop", (e) => {
			e.preventDefault();
			const srcPath = e.dataTransfer?.getData("text/plain");
			if (!srcPath) {
				return;
			}

			const entry = (e.target as HTMLElement).closest(
				".thunar-entry"
			) as HTMLElement | null;
			if (!entry) {
				return;
			}
			const destDir = entry.getAttribute("data-path");
			const destType = entry.getAttribute("data-type");
			if (!destDir || destType !== "directory") {
				return;
			}
			if (srcPath === destDir) {
				return;
			}

			const name = srcPath.split("/").pop();
			if (!name) {
				return;
			}
			const dest = `${destDir}/${name}`;

			try {
				const st = this._host.shell.vfs.stat(srcPath);
				if (st.type === "directory") {
					this._moveDirectory(srcPath, dest);
				} else {
					const content = this._host.shell.vfs.readFile(srcPath);
					this._host.shell.vfs.writeFile(dest, content);
					this._host.shell.vfs.remove(srcPath);
				}
				const srcWinEl = (e.target as HTMLElement).closest(
					".desktop-window"
				) as HTMLElement | null;
				const srcWinId = srcWinEl?.getAttribute("data-win-id");
				if (srcWinId) {
					this._refreshThunarWindow(srcWinId);
				}
			} catch (err) {
				console.error("drop failed", err);
			}

			document.querySelectorAll(".thunar-entry.drag-over").forEach((el) => {
				el.classList.remove("drag-over");
			});
		});
	}

	// ── Public API for DesktopManager ─────────────────────────────────────

	/**
	 * Render the file browser content for a Thunar window.
	 * @param el - Window DOM element.
	 * @param content - Thunar content descriptor with the target path.
	 */
	renderContent(el: HTMLElement, content: ThunarContent): void {
		const contentArea = el.querySelector(".win-content") as HTMLElement;
		if (!contentArea) {
			return;
		}
		const targetPath = content.path;
		if (contentArea.getAttribute("data-thunar-path") === targetPath) {
			return;
		}
		contentArea.setAttribute("data-thunar-path", targetPath);
		const parentPath =
			targetPath === "/" ? null : targetPath.replace(/\/[^/]+$/, "") || "/";
		const parentEntry = parentPath
			? `<div class="thunar-entry" data-path="${this._host.escapeHtml(parentPath)}" data-type="directory"><span class="thunar-icon"><i class="fa-solid fa-folder"></i></span><span>..</span></div>`
			: "";
		let listing = "";
		try {
			const entries = this._host.shell.vfs.list(targetPath);
			listing = entries
				.filter((e) => e !== "." && e !== "..")
				.map((e: string) => {
					try {
						const st = this._host.shell.vfs.stat(`${targetPath}/${e}`);
						const icon =
							st.type === "directory"
								? `<i class="fa-solid fa-folder"></i>`
								: `<i class="fa-regular fa-file"></i>`;
						const fullPath = `${targetPath}/${e}`;
						return `<div class="thunar-entry" draggable="true" data-path="${this._host.escapeHtml(fullPath)}" data-type="${st.type}"><span class="thunar-icon">${icon}</span><span>${this._host.escapeHtml(e)}</span></div>`;
					} catch {
						return `<div class="thunar-entry"><span class="thunar-icon"><i class="fa-solid fa-circle-question"></i></span><span>${this._host.escapeHtml(e)}</span></div>`;
					}
				})
				.join("");
		} catch {
			listing = `<div class="thunar-error">Could not read ${this._host.escapeHtml(targetPath)}</div>`;
		}
		contentArea.innerHTML = `
      <div class="thunar-pathbar">Location: ${this._host.escapeHtml(targetPath)}</div>
      <div class="thunar-listing">${parentEntry}${listing}</div>
    `;
	}

	// ── Internal helpers ──────────────────────────────────────────────────

	private _ensureTrashDir(): void {
		const parts = this._host.trashPath.split("/").filter(Boolean);
		let cur = "";
		for (const p of parts) {
			cur += `/${p}`;
			if (!this._host.shell.vfs.exists(cur)) {
				this._host.shell.vfs.mkdir(cur, 0o700);
			}
		}
	}

	private _refreshThunarWindow(winId: string | null): void {
		if (!winId) {
			return;
		}
		const w = this._host.windows.find((ww) => ww.id === winId);
		if (!w || w.content.type !== "thunar") {
			return;
		}
		const wEl = this._container.querySelector(
			`.desktop-window[data-win-id="${winId}"] .win-content`
		) as HTMLElement | null;
		if (wEl) {
			wEl.removeAttribute("data-thunar-path");
		}
		this._host.renderWindowElement(w);
	}

	private _moveToTrash(path: string, winId: string | null): void {
		this._ensureTrashDir();
		const name = path.split("/").pop() ?? "file";
		let dest = `${this._host.trashPath}/${name}`;
		let i = 1;
		while (this._host.shell.vfs.exists(dest)) {
			dest = `${this._host.trashPath}/${name}.${i++}`;
		}
		try {
			const content = this._host.shell.vfs.readFile(path);
			this._host.shell.vfs.writeFile(dest, content);
			this._host.shell.vfs.remove(path);
		} catch {
			try {
				this._host.shell.vfs.remove(path, {recursive: true});
			} catch {
				/* ignore */
			}
		}
		this._refreshThunarWindow(winId);
	}

	private _trashRestore(path: string, winId: string | null): void {
		const name = path.split("/").pop() ?? "file";
		const dest = `/root/${name}`;
		try {
			const content = this._host.shell.vfs.readFile(path);
			this._host.shell.vfs.writeFile(dest, content);
			this._host.shell.vfs.remove(path);
		} catch {
			/* ignore */
		}
		this._refreshThunarWindow(winId);
	}

	private _trashDelete(path: string, winId: string | null): void {
		try {
			this._host.shell.vfs.remove(path, {recursive: true});
		} catch {
			/* ignore */
		}
		this._refreshThunarWindow(winId);
	}

	private _moveDirectory(src: string, dest: string): void {
		this._host.shell.vfs.mkdir(dest, 0o755);
		const entries = this._host.shell.vfs.list(src);
		for (const e of entries) {
			if (e === "." || e === "..") {
				continue;
			}
			const srcPath = `${src}/${e}`;
			const destPath = `${dest}/${e}`;
			try {
				const st = this._host.shell.vfs.stat(srcPath);
				if (st.type === "directory") {
					this._moveDirectory(srcPath, destPath);
				} else {
					const content = this._host.shell.vfs.readFile(srcPath);
					this._host.shell.vfs.writeFile(destPath, content);
					this._host.shell.vfs.remove(srcPath);
				}
			} catch {
				/* skip */
			}
		}
		this._host.shell.vfs.remove(src);
	}

	private _createNewFolder(parentPath: string, winId: string | null): void {
		const name = window.prompt("New folder name:", "untitled folder");
		if (!name?.trim()) {
			return;
		}
		const dir = `${parentPath}/${name.trim()}`;
		if (this._host.shell.vfs.exists(dir)) {
			window.alert(`"${name.trim()}" already exists.`);
			return;
		}
		try {
			this._host.shell.vfs.mkdir(dir, 0o755);
			this._refreshThunarWindow(winId);
		} catch (err) {
			console.error("create folder failed", err);
		}
	}

	private _createNewFile(parentPath: string, winId: string | null): void {
		const name = window.prompt("New file name:", "untitled.txt");
		if (!name?.trim()) {
			return;
		}
		const file = `${parentPath}/${name.trim()}`;
		if (this._host.shell.vfs.exists(file)) {
			window.alert(`"${name.trim()}" already exists.`);
			return;
		}
		try {
			this._host.shell.vfs.writeFile(file, "");
			this._refreshThunarWindow(winId);
		} catch (err) {
			console.error("create file failed", err);
		}
	}

	private _renamePrompt(path: string, winId: string | null): void {
		const oldName = path.split("/").pop() ?? "";
		const newName = window.prompt("Rename:", oldName);
		if (!newName || newName === oldName) {
			return;
		}
		const dir = path.substring(0, path.lastIndexOf("/"));
		const dest = `${dir}/${newName}`;
		try {
			const content = this._host.shell.vfs.readFile(path);
			this._host.shell.vfs.writeFile(dest, content);
			this._host.shell.vfs.remove(path);
		} catch {
			/* ignore */
		}
		this._refreshThunarWindow(winId);
	}
}
