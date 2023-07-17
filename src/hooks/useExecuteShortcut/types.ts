import { Address } from 'viem';

import { BigNumberish, LoadingState, ProtocolName } from '../../types';

export type UseExecuteShortcutPayload = {
  mutate: () => any;
  status: LoadingState;
  simulationPayload?: SimulationPayload;
};

export type SimulationPayload = {
  amountOut: string;
  gas: number;
  priceImpact: number;
  hops: Hop[];
};

export type UseExecuteShortcutArgs = {
  executor: Address;
  positionId: string;
  options?: UseExecuteShortcutArgsOptions;
} & (
  | {
      tokensIn: Address[];
      amounts: BigNumberish[];
    }
  | {
      tokenIn: Address;
      amount: BigNumberish;
    }
);

export type UseExecuteShortcutArgsOptions = {
  slippage?: number;
  priceImpact?: number;
  chainId?: number;
};

export type Hop = {
  action: 'deposit' | 'withdraw' | 'swap' | string;
  protocol: ProtocolName;
};
