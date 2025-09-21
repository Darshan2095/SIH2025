import { connectDB } from "@/lib/mongodb";
import College from "@/models/College";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const d = await College.findById(params.id);
    if (!d) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const college = {
      _id: d._id,
      name: d.name,
      address: `${d.district}, ${d.main_city}`,
      description: `${d.user_reviews} • ${d.ranking}`,
      state: d.main_city || "",
      branch: d.category || "",
      type: d.type || "",
      district: d.district,
      main_city: d.main_city,
      courses_available: d.courses_available,
      category: d.category,
      cd_score: d.cd_score,
      course_fees: d.course_fees,
      placement: d.placement,
      user_reviews: d.user_reviews,
      ranking: d.ranking,
    };
    return NextResponse.json(college);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
