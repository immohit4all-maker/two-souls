import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-brand-linen/40 dark:bg-brand-obsidian/30">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-taupe/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Copy Block */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-taupe/20 bg-brand-alabaster/60 dark:bg-brand-obsidian/60 backdrop-blur-sm text-xs font-semibold uppercase tracking-widest text-brand-taupe">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping"></span>
            Bespoke Gifting Studio
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-brand-obsidian dark:text-brand-linen leading-[1.15]">
            Crafted for Connection.<br />
            <span className="text-brand-taupe italic font-light font-serif">Curated for the Soul.</span>
          </h1>
          
          <p className="max-w-lg text-base md:text-lg text-brand-taupe-light dark:text-brand-linen/70 leading-relaxed font-sans font-light">
            We believe gifting is an art. Two Souls Co. designs luxurious, thoughtful, and custom keepsake gift boxes that express what words cannot, bridging the space between two souls.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
            <Link
              href="#builder"
              className="px-8 py-4 rounded-full bg-brand-taupe hover:bg-brand-taupe-light text-brand-alabaster font-medium tracking-wide transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <span>Design a Custom Box</span>
              <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            
            <Link
              href="#shop"
              className="px-8 py-4 rounded-full border border-brand-taupe/30 hover:border-brand-taupe bg-transparent hover:bg-brand-taupe/5 text-brand-taupe font-medium tracking-wide transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5"
            >
              Explore Signature Sets
            </Link>
          </div>

          {/* Micro stats banner */}
          <div className="grid grid-cols-3 gap-8 border-t border-brand-taupe/10 pt-8 mt-4 w-full">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-semibold text-brand-gold">100%</span>
              <span className="text-[10px] uppercase tracking-wider text-brand-taupe-light">Artisanal Sourcing</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-semibold text-brand-gold">50k+</span>
              <span className="text-[10px] uppercase tracking-wider text-brand-taupe-light">Gifts Delivered</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-semibold text-brand-gold">4.9★</span>
              <span className="text-[10px] uppercase tracking-wider text-brand-taupe-light">Customer Rating</span>
            </div>
          </div>
        </div>

        {/* Right Photo Presentation */}
        <div className="lg:col-span-6 relative flex justify-center items-center">
          {/* Subtle design element backing */}
          <div className="absolute -inset-4 border border-brand-gold/20 rounded-2xl rotate-2 pointer-events-none z-0" />
          <div className="absolute -inset-4 border border-brand-taupe/10 rounded-2xl -rotate-1 pointer-events-none z-0" />
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl z-10 w-full aspect-square max-w-[500px]">
            <Image
              src="/images/luxury_gift_set.png"
              alt="Two Souls Co. Premium Signature Gift Box Set"
              fill
              priority
              className="object-cover transition-transform duration-[2000ms] hover:scale-105"
              sizes="(max-w-768px) 100vw, 500px"
            />
          </div>

          {/* Dynamic Floating Glass Badge */}
          <div className="absolute -bottom-6 -left-6 z-20 glass border border-brand-taupe/10 shadow-lg p-4 rounded-xl max-w-[200px] hidden sm:flex items-center gap-3">
            <div className="p-2 rounded-full bg-brand-gold/10 text-brand-gold">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xs font-semibold text-brand-obsidian dark:text-brand-linen">Handcrafted Ribbon</span>
              <span className="text-[9px] text-brand-taupe-light uppercase tracking-wider">With handwritten card</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
