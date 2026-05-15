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

export class WebTermRenderer {
	private rows: number;
	private cols: number;
	private screen: Cell[][];
	private curRow = 0;
	private curCol = 0;
	private cursorVisible = true;

	// Current SGR state
	private bold = false;
	private reverse = false;
	private fg: string | null = null;
	private bg: string | null = null;

	private buf = "";

	constructor(rows: number, cols: number) {
		this.rows = rows;
		this.cols = cols;
		this.screen = this.makeScreen();
	}

	resize(rows: number, cols: number): void {
		const newScreen = this.makeScreen(rows, cols);
		for (let r = 0; r < Math.min(rows, this.rows); r++) {
			for (let c = 0; c < Math.min(cols, this.cols); c++) {
				newScreen[r]![c] = this.screen[r]?.[c] ?? makeCell();
			}
		}
		this.rows = rows;
		this.cols = cols;
		this.screen = newScreen;
		this.curRow = Math.min(this.curRow, rows - 1);
		this.curCol = Math.min(this.curCol, cols - 1);
	}

	write(data: string): void {
		this.buf += data;
		this.flush();
	}

	private flush(): void {
		let i = 0;
		while (i < this.buf.length) {
			const ch = this.buf[i]!;
			if (ch === "\x1b") {
				if (i + 1 >= this.buf.length) break; // wait for more data
				const next = this.buf[i + 1]!;
				if (next === "[") {
					// CSI — find terminator
					let j = i + 2;
					while (j < this.buf.length && (this.buf[j]! < "@" || this.buf[j]! > "~")) j++;
					if (j >= this.buf.length) break; // incomplete
					const seq = this.buf.slice(i + 2, j);
					const cmd = this.buf[j]!;
					this.handleCsi(seq, cmd);
					i = j + 1;
				} else {
					i += 2; // skip unknown ESC sequence
				}
			} else if (ch === "\r") {
				this.curCol = 0;
				i++;
			} else if (ch === "\n") {
				this.curRow = Math.min(this.curRow + 1, this.rows - 1);
				i++;
			} else if (ch.charCodeAt(0) >= 32) {
				this.putChar(ch);
				i++;
			} else {
				i++; // skip other control chars
			}
		}
		this.buf = this.buf.slice(i);
	}

	private handleCsi(seq: string, cmd: string): void {
		if (cmd === "H" || cmd === "f") {
			// Cursor position: row;col (1-based)
			const parts = seq.split(";").map((n) => Number.parseInt(n || "1", 10));
			this.curRow = Math.max(0, Math.min((parts[0] ?? 1) - 1, this.rows - 1));
			this.curCol = Math.max(0, Math.min((parts[1] ?? 1) - 1, this.cols - 1));
			return;
		}
		if (cmd === "K") {
			// Erase line from cursor to end
			const mode = seq === "" ? 0 : Number.parseInt(seq, 10);
			if (mode === 0) {
				for (let c = this.curCol; c < this.cols; c++) {
					this.screen[this.curRow]![c] = makeCell();
				}
			} else if (mode === 1) {
				for (let c = 0; c <= this.curCol; c++) {
					this.screen[this.curRow]![c] = makeCell();
				}
			} else if (mode === 2) {
				for (let c = 0; c < this.cols; c++) {
					this.screen[this.curRow]![c] = makeCell();
				}
			}
			return;
		}
		if (cmd === "J") {
			const mode = seq === "" ? 0 : Number.parseInt(seq, 10);
			if (mode === 2) {
				this.screen = this.makeScreen();
				this.curRow = 0;
				this.curCol = 0;
			}
			return;
		}
		if (cmd === "m") {
			this.handleSgr(seq);
			return;
		}
		if (cmd === "l" && seq === "?25") {
			this.cursorVisible = false;
			return;
		}
		if (cmd === "h" && seq === "?25") {
			this.cursorVisible = true;
			return;
		}
	}

