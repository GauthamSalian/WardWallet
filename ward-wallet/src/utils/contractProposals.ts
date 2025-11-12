import { publicClient } from "./publicClient";
import { MyContractABI } from "@/abis/myContractv2";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY_2 as `0x${string}`;

export interface ProposalMetadata {
  id: string;
  title: string;
  ward: string;
  category: string;
  status: string;
  voteCount: number;
  reportCount: number;
  createdAt?: string;
}

/**
 * Fetch all proposal IDs from the contract's proposalIds array
 */
export async function fetchAllProposalIds(): Promise<string[]> {
  try {
    const proposalIds: string[] = [];
    
    // Try to fetch proposalIds - this depends on your contract having a public proposalIds array
    // If your contract has a getter, adjust the function name accordingly
    try {
      const ids = (await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: MyContractABI,
        functionName: "proposalIds",
      })) as string[];
      
      return ids || [];
    } catch (err) {
      console.warn("Could not fetch proposalIds array, falling back to proposals.json");
      // Fallback: read from proposals.json
      return [];
    }
  } catch (error) {
    console.error("Error fetching proposal IDs:", error);
    return [];
  }
}

/**
 * Fetch metadata for a single proposal from the contract
 */
export async function fetchProposalMetadata(proposalId: string): Promise<ProposalMetadata | null> {
  try {
    // Read proposal from contract
    const proposal = (await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: MyContractABI,
      functionName: "proposals",
      args: [proposalId],
    })) as any;

    if (!proposal) {
      return null;
    }

    // Extract metadata (adjust field names based on your actual contract)
    return {
      id: proposalId,
      title: proposal.title || "Untitled Proposal",
      ward: proposal.ward || "Unknown Ward",
      category: proposal.category || "General",
      status: proposal.status || "Open",
      voteCount: Number(proposal.voteCount || 0),
      reportCount: Number(proposal.reportCount || 0),
      createdAt: proposal.createdAt ? new Date(Number(proposal.createdAt) * 1000).toISOString() : undefined,
    };
  } catch (error) {
    console.error(`Error fetching metadata for proposal ${proposalId}:`, error);
    return null;
  }
}

/**
 * Fetch metadata for multiple proposals in parallel
 */
export async function fetchProposalsMetadata(proposalIds: string[]): Promise<ProposalMetadata[]> {
  try {
    const results = await Promise.allSettled(
      proposalIds.map((id) => fetchProposalMetadata(id))
    );

    return results
      .filter((result) => result.status === "fulfilled" && result.value !== null)
      .map((result) => (result as PromiseFulfilledResult<ProposalMetadata>).value);
  } catch (error) {
    console.error("Error fetching multiple proposal metadata:", error);
    return [];
  }
}

/**
 * Merge on-chain proposal data with local JSON data
 */
export async function enrichProposalsWithLocalData(
  onChainProposals: ProposalMetadata[],
  localProposals: any[]
): Promise<ProposalMetadata[]> {
  return onChainProposals.map((onChain) => {
    const local = localProposals.find((p) => p.id === onChain.id);
    return {
      ...onChain,
      // Override with local data if available
      title: local?.title || onChain.title,
      ward: local?.ward || onChain.ward,
      category: local?.category || onChain.category,
      createdAt: local?.createdAt || onChain.createdAt,
    };
  });
}
