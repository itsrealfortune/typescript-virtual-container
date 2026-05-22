import type { ShellModule } from "../types/commands";

/**
 * Change user password expiry information.
 * @category users
 * @params ["[-m min_days|-M max_days|-W warn_days|-I inactive_days|-E expire_date|-l] <user>"]
 */
export const chageCommand: ShellModule = {
	name: "chage",
	description: "Change user password expiry information",
	category: "users",
	params: ["[-m min_days|-M max_days|-W warn_days|-I inactive_days|-E expire_date|-l] <user>"],
	run: async ({ authUser, shell, args }) => {
		if (authUser !== "root") {
			return { stderr: "chage: permission denied\n", exitCode: 1 };
		}

		let minDays: number | undefined;
		let maxDays: number | undefined;
		let warnDays: number | undefined;
		let inactiveDays: number | undefined;
		let expiryDate: number | undefined;
		let list = false;
		let username: string | undefined;

		for (let i = 0; i < args.length; i++) {
			const arg = args[i];
			if (!arg) continue;

			if (arg === "-m" && args[i + 1]) {
				minDays = parseInt(args[i + 1], 10);
				if (Number.isNaN(minDays)) {
					return { stderr: `chage: invalid number '${args[i + 1]}'\n`, exitCode: 1 };
				}
				i++;
			} else if (arg === "-M" && args[i + 1]) {
				maxDays = parseInt(args[i + 1], 10);
				if (Number.isNaN(maxDays)) {
					return { stderr: `chage: invalid number '${args[i + 1]}'\n`, exitCode: 1 };
				}
				i++;
			} else if (arg === "-W" && args[i + 1]) {
				warnDays = parseInt(args[i + 1], 10);
				if (Number.isNaN(warnDays)) {
					return { stderr: `chage: invalid number '${args[i + 1]}'\n`, exitCode: 1 };
				}
				i++;
			} else if (arg === "-I" && args[i + 1]) {
				inactiveDays = parseInt(args[i + 1], 10);
				if (Number.isNaN(inactiveDays)) {
					return { stderr: `chage: invalid number '${args[i + 1]}'\n`, exitCode: 1 };
				}
				i++;
			} else if (arg === "-E" && args[i + 1]) {
				if (args[i + 1] === "-1" || args[i + 1] === "99999") {
					expiryDate = 0;
				} else {
					expiryDate = Math.floor(new Date(args[i + 1]).getTime() / 86400000);
					if (Number.isNaN(expiryDate)) {
						return { stderr: `chage: invalid date '${args[i + 1]}'\n`, exitCode: 1 };
					}
				}
				i++;
			} else if (arg === "-l") {
				list = true;
			} else if (!username) {
				username = arg;
			}
		}

		if (!username) {
			return { stderr: "Usage: chage [-m min_days|-M max_days|-W warn_days|-I inactive_days|-E expire_date|-l] <user>\n", exitCode: 1 };
		}

		const users = shell.users.listUsers();
		if (!users.includes(username)) {
			return { stderr: `chage: user '${username}' does not exist\n`, exitCode: 1 };
		}

		if (list) {
			const aging = shell.users.getPasswordAging(username);
			if (!aging) {
				return { stderr: `chage: user '${username}' not found\n`, exitCode: 1 };
			}

			const formatDate = (days: number): string => {
				if (days === 0) return "never";
				return new Date(days * 86400000).toISOString().split("T")[0];
			};

			const lastChangeDate = formatDate(aging.lastChange);
			const maxAgeDate = aging.maxAge === 99999 ? "never" : formatDate(aging.lastChange + aging.maxAge);
			const warnDate = aging.warnDays > 0 ? formatDate((aging.lastChange + aging.maxAge) - aging.warnDays) : "never";
			const inactiveDate = aging.inactiveDays > 0 ? formatDate((aging.lastChange + aging.maxAge) + aging.inactiveDays) : "never";
			const expiryDateStr = formatDate(aging.expiryDate);

			return {
				stdout: [
					`Last password change                                    : ${lastChangeDate}`,
					`Password expires                                        : ${maxAgeDate}`,
					`Password inactive                                       : ${inactiveDate}`,
					`Account expires                                         : ${expiryDateStr}`,
					`Minimum number of days between password change          : ${aging.minAge}`,
					`Maximum number of days between password change          : ${aging.maxAge}`,
					`Number of days of warning before password expires       : ${aging.warnDays}`,
				].join("\n") + "\n",
				exitCode: 0,
			};
		}

		try {
			await shell.users.setPasswordAging(username, minDays, maxDays, warnDays, inactiveDays);
			if (expiryDate !== undefined) {
				await shell.users.setAccountExpiry(username, expiryDate);
			}
			return { stdout: `chage: password aging updated for '${username}'\n`, exitCode: 0 };
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			return { stderr: `${msg}\n`, exitCode: 1 };
		}
	},
};
