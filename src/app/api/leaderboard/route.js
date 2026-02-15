import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
//neww
const uri = process.env.MONGODB_URI;

export async function GET() {
  let client;
  try {
    if (!uri) return NextResponse.json({ error: "URI Missing" }, { status: 500 });

    client = new MongoClient(uri);
    await client.connect();
    
    // SESUAI GAMBAR 13: DB = bot_48medfess, Collection = users
    const db = client.db('bot_48medfess');
    const ownerIds = (process.env.OWNER_ID || "").split(',').map(id => id.trim());

    // Tarik semua user dulu (buang filter $gt: 0 biar gak error tipe data)
    const allUsers = await db.collection('users').find({}).toArray();

    // Filter manual di sisi server biar lebih akurat
    const formattedUsers = allUsers
      .filter(u => {
        const count = Number(u.promote_count) || 0;
        const isOwner = ownerIds.includes(String(u.id));
        return count > 0 && !isOwner;
      })
      .sort((a, b) => (Number(b.promote_count) || 0) - (Number(a.promote_count) || 0))
      .slice(0, 10)
      .map((u, index) => ({
        rank: index + 1,
        name: u.name || 'User',
        score: Number(u.promote_count) || 0
      }));

    return NextResponse.json(formattedUsers);

  } catch (error) {
    console.error("VERCEL API ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (client) await client.close();
  }
}

