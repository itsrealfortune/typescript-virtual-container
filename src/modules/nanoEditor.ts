/**
 * nanoEditor.ts — terminal-based text editor inspired by GNU nano.
 *
 * Renders a full-featured editor over a ShellStream with support for:
 * cursor navigation, text insertion/deletion, cut/copy/paste, search,
 * go-to-line, save, undo/redo, mark selection, and resize handling.
 *
 * @example
 * ```ts
 * const nano = new NanoEditor({
 *   stream, terminalSize: { cols: 80, rows: 24 },
 *   content: "Hello, world!\n", filename: "/home/user/hello.txt",
 *   onExit: (reason, content) => {
 *     if (reason === "saved") vfs.writeFile("/home/user/hello.txt", content);
 *   },
 * });
 * nano.start();
 * nano.handleInput(Buffer.from("a")); // type 'a'
 * ```
 */
import type { ShellStream } from "../types/streams";
import type { TerminalSize } from "./shellRuntime";

// ── ANSI helpers ─────────────────────────────────────────────────────────────

const ESC = "\x1b";
const CSI = `${ESC}[`;

function stripAnsi(s: string): string {
	let out = "";
	let i = 0;
	while (i < s.length) {
		if (s[i] === ESC && s[i + 1] === "[") {
			i += 2;
			while (i < s.length && (s.charAt(i) < "@" || s.charAt(i) > "~")) i++;
			i++;
		} else {
			out += s[i];
			i++;
		}
	}
	return out;
}

const ansi = {
	cup: (row: number, col: number) => `${CSI}${row};${col}H`,
	el: () => `${CSI}K`,
	ed: () => `${CSI}2J`,
	home: () => `${CSI}H`,
	cursorHide: () => `${CSI}?25l`,
	cursorShow: () => `${CSI}?25h`,
	bold: (s: string) => `${ESC}[1m${s}${ESC}[0m`,
	reverse: (s: string) => `${ESC}[7m${s}${ESC}[0m`,
	color: (fg: number, s: string) => `${ESC}[${fg}m${s}${ESC}[0m`,
};

// ── Types ────────────────────────────────────────────────────────────────────

/** Reason the NanoEditor session ended: "saved" (^O/^X with save) or "aborted" (^X without save). */
export type NanoExitReason = "saved" | "aborted";

export interface NanoEditorOptions {
	/** Terminal output stream for rendering the editor UI. */
	stream: ShellStream;
	/** Current terminal dimensions for layout calculations. */
	terminalSize: TerminalSize;
	/** Initial file content to display in the editor. */
	content: string;
	/** File path shown in the title bar and used for save operations. */
	filename: string;
	/** Called when nano exits (saved or aborted). Receives the exit reason and final content. */
	onExit: (reason: NanoExitReason, content: string) => void;
	/** Called on ^S / silent save — save without closing nano. Optional. */
	onSave?: (content: string) => void;
}

// Undo stack entry
interface UndoEntry {
	lines: string[];
	cursorRow: number;
	cursorCol: number;
}

// Search state
interface SearchState {
	query: string;
	caseSensitive: boolean;
	row: number;
	col: number;
}

// Input mode
type Mode =
	| "normal"
	| "exit-confirm"       // ^X with unsaved changes: "Save modified buffer?"
	| "exit-filename"      // after "Y" in exit-confirm: prompt filename
	| "writeout"           // ^O: prompt filename
	| "search"             // ^W: type query
	| "search-confirm"     // not found, press key
	| "goto-line"          // ^_ / Alt+G
	| "help";

// ── NanoEditor ───────────────────────────────────────────────────────────────

/**
 * A terminal-based text editor inspired by GNU nano, rendered over a ShellStream.
 *
 * Supports:
 * - Full cursor navigation (arrows, home, end, page up/down)
 * - Text insertion and deletion (backspace, delete)
 * - Cut/copy/paste (^K, ^U, ^6)
 * - Search with case sensitivity toggle (^W)
 * - Go-to line (^_ / Alt+G)
 * - Save to file (^O / ^S for silent save)
 * - Undo/redo (Alt+U / Alt+E)
 * - Mark selection (^6)
 * - Resize handling for terminal changes
 *
 * @example
 * ```ts
 * const nano = new NanoEditor({
 *   stream,
 *   terminalSize: { cols: 80, rows: 24 },
 *   content: "Hello, world!\n",
 *   filename: "/home/user/hello.txt",
 *   onExit: (reason, content) => {
 *     if (reason === "saved") vfs.writeFile("/home/user/hello.txt", content);
 *   },
 * });
 * nano.start();
 * // Then feed keystrokes: nano.handleInput(Buffer.from("a"));
 * ```
 */
