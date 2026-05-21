/**
 * Minimal VT100 screen buffer for browser-side rendering.
 * Handles the subset of escape sequences emitted by NanoEditor:
 *   - CSI H / CSI row;colH  (cursor position)
 *   - CSI K                  (erase to end of line)
 *   - CSI 2J                 (erase display)
 *   - CSI ?25l / ?25h        (cursor hide/show)
 *   - CSI <n> m              (SGR — bold, reverse, fg, bg, reset)
 */

export interface Cell {
	ch: string;
	bold: boolean;
	reverse: boolean;
	fg: string | null;
	bg: string | null;
}

const DEFAULT_CELL: Cell = { ch: " ", bold: false, reverse: false, fg: null, bg: null };

function makeCell(partial?: Partial<Cell>): Cell {
	return { ...DEFAULT_CELL, ...partial };
}

/**
 * Minimal VT100 screen buffer for browser-side rendering.
 * Handles the subset of escape sequences emitted by NanoEditor and other
 * terminal applications: cursor positioning, erase, SGR styling, and scrollback.
 *
 * @example
 * ```ts
 * const renderer = new WebTermRenderer(24, 80);
 * renderer.write("\x1b[1mHello\x1b[0m World\r\n");
 * const html = renderer.renderScrollbackHtml();
 * document.getElementById("term").innerHTML = html;
 * ```
 */
export class WebTermRenderer {
	/** Number of visible rows. */
	private _rows: number;
	/** Number of columns. */
	private _cols: number;
	/** 2D grid of screen cells. */
	private _screen: Cell[][];
	/** Scrollback buffer (rows that scrolled off screen). */
	private _scrollback: Cell[][] = [];
	/** Current cursor row position. */
	private _curRow = 0;
	/** Current cursor column position. */
	private _curCol = 0;
	/** Whether the cursor is currently visible. */
	private _cursorVisible = true;
	/** Flag set when the screen is cleared. */
	private _cleared = false;

	// Current SGR state
	private _bold = false;
	private _reverse = false;
	private _fg: string | null = null;
	private _bg: string | null = null;

	/** Input buffer for incomplete escape sequences. */
	private _buf = "";

	/**
	 * Create a new terminal screen buffer.
	 * @param rows - Number of visible rows (default: 24).
	 * @param cols - Number of columns (default: 80).
	 */
	constructor(rows: number, cols: number) {
		this._rows = rows;
		this._cols = cols;
		this._screen = this._makeScreen();
	}

	/**
	 * Resize the terminal screen and preserve existing content.
	 * @param rows - New number of rows.
	 * @param cols - New number of columns.
	 */
	resize(rows: number, cols: number): void {
		const newScreen = this._makeScreen(rows, cols);
		for (let r = 0; r < Math.min(rows, this._rows); r++) {
			for (let c = 0; c < Math.min(cols, this._cols); c++) {
				(newScreen[r] as Cell[])[c] = this._screen[r]?.[c] ?? makeCell();
			}
		}
		this._rows = rows;
		this._cols = cols;
		this._screen = newScreen;
		this._curRow = Math.min(this._curRow, rows - 1);
		this._curCol = Math.min(this._curCol, cols - 1);
	}

	/**
	 * Write ANSI escape sequence data to the screen buffer.
	 * Handles cursor movement, erasing, SGR styling, and scrollback.
	 * @param data - Raw terminal output string (may contain escape sequences).
	 */
	write(data: string): void {
		this._buf += data;
		this._flush();
	}

