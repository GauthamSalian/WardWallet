"use client";

import { useState } from "react";
import { useWriteContract } from "wagmi";
import { MyContractABI } from "@/abis/myContract";
import styles from "./ApprovalProposal.module.css";

export function VoteProposal() {
  const [proposalId, setProposalId] = useState("");
  const { writeContract, isPending, isError, isSuccess } = useWriteContract();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    writeContract({
      address: process.env.NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY as `0x${string}`,
      abi: MyContractABI,
      functionName: "vote",
      args: [proposalId as `0x${string}`],
    });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.inputGroup}>
        <label htmlFor="ProposalId" className={styles.label}>
          Proposal ID to Vote On:
        </label>
        <input
          type="text"
          id="ProposalId"
          name="ProposalId"
          required
          value={proposalId}
          onChange={(e) => setProposalId(e.target.value)}
          className={styles.input}
        />
      </div>

      <button type="submit" disabled={isPending} className={styles.button}>
        {isPending ? "Submitting Vote..." : "Vote"}
      </button>

      <div className={styles.feedbackContainer}>
        {isError && (
          <p className={styles.errorMessage}>Error occurred while voting.</p>
        )}
        {isSuccess && (
          <p className={styles.successMessage}>Voted successfully!</p>
        )}
      </div>
    </form>
  );
}
