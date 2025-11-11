"use client";

import React, { useState } from "react";
import styles from "./CommentForm.module.css";

interface CommentFormProps {
  proposalId: string;
  author: string;
  onCommentSubmitted?: () => void;
}

export function CommentForm({
  proposalId,
  author,
  onCommentSubmitted,
}: CommentFormProps) {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(false);

      const response = await fetch("/api/comments/write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposalId, author, comment }),
      });

      if (!response.ok) throw new Error("Failed to submit comment");

      setComment("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

      if (onCommentSubmitted) {
        onCommentSubmitted();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error submitting comment");
      console.error("Error submitting comment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.commentFormContainer}>
      <h3 className={styles.title}>Leave a Comment</h3>
      <form onSubmit={submitComment} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Author: {author}</label>
        </div>

        <div className={styles.formGroup}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts or updates about this project..."
            className={styles.textarea}
            rows={4}
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? "Submitting..." : "Post Comment"}
          </button>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && (
          <div className={styles.successMessage}>
            Comment posted successfully!
          </div>
        )}
      </form>
    </div>
  );
}
