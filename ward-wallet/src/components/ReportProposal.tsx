"use client";

import { useWriteContract, useAccount } from "wagmi";
import { MyContractABI } from "@/abis/myContract";
import styles from "./ApprovalProposal.module.css";

interface ReportProposalProps {
  proposalId: `0x${string}`; // Ensure it's passed in as a hex string
  buttonClassName?: string;
}

export function ReportProposal({
  proposalId,
  buttonClassName,
}: ReportProposalProps) {
  const { writeContract, isPending, isError, isSuccess } = useWriteContract();
  const { address } = useAccount();

  async function handleReport() {
    if (!proposalId) {
      console.warn("No proposal ID provided.");
      return;
    }

    try {
      await writeContract({
        address: process.env
          .NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY as `0x${string}`,
        abi: MyContractABI,
        functionName: "report",
        args: [proposalId],
      });

      // Log the interaction after successful report
      if (address) {
        await fetch("/api/interactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: address,
            proposalId,
            action: "report",
          }),
        });
      }
    } catch (error) {
      console.error("Error reporting proposal:", error);
    }
  }

  return (
    <div className={styles.reportContainer}>
      <button
        onClick={handleReport}
        disabled={isPending}
        className={buttonClassName ? buttonClassName : styles.button}
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
