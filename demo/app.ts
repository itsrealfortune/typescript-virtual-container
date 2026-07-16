import { VirtualShell } from "../src/index.js";
import { DesktopManager } from "../src/modules/desktopManager.js";
import { WebTermRenderer } from "../src/modules/webTermRenderer.js";
import type { ShellStream } from "../src/types/streams.js";
import { keyToBytes } from "../src/utils/keyToBytes.js";

// ── Wait for IndexedDB fs shim ────────────────────────────────────────────────
// biome-ignore lint/suspicious/noExplicitAny: globalThis shim
await (globalThis as any).__fsReady__;

if (navigator.storage?.persist) {
	await navigator.storage.persist().catch(() => undefined);
}

// ── Terminal element ──────────────────────────────────────────────────────────

const TERMINAL = document.getElementById("terminal") as HTMLPreElement;
const SCROLLBACK_EL = document.getElementById("scrollback") as HTMLPreElement;
TERMINAL.focus();
document.addEventListener("click", () => {
	if (!window.getSelection()?.toString()) {
		TERMINAL.focus();
	}
});

// ── Measure character cell size ───────────────────────────────────────────────

function measureCharCell(): { w: number; h: number } {
	const probe = document.createElement("span");
	probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre;";
	probe.textContent = "X";
	TERMINAL.appendChild(probe);
	const rect = probe.getBoundingClientRect();
	TERMINAL.removeChild(probe);
	return { w: rect.width || 8, h: rect.height || 16 };
}

function getTermSize(): { cols: number; rows: number } {
	const { w, h } = measureCharCell();
	const wrapper = document.getElementById("terminal-wrapper") ?? TERMINAL;
	return {
		cols: Math.max(1, Math.floor(TERMINAL.clientWidth / w)),
		rows: Math.max(1, Math.floor(wrapper.clientHeight / h)),
	};
}

// ── Renderer ──────────────────────────────────────────────────────────────────

const { cols, rows } = getTermSize();
const RENDERER = new WebTermRenderer(rows, cols);

let rafPending = false;
const WRAPPER = document.getElementById("terminal-wrapper") as HTMLDivElement;
let fullscreenMode = false;
function flush(): void {
	if (rafPending) {
		return;
	}
	rafPending = true;
	requestAnimationFrame(() => {
		rafPending = false;
		const cleared = RENDERER.consumeCleared();
		if (cleared) {
			fullscreenMode = true;
		}
		SCROLLBACK_EL.innerHTML = RENDERER.renderScrollbackHtml();
		TERMINAL.innerHTML = RENDERER.renderHtml();
		if (fullscreenMode) {
			// Always wipe scrollback DOM in fullscreen — lines leaked by scrollUp must not show
			RENDERER.clearScrollback();
			SCROLLBACK_EL.innerHTML = "";
			if (!cleared && RENDERER.scrollbackLength > 0) {
				fullscreenMode = false;
				WRAPPER.classList.remove("fullscreen");
				TERMINAL.scrollIntoView(false);
			} else {
				WRAPPER.classList.add("fullscreen");
				WRAPPER.scrollTop = 0;
			}
		} else {
			WRAPPER.classList.remove("fullscreen");
			TERMINAL.scrollIntoView(false);
		}
	});
}

// ── ShellStream bridge ────────────────────────────────────────────────────────

// Listeners registered by shell.ts via stream.on("data"|"close")
const DATA_LISTENERS: ((chunk: Buffer) => void)[] = [];
const CLOSE_LISTENERS: (() => void)[] = [];

const STREAM: ShellStream = {
	write: (data: string) => {
		RENDERER.write(data);
		flush();
	},
	exit: () => undefined,
	end: () => {
		for (const l of CLOSE_LISTENERS) {
			l();
		}
	},
	on: (
		event: "data" | "close",
		listener: ((chunk: Buffer) => void) & (() => void)
	) => {
		if (event === "data") {
			DATA_LISTENERS.push(listener);
		} else if (event === "close") {
			CLOSE_LISTENERS.push(listener as () => void);
		}
	},
};

// ── Keyboard → bytes ──────────────────────────────────────────────────────────

interface BufferShim {
	from(data: Uint8Array): Buffer;
}
function toChunk(bytes: Uint8Array): Buffer {
	const g = globalThis as unknown as { Buffer?: BufferShim };
	return g.Buffer ? g.Buffer.from(bytes) : (bytes as unknown as Buffer);
}

