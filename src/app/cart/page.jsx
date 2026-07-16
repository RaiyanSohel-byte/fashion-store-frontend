"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    isInitialized,
  } = useCart();

  const luxuryEase = [0.25, 1, 0.5, 1];

  const pageTransition = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: luxuryEase } },
    exit: { opacity: 0, transition: { duration: 0.4, ease: luxuryEase } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const fadeUpItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: luxuryEase },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {!isInitialized ?
        <motion.div
          key="loading"
          variants={pageTransition}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex min-h-screen items-center justify-center bg-background pt-24"
        >
          <div className="h-4 w-24 animate-pulse rounded bg-muted"></div>
        </motion.div>
      : cartItems.length === 0 ?
        <motion.main
          key="empty"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center"
        >
          <motion.span
            variants={fadeUpItem}
            className="mb-4 block text-[10px] font-medium uppercase tracking-luxury text-muted-foreground"
          >
            Your Bag
          </motion.span>
          <motion.h1
            variants={fadeUpItem}
            className="mb-8 font-serif text-3xl text-foreground sm:text-4xl"
          >
            Your bag is currently empty
          </motion.h1>
          <motion.div variants={fadeUpItem}>
            <Link
              href="/products"
              className="border-b border-foreground pb-1 text-[11px] font-medium uppercase tracking-luxury text-foreground transition-colors hover:border-muted-foreground hover:text-muted-foreground"
            >
              Discover the Collection
            </Link>
          </motion.div>
        </motion.main>
      : <motion.main
          key="populated"
          variants={pageTransition}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="min-h-screen bg-background pt-24 pb-32"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: luxuryEase }}
              className="mb-16"
            >
              <h1 className="font-serif text-3xl text-foreground sm:text-4xl">
                Shopping Bag
              </h1>
              <p className="mt-2 text-[11px] uppercase tracking-luxury text-muted-foreground">
                {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
              <div className="lg:col-span-7 xl:col-span-8">
                <motion.div
                  className="border-t border-border"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <AnimatePresence initial={false}>
                    {cartItems.map((item) => (
                      <motion.div
                        key={`${item.id}-${item.color}-${item.size}`}
                        layout
                        variants={fadeUpItem}
                        exit={{
                          opacity: 0,
                          x: -30,
                          transition: { duration: 0.4 },
                        }}
                        className="flex flex-col gap-6 border-b border-border py-8 sm:flex-row"
                      >
                        <Link
                          href={`/products/${item.id}`}
                          className="block h-auto w-full shrink-0 sm:w-32"
                        >
                          <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                            />
                          </div>
                        </Link>

                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <Link href={`/products/${item.id}`}>
                                <h3 className="text-xs font-medium uppercase tracking-wide text-foreground transition-colors hover:text-muted-foreground">
                                  {item.name}
                                </h3>
                              </Link>

                              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] uppercase tracking-luxury text-muted-foreground">
                                {item.color && (
                                  <span>
                                    Color:{" "}
                                    <span className="text-foreground">
                                      {item.color}
                                    </span>
                                  </span>
                                )}
                                {item.size && (
                                  <span>
                                    Size:{" "}
                                    <span className="text-foreground">
                                      {item.size}
                                    </span>
                                  </span>
                                )}
                              </div>
                            </div>

                            <span className="text-xs tracking-wider text-foreground">
                              $
                              {(item.price * item.quantity).toLocaleString(
                                "en-US",
                              )}
                            </span>
                          </div>

                          <div className="mt-6 flex items-end justify-between sm:mt-0">
                            <div className="flex items-center border border-border">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.color,
                                    item.size,
                                    item.quantity - 1,
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                                disabled={item.quantity <= 1}
                              >
                                <span className="text-lg font-light leading-none">
                                  -
                                </span>
                              </button>

                              <span className="flex h-8 w-8 items-center justify-center text-[11px] font-medium">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.color,
                                    item.size,
                                    item.quantity + 1,
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                              >
                                <span className="text-lg font-light leading-none">
                                  +
                                </span>
                              </button>
                            </div>

                            <button
                              onClick={() =>
                                removeFromCart(item.id, item.color, item.size)
                              }
                              className="text-[10px] font-medium uppercase tracking-luxury text-muted-foreground underline decoration-transparent underline-offset-4 transition-all duration-300 hover:text-foreground hover:decoration-foreground"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: luxuryEase }}
                className="lg:col-span-5 xl:col-span-4"
              >
                <div className="sticky top-24 bg-muted/20 p-8">
                  <h2 className="mb-6 font-serif text-xl text-foreground">
                    Order Summary
                  </h2>

                  <div className="space-y-4 border-b border-border pb-6 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-foreground">
                        ${cartTotal.toLocaleString("en-US")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-foreground">Complimentary</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6 text-sm font-medium uppercase tracking-wide text-foreground">
                    <span>Total</span>

                    <motion.span layout>
                      ${cartTotal.toLocaleString("en-US")}
                    </motion.span>
                  </div>

                  <button className="mt-8 flex w-full items-center justify-center bg-foreground px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-background transition-colors hover:bg-foreground/90">
                    Proceed to Checkout
                  </button>

                  <div className="mt-6 text-center text-[10px] uppercase tracking-luxury text-muted-foreground">
                    <p>Complimentary returns within 30 days.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.main>
      }
    </AnimatePresence>
  );
}
