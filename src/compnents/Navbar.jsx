"use client"; // Required for usePathname

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Hook to get the current URL
import { Home, Clock, BarChart2 } from 'lucide-react';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const pathname = usePathname(); // This holds the current path (e.g., "/stats")

  // Helper function to check if a link is active
  const isActive = (path) => pathname === path;

  // Style classes
  const activeClass = "bg-[#244D3F] text-white hover:bg-[#1a3a2f]";
  const inactiveClass = "text-slate-500 hover:text-[#244D3F]";
  const baseClass = "flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium";

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-8 border-b border-gray-100">
      <div className="flex-1">
        <Link href="/" className="inline-block">
          <Image src={logoImg} alt="KeenKeeper Logo" height={40} width={160} className="object-contain" priority />
        </Link>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal gap-2 items-center p-0">
          {/* Home Link */}
          <li>
            <Link 
              href="/" 
              className={`${baseClass} ${isActive('/') ? activeClass : inactiveClass}`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
          </li>

          {/* Timeline Link */}
          <li>
            <Link 
              href="/time" 
              className={`${baseClass} ${isActive('/time') ? activeClass : inactiveClass}`}
            >
              <Clock size={18} />
              <span>Timeline</span>
            </Link>
          </li>

          {/* Stats Link */}
          <li>
            <Link 
              href="/about" 
              className={`${baseClass} ${isActive('/about') ? activeClass : inactiveClass}`}
            >
              <BarChart2 size={18} />
              <span>Stats</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;