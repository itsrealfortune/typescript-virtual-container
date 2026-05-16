import type { ShellModule } from "../types/commands";
import { getArg, ifFlag } from "./command-helpers";
import { assertPathAccess, resolvePath } from "./helpers";

// ─── ANSI color codes (matches GNU ls --color=auto / LS_COLORS defaults) ────

const RESET  = "\x1b[0m";

// Entry-type colors
const C_DIR     = "\x1b[1;34m";   // bold blue         — directory
const C_LINK    = "\x1b[1;36m";   // bold cyan         — symlink
const C_EXEC    = "\x1b[1;32m";   // bold green        — executable file
const C_NORMAL  = "";              // no color          — regular file

// Special-mode backgrounds (GNU ls corner cases)
const C_STICKY_WX = "\x1b[30;42m"; // black on green — dir sticky + world-writable (/tmp)
const C_STICKY    = "\x1b[37;44m"; // white on blue  — dir sticky, NOT world-writable
const C_OTHER_WX  = "\x1b[34;42m"; // blue on green  — dir world-writable, not sticky

// ─── helpers ────────────────────────────────────────────────────────────────

function colorize(name: string, color: string): string {
	return color ? `${color}${name}${RESET}` : name;
}

function entryColor(mode: number, type: "file" | "directory", isLink: boolean): string {
	if (isLink) return C_LINK;
	if (type === "directory") {
		const sticky  = !!(mode & 0o1000);
		const worldW  = !!(mode & 0o002);
		if (sticky && worldW) return C_STICKY_WX;
		if (sticky)           return C_STICKY;
		if (worldW)           return C_OTHER_WX;
		return C_DIR;
	}
	if (mode & 0o111) return C_EXEC;
	return C_NORMAL;
}

// ─── permissions string ──────────────────────────────────────────────────────

function formatPermissions(mode: number, type: "file" | "directory", isLink: boolean): string {
	let ft: string;
	if (isLink)                    ft = "l";
	else if (type === "directory") ft = "d";
	else                           ft = "-";

	const r = (bit: number) => (mode & bit ? "r" : "-");
	const w = (bit: number) => (mode & bit ? "w" : "-");

	const xOwner = (() => {
		const exec = !!(mode & 0o100);
		if (mode & 0o4000) return exec ? "s" : "S";
		return exec ? "x" : "-";
	})();
	const xGroup = (() => {
		const exec = !!(mode & 0o010);
		if (mode & 0o2000) return exec ? "s" : "S";
		return exec ? "x" : "-";
	})();
	const xOther = (() => {
		const exec = !!(mode & 0o001);
		if (type === "directory" && (mode & 0o1000)) return exec ? "t" : "T";
		return exec ? "x" : "-";
	})();

	return `${ft}${r(0o400)}${w(0o200)}${xOwner}${r(0o040)}${w(0o020)}${xGroup}${r(0o004)}${w(0o002)}${xOther}`;
}

// ─── date formatting (GNU ls + French locale) ────────────────────────────────

