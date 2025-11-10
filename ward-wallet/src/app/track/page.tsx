"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Link from "next/link";
import styles from "./track.module.css";
import { Navbar } from "@/components/Navbar";
import { FiArrowLeft } from "react-icons/fi";

interface Interaction {
  proposalId: string;
  action: "vote" | "report";
  timestamp: number;
}

export default function TrackPage() {
  const { address } = useAccount();
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [filter, setFilter] = useState<"all" | "vote" | "report">("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchInteractions() {
      if (!address) {
        setInteractions([]);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/interactions?user=${address}`);
        const data = await response.json();
        setInteractions(data);
      } catch (error) {
        console.error("Error fetching interactions:", error);
      }
      setIsLoading(false);
    }

    fetchInteractions();
  }, [address]);

  const filteredInteractions = interactions.filter((interaction) =>
    filter === "all" ? true : interaction.action === filter
  );

  if (!address) {
    return (
      <>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.header}>
            <Link href="/" className={styles.backButton}>
              <FiArrowLeft /> Back to Dashboard
            </Link>
          </div>
          <h1 className={styles.title}>Track Interactions</h1>
          <p className={styles.notice}>
            Please connect your wallet to view your interactions.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <Link href="/" className={styles.backButton}>
            <FiArrowLeft /> Back to Dashboard
          </Link>
        </div>
        <h1 className={styles.title}>Track Interactions</h1>

        <div className={styles.filters}>
          <button
            className={`${styles.filterButton} ${filter === "all" ? styles.active : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`${styles.filterButton} ${filter === "vote" ? styles.active : ""}`}
            onClick={() => setFilter("vote")}
          >
            Votes
          </button>
          <button
            className={`${styles.filterButton} ${filter === "report" ? styles.active : ""}`}
            onClick={() => setFilter("report")}
          >
            Reports
          </button>
        </div>

        {isLoading ? (
          <p className={styles.loading}>Loading your interactions...</p>
        ) : filteredInteractions.length > 0 ? (
          <div className={styles.interactionsList}>
            {filteredInteractions.map((interaction) => (
              <div
                key={`${interaction.proposalId}-${interaction.timestamp}`}
                className={styles.interactionCard}
              >
                <div className={styles.interactionHeader}>
                  <span
                    className={`${styles.badge} ${styles[interaction.action]}`}
                  >
                    {interaction.action.toUpperCase()}
                  </span>
                  <span className={styles.timestamp}>
                    {new Date(interaction.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className={styles.proposalId}>
                  Proposal: {interaction.proposalId.slice(0, 10)}...
                </p>
                <Link
                  href={`/history/${interaction.proposalId}`}
                  className={styles.viewLink}
                >
                  View Project History{" "}
                  <FiArrowLeft style={{ transform: "rotate(180deg)" }} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noInteractions}>
            No {filter === "all" ? "" : filter} interactions found.
          </p>
        )}
      </div>
    </>
  );
}
