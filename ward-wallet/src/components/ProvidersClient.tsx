"use client";

import { WagmiProvider } from "wagmi";
import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { defineChain } from "viem";
import { injected } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Define local Besu chain
const besuLocal = defineChain({
  id: 1337,
  name: "Besu Local",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["http://localhost:8545"],
    },
  },
});

// Create Wagmi config with both local Besu and Sepolia
const config = createConfig({
  chains: [besuLocal, sepolia],
  connectors: [injected()],
  transports: {
    [besuLocal.id]: http("http://localhost:8545"),
    [sepolia.id]: http(),
  },
});

// Setup QueryClient
const queryClient = new QueryClient();

export function ProvidersClient({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
