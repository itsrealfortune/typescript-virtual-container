import type { ShellModule } from "../types/commands";

/**
 * View and manage swap file usage.
 * @category system
 * @params ["[-s|--stats] [-c|--clear]"]
 */
export const swapCommand: ShellModule = {
	name: "swap",
	description: "View and manage swap file usage",
	category: "system",
	params: ["[-s|--stats] [-c|--clear]"],
	run: ({ shell, args }) => {
		const clearSwap = args.includes("-c") || args.includes("--clear");

		if (!shell.vfs.isSwapEnabled()) {
			return { stderr: "swap: swap is not enabled\n", exitCode: 1 };
		}

		if (clearSwap) {
			shell.vfs.clearSwap();
			return { stdout: "swap: swap files cleared\n", exitCode: 0 };
		}

		const stats = shell.vfs.getSwapStats();
		if (!stats) {
			return { stderr: "swap: unable to retrieve swap stats\n", exitCode: 1 };
		}

		const formatBytes = (bytes: number): string => {
			if (bytes === 0) { return "0 B"; }
			const units = ["B", "KB", "MB", "GB"];
			const i = Math.floor(Math.log(bytes) / Math.log(1024));
			return `${(bytes / 1024 ** i).toFixed(1)} ${units[i]}`;
		};

		const lines = [
			"Swap usage:",
			`  Files swapped out : ${stats.filesSwapped}`,
			`  Swap disk usage   : ${formatBytes(stats.diskUsage)}`,
			`  Original size     : ${formatBytes(stats.originalSize)}`,
			`  Swap-in ops       : ${stats.swapIns}`,
			`  Swap-out ops      : ${stats.swapOuts}`,
		];

		return { stdout: `${lines.join("\n")}\n`, exitCode: 0 };
	},
};
