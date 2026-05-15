import type { TerminalSize } from "./shellRuntime";
import type { ShellStream } from "../types/streams";

// ── ANSI helpers ─────────────────────────────────────────────────────────────

const ESC = "\x1b";
const CSI = `${ESC}[`;

function stripAnsi(s: string): string {
	let out = "";
	let i = 0;
	while (i < s.length) {
		if (s[i] === ESC && s[i + 1] === "[") {
			i += 2;
			while (i < s.length && (s[i]! < "@" || s[i]! > "~")) i++;
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

export type NanoExitReason = "saved" | "aborted";

export interface NanoEditorOptions {
	stream: ShellStream;
	terminalSize: TerminalSize;
	content: string;
	filename: string;
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

export class NanoEditor {
	private lines: string[];
	private cursorRow = 0;
	private cursorCol = 0;
	private scrollTop = 0;
	private modified = false;
	private filename: string;

	private mode: Mode = "normal";
	private inputBuffer = "";        // for multi-char prompts
	private searchState: SearchState | null = null;
	private clipboard: string[] = []; // ^K cut lines
	private undoStack: UndoEntry[] = [];
	private redoStack: UndoEntry[] = [];
	private markActive = false;

	private readonly stream: ShellStream;
	private terminalSize: TerminalSize;
	private readonly onExit: NanoEditorOptions["onExit"];
	private readonly onSave: NanoEditorOptions["onSave"];

	constructor(opts: NanoEditorOptions) {
		this.stream = opts.stream;
		this.terminalSize = opts.terminalSize;
		this.filename = opts.filename;
		this.onExit = opts.onExit;
		this.onSave = opts.onSave;
		this.lines = opts.content.split("\n");
		// Remove trailing empty line that split adds for files ending in \n
		if (this.lines.length > 1 && this.lines.at(-1) === "") {
			this.lines.pop();
		}
		if (this.lines.length === 0) this.lines = [""];
	}

	// ── Public API ────────────────────────────────────────────────────────────

	start(): void {
		this.fullRedraw();
	}

	resize(size: TerminalSize): void {
		this.terminalSize = size;
		this.fullRedraw();
	}

	handleInput(chunk: Buffer): void {
		const data = chunk.toString("utf8");
		for (let i = 0; i < data.length; ) {
			const consumed = this.consumeSequence(data, i);
			i += consumed;
		}
	}

	// ── Input dispatch ────────────────────────────────────────────────────────

	private consumeSequence(data: string, i: number): number {
		const ch = data[i]!;

		// ESC sequences
		if (ch === ESC) {
			if (data[i + 1] === "[") {
				// CSI sequence
				let j = i + 2;
				while (j < data.length && (data[j]! < "@" || data[j]! > "~")) j++;
				const seq = data.slice(i, j + 1);
				this.handleEscape(seq);
				return j - i + 1;
			}
			if (data[i + 1] === "O") {
				// SS3 (xterm function keys)
				const seq = data.slice(i, i + 3);
				this.handleEscape(seq);
				return 3;
			}
			// Alt+key
			if (i + 1 < data.length) {
				this.handleAlt(data[i + 1]!);
				return 2;
			}
			return 1;
		}

		this.handleChar(ch);
		return 1;
	}

	private handleEscape(seq: string): void {
		switch (seq) {
			case `${ESC}[A`: case `${ESC}OA`: this.dispatch("up"); break;
			case `${ESC}[B`: case `${ESC}OB`: this.dispatch("down"); break;
			case `${ESC}[C`: case `${ESC}OC`: this.dispatch("right"); break;
			case `${ESC}[D`: case `${ESC}OD`: this.dispatch("left"); break;
			case `${ESC}[H`: case `${ESC}[1~`: this.dispatch("home"); break;
			case `${ESC}[F`: case `${ESC}[4~`: this.dispatch("end"); break;
			case `${ESC}[5~`: this.dispatch("pageup"); break;
			case `${ESC}[6~`: this.dispatch("pagedown"); break;
			case `${ESC}[3~`: this.dispatch("delete"); break;
			case `${ESC}[1;5C`: this.dispatch("ctrl-right"); break;
			case `${ESC}[1;5D`: this.dispatch("ctrl-left"); break;
			case `${ESC}[1;5A`: this.dispatch("ctrl-up"); break;
			case `${ESC}[1;5B`: this.dispatch("ctrl-down"); break;
		}
	}

	private handleAlt(key: string): void {
		const k = key.toLowerCase();
		if (k === "u") { this.doUndo(); return; }
		if (k === "e") { this.doRedo(); return; }
		if (k === "g") { this.enterGotoLine(); return; }
		if (k === "r") { this.doSearchReplace(); return; }
		if (k === "a") { this.toggleMark(); return; }
		if (k === "^") { this.doUndo(); return; } // Alt+6 = Alt+^
	}

	private handleChar(ch: string): void {
		const code = ch.charCodeAt(0);

		// Route by mode first
		if (this.mode !== "normal") {
			this.handlePromptChar(ch);
			return;
		}

		// Control characters
		if (code < 32 || code === 127) {
			this.handleControl(ch, code);
			return;
		}

		// Printable
		this.doInsertChar(ch);
	}

	private handleControl(_ch: string, code: number): void {
		switch (code) {
			// Navigation
			case 1: this.dispatch("home"); break;          // ^A
			case 5: this.dispatch("end"); break;           // ^E
			case 16: this.dispatch("up"); break;           // ^P (emacs)
			case 14: this.dispatch("down"); break;         // ^N (emacs)
			case 2: this.dispatch("left"); break;          // ^B
			case 6: this.dispatch("right"); break;         // ^F

			// Editing
			case 8: case 127: this.doBackspace(); break;   // ^H / DEL
			case 13: this.doEnter(); break;                // ^M / Enter
			case 11: this.doCutLine(); break;              // ^K
			case 21: this.doUncut(); break;                // ^U
			case 9: this.doInsertChar("\t"); break;        // ^I / Tab

			// File ops
			case 15: this.enterWriteout(); break;          // ^O
			case 19: this.doSave(); break;                 // ^S (save without prompt)
			case 24: this.doExit(); break;                 // ^X
			case 18: this.doSearch(); break;               // ^R (reused as search-next)

			// Search
			case 23: this.enterSearch(); break;            // ^W
			case 12: this.doSearchNext(); break;           // ^L (refresh / search next)

			// Info
			case 3: this.showCursorPos(); break;           // ^C
			case 7: this.enterHelp(); break;               // ^G

			// Undo/Redo (nano uses Alt+U / Alt+E, but also ^Z in some builds)
			case 26: this.doUndo(); break;                 // ^Z (non-standard but common)

			// Goto line
			case 31: this.enterGotoLine(); break;          // ^_
		}
	}

	private dispatch(action: string): void {
		if (this.mode !== "normal") return;
		switch (action) {
			case "up": this.moveCursor(-1, 0); break;
			case "down": this.moveCursor(1, 0); break;
			case "left": this.moveCursorLeft(); break;
			case "right": this.moveCursorRight(); break;
			case "home": this.moveCursorHome(); break;
			case "end": this.moveCursorEnd(); break;
			case "pageup": this.movePage(-1); break;
			case "pagedown": this.movePage(1); break;
			case "delete": this.doDelete(); break;
			case "ctrl-right": this.moveWordRight(); break;
			case "ctrl-left": this.moveWordLeft(); break;
			case "ctrl-up": this.moveCursor(-1, 0); break;
			case "ctrl-down": this.moveCursor(1, 0); break;
		}
	}

	// ── Prompt mode handler ───────────────────────────────────────────────────

	private handlePromptChar(ch: string): void {
		const code = ch.charCodeAt(0);

		if (this.mode === "help") {
			this.mode = "normal";
			this.fullRedraw();
			return;
		}

		if (this.mode === "exit-confirm") {
			const k = ch.toLowerCase();
			if (k === "y") {
				// Save then exit
				this.mode = "exit-filename";
				this.inputBuffer = this.filename;
				this.renderStatusBar(`File Name to Write: ${this.inputBuffer}`);
				return;
			}
			if (k === "n") {
				this.onExit("aborted", this.getCurrentContent());
				return;
			}
			if (code === 3 || code === 7 || k === "c") {
				// ^C or ^G = cancel
				this.mode = "normal";
				this.fullRedraw();
				return;
			}
			return;
		}

		if (this.mode === "exit-filename" || this.mode === "writeout") {
			if (code === 13) {
				// Confirm filename
				const name = this.inputBuffer.trim();
				if (name) this.filename = name;
				const content = this.getCurrentContent();
				this.modified = false;
				if (this.mode === "exit-filename") {
					this.onExit("saved", content);
				} else {
					this.mode = "normal";
					this.renderStatusLine(`Wrote ${this.lines.length} lines`);
					this.onExit("saved", content);
				}
				return;
			}
			if (code === 7 || code === 3) {
				// ^G / ^C = cancel
				this.mode = "normal";
				this.fullRedraw();
				return;
			}
			if (code === 127 || code === 8) {
				this.inputBuffer = this.inputBuffer.slice(0, -1);
			} else if (code >= 32) {
				this.inputBuffer += ch;
			}
			const label = this.mode === "writeout" ? "File Name to Write" : "File Name to Write";
			this.renderStatusBar(`${label}: ${this.inputBuffer}`);
			return;
		}

		if (this.mode === "search") {
			if (code === 13) {
				// Execute search
				const query = this.inputBuffer.trim();
				if (query) {
					this.searchState = { query, caseSensitive: false, row: this.cursorRow, col: this.cursorCol + 1 };
				}
				this.mode = "normal";
				if (this.searchState) this.doSearchNext();
				else this.fullRedraw();
				return;
			}
			if (code === 7 || code === 3) {
				this.mode = "normal";
				this.fullRedraw();
				return;
			}
			if (code === 127 || code === 8) {
				this.inputBuffer = this.inputBuffer.slice(0, -1);
			} else if (code >= 32) {
				this.inputBuffer += ch;
			}
			this.renderStatusBar(`Search: ${this.inputBuffer}`);
			return;
		}

		if (this.mode === "goto-line") {
			if (code === 13) {
				const n = Number.parseInt(this.inputBuffer.trim(), 10);
				if (!Number.isNaN(n) && n > 0) {
					this.cursorRow = Math.min(n - 1, this.lines.length - 1);
					this.cursorCol = 0;
					this.clampScroll();
				}
				this.mode = "normal";
				this.fullRedraw();
				return;
			}
			if (code === 7 || code === 3) {
				this.mode = "normal";
				this.fullRedraw();
				return;
			}
			if (code === 127 || code === 8) {
				this.inputBuffer = this.inputBuffer.slice(0, -1);
			} else if (ch >= "0" && ch <= "9") {
				this.inputBuffer += ch;
			}
			this.renderStatusBar(`Enter line number: ${this.inputBuffer}`);
			return;
		}

		if (this.mode === "search-confirm") {
			this.mode = "normal";
			this.fullRedraw();
		}
	}

	// ── Cursor movement ───────────────────────────────────────────────────────

	private moveCursor(dRow: number, _dCol: number): void {
		this.cursorRow = Math.max(0, Math.min(this.lines.length - 1, this.cursorRow + dRow));
		this.cursorCol = Math.min(this.cursorCol, this.currentLine().length);
		this.clampScroll();
		this.renderCursor();
	}

	private moveCursorLeft(): void {
		if (this.cursorCol > 0) {
			this.cursorCol--;
		} else if (this.cursorRow > 0) {
			this.cursorRow--;
			this.cursorCol = this.currentLine().length;
		}
		this.clampScroll();
		this.renderCursor();
	}

	private moveCursorRight(): void {
		const line = this.currentLine();
		if (this.cursorCol < line.length) {
			this.cursorCol++;
		} else if (this.cursorRow < this.lines.length - 1) {
			this.cursorRow++;
			this.cursorCol = 0;
		}
		this.clampScroll();
		this.renderCursor();
	}

	private moveCursorHome(): void {
		this.cursorCol = 0;
		this.renderCursor();
	}

	private moveCursorEnd(): void {
		this.cursorCol = this.currentLine().length;
		this.renderCursor();
	}

	private movePage(dir: number): void {
		const editRows = this.editAreaRows();
		this.cursorRow = Math.max(0, Math.min(this.lines.length - 1, this.cursorRow + dir * editRows));
		this.cursorCol = Math.min(this.cursorCol, this.currentLine().length);
		this.clampScroll();
		this.renderCursor();
	}

	private moveWordRight(): void {
		const line = this.currentLine();
		let col = this.cursorCol;
		// Skip current word chars
		while (col < line.length && /\w/.test(line[col]!)) col++;
		// Skip spaces
		while (col < line.length && !/\w/.test(line[col]!)) col++;
		this.cursorCol = col;
		this.renderCursor();
	}

	private moveWordLeft(): void {
		const line = this.currentLine();
		let col = this.cursorCol;
		if (col > 0) col--;
		while (col > 0 && !/\w/.test(line[col]!)) col--;
		while (col > 0 && /\w/.test(line[col - 1]!)) col--;
		this.cursorCol = col;
		this.renderCursor();
	}

	// ── Edit operations ───────────────────────────────────────────────────────

	private pushUndo(): void {
		this.undoStack.push({ lines: [...this.lines], cursorRow: this.cursorRow, cursorCol: this.cursorCol });
		if (this.undoStack.length > 200) this.undoStack.shift();
		this.redoStack = [];
	}

	private doInsertChar(ch: string): void {
		this.pushUndo();
		const line = this.currentLine();
		this.lines[this.cursorRow] = line.slice(0, this.cursorCol) + ch + line.slice(this.cursorCol);
		this.cursorCol++;
		this.modified = true;
		this.renderLine(this.cursorRow);
		this.renderCursor();
		this.renderTitleBar();
	}

	private doEnter(): void {
		this.pushUndo();
		const line = this.currentLine();
		const before = line.slice(0, this.cursorCol);
		const after = line.slice(this.cursorCol);
		this.lines[this.cursorRow] = before;
		this.lines.splice(this.cursorRow + 1, 0, after);
		this.cursorRow++;
		this.cursorCol = 0;
		this.modified = true;
		this.clampScroll();
		this.renderEditArea();
		this.renderCursor();
		this.renderTitleBar();
	}

	private doBackspace(): void {
		if (this.cursorCol === 0 && this.cursorRow === 0) return;
		this.pushUndo();
		if (this.cursorCol > 0) {
			const line = this.currentLine();
			this.lines[this.cursorRow] = line.slice(0, this.cursorCol - 1) + line.slice(this.cursorCol);
			this.cursorCol--;
		} else {
			const prevLine = this.lines[this.cursorRow - 1]!;
			const curLine = this.currentLine();
			this.cursorCol = prevLine.length;
			this.lines[this.cursorRow - 1] = prevLine + curLine;
			this.lines.splice(this.cursorRow, 1);
			this.cursorRow--;
		}
		this.modified = true;
		this.clampScroll();
		this.renderEditArea();
		this.renderCursor();
		this.renderTitleBar();
	}

	private doDelete(): void {
		const line = this.currentLine();
		if (this.cursorCol === line.length && this.cursorRow === this.lines.length - 1) return;
		this.pushUndo();
		if (this.cursorCol < line.length) {
			this.lines[this.cursorRow] = line.slice(0, this.cursorCol) + line.slice(this.cursorCol + 1);
		} else {
			const nextLine = this.lines[this.cursorRow + 1] ?? "";
			this.lines[this.cursorRow] = line + nextLine;
			this.lines.splice(this.cursorRow + 1, 1);
		}
		this.modified = true;
		this.renderEditArea();
		this.renderCursor();
		this.renderTitleBar();
	}

	private doCutLine(): void {
		this.pushUndo();
		if (this.lines.length === 1 && this.lines[0] === "") return;
		const cut = this.lines.splice(this.cursorRow, 1)[0] ?? "";
		this.clipboard.push(cut);
		if (this.lines.length === 0) this.lines = [""];
		this.cursorRow = Math.min(this.cursorRow, this.lines.length - 1);
		this.cursorCol = Math.min(this.cursorCol, this.currentLine().length);
		this.modified = true;
		this.clampScroll();
		this.renderEditArea();
		this.renderCursor();
		this.renderTitleBar();
		this.renderStatusLine("Cut 1 line");
	}

	private doUncut(): void {
		if (this.clipboard.length === 0) return;
		this.pushUndo();
		const lines = [...this.clipboard];
		this.clipboard = [];
		this.lines.splice(this.cursorRow, 0, ...lines);
		this.cursorRow = Math.min(this.cursorRow + lines.length - 1, this.lines.length - 1);
		this.modified = true;
		this.clampScroll();
		this.renderEditArea();
		this.renderCursor();
		this.renderTitleBar();
		this.renderStatusLine("Uncut 1 line");
	}

	private doUndo(): void {
		if (this.undoStack.length === 0) {
			this.renderStatusLine("Nothing to undo");
			return;
		}
		const current = { lines: [...this.lines], cursorRow: this.cursorRow, cursorCol: this.cursorCol };
		this.redoStack.push(current);
		const prev = this.undoStack.pop()!;
		this.lines = prev.lines;
		this.cursorRow = prev.cursorRow;
		this.cursorCol = prev.cursorCol;
		this.modified = true;
		this.clampScroll();
		this.fullRedraw();
	}

	private doRedo(): void {
		if (this.redoStack.length === 0) {
			this.renderStatusLine("Nothing to redo");
			return;
		}
		const current = { lines: [...this.lines], cursorRow: this.cursorRow, cursorCol: this.cursorCol };
		this.undoStack.push(current);
		const next = this.redoStack.pop()!;
		this.lines = next.lines;
		this.cursorRow = next.cursorRow;
		this.cursorCol = next.cursorCol;
		this.modified = true;
		this.clampScroll();
		this.fullRedraw();
	}

	// ── Search ────────────────────────────────────────────────────────────────

	private enterSearch(): void {
		this.mode = "search";
		this.inputBuffer = this.searchState?.query ?? "";
		this.renderStatusBar(`Search: ${this.inputBuffer}`);
	}

	private doSearch(): void {
		// ^R = read file in real nano; reuse as search-next alias here
		this.doSearchNext();
	}

	private doSearchNext(): void {
		if (!this.searchState) {
			this.enterSearch();
			return;
		}
		const { query, caseSensitive } = this.searchState;
		const q = caseSensitive ? query : query.toLowerCase();

		let startRow = this.searchState.row;
		let startCol = this.searchState.col;

		for (let pass = 0; pass < 2; pass++) {
			for (let r = startRow; r < this.lines.length; r++) {
				const line = caseSensitive ? this.lines[r]! : this.lines[r]!.toLowerCase();
				const col = line.indexOf(q, r === startRow ? startCol : 0);
				if (col !== -1) {
					this.cursorRow = r;
					this.cursorCol = col;
					this.searchState.row = r;
					this.searchState.col = col + 1;
					this.clampScroll();
					this.fullRedraw();
					this.renderStatusLine(`Searching for: ${query}`);
					return;
				}
			}
			// Wrap around
			startRow = 0;
			startCol = 0;
		}

		this.mode = "search-confirm";
		this.renderStatusLine(`"${query}" not found`);
	}

	private doSearchReplace(): void {
		// Minimal: just enter search for now
		this.enterSearch();
	}

	// ── Mark ─────────────────────────────────────────────────────────────────

	private toggleMark(): void {
		this.markActive = !this.markActive;
		if (this.markActive) {
			this.renderStatusLine("Mark Set");
		} else {
			this.renderStatusLine("Mark Unset");
		}
	}

	// ── Exit / Save ───────────────────────────────────────────────────────────

	private doExit(): void {
		if (this.modified) {
			this.mode = "exit-confirm";
			this.renderStatusBar("Save modified buffer? (Answering \"No\" will DISCARD changes.) Y N");
			return;
		}
		this.onExit("aborted", this.getCurrentContent());
	}

	private doSave(): void {
		// ^S: save without closing (if onSave provided), else fall back to ^O flow
		const content = this.getCurrentContent();
		if (this.onSave) {
			this.modified = false;
			this.onSave(content);
			this.renderStatusLine(`Saved: ${this.filename}`);
			this.renderTitleBar();
		} else {
			// No silent-save callback: behave like ^O (prompt filename)
			this.enterWriteout();
		}
	}

	private enterWriteout(): void {
		this.mode = "writeout";
		this.inputBuffer = this.filename;
		this.renderStatusBar(`File Name to Write: ${this.inputBuffer}`);
	}

	private showCursorPos(): void {
		const row = this.cursorRow + 1;
		const col = this.cursorCol + 1;
		const total = this.lines.length;
		const pct = Math.round((row / total) * 100);
		this.renderStatusLine(`line ${row}/${total} (${pct}%), col ${col}`);
	}

	private enterGotoLine(): void {
		this.mode = "goto-line";
		this.inputBuffer = "";
		this.renderStatusBar("Enter line number: ");
	}

	private enterHelp(): void {
		this.mode = "help";
		this.renderHelp();
	}

	// ── Render ────────────────────────────────────────────────────────────────

	private get cols(): number { return Math.max(1, this.terminalSize.cols); }
	private get rows(): number { return Math.max(4, this.terminalSize.rows); }
	private editAreaRows(): number { return this.rows - 3; } // title + 2 help rows
	private editAreaStart(): number { return 2; } // row 1 = title, rows 2..N-2 = edit

	private currentLine(): string { return this.lines[this.cursorRow] ?? ""; }

	private clampScroll(): void {
		const editRows = this.editAreaRows();
		if (this.cursorRow < this.scrollTop) {
			this.scrollTop = this.cursorRow;
		} else if (this.cursorRow >= this.scrollTop + editRows) {
			this.scrollTop = this.cursorRow - editRows + 1;
		}
		this.scrollTop = Math.max(0, this.scrollTop);
	}

	private getCurrentContent(): string {
		return `${this.lines.join("\n")}\n`;
	}

	private pad(s: string, width: number): string {
		if (s.length >= width) return s.slice(0, width);
		return s + " ".repeat(width - s.length);
	}

	fullRedraw(): void {
		const buf: string[] = [];
		buf.push(ansi.cursorHide());
		buf.push(ansi.ed());
		buf.push(ansi.home());
		this.buildTitleBar(buf);
		this.buildEditArea(buf);
		this.buildHelpBar(buf);
		buf.push(ansi.cursorShow());
		buf.push(this.buildCursorPosition());
		this.stream.write(buf.join(""));
	}

	private renderTitleBar(): void {
		const buf: string[] = [];
		buf.push(ansi.cursorHide());
		buf.push(ansi.cup(1, 1));
		this.buildTitleBar(buf);
		buf.push(ansi.cursorShow());
		buf.push(this.buildCursorPosition());
		this.stream.write(buf.join(""));
	}

	private renderEditArea(): void {
		const buf: string[] = [];
		buf.push(ansi.cursorHide());
		this.buildEditArea(buf);
		buf.push(ansi.cursorShow());
		buf.push(this.buildCursorPosition());
		this.stream.write(buf.join(""));
	}

	private renderLine(row: number): void {
		const screenRow = row - this.scrollTop + this.editAreaStart();
		if (screenRow < this.editAreaStart() || screenRow >= this.editAreaStart() + this.editAreaRows()) return;
		const buf: string[] = [];
		buf.push(ansi.cursorHide());
		buf.push(ansi.cup(screenRow, 1));
		buf.push(ansi.el());
		const line = this.lines[row] ?? "";
		buf.push(this.renderLineText(line));
		buf.push(ansi.cursorShow());
		buf.push(this.buildCursorPosition());
		this.stream.write(buf.join(""));
	}

	private renderCursor(): void {
		this.stream.write(this.buildCursorPosition());
	}

	private renderStatusLine(msg: string): void {
		const buf: string[] = [];
		buf.push(ansi.cursorHide());
		// Status line is 1 row above the bottom help bar (row = rows - 1)
		buf.push(ansi.cup(this.rows - 1, 1));
		buf.push(ansi.el());
		buf.push(ansi.reverse(this.pad(msg, this.cols)));
		buf.push(ansi.cursorShow());
		buf.push(this.buildCursorPosition());
		this.stream.write(buf.join(""));
	}

	private renderStatusBar(msg: string): void {
		// Overwrite the bottom help bar area with the prompt
		const buf: string[] = [];
		buf.push(ansi.cursorHide());
		buf.push(ansi.cup(this.rows, 1));
		buf.push(ansi.el());
		buf.push(msg.slice(0, this.cols));
		buf.push(ansi.cursorShow());
		// Keep cursor in status bar
		buf.push(ansi.cup(this.rows, Math.min(msg.length + 1, this.cols)));
		this.stream.write(buf.join(""));
	}

	private buildTitleBar(buf: string[]): void {
		const modMark = this.modified ? "Modified" : "";
		const title = ` GNU nano  ${this.filename || "New Buffer"}`;
		const right = modMark;
		const mid = this.pad(
			title + " ".repeat(Math.max(0, Math.floor((this.cols - title.length - right.length) / 2))),
			this.cols - right.length,
		);
		const full = this.pad(mid + right, this.cols);
		buf.push(ansi.cup(1, 1));
		buf.push(ansi.reverse(full));
	}

	private buildEditArea(buf: string[]): void {
		const editRows = this.editAreaRows();
		for (let r = 0; r < editRows; r++) {
			const lineIdx = this.scrollTop + r;
			const screenRow = this.editAreaStart() + r;
			buf.push(ansi.cup(screenRow, 1));
			buf.push(ansi.el());
			if (lineIdx < this.lines.length) {
				buf.push(this.renderLineText(this.lines[lineIdx]!));
			}
		}
	}

	private renderLineText(line: string): string {
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

	private buildHelpBar(buf: string[]): void {
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
		buf.push(this.buildShortcutRow(shortcuts1));

		buf.push(ansi.cup(this.rows, 1));
		buf.push(ansi.el());
		buf.push(this.buildShortcutRow(shortcuts2));
	}

	private buildShortcutRow(shortcuts: string[][]): string {
		const colWidth = Math.floor(this.cols / (shortcuts.length / 2));
		let result = "";
		for (let i = 0; i < shortcuts.length; i += 2) {
			const key = (shortcuts[i]![0] ?? "").padEnd(3);
			const label = shortcuts[i]![1] ?? "";
			const key2 = (shortcuts[i + 1]?.[0] ?? "").padEnd(3);
			const label2 = shortcuts[i + 1]?.[1] ?? "";
			const cell = `${ansi.reverse(key)} ${label.padEnd(colWidth - 5)}${ansi.reverse(key2)} ${label2.padEnd(colWidth - 5)}`;
			result += cell;
			if (stripAnsi(result).length >= this.cols) break;
		}
		return result;
	}

	private buildCursorPosition(): string {
		// Map cursorCol to screen col (account for tab expansion)
		const line = this.currentLine();
		let screenCol = 0;
		for (let i = 0; i < this.cursorCol && i < line.length; i++) {
			if (line[i] === "\t") {
				screenCol += 8 - (screenCol % 8);
			} else {
				screenCol++;
			}
		}
		const screenRow = this.cursorRow - this.scrollTop + this.editAreaStart();
		return ansi.cup(screenRow, screenCol + 1);
	}

	private renderHelp(): void {
		const buf: string[] = [];
		buf.push(ansi.cursorHide());
		buf.push(ansi.ed());
		buf.push(ansi.cup(1, 1));
		buf.push(ansi.reverse(this.pad(" GNU nano — Help", this.cols)));

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
			buf.push(help[i]!.slice(0, this.cols));
		}

		buf.push(ansi.cursorShow());
		this.stream.write(buf.join(""));
	}
}
