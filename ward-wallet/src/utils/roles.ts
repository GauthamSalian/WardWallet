"use client";

import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { publicClient } from "@/utils/publicClient";
import { MyContractABI } from "@/abis/myContractv2";

/**
 * Lightweight hook to determine on-chain roles for the connected account.
 * This uses `publicClient.readContract` directly to avoid typing friction
 * with generated wrappers.
 */
export function useRoles() {
  const { address } = useAccount();
  const [isOfficial, setIsOfficial] = useState(false);
  const [isContractor, setIsContractor] = useState(false);
  const [loadingOfficial, setLoadingOfficial] = useState(false);
  const [loadingContractor, setLoadingContractor] = useState(false);

  useEffect(() => {
    if (!address) {
      setIsOfficial(false);
      setIsContractor(false);
      return;
    }

    let mounted = true;

    setLoadingOfficial(true);
    setLoadingContractor(true);

    try {
      // read isOfficial
      publicClient
        .readContract({
          address: process.env.NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY_2 as `0x${string}`,
          abi: MyContractABI,
          functionName: "isOfficial",
          args: [address],
        })
        .then((res) => {
          if (!mounted) return;
          setIsOfficial(Boolean(res));
        })
        .catch((err) => {
          if (!mounted) return;
          console.warn("Could not fetch isOfficial, defaulting to false:", err);
          setIsOfficial(false);
        })
        .finally(() => {
          if (!mounted) return;
          setLoadingOfficial(false);
        });

      // read isContractor
      publicClient
        .readContract({
          address: process.env.NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY_2 as `0x${string}`,
          abi: MyContractABI,
          functionName: "isContractor",
          args: [address],
        })
        .then((res) => {
          if (!mounted) return;
          setIsContractor(Boolean(res));
        })
        .catch((err) => {
          if (!mounted) return;
          console.warn("Could not fetch isContractor, defaulting to false:", err);
          setIsContractor(false);
        })
        .finally(() => {
          if (!mounted) return;
          setLoadingContractor(false);
        });
    } catch (e) {
      console.warn("Error in useRoles effect:", e);
      setIsOfficial(false);
      setIsContractor(false);
      setLoadingOfficial(false);
      setLoadingContractor(false);
    }

    return () => {
      mounted = false;
    };
  }, [address]);

  return {
    address,
    isOfficial,
    isContractor,
    isOfficialLoading: loadingOfficial,
    isContractorLoading: loadingContractor,
  };
}
