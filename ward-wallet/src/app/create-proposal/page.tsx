"use client";

import { useState } from "react";
import Link from "next/link";
import { useWriteContract } from "wagmi";
import { MyContractABI } from "@/abis/myContract"; // Assuming this path is correct
import styles from "./CreateProposal.module.css";

export default function CreateProposalPage() {
  // --- Form State ---
  // We now use state for the new form fields
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // --- Wagmi Hook ---
  const { writeContract, isError, isPending, isSuccess, error } =
    useWriteContract();

  /**
   * TODO: Implement your IPFS upload logic here.
   * This function should take the form data, upload it to a service
   * like Pinata or web3.storage, and return the IPFS hash (CID).
   */
  async function handleIpfsUpload(): Promise<string> {
    console.log("Simulating IPFS Upload with:", {
      title,
      description,
      fileName: file?.name,
      budget,
    });

    // --- Example IPFS Upload Logic (replace this) ---
    // 1. Create a JSON object with the metadata
    // const metadata = { title, description, budget };
    // 2. Create FormData
    // const formData = new FormData();
    // formData.append("file", file); // The actual file
    // formData.append("metadata", JSON.stringify(metadata)); // The metadata
    //
    // 3. Make a POST request to your IPFS pinning service
    // const response = await fetch("https://api.pinata.cloud/...", {
    //   method: "POST",
    //   headers: { "Authorization": "Bearer YOUR_API_KEY" },
    //   body: formData,
    // });
    // const data = await response.json();
    //
    // 4. Return the IPFS hash
    // return data.IpfsHash;
    // --- End of Example ---

    // Returning a placeholder hash for demonstration
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
    return "QmY...PlaceholderIpfsHash"; // <-- Replace with real hash from upload
  }

  /**
   * Handles the form submission.
   * 1. Prevents default form action.
   * 2. Calls the IPFS upload function.
   * 3. Calls the smart contract with the resulting hash.
   */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) {
      alert("Please upload a proposal file.");
      return;
    }

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
      console.error("Error during submission:", err);
      // isError from wagmi will also be set if writeContract fails
    }
  }

  // Handle file input change
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  return (
    <div className={styles.pageContainer}>
      {/* 1. Left Arrow to Home */}
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
  );
}
