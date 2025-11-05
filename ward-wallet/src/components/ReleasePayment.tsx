"use client";

import { useState, useEffect } from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useWatchContractEvent,
} from "wagmi";
import { MyContractABI } from "@/abis/myContract";
import styles from "./ApprovalProposal.module.css";

export function ReleasePayment() {
  const [approvalId, setApprovalId] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    writeContract,
    isPending,
    data: hash,
    isError: isWriteError,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isConfirmError,
  } = useWaitForTransactionReceipt({ hash });

  useWatchContractEvent({
    address: process.env.NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY as `0x${string}`,
    abi: MyContractABI,
    eventName: "PaymentReleased",
    onLogs(logs) {
      console.log("New payment released!", logs);
    },
    enabled: isClient,
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    writeContract({
      address: process.env.NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY as `0x${string}`,
      abi: MyContractABI,
      functionName: "releasePayment",
      args: [approvalId as `0x${string}`],
    });
  }

  const isLoading = isPending || isConfirming;
  const isError = isWriteError || isConfirmError;

  if (!isClient) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.inputGroup}>
        <label htmlFor="ApprovalId" className={styles.label}>
          Approval ID to Release Payment:
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
      </div>

      <button type="submit" disabled={isLoading} className={styles.button}>
        {isPending
          ? "Waiting for signature..."
          : isConfirming
            ? "Confirming transaction..."
            : "Release Payment"}
      </button>

      <div className={styles.feedbackContainer}>
        {isConfirmed && (
          <p className={styles.successMessage}>
            Payment released successfully!
          </p>
        )}
        {isError && (
          <p className={styles.errorMessage}>Error releasing payment.</p>
        )}
      </div>
    </form>
  );
}