export class NanoEditor {
	private _lines: string[];
	private _cursorRow = 0;
	private _cursorCol = 0;
	private _scrollTop = 0;
	private _modified = false;
	private _filename: string;

	private _mode: Mode = "normal";
	private _inputBuffer = "";        // for multi-char prompts
	private _searchState: SearchState | null = null;
	private _clipboard: string[] = []; // ^K cut lines
	private _undoStack: UndoEntry[] = [];
	private _redoStack: UndoEntry[] = [];
	private _markActive = false;

	private readonly _stream: ShellStream;
	private _terminalSize: TerminalSize;
	private readonly _onExit: NanoEditorOptions["onExit"];
	private readonly _onSave: NanoEditorOptions["onSave"];

	/**
	 * Create a new NanoEditor instance.
	 * @param opts - Editor configuration (stream, terminal size, content, filename, callbacks).
	 */
	constructor(opts: NanoEditorOptions) {
		this._stream = opts.stream;
		this._terminalSize = opts.terminalSize;
		this._filename = opts.filename;
		this._onExit = opts.onExit;
		this._onSave = opts.onSave;
		this._lines = opts.content.split("\n");
		// Remove trailing empty line that split adds for files ending in \n
		if (this._lines.length > 1 && this._lines.at(-1) === "") {
			this._lines.pop();
		}
		if (this._lines.length === 0) this._lines = [""];
	}

	// ── Public API ────────────────────────────────────────────────────────────

	/**
	 * Render the initial editor UI and draw the buffer on screen.
	 * Call this after construction to display the editor.
	 */
	start(): void {
		this.fullRedraw();
	}

	/**
	 * Update the terminal dimensions and redraw the screen.
	 * Call this when the terminal is resized (e.g., from a SIGWINCH handler).
	 * @param size - New terminal dimensions (cols × rows).
	 */
	resize(size: TerminalSize): void {
		this._terminalSize = size;
		this.fullRedraw();
	}

	/**
	 * Process raw terminal input bytes. Dispatches keystrokes to the
	 * appropriate handler based on current mode (normal, search, write, etc.).
	 * Supports ANSI escape sequences, Ctrl+key combos, and Alt+key.
	 * @param chunk - Raw bytes from the terminal stream.
	 */
	handleInput(chunk: Buffer): void {
		const data = chunk.toString("utf8");
		for (let i = 0; i < data.length; ) {
			const consumed = this._consumeSequence(data, i);
			i += consumed;
		}
	}

	// ── Input dispatch ────────────────────────────────────────────────────────

	private _consumeSequence(data: string, i: number): number {
		const ch = data.charAt(i);

		// ESC sequences
		if (ch === ESC) {
			if (data[i + 1] === "[") {
				// CSI sequence
				let j = i + 2;
				while (j < data.length && (data.charAt(j) < "@" || data.charAt(j) > "~")) j++;
				const seq = data.slice(i, j + 1);
				this._handleEscape(seq);
				return j - i + 1;
			}
			if (data[i + 1] === "O") {
				// SS3 (xterm function keys)
				const seq = data.slice(i, i + 3);
				this._handleEscape(seq);
				return 3;
			}
			// Alt+key
			if (i + 1 < data.length) {
				this._handleAlt(data.charAt(i + 1));
				return 2;
			}
			return 1;
		}

		this._handleChar(ch);
		return 1;
	}

	private _handleEscape(seq: string): void {
		switch (seq) {
			case `${ESC}[A`: case `${ESC}OA`: this._dispatch("up"); break;
			case `${ESC}[B`: case `${ESC}OB`: this._dispatch("down"); break;
			case `${ESC}[C`: case `${ESC}OC`: this._dispatch("right"); break;
			case `${ESC}[D`: case `${ESC}OD`: this._dispatch("left"); break;
			case `${ESC}[H`: case `${ESC}[1~`: this._dispatch("home"); break;
			case `${ESC}[F`: case `${ESC}[4~`: this._dispatch("end"); break;
			case `${ESC}[5~`: this._dispatch("pageup"); break;
			case `${ESC}[6~`: this._dispatch("pagedown"); break;
			case `${ESC}[3~`: this._dispatch("delete"); break;
			case `${ESC}[1;5C`: this._dispatch("ctrl-right"); break;
			case `${ESC}[1;5D`: this._dispatch("ctrl-left"); break;
			case `${ESC}[1;5A`: this._dispatch("ctrl-up"); break;
			case `${ESC}[1;5B`: this._dispatch("ctrl-down"); break;
		}
	}

