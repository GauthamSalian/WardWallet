import { NextRequest, NextResponse } from "next/server";
import { ddb } from "@/lib/dynamoClient";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export async function GET(request: NextRequest, context: any) {
  const { params } = context as { params: { proposalId: string } };

  const proposalId = params.proposalId;

  if (!proposalId) {
    return NextResponse.json({ error: "proposalId is required" }, { status: 400 });
  }

  try {
    const result = await ddb.send(
      new QueryCommand({
        TableName: process.env.DYNAMODB_BIDS_TABLE || "ProposalBids",
        KeyConditionExpression: "proposalId = :pid",
        ExpressionAttributeValues: {
          ":pid": proposalId,
        },
        ScanIndexForward: false, // newest first
      })
    );

    return NextResponse.json(result.Items || [], { status: 200 });
  } catch (err) {
    console.error("Error fetching bids:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to fetch bids" }, { status: 500 });
  }
}
