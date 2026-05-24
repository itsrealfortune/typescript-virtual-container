import type { ShellModule } from "../types/commands";

/**
 * Play ASCII Pac-Man in the terminal (myman-wip-2009-10-30 maze graphics).
 * Controls: WASD or arrow keys to move, Q to quit.
 * @category misc
 * @params [""]
 */
export const pacmanCommand: ShellModule = {
	name: "pacman",
	description: "Play ASCII Pac-Man (myman graphics, WASD/arrows)",
	category: "misc",
	params: [],
	run: () => {
		return { openPacman: true, exitCode: 0 };
	},
};
