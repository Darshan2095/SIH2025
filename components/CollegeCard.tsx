import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export type College = {
  _id?: string;
  id?: string | number;
  name: string;
  state: string;
  branch: string; // e.g., Engineering, Medical, Arts
  type: string; // e.g., Public, Private, Deemed
  address: string;
  description: string;
};

type CollegeCardProps = {
  college: College;
};

export default function CollegeCard({ college }: CollegeCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/colleges/${(college as any)._id ?? college.id ?? ""}`} className="flex gap-4 p-4">
        {/* Image */}
        <div className="h-24 w-24 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
          No Image
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <CardHeader className="p-0 border-none mb-1">
            <CardTitle className="text-xl truncate">{college.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-0 text-sm text-gray-600">
            <p className="truncate">{college.address}</p>
            <p className="mt-1 text-xs text-gray-500">
              State: {college.state} • Branch: {college.branch} • Type: {college.type}
            </p>
            <p className="mt-2 text-gray-700 line-clamp-2">{college.description}</p>
          </CardContent>
        </div>
      </Link>
    </Card>
  );
}