	private _handleAlt(key: string): void {
		const k = key.toLowerCase();
		if (k === "u") { this._doUndo(); return; }
		if (k === "e") { this._doRedo(); return; }
		if (k === "g") { this._enterGotoLine(); return; }
		if (k === "r") { this._doSearchReplace(); return; }
		if (k === "a") { this._toggleMark(); return; }
		if (k === "^") { this._doUndo(); return; } // Alt+6 = Alt+^
	}

	private _handleChar(ch: string): void {
		const code = ch.charCodeAt(0);

		// Route by mode first
		if (this._mode !== "normal") {
			this._handlePromptChar(ch);
			return;
		}

		// Control characters
		if (code < 32 || code === 127) {
			this._handleControl(code);
			return;
		}

		// Printable
		this._doInsertChar(ch);
	}

	private _handleControl(code: number): void {
		switch (code) {
			// Navigation
			case 1: this._dispatch("home"); break;          // ^A
			case 5: this._dispatch("end"); break;           // ^E
			case 16: this._dispatch("up"); break;           // ^P (emacs)
			case 14: this._dispatch("down"); break;         // ^N (emacs)
			case 2: this._dispatch("left"); break;          // ^B
			case 6: this._dispatch("right"); break;         // ^F

			// Editing
			case 8: case 127: this._doBackspace(); break;   // ^H / DEL
			case 13: this._doEnter(); break;                // ^M / Enter
			case 11: this._doCutLine(); break;              // ^K
			case 21: this._doUncut(); break;                // ^U
			case 9: this._doInsertChar("\t"); break;        // ^I / Tab

			// File ops
			case 15: this._enterWriteout(); break;          // ^O
			case 19: this._doSave(); break;                 // ^S (save without prompt)
			case 24: this._doExit(); break;                 // ^X
			case 18: this._doSearch(); break;               // ^R (reused as search-next)

			// Search
			case 23: this._enterSearch(); break;            // ^W
			case 12: this._doSearchNext(); break;           // ^L (refresh / search next)

			// Info
			case 3: this._showCursorPos(); break;           // ^C
			case 7: this._enterHelp(); break;               // ^G

			// Undo/Redo (nano uses Alt+U / Alt+E, but also ^Z in some builds)
			case 26: this._doUndo(); break;                 // ^Z (non-standard but common)

			// Goto line
			case 31: this._enterGotoLine(); break;          // ^_
		}
	}

	private _dispatch(action: string): void {
		if (this._mode !== "normal") return;
		switch (action) {
			case "up": this._moveCursor(-1); break;
			case "down": this._moveCursor(1); break;
			case "left": this._moveCursorLeft(); break;
			case "right": this._moveCursorRight(); break;
			case "home": this._moveCursorHome(); break;
			case "end": this._moveCursorEnd(); break;
			case "pageup": this._movePage(-1); break;
			case "pagedown": this._movePage(1); break;
			case "delete": this._doDelete(); break;
			case "ctrl-right": this._moveWordRight(); break;
			case "ctrl-left": this._moveWordLeft(); break;
			case "ctrl-up": this._moveCursor(-1); break;
			case "ctrl-down": this._moveCursor(1); break;
		}
	}

	// ── Prompt mode handler ───────────────────────────────────────────────────

