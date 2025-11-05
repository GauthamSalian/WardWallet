import { useState } from "react";
import { useWriteContract } from "wagmi";
import { MyContractABI } from "@/abis/myContract";
import styles from "./ApprovalProposal.module.css";

export function CompleteProposal() {
  const [completionId, setCompletionId] = useState("");
  const [approvalId, setApprovalId] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");

  const { writeContract, isPending, isError, isSuccess } = useWriteContract();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleComplete();
  }

  function handleComplete() {
    writeContract({
      address: process.env.NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY as `0x${string}`,
      abi: MyContractABI,
      functionName: "markAsComplete",
      args: [
        completionId as `0x${string}`,
        approvalId as `0x${string}`,
        ipfsHash,
        Number(Math.floor(Date.now() / 1000)),
      ],
    });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.inputGroup}>
        <label htmlFor="CompletionId" className={styles.label}>
          Completion ID:
        </label>
        <input
          type="text"
          name="CompletionId"
          id="CompletionId"
          required
          value={completionId}
          onChange={(e) => setCompletionId(e.target.value)}
          className={styles.input}
        />
        <br />
        <label htmlFor="ApprovalId" className={styles.label}>
          Approval ID:
        </label>
        <input
          type="text"
          name="ApprovalId"
          id="ApprovalId"
          required
          value={approvalId}
          onChange={(e) => setApprovalId(e.target.value)}
          className={styles.input}
        />
        <br />
        <label htmlFor="IPFSHash" className={styles.label}>
          IPFS Hash:
        </label>
        <input
          type="text"
          name="IPFSHash"
          id="IPFSHash"
          required
          value={ipfsHash}
          onChange={(e) => setIpfsHash(e.target.value)}
          className={styles.input}
        />
        <br />
        <button type="submit" disabled={isPending} className={styles.button}>
          {isPending ? "Submitting..." : "Submit Completion"}
        </button>

        <div className={styles.feedbackContainer}>
          {isError && (
            <p className={styles.errorMessage}>Error completing proposal.</p>
          )}
          {isSuccess && (
            <p className={styles.successMessage}>
              Proposal marked as complete!
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
