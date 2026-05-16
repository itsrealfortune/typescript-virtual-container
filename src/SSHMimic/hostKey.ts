import { generateKeyPairSync } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

/**
 * Loads an existing PEM-encoded RSA host key from `.ssh-mimic/host_rsa` under
 * the given base directory, or generates a new 2048-bit key pair and persists
 * it to disk. Returns the private key in PEM format.
 */
export function loadOrCreateHostKey(baseDir: string = process.cwd()): string {
	const hostKeyPath = resolve(baseDir, ".ssh-mimic", "host_rsa");

	if (existsSync(hostKeyPath)) {
		return readFileSync(hostKeyPath, "utf8");
	}

	const privateKey = generateKeyPairSync("rsa", {
		modulusLength: 2048,
		privateKeyEncoding: { type: "pkcs1", format: "pem" },
		publicKeyEncoding: { type: "pkcs1", format: "pem" },
	}).privateKey;

	mkdirSync(dirname(hostKeyPath), { recursive: true });
	writeFileSync(hostKeyPath, privateKey, { mode: 0o600 });
	return privateKey;
}
