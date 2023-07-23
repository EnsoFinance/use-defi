import React, { createContext, useEffect, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useWalletClient, WalletClient } from 'wagmi';

export interface UseDeFiContextType {
  walletClient?: WalletClient;
  apiKey?: string;
}

export const UseDeFiContext = createContext<UseDeFiContextType>({});

export interface UseDeFiContextProviderProps {
  children: React.ReactNode;
  apiKey?: string;
  walletClient?: WalletClient;
}

const queryClient = new QueryClient();

export default function UseDeFiProvider({ children, walletClient, apiKey }: UseDeFiContextProviderProps) {
  const fallbackWalletClientQuery = useWalletClient();

  useEffect(() => {
    if (!apiKey)
      console.warn(
        `You've instantiated use-defi without an API key. Please register at https://www.enso.finance/developers`,
      );
  }, [apiKey]);

  const providerState = useMemo(() => {
    const fallbackWalletClient = fallbackWalletClientQuery.isSuccess ? fallbackWalletClientQuery.data : undefined;
    const defaultedWalletClient = walletClient ?? fallbackWalletClient ?? undefined;

    return {
      walletClient: defaultedWalletClient,
      apiKey,
    };
  }, [walletClient, fallbackWalletClientQuery]);

  return (
    <UseDeFiContext.Provider value={providerState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </UseDeFiContext.Provider>
  );
}
