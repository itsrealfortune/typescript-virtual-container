import type { ShellModule } from "../types/commands";

/**
 * Evaluate expressions
 * @category shell
 * @params ["<expression>"]
 */
export const exprCommand: ShellModule = {
	name: "expr",
	description: "Evaluate expressions",
	category: "shell",
	params: ["<expression>"],
	run: ({ args }) => {
		const colonIdx = args.indexOf(":");
		if (colonIdx > 0 && colonIdx <= args.length - 2) {
			const str = args[colonIdx - 1]!;
			const pattern = args[colonIdx + 1]!;
			try {
				const re = new RegExp(pattern);
				const match = str.match(re);
				if (match && match.index !== undefined) {
					return { stdout: `${match[0].length}\n`, exitCode: 0 };
				}
				return { stdout: "0\n", exitCode: 1 };
			} catch {
				return { stderr: "expr: invalid regex\n", exitCode: 2 };
			}
		}

		if (args.length >= 3) {
			const left = parseInt(args[0]!, 10);
			const op = args[1]!;
			const right = parseInt(args[2]!, 10);
			if (isNaN(left) || isNaN(right)) {
				return { stderr: "expr: non-integer argument\n", exitCode: 1 };
			}
			let result: number;
			switch (op) {
				case "+": result = left + right; break;
				case "-": result = left - right; break;
				case "*": result = left * right; break;
				case "/":
					if (right === 0) return { stderr: "expr: division by zero\n", exitCode: 2 };
					result = Math.trunc(left / right);
					break;
				case "%":
					if (right === 0) return { stderr: "expr: division by zero\n", exitCode: 2 };
					result = left % right;
					break;
				default:
					return { stderr: "expr: syntax error\n", exitCode: 2 };
			}
			return { stdout: `${result}\n`, exitCode: 0 };
		}

		return { stderr: "expr: syntax error\n", exitCode: 2 };
	},
};
