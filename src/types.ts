import { Address } from 'viem';

export type BasePosition = {
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  address: Address;
  chainId: number;
  id: string;
};

export type PoolPosition = {
  apy: number | null;
  apyBase: number | null;
  apyReward: number | null;
  tvl: number | string;
  underlyingTokens: Address[];
  project: string;
  chainId: number;
  id: string;
  name: string;
  poolAddress: Address;
  primaryAddress: Address;
  subtitle: string;
  rewardTokens: Address[];
  tokenAddress: Address;
  token: {
    address: Address;
    symbol: string;
    name: string;
    decimals: number;
    chain: number;
    project: string;
    protocol: string;
    primaryAddress: Address;
    poolAddress: Address;
    underlyingTokens: Address[];
  } | null;
  protocol: {
    name: string;
    slug: string;
    logo: string;
    url: string;
    description: string;
    twitter: string;
    category: string;
    chainIds: number[];
  };
};

export type Position = BasePosition | PoolPosition;

export type TxData = {
  data: Address;
  from: Address;
  to: Address;
  value: string;
};

export type Approve = {
  tx: TxData;
  gas: string;
  token: Address;
  amount: string;
  spender: Address;
};

export type Transfer = {
  tx: TxData;
  gas: string;
  token: Address;
  amount: string;
  spender: Address;
};

export type Route = {
  action: string;
  protocol: string;
  tokenIn: string;
  tokenOut: string;
  positionInId: string;
  positionOutId: string;
};

export type ExecutableRoute = {
  amountOut: string;
  createdAt: number;
  gas: number;
  route: Route[];
  tx: TxData;
};

export type LoadingState = 'loading' | 'error' | 'success' | 'idle';

export type TransferMethods = 'APPROVE_TRANSFERFROM' | 'TRANSFER' | 'PERMIT2';

export type BigNumberish = bigint | number | string;

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
