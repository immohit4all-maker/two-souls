"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

interface BuilderItem {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface BoxStyle {
  id: string;
  name: string;
  price: number;
  colorClass: string;
  bgHex: string;
  desc: string;
}

const BOX_STYLES: BoxStyle[] = [
  {
    id: "wood",
    name: "Heritage Wooden Keepsake Box",
    price: 25,
    colorClass: "bg-[#8E7664]",
    bgHex: "#8E7664",
    desc: "Handcrafted sustainable pine wood with sliding lid. Perfect for keeping forever.",
  },
  {
    id: "velvet",
    name: "Classic Velvet Charcoal Box",
    price: 20,
    colorClass: "bg-[#3D3A3A]",
    bgHex: "#3D3A3A",
    desc: "Rigid magnetic closure box wrapped in premium charcoal grey velvet finish.",
  },
  {
    id: "matte",
    name: "Champagne Linen Gift Box",
    price: 15,
    colorClass: "bg-[#E3DAC9]",
    bgHex: "#E3DAC9",
    desc: "Signature heavy-duty cardstock box wrapped in textured champagne linen paper.",
  },
];

const ITEMS: BuilderItem[] = [
  { id: "candle", name: "Amber Lavender Soy Candle", price: 18, category: "home" },
  { id: "eyemask", name: "Champagne Silk Sleep Mask", price: 22, category: "wellness" },
  { id: "chocolate", name: "Artisanal Velvet Dark Chocolate", price: 10, category: "gourmet" },
  { id: "spoon", name: "Gilded Coffee Spoon & Blend", price: 26, category: "gourmet" },
  { id: "journal", name: "Gold-embossed Leather Journal", price: 24, category: "home" },
  { id: "bathsalts", name: "French Lavender Bath Salts", price: 16, category: "wellness" },
];

const RIBBONS = [
  { id: "cream", name: "Champagne Silk Ribbon", hex: "#f4f0ec" },
  { id: "emerald", name: "Forest Velvet Ribbon", hex: "#0f5132" },
  { id: "obsidian", name: "Midnight Satin Ribbon", hex: "#121212" },
];

export default function GiftBuilder() {
  const { addToCart } = useCart();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedBox, setSelectedBox] = useState<BoxStyle>(BOX_STYLES[0]);
  const [selectedItems, setSelectedItems] = useState<BuilderItem[]>([]);
  const [selectedRibbon, setSelectedRibbon] = useState(RIBBONS[0]);
  const [cardMessage, setCardMessage] = useState<string>("");
  const [isAdded, setIsAdded] = useState(false);

