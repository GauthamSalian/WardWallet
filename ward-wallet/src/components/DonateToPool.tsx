"use client";
import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { MyContractABI } from "@/abis/myContractv2";
import styles from "./ActionButton.module.css";

export function DonateToPool() {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const contractAddress = process.env
    .NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY_2 as `0x${string}`;

  const { writeContract, isPending, data: txHash } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  async function handleDonate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      // Validate amount
      if (!amount || parseFloat(amount) <= 0) {
        setError("Please enter a valid amount");
        return;
      }

      // Convert ETH to Wei
      const weiAmount = parseEther(amount);

      // Call the contract function
      writeContract(
        {
          address: contractAddress,
          abi: MyContractABI,
          functionName: "fundRewardPool",
          value: weiAmount,
        },
        {
          onSuccess: () => {
            setSuccess(true);
            setAmount("");
            setTimeout(() => {
              setIsOpen(false);
              setSuccess(false);
            }, 2000);
          },
          onError: (err) => {
            console.error("Donation error:", err);
            setError(err.message || "Failed to donate. Please try again.");
          },
        }
      );
    } catch (err) {
      console.error("Donation error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    }
  }

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.actionButton}
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "10px 16px",
          fontSize: "14px",
          whiteSpace: "nowrap",
        }}
        disabled={isPending || isConfirming}
      >
        {isPending || isConfirming ? "Processing..." : "💜 Donate to Pool"}
      </button>

      {/* Donation Modal */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => !isPending && !isConfirming && setIsOpen(false)}
        >
          <div
            style={{
              background: "#1a1a2e",
              border: "1px solid #16c784",
              borderRadius: "12px",
              padding: "24px",
              maxWidth: "400px",
              width: "90%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ margin: "0 0 16px 0", color: "#fff" }}>
              Donate to Reward Pool
            </h2>
            <p style={{ opacity: 0.8, marginBottom: "16px" }}>
              Help fund community rewards and incentivize participation
            </p>

            {success ? (
              <div
                style={{
                  background: "rgba(22, 199, 132, 0.1)",
                  border: "1px solid #16c784",
                  borderRadius: "8px",
                  padding: "16px",
                  color: "#16c784",
                  textAlign: "center",
                }}
              >
                ✓ Donation successful! Thank you for your contribution.
              </div>
            ) : (
              <form onSubmit={handleDonate}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#aaa",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  Amount (ETH)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.5"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isPending || isConfirming}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    background: "#2d2d44",
                    border: "1px solid #16c784",
                    borderRadius: "6px",
                    color: "#16c784",
                    marginBottom: "16px",
                    boxSizing: "border-box",
                    fontSize: "14px",
                  }}
                />

                {error && (
                  <div
                    style={{
                      background: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid #ef4444",
                      borderRadius: "6px",
                      padding: "8px 12px",
                      color: "#ef4444",
                      fontSize: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    {error}
                  </div>
                )}

                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setAmount("");
                      setError("");
                    }}
                    disabled={isPending || isConfirming}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: "transparent",
                      border: "1px solid #aaa",
                      borderRadius: "6px",
                      color: "#aaa",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending || isConfirming || !amount}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      border: "none",
                      borderRadius: "6px",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "14px",
                      opacity: isPending || isConfirming || !amount ? 0.6 : 1,
                    }}
                  >
                    {isConfirming
                      ? "Confirming..."
                      : isPending
                        ? "Sending..."
                        : "Donate"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
