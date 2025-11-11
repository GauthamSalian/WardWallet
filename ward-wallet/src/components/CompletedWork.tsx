import { useState, useEffect } from "react";
import { useWriteContract } from "wagmi";
import { MyContractABI } from "@/abis/myContractv2";
import styles from "./ApprovalProposal.module.css";

type CompleteProposalProps = {
  onClose?: () => void;
};

export function CompleteProposal({ onClose }: CompleteProposalProps) {
  const [completionId, setCompletionId] = useState("");
  const [approvalId, setApprovalId] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { writeContract, isPending, isError, isSuccess } = useWriteContract();

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
      let hashToUse = ipfsHash;
      if (file) {
        hashToUse = await handleIpfsUpload();
        setIpfsHash(hashToUse);
      }

      writeContract({
        address: process.env
          .NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY_2 as `0x${string}`,
        abi: MyContractABI,
        functionName: "markAsComplete",
        args: [
          completionId as `0x${string}`,
          approvalId as `0x${string}`,
          hashToUse,
          Number(Math.floor(Date.now() / 1000)),
        ],
      });
    } catch (err) {
      console.error("IPFS upload failed:", err);
      alert(
        "Failed to upload file to IPFS: " +
          (err instanceof Error ? err.message : String(err))
      );
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  }

  useEffect(() => {
    if (isSuccess && onClose) {
      onClose();
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
          required
          value={completionId}
          onChange={(e) => setCompletionId(e.target.value)}
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
          required
          value={approvalId}
          onChange={(e) => setApprovalId(e.target.value)}
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
        />
        <br />
        <button type="submit" disabled={isPending} className={styles.button}>
          {isPending ? "Submitting..." : "Submit Completion"}
        </button>

        <div className={styles.feedbackContainer}>
          {isError && (
            <p className={styles.errorMessage}>Error completing proposal.</p>
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
