import { useCallback, useContext, useMemo } from 'react';
import { useQuery } from 'react-query';

import { UseDeFiContext } from '../../provider/UseDeFiProvider';
import { queryRouteWithApprovals, QueryRouteWithApprovalsOptions } from '../../queries/route';
import { formatTransaction } from '../../utils/formatTransaction';
import { getTokenAddressFromPosition } from '../../utils/position';
import { useDeFiWalletClient } from '../internal/useDeFiWalletClient';
import { useExecutor } from '../internal/useExecutor';
import { useLoadingStateFromQuery } from '../internal/useLoadingStateFromQuery';

import { UseExecutePositionArgs, UseExecuteShortcutPayload } from './types';

/**
 * Prepares a position for execution, returning details about route being taken, approvals and transfers that need to be run before.
 */
export const useExecutePosition = (args?: UseExecutePositionArgs): UseExecuteShortcutPayload => {
  const { data: executor } = useExecutor();
  const walletClient = useDeFiWalletClient();
  const context = useContext(UseDeFiContext);

  const [queryOptions, disabledReason] = useMemo((): [
    QueryRouteWithApprovalsOptions | undefined,
    string | undefined,
  ] => {
    if (!args) return [undefined, 'No arguments to hook'];
    if (!args.position) return [undefined, undefined]; // No error message, simply means positions aren't loaded yet
    if (!context.apiKey) return [undefined, 'No API key'];
    if (!args.tokenIn) return [undefined, 'No tokenIn'];
    if (!args.amountIn) return [undefined, 'No amount specified'];

    const positionToken = getTokenAddressFromPosition(args.position);
    if (!positionToken) return [undefined, 'No position token'];
    if (!executor) return [undefined, 'Not connected'];

    return [
      {
        apiKey: context.apiKey,
        transferMethod: args.options?.transferMethod ?? 'APPROVE_TRANSFERFROM',
        chainId: args.position.chainId,
        executor,
        amountIn: args.amountIn,
        tokenIn: args.tokenIn,
        tokenOut: positionToken as `0x${string}`,
      },
      undefined,
    ];
  }, [args, context.apiKey, executor]);

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
    return formatTransaction(routeQueryResponse.route.tx);
  }, [routeQueryResponse]);

  const executeRoute = useCallback(async () => {
    if (!preparedTransaction) throw new Error('No route execution transaction available');
    return walletClient?.sendTransaction(preparedTransaction);
  }, [preparedTransaction, walletClient]);

  const executeApprovalsOrTransfers = useCallback(() => {
    const transactionFuncs = routeQueryResponse?.approvals?.map(
      (approvalData) => walletClient?.sendTransaction(formatTransaction(approvalData.tx)),
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
          execute: async () => walletClient?.sendTransaction(formatTransaction(approval.tx)),
        })),
        transfers: routeQueryResponse.transfers?.map((transfer) => ({
          token: transfer.token as `0x${string}`,
          amount: transfer.amount,
          gas: transfer.gas,
          spender: transfer.spender,
          execute: async () => walletClient?.sendTransaction(formatTransaction(transfer.tx)),
        })),
      };
    }
  }, [enabledQuery, routeQueryResponse, walletClient, executeRoute]);

  const loadingState = useLoadingStateFromQuery({
    isLoading: routeQueryLoading,
    data: routeQueryResponse,
    error: routeQueryError,
  });
  console.log(routeQueryError);
  return {
    status: loadingState,
    hasRoute: !enabledQuery || !routeQueryResponse,
    hasApprovalsOrTransfers: !!(
      enabledQuery &&
      routeQueryResponse?.approvals &&
      routeQueryResponse?.approvals?.length > 0
    ),
    errorMessage: routeQueryError ? (routeQueryError as any).toString() : disabledReason,
    executionDetails: executionDetails,
    executeRoute,
    executeApprovalsOrTransfers,
  };
};
