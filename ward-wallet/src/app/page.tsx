"use client";

import { GetProjectHistory } from "@/components/GetProjectHistory";
import { CreateProposal } from "@/components/CreateProposal";
import { VoteProposal } from "@/components/VoteProposal";
import { ReportProposal } from "@/components/ReportProposal";
import { ApprovalProposal } from "@/components/ApproveProposal";
import { CompleteProposal } from "@/components/CompletedWork";
import { ReleasePayment } from "@/components/ReleasePayment";
import { Navbar } from "@/components/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />

      <main>
        <GetProjectHistory />
        <CreateProposal />
        <VoteProposal />
        <ReportProposal />
        <ApprovalProposal />
        <CompleteProposal />
        <ReleasePayment />
      </main>
    </>
  );
}
