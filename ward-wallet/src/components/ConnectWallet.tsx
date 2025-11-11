"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useState } from "react";
import styles from "./Navbar.module.css";

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [showMenu, setShowMenu] = useState(false);

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  if (isConnected && address) {
    return (
      <button
        onClick={() => disconnect()}
        className={styles.connectButton}
        title={address}
      >
        {shortAddress} ✓
      </button>
    );
  }

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={styles.connectButton}
      >
        Connect Wallet
      </button>
      {showMenu && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            background: "#1a1a2e",
            border: "1px solid #16c784",
            borderRadius: "8px",
            minWidth: "150px",
            zIndex: 1000,
            marginTop: "8px",
          }}
        >
          {connectors.length > 0 ? (
            connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => {
                  connect({ connector });
                  setShowMenu(false);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px 15px",
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
                {connector.name}
              </button>
            ))
          ) : (
            <div
              style={{
                padding: "10px 15px",
                fontSize: "12px",
                color: "#888",
              }}
            >
              No connectors available
            </div>
          )}
        </div>
      )}
    </div>
  );
}
