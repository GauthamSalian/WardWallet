"use client";
import { useState } from "react";
import { useAccount } from "wagmi";
import { publicClient } from "@/utils/publicClient";
import { MyContractABI } from "@/abis/myContractv2";
import { DonateToPool } from "./DonateToPool";

const CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY_2 as `0x${string}`;

interface QuickActionsProps {
  onRefresh?: () => void;
}

export function QuickActions({ onRefresh }: QuickActionsProps) {
  const { address } = useAccount();
  const [isOwner, setIsOwner] = useState(false);
  const [showOwnerToggle, setShowOwnerToggle] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function checkOwnerStatus() {
    try {
      const owner = (await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: MyContractABI,
        functionName: "contractOwner",
      })) as string | undefined;

      setIsOwner(owner?.toLowerCase() === address?.toLowerCase());
      setShowOwnerToggle(true);
    } catch (err) {
      console.error("Error checking owner:", err);
    }
  }

  function handleRefresh() {
    setIsRefreshing(true);
    // Refresh proposals data
    fetch("/api/proposals")
      .then(() => {
        // Trigger page refresh or state update
        window.location.reload();
      })
      .finally(() => setIsRefreshing(false));
  }

  function handleExport() {
    fetch("/api/proposals")
      .then((res) => res.json())
      .then((data) => {
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `proposals-${new Date().toISOString().split("T")[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
      });
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        alignItems: "center",
        padding: "16px 0",
        marginBottom: "24px",
      }}
    >
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        style={{
          padding: "10px 16px",
          background: isRefreshing ? "#666" : "#16c784",
          border: "none",
          borderRadius: "8px",
          color: "#fff",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 500,
          opacity: isRefreshing ? 0.6 : 1,
        }}
      >
        {isRefreshing ? "Refreshing..." : "🔄 Refresh"}
      </button>

      <button
        onClick={handleExport}
        style={{
          padding: "10px 16px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "none",
          borderRadius: "8px",
          color: "#fff",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        📥 Export JSON
      </button>

      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <DonateToPool />

        {address && !showOwnerToggle && (
          <button
            onClick={checkOwnerStatus}
            style={{
              padding: "8px 12px",
              background: "transparent",
              border: "1px solid #666",
              borderRadius: "6px",
              color: "#aaa",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Check Owner
          </button>
        )}

        {isOwner && showOwnerToggle && (
          <a
            href="/owner"
            style={{
              padding: "10px 16px",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid #ef4444",
              borderRadius: "8px",
              color: "#ef4444",
              textDecoration: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            🔐 Owner Controls
          </a>
        )}
      </div>
    </div>
  );
}
