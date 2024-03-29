import { UseDeFiProvider } from '@ensofinance/use-defi';
import React, { ReactNode } from 'react';
import { createPublicClient, http } from 'viem';
import { createConfig, mainnet, WagmiConfig } from 'wagmi';

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});

function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <UseDeFiProvider apiKey={import.meta.env.VITE_ENSO_API_KEY}>{children}</UseDeFiProvider>
    </WagmiConfig>
  );
}

export default Providers;
