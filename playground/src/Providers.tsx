import { ReactNode } from 'react';
import { UseDeFiProvider } from 'use-defi';
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
  console.log(config);
  return (
    <WagmiConfig config={config}>
      <UseDeFiProvider apiKey={import.meta.env.VITE_ENSO_API_KEY}>{children}</UseDeFiProvider>
    </WagmiConfig>
  );
}

export default Providers;
