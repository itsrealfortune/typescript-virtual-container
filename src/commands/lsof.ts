import type { ShellModule } from "../types/commands";

/**
 * List open files (stub — returns simulated process file descriptors).
 * @category system
 */
export const lsofCommand: ShellModule = {
	name: "lsof",
	description: "List open files",
	category: "system",
	params: ["[-p <pid>] [-u <user>] [-i [addr]]"],
	run: ({ authUser, args }) => {
		const iNet = args.includes("-i");
		if (iNet) {
			const header = "COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME";
			const rows = [
				`sshd       1234     root    3u  IPv4  12345      0t0  TCP *:22 (LISTEN)`,
				`nginx       567     root    6u  IPv4  23456      0t0  TCP *:80 (LISTEN)`,
			];
			return { stdout: `${header}\n${rows.join("\n")}`, exitCode: 0 };
		}
		const header = "COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME";
		const rows = [
			`bash      1001 ${authUser}  cwd    DIR    8,1     4096    2 /home/${authUser}`,
			`bash      1001 ${authUser}  txt    REG    8,1  1183448   23 /bin/bash`,
			`bash      1001 ${authUser}    0u   CHR  136,0      0t0    3 /dev/pts/0`,
			`bash      1001 ${authUser}    1u   CHR  136,0      0t0    3 /dev/pts/0`,
			`bash      1001 ${authUser}    2u   CHR  136,0      0t0    3 /dev/pts/0`,
		];
		return { stdout: `${header}\n${rows.join("\n")}`, exitCode: 0 };
	},
};
