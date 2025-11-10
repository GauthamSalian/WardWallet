import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Initialize interactions file if it doesn't exist
const dataDir = path.join(process.cwd(), 'data');
const filePath = path.join(dataDir, 'interacted.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify({}, null, 2), 'utf8');
}

export async function POST(req: Request) {
  try {
    const { user, proposalId, action } = await req.json();

    // Validate required fields
    if (!user || !proposalId || !action) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Read current data
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Initialize user array if it doesn't exist
    if (!data[user]) {
      data[user] = [];
    }

    // Add new interaction
    data[user].push({
      proposalId,
      action,
      timestamp: Date.now()
    });

    // Save updated data
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling interaction:', error);
    return NextResponse.json(
      { error: 'Failed to save interaction' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const user = searchParams.get('user');

    if (!user) {
      return NextResponse.json(
        { error: 'User address is required' },
        { status: 400 }
      );
    }

    // Read data
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Get user interactions
    const userInteractions = data[user] || [];

    // Sort by timestamp in descending order (newest first)
    userInteractions.sort((a: any, b: any) => b.timestamp - a.timestamp);

    return NextResponse.json(userInteractions);
  } catch (error) {
    console.error('Error fetching interactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interactions' },
      { status: 500 }
    );
  }
}