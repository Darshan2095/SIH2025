// components/Navbar.tsx
"use client";

import { Search, Bell, Bookmark } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 z-50 flex items-center justify-between px-6 py-3 bg-[#2563eb] text-white shadow-md">
      {/* Left - Logo */}
      <div className="flex items-center gap-2">
        <Image
          src="next.svg" // replace with your logo path
          alt="GramConnect Logo"
          width={32}
          height={32}
        />
        <span className="text-xl font-semibold">GramConnect</span>
      </div>

      {/* Middle - Search */}
      <div className="hidden md:flex items-center w-1/2 relative">
        <Search className="absolute left-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search"
          className="w-full border rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right - Icons + Profile */}
      <div className="flex items-center gap-4">
        {/* Language */}
        <select className="border rounded-md px-2 py-1 text-sm">
          <option>English</option>
          <option>Hindi</option>
          <option>Gujarati</option>
        </select>

        {/* Bookmark */}
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bookmark size={20} />
        </button>

        {/* Notification */}
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="w-8 h-8 rounded-full overflow-hidden border">
          <Image
            src="profile.svg" // replace with your profile image
            alt="Profile"
            width={32}
            height={32}
          />
        </div>
      </div>
    </nav>
  );
}
