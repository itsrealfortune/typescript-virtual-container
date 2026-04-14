import type { ShellModule } from '../../types/commands';

export function createHelpCommand(getNames: () => string[]): ShellModule {
  return {
    name: 'help',
    params: [],
    run: () => ({ stdout: `Builtins: ${getNames().join(' ')}`, exitCode: 0 })
  };
}
