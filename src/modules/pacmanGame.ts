/**
 * pacmanGame.ts — terminal-based Pacman game for the virtual shell.
 *
 * A fully playable Pacman clone rendered over a ShellStream using ANSI
 * escape sequences. Uses the classic MyMan maze layout (36×33).
 * Supports arrow key movement, ghost AI, power pellets, and scoring.
 *
 * Public API:
 *  - PacmanGame        — main game class
 *  - PacmanGameOptions — constructor options interface
 */
import type { ShellStream } from "../types/streams";
import type { TerminalSize } from "./shellRuntime";

// ── ANSI ─────────────────────────────────────────────────────────────────────

const ESC = "\x1b";
const CSI = `${ESC}[`;
const cup = (r: number, c: number) => `${CSI}${r};${c}H`;
const hide = `${CSI}?25l`;
const show = `${CSI}?25h`;
const clearScreen = `${CSI}2J${CSI}H`;
const eraseEol = `${CSI}K`;

const C = {
	blue:   `${ESC}[1;34m`,
	yellow: `${ESC}[1;33m`,
	red:    `${ESC}[1;31m`,
	pink:   `${ESC}[1;35m`,
	cyan:   `${ESC}[1;36m`,
	orange: `${ESC}[33m`,
	white:  `${ESC}[1;37m`,
	dim:    `${ESC}[2;37m`,
	blink:  `${ESC}[5m`,
	r:      `${ESC}[0m`,
};

// ── Maze ─────────────────────────────────────────────────────────────────────
// Source: myman-wip-2009-10-30 gpac.txt level 1 (36 cols × 33 rows)

const MAZE_TEMPLATE = [
	"   ╔══════════╗      ╔══════════╗   ",// 0
	"   ║.  .  .  .║      ║.  .  .  .║   ",// 1
	"   ║ ┌┐ ┌───┐ ║      ║ ┌───┐ ┌┐ ║   ",// 2
	"╔══╝ ││ └──┐│ ╚══════╝ │┌──┘ ││ ╚══╗",// 3
	"║.  o││.  .││.  .  .  .││.  .││o  .║",// 4
	"║ ┌──┘└──┐ ││ ┌──────┐ ││ ┌──┘└──┐ ║",// 5
	"║ └──────┘ └┘ └──────┘ └┘ └──────┘ ║",// 6
	"║.  .  .  .  .  .  .  .  .  .  .  .║",// 7
	"╙──┐ ┌┐ ┌┐ ┌───┐ ┌┐ ┌───┐ ┌┐ ┌┐ ┌──╜",// 8
	"╓──┘ ││ └┘ └───┘ ││ └───┘ └┘ ││ └──╖",// 9
	"║   .││.  .  .  .││.  .  .  .││.   ║",// 10
	"║ ┌┐ ││ ┌┐ ┌───┐ ││ ┌───┐ ┌┐ ││ ┌┐ ║",// 11
	"╝ ││ └┘ └┘ │┌──┘ └┘ └──┐│ └┘ └┘ ││ ╚",// 12
	"  ││.  .  .││          ││.  .  .││  ",// 13
	"══╛╖ ┌┐ ┌──┘│ ╔══  ══╗ │└──┐ ┌┐ ╓╘══",// 14
	"   ║ ││ └───┘ ║      ║ └───┘ ││ ║   ",// 15
	"   ║.││.  .   ║      ║   .  .││.║   ",// 16
	"   ║ ││ ┌───┐ ║      ║ ┌───┐ ││ ║   ",// 17
	"╔══╝ └┘ └──┐│ ╚══════╝ │┌──┘ └┘ ╚══╗",// 18
	"║.  .  .  .││          ││.  .  .  .║",// 19
	"║ ┌┐ ┌┐ ┌┐ ││ ┌──────┐ ││ ┌┐ ┌┐ ┌┐ ║",// 20
	"╝ ││ └┘ ││ └┘ └──┐┌──┘ └┘ ││ └┘ ││ ╚",// 21
	" .││.  .││.  .  .││.  .  .││.  .││. ",// 22
	"╗ ││ ┌┐ ││ ┌┐ ┌┐ ││ ┌┐ ┌┐ ││ ┌┐ ││ ╔",// 23
	"║ └┘ └┘ ││ ││ ││ └┘ ││ ││ ││ └┘ └┘ ║",// 24
	"║.  .  .││.││.││.  .││.││.││.  .  .║",// 25
	"║ ┌───┐ ││ ││ ││ ┌┐ ││ ││ ││ ┌───┐ ║",// 26
	"║ └──┐│ └┘ └┘ └┘ ││ └┘ └┘ └┘ │┌──┘ ║",// 27
	"║.  o││.  .  .  .││.  .  .  .││o  .║",// 28
	"╚══╗ ││ ┌───┐ ╔══╛╘══╗ ┌───┐ ││ ╔══╝",// 29
	"   ║ └┘ └───┘ ║      ║ └───┘ └┘ ║   ",// 30
	"   ║.  .  .  .║      ║.  .  .  .║   ",// 31
	"   ╚══════════╝      ╚══════════╝   ",// 32
];

