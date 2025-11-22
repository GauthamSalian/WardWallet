import { useState, useEffect } from "react";
import { useWriteContract } from "wagmi";
import { MyContractABI } from "@/abis/myContractv2";
import styles from "./ApprovalProposal.module.css";

type CompleteProposalProps = {
  approvalId: `0x${string}`;
  onClose?: () => void;
};

export function CompleteProposal({
  approvalId,
  onClose,
}: CompleteProposalProps) {
  const [completionId, setCompletionId] = useState<`0x${string}`>(() => {
    const id = `0x${Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")}` as `0x${string}`;
    return id;
  });
  const [ipfsHash, setIpfsHash] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { writeContract, isPending, isError, isSuccess } = useWriteContract();

  // Generate a unique completion ID on mount
  useEffect(() => {
    // ID is already generated in state initializer
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setUploading(false);

      // Call API to mark proposal as completed
      fetch("/api/update-proposal-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proposalId: approvalId, // assuming approvalId === proposalId
          newStatus: "completed",
        }),
      }).catch((err) => {
        console.error("Failed to update proposal status:", err);
      });

      if (onClose) onClose();
    }
  }, [isSuccess, onClose, approvalId]);

  async function handleIpfsUpload(): Promise<string> {
    if (!file) throw new Error("No file selected.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", `completion-${completionId}`);
    formData.append("approvalId", approvalId);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to upload to IPFS");

    return data.ipfsHash as string;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setUploading(true);
      let hashToUse = ipfsHash;
      if (file) {
        hashToUse = await handleIpfsUpload();
        setIpfsHash(hashToUse);
      }

      // Ensure we have required fields
      if (!completionId || !approvalId || !hashToUse) {
        alert(
          "Missing required fields: Completion ID, Approval ID, or IPFS Hash"
        );
        setUploading(false);
        return;
      }

      writeContract({
        address: process.env
          .NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY_2 as `0x${string}`,
        abi: MyContractABI,
        functionName: "markAsComplete",
        args: [
          completionId,
          approvalId,
          hashToUse,
          Math.floor(Date.now() / 1000),
        ],
      });
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      alert("Failed: " + (err instanceof Error ? err.message : String(err)));
      setUploading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  }

  useEffect(() => {
    if (isSuccess) {
      setUploading(false);
      if (onClose) onClose();
    }
  }, [isSuccess, onClose]);

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.inputGroup}>
        <label htmlFor="CompletionId" className={styles.label}>
          Completion ID:
        </label>
        <input
          type="text"
          name="CompletionId"
          id="CompletionId"
          disabled
          value={completionId}
          className={styles.input}
        />
        <br />
        <label htmlFor="ApprovalId" className={styles.label}>
          Approval ID:
        </label>
        <input
          type="text"
          name="ApprovalId"
          id="ApprovalId"
          disabled
          value={approvalId}
          className={styles.input}
        />
        <br />
        <label htmlFor="File" className={styles.label}>
          Completion File (optional)
        </label>
        <input
          type="file"
          id="File"
          onChange={handleFileChange}
          className={styles.input}
        />
        <br />
        <label htmlFor="IPFSHash" className={styles.label}>
          Or provide IPFS Hash directly
        </label>
        <input
          type="text"
          name="IPFSHash"
          id="IPFSHash"
          value={ipfsHash}
          onChange={(e) => setIpfsHash(e.target.value)}
          className={styles.input}
          placeholder="Enter IPFS hash (QmXxxx...)"
        />
        <br />
        <button
          type="submit"
          disabled={isPending || uploading}
          className={styles.button}
        >
          {uploading
            ? "Uploading..."
            : isPending
              ? "Submitting..."
              : "Submit Completion"}
        </button>

        <div className={styles.feedbackContainer}>
          {isError && (
            <p className={styles.errorMessage}>
              Error completing proposal. Check console for details.
            </p>
          )}
          {isSuccess && (
            <p className={styles.successMessage}>
              Proposal marked as complete!
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