	private handleSgr(seq: string): void {
		const codes = seq === "" ? [0] : seq.split(";").map((n) => Number.parseInt(n || "0", 10));
		let i = 0;
		while (i < codes.length) {
			const code = codes[i]!;
			if (code === 0) {
				this.bold = false; this.reverse = false; this.fg = null; this.bg = null;
			} else if (code === 1) {
				this.bold = true;
			} else if (code === 7) {
				this.reverse = true;
			} else if (code === 22) {
				this.bold = false;
			} else if (code === 27) {
				this.reverse = false;
			} else if (code >= 30 && code <= 37) {
				this.fg = ANSI_COLORS[code - 30]!;
			} else if (code === 38) {
				if (codes[i + 1] === 5 && codes[i + 2] !== undefined) {
					this.fg = xterm256(codes[i + 2]!);
					i += 2;
				} else if (codes[i + 1] === 2 && codes[i + 4] !== undefined) {
					this.fg = `rgb(${codes[i + 2]},${codes[i + 3]},${codes[i + 4]})`;
					i += 4;
				}
			} else if (code === 39) {
				this.fg = null;
			} else if (code >= 40 && code <= 47) {
				this.bg = ANSI_COLORS[code - 40]!;
			} else if (code === 48) {
				if (codes[i + 1] === 5 && codes[i + 2] !== undefined) {
					this.bg = xterm256(codes[i + 2]!);
					i += 2;
				} else if (codes[i + 1] === 2 && codes[i + 4] !== undefined) {
					this.bg = `rgb(${codes[i + 2]},${codes[i + 3]},${codes[i + 4]})`;
					i += 4;
				}
			} else if (code === 49) {
				this.bg = null;
			} else if (code >= 90 && code <= 97) {
				this.fg = ANSI_COLORS_BRIGHT[code - 90]!;
			} else if (code >= 100 && code <= 107) {
				this.bg = ANSI_COLORS_BRIGHT[code - 100]!;
			}
			i++;
		}
	}

	private putChar(ch: string): void {
		if (this.curRow >= this.rows || this.curCol >= this.cols) return;
		this.screen[this.curRow]![this.curCol] = makeCell({
			ch,
			bold: this.bold,
			reverse: this.reverse,
			fg: this.fg,
			bg: this.bg,
		});
		this.curCol++;
		if (this.curCol >= this.cols) {
			this.curCol = 0;
			if (this.curRow < this.rows - 1) this.curRow++;
		}
	}

	private makeScreen(rows = this.rows, cols = this.cols): Cell[][] {
		return Array.from({ length: rows }, () =>
			Array.from({ length: cols }, () => makeCell()),
		);
	}

	/** Render current screen state to an HTML string for a <pre> element. */
	renderHtml(): string {
		let html = "";
		for (let r = 0; r < this.rows; r++) {
			const row = this.screen[r]!;
			let spanOpen = false;
			let lastStyle = "";
			for (let c = 0; c < this.cols; c++) {
				const cell = row[c]!;
				const isCursor = this.cursorVisible && r === this.curRow && c === this.curCol;

				let fg = cell.fg ?? "#ccc";
				let bg = cell.bg ?? "transparent";
				if (cell.reverse) { [fg, bg] = [bg === "transparent" ? "#000" : bg, fg]; }
				if (cell.bold && !cell.fg) fg = "#fff";
				if (isCursor) { [fg, bg] = [bg === "transparent" ? "#000" : bg, fg === "#ccc" ? "#ccc" : fg]; bg = "#ccc"; fg = "#000"; }

				const style = `color:${fg};background:${bg};${cell.bold ? "font-weight:bold;" : ""}`;
				if (style !== lastStyle) {
					if (spanOpen) html += "</span>";
					html += `<span style="${style}">`;
					spanOpen = true;
					lastStyle = style;
				}
				html += escHtml(cell.ch);
			}
			if (spanOpen) html += "</span>";
			if (r < this.rows - 1) html += "\n";
		}
		return html;
	}

	get cursorRow(): number { return this.curRow; }
	get cursorCol(): number { return this.curCol; }
	get isCursorVisible(): boolean { return this.cursorVisible; }
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
	if (n < 16) return (n < 8 ? ANSI_COLORS : ANSI_COLORS_BRIGHT)[n < 8 ? n : n - 8]!;
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
