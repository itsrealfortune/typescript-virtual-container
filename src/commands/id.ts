import type { ShellModule } from "../types/commands";

export const idCommand: ShellModule = {
	name: "id",
	description: "Print user identity",
	category: "system",
	params: ["[user]"],
	run: ({ authUser, shell, args }) => {
		const target = args[0] ?? authUser;
		const uid = target === "root" ? 0 : 1000;
		const gid = uid;
		const isSudo = shell.users.isSudoer(target);
		const groups = isSudo ? `${gid}(${target}),0(root)` : `${gid}(${target})`;
		return {
			stdout: `uid=${uid}(${target}) gid=${gid}(${target}) groups=${groups}`,
			exitCode: 0,
		};
	},
};
