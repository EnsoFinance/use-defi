import queryString from 'query-string';
import { Address } from 'viem';

import { ENSO_API } from '../constants';
import { API_RouteOptions, ExecutableRoute } from '../types/api';
import { BigNumberish } from '../types/enso';
import { manyBigIntParseToString } from '../utils/bigint';

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

type APIError = { error: string; message: string; statusCode: number };
type APIResponse = ExecutableRoute | APIError;

export const getEnsoApiRoute = async (options: QueryRouteOptions): Promise<QueryRouteResponse | undefined> => {
  const queryParams = {
    chainId: options.chainId,
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

  const routeResponse = await fetch(`${ENSO_API}/api/v1/shortcuts/bundle?${queryString.stringify(queryParams)}`, {
    body: JSON.stringify([routeAction]),
    method: 'POST',
    headers: {
      Authorization: `Bearer ${options.apiKey}`,
      'Content-Type': 'application/json',
    },
  });
  const route = (await routeResponse.json()) as APIResponse;
  if (!(route as ExecutableRoute).tx) {
    const err = route as APIError;
    throw new Error(err.error && err.message ? err.message : 'No valid response');
  }
  return route as ExecutableRoute;
};
