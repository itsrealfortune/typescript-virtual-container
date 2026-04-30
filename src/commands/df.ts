import type { ShellModule } from "../types/commands";

export const dfCommand: ShellModule = {
	name: "df",
	description: "Report filesystem disk space usage",
	category: "system",
	params: ["[-h]"],
	run: ({ shell }) => {
		const bytes = shell.vfs.getUsageBytes();
		const used = (bytes / 1024).toFixed(0);
		const total = "1048576"; // 1GB virtual
		const avail = String(Number(total) - Number(used));
		const pct = Math.round((Number(used) / Number(total)) * 100);
		const hdr = "Filesystem     1K-blocks    Used Available Use% Mounted on";
		const row = `virtual-fs     ${total.padStart(9)} ${used.padStart(7)} ${avail.padStart(9)} ${pct}% /`;
		return { stdout: `${hdr}\n${row}`, exitCode: 0 };
	},
};
