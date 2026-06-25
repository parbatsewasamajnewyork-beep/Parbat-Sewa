'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { label: 'ABOUT', href: '/about' },
  { label: 'EVENTS', href: '/events' },
  { label: 'CONTACT', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Changed 'absolute' to 'sticky' so it pushes the hero down naturally.
    // Added a background and backdrop-blur so text remains readable when scrolling.
    <header className="sticky left-0 right-0 top-0 z-50 w-full border-b border-white/5 bg-background/90 px-[6%] py-[16px] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-3 font-serif text-[22px] font-extrabold tracking-[0.5px] text-red-soft no-underline"
        >
          {/* Removed ml-10 to prevent mobile layout breaking */}
          <Image src="/logo.png" alt="Parbat-NY logo" width={50} height={50} className="object-contain" />
          <span className="max-[400px]:hidden">Parbat NY</span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-[38px] min-[860px]:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[12.5px] font-semibold tracking-[1.5px] text-white no-underline transition-colors hover:text-red-soft"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* DESKTOP BUTTON & MOBILE HAMBURGER */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden rounded-[5px] bg-red-soft px-5 py-[11px] text-[12.5px] font-semibold tracking-[0.5px] text-white no-underline transition-all hover:-translate-y-0.5 hover:bg-red-soft/80 min-[860px]:block"
          >
            Join Community
          </Link>

          {/* Hamburger Menu Toggle Button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-md text-white min-[860px]:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              // Close (X) Icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              // Hamburger Icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isOpen && (
        <div className="absolute left-0 top-full flex w-full flex-col border-b border-white/10 bg-black/95 px-[6%] py-6 shadow-xl backdrop-blur-md min-[860px]:hidden">
          <nav className="flex flex-col gap-6 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)} // Close menu on click
                className="text-[15px] font-semibold tracking-[1.5px] text-white no-underline transition-colors hover:text-red-soft"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 inline-block w-full rounded-[5px] bg-red-soft px-5 py-4 text-[14px] font-semibold tracking-[0.5px] text-white no-underline transition-all hover:bg-red-soft/80"
            >
              Join Community
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}