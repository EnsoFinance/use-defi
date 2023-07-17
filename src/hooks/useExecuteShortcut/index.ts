import { UseExecuteShortcutArgs, UseExecuteShortcutPayload } from './types';

export const useExecuteShortcut = (args: UseExecuteShortcutArgs): UseExecuteShortcutPayload => {
  return {
    status: 'idle',
    mutate: () => {},
    simulationPayload: undefined,
  };
};
