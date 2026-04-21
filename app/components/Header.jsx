"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [showBlur, setShowBlur] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setShowBlur(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [menuOpen]);

  const linkClass = (path) => (pathname === path ? "text-[var(--lime)]" : "text-[var(--white)] hover:text-[var(--lime)] transition-colors duration-300");

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/movies", label: "Movies" },
    { href: "/about", label: "Order" },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      {/* Blur background */}
      <div className={`absolute inset-0 backdrop-blur-md bg-black/50 transition-opacity duration-700 pointer-events-none ${showBlur ? "opacity-100" : "opacity-0"}`} />

      {/* Top bar */}
      <div className="relative max-w-7xl mx-auto flex items-center justify-between py-3.5 px-4 md:px-6 text-[15px]">
        <div className="flex items-center gap-4">
          {/* Burger */}
          <button onClick={() => setMenuOpen(true)} className="md:hidden inline-flex items-center justify-center" aria-label="Open menu">
            <span className="block w-6">
              <span className="block h-0.5 bg-white mb-1.5" />
              <span className="block h-0.5 bg-white mb-1.5" />
              <span className="block h-0.5 bg-white" />
            </span>
          </button>

          {/* Logo */}
          <img src="/engflix-logo.png" alt="ENGFLIX" className="w-28 md:w-32" />
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="flex gap-7 uppercase">
            {navLinks.map((l, i) => (
              <li key={l.href} className="flex items-center gap-7">
                <Link href={l.href} className={linkClass(l.href)}>
                  {l.label}
                </Link>
                {i !== navLinks.length - 1 && <span className="text-[var(--second-dark)]">|</span>}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop button */}
        <button className="btn py-1.5 px-5 hidden md:inline-flex whitespace-nowrap">SIGN IN</button>
      </div>

      {/* Mobile menu overlay */}
      <div className={`fixed inset-0 z-[60] md:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        {/* Backdrop */}
        <div onClick={() => setMenuOpen(false)} className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`} />

        {/* Drawer */}
        <aside
          className={`absolute top-0 left-0 h-full w-[80vw] max-w-[320px] bg-black/60 backdrop-blur-sm border-r border-white/10 transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-4 h-17 border-b border-white/10">
            <img src="/engflix-logo.png" alt="ENGFLIX" className="w-28" />
            <button onClick={() => setMenuOpen(false)} className="inline-flex items-center justify-center" aria-label="Close menu">
              <span className="relative w-5 h-5 block">
                <span className="absolute inset-0 m-auto h-0.5 w-5 bg-white rotate-45" />
                <span className="absolute inset-0 m-auto h-0.5 w-5 bg-white -rotate-45" />
              </span>
            </button>
          </div>

          {/* Drawer nav */}
          <nav className="px-4 py-4">
            <ul className="flex flex-col gap-3 uppercase">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={`block py-3 px-3 ${linkClass(l.href)}`} onClick={() => setMenuOpen(false)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <button className="btn w-full mt-6 py-3 text-sm inline-flex items-center justify-center whitespace-nowrap leading-none" onClick={() => setMenuOpen(false)}>
              SIGN IN
            </button>
          </nav>
        </aside>
      </div>
    </header>
  );
}
