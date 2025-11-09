"use client";

import React from "react";
import Link from "next/link";
import styles from "./ProposalCard.module.css";

interface ProposalCardProps {
  id: string;
  title: string;
  proposer_address?: string;
  status?: string;
  budget?: number | string;
  ipfs_hash?: string | null;
}

export function ProposalCard({
  id,
  title,
  proposer_address,
  status,
  budget,
  ipfs_hash,
}: ProposalCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.titleRow}>
        <div className={styles.title}>{title}</div>
        <div>{status}</div>
      </div>
      <div className={styles.meta}>
        <div>
          Proposal ID: <code>{id}</code>
        </div>
        <div>Proposer: {proposer_address}</div>
        <div>Budget: {budget}</div>
        {ipfs_hash && <div>IPFS: {ipfs_hash}</div>}
      </div>
      <div className={styles.actions}>
        <Link className={styles.link} href={`/history/${id}`}>
          View History
        </Link>
      </div>
    </div>
  );
}
