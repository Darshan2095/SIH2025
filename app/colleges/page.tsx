"use client";

import { useEffect, useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import CollegeCard, { College } from "@/components/CollegeCard";

type CollegeDoc = College & {
  _id?: string;
  id?: string | number;
  district?: string;
  main_city?: string;
  courses_available?: string[];
  category?: string;
  cd_score?: string;
  course_fees?: string;
  placement?: {
    average_package?: string;
    highest_package?: string;
    placement_percent?: string;
  };
  user_reviews?: string;
  ranking?: string;
};

export default function CollegesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [feesFilter, setFeesFilter] = useState("");
  const [placementAvgFilter, setPlacementAvgFilter] = useState(false);
  const [placementHighFilter, setPlacementHighFilter] = useState(false);
  const [reviewsFilter, setReviewsFilter] = useState("");
  const [rankingFilter, setRankingFilter] = useState("");
  const [colleges, setColleges] = useState<CollegeDoc[]>([]);

  // Fetch colleges from API
  useEffect(() => {
    async function fetchColleges() {
      try {
        const res = await fetch("/api/colleges");
        const data = await res.json();
        setColleges(data);
      } catch (err) {
        console.error("Error fetching colleges:", err);
      }
    }
    fetchColleges();
  }, []);

  function parseRupees(value?: string): number | null {
    if (!value) return null;
    const cleaned = value.replace(/[,\u00A0]/g, "").replace(/₹/g, "").toLowerCase();
    const m = cleaned.match(/(\d+(?:\.\d+)?)(?:\s*(l|lac|lakh|cr))?/);
    if (!m) return null;
    let num = parseFloat(m[1]);
    const unit = m[2];
    if (unit === "l" || unit === "lac" || unit === "lakh") num *= 100000;
    if (unit === "cr") num *= 10000000;
    return isNaN(num) ? null : num;
  }

  function parseLPA(value?: string): number | null {
    if (!value) return null;
    const s = value.toLowerCase();
    const m = s.match(/(\d+(?:\.\d+)?)\s*lpa/);
    if (m) return parseFloat(m[1]);
    const m2 = s.match(/(\d+(?:\.\d+)?)/);
    return m2 ? parseFloat(m2[1]) : null;
  }

  function parseRating(value?: string): number | null {
    if (!value) return null;
    const m = value.match(/(\d(?:\.\d)?)\s*\/\s*5/);
    return m ? parseFloat(m[1]) : null;
  }

  function parseRank(value?: string): number | null {
    if (!value) return null;
    const m = value.match(/#?(\d+)/);
    return m ? parseInt(m[1], 10) : null;
  }

  const filtered = useMemo(() => {
    return colleges
      .filter((c) => (search ? c.name.toLowerCase().includes(search.toLowerCase()) : true))
      .filter((c) => (typeFilter ? (c.type || "").toLowerCase() === typeFilter.toLowerCase() : true))
      .filter((c) => {
        if (!categoryFilter) return true;
        const cat = (c.category || "").toLowerCase();
        const cd = (c.cd_score || "").toLowerCase();
        const needle = categoryFilter.toLowerCase();
        if (needle === "degree") return cat.includes("degree") || cd.includes("ba") || cd.includes("b.sc") || cd.includes("b.com");
        if (needle === "engineering") return cat.includes("engineer") || cd.includes("b.tech") || cd.includes("engineering");
        if (needle === "medical") return cat.includes("medical") || cd.includes("mbbs") || cd.includes("bds") || cd.includes("physio");
        if (needle === "arts") return cat.includes("arts") || cd.includes("b.des") || cd.includes("arts");
        if (needle === "management") return cat.includes("management") || cd.includes("mba") || cd.includes("pgdm");
        return true;
      })
      .filter((c) => (stateFilter ? (c.address || "").toLowerCase().includes(stateFilter.toLowerCase()) : true))
      .filter((c) => (districtFilter ? (c.district || "").toLowerCase().includes(districtFilter.toLowerCase()) : true))
      .filter((c) => (cityFilter ? (c.main_city || "").toLowerCase().includes(cityFilter.toLowerCase()) : true))
      .filter((c) => {
        if (!courseFilter) return true;
        const list = (c.courses_available || []).join(" ").toLowerCase();
        const cd = (c.cd_score || "").toLowerCase();
        const cf = courseFilter.toLowerCase();
        if (cf === "engineering") return list.includes("engineer") || cd.includes("b.tech") || cd.includes("engineering");
        if (cf === "medical") return list.includes("medical") || cd.includes("mbbs") || cd.includes("bds") || cd.includes("physio");
        if (cf === "mba") return list.includes("mba") || cd.includes("mba") || cd.includes("pgdm");
        if (cf === "arts") return list.includes("arts") || cd.includes("b.des") || cd.includes("arts");
        return true;
      })
      .filter((c) => {
        if (!feesFilter) return true;
        const amount = parseRupees(c.cd_score || c.course_fees || "");
        if (amount == null) return false;
        if (feesFilter === "lt50k") return amount < 50000;
        if (feesFilter === "50k-1l") return amount >= 50000 && amount <= 100000;
        if (feesFilter === "1l-2l") return amount > 100000 && amount <= 200000;
        if (feesFilter === "gt2l") return amount > 200000;
        return true;
      })
      .filter((c) => {
        if (!placementAvgFilter && !placementHighFilter) return true;
        const avg = parseLPA(c.placement?.average_package);
        const high = parseLPA(c.placement?.highest_package);
        const avgOk = placementAvgFilter ? (avg != null && avg > 5) : true;
        const highOk = placementHighFilter ? (high != null && high > 10) : true;
        return avgOk && highOk;
      })
      .filter((c) => {
        if (!reviewsFilter) return true;
        const rating = parseRating(c.user_reviews);
        if (rating == null) return false;
        if (reviewsFilter === "4plus") return rating >= 4;
        if (reviewsFilter === "3plus") return rating >= 3;
        return true;
      })
      .filter((c) => {
        if (!rankingFilter) return true;
        const rank = parseRank(c.ranking);
        if (rank == null) return false;
        if (rankingFilter === "top10") return rank <= 10;
        if (rankingFilter === "top50") return rank <= 50;
        if (rankingFilter === "top100") return rank <= 100;
        return true;
      });
  }, [colleges, search, typeFilter, categoryFilter, stateFilter, districtFilter, cityFilter, courseFilter, feesFilter, placementAvgFilter, placementHighFilter, reviewsFilter, rankingFilter]);

  function resetFilters() {
    setSearch("");
    setTypeFilter("");
    setCategoryFilter("");
    setStateFilter("");
    setDistrictFilter("");
    setCityFilter("");
    setCourseFilter("");
    setFeesFilter("");
    setPlacementAvgFilter(false);
    setPlacementHighFilter(false);
    setReviewsFilter("");
    setRankingFilter("");
  }

  return (
    <div className="flex py-10 rounded-lg h-screen gap-4">
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Search Bar */}
        <div className="flex justify-center mb-6 border-none">
          <div className="w-full max-w-xl flex items-center gap-2 bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] border-none">
            <Input
              type="text"
              placeholder="Search colleges..."
              value={search}
              className="border-none"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button>
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600 mb-3">
          {filtered.length} results
        </div>

        {/* College Cards Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
           {filtered.map((college) => (
             <CollegeCard
               key={(college._id ?? college.id ?? college.name) as string | number}
               college={college}
             />
           ))}
        </div>
      </div>

      {/* Right Filter Sidebar */}
      <div className="w-72 rounded-lg p-4 bg-white">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filters
          </h2>
          <button className="text-blue-600 text-sm" onClick={resetFilters}>
            Reset
          </button>
        </div>

        <ScrollArea className="h-[calc(100vh-130px)] pr-2">
          <div className="space-y-4">
            {/* College Type */}
            <div>
              <Label htmlFor="type">College Type</Label>
              <select
                id="type"
                className="w-full border rounded p-2"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="">Any</option>
                <option value="government">Government</option>
                <option value="private">Private</option>
                <option value="deemed">Deemed</option>
                <option value="autonomous">Autonomous</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="w-full border rounded p-2"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">Any</option>
                <option value="degree">Degree</option>
                <option value="engineering">Engineering</option>
                <option value="medical">Medical</option>
                <option value="arts">Arts</option>
                <option value="management">Management</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <Label>Location</Label>
              <div className="grid grid-cols-1 gap-2 mt-1">
                <Input placeholder="State" value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} />
                <Input placeholder="District" value={districtFilter} onChange={(e) => setDistrictFilter(e.target.value)} />
                <Input placeholder="City" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} />
              </div>
            </div>

            {/* Course */}
            <div>
              <Label htmlFor="course">Course</Label>
              <select
                id="course"
                className="w-full border rounded p-2"
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
              >
                <option value="">Any</option>
                <option value="engineering">Engineering</option>
                <option value="medical">Medical</option>
                <option value="mba">MBA</option>
                <option value="arts">Arts</option>
              </select>
            </div>

            {/* Fees */}
            <div>
              <Label htmlFor="fees">Fees</Label>
              <select
                id="fees"
                className="w-full border rounded p-2"
                value={feesFilter}
                onChange={(e) => setFeesFilter(e.target.value)}
              >
                <option value="">Any</option>
                <option value="lt50k">Below 50k</option>
                <option value="50k-1l">50k–1L</option>
                <option value="1l-2l">1L–2L</option>
                <option value="gt2l">Above 2L</option>
              </select>
            </div>

            {/* Placement */}
            <div>
              <Label>Placement</Label>
              <div className="mt-1 space-y-1 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={placementAvgFilter} onChange={(e) => setPlacementAvgFilter(e.target.checked)} />
                  Average &gt; 5 LPA
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={placementHighFilter} onChange={(e) => setPlacementHighFilter(e.target.checked)} />
                  Highest &gt; 10 LPA
                </label>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <Label htmlFor="reviews">Reviews</Label>
              <select
                id="reviews"
                className="w-full border rounded p-2"
                value={reviewsFilter}
                onChange={(e) => setReviewsFilter(e.target.value)}
              >
                <option value="">Any</option>
                <option value="4plus">4★ & above</option>
                <option value="3plus">3★ & above</option>
              </select>
            </div>

            {/* Ranking */}
            <div>
              <Label htmlFor="ranking">Ranking</Label>
              <select
                id="ranking"
                className="w-full border rounded p-2"
                value={rankingFilter}
                onChange={(e) => setRankingFilter(e.target.value)}
              >
                <option value="">Any</option>
                <option value="top10">Top 10</option>
                <option value="top50">Top 50</option>
                <option value="top100">Top 100</option>
              </select>
            </div>

            <Button className="w-full mt-2" onClick={() => {}}>
              Apply Filters
            </Button>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
