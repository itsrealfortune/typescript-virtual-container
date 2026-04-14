import type { ShellModule } from "../../types/commands";
import { joinListWithType, resolvePath } from "./helpers";

function formatPermissions(mode: number, isDirectory: boolean): string {
	const fileType = isDirectory ? "d" : "-";
	const permissionBits = [
		[0o400, "r"],
		[0o200, "w"],
		[0o100, "x"],
		[0o040, "r"],
		[0o020, "w"],
		[0o010, "x"],
		[0o004, "r"],
		[0o002, "w"],
		[0o001, "x"],
	] as const;
	const permissions = permissionBits
		.map(([bit, symbol]) => (mode & bit ? symbol : "-"))
		.join("");

	return `${fileType}${permissions}`;
}

function formatDate(date: Date): string {
	return date.toISOString().replace("T", " ").slice(0, 16);
}

export const lsCommand: ShellModule = {
	name: "ls",
	params: ["[path]"],
	run: ({ vfs, cwd, args }) => {
		const longFormat = args.includes("-l") || args.includes("--long");
		const targetArg = args.find((arg) => !arg.startsWith("-"));
		const target = resolvePath(cwd, targetArg ?? cwd);
		const items = vfs.list(target).filter((name) => !name.startsWith("."));
		const rendered = longFormat
			? items
					.map((name) => {
						const childPath = resolvePath(target, name);
						const stat = vfs.stat(childPath);
						const size = stat.type === "file" ? stat.size : stat.childrenCount;
						return `${formatPermissions(stat.mode, stat.type === "directory")} 1 ${size} ${formatDate(stat.updatedAt)} ${name}${stat.type === "directory" ? "/" : ""}`;
					})
					.join("\n")
			: joinListWithType(target, items, (p) => vfs.stat(p));
		return { stdout: rendered, exitCode: 0 };
	},
};
