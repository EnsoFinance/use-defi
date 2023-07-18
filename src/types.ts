import { Address } from 'viem';

// Temporary Type definitions
export type ShortcutDefinition = {
  liveParams: {
    type: string;
  }[];
  inputs: {}[];
  steps: {
    contract: {
      address: string;
    };
  }[];
};

export type Shortcut = {
  version: number;
  creator: string;
  definition: ShortcutDefinition;
};

export type MetaPosition = {
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

export type LoadingState = 'loading' | 'error' | 'success' | 'idle';

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
