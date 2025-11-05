"use client";

import { WalletStatus } from "../components/WalletStatus";
import { ConnectWallet } from "../components/ConnectWallet";
import { GetProjectHistory } from "@/components/GetProjectHistory";
import { CreateProposal } from "@/components/CreateProposal";
import { VoteProposal } from "@/components/VoteProposal";
import { ReportProposal } from "@/components/ReportProposal";
import { ApprovalProposal } from "@/components/ApproveProposal";
import { CompleteProposal } from "@/components/CompletedWork";
import { ReleasePayment } from "@/components/ReleasePayment";

export default function Page() {
  return (
    <main>
      <h1>Besu Wallet Status</h1>
      <WalletStatus />
      <ConnectWallet />
      <GetProjectHistory />
      <CreateProposal />
      <VoteProposal />
      <ReportProposal />
      <ApprovalProposal />
      <CompleteProposal />
      <ReleasePayment />
    </main>
  );
}
