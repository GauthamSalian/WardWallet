"use client";
import { Navbar } from "@/components/Navbar";
import { DonateToPool } from "@/components/DonateToPool";
import { RealProposalsList } from "@/components/RealProposalsList";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { keccak256, toHex } from "viem";
import styles from "./Dashboard.module.css";

interface Proposal {
  id: string;
  title: string;
}

export default function DashboardPage() {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState<Proposal[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch proposals for autocomplete
  useEffect(() => {
    if (!searchInput.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    fetch(`/api/proposals`)
      .then((res) => res.json())
      .then((data: Proposal[]) => {
        // Filter by title or id match
        const filtered = data.filter(
          (p) =>
            p.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            p.id.toLowerCase().includes(searchInput.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 5)); // Show top 5
        setShowSuggestions(true);
      })
      .catch((err) => console.error("Error fetching proposals:", err))
      .finally(() => setLoading(false));
  }, [searchInput]);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!searchInput.trim()) return;

    // If there's a suggestion selected, use its ID, otherwise hash the input
    const proposalId =
      suggestions.length > 0
        ? suggestions[0].id
        : keccak256(toHex(searchInput.trim()));
    router.push(`/history/${proposalId}`);
    setSearchInput("");
    setShowSuggestions(false);
  }

  function handleSelectSuggestion(suggestion: Proposal) {
    router.push(`/history/${suggestion.id}`);
    setSearchInput("");
    setShowSuggestions(false);
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <form
          onSubmit={handleSearch}
          className={styles.searchWrapper}
          style={{ position: "relative" }}
        >
          <input
            type="text"
            placeholder="Search proposals..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => searchInput && setShowSuggestions(true)}
            className={styles.searchInput}
            aria-label="Search proposals"
            autoComplete="off"
          />
          <button
            type="submit"
            className={styles.searchIcon}
            aria-label="Search"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <FiSearch />
          </button>

          {/* Autocomplete Suggestions */}
          {showSuggestions && searchInput && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "#1a1a2e",
                border: "1px solid #16c784",
                borderTop: "none",
                borderRadius: "0 0 8px 8px",
                maxHeight: "200px",
                overflowY: "auto",
                zIndex: 100,
                marginTop: "-4px",
              }}
            >
              {loading ? (
                <div
                  style={{ padding: "12px", color: "#888", fontSize: "12px" }}
                >
                  Loading...
                </div>
              ) : suggestions.length > 0 ? (
                suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "12px 16px",
                      textAlign: "left",
                      background: "transparent",
                      border: "none",
                      color: "#16c784",
                      cursor: "pointer",
                      fontSize: "14px",
                      borderBottom: "1px solid #333",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "#2d2d44";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "transparent";
                    }}
                  >
                    <div style={{ fontWeight: 500 }}>{suggestion.title}</div>
                    <div style={{ fontSize: "11px", opacity: 0.7 }}>
                      {suggestion.id.slice(0, 10)}...
                    </div>
                  </button>
                ))
              ) : (
                <div
                  style={{ padding: "12px", color: "#888", fontSize: "12px" }}
                >
                  No proposals found
                </div>
              )}
            </div>
          )}
        </form>

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

        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <DonateToPool />
        </div>

        <div className={styles.featuredSection}>
          <h2 className={styles.featuredHeading}>Featured Proposals</h2>
          <RealProposalsList />
        </div>
      </div>
    </>
  );
}
