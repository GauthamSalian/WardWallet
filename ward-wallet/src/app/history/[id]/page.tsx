"use client";

import { useReadContract } from "wagmi";
import { MyContractABI } from "@/abis/myContract";
import { useParams } from "next/navigation";

export default function ProjectHistoryPage() {
  const { id } = useParams(); // Extract proposal ID from URL

  const { data, isError, isLoading } = useReadContract({
    address: process.env.NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY as `0x${string}`,
    abi: MyContractABI,
    functionName: "getProjectHistory",
    args: [id as `0x${string}`],
    query: {
      enabled: !!id,
    },
  });

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Project History for {id}</h1>

      {isLoading && <p>Loading history...</p>}
      {isError && <p>Error fetching history.</p>}

      {data && (
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
      )}
    </div>
  );
}
