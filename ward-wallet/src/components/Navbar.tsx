"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAccount } from "wagmi"; // Needed to check if user is connected
import { ConnectWallet } from "./ConnectWallet";
import { useAuditor } from "../context/AuditorContext"; // Import the hook we made
import styles from "./Navbar.module.css";

export function Navbar() {
  const [location] = useState("Udupi");
  const { isConnected } = useAccount(); // Check if wallet is connected

  // Get stats from our Gamification Context
  // We add a fallback {} in case the context isn't set up yet to prevent crashes
  const { xp, level } = useAuditor() || { xp: 0, level: 1 };

  // Calculate progress bar width (e.g., 45 XP = 45% width)
  const progressPercentage = xp % 100;

  return (
    <nav className={styles.navbar}>
      {/* LEFT SIDE */}
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
            fontFamily: "monospace",
          }}
        >
          <span>📍</span>
          <span>{location}</span>
        </div>
      </div>

      {/* RIGHT SIDE - GAMIFICATION UI */}
      <div
        className={styles.navRight}
        style={{ display: "flex", alignItems: "center", gap: "15px" }}
      >
        {/* ONLY SHOW BADGE IF CONNECTED */}
        {isConnected && (
          <div className="hidden md:flex items-center gap-3 bg-gray-900 border border-green-500/30 px-3 py-1.5 rounded-xl shadow-[0_0_10px_rgba(74,222,128,0.1)]">
            {/* Icon */}
            <div className="text-xl">🛡️</div>

            {/* Stats Column */}
            <div className="flex flex-col min-w-[100px]">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                <span>Lvl {level} Auditor</span>
                <span className="text-green-400">{xp} XP</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 shadow-[0_0_8px_#4ade80] transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Keep your existing Connect Button */}
        <ConnectWallet />
      </div>
    </nav>
  );
}
