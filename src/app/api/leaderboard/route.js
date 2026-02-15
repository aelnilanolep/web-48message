import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;

export async function GET() {
  let client;
  try {
    if (!uri) throw new Error("MONGODB_URI is missing");

    client = new MongoClient(uri);
    await client.connect();
    
    // SESUAI GAMBAR 24: Kita tembak DB dan Collection yang sudah ada isinya
    const db = client.db('bot_48medfess');
    const ownerIds = (process.env.OWNER_ID || "").split(',').map(id => id.trim());

    // Ambil dokumen raksasa di collection backup_dbjson
    const bigData = await db.collection('backup_dbjson').findOne({});

    if (!bigData || !bigData.users) {
      return NextResponse.json([]); // Balikin array kosong kalo data ga ketemu
    }

    // Olah data array users (isi 74 orang itu)
    const formattedUsers = bigData.users
      .filter(u => {
        const count = parseInt(u.promote_count) || 0;
        const isOwner = ownerIds.includes(String(u.id));
        return count > 0 && !isOwner;
      })
      .sort((a, b) => (parseInt(b.promote_count) || 0) - (parseInt(a.promote_count) || 0))
      .slice(0, 10)
      .map((u, index) => ({
        rank: index + 1,
        name: u.name || 'Anonymous',
        score: parseInt(u.promote_count) || 0
      }));

    return NextResponse.json(formattedUsers);

  } catch (error) {
    console.error("API ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (client) await client.close();
  }
}
