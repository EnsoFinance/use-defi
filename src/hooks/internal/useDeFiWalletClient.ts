import { useContext, useMemo } from 'react';
import { useWalletClient, WalletClient } from 'wagmi';

import { UseDeFiContext } from '../../provider/UseDeFiProvider';

export const useDeFiWalletClient = (): WalletClient | undefined => {
  const walletClientData = useWalletClient();
  const deFiProviderContext = useContext(UseDeFiContext);

  const walletClient = useMemo(() => {
    return deFiProviderContext.walletClient ?? walletClientData.data ?? undefined;
  }, [deFiProviderContext, walletClientData]);

  return walletClient;
};
