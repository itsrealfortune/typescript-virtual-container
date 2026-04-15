import { existsSync, readdirSync, readFileSync } from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import type { ShellProperties } from "../VirtualShell";

function formatUptime(seconds: number): string {
	const totalMinutes = Math.max(1, Math.floor(seconds / 60));
	const days = Math.floor(totalMinutes / (24 * 60));
	const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
	const minutes = totalMinutes % 60;

	const parts: string[] = [];
	if (days > 0) {
		parts.push(`${days} day${days > 1 ? "s" : ""}`);
	}
	if (hours > 0) {
		parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
	}
	if (minutes > 0 || parts.length === 0) {
		parts.push(`${minutes} min${minutes > 1 ? "s" : ""}`);
	}

	return parts.join(", ");
}

function colorBlock(code: number): string {
	return `\u001b[${code}m   \u001b[0m`;
}

function buildColorBars(): string[] {
	const normal = [40, 41, 42, 43, 44, 45, 46, 47].map(colorBlock).join("");
	const bright = [100, 101, 102, 103, 104, 105, 106, 107]
		.map(colorBlock)
		.join("");
	return [normal, bright];
}

function colorizeLogoLine(line: string, index: number, total: number): string {
	if (line.trim().length === 0) {
		return line;
	}

	const start = { r: 255, g: 255, b: 255 };
	const end = { r: 168, g: 85, b: 247 };
	const ratio = total <= 1 ? 0 : index / (total - 1);

	const r = Math.round(start.r + (end.r - start.r) * ratio);
	const g = Math.round(start.g + (end.g - start.g) * ratio);
	const b = Math.round(start.b + (end.b - start.b) * ratio);

	return `\u001b[38;2;${r};${g};${b}m${line}\u001b[0m`;
}

function colorizeDetailLine(line: string): string {
	if (line.trim().length === 0) {
		return line;
	}

	const colonIndex = line.indexOf(":");

	if (colonIndex === -1) {
		// Pas de ':', chercher '@' pour identifier user@host
		if (line.includes("@")) {
			// C'est user@host, appliquer dégradé horizontal
			return applyHorizontalGradient(line);
		}
		// Sinon c'est un separator ou autre, laisser tel quel
		return line;
	}

	// Il y a un ':', c'est titre: valeur
	const title = line.substring(0, colonIndex + 1);
	const value = line.substring(colonIndex + 1);

	// Appliquer le dégradé seulement au titre
	const colorized = applyHorizontalGradient(title);
	return colorized + value;
}

function applyHorizontalGradient(text: string): string {
	// Nettoyer les codes ANSI existants
	const ansiRegex = new RegExp(`${String.fromCharCode(27)}\\[[\\d;]*m`, "g");
	const cleaned = text.replace(ansiRegex, "");

	if (cleaned.trim().length === 0) {
		return text;
	}

	const start = { r: 255, g: 255, b: 255 };
	const end = { r: 168, g: 85, b: 247 };
	let result = "";

	for (let i = 0; i < cleaned.length; i += 1) {
		const ratio = cleaned.length <= 1 ? 0 : i / (cleaned.length - 1);

		const r = Math.round(start.r + (end.r - start.r) * ratio);
		const g = Math.round(start.g + (end.g - start.g) * ratio);
		const b = Math.round(start.b + (end.b - start.b) * ratio);

		result += `\u001b[38;2;${r};${g};${b}m${cleaned[i]}\u001b[0m`;
	}

	return result;
}

export interface NeofetchInfo {
	user: string;
	host: string;
	osName?: string;
	kernel?: string;
	uptimeSeconds?: number;
	packages?: string;
	shell?: string;
	shellProps?: ShellProperties;
	resolution?: string;
	terminal?: string;
	cpu?: string;
	gpu?: string;
	memoryUsedMiB?: number;
	memoryTotalMiB?: number;
}

function toMiB(bytes: number): number {
	return Math.max(0, Math.round(bytes / (1024 * 1024)));
}

function readOsPrettyName(): string | undefined {
	try {
		const data = readFileSync("/etc/os-release", "utf8");
		for (const line of data.split("\n")) {
			if (!line.startsWith("PRETTY_NAME=")) {
				continue;
			}

			const value = line.slice("PRETTY_NAME=".length).trim();
			return value.replace(/^"|"$/g, "");
		}
	} catch {
		return undefined;
	}

	return undefined;
}

function readFirstLine(filePath: string): string | undefined {
	try {
		const data = readFileSync(filePath, "utf8").split("\n")[0]?.trim();
		if (!data || data.length === 0) {
			return undefined;
		}
		return data;
	} catch {
		return undefined;
	}
}

function resolveHostLabel(fallback: string): string {
	const vendor = readFirstLine("/sys/devices/virtual/dmi/id/sys_vendor");
	const product = readFirstLine("/sys/devices/virtual/dmi/id/product_name");

	if (vendor && product) {
		return `${vendor} ${product}`;
	}
	if (product) {
		return product;
	}

	return fallback;
}

function countDpkgPackages(): number | undefined {
	const candidates = ["/var/lib/dpkg/status", "/usr/local/var/lib/dpkg/status"];

	for (const filePath of candidates) {
		if (!existsSync(filePath)) {
			continue;
		}

		try {
			const data = readFileSync(filePath, "utf8");
			const matches = data.match(/^Package:\s+/gm);
			return matches?.length ?? 0;
		} catch {}
	}

	return undefined;
}

