import { useCallback, useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import { UseDeFiContext } from 'src/provider/UseDeFiProvider';
import { useAccount, useSendTransaction } from 'wagmi';

import { queryRoute, QueryRouteParams } from '../../utils/queries';
import { useLoadingStateFromQuery } from '../internal/useLoadingStateFromQuery';

import { UseExecuteShortcutArgs, UseExecuteShortcutPayload } from './types';

export const useExecuteShortcut = (args?: UseExecuteShortcutArgs): UseExecuteShortcutPayload => {
  const fallbackExecutorQuery = useAccount();

  const context = useContext(UseDeFiContext);

  const [queryOptions, disabledReason] = useMemo((): [QueryRouteParams | undefined, string | undefined] => {
    if (!args) return [undefined, 'No arguments to hook'];
    if (!context.apiKey) return [undefined, 'No API key'];
    if (!args.shortcut) return [undefined, 'No shortcut'];

    const fallbackExecutor = fallbackExecutorQuery.isConnected ? fallbackExecutorQuery.address : undefined;
    const defaultedExecutor = args.executor ?? fallbackExecutor;
    if (!defaultedExecutor) return [undefined, 'No executor passed or available from WalletClient'];

    return [
      {
        apiKey: context.apiKey,
        chainId: args.shortcut.chainId,
        fromAddress: defaultedExecutor,
        amountIn: args.amountIn,
        tokenIn: args.tokenIn,
        tokenOut: args.shortcut.tokenAddress,
      },
      undefined,
    ];
  }, [args, context.apiKey, fallbackExecutorQuery]);

  const enabledQuery = typeof queryOptions !== 'undefined';
  const { isLoading, data, error } = useQuery(
    'useExecuteShortcut',
    async () => (enabledQuery ? queryRoute(queryOptions) : undefined),
    {
      enabled: enabledQuery,
    },
  );

  const preparedTransaction = useMemo(() => {
    if (!data) return undefined;

    return {
      to: data.tx.to,
      data: data.tx.data,
      value: BigInt(data.tx.value) ?? BigInt(0),
    };
  }, [data]);
  const { sendTransaction } = useSendTransaction(preparedTransaction);
  const mutate = useCallback(async () => {
    if (!data) throw new Error('No route found');

    return sendTransaction();
  }, []);

  const loadingState = useLoadingStateFromQuery({ isLoading, data, error });
  console.log(loadingState, disabledReason);
  return {
    status: loadingState,
    mutate,
    executionDetails: data,
  };
};
