"use client";
import { useEffect, useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { isAddress } from "viem";
import { publicClient } from "@/utils/publicClient";
import { MyContractABI } from "@/abis/myContractv2";
import { Navbar } from "@/components/Navbar";
import commonStyles from "@/styles/common.module.css";

const CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY_2 as `0x${string}`;

export default function OwnerPage() {
  const { address: userAddress } = useAccount();
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [officialAddress, setOfficialAddress] = useState("");
  const [contractorAddress, setContractorAddress] = useState("");
  const [toggleValue, setToggleValue] = useState(true);

  const [officials, setOfficials] = useState<string[]>([]);
  const [contractors, setContractors] = useState<string[]>([]);

  const { writeContract, isPending, data: txHash } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Check if user is owner
  useEffect(() => {
    async function checkOwner() {
      try {
        if (!userAddress) {
          setIsOwner(false);
          setLoading(false);
          return;
        }

        const owner = (await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: MyContractABI,
          functionName: "contractOwner",
        })) as string | undefined;

        setIsOwner(owner?.toLowerCase() === userAddress.toLowerCase());
      } catch (err) {
        console.error("Error checking owner:", err);
        setError("Failed to verify owner status");
      } finally {
        setLoading(false);
      }
    }

    checkOwner();
  }, [userAddress]);

  // Fetch current officials and contractors
  useEffect(() => {
    async function fetchRoles() {
      try {
        // Note: Adjust these function names based on your actual contract ABI
        // This is a placeholder - your contract might have different getter functions
        console.log("Fetching roles from contract...");
        // For now, we'll just show the UI - you can add specific getters if available
      } catch (err) {
        console.warn("Could not fetch current roles:", err);
      }
    }

    if (isOwner && !loading) {
      fetchRoles();
    }
  }, [isOwner, loading]);

  async function handleAddOfficial() {
    setError("");

    if (!isAddress(officialAddress)) {
      setError("Invalid Ethereum address");
      return;
    }

    try {
      writeContract(
        {
          address: CONTRACT_ADDRESS,
          abi: MyContractABI,
          functionName: "addOfficial",
          args: [officialAddress, toggleValue],
        },
        {
          onSuccess: () => {
            setOfficialAddress("");
            setError("");
            setOfficials([...officials, officialAddress]);
          },
          onError: (err) => {
            console.error("Error:", err);
            setError(err.message || "Failed to add official");
          },
        }
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  }

  async function handleAddContractor() {
    setError("");

    if (!isAddress(contractorAddress)) {
      setError("Invalid Ethereum address");
      return;
    }

    try {
      writeContract(
        {
          address: CONTRACT_ADDRESS,
          abi: MyContractABI,
          functionName: "addContractor",
          args: [contractorAddress, toggleValue],
        },
        {
          onSuccess: () => {
            setContractorAddress("");
            setError("");
            setContractors([...contractors, contractorAddress]);
          },
          onError: (err) => {
            console.error("Error:", err);
            setError(err.message || "Failed to add contractor");
          },
        }
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div
          style={{ width: "100%", minHeight: "100vh", padding: "40px 20px" }}
        >
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p style={{ color: "#aaa" }}>Loading...</p>
          </div>
        </div>
      </>
    );
  }

  if (!userAddress) {
    return (
      <>
        <Navbar />
        <div
          style={{ width: "100%", minHeight: "100vh", padding: "40px 20px" }}
        >
          <div style={{ textAlign: "center", padding: "40px" }}>
            <h2 style={{ color: "#ef4444" }}>Please connect your wallet</h2>
            <p style={{ color: "#aaa" }}>
              You must connect a wallet to access this page.
            </p>
          </div>
        </div>
      </>
    );
  }

  if (!isOwner) {
    return (
      <>
        <Navbar />
        <div
          style={{ width: "100%", minHeight: "100vh", padding: "40px 20px" }}
        >
          <div style={{ textAlign: "center", padding: "40px" }}>
            <h2 style={{ color: "#ef4444" }}>Access Denied</h2>
            <p style={{ color: "#aaa" }}>
              Only the contract owner can access this page.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ width: "100%", minHeight: "100vh", padding: "40px 20px" }}>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "20px",
          }}
        >
          <h1 style={{ marginBottom: "30px" }}>🔐 Owner Controls</h1>

          {error && (
            <div
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid #ef4444",
                borderRadius: "8px",
                padding: "12px 16px",
                color: "#ef4444",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          {isSuccess && (
            <div
              style={{
                background: "rgba(22, 199, 132, 0.1)",
                border: "1px solid #16c784",
                borderRadius: "8px",
                padding: "12px 16px",
                color: "#16c784",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            >
              ✓ Transaction submitted successfully!
            </div>
          )}

          {/* Add Official Section */}
          <div
            style={{
              background: "#1a1a2e",
              border: "1px solid #16c784",
              borderRadius: "12px",
              padding: "24px",
              marginBottom: "24px",
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: "16px" }}>Add Official</h2>
            <p style={{ opacity: 0.8, marginBottom: "16px" }}>
              Officials can approve proposals and manage the project lifecycle.
            </p>

            <div style={{ marginBottom: "12px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  color: "#aaa",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                Ethereum Address
              </label>
              <input
                type="text"
                placeholder="0x..."
                value={officialAddress}
                onChange={(e) => setOfficialAddress(e.target.value)}
                disabled={isPending || isConfirming}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  background: "#2d2d44",
                  border: "1px solid #16c784",
                  borderRadius: "6px",
                  color: "#16c784",
                  boxSizing: "border-box",
                  fontSize: "14px",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <label
                style={{
                  color: "#aaa",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                Status:
              </label>
              <button
                onClick={() => setToggleValue(!toggleValue)}
                style={{
                  background: toggleValue ? "#16c784" : "#ef4444",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                {toggleValue ? "Active" : "Inactive"}
              </button>
            </div>

            <button
              onClick={handleAddOfficial}
              disabled={isPending || isConfirming || !officialAddress}
              style={{
                width: "100%",
                padding: "12px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                borderRadius: "6px",
                color: "#fff",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 500,
                opacity:
                  isPending || isConfirming || !officialAddress ? 0.6 : 1,
              }}
            >
              {isPending || isConfirming ? "Processing..." : "Add Official"}
            </button>
          </div>

          {/* Add Contractor Section */}
          <div
            style={{
              background: "#1a1a2e",
              border: "1px solid #16c784",
              borderRadius: "12px",
              padding: "24px",
              marginBottom: "24px",
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: "16px" }}>
              Add Contractor
            </h2>
            <p style={{ opacity: 0.8, marginBottom: "16px" }}>
              Contractors can submit work and bid on proposals.
            </p>

            <div style={{ marginBottom: "12px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  color: "#aaa",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                Ethereum Address
              </label>
              <input
                type="text"
                placeholder="0x..."
                value={contractorAddress}
                onChange={(e) => setContractorAddress(e.target.value)}
                disabled={isPending || isConfirming}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  background: "#2d2d44",
                  border: "1px solid #16c784",
                  borderRadius: "6px",
                  color: "#16c784",
                  boxSizing: "border-box",
                  fontSize: "14px",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <label
                style={{
                  color: "#aaa",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                Status:
              </label>
              <button
                onClick={() => setToggleValue(!toggleValue)}
                style={{
                  background: toggleValue ? "#16c784" : "#ef4444",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                {toggleValue ? "Active" : "Inactive"}
              </button>
            </div>

            <button
              onClick={handleAddContractor}
              disabled={isPending || isConfirming || !contractorAddress}
              style={{
                width: "100%",
                padding: "12px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                borderRadius: "6px",
                color: "#fff",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 500,
                opacity:
                  isPending || isConfirming || !contractorAddress ? 0.6 : 1,
              }}
            >
              {isPending || isConfirming ? "Processing..." : "Add Contractor"}
            </button>
          </div>

          {/* Current Roles */}
          {(officials.length > 0 || contractors.length > 0) && (
            <div
              style={{
                background: "#1a1a2e",
                border: "1px solid #333",
                borderRadius: "12px",
                padding: "24px",
              }}
            >
              <h2 style={{ marginTop: 0, marginBottom: "16px" }}>
                Current Roles
              </h2>
              {officials.length > 0 && (
                <div style={{ marginBottom: "16px" }}>
                  <h3
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "14px",
                      color: "#aaa",
                    }}
                  >
                    Officials ({officials.length})
                  </h3>
                  {officials.map((addr) => (
                    <div
                      key={addr}
                      style={{
                        padding: "8px",
                        background: "#2d2d44",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontFamily: "monospace",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {addr}
                    </div>
                  ))}
                </div>
              )}
              {contractors.length > 0 && (
                <div>
                  <h3
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "14px",
                      color: "#aaa",
                    }}
                  >
                    Contractors ({contractors.length})
                  </h3>
                  {contractors.map((addr) => (
                    <div
                      key={addr}
                      style={{
                        padding: "8px",
                        background: "#2d2d44",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontFamily: "monospace",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {addr}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