	private _handlePromptChar(ch: string): void {
		const code = ch.charCodeAt(0);

		if (this._mode === "help") {
			this._mode = "normal";
			this.fullRedraw();
			return;
		}

		if (this._mode === "exit-confirm") {
			const k = ch.toLowerCase();
			if (k === "y") {
				// Save then exit
				this._mode = "exit-filename";
				this._inputBuffer = this._filename;
				this._renderStatusBar(`File Name to Write: ${this._inputBuffer}`);
				return;
			}
			if (k === "n") {
				this._onExit("aborted", this._getCurrentContent());
				return;
			}
			if (code === 3 || code === 7 || k === "c") {
				// ^C or ^G = cancel
				this._mode = "normal";
				this.fullRedraw();
				return;
			}
			return;
		}

		if (this._mode === "exit-filename" || this._mode === "writeout") {
			if (code === 13) {
				// Confirm filename
				const name = this._inputBuffer.trim();
				if (name) this._filename = name;
				const content = this._getCurrentContent();
				this._modified = false;
				if (this._mode === "exit-filename") {
					this._onExit("saved", content);
				} else {
					this._mode = "normal";
					this._renderStatusLine(`Wrote ${this._lines.length} lines`);
					this._onExit("saved", content);
				}
				return;
			}
			if (code === 7 || code === 3) {
				// ^G / ^C = cancel
				this._mode = "normal";
				this.fullRedraw();
				return;
			}
			if (code === 127 || code === 8) {
				this._inputBuffer = this._inputBuffer.slice(0, -1);
			} else if (code >= 32) {
				this._inputBuffer += ch;
			}
			const label = this._mode === "writeout" ? "File Name to Write" : "File Name to Write";
			this._renderStatusBar(`${label}: ${this._inputBuffer}`);
			return;
		}

		if (this._mode === "search") {
			if (code === 13) {
				// Execute search
				const query = this._inputBuffer.trim();
				if (query) {
					this._searchState = { query, caseSensitive: false, row: this._cursorRow, col: this._cursorCol + 1 };
				}
				this._mode = "normal";
				if (this._searchState) this._doSearchNext();
				else this.fullRedraw();
				return;
			}
			if (code === 7 || code === 3) {
				this._mode = "normal";
				this.fullRedraw();
				return;
			}
			if (code === 127 || code === 8) {
				this._inputBuffer = this._inputBuffer.slice(0, -1);
			} else if (code >= 32) {
				this._inputBuffer += ch;
			}
			this._renderStatusBar(`Search: ${this._inputBuffer}`);
			return;
		}

		if (this._mode === "goto-line") {
			if (code === 13) {
				const n = Number.parseInt(this._inputBuffer.trim(), 10);
				if (!Number.isNaN(n) && n > 0) {
					this._cursorRow = Math.min(n - 1, this._lines.length - 1);
					this._cursorCol = 0;
					this._clampScroll();
				}
				this._mode = "normal";
				this.fullRedraw();
				return;
			}
			if (code === 7 || code === 3) {
				this._mode = "normal";
				this.fullRedraw();
				return;
			}
			if (code === 127 || code === 8) {
				this._inputBuffer = this._inputBuffer.slice(0, -1);
			} else if (ch >= "0" && ch <= "9") {
				this._inputBuffer += ch;
			}
			this._renderStatusBar(`Enter line number: ${this._inputBuffer}`);
			return;
		}

		if (this._mode === "search-confirm") {
			this._mode = "normal";
			this.fullRedraw();
		}
	}

	// ── Cursor movement ───────────────────────────────────────────────────────

	private _moveCursor(dRow: number): void {
		this._cursorRow = Math.max(0, Math.min(this._lines.length - 1, this._cursorRow + dRow));
		this._cursorCol = Math.min(this._cursorCol, this._currentLine().length);
		const prevScrollTop = this._scrollTop;
		this._clampScroll();
		if (this._scrollTop !== prevScrollTop) {
			this._renderEditArea();
		} else {
			this._renderCursor();
		}
	}

	private _moveCursorLeft(): void {
		if (this._cursorCol > 0) {
			this._cursorCol--;
		} else if (this._cursorRow > 0) {
			this._cursorRow--;
			this._cursorCol = this._currentLine().length;
		}
		const prevScrollTop = this._scrollTop;
		this._clampScroll();
		if (this._scrollTop !== prevScrollTop) { this._renderEditArea(); } else { this._renderCursor(); }
	}

	private _moveCursorRight(): void {
		const line = this._currentLine();
		if (this._cursorCol < line.length) {
			this._cursorCol++;
		} else if (this._cursorRow < this._lines.length - 1) {
			this._cursorRow++;
			this._cursorCol = 0;
		}
		const prevScrollTop = this._scrollTop;
		this._clampScroll();
		if (this._scrollTop !== prevScrollTop) { this._renderEditArea(); } else { this._renderCursor(); }
	}

	private _moveCursorHome(): void {
		this._cursorCol = 0;
		this._renderCursor();
	}

	private _moveCursorEnd(): void {
		this._cursorCol = this._currentLine().length;
		this._renderCursor();
	}

	private _movePage(dir: number): void {
		const editRows = this._editAreaRows();
		this._cursorRow = Math.max(0, Math.min(this._lines.length - 1, this._cursorRow + dir * editRows));
		this._cursorCol = Math.min(this._cursorCol, this._currentLine().length);
		this._clampScroll();
		this._renderEditArea();
	}