function countSnapPackages(): number | undefined {
	const candidates = ["/snap", "/var/lib/snapd/snaps"];

	for (const dirPath of candidates) {
		if (!existsSync(dirPath)) {
			continue;
		}

		try {
			const entries = readdirSync(dirPath, { withFileTypes: true });
			const count = entries.filter((entry) => entry.isDirectory()).length;
			return count;
		} catch {}
	}

	return undefined;
}

function resolvePackagesLabel(): string {
	const dpkgCount = countDpkgPackages();
	const snapCount = countSnapPackages();

	if (dpkgCount !== undefined && snapCount !== undefined) {
		return `${dpkgCount} (dpkg), ${snapCount} (snap)`;
	}
	if (dpkgCount !== undefined) {
		return `${dpkgCount} (dpkg)`;
	}
	if (snapCount !== undefined) {
		return `${snapCount} (snap)`;
	}

	return "n/a";
}

function resolveCpuLabel(): string {
	const cpus = os.cpus();
	if (cpus.length === 0) {
		return "unknown";
	}

	const first = cpus[0];
	if (!first) {
		return "unknown";
	}

	const ghz = (first.speed / 1000).toFixed(2);
	return `${first.model} (${cpus.length}) @ ${ghz}GHz`;
}

function resolveShellLabel(shell?: string): string {
	if (!shell || shell.trim().length === 0) {
		return "unknown";
	}

	return path.posix.basename(shell.trim());
}

function resolveDefaults(info: NeofetchInfo): Required<NeofetchInfo> {
	const totalMem = os.totalmem();
	const freeMem = os.freemem();
	const usedMem = Math.max(0, totalMem - freeMem);
	const shellProps = info.shellProps;

	const processUptime = process.uptime();
	if (info.uptimeSeconds === undefined) {
		info.uptimeSeconds = Math.round(processUptime);
	}

	console.log("Resolving neofetch info with shellProps:", shellProps);

	return {
		user: info.user,
		host: info.host,
		osName:
			shellProps?.os ??
			info.osName ??
			`${readOsPrettyName() ?? os.type()} ${os.arch()}`,
		kernel: shellProps?.kernel ?? info.kernel ?? os.release(),
		uptimeSeconds: info.uptimeSeconds ?? os.uptime(),
		packages: info.packages ?? resolvePackagesLabel(),
		shell: resolveShellLabel(info.shell),
		shellProps: (info.shellProps as ShellProperties) ?? {
			kernel: info.kernel ?? os.release(),
			os: info.osName ?? `${readOsPrettyName() ?? os.type()} ${os.arch()}`,
			arch: os.arch(),
		},
		resolution: info.resolution ?? "n/a (ssh)",
		terminal: info.terminal ?? "unknown",
		cpu: info.cpu ?? resolveCpuLabel(),
		gpu: info.gpu ?? "n/a",
		memoryUsedMiB: info.memoryUsedMiB ?? toMiB(usedMem),
		memoryTotalMiB: info.memoryTotalMiB ?? toMiB(totalMem),
	};
}

export function buildNeofetchOutput(info: NeofetchInfo): string {
	const fields = resolveDefaults(info);
	const uptime = formatUptime(fields.uptimeSeconds);
	const colorBars = buildColorBars();

	const distroLogo = [
		"                               .. .:.    ",
		" .::..                       ..     ..   ",
		".    ....                  ...       ..  ",
		":       ....             .:.          .. ",
		":           .:.:........:.            .. ",
		":                                     .. ",
		".                                      : ",
		".                                      : ",
		"..                                     : ",
		" :.                                   .. ",
		" ..                                   .. ",
		" :-.                                  :: ",
		"  .:.                                 :. ",
		"   ..:                               ... ",
		"   ..:                               :.. ",
		"  :...                              :....",
		"   ..                                ....",
		"   .                                  .. ",
		"  .:.                                 .: ",
		"  :.                                  .. ",
		" ::.                                 ..  ",
		".....                          ..:...    ",
		"...:.                         ..         ",
		".:...:.       ::.           ..           ",
		"  ... ..:::::..  ..:::::::..             ",
	];

	const details = [
		`${fields.user}@${fields.host}`,
		"-------------------------",
		`OS: ${fields.osName}`,
		`Host: ${resolveHostLabel(fields.host)}`,
		`Kernel: ${fields.kernel}`,
		`Uptime: ${uptime}`,
		// `Packages: ${fields.packages}`,
		`Shell: ${fields.shell}`,
		// `Shell Props: ${fields.shellProps}`,
		`Resolution: ${fields.resolution}`,
		`Terminal: ${fields.terminal}`,
		`CPU: ${fields.cpu}`,
		`GPU: ${fields.gpu}`,
		`Memory: ${fields.memoryUsedMiB}MiB / ${fields.memoryTotalMiB}MiB`,
		"",
		colorBars[0],
		colorBars[1],
	];

	const width = Math.max(distroLogo.length, details.length);
	const lines: string[] = [];

	for (let i = 0; i < width; i += 1) {
		const rawLeft = distroLogo[i] ?? "";
		const right = details[i] ?? "";
		if (right.length > 0) {
			const left = colorizeLogoLine(
				rawLeft.padEnd(31, " "),
				i,
				distroLogo.length,
			);
			const coloredRight = colorizeDetailLine(right);
			lines.push(`${left}  ${coloredRight}`);
			continue;
		}

		lines.push(colorizeLogoLine(rawLeft, i, distroLogo.length));
	}

	return lines.join("\n");
}
