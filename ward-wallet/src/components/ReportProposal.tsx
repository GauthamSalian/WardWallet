"use client";

import { useWriteContract } from "wagmi";
import { MyContractABI } from "@/abis/myContract";
import styles from "./ApprovalProposal.module.css";

interface ReportProposalProps {
  proposalId: `0x${string}`; // Ensure it's passed in as a hex string
}

export function ReportProposal({ proposalId }: ReportProposalProps) {
  const { writeContract, isPending, isError, isSuccess } = useWriteContract();

  function handleReport() {
    if (!proposalId) {
      console.warn("No proposal ID provided.");
      return;
    }

    writeContract({
      address: process.env.NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY as `0x${string}`,
      abi: MyContractABI,
      functionName: "report",
      args: [proposalId],
    });
  }

  return (
    <div className={styles.reportContainer}>
      <button
        onClick={handleReport}
        disabled={isPending}
        className={styles.button}
      >
        {isPending ? "Reporting..." : "Report This Proposal"}
      </button>

      <div className={styles.feedbackContainer}>
        {isError && (
          <p className={styles.errorMessage}>
            Error occurred while reporting proposal.
          </p>
        )}
        {isSuccess && (
          <p className={styles.successMessage}>
            Proposal reported successfully.
          </p>
        )}
      </div>
    </div>
  );
}