	private _flush(): void {
		let i = 0;
		while (i < this._buf.length) {
			const ch = this._buf.charAt(i);
			if (ch === "\x1b") {
				if (i + 1 >= this._buf.length) break; // wait for more data
				const next = this._buf.charAt(i + 1);
				if (next === "[") {
					// CSI — find terminator
					let j = i + 2;
					while (j < this._buf.length && (this._buf.charAt(j) < "@" || this._buf.charAt(j) > "~")) j++;
					if (j >= this._buf.length) break; // incomplete
					const seq = this._buf.slice(i + 2, j);
					const cmd = this._buf.charAt(j);
					this._handleCsi(seq, cmd);
					i = j + 1;
				} else if (next === "]") {
					// OSC (Operating System Command) — terminator is BEL (\x07) or ST (ESC \)
					// Must consume fully or the payload prints as raw text and corrupts SGR state.
					let j = i + 2;
					while (j < this._buf.length) {
						if (this._buf[j] === "\x07") { j++; break; }
						if (this._buf[j] === "\x1b" && this._buf[j + 1] === "\\") { j += 2; break; }
						j++;
					}
					// If terminator not yet received, wait for more data
					if (j >= this._buf.length && this._buf[j - 1] !== "\x07") break;
					i = j;
				} else if (next === "O") {
					// SS3 — single extra byte (F1-F4, cursor keys in application mode)
					if (i + 2 >= this._buf.length) break; // wait for more data
					i += 3; // ESC O <cmd>
				} else {
					i += 2; // skip unknown 2-char ESC sequence
				}
			} else if (ch === "\r") {
				this._curCol = 0;
				i++;
			} else if (ch === "\n") {
				if (this._curRow < this._rows - 1) {
					this._curRow++;
				} else {
					this._scrollUp();
				}
				i++;
			} else if (ch.charCodeAt(0) >= 32) {
				this._putChar(ch);
				i++;
			} else {
				i++; // skip other control chars
			}
		}
		this._buf = this._buf.slice(i);
	}

	private _handleCsi(seq: string, cmd: string): void {
		if (cmd === "H" || cmd === "f") {
			// Cursor position: row;col (1-based)
			const parts = seq.split(";").map((n) => Number.parseInt(n || "1", 10));
			this._curRow = Math.max(0, Math.min((parts[0] ?? 1) - 1, this._rows - 1));
			this._curCol = Math.max(0, Math.min((parts[1] ?? 1) - 1, this._cols - 1));
			return;
		}
		if (cmd === "K") {
			// Erase line from cursor to end
			const mode = seq === "" ? 0 : Number.parseInt(seq, 10);
			if (mode === 0) {
				for (let c = this._curCol; c < this._cols; c++) {
					(this._screen[this._curRow] as Cell[])[c] = makeCell();
				}
			} else if (mode === 1) {
				for (let c = 0; c <= this._curCol; c++) {
					(this._screen[this._curRow] as Cell[])[c] = makeCell();
				}
			} else if (mode === 2) {
				for (let c = 0; c < this._cols; c++) {
					(this._screen[this._curRow] as Cell[])[c] = makeCell();
				}
			}
			return;
		}
		if (cmd === "m") {
			this._handleSgr(seq);
			return;
		}
		if (cmd === "l" && seq === "?25") {
			this._cursorVisible = false;
			return;
		}
		if (cmd === "h" && seq === "?25") {
			this._cursorVisible = true;
			return;
		}
		// Cursor movement (relative)
		if (cmd === "A") { const n = Number.parseInt(seq || "1", 10) || 1; this._curRow = Math.max(0, this._curRow - n); return; }
		if (cmd === "B") { const n = Number.parseInt(seq || "1", 10) || 1; this._curRow = Math.min(this._rows - 1, this._curRow + n); return; }
		if (cmd === "C") { const n = Number.parseInt(seq || "1", 10) || 1; this._curCol = Math.min(this._cols - 1, this._curCol + n); return; }
		if (cmd === "D") { const n = Number.parseInt(seq || "1", 10) || 1; this._curCol = Math.max(0, this._curCol - n); return; }
		// Cursor column absolute
		if (cmd === "G") { const n = Number.parseInt(seq || "1", 10) || 1; this._curCol = Math.max(0, Math.min(n - 1, this._cols - 1)); return; }
		// Erase display modes 0/1
		if (cmd === "J") {
			const mode = seq === "" ? 0 : Number.parseInt(seq, 10);
			if (mode === 0) {
				for (let c = this._curCol; c < this._cols; c++) (this._screen[this._curRow] as Cell[])[c] = makeCell();
				for (let r = this._curRow + 1; r < this._rows; r++) this._screen[r] = Array.from({ length: this._cols }, () => makeCell());
			} else if (mode === 1) {
				for (let r = 0; r < this._curRow; r++) this._screen[r] = Array.from({ length: this._cols }, () => makeCell());
				for (let c = 0; c <= this._curCol; c++) (this._screen[this._curRow] as Cell[])[c] = makeCell();
			} else if (mode === 2) {
				this._screen = this._makeScreen();
				this._scrollback = [];
				this._curRow = 0;
				this._curCol = 0;
				this._cleared = true;
			}
			return;
		}
	}

