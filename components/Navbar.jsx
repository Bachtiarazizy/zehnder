"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-transparent md:bg-transparent  fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-evenly h-20 md:h-24">
          {/* Left Menu - Desktop */}
          <div className="hidden md:flex items-center mt-8 space-x-8 lg:space-x-12 flex-1">
            <Link href="#" className="text-white text-sm lg:text-base font-light tracking-wider hover:text-amber-400 transition-colors duration-300">
              MIETANGEBOTE
            </Link>
            <Link href="#" className="text-white text-sm lg:text-base font-light tracking-wider hover:text-amber-400 transition-colors duration-300">
              KAUFANGEBOTE
            </Link>
          </div>

          {/* Logo - Center */}
          <div className="shrink-0">
            <Link href="/">
              <Image src="/images/ZEHNDER__GRUNDSTÜCKSVERWALTUNG_S_LOGO_WHITE-GOLD.svg" alt="Logo" width={130} height={130} className="mb-1" />
            </Link>
          </div>

          {/* Right Menu - Desktop */}
          <div className="hidden md:flex items-center mt-8 space-x-8 lg:space-x-12 flex-1 justify-end">
            <Link href="#" className="text-white text-sm lg:text-base font-light tracking-wider hover:text-amber-400 transition-colors duration-300">
              GESCHICHTE
            </Link>
            <Link href="#" className="text-white text-sm lg:text-base font-light tracking-wider hover:text-amber-400 transition-colors duration-300">
              KONTAKT
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden ml-auto text-white focus:outline-none" aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-4 pt-2 pb-6 space-y-4 bg-black/95">
          <Link href="/mietangebote" className="block text-white text-base font-light tracking-wider hover:text-amber-400 transition-colors duration-300 py-2" onClick={() => setIsMenuOpen(false)}>
            MIETANGEBOTE
          </Link>
          <Link href="/kaufangebote" className="block text-white text-base font-light tracking-wider hover:text-amber-400 transition-colors duration-300 py-2" onClick={() => setIsMenuOpen(false)}>
            KAUFANGEBOTE
          </Link>
          <Link href="/geschichte" className="block text-white text-base font-light tracking-wider hover:text-amber-400 transition-colors duration-300 py-2" onClick={() => setIsMenuOpen(false)}>
            GESCHICHTE
          </Link>
          <Link href="/kontakt" className="block text-white text-base font-light tracking-wider hover:text-amber-400 transition-colors duration-300 py-2" onClick={() => setIsMenuOpen(false)}>
            KONTAKT
          </Link>
        </div>
      </div>
    </nav>
  );
}
