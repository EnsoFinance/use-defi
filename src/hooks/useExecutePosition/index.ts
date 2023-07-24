import { queryRouteWithApprovals, QueryRouteWithApprovalsOptions } from 'api/route';
import { useCallback, useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useAccount, useWalletClient } from 'wagmi';

import { UseDeFiContext } from '../../provider/UseDeFiProvider';
import { getTokenAddressFromPosition } from '../../utils/position';
import { useLoadingStateFromQuery } from '../internal/useLoadingStateFromQuery';

import { UseExecutePositionArgs, UseExecuteShortcutPayload } from './types';

export const useExecutePosition = (args?: UseExecutePositionArgs): UseExecuteShortcutPayload => {
  const fallbackExecutorQuery = useAccount();
  const { data: walletClient } = useWalletClient();

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
        transferMethod: args.options?.transferMethod ?? 'APPROVE_TRANSFERFROM',
        chainId: args.position.chainId,
        executor: defaultedExecutor,
        amountIn: args.amountIn,
        tokenIn: args.tokenIn,
        tokenOut: positionToken as `0x${string}`,
      },
      undefined,
    ];
  }, [args, context.apiKey, fallbackExecutorQuery]);

  const enabledQuery = typeof queryOptions !== 'undefined';
  const {
    isLoading: routeQueryLoading,
    data: routeQueryResponse,
    error: routeQueryError,
  } = useQuery('useExecuteShortcut', async () => queryRouteWithApprovals(queryOptions!), {
    enabled: enabledQuery,
    staleTime: 1000 * 60 * 2,
    notifyOnChangeProps: ['data', 'error'],
    retry: false,
  });

  const preparedTransaction = useMemo(() => {
    if (!routeQueryResponse || routeQueryResponse.status === 'error' || !routeQueryResponse.route) return undefined;
    return {
      to: routeQueryResponse.route.tx.to as `0x${string}`,
      data: routeQueryResponse.route.tx.data as `0x${string}`,
      value: BigInt(routeQueryResponse.route.tx.value) ?? BigInt(0),
    };
  }, [routeQueryResponse]);

  const executeRoute = useCallback(async () => {
    if (!preparedTransaction) throw new Error('No route execution transaction available');
    return walletClient?.sendTransaction(preparedTransaction);
  }, [preparedTransaction, walletClient]);

  const executeApprovalsOrTransfers = useCallback(() => {
    const transactionFuncs = routeQueryResponse?.approvals?.map(
      (approvalData) =>
        walletClient?.sendTransaction({
          ...approvalData.tx,
          value: approvalData.tx.value ? BigInt(approvalData.tx.value) : undefined,
        }),
    );

    if (!transactionFuncs) return;

    return Promise.all(transactionFuncs);
  }, [routeQueryResponse, walletClient]);

  const executionDetails = useMemo((): UseExecuteShortcutPayload['executionDetails'] => {
    if (enabledQuery && routeQueryResponse && routeQueryResponse.route) {
      return {
        route: {
          ...routeQueryResponse.route,
          execute: executeRoute,
        },
        approvals: routeQueryResponse.approvals?.map((approval) => ({
          token: approval.token as `0x${string}`,
          amount: approval.amount,
          gas: approval.gas,
          spender: approval.spender,
          execute: async () =>
            walletClient?.sendTransaction({
              ...approval.tx,
              value: approval.tx.value ? BigInt(approval.tx.value) : undefined,
            }),
        })),
        transfers: routeQueryResponse.transfers?.map((transfer) => ({
          token: transfer.token as `0x${string}`,
          amount: transfer.amount,
          gas: transfer.gas,
          spender: transfer.spender,
          execute: async () =>
            walletClient?.sendTransaction({
              ...transfer.tx,
              value: transfer.tx.value ? BigInt(transfer.tx.value) : undefined,
            }),
        })),
      };
    }
  }, [enabledQuery, routeQueryResponse, walletClient, executeRoute]);

  const loadingState = useLoadingStateFromQuery({
    isLoading: routeQueryLoading,
    data: routeQueryResponse,
    error: routeQueryError,
  });

  return {
    status: loadingState,
    hasRoute: !enabledQuery || !routeQueryResponse,
    hasApprovalsOrTransfers: !!(
      enabledQuery &&
      routeQueryResponse?.approvals &&
      routeQueryResponse?.approvals?.length > 0
    ),
    errorMessage: disabledReason,
    executionDetails: executionDetails,
    executeRoute,
    executeApprovalsOrTransfers,
  };
};
