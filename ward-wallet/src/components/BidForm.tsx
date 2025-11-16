"use client";

import React, { useState } from "react";
import styles from "./BidForm.module.css";

interface BidFormProps {
  proposalId: string;
  bidderAddress: string;
  onBidSubmitted?: () => void;
}

export function BidForm({
  proposalId,
  bidderAddress,
  onBidSubmitted,
}: BidFormProps) {
  const [bidAmount, setBidAmount] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bidAmount || !companyName.trim()) {
      setError("Bid amount and company name are required");
      return;
    }

    if (parseFloat(bidAmount) <= 0) {
      setError("Bid amount must be greater than 0");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(false);

      const response = await fetch("/api/submitBid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proposalId,
          bidderAddress,
          bidAmount: parseFloat(bidAmount),
          companyName: companyName.trim(),
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit bid");
      }

      setBidAmount("");
      setCompanyName("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

      if (onBidSubmitted) {
        onBidSubmitted();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error submitting bid");
      console.error("Error submitting bid:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.bidFormContainer}>
      <h3 className={styles.title}>Place a Bid</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="companyName" className={styles.label}>
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Your company name"
            className={styles.input}
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="bidAmount" className={styles.label}>
            Bid Amount (INR)
          </label>
          <input
            type="number"
            id="bidAmount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder="0.00"
            step="0.001"
            min="0"
            className={styles.input}
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? "Submitting..." : "Submit Bid"}
          </button>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && (
          <div className={styles.successMessage}>
            Bid submitted successfully!
          </div>
        )}
      </form>
    </div>
  );
}
