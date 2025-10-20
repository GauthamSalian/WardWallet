"use client";

import { useAccount } from "wagmi";

export function WalletStatus() {
  const { address, isConnected } = useAccount();

  return (
    <div>
      {isConnected ? (
        <p>Connected wallet: {address ?? ""}</p>
      ) : (
        <p>No wallet connected</p>
      )}
    </div>
  );
}
