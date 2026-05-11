#!/usr/bin/env bun
import { VirtualShell } from "./src/index.ts";

const counts = [1, 2, 5, 10, 20, 50, 100];

function bytesToMb(bytes: number): string {
	return `${Math.round(bytes / 1024 / 1024)} MB`;
}

async function createShell(baseName: string, index: number): Promise<VirtualShell> {
	const shell = new VirtualShell(`${baseName}-${index}`, undefined, {
		mode: "memory",
	});
	await shell.ensureInitialized();
	return shell;
}

async function runSingleBenchmark(count: number) {
	const label = `shells-${count}`;
	const start = Date.now();
	const shells: VirtualShell[] = await Promise.all(
		Array.from({ length: count }, (_, index) => createShell(label, index)),
	);
	const initMs = Date.now() - start;
	const initRss = process.memoryUsage().rss;

	const commandStart = Date.now();
	await Promise.all(
		shells.map(async (shell, index) => {
			const cwd = "/home/root";
			shell.executeCommand(`mkdir -p /tmp/benchmark-${index}`, "root", cwd);
			shell.executeCommand(
				`echo "hello ${index}" > /tmp/benchmark-${index}/result.txt`,
				"root",
				cwd,
			);
			shell.executeCommand(
				`cat /tmp/benchmark-${index}/result.txt`,
				"root",
				cwd,
			);
		}),
	);
	const commandMs = Date.now() - commandStart;
	const finalRss = process.memoryUsage().rss;

	return {
		count,
		initMs,
		commandMs,
		initRss,
		finalRss,
		deltaRss: finalRss - initRss,
	};
}

async function main() {

	console.log("Benchmarking VirtualShell concurrency:\n");
	const results = [];
	for (const count of counts) {
		console.log(`Running ${count} shells...`);
		const result = await runSingleBenchmark(count);
		results.push(result);
		console.log(
			`  Initialized ${count} shells in ${result.initMs}ms, RSS ${bytesToMb(result.initRss)}`,
		);
		console.log(
			`  Executed shell commands in ${result.commandMs}ms, RSS now ${bytesToMb(result.finalRss)} (+${bytesToMb(result.deltaRss)})`,
		);
		console.log("");
	}

	console.log("Summary:\n");
	console.log(
		"count\tinit_ms\tcmd_ms\tinit_rss\tfinal_rss\tdelta_rss",
	);
	for (const row of results) {
		console.log(
			`${row.count}\t${row.initMs}\t${row.commandMs}\t${bytesToMb(row.initRss)}\t${bytesToMb(row.finalRss)}\t${bytesToMb(row.deltaRss)}`,
		);
	}
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
