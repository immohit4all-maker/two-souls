"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";

interface Question {
  id: number;
  title: string;
  options: { label: string; value: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "Who are you celebrating today?",
    options: [
      { label: "My Partner / Significant Other", value: "partner" },
      { label: "A Dear Friend or Family Member", value: "friend" },
      { label: "A Valued Client or Colleague", value: "corporate" },
      { label: "Myself (Much needed self-care)", value: "self" },
    ],
  },
  {
    id: 2,
    title: "What style or vibe describes them best?",
    options: [
      { label: "Calming, relaxed, and tranquil", value: "tranquil" },
      { label: "Thoughtful, creative, and academic", value: "academic" },
      { label: "Indulgent, gourmet, and luxury-loving", value: "gourmet" },
    ],
  },
  {
    id: 3,
    title: "What is your budget for this gesture?",
    options: [
      { label: "Under $80", value: "under-80" },
      { label: "$80 to $100", value: "80-100" },
      { label: "Over $100 (Bespoke Luxury)", value: "over-100" },
    ],
  },
];

const RECOMMENDATIONS = {
  tranquil: {
    name: "The Lavender Dream Ritual",
    price: 78,
    image: "/images/wellness_relax_set.png",
    desc: "A matching tranquil selection filled with high-end lavender chamomile loose tea, custom soy candle, and a pure silk sleeping mask.",
  },
  academic: {
    name: "The Notes & Reflections Set",
    price: 95,
    image: "/images/luxury_gift_set.png",
    desc: "Perfect for the thoughtful writer. Contains an elegant gold pen, dark velvet journal, soy candle, and glass match bottle.",
  },
  gourmet: {
    name: "The Golden Solace Box",
    price: 85,
    image: "/images/luxury_gift_set.png",
    desc: "A rich culinary and visual pampering box with gilded coffee spoon, organic chocolates, and matches.",
  },
};

export default function GiftFinder() {
  const { addToCart } = useCart();
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleSelectOption = (val: string) => {
    const updated = { ...answers, [QUESTIONS[currentQuestionIdx].id]: val };
    setAnswers(updated);

    if (currentQuestionIdx < QUESTIONS.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentQuestionIdx(0);
    setShowResult(false);
    setIsAdded(false);
  };

  // Determine recommendation based on vibe (Q2)
  const vibeAnswer = answers[2] || "tranquil";
  const recommendation = RECOMMENDATIONS[vibeAnswer as keyof typeof RECOMMENDATIONS] || RECOMMENDATIONS.tranquil;

  const handleAddRecommendation = () => {
    addToCart({
      name: recommendation.name,
      price: recommendation.price,
      image: recommendation.image,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section id="quiz" className="py-24 max-w-5xl mx-auto px-6 md:px-12 scroll-mt-20">
      <div className="glass border border-brand-taupe/10 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden flex flex-col items-center">
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-brand-gold/30 rounded-tl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-brand-gold/30 rounded-br-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2 mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
            Personalization Assistant
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-brand-obsidian dark:text-brand-linen">
            Find the Perfect Gift in 3 Steps
          </h2>
          <div className="w-12 h-0.5 bg-brand-gold mt-2"></div>
        </div>

        {/* QUIZ STATE */}
        {!showResult ? (
          <div className="w-full max-w-lg flex flex-col gap-6 text-center animate-fade-in-up">
            {/* Step Counter Indicator */}
            <div className="flex items-center justify-center gap-3">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentQuestionIdx
                      ? "w-8 bg-brand-gold"
                      : i < currentQuestionIdx
                      ? "w-4 bg-brand-taupe"
                      : "w-2 bg-brand-taupe/20"
                  }`}
                />
              ))}
            </div>

            {/* Question Title */}
            <h3 className="font-serif text-xl font-medium text-brand-obsidian dark:text-brand-linen mt-4">
              {QUESTIONS[currentQuestionIdx].title}
            </h3>

            {/* Options list */}
            <div className="flex flex-col gap-3 mt-4">
              {QUESTIONS[currentQuestionIdx].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelectOption(opt.value)}
                  className="w-full py-4 px-6 rounded-xl border border-brand-taupe/15 bg-brand-alabaster/60 hover:bg-brand-taupe/5 dark:bg-brand-obsidian/30 dark:hover:bg-brand-obsidian/60 text-brand-taupe dark:text-brand-linen font-sans font-light hover:border-brand-gold transition-all duration-300 text-left flex justify-between items-center group"
                >
                  <span className="text-sm md:text-base font-medium">{opt.label}</span>
                  <span className="w-6 h-6 rounded-full border border-brand-taupe/20 flex items-center justify-center text-xs group-hover:border-brand-gold group-hover:text-brand-gold transition-colors">
                    →
                  </span>
                </button>
              ))}
            </div>

            {/* Back Button */}
            {currentQuestionIdx > 0 && (
              <button
                onClick={() => setCurrentQuestionIdx(currentQuestionIdx - 1)}
                className="text-xs font-semibold uppercase tracking-widest text-brand-taupe-light hover:text-brand-taupe mt-4 self-center"
              >
                ← Back to previous question
              </button>
            )}
          </div>
        ) : (
          /* RESULT STATE */
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-fade-in-up">
            {/* Left Result copy */}
            <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left gap-4">
              <span className="text-[10px] uppercase font-bold tracking-widest bg-brand-gold/15 text-brand-gold px-3 py-1 rounded-md">
                Our Top Recommendation
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-medium text-brand-obsidian dark:text-brand-linen leading-tight">
                {recommendation.name}
              </h3>
              <p className="text-sm text-brand-taupe-light dark:text-brand-linen/70 leading-relaxed font-light font-sans max-w-md">
                {recommendation.desc}
              </p>
              
              <div className="flex items-center gap-6 mt-4">
                <span className="font-serif text-2xl font-bold text-brand-gold">
                  ${recommendation.price}.00
                </span>
                
                <button
                  onClick={handleAddRecommendation}
                  className={`px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg ${
                    isAdded ? "bg-green-600 text-white" : "bg-brand-taupe text-brand-alabaster hover:bg-brand-taupe-light"
                  }`}
                >
                  {isAdded ? "Added to Cart!" : "Add to Bag"}
                </button>
              </div>

              <button
                onClick={resetQuiz}
                className="text-xs font-semibold uppercase tracking-widest text-brand-taupe-light hover:text-brand-taupe mt-4 border-b border-brand-taupe-light/30 pb-0.5"
              >
                Retake Gifting Quiz
              </button>
            </div>

            {/* Right Result visual */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full aspect-square max-w-[280px] rounded-2xl overflow-hidden shadow-lg border border-brand-taupe/10">
                <Image
                  src={recommendation.image}
                  alt={recommendation.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
