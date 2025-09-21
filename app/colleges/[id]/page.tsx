import { connectDB } from "@/lib/mongodb";
import College from "@/models/College";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CollegeDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  await connectDB();
  const d = await College.findById(params.id).lean();
  if (!d) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">{d.name}</h1>
          <Link href="/colleges" className="text-sm text-blue-600">Back to list</Link>
        </div>

        <Card className="shadow-lg border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Overview</CardTitle>
            <p className="text-gray-500">{d.district}, {d.main_city}</p>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap mb-4 text-xs">
              <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 capitalize">{d.type}</span>
              <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 capitalize">{d.category}</span>
              <span className="px-2 py-1 rounded-full bg-green-50 text-green-700">Ranking: {d.ranking || "--"}</span>
            </div>
            <p className="text-gray-700">{d.user_reviews || "--"}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Courses & Fees</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <div className="text-gray-500">Courses Available</div>
                <div>{(d.courses_available || []).join(", ") || "--"}</div>
              </div>
              <div>
                <div className="text-gray-500">CD Score</div>
                <div>{d.cd_score || "--"}</div>
              </div>
              <div>
                <div className="text-gray-500">Course Fees</div>
                <div>{d.course_fees || "--"}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Placements</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-gray-500">Average Package</div>
                <div>{d.placement?.average_package || "--"}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-gray-500">Highest Package</div>
                <div>{d.placement?.highest_package || "--"}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-gray-500">Placement %</div>
                <div>{d.placement?.placement_percent || "--"}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              {d.user_reviews || "--"}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ranking</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">
              {d.ranking || "--"}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


