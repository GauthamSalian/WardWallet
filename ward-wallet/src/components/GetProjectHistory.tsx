"use client";
import React from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { MyContractABI } from "@/abis/myContract";
import { publicClient } from "@/utils/publicClient";

import { ReportProposal } from "@/components/ReportProposal";
import { VoteProposal } from "@/components/VoteProposal";
import { IpfsViewer } from "@/components/IpfsViewer";
import { ApprovalProposal } from "@/components/ApproveProposal";
import { CompleteProposal } from "@/components/CompletedWork";
import { ActionButton } from "@/components/ActionButton";
import styles from "@/app/history/[id]/GetHistory.module.css";

interface ProjectHistoryData {
  proposal: {
    title: string;
    status: string;
    proposalId: `0x${string}`;
    proposer: `0x${string}`;
    budget: bigint;
    bondAmount: bigint;
    voteCount: bigint;
    reportCount: bigint;
    ipfsHash: string;
    timestamp: number;
  };
  approval?: {
    approvalId: `0x${string}`;
  };
  completion?: {
    completionId: `0x${string}`;
  };
}

interface GetProjectHistoryProps {
  proposalId: `0x${string}`; // must be a valid bytes32 string
}

function formatAddress(addr: string) {
  return addr && !isZeroAddress(addr)
    ? addr.slice(0, 6) + "..." + addr.slice(-4)
    : "-";
}

const isZeroAddress = (addr?: string) =>
  !addr ||
  addr === "0x0000000000000000000000000000000000000000000000000000000000000000";

export function GetProjectHistory({ proposalId }: GetProjectHistoryProps) {
  const [showApprovalForm, setShowApprovalForm] = React.useState(false);
  const [showCompletionForm, setShowCompletionForm] = React.useState(false);
  const isValidBytes32 = /^0x[a-fA-F0-9]{64}$/.test(proposalId);
  const [data, setData] = React.useState<ProjectHistoryData | null>(null);
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
      <Link href="/" className={styles.backButton}>
        <FiArrowLeft /> Back to Dashboard
      </Link>

      <h1 className={styles.title}>Project History</h1>

      {!isValidBytes32 && (
        <div className={styles.notice}>
          Invalid proposal ID format. Must be a 32-byte hex string.
        </div>
      )}

      {isLoading && <div className={styles.loading}>Loading history...</div>}

      {error && (
        <div className={styles.notice} style={{ color: "#EF4444" }}>
          <strong>Error fetching history:</strong>
          <pre>{error}</pre>
        </div>
      )}

      {data && (
        <div className={styles.card}>
          <div className={styles.infoGrid}>
            <div className={styles.infoRow}>
              <span className={styles.label}>Title:</span>
              <span className={styles.value}>{data.proposal.title}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.label}>Status:</span>
              <span className={styles.status}>{data.proposal.status}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.label}>Proposal ID:</span>
              <span className={styles.value}>{data.proposal.proposalId}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.label}>Proposer:</span>
              <span className={styles.value}>
                {formatAddress(data.proposal.proposer)}
              </span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.label}>Budget:</span>
              <span className={styles.value}>{data.proposal.budget}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.label}>Bond Amount:</span>
              <span className={styles.value}>{data.proposal.bondAmount}</span>
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statBox}>
                <div className={styles.statLabel}>Vote Count</div>
                <div className={styles.statValue}>
                  {data.proposal.voteCount}
                </div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statLabel}>Report Count</div>
                <div className={styles.statValue}>
                  {data.proposal.reportCount}
                </div>
              </div>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.label}>IPFS Hash:</span>
              <span className={styles.value}>{data.proposal.ipfsHash}</span>
            </div>

            <div className={styles.fileSection}>
              <IpfsViewer ipfsHash={data.proposal.ipfsHash} />
            </div>

            <div className={styles.infoRow}>
              <span className={styles.label}>Timestamp:</span>
              <span className={styles.value}>
                {new Date(
                  Number(data.proposal.timestamp) * 1000
                ).toLocaleString()}
              </span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.label}>Approval:</span>
              <span
                className={`${styles.value} ${styles.approvalStatus} ${
                  data.approval?.approvalId &&
                  data.approval.approvalId !==
                    "0x0000000000000000000000000000000000000000000000000000000000000000"
                    ? styles.approved
                    : styles.notApproved
                }`}
              >
                {data.approval &&
                data.approval.approvalId &&
                data.approval.approvalId !==
                  "0x0000000000000000000000000000000000000000000000000000000000000000"
                  ? `Approved (ID: ${formatAddress(data.approval.approvalId)})`
                  : "Not approved"}
              </span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.label}>Completion:</span>
              <span
                className={`${styles.value} ${styles.completionStatus} ${
                  data.completion?.completionId &&
                  data.completion.completionId !==
                    "0x0000000000000000000000000000000000000000000000000000000000000000"
                    ? styles.completed
                    : styles.notCompleted
                }`}
              >
                {data.completion &&
                data.completion.completionId &&
                data.completion.completionId !==
                  "0x0000000000000000000000000000000000000000000000000000000000000000"
                  ? `Completed (ID: ${formatAddress(data.completion.completionId)})`
                  : "Not completed"}
              </span>
            </div>
          </div>

          <div className={styles.actions}>
            <div className={styles.actionsGrid}>
              <ReportProposal
                proposalId={proposalId}
                buttonClassName={styles.reportBtn}
              />
              <VoteProposal
                proposalId={proposalId}
                buttonClassName={styles.voteBtn}
              />
              {/* Show Approve button only when approval is not done */}
              {isZeroAddress(data?.approval?.approvalId) && (
                <>
                  <ActionButton
                    onClick={() => setShowApprovalForm(true)}
                    variant="approve"
                  >
                    Approve Proposal
                  </ActionButton>
                  {showApprovalForm && (
                    <div
                      className={styles.modalOverlay}
                      onClick={() => setShowApprovalForm(false)}
                    >
                      <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ApprovalProposal
                          defaultProposalId={proposalId}
                          onClose={() => setShowApprovalForm(false)}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
              {/* Show Complete button only when approval is done but completion is not */}
              {!isZeroAddress(data?.approval?.approvalId) &&
                isZeroAddress(data?.completion?.completionId) && (
                  <>
                    <ActionButton
                      onClick={() => setShowCompletionForm(true)}
                      variant="complete"
                    >
                      Complete Proposal
                    </ActionButton>
                    {showCompletionForm && (
                      <div
                        className={styles.modalOverlay}
                        onClick={() => setShowCompletionForm(false)}
                      >
                        <div
                          className={styles.modalContent}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <CompleteProposal
                            onClose={() => setShowCompletionForm(false)}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
