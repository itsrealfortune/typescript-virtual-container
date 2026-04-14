import type { ShellModule } from '../../types/commands';

export const deluserCommand: ShellModule = {
  name: 'deluser',
  params: ['<username>'],
  run: async ({ authUser, users, args }) => {
    if (authUser !== 'root') {
      return { stderr: 'deluser: permission denied', exitCode: 1 };
    }

    const [username] = args;
    if (!username) {
      return { stderr: 'deluser: usage: deluser <username>', exitCode: 1 };
    }

    await users.deleteUser(username);
    return { stdout: `deluser: user '${username}' deleted`, exitCode: 0 };
  }
};