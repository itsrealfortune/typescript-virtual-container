export type PerfLogger = {
	enabled: boolean;
	mark: (label: string) => void;
	done: (label?: string) => void;
};

function isTruthyEnv(value: string | undefined): boolean {
	return value === "1" || value === "true";
}

function nowMs(): number {
	if (
		typeof performance !== "undefined" &&
		typeof performance.now === "function"
	) {
		return performance.now();
	}

	return Date.now();
}

function isPerfLoggingEnabled(): boolean {
	return (
		isTruthyEnv(process.env.DEV_MODE) || isTruthyEnv(process.env.RENDER_PERF)
	);
}

export function createPerfLogger(scope: string): PerfLogger {
	const enabled = isPerfLoggingEnabled();
	if (!enabled) {
		return {
			enabled,
			mark: () => undefined,
			done: () => undefined,
		};
	}

	const startedAt = nowMs();

	const mark = (label: string): void => {
		const elapsedMs = nowMs() - startedAt;
		console.log(`[perf][${scope}] ${label}: ${elapsedMs.toFixed(1)}ms`);
	};

	const done = (label = "done"): void => {
		mark(label);
	};

	return {
		enabled,
		mark,
		done,
	};
}
