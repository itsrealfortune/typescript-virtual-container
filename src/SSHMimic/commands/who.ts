import type { ShellModule } from '../../types/commands';

export const whoCommand: ShellModule = {
  name: 'who',
  params: [],
  run: ({ authUser }) => ({ stdout: `${authUser} pts/0 2026-04-14 10:00 (localhost)`, exitCode: 0 })
};