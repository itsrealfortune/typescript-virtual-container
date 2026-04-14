import type { ShellModule } from '../../types/commands';

export const suCommand: ShellModule = {
  name: 'su',
  params: ['- <username>'],
  run: ({ authUser, users, args }) => {
    const filtered = args.filter((arg) => arg !== '-');
    const targetUser = filtered[0];

    if (!targetUser) {
      return { stderr: 'su: missing username', exitCode: 1 };
    }

    if (!users.isSudoer(authUser) && authUser !== 'root') {
      return { stderr: 'su: permission denied', exitCode: 1 };
    }

    if (!users.verifyPassword(targetUser, filtered[1] ?? '') && authUser !== 'root') {
      return { stderr: 'su: authentication failure', exitCode: 1 };
    }

    return {
      switchUser: targetUser,
      nextCwd: `/home/${targetUser}`,
      exitCode: 0
    };
  }
};