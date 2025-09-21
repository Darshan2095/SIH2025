"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export default function ScholarshipsPage() {
  const [search, setSearch] = useState("");

  // Dummy data (replace with API later)
  const scholarships = [
    {
      id: 1,
      title: "Post-Matric Scholarship for SC Students",
      state: "Gujarat",
      deadline: "2025-09-30",
      description:
        "Financial aid for SC category students pursuing higher education in recognized institutions.",
    },
    {
      id: 2,
      title: "National Merit Scholarship",
      state: "All India",
      deadline: "2025-10-15",
      description:
        "Awarded to meritorious students across India to encourage academic excellence.",
    },
    {
      id: 3,
      title: "Higher Education Scholarship for Girls",
      state: "Maharashtra",
      deadline: "2025-09-20",
      description:
        "Scholarship aimed at promoting higher education among female students from disadvantaged backgrounds.",
    },
  ];

  return (
    <div className="flex py-10 rounded-lg h-screen  gap-4">
      {/* Left Sidebar already exists in your layout */}

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Search Bar */}
        <div className="flex justify-center mb-6 border-none">
          <div className="w-full max-w-xl flex items-center gap-2 bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] border-none">
            <Input
              type="text"
              placeholder="Search scholarships..."
              value={search}
              className="border-none"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button>
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Scholarship List (vertical cards) */}
        <div className="space-y-4 ">
          {scholarships
            .filter((s) =>
              s.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((scholarship) => (
              <div
                key={scholarship.id}
                className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {scholarship.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  Deadline:{" "}
                  <span className="font-medium text-gray-700">
                    {scholarship.deadline}
                  </span>{" "}
                  | State: {scholarship.state}
                </p>
                <p className="text-gray-700 mb-4">{scholarship.description}</p>
                <Button className="text-sm">
                  <Link href={`/scholarships/${scholarship.id}`}>View Details</Link>
                </Button>
              </div>
            ))}
        </div>
      </div>

      {/* Right Filter Sidebar */}
      <div className="w-72 rounded-lg p-4 bg-white">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filters
        </h2>
        <ScrollArea className="h-[calc(100vh-100px)] pr-2">
          <div className="space-y-4">
            {/* Class Filter */}
            <div>
              <Label htmlFor="class">Class</Label>
              <select id="class" className="w-full border rounded p-2">
                <option value="">All</option>
                <option value="10">Class 10</option>
                <option value="12">Class 12</option>
                <option value="college">Graduation</option>
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <Label htmlFor="gender">Gender</Label>
              <select id="gender" className="w-full border rounded p-2">
                <option value="">Any</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <Label htmlFor="category">Category</Label>
              <select id="category" className="w-full border rounded p-2">
                <option value="">Any</option>
                <option value="sc">SC</option>
                <option value="st">ST</option>
                <option value="obc">OBC</option>
                <option value="general">General</option>
              </select>
            </div>

            {/* Income Filter */}
            <div>
              <Label htmlFor="income">Income Level</Label>
              <select id="income" className="w-full border rounded p-2">
                <option value="">Any</option>
                <option value="low">Below 1 Lakh</option>
                <option value="middle">1–5 Lakh</option>
                <option value="high">Above 5 Lakh</option>
              </select>
            </div>

            {/* State Filter */}
            <div>
              <Label htmlFor="state">State</Label>
              <select id="state" className="w-full border rounded p-2">
                <option value="">All India</option>
                <option value="gujarat">Gujarat</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="karnataka">Karnataka</option>
              </select>
            </div>

            {/* Deadline Filter */}
            <div>
              <Label htmlFor="deadline">Deadline</Label>
              <select id="deadline" className="w-full border rounded p-2">
                <option value="">Any</option>
                <option value="7days">Next 7 days</option>
                <option value="30days">Next 30 days</option>
              </select>
            </div>

            <Button className="w-full mt-4">Apply Filters</Button>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
