import type { CommandContext, CommandResult, ShellModule } from "../types/commands";

export const mousepadCommand: ShellModule = {
	name: "mousepad",
	aliases: ["gedit", "xed"],
	params: ["[file]"],
	description: "Open a text file in the desktop text editor",
	category: "desktop",
	run(ctx: CommandContext): CommandResult {
		const dm = ctx.shell.desktopManager;
		if (!dm) {
			return { stderr: "mousepad: desktop is only available in the browser", exitCode: 1 };
		}
		if (!dm.isActive()) {
			return { stderr: "mousepad: no desktop session running (start with startxfce4)", exitCode: 1 };
		}
		const path = ctx.args[0]
			? ctx.args[0].startsWith("/") ? ctx.args[0] : `${ctx.cwd}/${ctx.args[0]}`
			: "/root/untitled.txt";
		dm.createEditorWindow(path);
		return { exitCode: 0 };
	},
};
