import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import College from "@/models/College";

// GET all colleges
export async function GET() {
  try {
    await connectDB();
    const docs = await College.find();
    // Map DB schema -> UI shape expected by card/list without changing the card
    const colleges = docs.map((d: any) => ({
      _id: d._id,
      name: d.name,
      // map address and description from available fields
      address: `${d.district}, ${d.main_city}`,
      description: `${d.user_reviews} • ${d.ranking}`,
      // infer state/branch for filters best-effort
      state: d.main_city || "",
      branch: d.category || "",
      type: d.type || "",
      // raw fields for advanced filters
      district: d.district,
      main_city: d.main_city,
      courses_available: d.courses_available,
      category: d.category,
      cd_score: d.cd_score,
      course_fees: d.course_fees,
      placement: d.placement,
      user_reviews: d.user_reviews,
      ranking: d.ranking,
    }));
    return NextResponse.json(colleges);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST new college
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const college = new College(body);
    await college.save();

    return NextResponse.json(college, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
