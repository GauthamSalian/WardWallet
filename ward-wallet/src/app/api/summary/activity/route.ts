import { readFileSync } from "fs";
import { join } from "path";

interface Proposal {
  id: string;
  title: string;
  votes: number;
  createdAt: string;
  status: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "7"; // days
    const rangeNum = parseInt(range);

    const proposalsPath = join(process.cwd(), "data", "proposals.json");
    const proposalsData = readFileSync(proposalsPath, "utf-8");
    const proposals: Proposal[] = JSON.parse(proposalsData);

    // Generate time-series data for the last N days
    const now = new Date();
    const timeseries = [];

    for (let i = rangeNum - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];

      const dayProposals = proposals.filter((p) => {
        try {
          if (!p.createdAt) return false;
          const createdDate = new Date(p.createdAt).toISOString().split("T")[0];
          return createdDate === dateStr;
        } catch (err) {
          console.warn("Invalid date for proposal:", p.id, p.createdAt);
          return false;
        }
      });

      const dayVotes = dayProposals.reduce((sum, p) => sum + (p.votes || 0), 0);
      const proposalCount = dayProposals.length;
      
      // Add mock multiplier for hackathon (1.5-4x)
      const votesMultiplier = Math.random() * 2.5 + 1.5;
      const mockedVotes = Math.floor(dayVotes * votesMultiplier);

      timeseries.push({
        date: dateStr,
        proposals: proposalCount,
        votes: mockedVotes,
        avgVotesPerProposal: proposalCount > 0 ? mockedVotes / proposalCount : 0,
      });
    }

    return Response.json({
      range: `${rangeNum}d`,
      timeseries,
      summary: {
        totalProposals: proposals.length,
        totalVotes: proposals.reduce((sum, p) => sum + (p.votes || 0), 0),
      },
    });
  } catch (error) {
    console.error("Activity error:", error);
    return Response.json(
      { error: "Failed to fetch activity" },
      { status: 500 }
    );
  }
}
