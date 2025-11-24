"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import toast, { Toaster } from "react-hot-toast";

const AuditorContext = createContext<any>(null);

export const AuditorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { address } = useAccount();
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    if (address) {
      const savedXp = localStorage.getItem(`wardwallet_xp_${address}`);
      if (savedXp) {
        const parsedXp = parseInt(savedXp);
        setXp(parsedXp);
        setLevel(Math.floor(parsedXp / 100) + 1);
      } else {
        setXp(10); // Welcome bonus
      }
    }
  }, [address]);

  const addXp = (amount: number, actionName: string) => {
    if (!address) return toast.error("Connect wallet to earn XP!");

    const newXp = xp + amount;
    setXp(newXp);
    const newLevel = Math.floor(newXp / 100) + 1;

    if (newLevel > level) {
      setLevel(newLevel);
      toast.success(`🎉 LEVEL UP! You are now a Level ${newLevel} Auditor!`, {
        style: {
          background: "#333",
          color: "#FFD700",
          border: "1px solid #FFD700",
        },
        duration: 4000,
      });
    } else {
      toast.success(`+${amount} XP: ${actionName}`, {
        icon: "🛡️",
        style: {
          background: "#111",
          color: "#4ade80",
          border: "1px solid #4ade80",
        },
      });
    }

    localStorage.setItem(`wardwallet_xp_${address}`, newXp.toString());
  };

  return (
    <AuditorContext.Provider value={{ xp, level, addXp }}>
      {children}
      <Toaster position="bottom-right" />
    </AuditorContext.Provider>
  );
};

export const useAuditor = () => useContext(AuditorContext);