const ROWS = MAZE_TEMPLATE.length;
const COLS = 36;

const WALL_SET = new Set([
	"╔","╗","╚","╝","═","║","╙","╜","╓","╖","╛","╘","╒","╕",
	"┌","┐","└","┘","─","│","╞","╡","┼","≡","╟","╢",
]);

type Cell = "wall" | "dot" | "pellet" | "empty" | "ghost-house";

function parseMaze(tpl: string[]): Cell[][] {
	const grid: Cell[][] = [];
	for (let r = 0; r < tpl.length; r++) {
		const row: Cell[] = [];
		const line = tpl[r] as string;
		for (let c = 0; c < COLS; c++) {
			const ch = line[c] ?? " ";
			if (WALL_SET.has(ch)) { row.push("wall"); }
			else if (ch === ".") { row.push("dot"); }
			else if (ch === "o") { row.push("pellet"); }
			else { row.push("empty"); }
		}
		grid.push(row);
	}
	// Mark ghost house interior (walls at c14,c21 already "wall"; interior = ghost-house)
	for (let r = 15; r <= 17; r++) {
		const row = grid[r];
		if (!row) { continue; }
		for (let c = 15; c <= 20; c++) {
			if (row[c] === "empty") { row[c] = "ghost-house"; }
		}
	}
	return grid;
}

// ── Directions ────────────────────────────────────────────────────────────────

type Dir = 0 | 1 | 2 | 3; // right, down, left, up
const DR = [0, 1, 0, -1] as const;
const DC = [1, 0, -1, 0] as const;
const OPP: readonly Dir[] = [2, 3, 0, 1];
const ALL_DIRS: readonly Dir[] = [0, 1, 2, 3];
const DIR_PRIORITY: readonly Dir[] = [3, 2, 1, 0]; // up > left > down > right

function oppositeDir(d: Dir): Dir {
	return OPP[d]!;
}

// ── Ghost ─────────────────────────────────────────────────────────────────────

type GhostMode = "scatter" | "chase" | "fright" | "eaten";

interface Ghost {
	name: string;
	color: string;
	r: number;
	c: number;
	dir: Dir;
	mode: GhostMode;
	frightTicks: number;
	// scatter corner
	scatterR: number;
	scatterC: number;
	inHouse: boolean;
	dotThreshold: number;
	// per-ghost move throttle (some ghosts slower than others)
	movePeriod: number; // move every N game-ticks
	movePhase: number;  // current counter
}

// ── Options ───────────────────────────────────────────────────────────────────

/** Configuration options for creating a PacmanGame instance. */
export interface PacmanGameOptions {
	stream: ShellStream;
	terminalSize: TerminalSize;
	onExit: () => void;
}

// ── PacmanGame ────────────────────────────────────────────────────────────────

/**
 * Classic Pacman game that runs in the terminal with ANSI rendering.
 * Uses the MyMan maze layout (36×33) with 4 ghosts, power pellets, and scoring.
 *
 * @example
 * ```ts
 * const game = new PacmanGame({
 *   stream,
 *   terminalSize: { cols: 36, rows: 33 },
 *   onExit: () => console.log("Game over, score:", game.score),
 * });
 * game.start();
 * // Feed arrow keys: game.handleInput(Buffer.from("\x1b[A")); // up
 * // game.stop();
 * ```
 */
export class PacmanGame {
	private _stream: ShellStream;
	private _onExit: () => void;

	private _grid: Cell[][];
	private _visualGrid: string[][];

