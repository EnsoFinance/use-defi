import { queryApprove } from 'src/queries/approve';
import { queryApprovals } from 'src/queries/approve';
import { queryRoute } from 'src/queries/route';
import { ApproveTransaction, ExecutableRoute, TransferTransaction } from 'src/types/api';
import { BigNumberish, LoadingState, TransferMethods } from 'src/types/enso';
import { addressCompare, isNativeToken } from 'src/utils/address';
import { Address } from 'viem';

export type QueryRouteWithApprovalsOptions = {
  chainId: number;
  executor: Address;
  transferMethod: TransferMethods;
  amountIn: BigNumberish | BigNumberish[];
  tokenIn: Address | Address[];
  tokenOut: Address;
  apiKey: string;
};

export type QueryRouteWithApprovalsResponse = {
  status: LoadingState;
  errorMessage: string | null;
  route: ExecutableRoute | null;
  approvals?: ApproveTransaction[] | null;
  transfers?: TransferTransaction[] | null;
};

export const queryRouteWithApprovals = async (
  options: QueryRouteWithApprovalsOptions,
): Promise<QueryRouteWithApprovalsResponse> => {
  const { chainId, executor, amountIn, tokenIn, tokenOut, apiKey, transferMethod } = options;

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

  if (!route) return { status: 'error', errorMessage: 'No route was found', route: null };

  let approvals: ApproveTransaction[] | null = null;
  let transfers: TransferTransaction[] | null = null;

  if (transferMethod === 'APPROVE_TRANSFERFROM') {
    const allowances = await queryApprovals({ fromAddress: executor, chainId });

    // Calculate approvals
    let approvalAmountsNeeded: Record<string, BigNumberish> = {};

    (Array.isArray(tokenIn) ? tokenIn : [tokenIn]).forEach((token, index) => {
      if (!isNativeToken(token)) {
        const amount = Array.isArray(amountIn) ? amountIn[index] : amountIn;

        if (!allowances) {
          // No other approvals found, use maximum amount
          approvalAmountsNeeded[token] = amount;
        } else {
          const approvalRecord = allowances.find(({ token: approvedToken }) => addressCompare(approvedToken, token));

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

    approvals = (
      await Promise.all(
        Object.entries(approvalAmountsNeeded).map(async ([token, amount]) => {
          // TODO: Some of these could fail?
          return await queryApprove({
            fromAddress: executor,
            tokenAddress: token as Address,
            amount: amount.toString(),
          });
        }),
      )
    ).filter((a) => a !== undefined) as ApproveTransaction[];
  } else {
    throw new Error(`${transferMethod} not implemented`);
  }

  return {
    route,
    approvals,
    status: 'success',
    errorMessage: null,
  };
};
