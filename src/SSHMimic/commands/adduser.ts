import type { ShellModule } from '../../types/commands';

export const adduserCommand: ShellModule = {
  name: 'adduser',
  params: ['<username> <password>'],
  run: async ({ authUser, users, args }) => {
    if (authUser !== 'root') {
      return { stderr: 'adduser: permission denied', exitCode: 1 };
    }

    const [username, password] = args;
    if (!username || !password) {
      return { stderr: 'adduser: usage: adduser <username> <password>', exitCode: 1 };
    }

    await users.addUser(username, password);
    return { stdout: `adduser: user '${username}' created`, exitCode: 0 };
  }
};