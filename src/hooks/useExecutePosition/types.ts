import { Address } from 'viem';

import { BigNumberish, ExecutableRoute, LoadingState, Position, TransferMethods } from '../../types';

type TransactionFunc = () => Promise<any> | void;

export type UseExecuteShortcutPayload = {
  executionDetails?: {
    route: ExecutableRoute & {
      execute: TransactionFunc;
    };
    approvals?: {
      token: Address;
      amount: BigNumberish;
      execute: TransactionFunc;
    }[];
    transfers?: {
      token: Address;
      amount: BigNumberish;
      execute: TransactionFunc;
    }[];
  };
  executeRoute: TransactionFunc;
  executeApprovalsOrTransfers: TransactionFunc;
  errorMessage?: string;
  hasRoute: boolean;
  hasApprovalsOrTransfers: boolean;
  status: LoadingState;
};

export type UseExecutePositionArgs = {
  position: Position | undefined;
  chainId?: number;
  executor?: Address;
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
  transferMethod?: TransferMethods;
};
