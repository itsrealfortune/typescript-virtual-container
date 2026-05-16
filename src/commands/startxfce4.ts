import type { CommandContext, CommandResult, ShellModule } from "../types/commands";

export const startxfce4Command: ShellModule = {
	name: "startxfce4",
	aliases: ["xfce4-session"],
	params: [],
	run(ctx: CommandContext): CommandResult {
		const dm = ctx.shell.desktopManager;
		if (!dm) {
			return { stderr: "startxfce4: desktop is only available in the browser", exitCode: 1 };
		}
		dm.start();
		return { exitCode: 0 };
	},
};
