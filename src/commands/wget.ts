import type { ShellModule } from "../types/commands";
import { ifFlag, parseArgs } from "./command-helpers";
import { assertPathAccess, resolvePath, stripUrlFilename } from "./helpers";
import {
	checkOutboundRestriction,
	honeypotResponse,
} from "../utils/networkRestrictions";

/**
 * Download files from the web (fetch-based implementation).
 * @category network
 * @params ["[options] <url>"]
 */
export const wgetCommand: ShellModule = {
	name: "wget",
	description: "File downloader (pure fetch)",
	category: "network",
	params: ["[options] <url>"],
	run: async ({ authUser, cwd, args, shell, uid, gid }) => {
		const { flagsWithValues, positionals } = parseArgs(args, {
			flagsWithValue: [
				"-O",
				"--output-document",
				"-o",
				"--output-file",
				"-P",
				"--directory-prefix",
				"--tries",
				"--timeout",
			],
		});

		if (ifFlag(args, ["-h", "--help"])) {
			return {
				stdout: [
					"Usage: wget [option]... [URL]...",
					"  -O, --output-document=FILE  Write to FILE ('-' for stdout)",
					"  -P, --directory-prefix=DIR  Save files in DIR",
					"  -q, --quiet                 Quiet mode",
					"  -v, --verbose               Verbose output (default)",
					"  -c, --continue              Continue partial download",
					"  --tries=N                   Retry N times",
					"  --timeout=N                 Timeout in seconds",
				].join("\n"),
				exitCode: 0,
			};
		}

		if (ifFlag(args, ["-V", "--version"])) {
			return {
				stdout: "GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",
				exitCode: 0,
			};
		}

		const urlWithoutProtocol = positionals[0];
		if (!urlWithoutProtocol) {
			return {
				stderr: "wget: missing URL\nUsage: wget [OPTION]... [URL]...",
				exitCode: 1,
			};
		}

		const url =
			urlWithoutProtocol.startsWith("http://") ||
			urlWithoutProtocol.startsWith("https://")
				? urlWithoutProtocol
				: `http://${urlWithoutProtocol}`;
		if (!url) {
			return {
				stderr: "wget: missing URL\nUsage: wget [OPTION]... [URL]...",
				exitCode: 1,
			};
		}

		const outputArg =
			flagsWithValues.get("-O") ??
			flagsWithValues.get("--output-document") ??
			null;
		const dirPrefix =
			flagsWithValues.get("-P") ??
			flagsWithValues.get("--directory-prefix") ??
			null;
		const quiet = ifFlag(args, ["-q", "--quiet"]);

		// Derive target filename
		const filename =
			outputArg === "-" ? null : (outputArg ?? stripUrlFilename(url));
		const targetPath = filename
			? resolvePath(cwd, dirPrefix ? `${dirPrefix}/${filename}` : filename)
			: null;

		if (targetPath) {
			assertPathAccess(authUser, targetPath, "wget");
		}

		const stderrLines: string[] = [];
		if (!quiet) {
			stderrLines.push(`--${new Date().toISOString()}--  ${url}`);
			stderrLines.push(`Resolving ${new URL(url).host}...`);
			stderrLines.push(`Connecting to ${new URL(url).host}...`);
		}

		let response: Response;
		try {
			const parsedUrl = new URL(url);
			const dstPort = parsedUrl.port
				? Number.parseInt(parsedUrl.port, 10)
				: parsedUrl.protocol === "https:"
					? 443
					: 80;

			const restriction = checkOutboundRestriction(
				url,
				shell.resourceCaps?.outboundRestriction
			);
			if (restriction.allowed) {
				const fwAction = shell.network.checkFirewall(
					"OUTPUT",
					"tcp",
					undefined,
					parsedUrl.hostname,
					dstPort
				);
				if (fwAction === "DROP" || fwAction === "REJECT") {
					return {
						stderr: `wget: unable to connect to ${parsedUrl.hostname}:${dstPort}: Connection refused\n`,
						exitCode: 4,
					};
				}
				response = await fetch(url, {
					headers: {
						"User-Agent": "Wget/1.21.3 (Fortune GNU/Linux)",
					},
				});
			} else if (restriction.honeypot) {
				response = honeypotResponse(url);
			} else {
				return {
					stderr: `wget: unable to connect to ${parsedUrl.hostname}:${dstPort}: Connection refused\n`,
					exitCode: 4,
				};
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			stderrLines.push(`wget: unable to resolve host: ${msg}`);
			return { stderr: stderrLines.join("\n"), exitCode: 4 };
		}

		if (!response.ok) {
			stderrLines.push(`ERROR ${response.status}: ${response.statusText}`);
			return { stderr: stderrLines.join("\n"), exitCode: 8 };
		}

		let body: string;
		try {
			body = await response.text();
		} catch {
			return { stderr: "wget: failed to read response", exitCode: 1 };
		}

		if (!quiet) {
			const ct =
				response.headers.get("content-type") ?? "application/octet-stream";
			stderrLines.push(
				`HTTP request sent, awaiting response... ${response.status} ${response.statusText}`
			);
			stderrLines.push(`Length: ${body.length} [${ct}]`);
		}

		// Output to stdout (pipe) or file
		if (outputArg === "-") {
			return {
				stdout: body,
				stderr: stderrLines.join("\n") || undefined,
				exitCode: 0,
			};
		}

		if (targetPath) {
			shell.vfs.writeFile(targetPath, body, {}, uid, gid);
			if (!quiet) {
				stderrLines.push(
					`Saving to: '${targetPath}'\n${targetPath}            100%[==================>]  ${body.length} B`
				);
			}
			return { stderr: stderrLines.join("\n") || undefined, exitCode: 0 };
		}

		return { stdout: body, exitCode: 0 };
	},
};
