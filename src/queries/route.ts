import queryString from 'query-string';
import { ENSO_API } from 'src/constants';
import { BigNumberish, ExecutableRoute } from 'src/types';
import { manyBigIntParseToString } from 'src/utils/bigint';
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
  const route = (await routeResponse.json()) as ExecutableRoute;
  if (!route.tx) {
    throw new Error((route as any).error && (route as any).message ? (route as any).message : 'No valid response');
  }
  return route;
};