	/** Safely access a grid row. The grid is always fully populated. */
	private _gridRow(r: number): Cell[] {
		const row = this._grid[r];
		if (row === undefined) { throw new Error(`PacmanGame: row ${r} out of range`); }
		return row;
	}

	/** Safely access a ghost by index. Ghosts are always initialized. */
	private _ghost(i: number): Ghost {
		const g = this._ghosts[i];
		if (g === undefined) { throw new Error(`PacmanGame: ghost ${i} not found`); }
		return g;
	}

	// Pacman — spawn r22,c16 (open dot, mid corridor left of center pillars)
	private _pacR = 22;
	private _pacC = 16;
	private _pacDir: Dir = 2;
	private _pacNextDir: Dir = 2;
	private _pacMouthOpen = true;
	private _pacAlive = true;

	private _ghosts: Ghost[] = [];

	private _score = 0;
	private _lives = 3;
	private _level = 1;
	private _dotsTotal = 0;
	private _dotsEaten = 0;

	private _frightDuration = 40; // ticks at 8fps ≈ 5 s
	private _gameOver = false;
	private _won = false;
	private _msgTicks = 0;
	private _msg = "";

	// Scatter/chase schedule in ticks (8fps): 7s scatter, 20s chase, 7s, 20s, 5s, ∞
	private _globalMode: GhostMode = "scatter";
	private _globalModeTick = 0;
	private readonly _modeSchedule = [56, 160, 56, 160, 40, Number.MAX_SAFE_INTEGER];
	private _modeIdx = 0;

	private _tick = 0;
	private _intervalId: ReturnType<typeof setInterval> | null = null;
	private _inputKey: Dir | null = null;
	// Buffer for split ESC sequences (SSH sends \x1b and [A in separate chunks)
	private _escBuf = "";

	// Death animation
	private _deathTick = 0;
	private _deathAnimating = false;

	// Differential render — previous rendered lines
	private _prevLines: string[] = [];

	/**
	 * Create a new Pacman game instance.
	 * @param opts - Game configuration (stream, terminal size, exit callback).
	 */
	constructor(opts: PacmanGameOptions) {
		this._stream = opts.stream;
		this._onExit = opts.onExit;
		this._grid = parseMaze(MAZE_TEMPLATE);
		this._visualGrid = MAZE_TEMPLATE.map(l => Array.from(l));
		this._countDots();
		this._initGhosts();
	}

	private _countDots(): void {
		this._dotsTotal = 0;
		for (const row of this._grid) {
			for (const c of row) {
				if (c === "dot" || c === "pellet") { this._dotsTotal++; }
			}
		}
	}

	private _initGhosts(): void {
		this._ghosts = [
			// Blinky — always outside, top-right scatter
			{
				name: "Blinky", color: C.red,
				r: 14, c: 17, dir: 2,
				mode: "scatter", frightTicks: 0,
				scatterR: 0, scatterC: 35,
				inHouse: false, dotThreshold: 0,
				movePeriod: 1, movePhase: 0,
			},
			// Pinky — house center, top-left scatter, exits immediately
			{
				name: "Pinky", color: C.pink,
				r: 16, c: 17, dir: 3,
				mode: "scatter", frightTicks: 0,
				scatterR: 0, scatterC: 0,
				inHouse: true, dotThreshold: 0,
				movePeriod: 1, movePhase: 0,
			},
			// Inky — house left, bottom-right scatter, exits after 30 dots (arcade value)
			{
				name: "Inky", color: C.cyan,
				r: 16, c: 15, dir: 3,
				mode: "scatter", frightTicks: 0,
				scatterR: 32, scatterC: 35,
				inHouse: true, dotThreshold: 30,
				movePeriod: 1, movePhase: 1,
			},
			// Clyde — house right, bottom-left scatter, exits after 60 dots (arcade value)
			{
				name: "Clyde", color: C.orange,
				r: 16, c: 19, dir: 3,
				mode: "scatter", frightTicks: 0,
				scatterR: 32, scatterC: 0,
				inHouse: true, dotThreshold: 60,
				movePeriod: 1, movePhase: 2,
			},
		];
	}

	/**
	 * Start the game loop. Renders the initial maze and begins the 8fps tick.
	 */
	start(): void {
		this._stream.write(hide + clearScreen);
		this._prevLines = [];
		this._renderFull();
		this._intervalId = setInterval(() => this._gameTick(), 125);
	}

