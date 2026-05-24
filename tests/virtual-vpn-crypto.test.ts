import {describe, expect, test} from "bun:test";
import {randomBytes} from "node:crypto";
import {decrypt, deriveKey, encrypt} from "../src/modules/VirtualVpn/crypto";

describe("VirtualVpn crypto", () => {
	test("deriveKey produces a 32-byte key", () => {
		const key = deriveKey("shared-secret");
		expect(key).toBeInstanceOf(Buffer);
		expect(key.length).toBe(32);
	});

	test("deriveKey is deterministic", () => {
		const key1 = deriveKey("secret");
		const key2 = deriveKey("secret");
		expect(key1.equals(key2)).toBe(true);
	});

	test("different secrets produce different keys", () => {
		const key1 = deriveKey("secret-a");
		const key2 = deriveKey("secret-b");
		expect(key1.equals(key2)).toBe(false);
	});

	test("encrypt and decrypt round-trip", () => {
		const key = deriveKey("test-key");
		const iv = randomBytes(16);
		const plaintext = "Hello, VPN!";

		const ciphertext = encrypt(plaintext, key, iv);
		const decrypted = decrypt(ciphertext, key, iv);

		expect(decrypted).toBe(plaintext);
	});

	test("encrypt produces different output for same input with different IV", () => {
		const key = deriveKey("test-key");
		const plaintext = "same data";

		const ct1 = encrypt(plaintext, key, randomBytes(16));
		const ct2 = encrypt(plaintext, key, randomBytes(16));

		expect(ct1.equals(ct2)).toBe(false);
	});

	test("encrypt produces binary buffer", () => {
		const key = deriveKey("test");
		const iv = randomBytes(16);
		const ciphertext = encrypt("data", key, iv);
		expect(ciphertext).toBeInstanceOf(Buffer);
	});

	test("decrypt fails with wrong key", () => {
		const key1 = deriveKey("key-a");
		const key2 = deriveKey("key-b");
		const iv = randomBytes(16);
		const ciphertext = encrypt("secret message", key1, iv);

		expect(() => decrypt(ciphertext, key2, iv)).toThrow();
	});

	test("handles empty string", () => {
		const key = deriveKey("test");
		const iv = randomBytes(16);
		const ciphertext = encrypt("", key, iv);
		const decrypted = decrypt(ciphertext, key, iv);
		expect(decrypted).toBe("");
	});

	test("handles unicode characters", () => {
		const key = deriveKey("test");
		const iv = randomBytes(16);
		const plaintext = "héllo wörld 🚀";
		const ciphertext = encrypt(plaintext, key, iv);
		const decrypted = decrypt(ciphertext, key, iv);
		expect(decrypted).toBe(plaintext);
	});
});
