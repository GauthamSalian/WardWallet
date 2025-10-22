import { useState } from "react";
import { useReadContract } from "wagmi";
import { MyContractABI } from "@/abis/myContract";

export function GetProjectHistory() {
  const [proposalID, setProposalID] = useState("");

  const { data, isError, isLoading } = useReadContract({
    address: process.env.WARDWALLET_CONTRACT_KEY as `0x${string}`,
    abi: MyContractABI,
    functionName: "getProjectHistory",
    args: [proposalID as `0x${string}`],
  });

  return (
    <div>
      <label htmlFor="ProposalID">Proposal ID:</label>
      <input
        type="text"
        name="ProposalID"
        id="ProposalID"
        required
        value={proposalID}
        onChange={(e) => setProposalID(e.target.value)}
      />

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error occurred while fetching data.</div>}

      {data && (
        <div>
          <h2>Project History</h2>
          <pre>
            {JSON.stringify(
              data,
              (key, value) =>
                typeof value === "bigint" ? value.toString() : value,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
}
