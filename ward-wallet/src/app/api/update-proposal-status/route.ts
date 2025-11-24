import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const { proposalId, newStatus } = await req.json();

  const filePath = path.join(process.cwd(), "data", "proposals.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const proposals = JSON.parse(fileData);

  const updatedProposals = proposals.map((proposal: any) =>
    proposal.id === proposalId ? { ...proposal, status: newStatus } : proposal
  );

  fs.writeFileSync(filePath, JSON.stringify(updatedProposals, null, 2));

  return NextResponse.json({ success: true });
}
