import { readFileSync } from "fs";
import { join } from "path";
import { publicClient } from "@/utils/publicClient";
import { MyContractABI } from "@/abis/myContractv2";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_WARDWALLET_CONTRACT_KEY_2 as `0x${string}`;

interface Proposal {
  id: string;
  title: string;
  ward: string;
  category: string;
  status: string;
  votes: number;
  createdAt: string;
}

export async function GET() {
  try {
    // Read local proposals.json
    const proposalsPath = join(process.cwd(), "data", "proposals.json");
    const proposalsData = readFileSync(proposalsPath, "utf-8");
    const localProposals: Proposal[] = JSON.parse(proposalsData);

    // Try to fetch from contract
    let contractProposals: Proposal[] = [];
    try {
      // Attempt to read from contract - adjust based on your actual ABI
      const proposals = (await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: MyContractABI,
        functionName: "getAllProposals", // Adjust function name if different
      })) as any[];

      if (proposals && Array.isArray(proposals)) {
        contractProposals = proposals
          .filter((p) => p && p.id)
          .map((p) => ({
            id: p.id,
            title: p.title || "Untitled",
            ward: p.ward || "Unknown",
            category: p.category || "General",
            status: p.status || "Open",
            votes: Number(p.voteCount || 0),
            createdAt: p.createdAt ? new Date(Number(p.createdAt) * 1000).toISOString() : new Date().toISOString(),
          }));
      }
    } catch (err) {
      console.warn("Could not fetch from contract, using local proposals only:", err);
    }

    // Merge: prefer contract data, fallback to local
    const mergedMap = new Map<string, Proposal>();

    // Add local proposals first
    localProposals.forEach((p) => {
      mergedMap.set(p.id, p);
    });

    // Override with contract data
    contractProposals.forEach((p) => {
      mergedMap.set(p.id, p);
    });

    const allProposals = Array.from(mergedMap.values());

    return Response.json({
      total: allProposals.length,
      proposals: allProposals.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
      sources: {
        local: localProposals.length,
        contract: contractProposals.length,
      },
    });
  } catch (error) {
    console.error("Proposals endpoint error:", error);
    return Response.json(
      { error: "Failed to fetch proposals" },
      { status: 500 }
    );
  }
}
