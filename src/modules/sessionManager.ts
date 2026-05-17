import type { DesktopWindow } from "./desktopManager";

interface SerializedWindow {
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  zIndex: number;
  contentType: string;
  contentPath?: string;
}

const STORAGE_KEY = "fortune-desktop-session";
const VERSION = 1;

export function saveSession(windows: DesktopWindow[]): void {
  const serialized: SerializedWindow[] = [];
  for (const w of windows) {
    const base = {
      title: w.title,
      x: w.x, y: w.y,
      width: w.width, height: w.height,
      minimized: w.minimized,
      zIndex: w.zIndex,
    };
    if (w.content.type === "terminal") {
      serialized.push({ ...base, contentType: "terminal" });
    } else if (w.content.type === "thunar") {
      serialized.push({ ...base, contentType: "thunar", contentPath: w.content.path });
    } else if (w.content.type === "editor") {
      serialized.push({ ...base, contentType: "editor", contentPath: w.content.path });
    } else if (w.content.type === "about") {
      serialized.push({ ...base, contentType: "about" });
    }
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: VERSION, windows: serialized }));
  } catch {
    // storage full, silently ignore
  }
}

export function loadSession(): SerializedWindow[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.version === VERSION && Array.isArray(parsed.windows)) {
      return parsed.windows as SerializedWindow[];
    }
    return null;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // silently ignore
  }
}
