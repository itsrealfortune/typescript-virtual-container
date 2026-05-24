import type { ShellModule } from "../types/commands";

/**
 * Show and manipulate connection tracking entries.
 * Displays stateful connection tracking information from the virtual network stack.
 * @category network
 */
export const conntrackCommand: ShellModule = {
	name: "conntrack",
	description: "Show/manipulate connection tracking entries",
	category: "network",
	params: ["[options]"],
	run: ({ args, shell }) => {
		const net = shell.network;

		if (args.includes("-L") || args.includes("--list") || args.length === 0) {
			const entries = net.getConntrack();
			if (entries.length === 0) {
				return {
					stdout:
						"conntrack v1.4.6 (conntrack-tools): 0 flow entries have been shown.\n",
					exitCode: 0,
				};
			}
			return {
				stdout: `${net.formatConntrack()}\n\nconntrack v1.4.6 (conntrack-tools): ${entries.length} flow entries have been shown.\n`,
				exitCode: 0,
			};
		}

		if (args.includes("-F") || args.includes("--flush")) {
			net.flushConntrack();
			return { stdout: "0 flow entries have been deleted.\n", exitCode: 0 };
		}

		if (args.includes("-C") || args.includes("--count")) {
			return { stdout: `${net.getConntrackCount()}\n`, exitCode: 0 };
		}

		if (args.includes("-S") || args.includes("--stats")) {
			const max = net.getConntrackMax();
			const count = net.getConntrackCount();
			return {
				stdout: `cpu=0           found=${count} invalid=0 insert=0 insert_failed=0 drop=0 early_drop=0 error=0 search_restart=0\nconntrack table: ${count}/${max} entries\n`,
				exitCode: 0,
			};
		}

		if (args.includes("-E") || args.includes("--event")) {
			return { stdout: "Listening for events...\n", exitCode: 0 };
		}

		if (args.includes("-D") || args.includes("--delete")) {
			const entries = net.getConntrack();
			if (entries.length === 0) {
				return { stderr: "conntrack: no entries to delete\n", exitCode: 1 };
			}
			net.flushConntrack();
			return {
				stdout: `${entries.length} flow entries have been deleted.\n`,
				exitCode: 0,
			};
		}

		if (args.includes("-U") || args.includes("--update")) {
			return { stdout: "0 flow entries have been updated.\n", exitCode: 0 };
		}

		if (args.includes("-I") || args.includes("--create")) {
			return { stdout: "1 flow entries have been created.\n", exitCode: 0 };
		}

		if (args.includes("-G") || args.includes("--get")) {
			return { stderr: "conntrack: no entry found\n", exitCode: 1 };
		}

		return {
			stderr:
				"Usage: conntrack [options]\nOptions:\n  -L, --list      List entries\n  -F, --flush     Flush entries\n  -C, --count     Count entries\n  -S, --stats     Show statistics\n  -E, --event     Listen for events\n  -D, --delete    Delete entries\n  -U, --update    Update entries\n  -I, --create    Create entry\n  -G, --get       Get entry",
			exitCode: 1,
		};
	},
};
