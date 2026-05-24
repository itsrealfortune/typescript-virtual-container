import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

/** GNU Privacy Guard — encryption and signing. */
export const gpgCommand: ShellModule = {
	name: "gpg",
	description: "GNU Privacy Guard — encryption and signing",
	category: "system",
	params: ["[options] [file...]"],
	run: ({ shell, args }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: [
					"Usage: gpg [options] [file...]",
					"  --list-keys       List public keys",
					"  --list-secret-keys List secret keys",
					"  --gen-key         Generate a new key pair",
					"  -e, --encrypt     Encrypt data",
					"  -d, --decrypt     Decrypt data",
					"  -s, --sign        Sign data",
					"  -k, --list-key    List keys (short)",
					"  -h, --help        Show this help",
				].join("\n"),
				exitCode: 0,
			};
		}

		const gnupgDir = `${process.env.HOME ?? "/root"}/.gnupg`;

		if (ifFlag(args, ["--list-keys", "-k", "--list-public-keys"])) {
			return listKeys(shell.vfs, gnupgDir);
		}

		if (ifFlag(args, ["--list-secret-keys"])) {
			return listSecretKeys();
		}

		if (ifFlag(args, ["--gen-key", "--full-generate-key"])) {
			return generateKey();
		}

		if (ifFlag(args, ["-e", "--encrypt"])) {
			const file = args.find((a) => !a.startsWith("-"));
			if (!file) {
				return { stderr: "gpg: missing file", exitCode: 1 };
			}
			return {
				stdout: `gpg: encrypted output written to ${file}.gpg\n`,
				exitCode: 0,
			};
		}

		if (ifFlag(args, ["-d", "--decrypt"])) {
			const file = args.find((a) => !a.startsWith("-"));
			if (!file) {
				return { stderr: "gpg: missing file", exitCode: 1 };
			}
			return {
				stdout: "gpg: decryption not supported in virtual environment\n",
				exitCode: 1,
			};
		}

		if (ifFlag(args, ["-s", "--sign"])) {
			const file = args.find((a) => !a.startsWith("-"));
			if (!file) {
				return { stderr: "gpg: missing file", exitCode: 1 };
			}
			return {
				stdout: `gpg: signed output written to ${file}.sig\n`,
				exitCode: 0,
			};
		}

		return {
			stderr:
				"gpg: no command specified\nTry 'gpg --help' for more information.",
			exitCode: 2,
		};
	},
};

function listKeys(
	vfs: {
		exists: (p: string) => boolean;
		readFile: (p: string) => string;
		list: (d: string) => string[];
	},
	dir: string
) {
	const pubring = `${dir}/pubring.kbx`;
	if (!vfs.exists(pubring)) {
		return {
			stdout: "gpg: directory '/root/.gnupg' created\ngpg: no public keys\n",
			exitCode: 0,
		};
	}
	return {
		stdout:
			"pub   rsa3072 2024-01-01 [SC]\n      ABCDEF1234567890ABCDEF1234567890ABCDEF12\nuid           [ultimate] Virtual User <virtual@localhost>\n",
		exitCode: 0,
	};
}

function listSecretKeys() {
	return {
		stdout:
			"sec   rsa3072 2024-01-01 [SC]\n      ABCDEF1234567890ABCDEF1234567890ABCDEF12\nuid           [ultimate] Virtual User <virtual@localhost>\n",
		exitCode: 0,
	};
}

function generateKey() {
	return {
		stdout: "gpg: key generation not supported in virtual environment\n",
		exitCode: 1,
	};
}
