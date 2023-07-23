import { UseDeFiProvider } from 'index';
import { ReactNode } from 'react';
import { createPublicClient, http } from 'viem';
import { createConfig, mainnet, WagmiConfig } from 'wagmi';

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});

export const providerWrapper = ({ children }: { children: ReactNode }) => (
  <WagmiConfig config={config}>
    <UseDeFiProvider apiKey="test-123">{children}</UseDeFiProvider>
  </WagmiConfig>
);
