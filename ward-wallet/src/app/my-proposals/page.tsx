"use client";

import React from "react";
// use native fetch to avoid adding axios dependency
import { ProposalCard } from "@/components/ProposalCard";
import styles from "@/components/ProposalCard.module.css";
import { useAccount } from "wagmi";

export default function MyProposalsPage() {
  const { address } = useAccount();
  const [proposals, setProposals] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!address) return;
    setLoading(true);
    (async () => {
      try {
        const res = await fetch(`/api/proposals?user=${address}`);
        if (!res.ok)
          throw new Error(`Failed to fetch proposals: ${res.status}`);
        const data = (await res.json()) as any[];
        setProposals(data || []);
      } catch (err: any) {
        setError(err?.message || String(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [address]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>My Proposals</h1>
      {!address && <p>Please connect your wallet to view your proposals.</p>}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {proposals.map((p) => (
        <ProposalCard key={p.id} {...p} />
      ))}
    </div>
  );
}
