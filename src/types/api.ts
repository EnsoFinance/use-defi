import { Address } from 'viem';

import { components, operations } from '../generated/api';

export type Hop = components['schemas']['Hop'];
export type Transaction = components['schemas']['Transaction'];

export type ApproveTransaction = components['schemas']['WalletApproveTransaction'];

// FIXME: Missing in API: Incorrect datatype, just using approve as placeholder
export type TransferTransaction = components['schemas']['WalletApproveTransaction'];

export type BundleAction = components['schemas']['Action']['action'];

// FIXME: Missing in API: No response type for shortcuts/bundle endpoint
export type Bundle = {
  amountOut: string;
  createdAt: number;
  gas: number;
  route: Hop[];
  tx: Transaction;
};

export type PoolPosition = components['schemas']['DefiToken'];
export type BasePosition = components['schemas']['BaseToken'];

export type Position = (PoolPosition | BasePosition) & {
  // FIXME: Missing in API
  chainId: number;
};

// FIXME: Missing in API
export type ProtocolName =
  | 'lido'
  | 'across'
  | 'yearn-finance'
  | 'frax-ether'
  | 'curve-dex'
  | 'aave-v2'
  | 'compound'
  | 'aave-v3'
  | 'fraxlend'
  | 'angle'
  | 'rocket-pool'
  | 'archimedes-finance'
  | 'balancer-v2'
  | 'curve-gauge'
  | 'aura'
  | 'concentrator'
  | 'erc4626'
  | 'morpho-aave'
  | 'sideshift'
  | 'stargate'
  | 'exactly'
  | 'gearbox'
  | 'damm-finance'
  | 'beefy'
  | 'vesper'
  | 'stakedao-sd'
  | 'convex'
  | 'sonne-finance'
  | 'iron-bank'
  | 'venus'
  | 'apeswap-lending'
  | 'autofarm'
  | 'alpaca-lending'
  | 'radiant-v2'
  | 'wefi'
  | 'quickswap-dex'
  | 'sushiswap'
  | 'benqi-lending'
  | 'trader-joe-lend';

export type ExecutableRoute = {
  amountOut: string;
  createdAt: number;
  gas: number;
  route: Hop[];
  tx: Transaction;
};

export type QueryApproveResponse = components['schemas']['WalletApproveTransaction'];
export type QueryApproveOptions = operations['WalletController_createApproveTransaction']['parameters']['query'];

// FIXME: Missing in API
export type QueryAllowancesOptions = {
  chainId?: number;
  fromAddress: Address;
};
// FIXME: Missing in API
export type QueryAllowancesResponse = {
  token: Address;
  spender: Address;
  amount: string;
}[];
