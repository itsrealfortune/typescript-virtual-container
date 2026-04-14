import type { ShellModule } from '../../types/commands';

export const exitCommand: ShellModule = {
  name: 'exit',
  params: [],
  run: () => ({ closeSession: true, exitCode: 0 })
};