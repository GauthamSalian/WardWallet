import { useState } from "react";
import { useWriteContract } from "wagmi";
import { MyContractABI } from "@/abis/myContract";
import styles from "./ApprovalProposal.module.css";

export function CreateProposal() {
  const [proposalId, setProposalId] = useState("");
  const [proposalTitle, setProposalTitle] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [budget, setBudget] = useState("");

  const { writeContract, isError, isPending, isSuccess } = useWriteContract();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleWriteContract();
  }

  function handleWriteContract() {
    writeContract({
      address: process.env.NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY as `0x${string}`,
      abi: MyContractABI,
      functionName: "createProposal",
      args: [
        proposalId as `0x${string}`,
        proposalTitle,
        ipfsHash,
        BigInt(budget),
        Number(Math.floor(Date.now() / 1000)),
      ],
      value: BigInt(10000),
    });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.inputGroup}>
        <label htmlFor="ProposalID" className={styles.label}>
          Proposal ID:
        </label>
        <input
          type="text"
          name="ProposalID"
          id="ProposalID"
          required
          value={proposalId}
          onChange={(e) => setProposalId(e.target.value)}
          className={styles.input}
        />
        <br />
        <label htmlFor="ProposalTitle" className={styles.label}>
          Proposal Title:
        </label>
        <input
          type="text"
          name="ProposalTitle"
          id="ProposalTitle"
          required
          value={proposalTitle}
          onChange={(e) => setProposalTitle(e.target.value)}
          className={styles.input}
        />
        <br />
        <label htmlFor="ipfsHash" className={styles.label}>
          IPFS Hash:
        </label>
        <input
          type="text"
          name="ipfsHash"
          id="ipfsHash"
          required
          value={ipfsHash}
          onChange={(e) => setIpfsHash(e.target.value)}
          className={styles.input}
        />
        <br />
        <label htmlFor="Budget" className={styles.label}>
          Budget:{" "}
        </label>
        <input
          type="number"
          name="Budget"
          id="Budget"
          required
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className={styles.input}
        />
        <br />
        <br />
        <button type="submit" disabled={isPending} className={styles.button}>
          {isPending ? "Creating Proposal..." : "Create Proposal"}
        </button>
        <br />

        <div className={styles.feedbackContainer}>
          {isSuccess && (
            <p className={styles.successMessage}>
              Proposal created successfully!
            </p>
          )}
          {isError && (
            <p className={styles.errorMessage}>
              Error occurred while creating proposal.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
