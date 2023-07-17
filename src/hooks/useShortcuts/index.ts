import { Address } from 'viem';

import { UseShortcutArgs, UseShortcutPayload } from './types';

export const useShortcuts = (args: UseShortcutArgs): UseShortcutPayload => {
  return {
    status: 'idle',
    data: [],
  };
};
