import { Address } from 'viem';

import { API_CrossChainResponse } from '../../types/api';
import { BigNumberish, LoadingState, TransactionFunc } from '../../types/enso';

export type UseCrossChainRouteArgs = {
  sourceChainId: number;
  destinationChainId: number;
  tokenIn: Address;
  tokenOut: Address;
  amountIn: BigNumberish;
  options?: {
    slippage?: BigNumberish;
  };
};

export type UseCrossChainRoutePayload = {
  status: LoadingState;
  errorMessage?: string;
  tx?: API_CrossChainResponse['tx'];
  execute: TransactionFunc;
};