  const toggleItem = (item: BuilderItem) => {
    const exists = selectedItems.find((i) => i.id === item.id);
    if (exists) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      if (selectedItems.length >= 5) return; // cap at 5 items
      setSelectedItems([...selectedItems, item]);
    }
  };

  const totalPrice = selectedBox.price + selectedItems.reduce((acc, curr) => acc + curr.price, 0);

  const handleAddToBag = () => {
    if (selectedItems.length === 0) return;
    
    const boxName = `Bespoke Box (${selectedBox.name.split(" ")[0]} + ${selectedItems.length} items)`;
    addToCart({
      name: boxName,
      price: totalPrice,
      image: "/images/luxury_gift_set.png",
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section id="builder" className="py-24 bg-brand-linen/30 dark:bg-brand-obsidian/20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
            Bespoke Gifting Studio
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-brand-obsidian dark:text-brand-linen">
            Design Your Own Keepsake Gift Box
          </h2>
          <p className="max-w-md text-sm text-brand-taupe-light dark:text-brand-linen/60 font-light">
            Select an elegant box, fill it with handpicked artisanal treats, choose a custom ribbon, and write a note.
          </p>
          <div className="w-12 h-0.5 bg-brand-gold"></div>
        </div>

        {/* Builder Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Customization Panel */}
          <div className="lg:col-span-7 bg-brand-alabaster dark:bg-brand-obsidian rounded-2xl p-6 md:p-8 border border-brand-taupe/10 shadow-sm">
            
            {/* Step navigation tabs */}
            <div className="flex items-center justify-between border-b border-brand-taupe/10 pb-6 mb-8 gap-2">
              {[
                { step: 1, name: "1. Select Box" },
                { step: 2, name: "2. Add Items" },
                { step: 3, name: "3. Card & Wrap" },
              ].map((s) => (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(s.step)}
                  className={`flex-1 text-center py-2.5 rounded-lg text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
                    activeStep === s.step
                      ? "bg-brand-taupe text-brand-alabaster shadow-sm"
                      : "text-brand-taupe-light hover:bg-brand-taupe/5"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>

            {/* STEP 1: Select Box Style */}
            {activeStep === 1 && (
              <div className="flex flex-col gap-6 animate-fade-in-up">
                <h3 className="font-serif text-xl font-medium text-brand-obsidian dark:text-brand-linen">
                  Choose the Foundation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {BOX_STYLES.map((box) => (
                    <button
                      key={box.id}
                      onClick={() => setSelectedBox(box)}
                      className={`flex flex-col gap-3 p-4 rounded-xl border text-left transition-all duration-300 ${
                        selectedBox.id === box.id
                          ? "border-brand-gold bg-brand-gold/5 shadow-md"
                          : "border-brand-taupe/10 hover:border-brand-taupe-light hover:bg-brand-taupe/5"
                      }`}
                    >
                      {/* Box Visual Circle representation */}
                      <div className={`w-10 h-10 rounded-full ${box.colorClass} border border-brand-obsidian/10 shadow-inner`} />
                      <div className="flex flex-col">
                        <span className="font-serif text-sm font-semibold text-brand-obsidian dark:text-brand-linen leading-tight">
                          {box.name.split(" ")[0]}
                        </span>
                        <span className="text-xs text-brand-taupe font-sans mt-0.5 font-medium">
                          ${box.price}.00
                        </span>
                      </div>
                      <p className="text-[11px] text-brand-taupe-light leading-relaxed">
                        {box.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Add Items */}
            {activeStep === 2 && (
              <div className="flex flex-col gap-6 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-medium text-brand-obsidian dark:text-brand-linen">
                    Select Up to 5 Items
                  </h3>
                  <span className="text-xs font-semibold text-brand-gold uppercase tracking-wider">
                    {selectedItems.length}/5 selected
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ITEMS.map((item) => {
                    const isSelected = selectedItems.some((i) => i.id === item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleItem(item)}
                        className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 ${
                          isSelected
                            ? "border-brand-gold bg-brand-gold/5 shadow-sm"
                            : "border-brand-taupe/10 hover:border-brand-taupe-light hover:bg-brand-taupe/5"
                        }`}
                      >
                        <div className="flex flex-col gap-1">
                          <span className="font-serif text-sm font-semibold text-brand-obsidian dark:text-brand-linen leading-tight">
                            {item.name}
                          </span>
                          <span className="text-xs text-brand-taupe uppercase tracking-wider text-[10px]">
                            {item.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold text-brand-taupe-light">
                            ${item.price}.00
                          </span>
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                              isSelected
                                ? "bg-brand-gold border-brand-gold text-white"
                                : "border-brand-taupe/30"
                            }`}
                          >
                            {isSelected && (
                              <svg className="w-3.5 h-3.5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                                <path d="m4.5 12.75 6 6 9-13.5" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: Card Message & Ribbon Wrap */}
            {activeStep === 3 && (
              <div className="flex flex-col gap-6 animate-fade-in-up">
                <h3 className="font-serif text-xl font-medium text-brand-obsidian dark:text-brand-linen">
                  Ribbon & Personalized Note
                </h3>
                
                {/* Ribbon Choice */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-taupe">
                    Choose Ribbon Tie (Complimentary)
                  </span>
                  <div className="flex gap-4">
                    {RIBBONS.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedRibbon(r)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-medium tracking-wide transition-all duration-300 ${
                          selectedRibbon.id === r.id
                            ? "border-brand-gold bg-brand-gold/5 text-brand-obsidian dark:text-brand-linen"
                            : "border-brand-taupe/10 text-brand-taupe-light hover:bg-brand-taupe/5"
                        }`}
                      >
                        <div
                          className="w-3 h-3 rounded-full border border-brand-obsidian/10"
                          style={{ backgroundColor: r.hex }}
                        />
                        {r.name.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Card Message Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="gift-note" className="text-xs font-semibold uppercase tracking-wider text-brand-taupe">
                    Handwritten Gift Note
                  </label>
                  <textarea
                    id="gift-note"
                    value={cardMessage}
                    onChange={(e) => setCardMessage(e.target.value)}
                    placeholder="Write a message to your recipient. We will hand-write it on a heavy-embossed cards..."
                    rows={4}
                    className="w-full p-4 rounded-xl border border-brand-taupe/20 bg-brand-linen/10 dark:bg-brand-obsidian/50 focus:outline-none focus:border-brand-gold text-sm transition-all duration-300"
                  />
                </div>
              </div>
            )}

            {/* Navigation buttons inside panel */}
            <div className="flex justify-between items-center border-t border-brand-taupe/10 pt-6 mt-8">
              <button
                disabled={activeStep === 1}
                onClick={() => setActiveStep(activeStep - 1)}
                className="text-xs font-semibold uppercase tracking-widest text-brand-taupe hover:text-brand-gold disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                ← Back
              </button>
              {activeStep < 3 ? (
                <button
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="px-6 py-2.5 rounded-full bg-brand-taupe text-brand-alabaster text-xs font-semibold uppercase tracking-widest hover:bg-brand-taupe-light transition-colors"
                >
                  Continue →
                </button>
              ) : (
                <button
                  disabled={selectedItems.length === 0}
                  onClick={handleAddToBag}
                  className={`px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                    selectedItems.length === 0
                      ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                      : isAdded
                      ? "bg-green-600 text-white"
                      : "bg-brand-gold text-white hover:bg-brand-gold/90 shadow-md hover:shadow-lg"
                  }`}
                >
                  {isAdded ? "Added to Cart!" : "Add Custom Box to Cart"}
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Live Sticky Box Receipt Preview */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col gap-6">
            <div className="glass border border-brand-taupe/10 shadow-xl rounded-2xl p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden">
              {/* Visual representation card */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />
              
              <h3 className="font-serif text-lg font-semibold text-brand-obsidian dark:text-brand-linen border-b border-brand-taupe/10 pb-3">
                Your Custom Keepsake Box
              </h3>

              {/* Box representation summary */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${selectedBox.colorClass} border border-brand-obsidian/10`} />
                    <div className="flex flex-col">
                      <span className="font-serif text-sm font-semibold text-brand-obsidian dark:text-brand-linen">
                        {selectedBox.name}
                      </span>
                      <span className="text-[10px] text-brand-taupe-light uppercase tracking-wider">
                        Box Foundation
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-brand-taupe">${selectedBox.price}.00</span>
                </div>

                {/* Items Listing */}
                <div className="flex flex-col gap-2.5 border-t border-b border-brand-taupe/5 py-4 my-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-taupe-light">
                    Keepsakes Packed Inside ({selectedItems.length}/5)
                  </span>
                  
                  {selectedItems.length === 0 ? (
                    <p className="text-xs text-brand-taupe/50 italic py-2">
                      Please go to "Step 2: Add Items" to fill your box...
                    </p>
                  ) : (
                    <ul className="flex flex-col gap-2">
                      {selectedItems.map((item) => (
                        <li key={item.id} className="flex justify-between text-xs items-center animate-fade-in-up">
                          <span className="text-brand-taupe dark:text-brand-linen/80 font-light inline-flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                            {item.name}
                          </span>
                          <span className="font-semibold text-brand-taupe-light">${item.price}.00</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Ribbon Tie Summary */}
                <div className="flex justify-between items-center text-xs">
                  <span className="text-brand-taupe dark:text-brand-linen/80 font-light inline-flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border border-brand-obsidian/10" style={{ backgroundColor: selectedRibbon.hex }} />
                    {selectedRibbon.name} tie
                  </span>
                  <span className="text-brand-gold uppercase tracking-wider text-[10px] font-bold">Free</span>
                </div>

                {/* Card Message Status */}
                {cardMessage.trim() && (
                  <div className="mt-2 text-xs border border-brand-gold/20 bg-brand-gold/5 p-3 rounded-lg leading-relaxed text-brand-taupe italic">
                    "{cardMessage}"
                  </div>
                )}
              </div>

              {/* Total Calculation */}
              <div className="border-t border-brand-taupe/15 pt-5 flex justify-between items-baseline mt-4">
                <span className="font-serif text-base font-semibold text-brand-obsidian dark:text-brand-linen">
                  Estimated Total
                </span>
                <span className="font-serif text-2xl font-bold text-brand-gold">
                  ${totalPrice}.00
                </span>
              </div>

              {/* Warnings / Instructions */}
              {selectedItems.length === 0 && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs rounded-lg text-center leading-relaxed">
                  ⚠️ Box builder is empty. Add at least one keepsake item in step 2.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
