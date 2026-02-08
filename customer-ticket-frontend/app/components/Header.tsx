"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md transition-shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🎫</span>
          <span className="text-2xl font-bold text-pink-600">SupportHub</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 font-medium">
          <Link href="/" className="text-gray-700 hover:text-pink-600 transition">Home</Link>
          <Link href="/about" className="text-gray-700 hover:text-pink-600 transition">About Us</Link>
          <Link href="/features" className="text-gray-700 hover:text-pink-600 transition">Features</Link>
          <Link href="/contact" className="text-gray-700 hover:text-pink-600 transition">Contact</Link>
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex space-x-3">
          <Link href="/login" className="px-4 py-2 border border-pink-500 text-pink-500 rounded-lg hover:bg-pink-100 transition">
            Login
          </Link>
          <Link href="/register" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition">
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none text-2xl"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white/90 backdrop-blur-md px-4 pb-4 space-y-2 transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0 overflow-hidden"}`}>
        <Link href="/" className="block text-gray-700 hover:text-pink-600">Home</Link>
        <Link href="/about" className="block text-gray-700 hover:text-pink-600">About Us</Link>
        <Link href="/features" className="block text-gray-700 hover:text-pink-600">Features</Link>
        <Link href="/contact" className="block text-gray-700 hover:text-pink-600">Contact</Link>
        <Link href="/login" className="block px-4 py-2 border border-pink-500 text-pink-500 rounded-lg text-center hover:bg-pink-100">Login</Link>
        <Link href="/register" className="block px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-center hover:opacity-90">Register</Link>
      </div>
    </header>
  );
}
