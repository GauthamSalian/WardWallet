import { use, useState } from "react";
import { useWriteContract } from "wagmi";
import { MyContractABI } from "@/abis/myContract";

export function VoteProposal() {
  const [proposalId, setProposalId] = useState("");

  const { writeContract, isError, isSuccess } = useWriteContract();

  function handleVote() {
    writeContract({
      address: process.env.WARDWALLET_CONTRACT_KEY as `0x${string}`,
      abi: MyContractABI,
      functionName: "vote",
      args: [proposalId as `0x${string}`],
    });
  }

  return (
    <div>
      <label htmlFor="ProposalId">Proposal ID:</label>
      <input
        type="text"
        id="ProposalId"
        name="ProposalId"
        required
        value={proposalId}
        onChange={(e) => setProposalId(e.target.value)}
      />
      <br />
      <button onClick={handleVote}>Vote</button>

      {isError && <div>Error occurred while voting the proposal.</div>}
      {isSuccess && <div>Voted successfully.</div>}
    </div>
  );
}
