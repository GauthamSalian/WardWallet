"use client";

import { useParams } from "next/navigation";
import { GetProjectHistory } from "@/components/GetProjectHistory";
import { keccak256, toHex } from "viem";

export default function HistoryPage() {
  const { id } = useParams();
  const rawId = typeof id === "string" ? id.trim() : "";

  const proposalId =
    rawId && /^0x[a-fA-F0-9]{64}$/.test(rawId)
      ? (rawId as `0x${string}`)
      : (keccak256(toHex(rawId)) as `0x${string}`);

  return <GetProjectHistory proposalId={proposalId} />;
}
