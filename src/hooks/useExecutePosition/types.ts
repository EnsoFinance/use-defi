import { Address } from 'viem';

import { BigNumberish, ExecutableRoute, LoadingState, Position, ProtocolName } from '../../types';

export type UseExecuteShortcutPayload = {
  executeRoute: () => Promise<any> | void;
  executePreliminary: () => Promise<any> | void;
  status: LoadingState;
  executionDetails?: {
    route: ExecutableRoute;
    approvals: {
      token: Address;
      amount: BigNumberish;
      execute: () => Promise<any> | void;
    }[];
  };
};

export type UseExecutePositionArgs = {
  executor?: Address;
  position: Position | undefined;
  options?: UseExecutePositionArgsOptions;
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

export type UseExecutePositionArgsOptions = {
  slippage?: number;
  priceImpact?: number;
  chainId?: number;
};

export type Hop = {
  action: 'deposit' | 'withdraw' | 'swap' | string;
  protocol: ProtocolName;
};