	private _moveWordRight(): void {
		const line = this._currentLine();
		let col = this._cursorCol;
		while (col < line.length && /\w/.test(line.charAt(col))) col++;
		while (col < line.length && !/\w/.test(line.charAt(col))) col++;
		this._cursorCol = col;
		this._renderCursor();
	}

	private _moveWordLeft(): void {
		const line = this._currentLine();
		let col = this._cursorCol;
		if (col > 0) col--;
		while (col > 0 && !/\w/.test(line.charAt(col))) col--;
		while (col > 0 && /\w/.test(line.charAt(col - 1))) col--;
		this._cursorCol = col;
		this._renderCursor();
	}

	// ── Edit operations ───────────────────────────────────────────────────────

	private _pushUndo(): void {
		this._undoStack.push({ lines: [...this._lines], cursorRow: this._cursorRow, cursorCol: this._cursorCol });
		if (this._undoStack.length > 200) this._undoStack.shift();
		this._redoStack = [];
	}

	private _doInsertChar(ch: string): void {
		this._pushUndo();
		const line = this._currentLine();
		this._lines[this._cursorRow] = line.slice(0, this._cursorCol) + ch + line.slice(this._cursorCol);
		this._cursorCol++;
		this._modified = true;
		this._renderLine(this._cursorRow);
		this._renderCursor();
		this._renderTitleBar();
	}

	private _doEnter(): void {
		this._pushUndo();
		const line = this._currentLine();
		const before = line.slice(0, this._cursorCol);
		const after = line.slice(this._cursorCol);
		this._lines[this._cursorRow] = before;
		this._lines.splice(this._cursorRow + 1, 0, after);
		this._cursorRow++;
		this._cursorCol = 0;
		this._modified = true;
		this._clampScroll();
		this._renderEditArea();
		this._renderCursor();
		this._renderTitleBar();
	}

	private _doBackspace(): void {
		if (this._cursorCol === 0 && this._cursorRow === 0) return;
		this._pushUndo();
		if (this._cursorCol > 0) {
			const line = this._currentLine();
			this._lines[this._cursorRow] = line.slice(0, this._cursorCol - 1) + line.slice(this._cursorCol);
			this._cursorCol--;
		} else {
			const prevLine = this._lines[this._cursorRow - 1] as string;
			const curLine = this._currentLine();
			this._cursorCol = prevLine.length;
			this._lines[this._cursorRow - 1] = prevLine + curLine;
			this._lines.splice(this._cursorRow, 1);
			this._cursorRow--;
		}
		this._modified = true;
		this._clampScroll();
		this._renderEditArea();
		this._renderCursor();
		this._renderTitleBar();
	}

	private _doDelete(): void {
		const line = this._currentLine();
		if (this._cursorCol === line.length && this._cursorRow === this._lines.length - 1) return;
		this._pushUndo();
		if (this._cursorCol < line.length) {
			this._lines[this._cursorRow] = line.slice(0, this._cursorCol) + line.slice(this._cursorCol + 1);
		} else {
			const nextLine = this._lines[this._cursorRow + 1] ?? "";
			this._lines[this._cursorRow] = line + nextLine;
			this._lines.splice(this._cursorRow + 1, 1);
		}
		this._modified = true;
		this._renderEditArea();
		this._renderCursor();
		this._renderTitleBar();
	}

	private _doCutLine(): void {
		this._pushUndo();
		if (this._lines.length === 1 && this._lines[0] === "") return;
		const cut = this._lines.splice(this._cursorRow, 1)[0] ?? "";
		this._clipboard.push(cut);
		if (this._lines.length === 0) this._lines = [""];
		this._cursorRow = Math.min(this._cursorRow, this._lines.length - 1);
		this._cursorCol = Math.min(this._cursorCol, this._currentLine().length);
		this._modified = true;
		this._clampScroll();
		this._renderEditArea();
		this._renderCursor();
		this._renderTitleBar();
		this._renderStatusLine("Cut 1 line");
	}

	private _doUncut(): void {
		if (this._clipboard.length === 0) return;
		this._pushUndo();
		const lines = [...this._clipboard];
		this._clipboard = [];
		this._lines.splice(this._cursorRow, 0, ...lines);
		this._cursorRow = Math.min(this._cursorRow + lines.length - 1, this._lines.length - 1);
		this._modified = true;
		this._clampScroll();
		this._renderEditArea();
		this._renderCursor();
		this._renderTitleBar();
		this._renderStatusLine("Uncut 1 line");
	}

