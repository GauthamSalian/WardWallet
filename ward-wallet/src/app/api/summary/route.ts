import { readFileSync } from "fs";
import { join } from "path";

interface Proposal {
  id: string;
  title: string;
  ward: string;
  category: string;
  status: string;
  votes: number;
  createdAt: string;
  approvalId?: string;
  completionId?: string;
  proposer_address?: string;
}

export async function GET() {
  try {
    const proposalsPath = join(
      process.cwd(),
      "data",
      "proposals.json"
    );
    const proposalsData = readFileSync(proposalsPath, "utf-8");
    const proposals: Proposal[] = JSON.parse(proposalsData);

    // Calculate KPIs with mock data boost for hackathon
    const totalProposals = proposals.length;
    const activeProposals = proposals.filter(
      (p) => p.status === "Open" || p.status === "In Review"
    ).length;
    
    // Use real votes but add random multiplier for demo
    const baseVotes = proposals.reduce((sum, p) => sum + (p.votes || 0), 0);
    const voteMultiplier = Math.random() * 3 + 2; // 2-5x multiplier
    const totalVotes = Math.floor(baseVotes * voteMultiplier);
    
    // Mock open reports
    const openReports = Math.floor(Math.random() * 5);

    // Get unique wards
    const wardCount = new Set(proposals.map((p) => p.ward)).size;

    // Get category distribution
    const categoryDistribution = proposals.reduce(
      (acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    // Status breakdown with mock variations
    const statusBreakdown = proposals.reduce(
      (acc, p) => {
        acc[p.status] = (acc[p.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    // Mock reward pool balance (0.5 - 50 ETH)
    const rewardPoolBalance = (Math.random() * 49.5 + 0.5).toFixed(2);

    return Response.json({
      timestamp: new Date().toISOString(),
      kpis: {
        totalProposals,
        activeProposals,
        totalVotes,
        openReports,
        wardCount,
        totalCategories: Object.keys(categoryDistribution).length,
      },
      distribution: {
        byCategory: categoryDistribution,
        byStatus: statusBreakdown,
      },
      summary: {
        rewardPoolBalance: `${rewardPoolBalance} ETH`,
        lastSynced: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Summary error:", error);
    return Response.json(
      { error: "Failed to fetch summary" },
      { status: 500 }
    );
  }
}
