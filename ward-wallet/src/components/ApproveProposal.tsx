import { useState } from "react";
import { useWriteContract } from "wagmi";
import { MyContractABI } from "@/abis/myContract";
import styles from "./ApprovalProposal.module.css";

export function ApprovalProposal() {
  const [approvalId, setApprovalId] = useState("");
  const [proposalId, setProposalId] = useState("");
  const [contractor, setContractor] = useState("");

  const { writeContract, isPending, isError, isSuccess } = useWriteContract();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevents the page from reloading
    handleWriteContract();
  }

  function handleWriteContract() {
    writeContract({
      address: process.env.NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY as `0x${string}`,
      abi: MyContractABI,
      functionName: "approvalProposal",
      args: [
        approvalId as `0x${string}`,
        proposalId as `0x${string}`,
        contractor as `0x${string}`,
        Number(Math.floor(Date.now() / 1000)),
      ],
    });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.inputGroup}>
        <label htmlFor="ApprovalId" className={styles.label}>
          Approval ID:
        </label>
        <input
          type="text"
          id="ApprovalId"
          name="ApprovalId"
          required
          value={approvalId}
          onChange={(e) => setApprovalId(e.target.value)}
          className={styles.input}
        />
        <br />
        <label htmlFor="ProposalId" className={styles.label}>
          Proposal ID:
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
        <br />
        <label htmlFor="Contractor" className={styles.label}>
          Contractor Address:
        </label>
        <input
          type="text"
          name="Contractor"
          id="Contractor"
          required
          value={contractor}
          onChange={(e) => setContractor(e.target.value)}
          className={styles.input}
        />
        <br />
        <button type="submit" disabled={isPending} className={styles.button}>
          {isPending ? "Submitting..." : "Submit Approval"}
        </button>
      </div>
      <div className={styles.feedbackContainer}>
        {isSuccess && (
          <p className={styles.successMessage} style={{ color: "green" }}>
            Transaction submitted successfully!
          </p>
        )}
        {isError && (
          <p className={styles.errorMessage} style={{ color: "red" }}>
            Error submitting transaction.
          </p>
        )}
      </div>
    </form>
  );
}
