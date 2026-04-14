import type { ShellModule } from '../../types/commands';

export const hostnameCommand: ShellModule = {
  name: 'hostname',
  params: [],
  run: ({ hostname }) => ({ stdout: hostname, exitCode: 0 })
};