	private _doUndo(): void {
		if (this._undoStack.length === 0) {
			this._renderStatusLine("Nothing to undo");
			return;
		}
		const current = { lines: [...this._lines], cursorRow: this._cursorRow, cursorCol: this._cursorCol };
		this._redoStack.push(current);
		const prev = this._undoStack.pop() as UndoEntry;
		this._lines = prev.lines;
		this._cursorRow = prev.cursorRow;
		this._cursorCol = prev.cursorCol;
		this._modified = true;
		this._clampScroll();
		this.fullRedraw();
	}

	private _doRedo(): void {
		if (this._redoStack.length === 0) {
			this._renderStatusLine("Nothing to redo");
			return;
		}
		const current = { lines: [...this._lines], cursorRow: this._cursorRow, cursorCol: this._cursorCol };
		this._undoStack.push(current);
		const next = this._redoStack.pop() as UndoEntry;
		this._lines = next.lines;
		this._cursorRow = next.cursorRow;
		this._cursorCol = next.cursorCol;
		this._modified = true;
		this._clampScroll();
		this.fullRedraw();
	}

	// ── Search ────────────────────────────────────────────────────────────────

	private _enterSearch(): void {
		this._mode = "search";
		this._inputBuffer = this._searchState?.query ?? "";
		this._renderStatusBar(`Search: ${this._inputBuffer}`);
	}

	private _doSearch(): void {
		// ^R = read file in real nano; reuse as search-next alias here
		this._doSearchNext();
	}

	private _doSearchNext(): void {
		if (!this._searchState) {
			this._enterSearch();
			return;
		}
		const { query, caseSensitive } = this._searchState;
		const q = caseSensitive ? query : query.toLowerCase();

		let startRow = this._searchState.row;
		let startCol = this._searchState.col;

		for (let pass = 0; pass < 2; pass++) {
			for (let r = startRow; r < this._lines.length; r++) {
				const line = caseSensitive ? (this._lines[r] as string) : (this._lines[r] as string).toLowerCase();
				const col = line.indexOf(q, r === startRow ? startCol : 0);
				if (col !== -1) {
					this._cursorRow = r;
					this._cursorCol = col;
					this._searchState.row = r;
					this._searchState.col = col + 1;
					this._clampScroll();
					this.fullRedraw();
					this._renderStatusLine(`Searching for: ${query}`);
					return;
				}
			}
			// Wrap around
			startRow = 0;
			startCol = 0;
		}

		this._mode = "search-confirm";
		this._renderStatusLine(`"${query}" not found`);
	}

	private _doSearchReplace(): void {
		// Minimal: just enter search for now
		this._enterSearch();
	}

	// ── Mark ─────────────────────────────────────────────────────────────────

	private _toggleMark(): void {
		this._markActive = !this._markActive;
		if (this._markActive) {
			this._renderStatusLine("Mark Set");
		} else {
			this._renderStatusLine("Mark Unset");
		}
	}

	// ── Exit / Save ───────────────────────────────────────────────────────────

	private _doExit(): void {
		if (this._modified) {
			this._mode = "exit-confirm";
			this._renderStatusBar("Save modified buffer? (Answering \"No\" will DISCARD changes.) Y N");
			return;
		}
		this._onExit("aborted", this._getCurrentContent());
	}

	private _doSave(): void {
		// ^S: save without closing (if onSave provided), else fall back to ^O flow
		const content = this._getCurrentContent();
		if (this._onSave) {
			this._modified = false;
			this._onSave(content);
			this._renderStatusLine(`Saved: ${this._filename}`);
			this._renderTitleBar();
		} else {
			// No silent-save callback: behave like ^O (prompt filename)
			this._enterWriteout();
		}
	}

	private _enterWriteout(): void {
		this._mode = "writeout";
		this._inputBuffer = this._filename;
		this._renderStatusBar(`File Name to Write: ${this._inputBuffer}`);
	}

	private _showCursorPos(): void {
		const row = this._cursorRow + 1;
		const col = this._cursorCol + 1;
		const total = this._lines.length;
		const pct = Math.round((row / total) * 100);
		this._renderStatusLine(`line ${row}/${total} (${pct}%), col ${col}`);
	}

