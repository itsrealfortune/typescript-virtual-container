import type { ShellModule } from "../../types/commands";
import { getArg } from "./command-helpers";

export const suCommand: ShellModule = {
	name: "su",
	params: ["- <username>"],
	run: ({ authUser, users, args }) => {
		const targetUser = getArg(args, 0, { flags: ["-"] });

		if (!targetUser) {
			return { stderr: "su: missing username", exitCode: 1 };
		}

		if (!users.isSudoer(authUser) && authUser !== "root") {
			return { stderr: "su: permission denied", exitCode: 1 };
		}

		if (
			!users.verifyPassword(targetUser, getArg(args, 1) ?? "") &&
			authUser !== "root"
		) {
			return { stderr: "su: authentication failure", exitCode: 1 };
		}

		return {
			switchUser: targetUser,
			nextCwd: `/home/${targetUser}`,
			exitCode: 0,
		};
	},
};