	/**
	 * Stop the game loop and restore the terminal cursor.
	 */
	stop(): void {
		if (this._intervalId) { clearInterval(this._intervalId); this._intervalId = null; }
		this._stream.write(show + clearScreen + C.r);
	}

	/**
	 * Process raw terminal input bytes. Handles arrow keys (CSI sequences),
	 * WASD, and Q/Ctrl+C to quit. Buffers partial ESC sequences from SSH.
	 * @param chunk - Raw bytes from the terminal stream.
	 */
	handleInput(chunk: Buffer): void {
		// Prepend any buffered partial ESC sequence from previous chunk (SSH splits \x1b and [A)
		const data = this._escBuf + chunk.toString("utf8");
		this._escBuf = "";
		let i = 0;
		while (i < data.length) {
			const ch = data[i] as string;
			if (ch === "q" || ch === "Q" || ch === "\x03") { this.stop(); this._onExit(); return; }
			if (ch === "\x1b") {
				// Need at least 2 more chars for CSI arrow sequence
				if (i + 2 >= data.length) {
					this._escBuf = data.slice(i);
					break;
				}
				if (data[i + 1] === "[") {
					const code = data[i + 2];
					if (code === "A") { this._inputKey = 3; }
					else if (code === "B") { this._inputKey = 1; }
					else if (code === "C") { this._inputKey = 0; }
					else if (code === "D") { this._inputKey = 2; }
					i += 3; continue;
				}
				i++; continue;
			}
			if (ch === "w" || ch === "W") { this._inputKey = 3; }
			else if (ch === "s" || ch === "S") { this._inputKey = 1; }
			else if (ch === "a" || ch === "A") { this._inputKey = 2; }
			else if (ch === "d" || ch === "D") { this._inputKey = 0; }
			i++;
		}
	}

	// ── Game loop ─────────────────────────────────────────────────────────────

	private _gameTick(): void {
		if (this._gameOver || this._won) {
			this._msgTicks++;
			if (this._msgTicks > 32) { this.stop(); this._onExit(); }
			else { this._renderDiff(); }
			return;
		}

		if (this._deathAnimating) {
			this._deathTick++;
			if (this._deathTick > 16) {
				this._deathAnimating = false;
				this._deathTick = 0;
				if (this._lives <= 0) {
					this._gameOver = true; this._msg = "GAME  OVER"; this._msgTicks = 0;
				} else {
					this._respawn();
				}
			}
			this._renderDiff();
			return;
		}

		this._tick++;

		// Queue direction
		if (this._inputKey !== null) {
			this._pacNextDir = this._inputKey;
			this._inputKey = null;
		}

		// Global scatter/chase schedule
		if (this._globalMode !== "fright") {
			this._globalModeTick++;
			if (this._globalModeTick >= (this._modeSchedule[this._modeIdx] as number)) {
				this._globalModeTick = 0;
				this._modeIdx = Math.min(this._modeIdx + 1, this._modeSchedule.length - 1);
				this._globalMode = this._modeIdx % 2 === 0 ? "scatter" : "chase";
				// Sync all active ghosts to new global mode + force reverse (original behavior)
				for (const g of this._ghosts) {
					if (!g.inHouse && g.mode !== "fright" && g.mode !== "eaten") {
						g.mode = this._globalMode;
						g.dir = oppositeDir(g.dir);
					}
				}
			}
		}

		// Snapshot ghost positions before move (for cross-collision detection)
		const prevGhostPos = this._ghosts.map(g => ({ r: g.r, c: g.c }));
		const prevPacR = this._pacR;
		const prevPacC = this._pacC;

		this._movePacman();
		this._pacMouthOpen = !this._pacMouthOpen;

		for (const g of this._ghosts) { this._moveGhost(g); }

		this._checkCollisions(prevGhostPos, prevPacR, prevPacC);
		this._renderDiff();
	}

	// ── Walkability ───────────────────────────────────────────────────────────

	private _isWalkable(r: number, c: number, ghost = false): boolean {
		if (r < 0 || r >= ROWS) { return false; }
		// Horizontal tunnel wrap handled elsewhere
		const cc = ((c % COLS) + COLS) % COLS;
		const cell = this._grid[r]?.[cc];
		if (cell === "wall") { return false; }
		if (!ghost && cell === "ghost-house") { return false; }
		return cell !== undefined;
	}

