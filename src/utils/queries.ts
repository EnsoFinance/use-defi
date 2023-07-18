import queryString from 'query-string';
import { BigNumberish, MetaPosition } from 'src/types';
import { Address } from 'viem';

import { ENSO_API, USE_POSITIONS_DATA_SOURCE } from '../constants';

import { manyBigIntParseToString } from './bigint';

export const queryShortcuts = async () => {
  const response = await fetch(USE_POSITIONS_DATA_SOURCE);

  return (await response.json()) as MetaPosition[];
};

export type QueryRouteParams = {
  apiKey: string;
  chainId: number;
  fromAddress: Address;
  amountIn: BigNumberish | BigNumberish[];
  tokenIn: Address | Address[];
  tokenOut: Address;
};

export type RouteQueryResponse = {
  amountOut: string;
  createdAt: number;
  gas: number;
  route: {
    action: string;
    protocol: string;
    tokenIn: string;
    tokenOut: string;
    positionInId: string;
    positionOutId: string;
  }[];
  tx: {
    data: Address;
    from: Address;
    to: Address;
    value: string;
  };
};

export const queryRoute = async (options: QueryRouteParams) => {
  const queryParams = {
    chainId: options.chainId,
    fromAddress: '0x9008d19f58aabd9ed0d60971565aa8510560ab41',
    amountIn: Array.isArray(options.amountIn)
      ? manyBigIntParseToString(options.amountIn).join(',')
      : BigInt(options.amountIn).toString(10),
    tokenIn: Array.isArray(options.tokenIn) ? options.tokenIn.join(',') : options.tokenIn,
    tokenOut: options.tokenOut,
    tokenInAmountToTransfer: Array.isArray(options.amountIn)
      ? manyBigIntParseToString(options.amountIn).join(',')
      : BigInt(options.amountIn).toString(10),
  };

  const response = await fetch(`${ENSO_API}/api/v1/shortcuts/route?${queryString.stringify(queryParams)}`, {
    headers: [['Authorization', `Bearer ${options.apiKey}`]],
  });
  const json = await response.json();
  return json as RouteQueryResponse;
};
