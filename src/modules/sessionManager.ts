import type { DesktopWindow } from "./desktopManager";

/** Serialized window state for localStorage persistence. */
interface SerializedWindow {
	title: string;
	x: number;
	y: number;
	width: number;
	height: number;
	minimized: boolean;
	maximized: boolean;
	savedRect: { x: number; y: number; width: number; height: number } | null;
	zIndex: number;
	contentType: string;
	contentPath?: string;
}

const STORAGE_KEY = "fortune-desktop-session";
const VERSION = 1;

/**
 * Persist desktop window layout to localStorage.
 * Serializes terminal, thunar, editor, and about window states.
 * Silently ignores storage-full errors.
 * @param windows - Array of DesktopWindow instances to serialize.
 */
export function saveSession(windows: DesktopWindow[]): void {
	const serialized: SerializedWindow[] = [];
	for (const w of windows) {
		const base = {
			title: w.title,
			x: w.x,
			y: w.y,
			width: w.width,
			height: w.height,
			minimized: w.minimized,
			maximized: w.maximized,
			savedRect: w.savedRect,
			zIndex: w.zIndex,
		};
		if (w.content.type === "terminal") {
			serialized.push({ ...base, contentType: "terminal" });
		} else if (w.content.type === "thunar") {
			serialized.push({
				...base,
				contentType: "thunar",
				contentPath: w.content.path,
			});
		} else if (w.content.type === "editor") {
			serialized.push({
				...base,
				contentType: "editor",
				contentPath: w.content.path,
			});
		} else if (w.content.type === "about") {
			serialized.push({ ...base, contentType: "about" });
		}
	}
	try {
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({ version: VERSION, windows: serialized }),
		);
	} catch {
		// storage full, silently ignore
	}
}

/**
 * Restore desktop window layout from localStorage.
 * Returns null if no session exists or the version doesn't match.
 * @returns Array of serialized window descriptors, or null.
 */
export function loadSession(): SerializedWindow[] | null {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) {
			return null;
		}
		const parsed = JSON.parse(raw);
		if (parsed?.version === VERSION && Array.isArray(parsed.windows)) {
			const windows = parsed.windows;
			if (
				!windows.every(
					(w: unknown) => typeof w === "object" && w !== null && "id" in w,
				)
			) {
				return null;
			}
			return windows as SerializedWindow[];
		}
		return null;
	} catch {
		return null;
	}
}

/**
 * Clear the persisted desktop session from localStorage.
 * Silently ignores errors (e.g., storage unavailable).
 */
export function clearSession(): void {
	try {
		localStorage.removeItem(STORAGE_KEY);
	} catch {
		// silently ignore
	}
}
