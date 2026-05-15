import type { ShellModule } from "../types/commands";

export const idCommand: ShellModule = {
	name: "id",
	description: "Print user identity",
	category: "system",
	params: ["[user]"],
	run: ({ authUser, shell, args }) => {
		const flagU = args.includes("-u");
		const flagG = args.includes("-g");
		const flagN = args.includes("-n");
		const target = args.find(a => !a.startsWith("-")) ?? authUser;
		const uid = target === "root" ? 0 : 1000;
		const gid = uid;
		const isSudo = shell.users.isSudoer(target);
		const groups = isSudo ? `${gid}(${target}),0(root)` : `${gid}(${target})`;
		if (flagU) return { stdout: flagN ? target : String(uid), exitCode: 0 };
		if (flagG) return { stdout: flagN ? target : String(gid), exitCode: 0 };
		return {
			stdout: `uid=${uid}(${target}) gid=${gid}(${target}) groups=${groups}`,
			exitCode: 0,
		};
	},
};
