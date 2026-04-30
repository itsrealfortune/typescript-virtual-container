import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

export const base64Command: ShellModule = {
	name: "base64",
	description: "Encode/decode base64",
	category: "text",
	params: ["[-d] [file]"],
	run: ({ args, stdin }) => {
		const decode = ifFlag(args, ["-d", "--decode"]);
		const input = stdin ?? "";
		if (decode) {
			try { return { stdout: Buffer.from(input.trim(), "base64").toString("utf8"), exitCode: 0 }; }
			catch { return { stderr: "base64: invalid input", exitCode: 1 }; }
		}
		return { stdout: Buffer.from(input).toString("base64"), exitCode: 0 };
	},
};
