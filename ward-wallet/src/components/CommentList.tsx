"use client";

import React, { useEffect, useState } from "react";
import styles from "./CommentList.module.css";

interface Comment {
  proposalId: string;
  commentId: string;
  timestamp: number;
  author: string;
  comment: string;
}

export function CommentList({ proposalId }: { proposalId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/comments/${proposalId}`);
        if (!response.ok) throw new Error("Failed to fetch comments");
        const data = await response.json();
        setComments(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading comments");
        console.error("Error fetching comments:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (proposalId) {
      fetchComments();
    }
  }, [proposalId]);

  if (isLoading) {
    return <div className={styles.loadingContainer}>Loading comments...</div>;
  }

  if (error) {
    return <div className={styles.errorContainer}>Error: {error}</div>;
  }

  return (
    <div className={styles.commentListContainer}>
      <h3 className={styles.title}>Project Comments ({comments.length})</h3>
      {comments.length === 0 ? (
        <div className={styles.emptyState}>
          No comments yet. Be the first to comment!
        </div>
      ) : (
        <div className={styles.commentsList}>
          {comments.map((comment) => (
            <div key={comment.commentId} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <span className={styles.author}>{comment.author}</span>
                <span className={styles.timestamp}>
                  {new Date(comment.timestamp * 1000).toLocaleString()}
                </span>
              </div>
              <div className={styles.commentBody}>{comment.comment}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
