// components/Sidebar.tsx
"use client";

import Link from "next/link";
import {
  HomeIcon,
  BriefcaseIcon,
  BookOpenIcon,
  CurrencyRupeeIcon,
  ChartBarIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

const menuItems = [
  { label: "Dashboard", href: "/", icon: HomeIcon },
  { label: "Explore Careers", href: "/careers", icon: BriefcaseIcon },
  { label: "Courses & Education", href: "/colleges", icon: BookOpenIcon },
  { label: "Schemes & Scholarships", href: "/scholarships", icon: CurrencyRupeeIcon },
  { label: "Career Pathway Builder", href: "/pathways", icon: ChartBarIcon },
  { label: "Jobs & Internships", href: "/jobs", icon: BuildingOffice2Icon },
];




export default function Sidebar() {
  return (
    <aside className="w-60 bg-white shadow-md h-full fixed top-20 left-0 overflow-y-auto rounded-lg">
      <div className="px-6 py-4">
        <h2 className="text-2xl font-semibold">SIH2025</h2>
      </div>
      <nav className="mt-4">
        {menuItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
          >
            <Icon className="w-5 h-5" />
            <span className="text-lg">{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
