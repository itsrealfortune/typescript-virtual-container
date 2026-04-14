import type { ShellModule } from "../../types/commands";
import { fetchResource, parseOutputPath, resolvePath } from "./helpers";

export const curlCommand: ShellModule = {
	name: "curl",
	params: ["[-o file] <url>"],
	run: async ({ vfs, cwd, args }) => {
		const { outputPath, inputArgs } = parseOutputPath(args);
		const url = inputArgs[0];

		if (!url) {
			return { stderr: "curl: missing URL", exitCode: 1 };
		}

		const result = await fetchResource(url);
		if (result.status >= 400) {
			return { stderr: `curl: HTTP ${result.status}`, exitCode: 22 };
		}

		if (outputPath) {
			vfs.writeFile(resolvePath(cwd, outputPath), result.text);
			return { exitCode: 0 };
		}

		return { stdout: result.text, exitCode: 0 };
	},
};
