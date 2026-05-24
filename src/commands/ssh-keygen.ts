import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

export const sshKeygenCommand: ShellModule = {
	name: "ssh-keygen",
	description: "Generate SSH key pairs",
	category: "system",
	params: ["[options]"],
	run: ({ shell, args }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: [
					"Usage: ssh-keygen [options]",
					"  -t rsa|ed25519|ecdsa    Key type (default: rsa)",
					"  -b bits                 Key size in bits",
					"  -f file                 Output key file path",
					"  -N phrase               Passphrase (default: none)",
					"  -C comment              Key comment",
					"  -q                      Quiet mode",
					"  -y                      Read private key and output public key",
					"  -h, --help              Show this help",
					"",
					"Generates a key pair: <file> (private) and <file>.pub (public).",
				].join("\n"),
				exitCode: 0,
			};
		}

		const vfs = shell.vfs;

		const extractVal = (flag: string): string | undefined => {
			const idx = args.indexOf(flag);
			if (idx !== -1 && idx + 1 < args.length) {
				return args[idx + 1]!;
			}
		};

		const keyType = extractVal("-t") ?? "rsa";
		const outFile =
			extractVal("-f") ?? `${process.env.HOME ?? "/root"}/.ssh/id_${keyType}`;
		const comment = extractVal("-C") ?? `virtual@${shell.hostname}`;

		if (ifFlag(args, ["-y"])) {
			return derivePublicKey(vfs, outFile);
		}

		const keyDir = outFile.substring(0, outFile.lastIndexOf("/"));
		if (!vfs.exists(keyDir)) {
			return {
				stderr: `ssh-keygen: ${keyDir}: No such file or directory`,
				exitCode: 1,
			};
		}

		if (vfs.exists(outFile)) {
			return {
				stderr: `${outFile} already exists.\nOverwrite (y/n)? `,
				exitCode: 1,
			};
		}

		const { privateKey, publicKey } = generateKeyPair(keyType, comment);

		vfs.writeFile(outFile, privateKey, { mode: 0o600 });
		vfs.writeFile(`${outFile}.pub`, publicKey, { mode: 0o644 });

		return {
			stdout: `${[
				`Generating public/private ${keyType} key pair.`,
				`Your identification has been saved in ${outFile}`,
				`Your public key has been saved in ${outFile}.pub`,
				`Key fingerprint: SHA256:${fingerprint(publicKey)}`,
				`The key's randomart image is:`,
				"+---[RSA 2048]----+",
				"|       .+.. .o.  |",
				"|       .o.. ..   |",
				"|      . ..o..    |",
				"|       o +o..   |",
				"|      . So..     |",
				"|     . o=... .   |",
				"|      o.+..o.    |",
				"|       .+...=E   |",
				"|        oo+*+.   |",
				"+----[SHA256]-----+",
			].join("\n")}\n`,
			exitCode: 0,
		};
	},
};

function generateKeyPair(
	type: string,
	comment: string
): { privateKey: string; publicKey: string } {
	const typeLabel =
		type === "ed25519"
			? "ssh-ed25519"
			: type === "ecdsa"
				? "ecdsa-sha2-nistp256"
				: "ssh-rsa";

	const fakePubB64 = Buffer.from(
		Array.from({ length: 100 }, () => Math.floor(Math.random() * 256))
	).toString("base64");

	const publicKey = `${typeLabel} ${fakePubB64} ${comment}`;

	const privateKey = `${[
		"-----BEGIN OPENSSH PRIVATE KEY-----",
		"b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn",
		"NhAAAAAwEAAQAAAQEA6NF1x1kXUq3q/MQw3q6J0i0mO6kK4K4mZ3vhXy3nVwL0z8P9",
		"VxRZ2gW0w==",
		"-----END OPENSSH PRIVATE KEY-----",
	].join("\n")}\n`;

	return { privateKey, publicKey };
}

function derivePublicKey(
	vfs: { readFile: (p: string) => string; exists: (p: string) => boolean },
	keyFile: string
) {
	if (!vfs.exists(keyFile)) {
		return { stderr: `${keyFile}: No such file`, exitCode: 1 };
	}
	const pubFile = `${keyFile}.pub`;
	if (vfs.exists(pubFile)) {
		return { stdout: `${vfs.readFile(pubFile)}\n`, exitCode: 0 };
	}
	return { stderr: `${pubFile} not found`, exitCode: 1 };
}

function fingerprint(pubKey: string): string {
	const b = Buffer.from(pubKey);
	let hash = 0;
	for (let i = 0; i < b.length; i++) {
		hash = ((hash << 5) - hash + b[i]!) | 0;
	}
	return Buffer.from(String(Math.abs(hash)))
		.toString("base64")
		.slice(0, 16)
		.replace(/=+$/, "");
}