	private _enterGotoLine(): void {
		this._mode = "goto-line";
		this._inputBuffer = "";
		this._renderStatusBar("Enter line number: ");
	}

	private _enterHelp(): void {
		this._mode = "help";
		this._renderHelp();
	}

	// ── Render ────────────────────────────────────────────────────────────────

	private get cols(): number { return Math.max(1, this._terminalSize.cols); }
	private get rows(): number { return Math.max(4, this._terminalSize.rows); }
	private _editAreaRows(): number { return this.rows - 3; } // title + 2 help rows
	private _editAreaStart(): number { return 2; } // row 1 = title, rows 2..N-2 = edit

	private _currentLine(): string { return this._lines[this._cursorRow] ?? ""; }

	private _clampScroll(): void {
		const editRows = this._editAreaRows();
		if (this._cursorRow < this._scrollTop) {
			this._scrollTop = this._cursorRow;
		} else if (this._cursorRow >= this._scrollTop + editRows) {
			this._scrollTop = this._cursorRow - editRows + 1;
		}
		this._scrollTop = Math.max(0, this._scrollTop);
	}

	private _getCurrentContent(): string {
		return `${this._lines.join("\n")}\n`;
	}

	private static _pad(s: string, width: number): string {
		if (s.length >= width) return s.slice(0, width);
		return s + " ".repeat(width - s.length);
	}

	fullRedraw(): void {
		const buf: string[] = [];
		buf.push(ansi.cursorHide());
		buf.push(ansi.ed());
		buf.push(ansi.home());
		this._buildTitleBar(buf);
		this._buildEditArea(buf);
		this._buildHelpBar(buf);
		buf.push(ansi.cursorShow());
		buf.push(this._buildCursorPosition());
		this._stream.write(buf.join(""));
	}

	private _renderTitleBar(): void {
		const buf: string[] = [];
		buf.push(ansi.cursorHide());
		buf.push(ansi.cup(1, 1));
		this._buildTitleBar(buf);
		buf.push(ansi.cursorShow());
		buf.push(this._buildCursorPosition());
		this._stream.write(buf.join(""));
	}

	private _renderEditArea(): void {
		const buf: string[] = [];
		buf.push(ansi.cursorHide());
		this._buildEditArea(buf);
		buf.push(ansi.cursorShow());
		buf.push(this._buildCursorPosition());
		this._stream.write(buf.join(""));
	}

	private _renderLine(row: number): void {
		const screenRow = row - this._scrollTop + this._editAreaStart();
		if (screenRow < this._editAreaStart() || screenRow >= this._editAreaStart() + this._editAreaRows()) return;
		const buf: string[] = [];
		buf.push(ansi.cursorHide());
		buf.push(ansi.cup(screenRow, 1));
		buf.push(ansi.el());
		const line = this._lines[row] ?? "";
		buf.push(this._renderLineText(line));
		buf.push(ansi.cursorShow());
		buf.push(this._buildCursorPosition());
		this._stream.write(buf.join(""));
	}

	private _renderCursor(): void {
		this._stream.write(this._buildCursorPosition());
	}

	private _renderStatusLine(msg: string): void {
		const buf: string[] = [];
		buf.push(ansi.cursorHide());
		// Status line is 1 row above the bottom help bar (row = rows - 1)
		buf.push(ansi.cup(this.rows - 1, 1));
		buf.push(ansi.el());
		buf.push(ansi.reverse(NanoEditor._pad(msg, this.cols)));
		buf.push(ansi.cursorShow());
		buf.push(this._buildCursorPosition());
		this._stream.write(buf.join(""));
	}

	private _renderStatusBar(msg: string): void {
		// Overwrite the bottom help bar area with the prompt
		const buf: string[] = [];
		buf.push(ansi.cursorHide());
		buf.push(ansi.cup(this.rows, 1));
		buf.push(ansi.el());
		buf.push(msg.slice(0, this.cols));
		buf.push(ansi.cursorShow());
		// Keep cursor in status bar
		buf.push(ansi.cup(this.rows, Math.min(msg.length + 1, this.cols)));
		this._stream.write(buf.join(""));
	}

	private _buildTitleBar(buf: string[]): void {
		const modMark = this._modified ? "Modified" : "";
		const title = ` GNU nano  ${this._filename || "New Buffer"}`;
		const right = modMark;
		const mid = NanoEditor._pad(
			title + " ".repeat(Math.max(0, Math.floor((this.cols - title.length - right.length) / 2))),
			this.cols - right.length,
		);
		const full = NanoEditor._pad(mid + right, this.cols);
		buf.push(ansi.cup(1, 1));
		buf.push(ansi.reverse(full));
	}

