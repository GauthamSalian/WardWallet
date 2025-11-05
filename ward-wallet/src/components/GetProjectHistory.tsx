"use client";

import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { MyContractABI } from "@/abis/myContract";
import styles from "./ApprovalProposal.module.css";

export function GetProjectHistory() {
  const [proposalID, setProposalID] = useState("");

  const [submittedID, setSubmittedID] = useState("");

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, isError, isLoading } = useReadContract({
    address: process.env.NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY as `0x${string}`,
    abi: MyContractABI,
    functionName: "getProjectHistory",
    args: [submittedID as `0x${string}`],
    query: {
      enabled: isClient && !!submittedID,
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmittedID(proposalID);
  }

  if (!isClient) {
    return null;
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
          value={proposalID}
          onChange={(e) => setProposalID(e.target.value)}
          className={styles.input}
        />
      </div>

      <button type="submit" disabled={isLoading} className={styles.button}>
        {isLoading ? "Fetching..." : "Get Project History"}
      </button>

      <div className={styles.feedbackContainer}>
        {isError && (
          <p className={styles.errorMessage}>
            Error occurred while fetching data.
          </p>
        )}
      </div>

      {data && (
        <div style={{ marginTop: "1.5rem" }}>
          <h2 style={{ textAlign: "center" }}>Project History</h2>
          <pre
            style={{
              background: "#eee",
              padding: "1rem",
              borderRadius: "8px",
              overflowX: "auto",
            }}
          >
            {JSON.stringify(
              data,
              (key, value) =>
                typeof value === "bigint" ? value.toString() : value,
              2
            )}
          </pre>
        </div>
      )}
    </form>
  );
}
