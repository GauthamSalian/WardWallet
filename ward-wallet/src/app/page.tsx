"use client";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import styles from "./Dashboard.module.css";

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search proposals..."
            className={styles.searchInput}
            aria-label="Search proposals"
          />
          <FiSearch className={styles.searchIcon} aria-hidden />
        </div>

        <div className={styles.buttonGrid}>
          <Link href="/create-proposal" className={styles.actionButton}>
            Create Proposal
          </Link>
          <Link href="/track" className={styles.actionButton}>
            Track Interactions
          </Link>
          <Link href="/my-proposals" className={styles.actionButton}>
            My Proposals
          </Link>
          <Link href="/summary" className={styles.actionButton}>
            Summary
          </Link>
        </div>

        <div className={styles.featuredSection}>
          <h2 className={styles.featuredHeading}>Featured Proposals</h2>
          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <span className={styles.badge}>Citizen</span>
              <h3 style={{ marginTop: 10, marginBottom: 8 }}>Road Repair Drive</h3>
              <p style={{ opacity: 0.85 }}>
                Ward 12 • Priority: High • 126 Votes
              </p>
            </div>
            <div className={styles.card}>
              <span className={styles.badge}>Govt</span>
              <h3 style={{ marginTop: 10, marginBottom: 8 }}>Jan Manch Feedback</h3>
              <p style={{ opacity: 0.85 }}>
                Next Session: 14 Nov • 4:00 PM
              </p>
            </div>
            <div className={styles.card}>
              <span className={styles.badge}>Citizen</span>
              <h3 style={{ marginTop: 10, marginBottom: 8 }}>Streetlight Upgrade</h3>
              <p style={{ opacity: 0.85 }}>
                Ward 7 • In Review • 64 Votes
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
