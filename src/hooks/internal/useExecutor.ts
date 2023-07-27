import { useMemo } from 'react';
import { Address } from 'viem';
import { useAccount } from 'wagmi';

import { useDeFiWalletClient } from './useDeFiWalletClient';

export type UseExecutorPayload = {
  data: Address | undefined;
  isConnected: boolean;
};

export const useExecutor = (): UseExecutorPayload => {
  const accountData = useAccount();
  const walletClient = useDeFiWalletClient();

  const address = useMemo(() => {
    const isConnectedAndHasAccount = accountData.isConnected && accountData.address;
    const fallbackAccount = isConnectedAndHasAccount ? accountData.address : undefined;

    return walletClient?.account?.address ?? fallbackAccount;
  }, [accountData, walletClient]);

  const isConnected = useMemo(() => {
    return !!address;
  }, [address]);

  return {
    isConnected,
    data: address,
  };
};
