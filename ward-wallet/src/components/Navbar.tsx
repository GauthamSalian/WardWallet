"use client";

import { useState } from "react";
import Link from "next/link";
import { ConnectWallet } from "./ConnectWallet";
import styles from "./Navbar.module.css";

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <Link href="/" className={styles.logo}>
          Ward Wallet
        </Link>
      </div>

      <div className={styles.navRight}>
        <ConnectWallet />
      </div>
    </nav>
  );
}
