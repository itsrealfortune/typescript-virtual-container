import type { ShellModule } from "../types/commands";
import { getFlag, ifFlag } from "./command-helpers";
import { resolvePath } from "./helpers";

/**
 * Stream editor for filtering and transforming text lines.
 * @category text
 * @params ["-e <expr> [file]", "s/pattern/replace/[g]"]
 */
export const sedCommand: ShellModule = {
	name: "sed",
	description: "Stream editor for filtering and transforming text",
	category: "text",
	params: ["-e <expr> [file]", "s/pattern/replace/[g]"],
	run: ({ authUser, shell, cwd, args, stdin }) => {
		const inPlace = ifFlag(args, ["-i"]);
		const expr =
			(getFlag(args, ["-e"]) as string | undefined) ??
			args.find((a) => !a.startsWith("-"));
		const fileArg = args.filter((a) => !a.startsWith("-") && a !== expr).pop();

		if (!expr) return { stderr: "sed: no expression", exitCode: 1 };

		let content = stdin ?? "";
		if (fileArg) {
			const p = resolvePath(cwd, fileArg);
			try {
				content = shell.vfs.readFile(p);
			} catch {
				return {
					stderr: `sed: ${fileArg}: No such file or directory`,
					exitCode: 1,
				};
			}
		}

		// Parse s/from/to/[g]
		const sMatch = expr.match(/^s([^a-zA-Z0-9])(.+?)\1(.*?)\1([gi]*)$/);
		if (!sMatch)
			return { stderr: `sed: unrecognized command: ${expr}`, exitCode: 1 };

		const [, , from, to, flags] = sMatch;
		const regexFlags = (flags ?? "").includes("i")
			? "gi"
			: (flags ?? "").includes("g")
				? "g"
				: "";
		let regex: RegExp;
		try {
			regex = new RegExp(from!, regexFlags || "");
		} catch (_e) {
			return { stderr: `sed: invalid regex: ${from}`, exitCode: 1 };
		}

		const result =
			(flags ?? "").includes("g") || regexFlags.includes("g")
				? content.replace(regex, to ?? "")
				: content.replace(regex, to ?? "");

		if (inPlace && fileArg) {
			const p = resolvePath(cwd, fileArg);
			shell.writeFileAsUser(authUser, p, result);
			return { exitCode: 0 };
		}

		return { stdout: result, exitCode: 0 };
	},
};
