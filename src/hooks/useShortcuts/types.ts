import { Address } from 'viem';

import { LoadingState, ProtocolName, Shortcut } from '../../types';

export type UseShortcutPayload = {
  data: Shortcut[];
  status: LoadingState;
};

export type UseShortcutArgs = {
  chain?: number;
  token?: Address;
  protocol: ProtocolName;
};
