"use client";

import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { cartItems, isCartOpen, closeCart, removeFromCart, clearCart } = useCart();

  if (!isCartOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop overlay */}
        <div
          onClick={closeCart}
          className="absolute inset-0 bg-brand-obsidian/45 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        />

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md transform transition-all duration-500 ease-in-out">
            <div className="flex h-full flex-col bg-brand-alabaster dark:bg-brand-obsidian shadow-2xl border-l border-brand-taupe/12">
              
              {/* Drawer Header */}
              <div className="px-6 py-6 border-b border-brand-taupe/12 flex items-center justify-between">
                <h2 className="font-serif text-xl font-semibold text-brand-obsidian dark:text-brand-linen">
                  Shopping Bag
                </h2>
                <button
                  onClick={closeCart}
                  className="p-1 rounded-full text-brand-taupe hover:text-brand-gold transition-colors"
                  aria-label="Close Shopping Bag"
                >
                  <svg className="w-6 h-6 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                    <path d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-12">
                    <svg className="w-12 h-12 stroke-brand-taupe-light/50 fill-none stroke-1" viewBox="0 0 24 24">
                      <path d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5h.008v.008h-.008V10.5Zm6.75 0h.008v.008h-.008V10.5ZM8.625 10.5" />
                    </svg>
                    <p className="text-sm font-sans font-light text-brand-taupe-light">
                      Your shopping bag is empty.<br />Let&apos;s pack something beautiful!
                    </p>
                  </div>
                ) : (
                  <ul className="divide-y divide-brand-taupe/10">
                    {cartItems.map((item) => (
                      <li key={item.id} className="flex py-6 items-center gap-4 animate-fade-in-up">
                        {item.image && (
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-brand-taupe/10 relative">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        
                        <div className="flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-sm font-medium text-brand-obsidian dark:text-brand-linen">
                              <h3 className="font-serif font-semibold">{item.name}</h3>
                              <p className="ml-4 font-bold text-brand-gold">${item.price * item.quantity}.00</p>
                            </div>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-xs mt-2">
                            <p className="text-brand-taupe-light">Qty {item.quantity}</p>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="font-semibold text-brand-taupe hover:text-red-600 transition-colors uppercase tracking-wider text-[10px]"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Drawer Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-brand-taupe/12 px-6 py-6 flex flex-col gap-6 font-sans">
                  <div className="flex justify-between text-base font-medium text-brand-obsidian dark:text-brand-linen">
                    <span className="font-serif">Subtotal</span>
                    <span className="font-bold text-brand-gold">${subtotal}.00</span>
                  </div>
                  <p className="text-xs text-brand-taupe-light leading-relaxed font-light">
                    Shipping and taxes calculated at checkout. Complimentary greeting card included.
                  </p>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => alert("Proceeding to luxury checkout! Thank you for shopping with Two Souls Co.")}
                      className="w-full flex items-center justify-center rounded-full bg-brand-taupe px-6 py-4 text-sm font-medium text-brand-alabaster shadow-md hover:bg-brand-taupe-light transition-all duration-300 cursor-pointer"
                    >
                      Checkout
                    </button>
                    <button
                      onClick={clearCart}
                      className="w-full text-center text-xs font-semibold text-brand-taupe-light hover:text-brand-taupe uppercase tracking-wider py-1.5 transition-colors cursor-pointer"
                    >
                      Clear All Items
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
