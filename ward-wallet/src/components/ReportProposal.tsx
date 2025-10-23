import { use, useState } from "react";
import { useWriteContract } from "wagmi";
import { MyContractABI } from "@/abis/myContract";

export function ReportProposal() {
  const [proposalId, setProposalId] = useState("");

  const { writeContract, isError, isSuccess } = useWriteContract();

  function handleReport() {
    writeContract({
      address: process.env.WARDWALLET_CONTRACT_KEY as `0x${string}`,
      abi: MyContractABI,
      functionName: "report",
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
      <button onClick={handleReport}>Report</button>

      {isError && <div>Error occurred while reporting proposal.</div>}
      {isSuccess && <div>Reported Successfully.</div>}
    </div>
  );
}
