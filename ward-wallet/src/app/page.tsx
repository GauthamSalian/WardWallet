"use client";

import { WalletStatus } from "../components/WalletStatus";
import { ConnectWallet } from "../components/ConnectWallet";

export default function Page() {
  return (
    <main>
      <h1>Besu Wallet Status</h1>
      <WalletStatus />
      <ConnectWallet />
    </main>
  );
}
