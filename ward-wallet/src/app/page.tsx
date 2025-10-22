"use client";

import { WalletStatus } from "../components/WalletStatus";
import { ConnectWallet } from "../components/ConnectWallet";
import { GetProjectHistory } from "@/components/GetProjectHistory";
import { CreateProposal } from "@/components/CreateProposal";

export default function Page() {
  return (
    <main>
      <h1>Besu Wallet Status</h1>
      <WalletStatus />
      <ConnectWallet />
      <GetProjectHistory />
      <CreateProposal />
    </main>
  );
}