TERMINAL.addEventListener("keydown", (e: KeyboardEvent) => {
	// Route to desktop if active
	if (desktopManager?.isActive()) {
		desktopManager.handleKeyDown(e);
		return;
	}
	// Allow browser shortcuts (Ctrl+C copy, Ctrl+V paste, F12, etc.)
	if (e.metaKey) {
		return;
	}
	if (
		e.ctrlKey &&
		(e.key === "c" || e.key === "v" || e.key === "a") &&
		!e.altKey
	) {
		// Let Ctrl+C pass through to shell (it's also used for copy but shell needs it)
		// Only block if there's a selection (user is copying)
		if (e.key !== "c" || !window.getSelection()?.toString()) {
			e.preventDefault();
		}
	} else {
		e.preventDefault();
	}

	const bytes = keyToBytes(e);
	if (!bytes) {
		return;
	}

	for (const l of DATA_LISTENERS) {
		l(toChunk(bytes));
	}
	TERMINAL.scrollTop = TERMINAL.scrollHeight;
});

// Paste support
TERMINAL.addEventListener("paste", (e: ClipboardEvent) => {
	e.preventDefault();
	const text = e.clipboardData?.getData("text") ?? "";
	if (!text) {
		return;
	}
	const enc = new TextEncoder();
	const bytes = enc.encode(text);
	for (const l of DATA_LISTENERS) {
		l(toChunk(bytes));
	}
	TERMINAL.scrollTop = TERMINAL.scrollHeight;
});

// ── Resize ────────────────────────────────────────────────────────────────────

window.addEventListener("resize", () => {
	const { cols: newCols, rows: newRows } = getTermSize();
	RENDERER.resize(newRows, newCols);
	flush();
	// shell.ts listens to stream resize via terminalSize ref — not exposed,
	// but a full redraw from the shell side happens on next output anyway.
});

// ── Desktop ────────────────────────────────────────────────────────────

const DESKTOP_EL = document.getElementById("desktop") as HTMLDivElement;
let desktopManager: DesktopManager | null = null;

// ── GPU detection ─────────────────────────────────────────────────────────────

function detectGpu(): string | undefined {
	try {
		const canvas = document.createElement("canvas");
		const gl =
			canvas.getContext("webgl") ??
			(canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
		if (!gl) {
			return;
		}
		const ext = (gl as WebGLRenderingContext).getExtension(
			"WEBGL_debug_renderer_info"
		);
		if (!ext) {
			return;
		}
		return (
			((gl as WebGLRenderingContext).getParameter(
				ext.UNMASKED_RENDERER_WEBGL
			) as string) || undefined
		);
	} catch {}
}

// ── Shell setup ───────────────────────────────────────────────────────────────

const HOSTNAME = "my-vm";

const SHELL = new VirtualShell(
	HOSTNAME,
	{
		kernel: "6.1.0-web-amd64",
		os: "Fortune GNU/Linux (Web)",
		arch:
			navigator.userAgent.includes("arm64") ||
			navigator.userAgent.includes("aarch64")
				? "aarch64"
				: "x86_64",
		resolution: `${window.screen.width}x${window.screen.height}`,
		gpu: detectGpu(),
	},
	{
		mode: "fs",
		snapshotPath: "/vfs-data",
		flushIntervalMs: 10_000,
	}
);

await SHELL.ensureInitialized();

// Detect first run by checking a marker that only exists after a successful flush.
// /root/.bashrc and /root/.profile are created by bootstrapRoot in the constructor
// on EVERY load, so they can't serve as markers. /root/README.txt is only created here.
const IS_FIRST_RUN = !SHELL.vfs.exists("/root/README.txt");
if (IS_FIRST_RUN) {
	if (!SHELL.vfs.exists("/root")) {
		SHELL.vfs.mkdir("/root", 0o700);
	}
	SHELL.vfs.writeFile("/root/README.txt", `Welcome to ${HOSTNAME}\n`);
	SHELL.vfs.flushMirror();
}

window.addEventListener("beforeunload", () => {
	SHELL.vfs.flushMirror();
});

// ── Desktop integration ───────────────────────────────────────────────────────

desktopManager = new DesktopManager(SHELL, DESKTOP_EL);
SHELL.desktopManager = desktopManager;
desktopManager.setOnExit(() => {
	TERMINAL.focus();
});

// ── Start interactive session ─────────────────────────────────────────────────

SHELL.startInteractiveSession(STREAM, "root", null, "browser", { cols, rows });