	// ── Pacman movement ───────────────────────────────────────────────────────

	private _movePacman(): void {
		// Try queued dir
		const qr = this._pacR + DR[this._pacNextDir];
		const qc = ((this._pacC + DC[this._pacNextDir]) % COLS + COLS) % COLS;
		if (this._isWalkable(qr, qc)) { this._pacDir = this._pacNextDir; }

		const mr = this._pacR + DR[this._pacDir];
		const mc = ((this._pacC + DC[this._pacDir]) % COLS + COLS) % COLS;
		if (this._isWalkable(mr, mc)) { this._pacR = mr; this._pacC = mc; }

		const cell = this._grid[this._pacR]?.[this._pacC];
		if (cell === "dot") {
			this._gridRow(this._pacR)[this._pacC] = "empty";
			this._score += 10; this._dotsEaten++;
		} else if (cell === "pellet") {
			this._gridRow(this._pacR)[this._pacC] = "empty";
			this._score += 50; this._dotsEaten++;
			this._activateFright();
		}

		if (this._dotsEaten >= this._dotsTotal) {
			this._won = true; this._msg = " YOU  WIN!"; this._msgTicks = 0;
		}
	}

	// ── Ghost: fright ─────────────────────────────────────────────────────────

	private _activateFright(): void {
		for (const g of this._ghosts) {
			if (g.mode !== "eaten") {
				g.mode = "fright";
				g.frightTicks = this._frightDuration;
				g.movePeriod = 2; // half speed during fright (arcade accurate)
				if (!g.inHouse) { g.dir = oppositeDir(g.dir); }
			}
		}
		// Do not interrupt global mode schedule tick during fright
	}

	// ── Ghost: target tile (original Pac-Man logic) ───────────────────────────

	private _ghostTarget(g: Ghost): [number, number] {
		if (g.mode === "scatter") { return [g.scatterR, g.scatterC]; }

		// Chase targets — faithful to original arcade
		switch (g.name) {
			case "Blinky":
				// Direct chase: target = pacman position
				return [this._pacR, this._pacC];

			case "Pinky": {
				// Target 4 tiles ahead of pacman (with original NES up-bug: up = up-left*4)
				const tr = this._pacR + DR[this._pacDir] * 4;
				let tc = this._pacC + DC[this._pacDir] * 4;
				if (this._pacDir === 3) { tc = this._pacC - 4; // NES bug: facing up → also goes left
}
				return [tr, tc];
			}

			case "Inky": {
				// Pivot: 2 tiles ahead of pacman, then double-vector from Blinky
				const blinky = this._ghost(0);
				const pr = this._pacR + DR[this._pacDir] * 2;
				let pc = this._pacC + DC[this._pacDir] * 2;
				if (this._pacDir === 3) { pc = this._pacC - 2; // NES bug mirror
}
				// Target = pivot + (pivot - blinky)
				return [pr * 2 - blinky.r, pc * 2 - blinky.c];
			}

			case "Clyde": {
				// Chase if dist > 8 tiles (Euclidean), else scatter corner
				const dr = g.r - this._pacR;
				const dc = g.c - this._pacC;
				if (dr * dr + dc * dc > 64) { return [this._pacR, this._pacC]; }
				return [g.scatterR, g.scatterC];
			}

			default:
				return [this._pacR, this._pacC];
		}
	}

	// ── Ghost: movement ───────────────────────────────────────────────────────

