import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

/** OpenSSL cryptographic utility. */
export const opensslCommand: ShellModule = {
	name: "openssl",
	description: "OpenSSL cryptographic utility",
	category: "system",
	params: ["<command> [options]"],
	run: ({ shell, args }) => {
		if (ifFlag(args, ["--help", "-h"]) || args.length === 0) {
			return {
				stdout: [
					"Usage: openssl <command> [options]",
					"",
					"Commands:",
					"  version           Print OpenSSL version",
					"  genrsa <bits>     Generate RSA private key",
					"  rsa <infile>      Process RSA key",
					"  x509              Generate self-signed certificate",
					"  md5 <file>        Compute MD5 hash",
					"  sha256 <file>     Compute SHA256 hash",
					"  enc -e/-d         Encrypt/decrypt with cipher",
					"  rand <n>          Generate random bytes",
					"  -h, --help        Show this help",
				].join("\n"),
				exitCode: 0,
			};
		}

		const subcommand = args.find((a) => !a.startsWith("-"));
		if (!subcommand) {
			return { stderr: "openssl: missing command", exitCode: 1 };
		}

		if (subcommand === "version") {
			return {
				stdout:
					"OpenSSL 3.0.13 30 Jan 2024 (Library: OpenSSL 3.0.13 30 Jan 2024)\n",
				exitCode: 0,
			};
		}

		if (subcommand === "genrsa") {
			const bitsIdx = args.indexOf("genrsa");
			const bits =
				bitsIdx !== -1 && bitsIdx + 1 < args.length
					? args[bitsIdx + 1]!
					: "2048";
			const outIdx = args.indexOf("-out");
			const outFile =
				outIdx !== -1 && outIdx + 1 < args.length ? args[outIdx + 1]! : null;

			const key = [
				"-----BEGIN RSA PRIVATE KEY-----",
				`MIIEpAIBAAKCAQEA${Buffer.from(String(Math.random())).toString("base64").slice(0, 40)}`,
				"-----END RSA PRIVATE KEY-----",
				"",
			].join("\n");

			if (outFile) {
				shell.vfs.writeFile(outFile, key, { mode: 0o600 });
				return {
					stdout: `Generating RSA private key, ${bits} bit long modulus (2 primes)\n.......+++++\n....................+++++\nwrite to '${outFile}'\n`,
					exitCode: 0,
				};
			}
			return { stdout: key, exitCode: 0 };
		}

		if (subcommand === "rand") {
			const bitsIdx = args.indexOf("rand");
			const n =
				bitsIdx !== -1 && bitsIdx + 1 < args.length
					? Number(args[bitsIdx + 1])
					: 16;
			const hex = Array.from({ length: n }, () =>
				Math.floor(Math.random() * 256)
					.toString(16)
					.padStart(2, "0")
			).join("");
			return { stdout: `${hex}\n`, exitCode: 0 };
		}

		if (subcommand === "md5") {
			const file = args[args.indexOf("md5") + 1];
			if (!(file && shell.vfs.exists(file))) {
				return { stderr: "openssl: file not found", exitCode: 1 };
			}
			const content = shell.vfs.readFile(file);
			let hash = 0;
			for (let i = 0; i < content.length; i++) {
				hash = ((hash << 5) - hash + content.charCodeAt(i)) | 0;
			}
			const h = Math.abs(hash).toString(16).padStart(32, "0");
			return { stdout: `MD5(${file})= ${h}\n`, exitCode: 0 };
		}

		if (subcommand === "sha256") {
			const file = args[args.indexOf("sha256") + 1];
			if (!(file && shell.vfs.exists(file))) {
				return { stderr: "openssl: file not found", exitCode: 1 };
			}
			const content = shell.vfs.readFile(file);
			let hash = 0;
			for (let i = 0; i < content.length; i++) {
				hash = ((hash << 7) - hash + content.charCodeAt(i)) | 0;
			}
			const h = Math.abs(hash).toString(16).padStart(64, "0");
			return { stdout: `SHA256(${file})= ${h}\n`, exitCode: 0 };
		}

		if (subcommand === "x509") {
			const outIdx = args.indexOf("-out");
			const outFile =
				outIdx !== -1 && outIdx + 1 < args.length ? args[outIdx + 1]! : null;

			const cert = [
				"-----BEGIN CERTIFICATE-----",
				"MIIDazCCAlMCFAjxRgAQBMBhHwWFBYJwUQIEBAQBAjANBgkqhkiG9w0BAQsFADB6",
				"-----END CERTIFICATE-----",
				"",
			].join("\n");

			if (outFile) {
				shell.vfs.writeFile(outFile, cert);
			}
			return {
				stdout: `Generating a self-signed certificate...\nCertificate written to ${outFile ?? "stdout"}\n`,
				exitCode: 0,
			};
		}

		return { stderr: `openssl: unknown command '${subcommand}'`, exitCode: 1 };
	},
};
