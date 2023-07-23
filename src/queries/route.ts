import { ENSO_API } from 'constants';
import queryString from 'query-string';
import { ExecutableRoute } from 'types/api';
import { BigNumberish } from 'types/enso';
import { manyBigIntParseToString } from 'utils/bigint';
import { Address } from 'viem';

export type QueryRouteOptions = {
  chainId: number;
  fromAddress: Address;
  amountIn: BigNumberish | BigNumberish[];
  tokenIn: Address | Address[];
  tokenOut: Address;
  apiKey: string;
};
export type QueryRouteResponse = ExecutableRoute;

type APIError = { error: string; message: string; statusCode: number };
type APIResponse = ExecutableRoute | APIError;

export const queryRoute = async (options: QueryRouteOptions): Promise<QueryRouteResponse | undefined> => {
  const queryParams = {
    chainId: options.chainId,
    fromAddress: options.fromAddress,
  };

  const routeAction = {
    protocol: 'enso',
    action: 'route',
    args: {
      amountIn: Array.isArray(options.amountIn)
        ? manyBigIntParseToString(options.amountIn).join(',')
        : BigInt(options.amountIn).toString(10),
      tokenIn: Array.isArray(options.tokenIn) ? options.tokenIn.join(',') : options.tokenIn,
      tokenOut: options.tokenOut,

      tokenInAmountToApprove: Array.isArray(options.amountIn)
        ? manyBigIntParseToString(options.amountIn).join(',')
        : BigInt(options.amountIn).toString(10),
      tokenInAmountToTransfer: Array.isArray(options.amountIn)
        ? manyBigIntParseToString(options.amountIn).join(',')
        : BigInt(options.amountIn).toString(10),
    },
  };

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
