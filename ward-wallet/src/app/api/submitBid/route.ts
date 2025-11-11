import { NextRequest, NextResponse } from "next/server";
import { ddb } from "@/lib/dynamoClient";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { proposalId, bidderAddress, bidAmount, companyName, timestamp } = body;

    if (!proposalId || !bidAmount) {
      return NextResponse.json({ error: "proposalId and bidAmount required" }, { status: 400 });
    }

    const bidId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    const item = {
      proposalId,
      bidId,
      bidderAddress: bidderAddress || null,
      bidAmount: Number(bidAmount),
      companyName: companyName || null,
      timestamp: timestamp || Date.now(),
    };

    await ddb.send(
      new PutCommand({
        TableName: process.env.DYNAMODB_BIDS_TABLE || "ProposalBids",
        Item: item,
      })
    );

    return NextResponse.json({ success: true, bidId }, { status: 201 });
  } catch (err) {
    console.error("submitBid error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
