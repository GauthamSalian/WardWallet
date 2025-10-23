import { useState } from "react";
import { useWriteContract } from "wagmi";
import { MyContractABI } from "@/abis/myContract";

export function ApprovalProposal() {
  const [approvalId, setApprovalId] = useState("");
  const [proposalId, setProposalId] = useState("");
  const [contractor, setContractor] = useState("");
  const timestamp = Math.floor(Date.now() / 1000);

  const { writeContract, isError, isSuccess } = useWriteContract();

  function handleWriteContract() {
    writeContract({
      address: process.env.WARDWALLET_CONTRACT_KEY as `0x${string}`,
      abi: MyContractABI,
      functionName: "approvalProposal",
      args: [
        approvalId as `0x${string}`,
        proposalId as `0x${string}`,
        contractor as `0x${string}`,
        Number(timestamp),
      ],
    });
  }

  return (
    <div>
      <label htmlFor="ApprovalId">Approval ID:</label>
      <input
        type="text"
        id="ApprovalId"
        name="ApprovalId"
        required
        value={proposalId}
        onChange={(e) => setApprovalId(e.target.value)}
      />
      <br />
      <label htmlFor="ProposalId">Proposal ID:</label>
      <input
        type="text"
        id="ProposalId"
        name="ProposalId"
        required
        value={approvalId}
        onChange={(e) => setProposalId(e.target.value)}
      />
      <br />
      <label htmlFor="Contractor">Contractor Address:</label>
      <input
        type="text"
        name="Contractor"
        id="Contractor"
        required
        value={contractor}
        onChange={(e) => setContractor(e.target.value)}
      />
      <br />
      <button onClick={ApprovalProposal}>Submit Approval</button>
    </div>
  );
}
