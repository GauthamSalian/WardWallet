"use client";

import React from "react";
import { useAccount } from "wagmi";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { FiArrowLeft } from "react-icons/fi";
import styles from "./MyProposals.module.css";

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

  if (!address) {
    return (
      <>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.header}>
            <Link href="/" className={styles.backButton}>
              <FiArrowLeft /> Back to Dashboard
            </Link>
          </div>
          <h1 className={styles.title}>My Proposals</h1>
          <div className={styles.notice}>
            Please connect your wallet to view your proposals.
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <Link href="/" className={styles.backButton}>
            <FiArrowLeft /> Back to Dashboard
          </Link>
        </div>
        <h1 className={styles.title}>My Proposals</h1>

        {loading ? (
          <div className={styles.loading}>Loading your proposals...</div>
        ) : error ? (
          <div className={styles.notice} style={{ color: "#EF4444" }}>
            {error}
          </div>
        ) : proposals.length > 0 ? (
          <div className={styles.proposalsList}>
            {proposals.map((proposal) => (
              <div key={proposal.id} className={styles.proposalCard}>
                <div className={styles.proposalInfo}>
                  <div className={styles.proposalId}>
                    <span className={styles.label}>Proposal ID:</span>{" "}
                    {proposal.id}
                  </div>
                  <div className={styles.proposerAddress}>
                    <span className={styles.label}>Proposer:</span>{" "}
                    {proposal.proposer_address}
                  </div>
                  <div className={styles.budget}>
                    <span className={styles.label}>Budget:</span>{" "}
                    {proposal.budget}
                  </div>
                  <div className={styles.ipfsHash}>
                    <span className={styles.label}>IPFS:</span>{" "}
                    {proposal.ipfs_hash}
                  </div>
                </div>
                <Link
                  href={`/history/${proposal.id}`}
                  className={styles.viewHistory}
                >
                  View History
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.notice}>
            You haven't created any proposals yet.
          </div>
        )}
      </div>
    </>
  );
}
