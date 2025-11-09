"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useWriteContract } from "wagmi";
import { MyContractABI } from "@/abis/myContract";
import styles from "./CreateProposal.module.css";
import { Navbar } from "@/components/Navbar";
import { keccak256, toHex } from "viem";

export default function CreateProposalPage() {
  const [title, setTitle] = useState("");
  const [rawId, setRawId] = useState(""); // user input
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
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

  async function handleIpfsUpload(): Promise<string> {
    if (!file) throw new Error("No file selected.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("budget", budget);
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

      writeContract({
        address: process.env
          .NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY as `0x${string}`,
        abi: MyContractABI,
        functionName: "createProposal",
        args: [
          proposalId as `0x${string}`,
          title,
          ipfsHash,
          BigInt(budget),
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

          <div className={styles.inputGroup}>
            <label htmlFor="Budget" className={styles.label}>
              Budget (in wei)
            </label>
            <input
              type="number"
              id="Budget"
              required
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className={styles.input}
              placeholder="e.g., 1000000000000000000"
            />
          </div>

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
