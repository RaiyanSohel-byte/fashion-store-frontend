"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import productsData from "@/data/products.json";
import Loading from "@/components/shared/Loading";
import NotFound from "@/components/shared/NotFound";
import { useCart } from "@/contexts/CartContext";
import toast from "react-hot-toast";

export default function ProductDetailsPage() {
  const { id } = useParams();

  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const foundProduct = productsData.find((p) => p.id === parseInt(id));

    if (foundProduct) {
      setProduct(foundProduct);

      if (foundProduct.colors && foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0]);
      }
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
    }

    setIsLoading(false);
  }, [id]);

  const handleAddToBag = () => {
    if (!product || !product.inStock) return;

    setIsAdding(true);

    addToCart(product, selectedColor, selectedSize, 1);

    setTimeout(() => {
      setIsAdding(false);
    }, 600);
    toast.success("Item added to cart!");
  };

  const luxuryEase = [0.25, 1, 0.5, 1];

  const pageTransition = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: luxuryEase } },
    exit: { opacity: 0, transition: { duration: 0.4, ease: luxuryEase } },
  };

  const staggerInfo = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: luxuryEase },
    },
  };

  const imageReveal = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: luxuryEase },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ?
        <motion.div
          key="loading"
          variants={pageTransition}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="min-h-screen bg-background"
        >
          <Loading />
        </motion.div>
      : !product ?
        <motion.div
          key="not-found"
          variants={pageTransition}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="min-h-screen bg-background"
        >
          <NotFound />
        </motion.div>
      : <motion.main
          key="product-details"
          variants={pageTransition}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="min-h-screen bg-background"
        >
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
            <motion.nav
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: luxuryEase }}
              className="mb-12"
            >
              <Link
                href="/products"
                className="group flex w-max items-center text-[10px] font-medium uppercase tracking-luxury text-muted-foreground transition-colors hover:text-foreground"
              >
                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="mr-3 transition-transform duration-300 group-hover:-translate-x-1"
                >
                  <path
                    d="M4 1L1 4L4 7M1 4H13"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back to Collection
              </Link>
            </motion.nav>

            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
              <motion.div variants={imageReveal} className="lg:col-span-7">
                <div className="sticky top-24 relative aspect-[3/4] w-full overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`h-full w-full object-cover object-center transition-opacity duration-500 ${
                      !product.inStock ?
                        "opacity-80 grayscale-[20%]"
                      : "opacity-100"
                    }`}
                  />
                </div>
              </motion.div>

              <motion.div
                variants={staggerInfo}
                className="flex flex-col justify-center lg:col-span-5 lg:py-12"
              >
                <motion.span
                  variants={fadeUp}
                  className="mb-4 block text-[10px] font-medium uppercase tracking-luxury text-muted-foreground"
                >
                  {product.category}
                </motion.span>

                <motion.h1
                  variants={fadeUp}
                  className="font-serif text-3xl text-foreground sm:text-4xl"
                >
                  {product.name}
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="mt-4 text-sm tracking-wider text-muted-foreground"
                >
                  ${product.price.toLocaleString("en-US")}
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  className="my-10 h-px w-full bg-border"
                ></motion.div>

                {product.colors && product.colors.length > 0 && (
                  <motion.div variants={fadeUp} className="mb-8">
                    <span className="mb-4 block text-[10px] font-medium uppercase tracking-luxury text-foreground">
                      Color:{" "}
                      <span className="text-muted-foreground">
                        {selectedColor}
                      </span>
                    </span>
                    <div className="flex flex-wrap gap-4">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`text-xs uppercase tracking-wider pb-1 border-b transition-all duration-300 ${
                            selectedColor === color ?
                              "border-foreground text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {product.sizes && product.sizes.length > 0 && (
                  <motion.div variants={fadeUp} className="mb-10">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-[10px] font-medium uppercase tracking-luxury text-foreground">
                        Size:{" "}
                        <span className="text-muted-foreground">
                          {selectedSize}
                        </span>
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`flex h-12 w-12 items-center justify-center border text-[11px] font-medium transition-all duration-300 ${
                            selectedSize === size ?
                              "border-foreground bg-foreground text-background"
                            : "border-border bg-transparent text-foreground hover:border-foreground"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <motion.div variants={fadeUp}>
                  <motion.button
                    whileTap={
                      product.inStock && !isAdding ? { scale: 0.98 } : {}
                    }
                    onClick={handleAddToBag}
                    disabled={!product.inStock || isAdding}
                    className={`mb-12 flex w-full items-center justify-center py-4 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                      product.inStock ?
                        "bg-foreground text-background hover:bg-foreground/90 disabled:opacity-70"
                      : "cursor-not-allowed bg-muted text-muted-foreground"
                    }`}
                  >
                    {!product.inStock ?
                      "Out of Stock"
                    : isAdding ?
                      "Adding..."
                    : "Add to Bag"}
                  </motion.button>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="prose prose-sm text-muted-foreground"
                >
                  <p className="leading-relaxed">{product.description}</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.main>
      }
    </AnimatePresence>
  );
}
