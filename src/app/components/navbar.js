"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-yellow-600 tracking-wide">Hotel Delish</h2>
      <div className="flex space-x-6 relative text-gray-700 font-medium">
        <Link href="/" className="hover:text-yellow-600 transition">Home</Link>
        <Link href="/about" className="hover:text-yellow-600 transition">About</Link>
        <Link href="/current-affairs" className="hover:text-yellow-600 transition">news</Link>

        <div
          className="relative"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button className="hover:text-yellow-600 transition">Menu ▾</button>
          {isDropdownOpen && (
            <div className="absolute bg-white text-gray-800 rounded shadow top-full left-0 mt-2 w-40 z-50">
              <Link href="/menu/main" className="block px-4 py-2 hover:bg-gray-100">Main Menu</Link>
              <Link href="/menu/lunch" className="block px-4 py-2 hover:bg-gray-100">Lunch Menu</Link>
            </div>
          )}
        </div>

        <Link href="/gallery" className="hover:text-yellow-600 transition">Gallery</Link>
        <Link href="/contact" className="hover:text-yellow-600 transition">Contact</Link>
        <Link href="/cart" className="hover:text-yellow-600 transition">Cart</Link>
      </div>
    </nav>
  );
}
