"use client";

import { useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi"; // You'll need to install react-icons
import { ConnectWallet } from "./ConnectWallet";
import styles from "./Navbar.module.css";

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <Link href="/" className={styles.logo}>
          Ward Wallet
        </Link>
      </div>

      <div className={styles.navRight}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search..."
            // This CSS class changes based on the 'isSearchOpen' state
            className={`${styles.searchInput} ${
              isSearchOpen ? styles.searchInputActive : ""
            }`}
          />
          <button
            className={styles.searchIcon}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <FiSearch />
          </button>
        </div>
        <ConnectWallet />
      </div>
    </nav>
  );
}
