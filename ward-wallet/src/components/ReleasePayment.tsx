"use client";

import { useEffect, useState } from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useWatchContractEvent,
} from "wagmi";
import { publicClient } from "@/utils/publicClient";
import { MyContractABI } from "@/abis/myContractv2";
import styles from "./ApprovalProposal.module.css";

interface ReleasePaymentProps {
  approvalId: `0x${string}`; // Passed from parent or route
}

export function ReleasePayment({ approvalId }: ReleasePaymentProps) {
  const [isClient, setIsClient] = useState(false);
  const [releaseCount, setReleaseCount] = useState<number>(0);
  const [releaseLoading, setReleaseLoading] = useState(false);
  const [releaseError, setReleaseError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // fetch release count from chain
  useEffect(() => {
    if (!isClient || !approvalId) return;
    let mounted = true;
    setReleaseLoading(true);
    setReleaseError(null);

    try {
      publicClient
        .readContract({
          address: process.env
            .NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY_2 as `0x${string}`,
          abi: MyContractABI,
          functionName: "paymentReleaseCount",
          args: [approvalId],
        })
        .then((res) => {
          if (!mounted) return;
          setReleaseCount(Number(res ?? 0));
        })
        .catch((err) => {
          if (!mounted) return;
          console.warn("Failed to read paymentReleaseCount:", err);
          setReleaseCount(0);
        })
        .finally(() => {
          if (!mounted) return;
          setReleaseLoading(false);
        });
    } catch (e) {
      if (!mounted) return;
      console.warn("Error in ReleasePayment effect:", e);
      setReleaseCount(0);
      setReleaseLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, [isClient, approvalId]);

  // write hook (wagmi)
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
    address: process.env.NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY_2 as `0x${string}`,
    abi: MyContractABI,
    eventName: "PaymentReleased",
    onLogs(logs) {
      // refresh release count when event occurs
      try {
        if (!approvalId) return;
        publicClient
          .readContract({
            address: process.env
              .NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY_2 as `0x${string}`,
            abi: MyContractABI,
            functionName: "paymentReleaseCount",
            args: [approvalId],
          })
          .then((res) => setReleaseCount(Number(res ?? 0)))
          .catch((e) =>
            console.warn("Failed to refresh paymentReleaseCount:", e)
          );
      } catch (e) {
        console.warn("Error in PaymentReleased event handler:", e);
      }
    },
    enabled: isClient,
  });

  function handleRelease() {
    if (!approvalId) return;
    if (releaseCount >= 4) return;

    writeContract({
      address: process.env
        .NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY_2 as `0x${string}`,
      abi: MyContractABI,
      functionName: "releasePayment",
      args: [approvalId],
    });
  }

  const isLoading = isPending || isConfirming || releaseLoading;
  const isError = Boolean(isWriteError || isConfirmError || releaseError);

  if (!isClient) return null;

  return (
    <div className={styles.releaseContainer}>
      <button
        onClick={handleRelease}
        disabled={isLoading || releaseCount >= 4}
        className={styles.button}
      >
        {releaseCount >= 4
          ? "Payment fully released"
          : isPending
            ? "Waiting for signature..."
            : isConfirming
              ? "Confirming..."
              : `Release Payment (${releaseCount}/4)`}
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
