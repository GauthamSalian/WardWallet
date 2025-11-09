"use client";

import { useReadContract } from "wagmi";
import { MyContractABI } from "@/abis/myContract";
import { ReportProposal } from "@/components/ReportProposal";
import { VoteProposal } from "@/components/VoteProposal";
import { ReleasePayment } from "@/components/ReleasePayment";

interface GetProjectHistoryProps {
  proposalId: `0x${string}`; // must be a valid bytes32 string
}

export function GetProjectHistory({ proposalId }: GetProjectHistoryProps) {
  const isValidBytes32 = /^0x[a-fA-F0-9]{64}$/.test(proposalId);

  const { data, isError, isLoading, error } = useReadContract({
    address: process.env.NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY as `0x${string}`,
    abi: MyContractABI,
    functionName: "getProjectHistory",
    args: isValidBytes32 ? [proposalId] : undefined,
    query: {
      enabled: isValidBytes32,
    },
  });

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Project History</h2>

      {!isValidBytes32 && (
        <p style={{ color: "red" }}>
          Invalid proposal ID format. Must be a 32-byte hex string.
        </p>
      )}

      {isLoading && <p>Loading history...</p>}

      {isError && (
        <div style={{ color: "red", marginTop: "1rem" }}>
          <strong>Error fetching history:</strong>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {error?.message ||
              "Unknown error occurred. Please check the proposal ID or try again."}
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
          <ReleasePayment approvalId={proposalId} />
        </div>
      )}
    </div>
  );
}
