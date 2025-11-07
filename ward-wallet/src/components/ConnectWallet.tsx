"use client";

import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
// Import the styles you created for the navbar
import styles from "./Navbar.module.css";

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  return (
    <button onClick={() => open()} className={styles.connectButton}>
      {isConnected ? shortAddress : "Connect Wallet"}
    </button>
  );
}
