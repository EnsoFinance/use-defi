import { Address } from 'viem';

import { ENSO_API } from '../constants';
import { API_RouteOptions, ExecutableRoute } from '../types/api';
import { API_Response, BigNumberish } from '../types/enso';
import { manyBigIntParseToString } from '../utils/bigint';
import { parseApiErrorOrReturn } from '../utils/parseApiError';

export type QueryRouteOptions = {
  chainId: number;
  fromAddress: Address;
  amountIn: BigNumberish | BigNumberish[];
  tokenIn: Address | Address[];
  tokenOut: Address;
  approve?: boolean;
  transfer?: boolean;
  apiKey: string;
};
export type QueryRouteResponse = ExecutableRoute;

export const getEnsoApiBundleRoute = async (options: QueryRouteOptions): Promise<QueryRouteResponse | undefined> => {
  const queryParams = {
    chainId: String(options.chainId),
    fromAddress: options.fromAddress,
  };

  const routeAction = {
    protocol: 'enso',
    action: 'route',
    args: {
      fromAddress: options.fromAddress,
      amountIn: manyBigIntParseToString(Array.isArray(options.amountIn) ? options.amountIn : [options.amountIn]).join(
        ',',
      ),
      tokenIn: (Array.isArray(options.tokenIn) ? options.tokenIn : [options.tokenIn]).join(','),
      tokenOut: options.tokenOut,
    } as API_RouteOptions,
  };

  if (options.approve) {
    routeAction.args = {
      ...routeAction.args,

      tokenInAmountToApprove: manyBigIntParseToString(
        Array.isArray(options.amountIn) ? options.amountIn : [options.amountIn],
      ).join(','),
    };
  }

  if (options.transfer) {
    routeAction.args = {
      ...routeAction.args,

      tokenInAmountToTransfer: manyBigIntParseToString(
        Array.isArray(options.amountIn) ? options.amountIn : [options.amountIn],
      ).join(','),
    };
  }

  const actions = [routeAction];

  const response = await fetch(`${ENSO_API}/api/v1/shortcuts/bundle?${new URLSearchParams(queryParams)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${options.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(actions),
  });

  const data = await response.json();

  return parseApiErrorOrReturn(data);
};
