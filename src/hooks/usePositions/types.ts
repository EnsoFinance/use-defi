import { Address } from 'viem';

import { LoadingState, Position, ProtocolName } from '../../types';

export type UsePositionsPayload = {
  data?: Position[];
  status: LoadingState;
};

export type UsePositionsArgs = {
  chain?: number;
  token?: Address;
  protocol?: ProtocolName;
};
