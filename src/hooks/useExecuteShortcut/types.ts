import { Provider } from '@ethersproject/providers';
import { RouteQueryResponse } from 'src/utils/queries';
import { Address } from 'viem';
import { WalletClient } from 'wagmi';

import { BigNumberish, LoadingState, MetaPosition, ProtocolName } from '../../types';

export type UseExecuteShortcutPayload = {
  mutate: () => any;
  status: LoadingState;
  executionDetails?: RouteQueryResponse;
};

// export type SimulationPayload = {
//   amountOut: string;
//   gas: number;
//   priceImpact: number;
//   hops: Hop[];
// };

export type UseExecuteShortcutArgs = {
  executor?: Address;
  shortcut: MetaPosition | undefined;
  options?: UseExecuteShortcutArgsOptions;
} & (
  | {
      tokenIn: Address[];
      amountIn: BigNumberish[];
    }
  | {
      tokenIn: Address;
      amountIn: BigNumberish;
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
