import {createCipheriv, createDecipheriv, createHash} from "node:crypto";

export function deriveKey(secret: string): Buffer {
	return createHash("sha256").update(secret).digest();
}

export function encrypt(plaintext: string, key: Buffer, iv: Buffer): Buffer {
	const cipher = createCipheriv("aes-256-cbc", key, iv);
	return Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
}

export function decrypt(ciphertext: Buffer, key: Buffer, iv: Buffer): string {
	const decipher = createDecipheriv("aes-256-cbc", key, iv);
	return Buffer.concat([
		decipher.update(ciphertext),
		decipher.final(),
	]).toString("utf8");
}
