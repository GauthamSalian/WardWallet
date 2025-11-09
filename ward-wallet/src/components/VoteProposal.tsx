"use client";

import { useWriteContract } from "wagmi";
import { MyContractABI } from "@/abis/myContract";
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

  function handleVote() {
    if (!proposalId) {
      console.warn("No proposal ID provided.");
      return;
    }

    writeContract({
      address: process.env.NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY as `0x${string}`,
      abi: MyContractABI,
      functionName: "vote",
      args: [proposalId],
    });
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
