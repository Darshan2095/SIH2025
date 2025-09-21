// app/schemes/page.js
'use client';
import { useState } from "react";
import SchemeCard from "../../components/SchemeCard";
import FilterSidebar from "../../components/FilterSidebar";

// Mock data
const schemesData = [
  {
    id: 1,
    title: "Atal Sneh Yojana",
    description:
      "The scheme is launched by the Chief Minister of Gujarat, Mr. Vijay Rupani...",
    category: ["Health", "Gujarat"],
  },
  {
    id: 2,
    title: "Deendayal Antyodaya Yojana - National Rural Livelihoods Mission",
    description:
      "DAY-NRLM is the flagship program of MoRD for promoting poverty reduction...",
    category: ["Loan", "Skill", "Employment"],
  },
  {
    id: 3,
    title: "Aam Aadmi Bima Yojana",
    description:
      "A social security scheme for rural landless households implemented by the Ministry of Labour & Employment...",
    category: ["Bima", "Insurance", "Labour Welfare", "BPL"],
  },
];

export default function SchemesPage() {
  const [sortOrder, setSortOrder] = useState("asc"); // A->Z

  // Sort schemes
  const sortedSchemes = [...schemesData].sort((a, b) => {
    if (sortOrder === "asc") return a.title.localeCompare(b.title);
    else return b.title.localeCompare(a.title);
  });

  return (
    <>
    
    
   
    <div className="flex min-h-screen bg-gray-100">
      {/* Main content */}
      <div className="flex-1 gap-2 p-6 bg-white shadow-2xl mr-4 rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">
            Total {schemesData.length} Schemes Available
          </h1>
          <div>
            <label className="mr-2 font-medium">Sort:</label>
            <select
              className="border rounded p-1"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Scheme Name (A → Z)</option>
              <option value="desc">Scheme Name (Z → A)</option>
            </select>
          </div>
        </div>

        {/* Schemes List */}
        {sortedSchemes.map((scheme) => (
          <SchemeCard key={scheme.id} scheme={scheme} />
        ))}
      </div>

      {/* Right Filter Sidebar */}
        <FilterSidebar />
    </div>
    

    
     </>
  );
}
