"use client";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = "YOUR_PROJECT_ID"; // <-- REPLACE THIS

// 2. Create wagmi config
const metadata = {
  name: "Ward Wallet",
  description: "My Awesome dApp",
  url: "https://web3modal.com", // origin domain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, sepolia] as const;
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  // ...other wagmi options
});

// 3. This is the line you're missing!
// It creates the modal instance and makes the hook work
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  // ...other modal options
});

// 4. Setup QueryClient
const queryClient = new QueryClient();

export function ProvidersClient({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
