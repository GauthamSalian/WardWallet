import { NextRequest, NextResponse } from "next/server";
import { ddb } from "@/lib/dynamoClient";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { proposalId, author, comment } = body;

    if (!proposalId || !author || !comment) {
      return NextResponse.json(
        { error: "proposalId, author, and comment are required" },
        { status: 400 }
      );
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const commentId = `${proposalId}-${timestamp}-${Math.random().toString(36).substr(2, 9)}`;

    await ddb.send(
      new PutCommand({
        TableName: process.env.DYNAMODB_COMMENTS_TABLE || "WardWalletComments",
        Item: {
          proposalId,
          commentId,
          timestamp,
          author,
          comment,
        },
      })
    );

    return NextResponse.json({ success: true, commentId }, { status: 200 });
  } catch (err) {
    console.error("Error writing comment:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to write comment" },
      { status: 500 }
    );
  }
}
