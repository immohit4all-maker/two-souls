"use client";

import Image from "next/image";
import { useCart } from "../context/CartContext";

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  badge?: string;
  image: string;
  desc: string;
}

const PRODUCTS: Product[] = [
  {
    id: "lavender-dream",
    name: "The Lavender Dream Ritual",
    price: 78,
    rating: 5,
    badge: "Best Seller",
    image: "/images/wellness_relax_set.png",
    desc: "A luxurious self-care set with silk mask, lavender essential oil, and organic chamomile tea.",
  },
  {
    id: "notes-reflections",
    name: "The Notes & Reflections Set",
    price: 95,
    rating: 4.9,
    badge: "Signature",
    image: "/images/luxury_gift_set.png",
    desc: "An elegant gift set containing our premium soy candle, glass jar matches, and dark velvet journal.",
  },
  {
    id: "golden-solace",
    name: "The Golden Solace Box",
    price: 85,
    rating: 4.8,
    badge: "Limited Edition",
    image: "/images/luxury_gift_set.png",
    desc: "Crafted to calm the senses, with artisan chocolates, golden coffee spoon, and matches.",
  },
  {
    id: "velvet-haven",
    name: "The Velvet Haven Ritual",
    price: 68,
    rating: 5,
    image: "/images/wellness_relax_set.png",
    desc: "Indulge in cozy warmth with custom eye mask, floral bath salts, and relaxation cards.",
  },
];

export default function ProductGrid() {
  const { addToCart } = useCart();

  return (
    <section id="shop" className="py-24 max-w-7xl mx-auto px-6 md:px-12 scroll-mt-20">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center gap-4 mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
          The Signature Collections
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-brand-obsidian dark:text-brand-linen">
          Curated Gift Boxes for Every Soul
        </h2>
        <div className="w-12 h-0.5 bg-brand-gold"></div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {PRODUCTS.map((prod) => (
          <div
            key={prod.id}
            className="group bg-brand-alabaster dark:bg-brand-obsidian rounded-2xl border border-brand-taupe/10 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image banner */}
            <div className="relative aspect-square overflow-hidden bg-brand-linen/30">
              <Image
                src={prod.image}
                alt={prod.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-w-768px) 100vw, 300px"
              />
              
              {prod.badge && (
                <span className="absolute top-4 left-4 z-10 text-[9px] uppercase font-bold tracking-widest bg-brand-gold text-white px-2.5 py-1 rounded-full shadow-sm border border-white/10">
                  {prod.badge}
                </span>
              )}
            </div>

            {/* Description & metadata */}
            <div className="p-6 flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-1 text-brand-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(prod.rating) ? "fill-current" : "fill-none stroke-current"
                    }`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
                <span className="text-[10px] text-brand-taupe-light ml-1 font-semibold">
                  ({prod.rating})
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <h3 className="font-serif text-lg font-semibold text-brand-obsidian dark:text-brand-linen group-hover:text-brand-gold transition-colors duration-300">
                  {prod.name}
                </h3>
                <p className="text-xs text-brand-taupe-light leading-relaxed font-sans font-light">
                  {prod.desc}
                </p>
              </div>

              {/* Price & Add to Bag row */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-taupe/5">
                <span className="font-serif text-lg font-bold text-brand-obsidian dark:text-brand-linen">
                  ${prod.price}.00
                </span>
                
                <button
                  onClick={() => addToCart({ name: prod.name, price: prod.price, image: prod.image })}
                  className="px-4 py-2 rounded-full border border-brand-taupe/20 text-brand-taupe hover:bg-brand-taupe hover:text-brand-alabaster text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer"
                >
                  Quick Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
