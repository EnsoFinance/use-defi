import { queryApprove, QueryApproveResponse } from 'src/queries/approve';
import { queryApprovals } from 'src/queries/approve';
import { queryRoute } from 'src/queries/route';
import { BigNumberish, EnsoTransaction, ExecutableRoute, LoadingState } from 'src/types';
import { addressCompare, isNativeToken } from 'src/utils/address';
import { Address } from 'viem';

export type QueryRouteWithApprovalsOptions = {
  chainId: number;
  executor: Address;
  amountIn: BigNumberish | BigNumberish[];
  tokenIn: Address | Address[];
  tokenOut: Address;
  apiKey: string;
};

export type QueryRouteWithApprovalsResponse = {
  status: LoadingState;
  errorMessage: string | null;
  route?: ExecutableRoute;
  approvals?: QueryApproveResponse[];
  transfers?: {
    tx: EnsoTransaction;
    gas: string;
    token: Address;
    amount: string;
    spender: Address;
  };
};

export const queryRouteWithApprovals = async (
  options: QueryRouteWithApprovalsOptions,
): Promise<QueryRouteWithApprovalsResponse> => {
  const { chainId, executor, amountIn, tokenIn, tokenOut, apiKey } = options;

  if (Array.isArray(amountIn) != Array.isArray(tokenIn))
    throw new Error(
      Array.isArray(tokenIn)
        ? 'Both tokenIn and amountIn must be an Array'
        : 'Both tokenIn and amountIn must not be an array',
    );

  const route = await queryRoute({
    chainId,
    fromAddress: executor,
    amountIn,
    tokenIn,
    tokenOut,
    apiKey,
  });

  if (!route) return { status: 'error', errorMessage: 'No route was found' };

  const approvals = await queryApprovals({ fromAddress: executor, chainId });

  // Calculate approvals
  let approvalAmountsNeeded: Record<string, BigNumberish> = {};

  (Array.isArray(tokenIn) ? tokenIn : [tokenIn]).forEach((token, index) => {
    if (!isNativeToken(token)) {
      const amount = Array.isArray(amountIn) ? amountIn[index] : amountIn;

      if (!approvals) {
        // No other approvals found, use maximum amount
        approvalAmountsNeeded[token] = amount;
      } else {
        const approvalRecord = approvals.find(({ token: approvedToken }) => addressCompare(approvedToken, token));

        if (!approvalRecord) {
          // No specific record for this token, use maximum amount
          approvalAmountsNeeded[token] = amount;
        } else {
          // Has existing approval, check for top-up
          const remainder = BigInt(approvalRecord.amount) - BigInt(amount);

          if (remainder < 0) {
            approvalAmountsNeeded[token] = -remainder;
          }
        }
      }
    }
  });

  const approvalTransactions = await Promise.all(
    Object.entries(approvalAmountsNeeded).map(async ([token, amount]) => {
      // TODO: Some of these could fail?
      return await queryApprove({ fromAddress: executor, tokenAddress: token as Address, amount: amount });
    }),
  );

  return {
    route,
    approvals: approvalTransactions.filter((a) => a !== undefined) as QueryApproveResponse[],
    status: 'success',
    errorMessage: null,
  };
};
