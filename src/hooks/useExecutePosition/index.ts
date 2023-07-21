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
        transferMethod: args.options?.transferMethod ?? 'APPROVE_TRANSFERFROM',
        chainId: args.position.chainId,
        executor: defaultedExecutor as Address,
        amountIn: args.amountIn,
        tokenIn: args.tokenIn,
        tokenOut: positionToken,
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
    staleTime: 1000 * 60 * 10,
    notifyOnChangeProps: ['data', 'error'],
    retry: false,
  });

  const preparedTransaction = useMemo(() => {
    if (!routeQueryResponse || routeQueryResponse.status === 'error' || !routeQueryResponse.route) return undefined;
    console.log(routeQueryResponse.route.tx);
    return {
      to: routeQueryResponse.route.tx.to,
      data: routeQueryResponse.route.tx.data,
      value: BigInt(routeQueryResponse.route.tx.value) ?? BigInt(0),
    };
  }, [routeQueryResponse]);

  const executeRoute = useCallback(async () => {
    if (!preparedTransaction) throw new Error('No route execution transaction available');
    return sendTransaction(preparedTransaction);
  }, [preparedTransaction]);

  const executeApprovalsOrTransfers = useCallback(() => {
    const transactionFuncs = routeQueryResponse?.approvals?.map((approvalData) =>
      sendTransaction({
        ...approvalData.tx,
        value: approvalData.tx.value ? BigInt(approvalData.tx.value) : undefined,
      }),
    );

    if (!transactionFuncs) return;

    return Promise.all(transactionFuncs);
  }, [routeQueryResponse]);

  const executionDetails = useMemo((): UseExecuteShortcutPayload['executionDetails'] => {
    if (enabledQuery && routeQueryResponse && routeQueryResponse.route) {
      return {
        route: {
          ...routeQueryResponse.route,
          execute: executeRoute,
        },
        approvals: routeQueryResponse.approvals?.map((approval) => ({
          token: approval.token,
          amount: approval.amount,
          gas: approval.gas,
          spender: approval.spender,
          execute: async () =>
            sendTransaction({
              ...approval.tx,
              value: approval.tx.value ? BigInt(approval.tx.value) : undefined,
            }),
        })),
        transfers: routeQueryResponse.transfers?.map((transfer) => ({
          token: transfer.token,
          amount: transfer.amount,
          gas: transfer.gas,
          spender: transfer.spender,
          execute: async () =>
            sendTransaction({
              ...transfer.tx,
              value: transfer.tx.value ? BigInt(transfer.tx.value) : undefined,
            }),
        })),
      };
    }
  }, [enabledQuery, routeQueryResponse, sendTransaction]);

  const loadingState = useLoadingStateFromQuery({
    isLoading: routeQueryLoading,
    data: routeQueryResponse,
    error: routeQueryError,
  });

  console.log(loadingState, routeQueryResponse);

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
