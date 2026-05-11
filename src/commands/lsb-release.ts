import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

/**
 * Print Linux distribution information.
 * @category system
 * @params ["[-a] [-i] [-d] [-r] [-c]"]
 */
export const lsbReleaseCommand: ShellModule = {
	name: "lsb_release",
	description: "Print distribution-specific information",
	category: "system",
	params: ["[-a] [-i] [-d] [-r] [-c]"],
	run: ({ args, shell }) => {
		let osName = shell.properties?.os ?? "Fortune GNU/Linux x64";
		let codename = "aurora";
		let version = "1.0";

		try {
			const content = shell.vfs.readFile("/etc/os-release");
			for (const line of content.split("\n")) {
				if (line.startsWith("PRETTY_NAME="))
					osName = line
						.slice("PRETTY_NAME=".length)
						.replace(/^"|"$/g, "")
						.trim();
				if (line.startsWith("VERSION_CODENAME="))
					codename = line.slice("VERSION_CODENAME=".length).trim();
				if (line.startsWith("VERSION_ID="))
					version = line
						.slice("VERSION_ID=".length)
						.replace(/^"|"$/g, "")
						.trim();
			}
		} catch {}

		const all = ifFlag(args, ["-a", "--all"]);
		const showId = ifFlag(args, ["-i", "--id"]);
		const showDesc = ifFlag(args, ["-d", "--description"]);
		const showRelease = ifFlag(args, ["-r", "--release"]);
		const showCodename = ifFlag(args, ["-c", "--codename"]);

		if (all || args.length === 0) {
			return {
				stdout: [
					`Distributor ID:\tFortune`,
					`Description:\t${osName}`,
					`Release:\t${version}`,
					`Codename:\t${codename}`,
				].join("\n"),
				exitCode: 0,
			};
		}

		const lines: string[] = [];
		if (showId) lines.push(`Distributor ID:\tFortune`);
		if (showDesc) lines.push(`Description:\t${osName}`);
		if (showRelease) lines.push(`Release:\t${version}`);
		if (showCodename) lines.push(`Codename:\t${codename}`);

		return { stdout: lines.join("\n"), exitCode: 0 };
	},
};
