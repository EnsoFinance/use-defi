import { sendTransaction } from '@wagmi/core';
import { useCallback, useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import { queryRouteWithApprovals, QueryRouteWithApprovalsOptions } from 'src/api/route';
import { UseDeFiContext } from 'src/provider/UseDeFiProvider';
import { getTokenAddressFromPosition } from 'src/utils/position';
import { Address, useAccount, useSendTransaction } from 'wagmi';

import { useLoadingStateFromQuery } from '../internal/useLoadingStateFromQuery';

import { UseExecutePositionArgs, UseExecuteShortcutPayload } from './types';

export const useExecutePosition = (args?: UseExecutePositionArgs): UseExecuteShortcutPayload => {
  const fallbackExecutorQuery = useAccount();

  const context = useContext(UseDeFiContext);

  const [queryOptions, disabledReason] = useMemo((): [
    QueryRouteWithApprovalsOptions | undefined,
    string | undefined,
  ] => {
    if (!args) return [undefined, 'No arguments to hook'];
    if (!context.apiKey) return [undefined, 'No API key'];
    if (!args.position) return [undefined, 'No position'];

    const positionToken = getTokenAddressFromPosition(args.position);
    if (!positionToken) return [undefined, 'No position token'];

    const fallbackExecutor = fallbackExecutorQuery.isConnected ? fallbackExecutorQuery.address : undefined;
    const defaultedExecutor = args.executor ?? fallbackExecutor;
    if (!defaultedExecutor) return [undefined, 'No executor passed or available from WalletClient'];

    return [
      {
        apiKey: context.apiKey,
        chainId: args.position.chainId,
        executor: defaultedExecutor as Address,
        amountIn: args.amountIn,
        tokenIn: args.tokenIn,
        tokenOut: positionToken,
      },
      undefined,
    ];
  }, [args, context.apiKey, fallbackExecutorQuery]);
  if (disabledReason) console.log(disabledReason);

  const enabledQuery = typeof queryOptions !== 'undefined';
  const {
    isLoading: routeQueryLoading,
    data: routeQueryResponse,
    error: routeQueryError,
  } = useQuery('useExecuteShortcut', async () => (enabledQuery ? queryRouteWithApprovals(queryOptions) : undefined), {
    enabled: enabledQuery,
  });

  const preparedTransaction = useMemo(() => {
    if (!routeQueryResponse || routeQueryResponse.status === 'error' || !routeQueryResponse.route) return undefined;

    return {
      to: routeQueryResponse.route.tx.to,
      data: routeQueryResponse.route.tx.data,
      value: BigInt(routeQueryResponse.route.tx.value) ?? BigInt(0),
    };
  }, [routeQueryResponse]);
  const { sendTransaction: executeRoute } = useSendTransaction(preparedTransaction);

  const executeApprovals = useCallback(() => {
    const transactionFuncs = routeQueryResponse?.approvals?.map((approvalData) =>
      sendTransaction({
        ...approvalData.tx,
        value: BigInt(approvalData.tx.value),
      }),
    );

    if (!transactionFuncs) return;

    return Promise.all(transactionFuncs);
  }, [routeQueryResponse]);

  const loadingState = useLoadingStateFromQuery({
    isLoading: routeQueryLoading,
    data: routeQueryResponse,
    error: routeQueryError,
  });
  return {
    status: loadingState,
    executeRoute,
    executePreliminary: executeApprovals,
  };
};
