import type { ShellModule } from '../../types/commands';

export const hostnameCommand: ShellModule = {
  name: 'hostname',
  params: [],
  run: () => ({ stdout: 'typescript-vm', exitCode: 0 })
};