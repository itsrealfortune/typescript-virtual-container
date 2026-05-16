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
		const line = tpl[r]!;
		for (let c = 0; c < COLS; c++) {
			const ch = line[c] ?? " ";
			if (WALL_SET.has(ch)) row.push("wall");
			else if (ch === ".") row.push("dot");
			else if (ch === "o") row.push("pellet");
			else row.push("empty");
		}
		grid.push(row);
	}
	// Mark ghost house interior (walls at c14,c21 already "wall"; interior = ghost-house)
	for (let r = 15; r <= 17; r++) {
		for (let c = 15; c <= 20; c++) {
			if (grid[r]?.[c] === "empty") grid[r]![c] = "ghost-house";
		}
	}
	return grid;
}

// ── Directions ────────────────────────────────────────────────────────────────

type Dir = 0 | 1 | 2 | 3; // right, down, left, up
const DR = [0, 1, 0, -1] as const;
const DC = [1, 0, -1, 0] as const;
const OPP: Dir[] = [2, 3, 0, 1];

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

export interface PacmanGameOptions {
	stream: ShellStream;
	terminalSize: TerminalSize;
	onExit: () => void;
}

// ── PacmanGame ────────────────────────────────────────────────────────────────

export class PacmanGame {
	private stream: ShellStream;
	private onExit: () => void;

	private grid: Cell[][];
	private visualGrid: string[][];

	// Pacman — spawn r22,c16 (open dot, mid corridor left of center pillars)
	private pacR = 22;
	private pacC = 16;
	private pacDir: Dir = 2;
	private pacNextDir: Dir = 2;
	private pacMouthOpen = true;
	private pacAlive = true;

	private ghosts: Ghost[] = [];

	private score = 0;
	private lives = 3;
	private level = 1;
	private dotsTotal = 0;
	private dotsEaten = 0;

	private frightDuration = 40; // ticks at 8fps ≈ 5 s
	private gameOver = false;
	private won = false;
	private msgTicks = 0;
	private msg = "";

	// Scatter/chase schedule in ticks (8fps): 7s scatter, 20s chase, 7s, 20s, 5s, ∞
	private globalMode: GhostMode = "scatter";
	private globalModeTick = 0;
	private readonly modeSchedule = [56, 160, 56, 160, 40, Number.MAX_SAFE_INTEGER];
	private modeIdx = 0;

	private tick = 0;
	private intervalId: ReturnType<typeof setInterval> | null = null;
	private inputKey: Dir | null = null;
	// Buffer for split ESC sequences (SSH sends \x1b and [A in separate chunks)
	private escBuf = "";

	// Death animation
	private deathTick = 0;
	private deathAnimating = false;

	// Differential render — previous rendered lines
	private prevLines: string[] = [];

	constructor(opts: PacmanGameOptions) {
		this.stream = opts.stream;
		this.onExit = opts.onExit;
		this.grid = parseMaze(MAZE_TEMPLATE);
		this.visualGrid = MAZE_TEMPLATE.map(l => Array.from(l));
		this.countDots();
		this.initGhosts();
	}

	private countDots(): void {
		this.dotsTotal = 0;
		for (const row of this.grid)
			for (const c of row)
				if (c === "dot" || c === "pellet") this.dotsTotal++;
	}

