"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { Home, Clock, BarChart2, Menu, X } from 'lucide-react';
import { useState } from 'react';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => pathname === path;

  // Style classes
  const activeClass = "bg-[#244D3F] text-white";
  const inactiveClass = "text-slate-500 hover:text-[#244D3F] hover:bg-slate-50";
  const baseClass = "flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium";

  const navLinks = [
    { name: 'Home', href: '/', icon: <Home size={18} /> },
    { name: 'Timeline', href: '/time', icon: <Clock size={18} /> },
    { name: 'Stats', href: '/about', icon: <BarChart2 size={18} /> },
  ];

  return (
    <nav className="navbar bg-white shadow-sm px-4 md:px-8 border-b border-gray-100 sticky top-0 z-50">
      <div className="flex-1">
        <Link href="/" className="inline-block">
          <Image src={logoImg} alt="KeenKeeper Logo" height={40} width={140} className="object-contain" priority />
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-none">
        <ul className="menu menu-horizontal gap-2 p-0">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.href} 
                className={`${baseClass} ${isActive(link.href) ? activeClass : inactiveClass}`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="flex-none md:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="btn btn-ghost btn-circle text-slate-600"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Overlay */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg md:hidden animate-in slide-in-from-top duration-200">
          <ul className="flex flex-col gap-2 p-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  onClick={() => setIsOpen(false)} // Close menu when link is clicked
                  className={`${baseClass} w-full ${isActive(link.href) ? activeClass : inactiveClass}`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;