"use client";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import styles from "./Dashboard.module.css"; // Create this CSS module

export default function DashboardPage() {
  return (
    <>
      <Navbar />

      <div className={styles.container}>
        {/* Search Bar */}
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search proposals..."
            className={styles.searchInput}
          />
          <FiSearch className={styles.searchIcon} />
        </div>

        {/* Action Buttons */}
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

        {/* Featured Section */}
        <div className={styles.featuredSection}>
          <h2 className={styles.featuredHeading}>Featured Proposals</h2>
          <div className={styles.cardGrid}>
            {/* Replace with dynamic proposal cards */}
            <div className={styles.card}>Proposal A</div>
            <div className={styles.card}>Proposal B</div>
            <div className={styles.card}>Proposal C</div>
          </div>
        </div>
      </div>
    </>
  );
}
