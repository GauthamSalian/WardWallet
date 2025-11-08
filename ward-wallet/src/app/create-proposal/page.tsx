"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useWriteContract } from "wagmi";
import { MyContractABI } from "@/abis/myContract"; // Assuming this path is correct
import styles from "./CreateProposal.module.css";
import { Navbar } from "@/components/Navbar";

// 🛑 REMOVED: import { formidable } from 'formidable';
// 🛑 REMOVED: import fs from 'fs';

export default function CreateProposalPage() {
  // --- Form State ---
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
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

  // --- Wagmi Hook ---
  const { writeContract, isError, isPending, isSuccess, error } =
    useWriteContract();

  /**
   * This function now securely uploads the file and metadata
   * to our *own* backend API route, not directly to Pinata.
   */
  async function handleIpfsUpload(): Promise<string> {
    console.log("Uploading to internal API route...", {
      title,
      description,
      fileName: file?.name,
      budget,
    });

    if (!file) {
      throw new Error("No file selected.");
    }

    // --- 1. Create FormData ---
    // This data will be sent to *your* API route (/api/upload)
    const formData = new FormData();
    formData.append("file", file); // The actual file
    formData.append("title", title);
    formData.append("description", description);
    formData.append("budget", budget);
    formData.append("id", id);

    // --- Add geolocation ---
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      const { latitude, longitude } = position.coords;
      formData.append("latitude", latitude.toString());
      formData.append("longitude", longitude.toString());
    } catch (geoError) {
      console.warn("Geolocation failed:", geoError);
      // Optional: fallback or skip location
    }

    // --- 2. Make a POST request to your API route ---
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
      // No 'Content-Type' header needed;
      // browser sets it to 'multipart/form-data' automatically
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to upload to IPFS");
    }

    // --- 3. Return the IPFS hash from your API route ---
    console.log("Received IPFS Hash from API:", data.ipfsHash);
    return data.ipfsHash;
  }

  /**
   * Handles the form submission.
   * (This function is now correct)
   */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) {
      alert("Please upload a proposal file.");
      return;
    }

    // Set a pending state manually for the IPFS upload
    // (Wagmi's isPending only covers the contract write)
    // You could add a new state like [isUploading, setIsUploading]
    // setIsUploading(true);

    try {
      // Step 1: Upload description and file to IPFS
      const ipfsHash = await handleIpfsUpload();

      // Step 2: Call the smart contract with the IPFS hash
      writeContract({
        address: process.env
          .NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY as `0x${string}`,
        abi: MyContractABI,
        functionName: "createProposal",
        args: [
          id as `0x${string}`, // Field 2: Project ID
          title, // Field 1: Title
          ipfsHash, // Hash from IPFS upload
          BigInt(budget), // Field 4: Budget
          Number(Math.floor(Date.now() / 1000)), // Timestamp
        ],
        value: BigInt(10000), // Assuming this value is correct
      });
    } catch (err) {
      // This is good! Log the full error object for debugging.
      console.error("Error during submission:", err);

      // --- Type-safe error message handling ---
      let errorMessage = "An unknown error occurred. Please check the console.";

      if (err instanceof Error) {
        // If it's a standard Error object, we can safely access its message
        errorMessage = err.message;
      } else if (typeof err === "string") {
        // If a string was thrown, use the string as the message
        errorMessage = err;
      }

      // Show the safe error message to the user
      alert(`Error: ${errorMessage}`);
    } finally {
      // setIsUploading(false);
    }
  }

  // Handle file input change
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  return (
    <>
      <Navbar />
      <div className={styles.pageContainer}>
        {/* ... (rest of your JSX is perfect, no changes needed) ... */}
        <Link href="/" className={styles.backArrow}>
          &larr; Back to Home
        </Link>

        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h2>Create a New Proposal</h2>

          {/* Field 1: Title (Bigger) */}
          <div className={styles.inputGroup}>
            <label htmlFor="ProposalTitle" className={styles.label}>
              Proposal Title
            </label>
            <input
              type="text"
              name="ProposalTitle"
              id="ProposalTitle"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`${styles.input} ${styles.titleInput}`} // Apply bigger style
              placeholder="A catchy title for your proposal"
            />
          </div>

          {/* Field 2: Project ID */}
          <div className={styles.inputGroup}>
            <label htmlFor="ProposalID" className={styles.label}>
              Project ID
            </label>
            <input
              type="text"
              name="ProposalID"
              id="ProposalID"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
              className={styles.input}
              placeholder="e.g., 0x..."
            />
          </div>

          {/* Field 3: Description */}
          <div className={styles.inputGroup}>
            <label htmlFor="Description" className={styles.label}>
              Description
            </label>
            <textarea
              name="Description"
              id="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              placeholder="Describe your proposal in detail..."
              rows={6}
            />
          </div>

          {/* Field 4: Budget */}
          <div className={styles.inputGroup}>
            <label htmlFor="Budget" className={styles.label}>
              Budget (in wei)
            </label>
            <input
              type="number"
              name="Budget"
              id="Budget"
              required
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className={styles.input}
              placeholder="e.g., 1000000000000000000"
            />
          </div>

          {/* Field 5: File Upload */}
          <div className={styles.inputGroup}>
            <label htmlFor="File" className={styles.label}>
              Proposal Document
            </label>
            <input
              type="file"
              name="File"
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

          {/* Submit Button */}
          <button type="submit" disabled={isPending} className={styles.button}>
            {isPending ? "Creating Proposal..." : "Create Proposal"}
          </button>

          {/* Feedback Messages */}
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
