import * as os from "node:os";
import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

/**
 * Display memory usage information (human / MB / GB options).
 * @category system
 * @params ["[-h] [-m] [-g]"]
 */
export const freeCommand: ShellModule = {
	name: "free",
	description: "Display amount of free and used memory",
	category: "system",
	params: ["[-h] [-m] [-g]"],
	run: ({ args }) => {
		const human = ifFlag(args, ["-h", "--human"]);
		const mb = ifFlag(args, ["-m"]);
		const gb = ifFlag(args, ["-g"]);

		const osTotalB = os.totalmem();
		const osFreeB = os.freemem();
		const usedB = osTotalB - osFreeB;
		const sharedB = Math.floor(osTotalB * 0.02);
		const buffersB = Math.floor(osTotalB * 0.05);
		const availableB = Math.floor(osFreeB * 0.95);
		const swapB = Math.floor(osTotalB * 0.5);

		const fmt = (bytes: number): string => {
			if (human) {
				if (bytes >= 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)}G`;
				if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)}M`;
				return `${(bytes / 1024).toFixed(1)}K`;
			}
			if (gb) return String(Math.floor(bytes / (1024 * 1024 * 1024)));
			if (mb) return String(Math.floor(bytes / (1024 * 1024)));
			return String(Math.floor(bytes / 1024));
		};

		const header = `               total        used        free      shared  buff/cache   available`;
		const memRow = `Mem:  ${fmt(osTotalB).padStart(12)} ${fmt(usedB).padStart(11)} ${fmt(osFreeB).padStart(11)} ${fmt(sharedB).padStart(11)} ${fmt(buffersB).padStart(11)} ${fmt(availableB).padStart(11)}`;
		const swapRow = `Swap: ${fmt(swapB).padStart(12)} ${fmt(0).padStart(11)} ${fmt(swapB).padStart(11)}`;

		return { stdout: [header, memRow, swapRow].join("\n"), exitCode: 0 };
	},
};
