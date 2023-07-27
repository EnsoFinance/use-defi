import { useMemo } from 'react';
import { useWalletClient, WalletClient } from 'wagmi';

import { useDefiContext } from './useDeFiContext';

export const useDeFiWalletClient = (): WalletClient | undefined => {
  const walletClientData = useWalletClient();
  const deFiProviderContext = useDefiContext();

  const walletClient = useMemo(() => {
    return deFiProviderContext.walletClient ?? walletClientData.data ?? undefined;
  }, [deFiProviderContext, walletClientData]);

  return walletClient;
};
