"use client";

import { useState } from "react";
import Link from "next/link";
import { ConnectWallet } from "./ConnectWallet";
import styles from "./Navbar.module.css";

export function Navbar() {
  const [location] = useState("Udupi"); // Can be made dynamic later

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <Link href="/" className={styles.logo}>
          Ward Wallet
        </Link>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginLeft: "20px",
            fontSize: "14px",
            color: "#16c784",
          }}
        >
          <span>📍</span>
          <span>{location}</span>
        </div>
      </div>

      <div className={styles.navRight}>
        <ConnectWallet />
      </div>
    </nav>
  );
}
