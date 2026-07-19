import Link from "next/link";
import Image from "next/image";

interface OccasionCard {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  link: string;
  image?: string;
  gradient?: string;
}

const occasions: OccasionCard[] = [
  {
    id: "romance",
    title: "Anniversary & Keepsakes",
    subtitle: "Celebrate your shared story with curated romantic luxury",
    tag: "Romantic",
    link: "#shop",
    image: "/images/luxury_gift_set.png",
  },
  {
    id: "self-care",
    title: "Pamper & Rituals",
    subtitle: "Soothing essentials designed for a tranquil mind & body",
    tag: "Wellness",
    link: "#shop",
    image: "/images/wellness_relax_set.png",
  },
  {
    id: "corporate",
    title: "Executive & Milestones",
    subtitle: "Leave an unforgettable impression on partners and clients",
    tag: "Corporate",
    link: "#shop",
    gradient: "from-[#2A2421] to-[#121212]",
  },
  {
    id: "celebration",
    title: "Cozy Celebrations",
    subtitle: "Warm, inviting sets for housewarmings and life milestones",
    tag: "Celebration",
    link: "#shop",
    gradient: "from-[#9c8477] to-[#7c6356]",
  },
];

export default function OccasionsGrid() {
  return (
    <section id="occasions" className="py-24 max-w-7xl mx-auto px-6 md:px-12 scroll-mt-20">
      <div className="flex flex-col items-center text-center gap-4 mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
          Curated Occasions
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-brand-obsidian dark:text-brand-linen">
          Gifts Designed for Life&apos;s Rare Moments
        </h2>
        <div className="w-12 h-0.5 bg-brand-gold mt-2"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {occasions.map((occasion, idx) => (
          <div
            key={occasion.id}
            className="group relative h-[380px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-brand-taupe/10 flex flex-col justify-end p-8 md:p-10 cursor-pointer"
          >
            {/* Background elements */}
            {occasion.image ? (
              <>
                <Image
                  src={occasion.image}
                  alt={occasion.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 z-0"
                  sizes="(max-w-768px) 100vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian/85 via-brand-obsidian/40 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-90" />
              </>
            ) : (
              <>
                <div className={`absolute inset-0 bg-gradient-to-br ${occasion.gradient} z-0`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                {/* Decorative gold lines for gradient-only cards */}
                <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-brand-gold/30 rounded-tr-lg group-hover:w-20 group-hover:h-20 transition-all duration-300 pointer-events-none" />
                <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-brand-gold/30 rounded-bl-lg group-hover:w-20 group-hover:h-20 transition-all duration-300 pointer-events-none" />
              </>
            )}

            {/* Content (Foreground) */}
            <div className="relative z-20 flex flex-col gap-3 text-brand-linen">
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded-md self-start border border-brand-gold/20">
                {occasion.tag}
              </span>
              
              <h3 className="font-serif text-2xl font-semibold leading-tight group-hover:text-brand-gold transition-colors duration-300">
                {occasion.title}
              </h3>
              
              <p className="text-sm text-brand-linen/80 font-sans font-light leading-relaxed max-w-sm">
                {occasion.subtitle}
              </p>

              <Link
                href={occasion.link}
                className="mt-2 text-xs font-semibold uppercase tracking-wider text-brand-gold inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform duration-300"
              >
                <span>Explore Collection</span>
                <svg className="w-3.5 h-3.5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Glowing border outline on hover */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-brand-gold/40 transition-all duration-500 pointer-events-none z-30" />
          </div>
        ))}
      </div>
    </section>
  );
}