	private _handleSgr(seq: string): void {
		const codes = seq === "" ? [0] : seq.split(";").map((n) => Number.parseInt(n || "0", 10));
		let i = 0;
		while (i < codes.length) {
			const code = codes[i] as number;
			if (code === 0) {
				this._bold = false; this._reverse = false; this._fg = null; this._bg = null;
			} else if (code === 1) {
				this._bold = true;
			} else if (code === 7) {
				this._reverse = true;
			} else if (code === 22) {
				this._bold = false;
			} else if (code === 27) {
				this._reverse = false;
			} else if (code >= 30 && code <= 37) {
				this._fg = ANSI_COLORS[code - 30] as string;
			} else if (code === 38) {
				if (codes[i + 1] === 5 && codes[i + 2] !== undefined) {
					this._fg = xterm256(codes[i + 2] as number);
					i += 2;
				} else if (codes[i + 1] === 2 && codes[i + 4] !== undefined) {
					this._fg = `rgb(${codes[i + 2]},${codes[i + 3]},${codes[i + 4]})`;
					i += 4;
				}
			} else if (code === 39) {
				this._fg = null;
			} else if (code >= 40 && code <= 47) {
				this._bg = ANSI_COLORS[code - 40] as string;
			} else if (code === 48) {
				if (codes[i + 1] === 5 && codes[i + 2] !== undefined) {
					this._bg = xterm256(codes[i + 2] as number);
					i += 2;
				} else if (codes[i + 1] === 2 && codes[i + 4] !== undefined) {
					this._bg = `rgb(${codes[i + 2]},${codes[i + 3]},${codes[i + 4]})`;
					i += 4;
				}
			} else if (code === 49) {
				this._bg = null;
			} else if (code >= 90 && code <= 97) {
				this._fg = ANSI_COLORS_BRIGHT[code - 90] as string;
			} else if (code >= 100 && code <= 107) {
				this._bg = ANSI_COLORS_BRIGHT[code - 100] as string;
			}
			i++;
		}
	}

	private _scrollUp(): void {
		const line = this._screen.shift();
		if (line === undefined) return;
		this._scrollback.push(line);
		if (this._scrollback.length > 1000) this._scrollback.shift();
		this._screen.push(Array.from({ length: this._cols }, () => makeCell()));
		// curRow stays at rows-1 (bottom)
	}

	private _putChar(ch: string): void {
		if (this._curCol >= this._cols) {
			this._curCol = 0;
			if (this._curRow < this._rows - 1) { this._curRow++; } else { this._scrollUp(); }
		}
		(this._screen[this._curRow] as Cell[])[this._curCol] = makeCell({
			ch,
			bold: this._bold,
			reverse: this._reverse,
			fg: this._fg,
			bg: this._bg,
		});
		this._curCol++;
	}

	private _makeScreen(rows = this._rows, cols = this._cols): Cell[][] {
		return Array.from({ length: rows }, () =>
			Array.from({ length: cols }, () => makeCell()),
		);
	}

