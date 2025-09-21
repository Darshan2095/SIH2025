"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ScholarshipDetailsPage() {
  // Example scholarship data (replace with DB / API later)
  const scholarship = {
    title: "Post-Matric Scholarship for SC Students",
    description:
      "This scholarship provides financial assistance to SC category students pursuing higher education in recognized institutions across India.",
    eligibility: {
      marks: "Minimum 50% in last qualifying exam",
      category: "SC",
      income: "Family income less than ₹2.5 lakh/year",
      location: "Applicable across all states in India",
    },
    benefits: {
      amount: "₹12,000 per year",
      duration: "Until completion of chosen course (max 5 years)",
      renewal: "Renewable every academic year based on performance",
    },
    applicationGuide: [
      "Register on the National Scholarship Portal (NSP).",
      "Fill in personal and academic details.",
      "Upload required documents in PDF format.",
      "Submit application before deadline.",
    ],
    documents: [
      "Caste Certificate",
      "Income Certificate",
      "Aadhaar Card",
      "Bank Passbook (student’s name)",
      "Previous year’s Marksheet",
    ],
    applyLink: "https://scholarships.gov.in/",
    deadline: "2025-09-30",
  };

  return (
    <div className="flex-1 py-10 border-none p-6 overflow-auto">
      <Card className="max-w-3xl mx-auto shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {scholarship.title}
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Deadline:{" "}
            <span className="font-medium text-gray-700">
              {scholarship.deadline}
            </span>
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Description */}
          <section>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{scholarship.description}</p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-lg font-semibold mb-2">Eligibility</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Marks: {scholarship.eligibility.marks}</li>
              <li>Category: {scholarship.eligibility.category}</li>
              <li>Income: {scholarship.eligibility.income}</li>
              <li>Location: {scholarship.eligibility.location}</li>
            </ul>
          </section>

          {/* Benefits */}
          <section>
            <h2 className="text-lg font-semibold mb-2">Benefits</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Amount: {scholarship.benefits.amount}</li>
              <li>Duration: {scholarship.benefits.duration}</li>
              <li>Renewal: {scholarship.benefits.renewal}</li>
            </ul>
          </section>

          {/* Application Guide */}
          <section>
            <h2 className="text-lg font-semibold mb-2">
              Step-by-Step Application Guide
            </h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-1">
              {scholarship.applicationGuide.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </section>

          {/* Required Documents */}
          <section>
            <h2 className="text-lg font-semibold mb-2">
              Required Documents
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              {scholarship.documents.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
          </section>

          {/* Apply Button */}
          <div className="pt-4">
            <a href={scholarship.applyLink} target="_blank" rel="noreferrer">
              <Button className="w-full">Apply Now</Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