	private _moveGhost(g: Ghost): void {
		// Per-ghost speed throttle
		g.movePhase = (g.movePhase + 1) % g.movePeriod;
		if (g.movePhase !== 0) { return; }

		// Fright countdown — applied AFTER collision check via tickFrightCountdown()
		// (moving it here would let mode flip to chase before collision is tested)

		// In-house: bounce and navigate to exit
		if (g.inHouse) {
			if (this._dotsEaten < g.dotThreshold) {
				// Bounce vertically inside house
				const nextR = g.r + DR[g.dir];
				if (nextR < 15 || nextR > 17) { g.dir = oppositeDir(g.dir); }
				else { g.r = nextR; }
				return;
			}
			// Navigate to exit: r=14,c=17 (open gap in ghost house top wall)
			const exitR = 14;
			const exitC = 17;
			if (g.r === exitR && g.c === exitC) {
				g.inHouse = false;
				g.mode = this._globalMode;
				g.dir = 2; // exit left into corridor
				return;
			}
			// Step toward exit
			if (g.c !== exitC) {
				g.c += g.c < exitC ? 1 : -1;
			} else if (g.r > exitR) {
				g.r--;
			}
			return;
		}

		// Eaten: beeline back to house entrance
		if (g.mode === "eaten") {
			const homeR = 14;
			const homeC = 17;
			if (g.r === homeR && g.c === homeC) {
				g.inHouse = true;
				g.r = 16; g.c = 17; // reset inside house
				g.mode = this._globalMode;
				g.movePeriod = 1;
				g.dir = 3;
				return;
			}
			// Move one step toward house
			if (g.c !== homeC) { g.c += g.c < homeC ? 1 : -1; }
			else if (g.r !== homeR) { g.r += g.r < homeR ? 1 : -1; }
			return;
		}

		// Normal: pick best direction at each tile
		const candidates: Dir[] = [...ALL_DIRS].filter(d => d !== OPP[g.dir]);
		const walkable = candidates.filter(d => {
			const nr = g.r + DR[d];
			const nc = ((g.c + DC[d]) % COLS + COLS) % COLS;
			return this._isWalkable(nr, nc, true);
		});

		let chosen: Dir = g.dir;

		if (g.mode === "fright") {
			// Random walkable direction
			if (walkable.length > 0) { chosen = walkable[Math.floor(Math.random() * walkable.length)] ?? chosen; }
		} else {
			const [tR, tC] = this._ghostTarget(g);
			let best = Number.MAX_SAFE_INTEGER;
			// Original priority: up > left > down > right when tied
			for (const d of DIR_PRIORITY) {
				if (!walkable.includes(d)) { continue; }
				const nr = g.r + DR[d];
				const nc = ((g.c + DC[d]) % COLS + COLS) % COLS;
				const dr = nr - tR;
				const dc = nc - tC;
				const dist = dr * dr + dc * dc; // squared Euclidean (same ranking as sqrt)
				if (dist < best) { best = dist; chosen = d; }
			}
		}

		g.dir = chosen;
		const nr = g.r + DR[g.dir];
		const nc = ((g.c + DC[g.dir]) % COLS + COLS) % COLS;
		if (this._isWalkable(nr, nc, true)) { g.r = nr; g.c = nc; }
	}

	// ── Collision ─────────────────────────────────────────────────────────────

	private _checkCollisions(
		prevGhostPos: { r: number; c: number }[],
		prevPacR: number,
		prevPacC: number,
	): void {
		for (let i = 0; i < this._ghosts.length; i++) {
			const g = this._ghost(i);
			if (g.inHouse || g.mode === "eaten") { continue; }

			// Same-cell collision
			const sameTile = g.r === this._pacR && g.c === this._pacC;
			// Cross-collision: pacman and ghost swapped positions this tick
			const prev = prevGhostPos[i];
			if (prev === undefined) { continue; }
			const crossed = prev.r === this._pacR && prev.c === this._pacC
				&& g.r === prevPacR && g.c === prevPacC;

			if (!(sameTile || crossed)) { continue; }

			if (g.mode === "fright") {
				g.mode = "eaten"; this._score += 200;
			} else {
				this._lives--;
				this._deathAnimating = true; this._deathTick = 0; this._pacAlive = false;
				// Tick fright countdowns before returning
				this._tickFrightCountdowns();
				return;
			}
		}
		this._tickFrightCountdowns();
	}

	private _tickFrightCountdowns(): void {
		for (const g of this._ghosts) {
			if (g.mode === "fright") {
				g.frightTicks--;
				if (g.frightTicks <= 0) {
					g.mode = this._globalMode;
					g.movePeriod = 1;
				}
			}
		}
	}

	private _respawn(): void {
		this._pacR = 22; this._pacC = 16; this._pacDir = 2; this._pacNextDir = 2;
		this._pacAlive = true; this._pacMouthOpen = true;
		this._initGhosts();
	}

	// ── Render ────────────────────────────────────────────────────────────────

