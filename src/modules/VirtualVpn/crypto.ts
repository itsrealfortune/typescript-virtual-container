import { createCipheriv, createDecipheriv, createHash } from "node:crypto";

/** Derive a 256-bit AES key from a secret string using SHA-256. */
export function deriveKey(secret: string): Buffer {
	return createHash("sha256").update(secret).digest();
}

/** Encrypt plaintext with AES-256-CBC using the given key and IV. */
export function encrypt(plaintext: string, key: Buffer, iv: Buffer): Buffer {
	const cipher = createCipheriv("aes-256-cbc", key, iv);
	return Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
}

/** Decrypt AES-256-CBC ciphertext with the given key and IV. */
export function decrypt(ciphertext: Buffer, key: Buffer, iv: Buffer): string {
	const decipher = createDecipheriv("aes-256-cbc", key, iv);
	return Buffer.concat([
		decipher.update(ciphertext),
		decipher.final(),
	]).toString("utf8");
}
