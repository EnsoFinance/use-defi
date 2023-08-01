import { Address } from 'viem';

import { API_MultichainResponse } from '../../types/api';
import { BigNumberish, LoadingState, TransactionFunc } from '../../types/enso';

export type UseMultichainRouteArgs = {
  sourceChainId: number;
  destinationChainId: number;
  tokenIn: Address;
  tokenOut: Address;
  amountIn: BigNumberish;
  options?: {
    slippage?: BigNumberish;
  };
};

export type UseMultichainRoutePayload = {
  status: LoadingState;
  errorMessage?: string;
  tx?: API_MultichainResponse['tx'];
  execute: TransactionFunc;
};