	private initGhosts(): void {
		this.ghosts = [
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

	start(): void {
		this.stream.write(hide + clearScreen);
		this.prevLines = [];
		this.renderFull();
		this.intervalId = setInterval(() => this.gameTick(), 125);
	}

	stop(): void {
		if (this.intervalId) { clearInterval(this.intervalId); this.intervalId = null; }
		this.stream.write(show + clearScreen + C.r);
	}

	handleInput(chunk: Buffer): void {
		// Prepend any buffered partial ESC sequence from previous chunk (SSH splits \x1b and [A)
		const data = this.escBuf + chunk.toString("utf8");
		this.escBuf = "";
		let i = 0;
		while (i < data.length) {
			const ch = data[i]!;
			if (ch === "q" || ch === "Q" || ch === "\x03") { this.stop(); this.onExit(); return; }
			if (ch === "\x1b") {
				// Need at least 2 more chars for CSI arrow sequence
				if (i + 2 >= data.length) {
					this.escBuf = data.slice(i);
					break;
				}
				if (data[i + 1] === "[") {
					const code = data[i + 2];
					if (code === "A") this.inputKey = 3;
					else if (code === "B") this.inputKey = 1;
					else if (code === "C") this.inputKey = 0;
					else if (code === "D") this.inputKey = 2;
					i += 3; continue;
				}
				i++; continue;
			}
			if (ch === "w" || ch === "W") this.inputKey = 3;
			else if (ch === "s" || ch === "S") this.inputKey = 1;
			else if (ch === "a" || ch === "A") this.inputKey = 2;
			else if (ch === "d" || ch === "D") this.inputKey = 0;
			i++;
		}
	}

	// ── Game loop ─────────────────────────────────────────────────────────────

	private gameTick(): void {
		if (this.gameOver || this.won) {
			this.msgTicks++;
			if (this.msgTicks > 32) { this.stop(); this.onExit(); }
			else this.renderDiff();
			return;
		}

		if (this.deathAnimating) {
			this.deathTick++;
			if (this.deathTick > 16) {
				this.deathAnimating = false;
				this.deathTick = 0;
				if (this.lives <= 0) {
					this.gameOver = true; this.msg = "GAME  OVER"; this.msgTicks = 0;
				} else {
					this.respawn();
				}
			}
			this.renderDiff();
			return;
		}

		this.tick++;

		// Queue direction
		if (this.inputKey !== null) {
			this.pacNextDir = this.inputKey;
			this.inputKey = null;
		}

		// Global scatter/chase schedule
		if (this.globalMode !== "fright") {
			this.globalModeTick++;
			if (this.globalModeTick >= this.modeSchedule[this.modeIdx]!) {
				this.globalModeTick = 0;
				this.modeIdx = Math.min(this.modeIdx + 1, this.modeSchedule.length - 1);
				this.globalMode = this.modeIdx % 2 === 0 ? "scatter" : "chase";
				// Sync all active ghosts to new global mode + force reverse (original behavior)
				for (const g of this.ghosts) {
					if (!g.inHouse && g.mode !== "fright" && g.mode !== "eaten") {
						g.mode = this.globalMode;
						g.dir = (OPP[g.dir] ?? g.dir) as Dir;
					}
				}
			}
		}

		// Snapshot ghost positions before move (for cross-collision detection)
		const prevGhostPos = this.ghosts.map(g => ({ r: g.r, c: g.c }));
		const prevPacR = this.pacR, prevPacC = this.pacC;

		this.movePacman();
		this.pacMouthOpen = !this.pacMouthOpen;

		for (const g of this.ghosts) this.moveGhost(g);

		this.checkCollisions(prevGhostPos, prevPacR, prevPacC);
		this.renderDiff();
	}

	// ── Walkability ───────────────────────────────────────────────────────────

	private isWalkable(r: number, c: number, ghost = false): boolean {
		if (r < 0 || r >= ROWS) return false;
		// Horizontal tunnel wrap handled elsewhere
		const cc = ((c % COLS) + COLS) % COLS;
		const cell = this.grid[r]?.[cc];
		if (cell === "wall") return false;
		if (!ghost && cell === "ghost-house") return false;
		return cell !== undefined;
	}

	// ── Pacman movement ───────────────────────────────────────────────────────

	private movePacman(): void {
		// Try queued dir
		const qr = this.pacR + DR[this.pacNextDir];
		const qc = ((this.pacC + DC[this.pacNextDir]) % COLS + COLS) % COLS;
		if (this.isWalkable(qr, qc)) this.pacDir = this.pacNextDir;

		const mr = this.pacR + DR[this.pacDir];
		const mc = ((this.pacC + DC[this.pacDir]) % COLS + COLS) % COLS;
		if (this.isWalkable(mr, mc)) { this.pacR = mr; this.pacC = mc; }

		const cell = this.grid[this.pacR]?.[this.pacC];
		if (cell === "dot") {
			this.grid[this.pacR]![this.pacC] = "empty";
			this.score += 10; this.dotsEaten++;
		} else if (cell === "pellet") {
			this.grid[this.pacR]![this.pacC] = "empty";
			this.score += 50; this.dotsEaten++;
			this.activateFright();
		}

		if (this.dotsEaten >= this.dotsTotal) {
			this.won = true; this.msg = " YOU  WIN!"; this.msgTicks = 0;
		}
	}

	// ── Ghost: fright ─────────────────────────────────────────────────────────

	private activateFright(): void {
		for (const g of this.ghosts) {
			if (g.mode !== "eaten") {
				g.mode = "fright";
				g.frightTicks = this.frightDuration;
				g.movePeriod = 2; // half speed during fright (arcade accurate)
				if (!g.inHouse) g.dir = (OPP[g.dir] ?? g.dir) as Dir;
			}
		}
		// Do not interrupt global mode schedule tick during fright
	}

	// ── Ghost: target tile (original Pac-Man logic) ───────────────────────────

	private ghostTarget(g: Ghost): [number, number] {
		if (g.mode === "scatter") return [g.scatterR, g.scatterC];

		// Chase targets — faithful to original arcade
		switch (g.name) {
			case "Blinky":
				// Direct chase: target = pacman position
				return [this.pacR, this.pacC];

			case "Pinky": {
				// Target 4 tiles ahead of pacman (with original NES up-bug: up = up-left*4)
				let tr = this.pacR + DR[this.pacDir] * 4;
				let tc = this.pacC + DC[this.pacDir] * 4;
				if (this.pacDir === 3) tc = this.pacC - 4; // NES bug: facing up → also goes left
				return [tr, tc];
			}

			case "Inky": {
				// Pivot: 2 tiles ahead of pacman, then double-vector from Blinky
				const blinky = this.ghosts[0]!;
				let pr = this.pacR + DR[this.pacDir] * 2;
				let pc = this.pacC + DC[this.pacDir] * 2;
				if (this.pacDir === 3) pc = this.pacC - 2; // NES bug mirror
				// Target = pivot + (pivot - blinky)
				return [pr * 2 - blinky.r, pc * 2 - blinky.c];
			}

			case "Clyde": {
				// Chase if dist > 8 tiles (Euclidean), else scatter corner
				const dr = g.r - this.pacR;
				const dc = g.c - this.pacC;
				if (dr * dr + dc * dc > 64) return [this.pacR, this.pacC];
				return [g.scatterR, g.scatterC];
			}

			default:
				return [this.pacR, this.pacC];
		}
	}

	// ── Ghost: movement ───────────────────────────────────────────────────────

	private moveGhost(g: Ghost): void {
		// Per-ghost speed throttle
		g.movePhase = (g.movePhase + 1) % g.movePeriod;
		if (g.movePhase !== 0) return;

		// Fright countdown — applied AFTER collision check via tickFrightCountdown()
		// (moving it here would let mode flip to chase before collision is tested)

		// In-house: bounce and navigate to exit
		if (g.inHouse) {
			if (this.dotsEaten < g.dotThreshold) {
				// Bounce vertically inside house
				const nextR = g.r + DR[g.dir];
				if (nextR < 15 || nextR > 17) g.dir = (OPP[g.dir] ?? g.dir) as Dir;
				else g.r = nextR;
				return;
			}
			// Navigate to exit: r=14,c=17 (open gap in ghost house top wall)
			const exitR = 14, exitC = 17;
			if (g.r === exitR && g.c === exitC) {
				g.inHouse = false;
				g.mode = this.globalMode;
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
			const homeR = 14, homeC = 17;
			if (g.r === homeR && g.c === homeC) {
				g.inHouse = true;
				g.r = 16; g.c = 17; // reset inside house
				g.mode = this.globalMode;
				g.movePeriod = 1;
				g.dir = 3;
				return;
			}
			// Move one step toward house
			if (g.c !== homeC) g.c += g.c < homeC ? 1 : -1;
			else if (g.r !== homeR) g.r += g.r < homeR ? 1 : -1;
			return;
		}

		// Normal: pick best direction at each tile
		const candidates: Dir[] = ([0, 1, 2, 3] as Dir[]).filter(d => d !== (OPP[g.dir] as Dir));
		const walkable = candidates.filter(d => {
			const nr = g.r + DR[d];
			const nc = ((g.c + DC[d]) % COLS + COLS) % COLS;
			return this.isWalkable(nr, nc, true);
		});

		let chosen: Dir = g.dir;

		if (g.mode === "fright") {
			// Random walkable direction
			if (walkable.length > 0) chosen = walkable[Math.floor(Math.random() * walkable.length)]!;
		} else {
			const [tR, tC] = this.ghostTarget(g);
			let best = Number.MAX_SAFE_INTEGER;
			// Original priority: up > left > down > right when tied
			for (const d of ([3, 2, 1, 0] as Dir[])) {
				if (!walkable.includes(d)) continue;
				const nr = g.r + DR[d];
				const nc = ((g.c + DC[d]) % COLS + COLS) % COLS;
				const dr = nr - tR, dc = nc - tC;
				const dist = dr * dr + dc * dc; // squared Euclidean (same ranking as sqrt)
				if (dist < best) { best = dist; chosen = d; }
			}
		}

		g.dir = chosen;
		const nr = g.r + DR[g.dir];
		const nc = ((g.c + DC[g.dir]) % COLS + COLS) % COLS;
		if (this.isWalkable(nr, nc, true)) { g.r = nr; g.c = nc; }
	}

	// ── Collision ─────────────────────────────────────────────────────────────

	private checkCollisions(
		prevGhostPos: { r: number; c: number }[],
		prevPacR: number,
		prevPacC: number,
	): void {
		for (let i = 0; i < this.ghosts.length; i++) {
			const g = this.ghosts[i]!;
			if (g.inHouse || g.mode === "eaten") continue;

			// Same-cell collision
			const sameTile = g.r === this.pacR && g.c === this.pacC;
			// Cross-collision: pacman and ghost swapped positions this tick
			const prev = prevGhostPos[i]!;
			const crossed = prev.r === this.pacR && prev.c === this.pacC
				&& g.r === prevPacR && g.c === prevPacC;

			if (!sameTile && !crossed) continue;

			if (g.mode === "fright") {
				g.mode = "eaten"; this.score += 200;
			} else {
				this.lives--;
				this.deathAnimating = true; this.deathTick = 0; this.pacAlive = false;
				// Tick fright countdowns before returning
				this.tickFrightCountdowns();
				return;
			}
		}
		this.tickFrightCountdowns();
	}

	private tickFrightCountdowns(): void {
		for (const g of this.ghosts) {
			if (g.mode === "fright") {
				g.frightTicks--;
				if (g.frightTicks <= 0) {
					g.mode = this.globalMode;
					g.movePeriod = 1;
				}
			}
		}
	}

	private respawn(): void {
		this.pacR = 22; this.pacC = 16; this.pacDir = 2; this.pacNextDir = 2;
		this.pacAlive = true; this.pacMouthOpen = true;
		this.initGhosts();
	}

	// ── Render ────────────────────────────────────────────────────────────────

	private buildLines(): string[] {
		const lines: string[] = [];

		// Header
		const sc = String(this.score).padStart(6, " ");
		const hi = String(Math.max(this.score, 24780)).padStart(6, " ");
		lines.push(`${C.white}  1UP   HIGH SCORE${C.r}`);
		lines.push(`  ${C.yellow}${sc}${C.r}   ${C.white}${hi}${C.r}`);

		// Build render grid from visual template
		const rg: string[][] = this.visualGrid.map(row => [...row]);

		// Overlay game cells
		for (let r = 0; r < ROWS; r++) {
			for (let c = 0; c < COLS; c++) {
				const cell = this.grid[r]?.[c];
				const vch = rg[r]?.[c] ?? " ";
				if (WALL_SET.has(vch)) continue;
				if (cell === "dot") rg[r]![c] = "·";
				else if (cell === "pellet") rg[r]![c] = "■";
				else rg[r]![c] = " ";
			}
		}

		// Ghosts
		for (const g of this.ghosts) {
			if (g.r < 0 || g.r >= ROWS || g.c < 0 || g.c >= COLS) continue;
			let sprite: string;
			if (g.mode === "eaten") {
				sprite = `${C.white}ö${C.r}`;
			} else if (g.mode === "fright") {
				const flash = g.frightTicks < 12 && this.tick % 2 === 0;
				sprite = flash ? `${C.white}ᗣ${C.r}` : `${C.blue}ᗣ${C.r}`;
			} else {
				const frame = this.tick % 2 === 0 ? "ᗣ" : "ᗡ";
				sprite = `${g.color}${frame}${C.r}`;
			}
			rg[g.r]![g.c] = sprite;
		}

		// Pacman
		if (this.pacAlive || this.deathAnimating) {
			let sprite: string;
			if (this.deathAnimating) {
				const frames = ["ᗧ","◑","◐","◒","◓","●","○"," "];
				sprite = `${C.yellow}${frames[Math.min(this.deathTick >> 1, frames.length - 1)]}${C.r}`;
			} else {
				const open = (["ᗧ","ᗦ","ᗤ","ᗣ"] as const)[this.pacDir] ?? "ᗧ";
				sprite = `${C.yellow}${this.pacMouthOpen ? open : "◯"}${C.r}`;
			}
			if (this.pacR >= 0 && this.pacR < ROWS && this.pacC >= 0 && this.pacC < COLS)
				rg[this.pacR]![this.pacC] = sprite;
		}

		// Colorize maze rows
		for (let r = 0; r < ROWS; r++) {
			let row = "";
			for (let c = 0; c < COLS; c++) {
				const ch = rg[r]![c]!;
				if (ch.includes("\x1b")) row += ch;
				else if (WALL_SET.has(ch)) row += `${C.blue}${ch}${C.r}`;
				else if (ch === "·") row += `${C.dim}·${C.r}`;
				else if (ch === "■") row += `${C.white}■${C.r}`;
				else row += ch;
			}
			lines.push(row);
		}

		// Footer
		const livesStr = `${C.yellow}ᗧ${C.r} `.repeat(Math.max(0, this.lives));
		lines.push("", `  ${livesStr}  LEVEL ${C.yellow}${this.level}${C.r}`);
		lines.push(`  ${C.dim}WASD/arrows  Q=quit${C.r}`);

		// Message overlay
		if (this.msg) lines[18] = `        ${C.yellow}${C.blink}${this.msg}${C.r}`;

		return lines;
	}

	private renderFull(): void {
		const lines = this.buildLines();
		let out = hide + clearScreen;
		for (let i = 0; i < lines.length; i++) out += cup(i + 1, 1) + (lines[i] ?? "") + eraseEol;
		this.stream.write(out);
		this.prevLines = lines;
	}

	private renderDiff(): void {
		const lines = this.buildLines();
		let out = "";
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i] ?? "";
			if (line !== this.prevLines[i]) {
				out += cup(i + 1, 1) + line + eraseEol;
			}
		}
		// Clear any extra lines from previous render
		for (let i = lines.length; i < this.prevLines.length; i++) {
			out += cup(i + 1, 1) + eraseEol;
		}
		if (out) this.stream.write(out);
		this.prevLines = lines;
	}
}
