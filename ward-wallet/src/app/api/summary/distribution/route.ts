import { readFileSync } from "fs";
import { join } from "path";

interface Proposal {
  id: string;
  ward: string;
  category: string;
  status: string;
  votes: number;
}

export async function GET() {
  try {
    const proposalsPath = join(process.cwd(), "data", "proposals.json");
    const proposalsData = readFileSync(proposalsPath, "utf-8");
    const proposals: Proposal[] = JSON.parse(proposalsData);

    // Category distribution
    const categoryDistribution = proposals.reduce(
      (acc, p) => {
        const cat = p.category || "Other";
        const existing = acc.find((x) => x.name === cat);
        if (existing) {
          existing.value += 1;
        } else {
          acc.push({ name: cat, value: 1 });
        }
        return acc;
      },
      [] as Array<{ name: string; value: number }>
    );

    // Ward distribution
    const wardDistribution = proposals.reduce(
      (acc, p) => {
        const ward = p.ward || "Unknown";
        const existing = acc.find((x) => x.ward === ward);
        // Add mock vote multiplier for hackathon (1.5-3x)
        const voteMultiplier = Math.random() * 1.5 + 1.5;
        const mockedVotes = Math.floor((p.votes || 0) * voteMultiplier);
        if (existing) {
          existing.count += 1;
          existing.votes += mockedVotes;
        } else {
          acc.push({ ward, count: 1, votes: mockedVotes });
        }
        return acc;
      },
      [] as Array<{ ward: string; count: number; votes: number }>
    );

    // Status breakdown
    const statusDistribution = proposals.reduce(
      (acc, p) => {
        const status = p.status || "Unknown";
        const existing = acc.find((x) => x.name === status);
        if (existing) {
          existing.value += 1;
        } else {
          acc.push({ name: status, value: 1 });
        }
        return acc;
      },
      [] as Array<{ name: string; value: number }>
    );

    return Response.json({
      byCategory: categoryDistribution,
      byWard: wardDistribution.sort((a, b) => b.count - a.count),
      byStatus: statusDistribution,
    });
  } catch (error) {
    console.error("Distribution error:", error);
    return Response.json(
      { error: "Failed to fetch distribution" },
      { status: 500 }
    );
  }
}
