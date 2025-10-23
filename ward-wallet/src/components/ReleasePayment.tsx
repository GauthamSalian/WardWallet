import { useState } from "react";
import { useWriteContract } from "wagmi";
import { MyContractABI } from "@/abis/myContract";

export function ReleasePayment() {
  const [approvalId, setApprovalId] = useState("");

  const { writeContract, isError, isSuccess } = useWriteContract();

  function handleRelease() {
    writeContract({
      address: process.env.WARDWALLET_CONTRACT_KEY as `0x${string}`,
      abi: MyContractABI,
      functionName: "releasePayment",
      args: [approvalId as `0x${string}`],
    });
  }

  return (
    <div>
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
      <button onClick={handleRelease}>Release Payment</button>

      {isError && <div>Error occurred while completing transaction.</div>}
      {isSuccess && <div>Transaction successful!</div>}
    </div>
  );
}
