import type { ShellProperties } from "../VirtualShell";
import { formatLoginDate } from "./loginFormat";

export interface LoginBannerState {
	at: string;
	from: string;
}

export function buildLoginBanner(
	hostname: string,
	properties: ShellProperties,
	lastLogin: LoginBannerState | null,
): string {
	const lines = [
		`Linux ${hostname} ${properties.kernel} ${properties.arch}`,
		"",
		"The programs included with the Fortune GNU/Linux system are free software;",
		"the exact distribution terms for each program are described in the",
		"individual files in /usr/share/doc/*/copyright.",
		"",
		"Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent",
		"permitted by applicable law.",
	];

	if (lastLogin) {
		const when = new Date(lastLogin.at);
		const displayed = Number.isNaN(when.getTime())
			? lastLogin.at
			: formatLoginDate(when);
		lines.push(`Last login: ${displayed} from ${lastLogin.from || "unknown"}`);
	}

	lines.push("");

	return `${lines.map((line) => `${line}\r\n`).join("")}`;
}