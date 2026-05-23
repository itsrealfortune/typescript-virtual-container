/**
 * POSIX signal definitions and signal handling for virtual processes.
 *
 * Supported signals:
 * - SIGHUP (1): Hangup
 * - SIGINT (2): Interrupt from keyboard
 * - SIGQUIT (3): Quit from keyboard
 * - SIGKILL (9): Kill (cannot be caught or ignored)
 * - SIGTERM (15): Termination signal
 * - SIGSTOP (19): Stop process (cannot be caught)
 * - SIGCONT (18): Continue if stopped
 * - SIGCHLD (17): Child process status changed
 * - SIGWINCH (28): Window size changed
 * - SIGUSR1 (10): User-defined signal 1
 * - SIGUSR2 (12): User-defined signal 2
 */

export const SIGNALS: Record<
	number,
	{ name: string; description: string; defaultAction: string }
> = {
	1: { name: "SIGHUP", description: "Hangup", defaultAction: "terminate" },
	2: { name: "SIGINT", description: "Interrupt", defaultAction: "terminate" },
	3: { name: "SIGQUIT", description: "Quit", defaultAction: "core" },
	9: { name: "SIGKILL", description: "Kill", defaultAction: "terminate" },
	15: {
		name: "SIGTERM",
		description: "Termination",
		defaultAction: "terminate",
	},
	17: {
		name: "SIGCHLD",
		description: "Child status changed",
		defaultAction: "ignore",
	},
	18: { name: "SIGCONT", description: "Continue", defaultAction: "continue" },
	19: { name: "SIGSTOP", description: "Stop", defaultAction: "stop" },
	28: {
		name: "SIGWINCH",
		description: "Window size changed",
		defaultAction: "ignore",
	},
	10: {
		name: "SIGUSR1",
		description: "User signal 1",
		defaultAction: "terminate",
	},
	12: {
		name: "SIGUSR2",
		description: "User signal 2",
		defaultAction: "terminate",
	},
};

/** Human-readable POSIX signal name (e.g. "SIGTERM", "SIGKILL"). */
export type SignalName = keyof typeof SIGNALS extends number ? string : string;

/** Callback invoked when a virtual process receives a signal. */
export type SignalHandler = (signal: number, pid: number) => void;

/**
 * Resolve a signal number from a string (number or signal name).
 * Returns the signal number or null if invalid.
 */
export function resolveSignal(spec: string): number | null {
	const num = Number(spec);
	if (!Number.isNaN(num) && num > 0 && num in SIGNALS) {
		return num;
	}

	const upper = spec.toUpperCase().replace(/^SIG/, "");
	for (const [numStr, sig] of Object.entries(SIGNALS)) {
		if (sig.name === `SIG${upper}` || sig.name === upper) {
			return Number(numStr);
		}
	}
	return null;
}

/**
 * Get the default action for a signal.
 * "terminate" — abort the process
 * "stop" — mark as stopped
 * "continue" — mark as running
 * "ignore" — no action
 * "core" — terminate (would dump core on real system)
 */
export function signalDefaultAction(sig: number): string {
	return SIGNALS[sig]?.defaultAction ?? "terminate";
}
