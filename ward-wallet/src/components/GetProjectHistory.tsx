"use client";
import React from "react";

import { MyContractABI } from "@/abis/myContract";
import { publicClient } from "@/utils/publicClient";

import { ReportProposal } from "@/components/ReportProposal";
import { VoteProposal } from "@/components/VoteProposal";
import { ReleasePayment } from "@/components/ReleasePayment";

interface GetProjectHistoryProps {
  proposalId: `0x${string}`; // must be a valid bytes32 string
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
    <div style={{ padding: "2rem" }}>
      <h2>Project History</h2>

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
        <pre
          style={{
            background: "#f5f5f5",
            padding: "1rem",
            borderRadius: "8px",
            overflowX: "auto",
            marginBottom: "2rem",
            color: "black",
          }}
        >
          {JSON.stringify(
            data,
            (key, value) =>
              typeof value === "bigint" ? value.toString() : value,
            2
          )}
        </pre>
      )}

      {isValidBytes32 && (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <ReportProposal proposalId={proposalId} />
          <VoteProposal proposalId={proposalId} />
        </div>
      )}
    </div>
  );
}