	private _buildLines(): string[] {
		const lines: string[] = [];

		// Header
		const sc = String(this._score).padStart(6, " ");
		const hi = String(Math.max(this._score, 24780)).padStart(6, " ");
		lines.push(`${C.white}  1UP   HIGH SCORE${C.r}`);
		lines.push(`  ${C.yellow}${sc}${C.r}   ${C.white}${hi}${C.r}`);

		// Build render grid from visual template
		const rg: string[][] = this._visualGrid.map(row => [...row]);

		// Overlay game cells
		for (let r = 0; r < ROWS; r++) {
			const rgRow = rg[r] as string[];
			for (let c = 0; c < COLS; c++) {
				const cell = this._grid[r]?.[c];
				const vch = rgRow[c] ?? " ";
				if (WALL_SET.has(vch)) { continue; }
				if (cell === "dot") { rgRow[c] = "·"; }
				else if (cell === "pellet") { rgRow[c] = "■"; }
				else { rgRow[c] = " "; }
			}
		}

		// Ghosts
		for (const g of this._ghosts) {
			if (g.r < 0 || g.r >= ROWS || g.c < 0 || g.c >= COLS) { continue; }
			let sprite: string;
			if (g.mode === "eaten") {
				sprite = `${C.white}ö${C.r}`;
			} else if (g.mode === "fright") {
				const flash = g.frightTicks < 12 && this._tick % 2 === 0;
				sprite = flash ? `${C.white}ᗣ${C.r}` : `${C.blue}ᗣ${C.r}`;
			} else {
				const frame = this._tick % 2 === 0 ? "ᗣ" : "ᗡ";
				sprite = `${g.color}${frame}${C.r}`;
			}
			(rg[g.r] as string[])[g.c] = sprite;
		}

		// Pacman
		if (this._pacAlive || this._deathAnimating) {
			let sprite: string;
			if (this._deathAnimating) {
				const frames = ["ᗧ","◑","◐","◒","◓","●","○"," "];
				sprite = `${C.yellow}${frames[Math.min(this._deathTick >> 1, frames.length - 1)]}${C.r}`;
			} else {
				const open = (["ᗧ","ᗦ","ᗤ","ᗣ"] as const)[this._pacDir] ?? "ᗧ";
				sprite = `${C.yellow}${this._pacMouthOpen ? open : "◯"}${C.r}`;
			}
			if (this._pacR >= 0 && this._pacR < ROWS && this._pacC >= 0 && this._pacC < COLS) {
				(rg[this._pacR] as string[])[this._pacC] = sprite;
			}
		}

		// Colorize maze rows
		for (let r = 0; r < ROWS; r++) {
			let row = "";
			for (let c = 0; c < COLS; c++) {
				const ch = (rg[r] as string[])[c] as string;
				if (ch.includes("\x1b")) { row += ch; }
				else if (WALL_SET.has(ch)) { row += `${C.blue}${ch}${C.r}`; }
				else if (ch === "·") { row += `${C.dim}·${C.r}`; }
				else if (ch === "■") { row += `${C.white}■${C.r}`; }
				else { row += ch; }
			}
			lines.push(row);
		}

		// Footer
		const livesStr = `${C.yellow}ᗧ${C.r} `.repeat(Math.max(0, this._lives));
		lines.push("", `  ${livesStr}  LEVEL ${C.yellow}${this._level}${C.r}`);
		lines.push(`  ${C.dim}WASD/arrows  Q=quit${C.r}`);

		// Message overlay
		if (this._msg) { lines[18] = `        ${C.yellow}${C.blink}${this._msg}${C.r}`; }

		return lines;
	}

	private _renderFull(): void {
		const lines = this._buildLines();
		let out = hide + clearScreen;
		for (let i = 0; i < lines.length; i++) { out += cup(i + 1, 1) + (lines[i] ?? "") + eraseEol; }
		this._stream.write(out);
		this._prevLines = lines;
	}

	private _renderDiff(): void {
		const lines = this._buildLines();
		let out = "";
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i] ?? "";
			if (line !== this._prevLines[i]) {
				out += cup(i + 1, 1) + line + eraseEol;
			}
		}
		// Clear any extra lines from previous render
		for (let i = lines.length; i < this._prevLines.length; i++) {
			out += cup(i + 1, 1) + eraseEol;
		}
		if (out) { this._stream.write(out); }
		this._prevLines = lines;
	}
}
