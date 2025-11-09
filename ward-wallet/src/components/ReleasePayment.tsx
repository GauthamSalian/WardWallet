"use client";

import { useEffect, useState } from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useWatchContractEvent,
} from "wagmi";
import { MyContractABI } from "@/abis/myContract";
import styles from "./ApprovalProposal.module.css";

interface ReleasePaymentProps {
  approvalId: `0x${string}`; // Passed from parent or route
}

export function ReleasePayment({ approvalId }: ReleasePaymentProps) {
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

  function handleRelease() {
    if (!approvalId) {
      console.warn("No approval ID provided.");
      return;
    }

    writeContract({
      address: process.env.NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY as `0x${string}`,
      abi: MyContractABI,
      functionName: "releasePayment",
      args: [approvalId],
    });
  }

  const isLoading = isPending || isConfirming;
  const isError = isWriteError || isConfirmError;

  if (!isClient) return null;

  return (
    <div className={styles.releaseContainer}>
      <button
        onClick={handleRelease}
        disabled={isLoading}
        className={styles.button}
      >
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
    </div>
  );
}
