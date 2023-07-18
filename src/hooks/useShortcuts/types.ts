import { Address } from 'viem';

import { LoadingState, MetaPosition, ProtocolName, Shortcut } from '../../types';

export type UseShortcutPayload = {
  data: MetaPosition[];
  status: LoadingState;
};

export type UseShortcutArgs = {
  chain?: number;
  token?: Address;
  protocol?: ProtocolName;
};