const MONTHS_EN = [
	"Jan", "Feb", "Mar", "Apr", "May", "Jun",
	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDate(date: Date): string {
	const now    = new Date();
	const sixMo  = 6 * 30 * 24 * 3600 * 1000;
	const recent = Math.abs(now.getTime() - date.getTime()) < sixMo;
	const day    = String(date.getDate()).padStart(2, " ");
	const month  = MONTHS_EN[date.getMonth()] ?? "";
	if (recent) {
		const hh = String(date.getHours()).padStart(2, "0");
		const mm = String(date.getMinutes()).padStart(2, "0");
		return `${day} ${month.padEnd(3)} ${hh}:${mm}`;
	}
	return `${day} ${month.padEnd(3)} ${date.getFullYear()}`;
}

// ─── symlink target ──────────────────────────────────────────────────────────

function readlinkTarget(vfs: { readFile: (p: string) => string }, path: string): string {
	try { return vfs.readFile(path); } catch { return "?"; }
}

// ─── short listing ───────────────────────────────────────────────────────────

function shortListing(
	vfs: {
		stat:      (p: string) => { mode: number; type: "file" | "directory" };
		isSymlink: (p: string) => boolean;
	},
	dir: string,
	items: string[],
): string {
	const base = dir === "/" ? "" : dir;
	return items.map((name) => {
		const childPath = `${base}/${name}`;
		const isLink    = vfs.isSymlink(childPath);
		let stat: { mode: number; type: "file" | "directory" };
		try { stat = vfs.stat(childPath); } catch { return name; }
		const color  = entryColor(stat.mode, stat.type, isLink);
		return colorize(name, color);
	}).join("  ");
}

// ─── long listing ────────────────────────────────────────────────────────────

type VfsStat = {
	mode:          number;
	type:          "file" | "directory";
	updatedAt:     Date;
	size?:         number;
	childrenCount?: number;
	uid?:          number;
	gid?:          number;
};

function longListing(
	vfs: {
		stat:      (p: string) => VfsStat;
		isSymlink: (p: string) => boolean;
		readFile:  (p: string) => string;
	},
	dir: string,
	items: string[],
): string {
	const base = dir === "/" ? "" : dir;

	type Row = { perms: string; nlink: string; size: string; date: string; label: string };

	const rows: Row[] = items.map((name) => {
		const childPath = `${base}/${name}`;
		const isLink    = vfs.isSymlink(childPath);
		let stat: VfsStat;
		try { stat = vfs.stat(childPath); } catch {
			return {
				perms: "----------", nlink: "1", size: "0",
				date: formatDate(new Date()), label: name,
			};
		}

		const mode  = isLink ? 0o120777 : stat.mode;
		const perms = formatPermissions(mode, stat.type, isLink);

		// nlink: dirs = children + 2 (. and ..), files/links = 1
		const nlink = stat.type === "directory"
			? String((stat.childrenCount ?? 0) + 2)
			: "1";

		// size: links → target path length, files → bytes, dirs → children×4096
		const rawSize = isLink
			? readlinkTarget(vfs, childPath).length
			: stat.type === "file"
				? (stat.size ?? 0)
				: (stat.childrenCount ?? 0) * 4096;
		const size = String(rawSize);

		const date  = formatDate(stat.updatedAt);
		const color = entryColor(mode, stat.type, isLink);

		const label = isLink
			? `${colorize(name, color)} -> ${readlinkTarget(vfs, childPath)}`
			: colorize(name, color);

		return { perms, nlink, size, date, label };
	});

	const wNlink = Math.max(...rows.map((r) => r.nlink.length));
	const wSize  = Math.max(...rows.map((r) => r.size.length));

	const total  = items.length * 8;
	const lines  = rows.map((r, i) => {
		const st = (() => { try { return vfs.stat(`${base}/${items[i]}`); } catch { return null; } })();
		const uidStr = st && "uid" in st ? String((st as { uid: number }).uid) : "0";
		const gidStr = st && "gid" in st ? String((st as { gid: number }).gid) : "0";
		return `${r.perms} ${r.nlink.padStart(wNlink)} ${uidStr} ${gidStr} ${r.size.padStart(wSize)} ${r.date} ${r.label}`;
	});

	return `total ${total}\n${lines.join("\n")}`;
}

// ─── command ─────────────────────────────────────────────────────────────────

export const lsCommand: ShellModule = {
	name: "ls",
	description: "List directory contents",
	category: "navigation",
	params: ["[-la] [path]"],
	run: ({ authUser, shell, cwd, args }) => {
		const longFormat = ifFlag(args, ["-l", "--long", "-la", "-al"]);
		const showHidden = ifFlag(args, ["-a", "--all",  "-la", "-al"]);

		const targetArg = getArg(args, 0, {
			flags: ["-l", "--long", "-a", "--all", "-la", "-al"],
		});
		const target = resolvePath(cwd, targetArg ?? cwd);
		assertPathAccess(authUser, target, "ls");

		// Single file or symlink
		if (shell.vfs.exists(target)) {
			const st     = shell.vfs.stat(target);
			const isLink = shell.vfs.isSymlink(target);
			if (st.type === "file" || isLink) {
				const name  = target.split("/").pop() ?? target;
				const color = entryColor(isLink ? 0o120777 : st.mode, st.type, isLink);
				if (longFormat) {
					const mode  = isLink ? 0o120777 : st.mode;
					const size  = isLink
						? readlinkTarget(shell.vfs, target).length
						: (st as { size?: number }).size ?? 0;
					const perms = formatPermissions(mode, st.type, isLink);
					const label = isLink
						? `${colorize(name, color)} -> ${readlinkTarget(shell.vfs, target)}`
						: colorize(name, color);
					const uidStr = "uid" in st ? String((st as { uid: number }).uid) : "0";
					const gidStr = "gid" in st ? String((st as { gid: number }).gid) : "0";
					return {
						stdout: `${perms} 1 ${uidStr} ${gidStr} ${size} ${formatDate(st.updatedAt)} ${label}\n`,
						exitCode: 0,
					};
				}
				return { stdout: `${colorize(name, color)}\n`, exitCode: 0 };
			}
		}

		const items = shell.vfs
			.list(target)
			.filter((name) => showHidden || !name.startsWith("."));

		const rendered = longFormat
			? longListing(shell.vfs, target, items)
			: shortListing(shell.vfs, target, items);

		return { stdout: `${rendered}\n`, exitCode: 0 };
	},
};