"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cartCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent shrinking-header ${
        isScrolled
          ? "py-3 bg-brand-alabaster/90 dark:bg-brand-obsidian/90 backdrop-blur-md shadow-sm border-brand-taupe/12"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Navigation links (Desktop left) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase text-brand-taupe">
          <Link
            href="/shop"
            className="hover:text-brand-gold transition-colors duration-200 relative group"
          >
            Shop
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#occasions"
            className="hover:text-brand-gold transition-colors duration-200 relative group"
          >
            Occasions
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#builder"
            className="hover:text-brand-gold transition-colors duration-200 relative group text-brand-gold font-semibold"
          >
            Bespoke Builder
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Brand Logo (Center) */}
        <Link href="/" className="flex flex-col items-center select-none group">
          <span className="font-serif text-2xl md:text-3xl font-semibold tracking-widest uppercase transition-all duration-300 group-hover:text-brand-gold text-brand-obsidian dark:text-brand-linen">
            Two Souls
          </span>
          <span className="text-[9px] uppercase tracking-[0.4em] font-sans -mt-1 text-brand-taupe-light">
            Co. Gifting
          </span>
        </Link>

        {/* Right Action Icons */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase text-brand-taupe">
            <Link
              href="#quiz"
              className="hover:text-brand-gold transition-colors duration-200 relative group"
            >
              Gift Finder
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="#story"
              className="hover:text-brand-gold transition-colors duration-200 relative group"
            >
              Our Story
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Cart Icon Button */}
          <button
            onClick={openCart}
            className="relative p-2 text-brand-taupe hover:text-brand-gold transition-colors duration-200"
            aria-label="Open Shopping Cart"
          >
            <svg
              className="w-6 h-6 stroke-current fill-none stroke-1.5"
              viewBox="0 0 24 24"
            >
              <path d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5h.008v.008h-.008V10.5Zm6.75 0h.008v.008h-.008V10.5ZM8.625 10.5" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-brand-gold text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-brand-taupe hover:text-brand-gold transition-colors duration-200"
            aria-label="Toggle Mobile Menu"
          >
            <svg
              className="w-6 h-6 stroke-current fill-none stroke-2"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-alabaster dark:bg-brand-obsidian border-b border-brand-taupe/12 px-6 py-6 flex flex-col gap-6 animate-fade-in-up">
          <Link
            href="/shop"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-medium text-brand-taupe hover:text-brand-gold uppercase tracking-wider"
          >
            Shop Collections
          </Link>
          <Link
            href="#occasions"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-medium text-brand-taupe hover:text-brand-gold uppercase tracking-wider"
          >
            Occasions
          </Link>
          <Link
            href="#builder"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-semibold text-brand-gold hover:underline uppercase tracking-wider"
          >
            Bespoke Builder
          </Link>
          <Link
            href="#quiz"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-medium text-brand-taupe hover:text-brand-gold uppercase tracking-wider"
          >
            Gift Finder
          </Link>
          <Link
            href="#story"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-medium text-brand-taupe hover:text-brand-gold uppercase tracking-wider"
          >
            Our Story
          </Link>
        </div>
      )}
    </header>
  );
}
