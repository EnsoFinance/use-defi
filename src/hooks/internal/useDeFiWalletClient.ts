import { useMemo } from 'react';
import { useWalletClient, WalletClient } from 'wagmi';

import { useDeFiContext } from './useDeFiContext';

export const useDeFiWalletClient = (): WalletClient | undefined => {
  const walletClientData = useWalletClient();
  const deFiProviderContext = useDeFiContext();

  const walletClient = useMemo(() => {
    return deFiProviderContext.walletClient ?? walletClientData.data ?? undefined;
  }, [deFiProviderContext, walletClientData]);

  return walletClient;
};
