import { describe, expect, test } from "bun:test";
import { keyToBytes } from "../src/utils/keyToBytes";

/**
 * Minimal KeyboardEvent-like object that keyToBytes can consume.
 * keyToBytes only reads: ctrlKey, altKey, metaKey, key
 */
function mockKeyboardEvent(init: {
	key: string;
	ctrlKey?: boolean;
	altKey?: boolean;
	metaKey?: boolean;
}): KeyboardEvent {
	return {
		key: init.key,
		ctrlKey: init.ctrlKey ?? false,
		altKey: init.altKey ?? false,
		metaKey: init.metaKey ?? false,
	} as unknown as KeyboardEvent;
}

describe("keyToBytes", () => {
	test("returns null for unknown key", () => {
		const e = mockKeyboardEvent({ key: "F13" });
		expect(keyToBytes(e)).toBeNull();
	});

	test("returns null for meta key combos", () => {
		const e = mockKeyboardEvent({ key: "a", metaKey: true });
		expect(keyToBytes(e)).toBeNull();
	});

	test("Ctrl+A returns 0x01", () => {
		const e = mockKeyboardEvent({ key: "a", ctrlKey: true });
		const result = keyToBytes(e);
		expect(result).toEqual(new Uint8Array([1]));
	});

	test("Ctrl+Z returns 0x1A", () => {
		const e = mockKeyboardEvent({ key: "z", ctrlKey: true });
		const result = keyToBytes(e);
		expect(result).toEqual(new Uint8Array([26]));
	});

	test("Ctrl+[ returns Escape (0x1B)", () => {
		const e = mockKeyboardEvent({ key: "[", ctrlKey: true });
		const result = keyToBytes(e);
		expect(result).toEqual(new Uint8Array([27]));
	});

	test("Ctrl+Backspace returns 0x08", () => {
		const e = mockKeyboardEvent({ key: "Backspace", ctrlKey: true });
		const result = keyToBytes(e);
		expect(result).toEqual(new Uint8Array([8]));
	});

	test("Alt+A returns Escape + A", () => {
		const e = mockKeyboardEvent({ key: "a", altKey: true });
		const result = keyToBytes(e);
		expect(result).toEqual(new Uint8Array([27, 97]));
	});

	test("ArrowUp returns ESC [ A", () => {
		const e = mockKeyboardEvent({ key: "ArrowUp" });
		const result = keyToBytes(e);
		expect(result).toEqual(new Uint8Array([27, 91, 65]));
	});

	test("ArrowDown returns ESC [ B", () => {
		const e = mockKeyboardEvent({ key: "ArrowDown" });
		const result = keyToBytes(e);
		expect(result).toEqual(new Uint8Array([27, 91, 66]));
	});

	test("ArrowRight returns ESC [ C", () => {
		const e = mockKeyboardEvent({ key: "ArrowRight" });
		const result = keyToBytes(e);
		expect(result).toEqual(new Uint8Array([27, 91, 67]));
	});

	test("ArrowLeft returns ESC [ D", () => {
		const e = mockKeyboardEvent({ key: "ArrowLeft" });
		const result = keyToBytes(e);
		expect(result).toEqual(new Uint8Array([27, 91, 68]));
	});

	test("Home returns ESC [ H", () => {
		const e = mockKeyboardEvent({ key: "Home" });
		const result = keyToBytes(e);
		expect(result).toEqual(new Uint8Array([27, 91, 72]));
	});

	test("End returns ESC [ F", () => {
		const e = mockKeyboardEvent({ key: "End" });
		const result = keyToBytes(e);
		expect(result).toEqual(new Uint8Array([27, 91, 70]));
	});

	test("Delete returns ESC [ 3 ~", () => {
		const e = mockKeyboardEvent({ key: "Delete" });
		const result = keyToBytes(e);
		expect(result).toEqual(new Uint8Array([27, 91, 51, 126]));
	});

	test("PageUp returns ESC [ 5 ~", () => {
		const e = mockKeyboardEvent({ key: "PageUp" });
		const result = keyToBytes(e);
		expect(result).toEqual(new Uint8Array([27, 91, 53, 126]));
	});

	test("PageDown returns ESC [ 6 ~", () => {
		const e = mockKeyboardEvent({ key: "PageDown" });
		const result = keyToBytes(e);
		expect(result).toEqual(new Uint8Array([27, 91, 54, 126]));
	});

	test("Insert returns ESC [ 2 ~", () => {
		const e = mockKeyboardEvent({ key: "Insert" });
		const result = keyToBytes(e);
		expect(result).toEqual(new Uint8Array([27, 91, 50, 126]));
	});

	test("F1 returns ESC O P", () => {
		const e = mockKeyboardEvent({ key: "F1" });
		const result = keyToBytes(e);
		expect(result).toEqual(new Uint8Array([27, 79, 80]));
	});

	test("Enter returns CR", () => {
		const e = mockKeyboardEvent({ key: "Enter" });
		const result = keyToBytes(e);
		expect(result).toEqual(new Uint8Array([13]));
	});

	test("Tab returns HT", () => {
		const e = mockKeyboardEvent({ key: "Tab" });
		const result = keyToBytes(e);
		expect(result).toEqual(new Uint8Array([9]));
	});

	test("Escape returns ESC", () => {
		const e = mockKeyboardEvent({ key: "Escape" });
		const result = keyToBytes(e);
		expect(result).toEqual(new Uint8Array([27]));
	});

	test("Backspace returns DEL (0x7F)", () => {
		const e = mockKeyboardEvent({ key: "Backspace" });
		const result = keyToBytes(e);
		expect(result).toEqual(new Uint8Array([127]));
	});

	test("regular character returns its byte", () => {
		const e = mockKeyboardEvent({ key: "x" });
		const result = keyToBytes(e);
		expect(result).toEqual(new Uint8Array([120]));
	});
});
