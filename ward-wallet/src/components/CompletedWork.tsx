import { useState } from "react";
import { useWriteContract } from "wagmi";
import { MyContractABI } from "@/abis/myContract";

export function CompleteProposal() {
  const [completionId, setCompletionId] = useState("");
  const [approvalId, setApprovalId] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const timestamp = Math.floor(Date.now() / 1000);

  const { writeContract, isError, isSuccess } = useWriteContract();

  function handleComplete() {
    writeContract({
      address: process.env.WARDWALLET_CONTRSCT_KEY as `0x${string}`,
      abi: MyContractABI,
      functionName: "markAsComplete",
      args: [
        completionId as `0x${string}`,
        approvalId as `0x${string}`,
        ipfsHash,
        timestamp,
      ],
    });
  }

  return (
    <div>
      <label htmlFor="CompletionId">Completion ID:</label>
      <input
        type="text"
        name="CompletionId"
        id="CompletionId"
        required
        value={completionId}
        onChange={(e) => setCompletionId(e.target.value)}
      />
      <br />
      <label htmlFor="ApprovalId">Approval ID:</label>
      <input
        type="text"
        name="ApprovalId"
        id="ApprovalId"
        required
        value={approvalId}
        onChange={(e) => setApprovalId(e.target.value)}
      />
      <br />
      <label htmlFor="IPFSHash">IPFS Hash:</label>
      <input
        type="text"
        name="ApprovalId"
        id="ApprovalId"
        required
        value={approvalId}
        onChange={(e) => setIpfsHash(e.target.value)}
      />
      <br />
      <button onClick={handleComplete}>Submit</button>

      {isError && <div>Error occurred while completing transaction.</div>}
      {isSuccess && <div>Transaction successful!</div>}
    </div>
  );
}
