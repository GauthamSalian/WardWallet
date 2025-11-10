"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./ProposalCard.module.css";
import { ApprovalProposal } from "./ApproveProposal";
import approvalStyles from "./ApprovalProposal.module.css";

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
  const [showApprove, setShowApprove] = useState(false);
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
        <button
          className={styles.link}
          style={{ marginLeft: 12 }}
          onClick={() => setShowApprove(true)}
        >
          Approve
        </button>
        {showApprove && (
          <div
            className={approvalStyles.modalOverlay}
            onClick={() => setShowApprove(false)}
          >
            <div
              className={approvalStyles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <ApprovalProposal
                defaultProposalId={id}
                onClose={() => setShowApprove(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
