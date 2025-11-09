import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'proposals.json');

async function readDB() {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
      await fs.writeFile(DB_PATH, '[]', 'utf-8');
      return [];
    }
    throw err;
  }
}

async function writeDB(items: any[]) {
  await fs.writeFile(DB_PATH, JSON.stringify(items, null, 2), 'utf-8');
}

function isValidAddress(addr: any) {
  return typeof addr === 'string' && /^0x[a-fA-F0-9]{40}$/.test(addr);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const user = url.searchParams.get('user');
  const all = await readDB();
  if (user) {
    // sanitize
    const userLower = String(user).toLowerCase();
    const filtered = all.filter((p: any) => String(p.proposer_address).toLowerCase() === userLower);
    return NextResponse.json(filtered);
  }
  return NextResponse.json(all);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // expected fields: id, title, proposer_address, status, budget, ipfs_hash
    const { id, title, proposer_address, status, budget, ipfs_hash } = body;
    if (!id || typeof id !== 'string') return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    if (!title || typeof title !== 'string') return NextResponse.json({ error: 'Missing title' }, { status: 400 });
    if (!isValidAddress(proposer_address)) return NextResponse.json({ error: 'Invalid proposer_address' }, { status: 400 });

    const all = await readDB();
    // prevent duplicate
    const exists = all.find((p: any) => p.id === id);
    if (exists) return NextResponse.json({ error: 'Proposal already exists' }, { status: 409 });

    const now = new Date().toISOString();
    const row = {
      id,
      title,
      proposer_address,
      status: status || 'Pending',
      budget: budget || 0,
      ipfs_hash: ipfs_hash || null,
      created_at: now,
    };
    all.push(row);
    await writeDB(all);
    return NextResponse.json(row, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
