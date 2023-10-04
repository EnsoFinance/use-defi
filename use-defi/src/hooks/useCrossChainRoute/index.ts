import { useCallback, useMemo } from 'react';
import { useQuery } from 'wagmi';

import { getEnsoApiCrossChainRoute } from '../../api/multichain';
import { API_CrossChainOptions } from '../../types/api';
import { useDeFiContext } from '../internal/useDeFiContext';
import { useDeFiWalletClient } from '../internal/useDeFiWalletClient';
import { useExecutor } from '../internal/useExecutor';

import { UseCrossChainRouteArgs, UseCrossChainRoutePayload } from './types';

type QueryOptionsWithError = [API_CrossChainOptions | undefined, string | undefined];

export const useCrossChainRoute = (args: UseCrossChainRouteArgs | undefined): UseCrossChainRoutePayload => {
  const { data: executor } = useExecutor();
  const walletClient = useDeFiWalletClient();
  const context = useDeFiContext();

  const [queryOptions, disableReason] = useMemo((): QueryOptionsWithError => {
    if (!args) return [undefined, 'No arguments given to hook'];
    if (!context.apiKey) return [undefined, 'No API key'];
    if (!executor) return [undefined, 'Not connected'];

    return [
      {
        apiKey: context.apiKey,
        sourceChainId: args.sourceChainId,
        destinationChainId: args.destinationChainId,
        tokenIn: args.tokenIn,
        tokenOut: args.tokenOut,
        fromAddress: executor,
        amountIn: args.amountIn.toString(),
        slippage: args.options?.slippage?.toString() ?? '300',
      },
      undefined,
    ];
  }, [args, context, executor]);

  const { data, status, error } = useQuery(
    ['useCrossChainRoute'],
    async () => getEnsoApiCrossChainRoute(queryOptions!),
    {
      enabled: !!queryOptions,
    },
  );

  const preparedTransaction = useMemo(() => {
    if (!data) return undefined;

    return {
      ...data.tx,
      value: data.tx.value ? BigInt(data.tx.value) : undefined,
    };
  }, [data]);

  const execute = useCallback(async () => {
    if (!preparedTransaction) throw new Error('No route execution transaction available');

    return walletClient?.sendTransaction(preparedTransaction);
  }, [walletClient, preparedTransaction]);

  return {
    status,
    execute,
    errorMessage: (error as string) ?? disableReason,
    tx: data?.tx,
  };
};