	/** Render current screen state to an HTML string for a <pre> element. */
	renderHtml(): string {
		const parts: string[] = [];
		for (let r = 0; r < this._rows; r++) {
			const row = this._screen[r] as Cell[];
			let spanOpen = false;
			let lastStyle = "";
			for (let c = 0; c < this._cols; c++) {
				const cell = row[c] as Cell;
				const isCursor = this._cursorVisible && r === this._curRow && c === this._curCol;

				let fg = cell.fg ?? "#ccc";
				let bg = cell.bg ?? "transparent";
				if (cell.reverse) { [fg, bg] = [bg === "transparent" ? "#000" : bg, fg === "transparent" ? "#000" : fg]; }
				if (isCursor) {
					// Isolate cursor in its own span so reversed colour doesn't bleed onto adjacent blank cells.
					if (spanOpen) { parts.push("</span>"); spanOpen = false; lastStyle = ""; }
					const curFg = bg === "transparent" ? "#000" : bg;
					const boldPart = cell.bold ? "font-weight:bold;" : "";
					parts.push(`<span style="color:${curFg};background:#ccc;${boldPart}">${escHtml(cell.ch)}</span>`);
				} else {
					const style = `color:${fg};background:${bg};${cell.bold ? "font-weight:bold;" : ""}`;
					if (style !== lastStyle) {
						if (spanOpen) parts.push("</span>");
						parts.push(`<span style="${style}">`);
						spanOpen = true;
						lastStyle = style;
					}
					parts.push(escHtml(cell.ch));
				}
			}
			if (spanOpen) parts.push("</span>");
			if (r < this._rows - 1) parts.push("\n");
		}
		return parts.join("");
	}

	/** Current cursor row position (0-indexed). */
	get cursorRow(): number { return this._curRow; }
	/** Current cursor column position (0-indexed). */
	get cursorCol(): number { return this._curCol; }
	/** Whether the cursor is currently visible (controlled by CSI ?25l/?25h). */
	get isCursorVisible(): boolean { return this._cursorVisible; }

	/** Returns true (once) if CSI 2J was received since last call. */
	consumeCleared(): boolean {
		const v = this._cleared;
		this._cleared = false;
		return v;
	}

	/** Number of rows currently in the scrollback buffer. */
	get scrollbackLength(): number { return this._scrollback.length; }

	/** Clear the scrollback buffer. */
	clearScrollback(): void { this._scrollback = []; }

	/**
	 * Render the scrollback buffer as HTML with inline styles for colors and bold.
	 * Each row becomes a div, each styled cell becomes a span.
	 * @returns HTML string suitable for innerHTML insertion.
	 */
	renderScrollbackHtml(): string {
		const parts: string[] = [];
		for (const row of this._scrollback) {
			let spanOpen = false;
			let lastStyle = "";
			for (const cell of row) {
				let fg = cell.fg ?? "#ccc";
				let bg = cell.bg ?? "transparent";
				if (cell.reverse) { [fg, bg] = [bg === "transparent" ? "#000" : bg, fg === "transparent" ? "#000" : fg]; }
				const style = `color:${fg};background:${bg};${cell.bold ? "font-weight:bold;" : ""}`;
				if (style !== lastStyle) {
					if (spanOpen) parts.push("</span>");
					parts.push(`<span style="${style}">`);
					spanOpen = true;
					lastStyle = style;
				}
				parts.push(escHtml(cell.ch));
			}
			if (spanOpen) parts.push("</span>");
			parts.push("\n");
		}
		return parts.join("");
	}
}

function escHtml(ch: string): string {
	if (ch === "&") return "&amp;";
	if (ch === "<") return "&lt;";
	if (ch === ">") return "&gt;";
	return ch;
}

const ANSI_COLORS = ["#000", "#c00", "#0c0", "#cc0", "#00c", "#c0c", "#0cc", "#ccc"];
const ANSI_COLORS_BRIGHT = ["#555", "#f55", "#5f5", "#ff5", "#55f", "#f5f", "#5ff", "#fff"];

function xterm256(n: number): string {
	if (n < 16) return (n < 8 ? ANSI_COLORS : ANSI_COLORS_BRIGHT)[n < 8 ? n : n - 8] as string;
	if (n < 232) {
		const i = n - 16;
		const r = Math.floor(i / 36) * 51;
		const g = Math.floor((i % 36) / 6) * 51;
		const b = (i % 6) * 51;
		return `rgb(${r},${g},${b})`;
	}
	const v = (n - 232) * 10 + 8;
	return `rgb(${v},${v},${v})`;
}