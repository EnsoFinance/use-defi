import { useCallback, useMemo } from 'react';
import { useQuery } from 'react-query';

import { getEnsoApiMultichainRoute } from '../../api/multichain';
import { API_MultichainOptions } from '../../types/api';
import { useDeFiContext } from '../internal/useDeFiContext';
import { useDeFiWalletClient } from '../internal/useDeFiWalletClient';
import { useExecutor } from '../internal/useExecutor';

import { UseMultichainRouteArgs, UseMultichainRoutePayload } from './types';

type QueryOptionsWithError = [API_MultichainOptions | undefined, string | undefined];

export const useMultichainRoute = (args: UseMultichainRouteArgs | undefined): UseMultichainRoutePayload => {
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

  const { data, status, error } = useQuery('useMultichainRoute', async () => getEnsoApiMultichainRoute(queryOptions!), {
    enabled: !!queryOptions,
  });

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
