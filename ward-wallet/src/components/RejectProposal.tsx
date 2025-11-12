"use client";
import React from "react";
import { useAccount, useWriteContract } from "wagmi";
import { MyContractABI } from "@/abis/myContractv2";
import { ActionButton } from "@/components/ActionButton";

interface RejectProposalProps {
  proposalId: `0x${string}`;
  buttonClassName?: string;
}

export function RejectProposal({
  proposalId,
  buttonClassName,
}: RejectProposalProps) {
  const { address } = useAccount();
  const { writeContract, isPending } = useWriteContract();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleReject = async () => {
    if (!address || !proposalId) {
      alert("Please connect your wallet");
      return;
    }

    try {
      setIsLoading(true);
      writeContract(
        {
          address: process.env
            .NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY_2 as `0x${string}`,
          abi: MyContractABI,
          functionName: "rejectProposal",
          args: [proposalId],
        },
        {
          onSuccess: (hash) => {
            console.log("Reject proposal tx submitted:", hash);
            alert(
              "Proposal rejection submitted! Check contract for confirmation."
            );
            setIsLoading(false);
          },
          onError: (error) => {
            console.error("Error rejecting proposal:", error);
            alert(`Error: ${error.message}`);
            setIsLoading(false);
          },
        }
      );
    } catch (error) {
      console.error("Error in handleReject:", error);
      alert(`Error: ${error instanceof Error ? error.message : String(error)}`);
      setIsLoading(false);
    }
  };

  return (
    <ActionButton
      onClick={handleReject}
      disabled={isPending || isLoading}
      variant="reject"
      className={buttonClassName}
    >
      {isPending || isLoading ? "Rejecting..." : "Reject Proposal"}
    </ActionButton>
  );
}
