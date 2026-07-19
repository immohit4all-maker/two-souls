"use client";

import { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import OccasionsGrid from "../components/OccasionsGrid";
import GiftBuilder from "../components/GiftBuilder";
import ProductGrid from "../components/ProductGrid";
import GiftFinder from "../components/GiftFinder";
import Footer from "../components/Footer";

export default function Home() {
  // Scroll reveal setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-12");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const sections = document.querySelectorAll(".reveal-section");
    sections.forEach((sec) => observer.observe(sec));

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f6] text-[#121212] overflow-x-hidden">
      {/* Navigation Header — reads cart state from CartContext */}
      <Header />

      {/* Hero section */}
      <main className="flex-1">
        <Hero />

        {/* Brand Value Statement / Story Section */}
        <section className="reveal-section opacity-0 translate-y-12 transition-all duration-1000 ease-out py-20 border-b border-brand-taupe/10 bg-brand-linen/10">
          <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-6 items-center">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-gold">
              Our Philosophy
            </span>
            <blockquote className="font-serif text-2xl md:text-3xl font-light italic leading-relaxed text-brand-obsidian dark:text-brand-linen max-w-2xl">
              &ldquo;A thoughtful gift is the visible thread that connects two souls across any distance.&rdquo;
            </blockquote>
            <div className="h-0.5 w-8 bg-brand-gold mt-2"></div>
            <p className="max-w-lg text-xs md:text-sm text-brand-taupe-light font-light leading-relaxed">
              We design premium keepsakes. Every element inside our signature boxes is source-verified, artisanal, and curated to create a lasting connection.
            </p>
          </div>
        </section>

        {/* Occasions Categorization */}
        <div className="reveal-section opacity-0 translate-y-12 transition-all duration-1000 ease-out">
          <OccasionsGrid />
        </div>

        {/* Bespoke Interactive Builder — uses CartContext internally */}
        <div className="reveal-section opacity-0 translate-y-12 transition-all duration-1000 ease-out">
          <GiftBuilder />
        </div>

        {/* Curated Pre-made Sets — uses CartContext internally */}
        <div className="reveal-section opacity-0 translate-y-12 transition-all duration-1000 ease-out">
          <ProductGrid />
        </div>

        {/* Personalized Selector Quiz — uses CartContext internally */}
        <div className="reveal-section opacity-0 translate-y-12 transition-all duration-1000 ease-out">
          <GiftFinder />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
