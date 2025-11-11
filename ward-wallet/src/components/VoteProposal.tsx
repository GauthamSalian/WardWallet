"use client";

import { useWriteContract, useAccount } from "wagmi";
import { MyContractABI } from "@/abis/myContractv2";
import styles from "./ApprovalProposal.module.css";

interface VoteProposalProps {
  proposalId: `0x${string}`; // Passed in from parent or route
  buttonClassName?: string;
}

export function VoteProposal({
  proposalId,
  buttonClassName,
}: VoteProposalProps) {
  const { writeContract, isPending, isError, isSuccess } = useWriteContract();
  const { address } = useAccount();

  async function handleVote() {
    if (!proposalId) {
      console.warn("No proposal ID provided.");
      return;
    }

    try {
      await writeContract({
        address: process.env
          .NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY_2 as `0x${string}`,
        abi: MyContractABI,
        functionName: "vote",
        args: [proposalId],
      });

      // Log the interaction after successful vote
      if (address) {
        await fetch("/api/interactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: address,
            proposalId,
            action: "vote",
          }),
        });
      }
    } catch (error) {
      console.error("Error voting on proposal:", error);
    }
  }

  return (
    <div className={styles.voteContainer}>
      <button
        onClick={handleVote}
        disabled={isPending}
        className={buttonClassName ? buttonClassName : styles.button}
      >
        {isPending ? "Submitting Vote..." : "Vote on This Proposal"}
      </button>

      <div className={styles.feedbackContainer}>
        {isError && (
          <p className={styles.errorMessage}>Error occurred while voting.</p>
        )}
        {isSuccess && (
          <p className={styles.successMessage}>Voted successfully!</p>
        )}
      </div>
    </div>
  );
}
