import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import College from "@/models/College";
import { promises as fs } from "fs";
import path from "path";

// POST /api/colleges/import
// Loads JSON from ext/ and bulk inserts. Idempotency is not guaranteed; call once or handle duplicates externally.
export async function POST() {
  try {
    await connectDB();

    const filePath = path.join(process.cwd(), "ext", "jammu_kashmir_colleges_govt_private.json");
    const raw = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(raw);

    if (!Array.isArray(data)) {
      return NextResponse.json({ error: "JSON root must be an array" }, { status: 400 });
    }

    // Optional: clear existing before import
    // await College.deleteMany({});

    const result = await College.insertMany(data, { ordered: false });
    return NextResponse.json({ inserted: result.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


