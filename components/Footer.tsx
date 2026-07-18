"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address");
      return;
    }

    setErrorMsg("");
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer id="story" className="bg-[#121212] text-[#f4f0ec] border-t border-[#f4f0ec]/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#f4f0ec]/10">
        
        {/* Brand Block */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <Link href="/" className="flex flex-col select-none">
            <span className="font-serif text-2xl font-semibold tracking-widest uppercase text-white hover:text-brand-gold transition-colors duration-200">
              Two Souls
            </span>
            <span className="text-[9px] uppercase tracking-[0.4em] text-brand-gold -mt-1 font-sans">
              Co. Gifting
            </span>
          </Link>
          <p className="text-xs md:text-sm font-sans font-light text-[#f4f0ec]/70 leading-relaxed max-w-sm">
            Bridging distance and bringing hearts closer through handcrafted gift boxes that speak your sentiments. Carefully sourced, thoughtfully arranged, and wrapped in premium memories.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-4">
            {["instagram", "pinterest", "facebook"].map((social) => (
              <a
                key={social}
                href={`https://${social}.com`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#f4f0ec]/20 flex items-center justify-center text-[#f4f0ec]/70 hover:text-brand-gold hover:border-brand-gold transition-all duration-300"
                aria-label={`Visit our ${social} page`}
              >
                <span className="text-[10px] uppercase font-bold tracking-wider font-sans">
                  {social[0]}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Links Column 1: Shop */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h4 className="font-serif text-sm font-semibold tracking-wider text-white uppercase">
            Shop Collections
          </h4>
          <nav className="flex flex-col gap-2.5 text-xs md:text-sm font-sans font-light text-[#f4f0ec]/60">
            <Link href="#shop" className="hover:text-brand-gold transition-colors">Best Sellers</Link>
            <Link href="#occasions" className="hover:text-brand-gold transition-colors">Romantic Sets</Link>
            <Link href="#occasions" className="hover:text-brand-gold transition-colors">Corporate Milestones</Link>
            <Link href="#occasions" className="hover:text-brand-gold transition-colors">Wellness Rituals</Link>
          </nav>
        </div>

        {/* Links Column 2: Studio */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h4 className="font-serif text-sm font-semibold tracking-wider text-white uppercase">
            Gifting Studio
          </h4>
          <nav className="flex flex-col gap-2.5 text-xs md:text-sm font-sans font-light text-[#f4f0ec]/60">
            <Link href="#builder" className="hover:text-brand-gold transition-colors">Bespoke Customizer</Link>
            <Link href="#quiz" className="hover:text-brand-gold transition-colors">Personalization Quiz</Link>
            <Link href="#story" className="hover:text-brand-gold transition-colors">The Gifting Art</Link>
            <Link href="#story" className="hover:text-brand-gold transition-colors">Sustainable Sourcing</Link>
          </nav>
        </div>

        {/* Newsletter Signup column */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h4 className="font-serif text-sm font-semibold tracking-wider text-white uppercase">
            Join the Inner Circle
          </h4>
          <p className="text-xs md:text-sm font-sans font-light text-[#f4f0ec]/70 leading-relaxed">
            Subscribe to receive exclusive access to limited-run keepsake boxes, styling guides, and 10% off your first gesture.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 mt-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  placeholder="Enter your email address"
                  className="w-full bg-[#1e1e1d] border border-[#f4f0ec]/20 rounded-full py-3.5 px-6 text-xs text-white placeholder-[#f4f0ec]/45 focus:outline-none focus:border-brand-gold transition-all duration-300 pr-12 font-sans font-light"
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1.5 bottom-1.5 bg-[#f4f0ec] text-[#121212] hover:bg-brand-gold hover:text-white px-4 rounded-full text-[10px] font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center shadow-sm"
                >
                  Join
                </button>
              </div>
              {errorMsg && (
                <span className="text-xs text-red-400 font-semibold px-2 animate-fade-in-up">
                  {errorMsg}
                </span>
              )}
            </form>
          ) : (
            <div className="mt-2 p-4 bg-brand-gold/15 border border-brand-gold/30 text-brand-gold rounded-2xl text-xs md:text-sm font-sans leading-relaxed text-center animate-fade-in-up">
              ✨ Welcome to the circle. Check your inbox for your 10% welcome gesture code.
            </div>
          )}
        </div>

      </div>

      {/* Copy info */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-sans font-light text-[#f4f0ec]/40">
        <span>© {new Date().getFullYear()} Two Souls Co. All rights reserved. Crafted by Antigravity.</span>
        <div className="flex gap-6">
          <Link href="/" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
          <Link href="/" className="hover:text-brand-gold transition-colors">Terms of Service</Link>
          <Link href="/" className="hover:text-brand-gold transition-colors">Corporate Accounts</Link>
        </div>
      </div>
    </footer>
  );
}
