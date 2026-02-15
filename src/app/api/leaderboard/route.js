import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;

// Fungsi koneksi yang lebih simpel dan to-the-point
async function getDb() {
  const client = new MongoClient(uri);
  await client.connect();
  // BERDASARKAN GAMBAR 13, NAMA DB LU ADALAH: bot_48medfess
  return client.db('bot_48medfess'); 
}

export async function GET() {
  try {
    const db = await getDb();
    
    // Ambil OWNER_ID dari .env buat filter (ID lu: 7846387511)
    const ownerIds = (process.env.OWNER_ID || "").split(',').map(id => id.trim());

    // BERDASARKAN GAMBAR 13, NAMA COLLECTION LU ADALAH: users
    // Kita cari yang promote_count-nya di atas 0
    const topUsersRaw = await db.collection('users')
      .find({ promote_count: { $gt: 0 } })
      .sort({ promote_count: -1 })
      .limit(10)
      .toArray();

    // Filter manual biar gak ada admin/owner di list
    const formattedUsers = topUsersRaw
      .filter(u => !ownerIds.includes(String(u.id)))
      .map((u, index) => ({
        rank: index + 1,
        name: u.name || 'Anonymous',
        score: u.promote_count || 0
      }));

    // Kalau datanya beneran dapet, kirim!
    return NextResponse.json(formattedUsers);

  } catch (error) {
    console.error("KESALAHAN FATAL:", error.message);
    return NextResponse.json({ error: "Gagal narik data dari bot_48medfess" }, { status: 500 });
  }
}