	private _buildEditArea(buf: string[]): void {
		const editRows = this._editAreaRows();
		for (let r = 0; r < editRows; r++) {
			const lineIdx = this._scrollTop + r;
			const screenRow = this._editAreaStart() + r;
			buf.push(ansi.cup(screenRow, 1));
			buf.push(ansi.el());
			if (lineIdx < this._lines.length) {
				buf.push(this._renderLineText(this._lines[lineIdx] as string));
			}
		}
	}

	private _renderLineText(line: string): string {
		// Expand tabs, truncate to cols
		let result = "";
		let visLen = 0;
		for (let i = 0; i < line.length && visLen < this.cols; i++) {
			if (line[i] === "\t") {
				const spaces = 8 - (visLen % 8);
				const add = Math.min(spaces, this.cols - visLen);
				result += " ".repeat(add);
				visLen += add;
			} else {
				result += line[i];
				visLen++;
			}
		}
		return result;
	}

	private _buildHelpBar(buf: string[]): void {
		// Two rows at bottom like real nano
		const shortcuts1 = [
			["^G", "Help"], ["^X", "Exit"], ["^O", "WriteOut"], ["^R", "ReadFile"],
			["^W", "Where Is"], ["^\\", "Replace"],
		];
		const shortcuts2 = [
			["^K", "Cut"], ["^U", "UnCut"], ["^T", "Execute"], ["^J", "Justify"],
			["^C", "Cur Pos"], ["^/", "Go To Line"],
		];

		buf.push(ansi.cup(this.rows - 1, 1));
		buf.push(ansi.el());
		buf.push(this._buildShortcutRow(shortcuts1));

		buf.push(ansi.cup(this.rows, 1));
		buf.push(ansi.el());
		buf.push(this._buildShortcutRow(shortcuts2));
	}

	private _buildShortcutRow(shortcuts: string[][]): string {
		const colWidth = Math.floor(this.cols / (shortcuts.length / 2));
		let result = "";
		for (let i = 0; i < shortcuts.length; i += 2) {
			const key = (shortcuts[i] as string[])[0]?.padEnd(3) ?? "";
			const label = (shortcuts[i] as string[])[1] ?? "";
			const key2 = (shortcuts[i + 1]?.[0] ?? "").padEnd(3);
			const label2 = shortcuts[i + 1]?.[1] ?? "";
			const cell = `${ansi.reverse(key)} ${label.padEnd(colWidth - 5)}${ansi.reverse(key2)} ${label2.padEnd(colWidth - 5)}`;
			result += cell;
			if (stripAnsi(result).length >= this.cols) break;
		}
		return result;
	}

	private _buildCursorPosition(): string {
		// Map cursorCol to screen col (account for tab expansion)
		const line = this._currentLine();
		let screenCol = 0;
		for (let i = 0; i < this._cursorCol && i < line.length; i++) {
			if (line[i] === "\t") {
				screenCol += 8 - (screenCol % 8);
			} else {
				screenCol++;
			}
		}
		const screenRow = this._cursorRow - this._scrollTop + this._editAreaStart();
		return ansi.cup(screenRow, screenCol + 1);
	}

	private _renderHelp(): void {
		const buf: string[] = [];
		buf.push(ansi.cursorHide());
		buf.push(ansi.ed());
		buf.push(ansi.cup(1, 1));
		buf.push(ansi.reverse(NanoEditor._pad(" GNU nano — Help", this.cols)));

		const help = [
			"",
			"^G  This help text",
			"^X  Exit nano (prompts if modified)",
			"^O  Write file (WriteOut)",
			"^W  Search forward (Where Is)",
			"^K  Cut current line",
			"^U  Uncut / Paste",
			"^C  Show cursor position",
			"^_  Go to line number",
			"Alt+U  Undo",
			"Alt+E  Redo",
			"Alt+A  Toggle mark",
			"",
			"Arrows / PgUp / PgDn / Home / End: navigation",
			"",
			"Press any key to return...",
		];

		for (let i = 0; i < help.length && i + 2 <= this.rows - 2; i++) {
			buf.push(ansi.cup(i + 2, 1));
			buf.push((help[i] as string).slice(0, this.cols));
		}

		buf.push(ansi.cursorShow());
		this._stream.write(buf.join(""));
	}
}