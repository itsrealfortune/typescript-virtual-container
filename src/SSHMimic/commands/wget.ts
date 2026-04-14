import type { ShellModule } from "../../types/commands";
import {
	fetchResource,
	parseOutputPath,
	resolvePath,
	stripUrlFilename,
} from "./helpers";

export const wgetCommand: ShellModule = {
	name: "wget",
	params: ["[url]"],
	run: async ({ vfs, cwd, args }) => {
		const { outputPath, inputArgs } = parseOutputPath(args);
		const url = inputArgs[0];

		if (!url) {
			return { stderr: "wget: missing URL", exitCode: 1 };
		}

		const result = await fetchResource(url);
		if (result.status >= 400) {
			return { stderr: `wget: HTTP ${result.status}`, exitCode: 8 };
		}

		const target = resolvePath(cwd, outputPath ?? stripUrlFilename(url));
		vfs.writeFile(target, result.text);

		return {
			stdout: `saved ${target}`,
			exitCode: 0,
		};
	},
};
