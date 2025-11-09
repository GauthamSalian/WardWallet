"use client";
import { Navbar } from "@/components/Navbar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import styles from "./Dashboard.module.css";
import { keccak256, toHex } from "viem";

export default function DashboardPage() {
  const [searchId, setSearchId] = useState("");
  const router = useRouter();

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = searchId.trim();
    if (trimmed) {
      const bytes32Id = keccak256(toHex(trimmed));
      router.push(`/history/${bytes32Id}`);
    }
  }

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search proposal ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            <FiSearch className={styles.searchIcon} />
          </button>
        </form>

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
