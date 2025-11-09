"use client";
import React from "react";

import { MyContractABI } from "@/abis/myContract";
import { publicClient } from "@/utils/publicClient";

import { ReportProposal } from "@/components/ReportProposal";
import { VoteProposal } from "@/components/VoteProposal";
import { ReleasePayment } from "@/components/ReleasePayment";
import styles from "./ProjectHistory.module.css";

interface GetProjectHistoryProps {
  proposalId: `0x${string}`; // must be a valid bytes32 string
}

function formatAddress(addr: string) {
  return addr && addr !== "0x0000000000000000000000000000000000000000"
    ? addr.slice(0, 6) + "..." + addr.slice(-4)
    : "-";
}

export function GetProjectHistory({ proposalId }: GetProjectHistoryProps) {
  const isValidBytes32 = /^0x[a-fA-F0-9]{64}$/.test(proposalId);
  const [data, setData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!isValidBytes32) return;
    setIsLoading(true);
    setError(null);
    publicClient
      .readContract({
        address: process.env
          .NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY as `0x${string}`,
        abi: MyContractABI,
        functionName: "getProjectHistory",
        args: [proposalId],
      })
      .then((result) => {
        setData(result);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || String(err));
        setIsLoading(false);
      });
  }, [proposalId, isValidBytes32]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Project History</h2>

      {!isValidBytes32 && (
        <p style={{ color: "red" }}>
          Invalid proposal ID format. Must be a 32-byte hex string.
        </p>
      )}

      {isLoading && <p>Loading history...</p>}

      {error && (
        <div style={{ color: "red", marginTop: "1rem" }}>
          <strong>Error fetching history:</strong>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {error}
          </pre>
        </div>
      )}

      {data && (
        <div className={styles.section}>
          <div>
            <span className={styles.label}>Title:</span>
            <span className={styles.value}>{data.proposal.title}</span>
          </div>
          <div>
            <span className={styles.label}>Status:</span>
            <span
              className={
                styles.status +
                " " +
                (data.proposal.status === "open"
                  ? styles.statusOpen
                  : styles.statusClosed)
              }
            >
              {data.proposal.status}
            </span>
          </div>
          <div>
            <span className={styles.label}>Proposal ID:</span>
            <span className={styles.value}>{data.proposal.proposalId}</span>
          </div>
          <div>
            <span className={styles.label}>Proposer:</span>
            <span className={styles.value}>
              {formatAddress(data.proposal.proposer)}
            </span>
          </div>
          <div>
            <span className={styles.label}>Budget:</span>
            <span className={styles.value}>{data.proposal.budget}</span>
          </div>
          <div>
            <span className={styles.label}>Bond Amount:</span>
            <span className={styles.value}>{data.proposal.bondAmount}</span>
          </div>
          <div>
            <span className={styles.label}>Vote Count:</span>
            <span className={styles.value}>{data.proposal.voteCount}</span>
          </div>
          <div>
            <span className={styles.label}>Report Count:</span>
            <span className={styles.value}>{data.proposal.reportCount}</span>
          </div>
          <div>
            <span className={styles.label}>IPFS Hash:</span>
            <span className={styles.value}>{data.proposal.ipfsHash}</span>
          </div>
          <div>
            <span className={styles.label}>Timestamp:</span>
            <span className={styles.value}>{data.proposal.timestamp}</span>
          </div>
          <div>
            <span className={styles.label}>Approval:</span>
            {data.approval &&
            data.approval.approvalId &&
            data.approval.approvalId !==
              "0x0000000000000000000000000000000000000000000000000000000000000000" ? (
              <span className={styles.value}>{data.approval.approvalId}</span>
            ) : (
              <span className={styles.value} style={{ color: "#c62828" }}>
                Not approved
              </span>
            )}
          </div>
          <div>
            <span className={styles.label}>Completion:</span>
            {data.completion &&
            data.completion.completionId &&
            data.completion.completionId !==
              "0x0000000000000000000000000000000000000000000000000000000000000000" ? (
              <span className={styles.value}>
                {data.completion.completionId}
              </span>
            ) : (
              <span className={styles.value} style={{ color: "#c62828" }}>
                Not completed
              </span>
            )}
          </div>
        </div>
      )}

      {isValidBytes32 && (
        <div className={styles.actions}>
          <ReportProposal
            proposalId={proposalId}
            buttonClassName={styles.reportBtn}
          />
          <VoteProposal
            proposalId={proposalId}
            buttonClassName={styles.voteBtn}
          />
        </div>
      )}
    </div>
  );
}
