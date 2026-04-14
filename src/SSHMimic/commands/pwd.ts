import type { ShellModule } from '../../types/commands';

export const pwdCommand: ShellModule = {
  name: 'pwd',
  params: [],
  run: ({ cwd }) => ({ stdout: cwd, exitCode: 0 })
};