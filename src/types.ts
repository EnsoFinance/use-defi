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

export type LoadingState = 'loading' | 'error' | 'success' | 'idle';

export type BigNumberish = BigInt | number | string;

export type ProtocolName = 'curve' | 'aave' | 'uniswap' | string;
