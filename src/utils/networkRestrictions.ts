/** Mode for outbound network restriction filtering. */
export type OutboundRestrictionMode =
	| "allow-all"
	| "block-private"
	| "blocklist"
	| "allowlist";

/** Configuration for network restriction rules. */
export interface NetworkRestrictionConfig {
	mode?: OutboundRestrictionMode;
	blocklist?: string[];
	allowlist?: string[];
	honeypot?: boolean;
}

const PRIVATE_IP_PATTERNS = [
	/^127\./,
	/^10\./,
	/^172\.(1[6-9]|2\d|3[01])\./,
	/^192\.168\./,
	/^0\./,
	/^169\.254\./,
	/^::1$/,
	/^f[cd][0-9a-f]{2}:/,
	/^fe80:/,
];

/**
 * Check if a hostname/IP is a private/internal address.
 * Matches RFC 1918 private ranges, loopback, link-local, and IPv6 private/ULA.
 * @param hostname - Hostname or IP (may include brackets like [::1]).
 * @returns True if the address falls in a private range.
 */
export function isPrivateHostname(hostname: string): boolean {
	const normalized = hostname.replace(/^\[|\]$/g, "").toLowerCase();
	return PRIVATE_IP_PATTERNS.some((pattern) => pattern.test(normalized));
}

/** Result of an outbound restriction check. */
export interface RestrictionCheck {
	allowed: boolean;
	reason?: string;
	honeypot: boolean;
}

/**
 * Check whether an outbound request to a URL is allowed by the restriction config.
 * Supports allow-all, block-private, blocklist, and allowlist modes.
 * @param url - Full URL to check (e.g. "https://example.com/path").
 * @param config - Restriction configuration (mode, blocklist, allowlist, honeypot flag).
 * @returns Check result with allowed flag, reason, and honeypot indicator.
 */
export function checkOutboundRestriction(
	url: string,
	config?: NetworkRestrictionConfig
): RestrictionCheck {
	if (!config || config.mode === "allow-all" || !config.mode) {
		return { allowed: true, honeypot: false };
	}

	let hostname: string;
	try {
		hostname = new URL(url).hostname;
	} catch {
		return { allowed: true, honeypot: false };
	}

	if (config.mode === "block-private" && isPrivateHostname(hostname)) {
		return {
			allowed: false,
			reason: "private address",
			honeypot: config.honeypot ?? false,
		};
	}

	if (config.mode === "blocklist" && config.blocklist) {
		const blocked = config.blocklist.some(
			(entry) => hostname === entry || hostname.endsWith(`.${entry}`)
		);
		if (blocked) {
			return {
				allowed: false,
				reason: "blocklisted",
				honeypot: config.honeypot ?? false,
			};
		}
	}

	if (config.mode === "allowlist" && config.allowlist) {
		const allowed = config.allowlist.some(
			(entry) => hostname === entry || hostname.endsWith(`.${entry}`)
		);
		if (!allowed) {
			return {
				allowed: false,
				reason: "not in allowlist",
				honeypot: config.honeypot ?? false,
			};
		}
	}

	return { allowed: true, honeypot: false };
}

const HONEYPOT_HTML = `<!DOCTYPE html>
<html>
<head><title>Welcome to nginx!</title></head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed.</p>
</body>
</html>`;

/**
 * Generate a fake nginx HTTP response for honeypot mode.
 * Returns a 200 OK with nginx-style headers and a generic welcome page,
 * masking the fact that the target is a virtual sandbox.
 * @param _url - Original request URL (unused, kept for API consistency).
 * @returns A Response object mimicking a real nginx server.
 */
export function honeypotResponse(_url: string): Response {
	return new Response(HONEYPOT_HTML, {
		status: 200,
		statusText: "OK",
		headers: {
			"content-type": "text/html",
			server: "nginx/1.24.0",
			date: new Date().toUTCString(),
		},
	});
}
