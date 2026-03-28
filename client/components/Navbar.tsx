"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { theme } from "../lib/theme";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3">
        <div className={`flex items-center justify-between rounded-xl ${theme.colors.bgGradient} px-4 sm:px-6 py-3 shadow-sm border ${theme.colors.borderLight}`}>

          {/* Logo */}
          <div className="flex items-center gap-2 z-50">
            <div className={`${theme.colors.primary} text-white font-bold w-8 h-8 flex items-center justify-center rounded-md`}>
              S
            </div>
            <span className={`text-lg font-semibold ${theme.colors.textDark}`}>
              Siksha
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            {["Home", "Solutions", "About", "Vision", "How It Works", "Contact"].map((item) => (
              <Link key={item} href="#" className="hover:text-black transition">
                {item}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:block z-50">
            <button className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-black hover:text-white transition-all duration-300">
              Get Started
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden z-50">
            <button onClick={() => setIsOpen(!isOpen)} className="p-1">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {isOpen && (
          <div className="absolute top-[70px] left-4 right-4 bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:hidden flex flex-col gap-4 z-40">
            {["Home", "Solutions", "About", "Vision", "How It Works", "Contact"].map((item) => (
              <Link key={item} href="#" onClick={() => setIsOpen(false)} className="text-gray-800 font-medium hover:text-green-600">
                {item}
              </Link>
            ))}
            <button className={`w-full flex items-center justify-center gap-2 rounded-full border border-gray-300 px-4 py-3 text-sm font-medium text-gray-800 ${theme.colors.primaryHover} hover:text-white transition-all duration-300 mt-2`}>
              Get Started
              <ArrowUpRight size={16} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}