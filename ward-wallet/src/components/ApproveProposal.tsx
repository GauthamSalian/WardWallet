import { useEffect, useState } from "react";
import { useWriteContract } from "wagmi";
import { MyContractABI } from "@/abis/myContract";
import styles from "./ApprovalProposal.module.css";

type ApprovalProposalProps = {
  defaultProposalId?: string;
  onClose?: () => void;
};

export function ApprovalProposal({
  defaultProposalId,
  onClose,
}: ApprovalProposalProps) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [approvalId, setApprovalId] = useState("");
  const [proposalId, setProposalId] = useState(defaultProposalId ?? "");
  const [contractor, setContractor] = useState("");

  const { writeContract, isPending, isError, isSuccess } = useWriteContract();

  useEffect(() => {
    if (defaultProposalId) setProposalId(defaultProposalId);
  }, [defaultProposalId]);

  useEffect(() => {
    if (isSuccess && onClose) onClose();
  }, [isSuccess, onClose]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevents the page from reloading
    handleWriteContract();
  }

  function handleWriteContract() {
    writeContract({
      address: process.env.NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY as `0x${string}`,
      abi: MyContractABI,
      functionName: "approvalProposal",
      args: [
        approvalId as `0x${string}`,
        proposalId as `0x${string}`,
        contractor as `0x${string}`,
        Number(Math.floor(Date.now() / 1000)),
      ],
    });
  }

  return (
    <>
      <button
        onClick={() => setIsFormVisible(true)}
        className={styles.button}
        style={{
          background: "linear-gradient(135deg, #4ade80, #22d3ee)",
          width: "100%",
          padding: "14px 24px",
          borderRadius: "12px",
          fontSize: "1.15rem",
        }}
      >
        Approve Proposal
      </button>
      {isFormVisible && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsFormVisible(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit} className={styles.formContainer}>
              <div className={styles.inputGroup}>
                <label htmlFor="ApprovalId" className={styles.label}>
                  Approval ID:
                </label>
                <input
                  type="text"
                  id="ApprovalId"
                  name="ApprovalId"
                  required
                  value={approvalId}
                  onChange={(e) => setApprovalId(e.target.value)}
                  className={styles.input}
                />
                <br />
                <label htmlFor="ProposalId" className={styles.label}>
                  Proposal ID:
                </label>
                <input
                  type="text"
                  id="ProposalId"
                  name="ProposalId"
                  required
                  value={proposalId}
                  onChange={(e) => setProposalId(e.target.value)}
                  className={styles.input}
                />
                <br />
                <label htmlFor="Contractor" className={styles.label}>
                  Contractor Address:
                </label>
                <input
                  type="text"
                  name="Contractor"
                  id="Contractor"
                  required
                  value={contractor}
                  onChange={(e) => setContractor(e.target.value)}
                  className={styles.input}
                />
                <br />
                <div className={styles.buttonGroup}>
                  <button
                    type="submit"
                    disabled={isPending}
                    className={styles.button}
                  >
                    {isPending ? "Submitting..." : "Submit Approval"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFormVisible(false)}
                    className={styles.button}
                    style={{
                      background: "linear-gradient(135deg, #ef4444, #b91c1c)",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <div className={styles.feedbackContainer}>
                {isSuccess && (
                  <p
                    className={styles.successMessage}
                    style={{ color: "green" }}
                  >
                    Transaction submitted successfully!
                  </p>
                )}
                {isError && (
                  <p className={styles.errorMessage} style={{ color: "red" }}>
                    Error submitting transaction.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
