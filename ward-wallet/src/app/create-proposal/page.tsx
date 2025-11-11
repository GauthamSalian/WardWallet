"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import Link from "next/link";
import { useWriteContract } from "wagmi";
import { MyContractABI } from "@/abis/myContractv2";
import styles from "./CreateProposal.module.css";
import { Navbar } from "@/components/Navbar";
import { keccak256, toHex } from "viem";

export default function CreateProposalPage() {
  const [title, setTitle] = useState("");
  const [rawId, setRawId] = useState(""); // user input
  const [description, setDescription] = useState("");
  // budget moved to approval step; remove from create-proposal flow
  const [file, setFile] = useState<File | null>(null);
  const [latitude, setLatitude] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(6));
        setLongitude(position.coords.longitude.toFixed(6));
      },
      (error) => {
        console.warn("Geolocation error:", error);
      }
    );
  }, []);

  const { writeContract, isError, isPending, isSuccess, error } =
    useWriteContract();

  const { address } = useAccount();

  // keep pending proposal data so we can persist it off-chain after tx succeeds
  const [pendingProposal, setPendingProposal] = useState<null | {
    id: string;
    title: string;
    proposer_address?: string | null;
    status?: string;
    budget?: number | string;
    ipfs_hash?: string | null;
  }>(null);

  async function handleIpfsUpload(): Promise<string> {
    if (!file) throw new Error("No file selected.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("id", rawId);

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      formData.append("latitude", position.coords.latitude.toString());
      formData.append("longitude", position.coords.longitude.toString());
    } catch (geoError) {
      console.warn("Geolocation failed:", geoError);
    }

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to upload to IPFS");

    return data.ipfsHash;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) {
      alert("Please upload a proposal file.");
      return;
    }

    try {
      const ipfsHash = await handleIpfsUpload();

      const proposalId = keccak256(toHex(rawId)); // ✅ hash the user input

      console.log("Submitting proposal with ID:", proposalId);

      // remember data to persist after transaction is mined
      setPendingProposal({
        id: proposalId as string,
        title,
        proposer_address: address ?? null,
        status: "open",
        // budget is set at approval time now
        ipfs_hash: ipfsHash,
      });

      writeContract({
        address: process.env
          .NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY_2 as `0x${string}`,
        abi: MyContractABI,
        functionName: "createProposal",
        args: [
          proposalId as `0x${string}`,
          title,
          ipfsHash,
          Number(Math.floor(Date.now() / 1000)),
        ],
        value: BigInt(10000),
      });
    } catch (err) {
      console.error("Error during submission:", err);
      let errorMessage = "An unknown error occurred.";
      if (err instanceof Error) errorMessage = err.message;
      else if (typeof err === "string") errorMessage = err;
      alert(`Error: ${errorMessage}`);
    }
  }

  // when transaction is successful (isSuccess) and we have pendingProposal, persist it off-chain
  useEffect(() => {
    if (!isSuccess || !pendingProposal) return;

    (async () => {
      try {
        console.log("Attempting to persist proposal with:", pendingProposal);
        console.log("Connected address:", address);
        const res = await fetch("/api/proposals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pendingProposal),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          console.warn(
            "Failed to persist proposal off-chain:",
            res.status,
            body
          );
          alert(`Failed to save proposal: ${body.error || "Unknown error"}`);
        } else {
          console.log("Proposal persisted off-chain");
          alert("Proposal created successfully!");
          // clear pending proposal after successful persist
          setPendingProposal(null);
        }
      } catch (err) {
        console.error("Error persisting proposal:", err);
      }
    })();
  }, [isSuccess, pendingProposal, address]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  }

  return (
    <>
      <Navbar />
      <div className={styles.pageContainer}>
        <Link href="/" className={styles.backArrow}>
          &larr; Back to Home
        </Link>

        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h2>Create a New Proposal</h2>

          <div className={styles.inputGroup}>
            <label htmlFor="ProposalTitle" className={styles.label}>
              Proposal Title
            </label>
            <input
              type="text"
              id="ProposalTitle"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`${styles.input} ${styles.titleInput}`}
              placeholder="A catchy title for your proposal"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="ProposalID" className={styles.label}>
              Project ID (any string)
            </label>
            <input
              type="text"
              id="ProposalID"
              required
              value={rawId}
              onChange={(e) => setRawId(e.target.value)}
              className={styles.input}
              placeholder="e.g., Proposal A"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="Description" className={styles.label}>
              Description
            </label>
            <textarea
              id="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              placeholder="Describe your proposal in detail..."
              rows={6}
            />
          </div>

          {/* Budget removed from create proposal; approval assigns budget */}

          <div className={styles.inputGroup}>
            <label htmlFor="File" className={styles.label}>
              Proposal Document
            </label>
            <input
              type="file"
              id="File"
              required
              onChange={handleFileChange}
              className={styles.input}
            />
          </div>

          {latitude && longitude && (
            <div className={styles.coordinates}>
              <p>
                <strong>Location:</strong> {latitude}, {longitude}
              </p>
            </div>
          )}

          <br />

          <button type="submit" disabled={isPending} className={styles.button}>
            {isPending ? "Creating Proposal..." : "Create Proposal"}
          </button>

          <div className={styles.feedbackContainer}>
            {isSuccess && (
              <p className={styles.successMessage}>
                Proposal created successfully!
              </p>
            )}
            {isError && (
              <p className={styles.errorMessage}>
                Error: {error?.message || "Failed to create proposal."}
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
