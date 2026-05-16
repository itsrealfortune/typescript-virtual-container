import type { CommandContext, CommandResult, ShellModule } from "../types/commands";

export const thunarCommand: ShellModule = {
	name: "thunar",
	params: [],
	run(ctx: CommandContext): CommandResult {
		const dm = ctx.shell.desktopManager;
		if (!dm?.isActive()) {
			return { stderr: "thunar: desktop is not running (start it with startxfce4)", exitCode: 1 };
		}
		const path = ctx.args[0] || ctx.env.vars.HOME || "/root";
		dm.createThunarWindow(path);
		return { exitCode: 0 };
	},
};
