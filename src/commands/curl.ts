import type { ShellModule } from "../types/commands";
import { ifFlag, parseArgs } from "./command-helpers";
import { assertPathAccess, resolvePath } from "./helpers";

/**
 * HTTP client wrapper using `fetch()` semantics (virtual curl).
 * @category network
 * @params ["[options] <url>"]
 */
export const curlCommand: ShellModule = {
	name: "curl",
	description: "Transfer data from or to a server (pure fetch)",
	category: "network",
	params: ["[options] <url>"],
	run: async ({ authUser, cwd, args, shell }) => {
		const { flagsWithValues, positionals } = parseArgs(args, {
			flagsWithValue: [
				"-o",
				"--output",
				"-X",
				"--request",
				"-d",
				"--data",
				"-H",
				"--header",
				"-u",
				"--user",
			],
		});

		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: [
					"Usage: curl [options] <url>",
					"  -o, --output <file>    Write to file",
					"  -X, --request <method> HTTP method",
					"  -d, --data <data>      POST data",
					"  -H, --header <hdr>     Extra header",
					"  -s, --silent           Silent mode",
					"  -I, --head             Fetch headers only",
					"  -L, --location         Follow redirects",
					"  -v, --verbose          Verbose",
				].join("\n"),
				exitCode: 0,
			};
		}

		const url = positionals[0];
		if (!url) return { stderr: "curl: no URL specified", exitCode: 1 };

		const outputPath =
			flagsWithValues.get("-o") ?? flagsWithValues.get("--output") ?? null;
		const method = (
			flagsWithValues.get("-X") ??
			flagsWithValues.get("--request") ??
			"GET"
		).toUpperCase();
		const postData =
			flagsWithValues.get("-d") ?? flagsWithValues.get("--data") ?? null;
		const headerRaw =
			flagsWithValues.get("-H") ?? flagsWithValues.get("--header") ?? null;
		const silent = ifFlag(args, ["-s", "--silent"]);
		const headOnly = ifFlag(args, ["-I", "--head"]);
		const followRedirects = ifFlag(args, ["-L", "--location"]);
		const verbose = ifFlag(args, ["-v", "--verbose"]);

		const extraHeaders: Record<string, string> = {
			"User-Agent": "curl/7.88.1",
		};
		if (headerRaw) {
			const idx = headerRaw.indexOf(":");
			if (idx !== -1)
				extraHeaders[headerRaw.slice(0, idx).trim()] = headerRaw
					.slice(idx + 1)
					.trim();
		}

		const finalMethod = postData && method === "GET" ? "POST" : method;
		const fetchOpts: RequestInit = {
			method: finalMethod,
			headers: extraHeaders,
			redirect: followRedirects ? "follow" : "manual",
		};
		if (postData) {
			extraHeaders["Content-Type"] ??= "application/x-www-form-urlencoded";
			fetchOpts.body = postData;
		}

		const stderrLines: string[] = [];
		if (verbose) {
			stderrLines.push(`* Trying ${url}...`, `* Connected`);
			stderrLines.push(
				`> ${finalMethod} / HTTP/1.1`,
				`> Host: ${new URL(url).host}`,
			);
		}

		let response: Response;
		try {
			response = await fetch(url, fetchOpts);
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			return {
				stderr: `curl: (6) Could not resolve host: ${msg}`,
				exitCode: 6,
			};
		}

		if (verbose) {
			stderrLines.push(`< HTTP/1.1 ${response.status} ${response.statusText}`);
		}

		if (headOnly) {
			const lines = [`HTTP/1.1 ${response.status} ${response.statusText}`];
			for (const [k, v] of response.headers.entries()) lines.push(`${k}: ${v}`);
			return { stdout: `${lines.join("\r\n")}\r\n`, exitCode: 0 };
		}

		let body: string;
		try {
			body = await response.text();
		} catch {
			return { stderr: "curl: failed to read response body", exitCode: 1 };
		}

		if (outputPath) {
			const target = resolvePath(cwd, outputPath);
			assertPathAccess(authUser, target, "curl");
			shell.writeFileAsUser(authUser, target, body);
			if (!silent)
				stderrLines.push(
					`  % Total    % Received\n100 ${body.length}  100 ${body.length}`,
				);
			return {
				stderr: stderrLines.join("\n") || undefined,
				exitCode: response.ok ? 0 : 22,
			};
		}

		return {
			stdout: body,
			stderr: stderrLines.length > 0 ? stderrLines.join("\n") : undefined,
			exitCode: response.ok ? 0 : 22,
		};
	},
};
