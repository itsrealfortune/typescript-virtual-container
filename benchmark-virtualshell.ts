#!/usr/bin/env bun
import { VirtualShell } from "./src/index.ts";

// ── Config ────────────────────────────────────────────────────────────────────

const CONCURRENCY_COUNTS = [1, 2, 5, 10, 20, 50, 100];
const LATENCY_ITERATIONS = 500;
const VFS_FILE_COUNT     = 1000;
const VFS_SMALL_BYTES    = 512;
const VFS_LARGE_BYTES    = 10 * 1024 * 1024; // 10 MB
const OPS_PER_SHELL      = 3;

// ── Formatting ────────────────────────────────────────────────────────────────

function mb(bytes: number): string {
	return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function mbRound(bytes: number): string {
	return `${Math.round(bytes / 1024 / 1024)} MB`;
}

function throughput(bytes: number, ms: number): string {
	if (ms === 0) return ">10 GB/s";
	const bps = (bytes / ms) * 1000;
	if (bps >= 1024 * 1024 * 1024) return `${(bps / 1024 / 1024 / 1024).toFixed(1)} GB/s`;
	return `${(bps / 1024 / 1024).toFixed(1)} MB/s`;
}

function lpad(s: string | number, w: number): string {
	return String(s).padStart(w);
}

function rpad(s: string | number, w: number): string {
	return String(s).padEnd(w);
}

function hr(char = "-", len = 76): string {
	return char.repeat(len);
}

function section(title: string, index: number): void {
	console.log(`[${index}] ${title}`);
	console.log(hr());
}

function percentile(sorted: number[], p: number): number {
	const idx = Math.ceil((p / 100) * sorted.length) - 1;
	return sorted[Math.max(0, idx)] ?? 0;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function makeShell(tag: string, i = 0): Promise<VirtualShell> {
	const shell = new VirtualShell(`${tag}-${i}`, undefined, { mode: "memory" });
	await shell.ensureInitialized();
	return shell;
}

function memNow() {
	return process.memoryUsage();
}

// ── Section 1: parallel init ──────────────────────────────────────────────────

interface InitResult {
	count:     number;
	initMs:    number;
	commandMs: number;
	mem:       ReturnType<typeof process.memoryUsage>;
	memFinal:  ReturnType<typeof process.memoryUsage>;
}

async function benchInit(): Promise<InitResult[]> {
	const results: InitResult[] = [];
	for (const count of CONCURRENCY_COUNTS) {
		process.stderr.write(`  [1] parallel init: ${count} shells\n`);
		const t0 = performance.now();
		const shells = await Promise.all(
			Array.from({ length: count }, (_, i) => makeShell(`s1-${count}`, i)),
		);
		const initMs = Math.round(performance.now() - t0);
		const mem    = memNow();

		const t1 = performance.now();
		await Promise.all(shells.map(async (sh, i) => {
			const cwd = "/root";
			await sh.executeCommand(`mkdir -p /tmp/b${i}`, "root", cwd);
			await sh.executeCommand(`echo "bench ${i}" > /tmp/b${i}/r.txt`, "root", cwd);
			await sh.executeCommand(`cat /tmp/b${i}/r.txt`, "root", cwd);
		}));
		const commandMs = Math.round(performance.now() - t1);
		const memFinal  = memNow();

		results.push({ count, initMs, commandMs, mem, memFinal });
	}
	return results;
}

// ── Section 2: command latency percentiles ────────────────────────────────────

interface LatencyRow {
	cmd:  string;
	p50:  number;
	p95:  number;
	p99:  number;
	min:  number;
	max:  number;
}

async function benchLatency(): Promise<LatencyRow[]> {
	const shell = await makeShell("s2-latency");
	const commands = [
		"echo hello",
		"ls /etc",
		"cat /etc/passwd",
		"grep root /etc/passwd",
		"ls -la /",
		"pwd",
		"date",
	];

	const rows: LatencyRow[] = [];
	for (const cmd of commands) {
		process.stderr.write(`  [2] latency: ${cmd} x${LATENCY_ITERATIONS}\n`);
		const samples: number[] = [];
		for (let i = 0; i < LATENCY_ITERATIONS; i++) {
			const t = performance.now();
			await shell.executeCommand(cmd, "root", "/root");
			samples.push(performance.now() - t);
		}
		samples.sort((a, b) => a - b);
		rows.push({
			cmd,
			p50: parseFloat(percentile(samples, 50).toFixed(2)),
			p95: parseFloat(percentile(samples, 95).toFixed(2)),
			p99: parseFloat(percentile(samples, 99).toFixed(2)),
			min: parseFloat(samples[0]!.toFixed(2)),
			max: parseFloat(samples[samples.length - 1]!.toFixed(2)),
		});
	}
	return rows;
}

// ── Section 3: VFS I/O throughput ────────────────────────────────────────────

interface VfsRow {
	label:     string;
	files:     number;
	totalBytes: number;
	ms:        number;
}

async function benchVfs(): Promise<VfsRow[]> {
	const shell = await makeShell("s3-vfs");
	const vfs   = shell.vfs;
	const rows: VfsRow[] = [];

	// Write small files
	process.stderr.write(`  [3] VFS write ${VFS_FILE_COUNT} x ${VFS_SMALL_BYTES}B files\n`);
	const smallContent = "x".repeat(VFS_SMALL_BYTES);
	vfs.mkdir("/bench", 0o755);
	const t0 = performance.now();
	for (let i = 0; i < VFS_FILE_COUNT; i++) {
		vfs.writeFile(`/bench/s${i}.txt`, smallContent);
	}
	rows.push({ label: "write small files", files: VFS_FILE_COUNT, totalBytes: VFS_FILE_COUNT * VFS_SMALL_BYTES, ms: Math.round(performance.now() - t0) });

	// Read small files
	process.stderr.write(`  [3] VFS read ${VFS_FILE_COUNT} x ${VFS_SMALL_BYTES}B files\n`);
	const t1 = performance.now();
	for (let i = 0; i < VFS_FILE_COUNT; i++) {
		vfs.readFile(`/bench/s${i}.txt`);
	}
	rows.push({ label: "read small files",  files: VFS_FILE_COUNT, totalBytes: VFS_FILE_COUNT * VFS_SMALL_BYTES, ms: Math.round(performance.now() - t1) });

	// Write one large file
	process.stderr.write(`  [3] VFS write 1 x ${VFS_LARGE_BYTES / 1024 / 1024}MB file\n`);
	const largeContent = "y".repeat(VFS_LARGE_BYTES);
	const t2 = performance.now();
	vfs.writeFile("/bench/large.bin", largeContent);
	rows.push({ label: "write large file",  files: 1, totalBytes: VFS_LARGE_BYTES, ms: Math.round(performance.now() - t2) });

	// Read one large file
	process.stderr.write(`  [3] VFS read 1 x ${VFS_LARGE_BYTES / 1024 / 1024}MB file\n`);
	const t3 = performance.now();
	vfs.readFile("/bench/large.bin");
	rows.push({ label: "read large file",   files: 1, totalBytes: VFS_LARGE_BYTES, ms: Math.round(performance.now() - t3) });

	return rows;
}

// ── Section 4: memory breakdown ───────────────────────────────────────────────

interface MemRow {
	count:       number;
	heapUsed:    number;
	heapTotal:   number;
	external:    number;
	arrayBufs:   number;
	rss:         number;
}

async function benchMemory(): Promise<MemRow[]> {
	const rows: MemRow[] = [];
	for (const count of CONCURRENCY_COUNTS) {
		process.stderr.write(`  [4] memory profile: ${count} shells\n`);
		await Promise.all(Array.from({ length: count }, (_, i) => makeShell(`s4-${count}`, i)));
		const m = memNow();
		rows.push({
			count,
			heapUsed:  m.heapUsed,
			heapTotal: m.heapTotal,
			external:  m.external,
			arrayBufs: m.arrayBuffers,
			rss:       m.rss,
		});
	}
	return rows;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
	const cpu0    = process.cpuUsage();
	const wallT0  = performance.now();

	process.stderr.write("Running benchmark...\n");

	const [initResults, latencyRows, vfsRows, memRows] = await Promise.all([
		benchInit(),
		benchLatency(),
		benchVfs(),
		benchMemory(),
	]);

	const cpuDelta = process.cpuUsage(cpu0);
	const wallMs   = Math.round(performance.now() - wallT0);

	// ── Header ────────────────────────────────────────────────────────────────
	console.log("VirtualShell Benchmark");
	console.log(hr("=", 22));
	console.log(`Date      : ${new Date().toISOString()}`);
	console.log(`Runtime   : Bun ${process.versions.bun ?? "unknown"}`);
	console.log(`Wall time : ${wallMs} ms`);
	console.log(`CPU user  : ${Math.round(cpuDelta.user / 1000)} ms`);
	console.log(`CPU sys   : ${Math.round(cpuDelta.system / 1000)} ms`);
	console.log("");

	// ── [1] Parallel init ─────────────────────────────────────────────────────
	section("Parallel shell initialization", 1);
	console.log(
		rpad("Shells", 8) +
		lpad("Init (ms)", 10) + lpad("ms/shell", 10) +
		lpad("Cmd (ms)", 10)  + lpad("Ops/sec", 9) +
		lpad("RSS", 10),
	);
	console.log(hr());
	for (const r of initResults) {
		const perShell = (r.initMs / r.count).toFixed(1);
		const opsTotal = r.count * OPS_PER_SHELL;
		const opsPerSec = r.commandMs > 0
			? Math.round(opsTotal / (r.commandMs / 1000))
			: 999999;
		console.log(
			lpad(r.count, 6)      + "  " +
			lpad(r.initMs, 9)     + " " +
			lpad(perShell, 9)     + " " +
			lpad(r.commandMs, 9)  + " " +
			lpad(opsPerSec, 8)    + " " +
			lpad(mbRound(r.memFinal.rss), 9),
		);
	}
	console.log("");

	// ── [2] Command latency ───────────────────────────────────────────────────
	section(`Command latency  (N=${LATENCY_ITERATIONS} iterations, single shell, ms)`, 2);
	console.log(
		rpad("Command", 30) +
		lpad("min", 7) + lpad("p50", 7) + lpad("p95", 7) + lpad("p99", 7) + lpad("max", 7),
	);
	console.log(hr());
	for (const r of latencyRows) {
		console.log(
			rpad(r.cmd, 30) +
			lpad(r.min, 7) + lpad(r.p50, 7) + lpad(r.p95, 7) + lpad(r.p99, 7) + lpad(r.max, 7),
		);
	}
	console.log("");

	// ── [3] VFS I/O throughput ────────────────────────────────────────────────
	section("VFS I/O throughput  (direct, no command parsing)", 3);
	console.log(
		rpad("Operation", 22) +
		lpad("Files", 7) + lpad("Total", 10) + lpad("Time (ms)", 11) + lpad("Throughput", 12),
	);
	console.log(hr());
	for (const r of vfsRows) {
		console.log(
			rpad(r.label, 22) +
			lpad(r.files, 7)               + " " +
			lpad(mb(r.totalBytes), 9)      + " " +
			lpad(r.ms, 10)                 + " " +
			lpad(throughput(r.totalBytes, r.ms), 11),
		);
	}
	console.log("");

	// ── [4] Memory breakdown ──────────────────────────────────────────────────
	section("Memory breakdown per shell count", 4);
	console.log(
		rpad("Shells", 8) +
		lpad("Heap used", 11) + lpad("Heap total", 12) +
		lpad("External", 10)  + lpad("ArrayBufs", 11) + lpad("RSS", 10),
	);
	console.log(hr());
	for (const r of memRows) {
		console.log(
			lpad(r.count, 6)               + "  " +
			lpad(mb(r.heapUsed), 10)       + " " +
			lpad(mb(r.heapTotal), 11)      + " " +
			lpad(mb(r.external), 9)        + " " +
			lpad(mb(r.arrayBufs), 10)      + " " +
			lpad(mbRound(r.rss), 9),
		);
	}
	console.log("");
}

main().catch((err: unknown) => {
	console.error(err);
	process.exit(1);
});
