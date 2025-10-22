import { useState } from "react";
import { useWriteContract } from "wagmi";
import { MyContractABI } from "@/abis/myContract";

export function CreateProposal() {
  const [proposalId, setProposalId] = useState("");
  const [proposalTitle, setProposalTitle] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [budget, setBudget] = useState("");
  const timestamp = Math.floor(Date.now() / 1000);

  const { writeContract, isError, isSuccess } = useWriteContract();

  function handleWriteContract() {
    writeContract({
      address: process.env.WARDWALLET_CONTRACT_KEY as `0x${string}`,
      abi: MyContractABI,
      functionName: "createProposal",
      args: [
        proposalId as `0x${string}`,
        proposalTitle,
        ipfsHash,
        BigInt(budget),
        timestamp,
      ],
      value: BigInt(10000),
    });
  }

  return (
    <div>
      <label htmlFor="ProposalID">Proposal ID:</label>
      <input
        type="text"
        name="ProposalID"
        id="ProposalID"
        required
        value={proposalId}
        onChange={(e) => setProposalId(e.target.value)}
      />
      <br />
      <label htmlFor="ProposalTitle">Proposal Title:</label>
      <input
        type="text"
        name="ProposalTitle"
        id="ProposalTitle"
        required
        value={proposalTitle}
        onChange={(e) => setProposalTitle(e.target.value)}
      />
      <br />
      <label htmlFor="ipsfHash">IPFS Hash:</label>
      <input
        type="text"
        name="ipfsHash"
        id="ipfsHash"
        required
        value={ipfsHash}
        onChange={(e) => setIpfsHash(e.target.value)}
      />
      <br />
      <label htmlFor="Budget">Budget: </label>
      <input
        type="number"
        name="Budget"
        id="Budget"
        required
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleWriteContract}>Create Proposal</button>
      <br />

      {isSuccess && <div>Proposal created successfully!</div>}
      {isError && <div>Error occurred while creating proposal.</div>}
    </div>
  );
}
