"use client";
import React from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { MyContractABI } from "@/abis/myContractv2";
import { publicClient } from "@/utils/publicClient";

import { ReportProposal } from "@/components/ReportProposal";
import { VoteProposal } from "@/components/VoteProposal";
import { IpfsViewer } from "@/components/IpfsViewer";
import { ApprovalProposal } from "@/components/ApproveProposal";
import { CompleteProposal } from "@/components/CompletedWork";
import { ReleasePayment } from "@/components/ReleasePayment";
import { RejectProposal } from "@/components/RejectProposal";
import { ActionButton } from "@/components/ActionButton";
import { CommentList } from "@/components/CommentList";
import { CommentForm } from "@/components/CommentForm";
import { BidForm } from "./BidForm";
import { BidCard } from "./BidCard";
import styles from "@/app/history/[id]/GetHistory.module.css";
import { useAccount } from "wagmi";
import { useRoles } from "@/utils/roles";
import { Bid } from "@/types/bid";

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
    proposalId: `0x${string}`;
    completionId: `0x${string}`;
    official: `0x${string}`;
    contractor: `0x${string}`;
    timestamp: number;
  };
  completion?: {
    completionId: `0x${string}`;
    completionNotesIpfsHash: string;
    timestamp: number;
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
  const [refreshComments, setRefreshComments] = React.useState(false);
  const [bids, setBids] = React.useState<Bid[]>([]);
  const [bidsLoading, setBidsLoading] = React.useState(false);
  const [bidsError, setBidsError] = React.useState<string | null>(null);
  const { address } = useAccount();
  const roles = useRoles();

  // fetch bids for this proposal
  React.useEffect(() => {
    if (!proposalId) return;
    let mounted = true;
    setBidsLoading(true);
    setBidsError(null);

    fetch(`/api/bids/${proposalId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch bids: ${res.status}`);
        return res.json();
      })
      .then((items) => {
        if (!mounted) return;
        setBids(items || []);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error(err);
        setBidsError(err.message || String(err));
      })
      .finally(() => {
        if (!mounted) return;
        setBidsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [proposalId]);
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
          .NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY_2 as `0x${string}`,
        abi: MyContractABI,
        functionName: "getProjectHistory",
        args: [proposalId],
      })
      .then((result) => {
        setData(result as ProjectHistoryData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || String(err));
        setIsLoading(false);
      });
  }, [proposalId, isValidBytes32]);

  return (
    <div>
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

            {/* Approval Details Section */}
            {data.approval && !isZeroAddress(data.approval.approvalId) && (
              <div className={styles.infoSection}>
                <h2 className={styles.subTitle}>Approval Details</h2>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Approval ID:</span>
                  <span className={styles.value}>
                    {formatAddress(data.approval.approvalId)}
                  </span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Official:</span>
                  <span className={styles.value}>
                    {formatAddress(data.approval.official)}
                  </span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Contractor:</span>
                  <span className={styles.value}>
                    {formatAddress(data.approval.contractor)}
                  </span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Approval Timestamp:</span>
                  <span className={styles.value}>
                    {new Date(
                      Number(data.approval.timestamp) * 1000
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* Completion Details Section */}
            {data.completion &&
              !isZeroAddress(data.completion.completionId) && (
                <div className={styles.infoSection}>
                  <h2 className={styles.subTitle}>Completion Details</h2>
                  <div className={styles.infoRow}>
                    <span className={styles.label}>Completion ID:</span>
                    <span className={styles.value}>
                      {formatAddress(data.completion.completionId)}
                    </span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.label}>
                      Completion Notes IPFS Hash:
                    </span>
                    <span className={styles.value}>
                      {data.completion.completionNotesIpfsHash}
                    </span>
                  </div>
                  <div className={styles.fileSection}>
                    <IpfsViewer
                      ipfsHash={data.completion.completionNotesIpfsHash}
                    />
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.label}>Completion Timestamp:</span>
                    <span className={styles.value}>
                      {new Date(
                        Number(data.completion.timestamp) * 1000
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
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

              {/* Reject: only show when not yet approved AND caller is a contractor */}
              {isZeroAddress(data?.approval?.approvalId) &&
                roles.isContractor && (
                  <RejectProposal
                    proposalId={proposalId}
                    buttonClassName={styles.rejectBtn}
                  />
                )}

              {/* Approve: only show when not yet approved AND caller is an official */}
              {isZeroAddress(data?.approval?.approvalId) && (
                <>
                  {/** roles hook determines whether current account is an official/contractor */}
                  {/** show approve button only to officials */}
                  {/** useRoles is imported above; safe to call here */}
                  {roles.isOfficial && (
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
                </>
              )}

              {/* Release Payment: shown when approval exists (can release 3x before completion + 1x after) */}
              {!isZeroAddress(data?.approval?.approvalId) &&
                data?.approval?.approvalId && (
                  <ReleasePayment approvalId={data.approval.approvalId} />
                )}

              {/* Complete: show to the contractor for this approval when approval exists and completion not set */}
              {!isZeroAddress(data?.approval?.approvalId) &&
                isZeroAddress(data?.completion?.completionId) &&
                address &&
                data?.approval?.contractor &&
                address.toLowerCase() ===
                  data.approval.contractor.toLowerCase() && (
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
                            approvalId={data.approval.approvalId}
                            onClose={() => setShowCompletionForm(false)}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
            </div>
          </div>

          {/* Comments Section */}
          <CommentList
            proposalId={proposalId}
            key={refreshComments ? "refresh" : "normal"}
          />

          {address && (
            <CommentForm
              proposalId={proposalId}
              author={address}
              onCommentSubmitted={() => setRefreshComments(!refreshComments)}
            />
          )}

          {/* Bids Section */}
          <div className={styles.infoSection}>
            <h2 className={styles.subTitle}>Bids</h2>
            {isZeroAddress(data?.approval?.approvalId) &&
              roles.isContractor && (
                <BidForm
                  proposalId={proposalId}
                  bidderAddress={address || ""}
                  onBidSubmitted={() => {
                    // refetch bids after a successful submission
                    setBidsLoading(true);
                    fetch(`/api/bids/${proposalId}`)
                      .then((r) =>
                        r.ok ? r.json() : Promise.reject(r.statusText)
                      )
                      .then((items) => setBids(items || []))
                      .catch((e) => setBidsError(String(e)))
                      .finally(() => setBidsLoading(false));
                  }}
                />
              )}

            {bidsLoading && <div>Loading bids…</div>}
            {bidsError && <div style={{ color: "#EF4444" }}>{bidsError}</div>}

            {!bidsLoading && !bidsError && (
              <div>
                {bids && bids.length > 0 ? (
                  bids.map((b) => (
                    <BidCard bid={b} key={b.bidId || b.timestamp} />
                  ))
                ) : (
                  <div style={{ color: "#94A3B8" }}>No bids yet</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
