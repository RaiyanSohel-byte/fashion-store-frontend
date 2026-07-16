"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import productsData from "@/data/products.json";
import ProductCard from "@/components/cards/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductListingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("featured");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(productsData.map((p) => p.category));
    return ["All", ...Array.from(uniqueCategories)];
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...productsData];

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm.trim() !== "") {
      const lowercasedTerm = searchTerm.trim().toLowerCase();

      result = result.filter((product) =>
        product.name.toLowerCase().includes(lowercasedTerm),
      );
    }

    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        result.sort((a, b) => a.id - b.id);
        break;
    }

    return result;
  }, [searchTerm, selectedCategory, sortOption]);

  // --- Animation Variants ---
  const luxuryEase = [0.25, 1, 0.5, 1];

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: luxuryEase },
    },
  };

  const staggerGrid = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const fadeUpItem = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: luxuryEase },
    },
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <div className="mb-16 text-center">
            <span className="mb-4 block text-[10px] font-medium uppercase tracking-luxury text-muted-foreground">
              Automne / Hiver
            </span>
            <h1 className="font-serif text-4xl tracking-[0.05em] text-foreground sm:text-5xl">
              The Collection
            </h1>
          </div>

          <div className="mb-12 flex flex-col justify-between gap-8 border-b border-border pb-8 md:flex-row md:items-end">
            <div className="flex w-full overflow-x-auto pb-4 md:w-auto md:pb-0 scrollbar-hide">
              <div className="flex gap-8">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap text-[10px] font-medium uppercase tracking-luxury transition-colors duration-300 ${
                      selectedCategory === category ?
                        "text-foreground border-b border-foreground pb-1"
                      : "text-muted-foreground hover:text-foreground pb-1 border-b border-transparent"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="relative flex items-center border-b border-border transition-colors focus-within:border-foreground">
                <IoSearchOutline className="text-muted-foreground mr-2 text-sm" />
                <input
                  type="text"
                  placeholder="Search collection..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    console.log(e.target.value);
                  }}
                  className="w-full bg-transparent py-1 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none sm:w-48"
                />
              </div>

              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full appearance-none bg-transparent border-b border-border py-1 pr-6 text-xs text-foreground focus:border-foreground focus:outline-none sm:w-40 cursor-pointer"
                >
                  <option value="featured" className="bg-background px-3">
                    Sort by: Featured
                  </option>
                  <option value="price-asc" className="bg-background px-3">
                    Price: Low to High
                  </option>
                  <option value="price-desc" className="bg-background px-3">
                    Price: High to Low
                  </option>
                  <option value="name-asc" className="bg-background px-3">
                    Alphabetical: A-Z
                  </option>
                </select>
                <div className="pointer-events-none absolute right-0 top-1 text-[8px] text-muted-foreground">
                  ▼
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ?
            <motion.div
              key="loading-state"
              variants={staggerGrid}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <motion.div
                  key={n}
                  variants={fadeUpItem}
                  className="animate-pulse"
                >
                  <div className="mb-6 aspect-[3/4] w-full bg-muted/60" />
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-3 w-3/4 bg-muted/60 rounded" />
                    <div className="h-3 w-1/4 bg-muted/60 rounded" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          : filteredAndSortedProducts.length === 0 ?
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.5, ease: luxuryEase },
              }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <p className="font-serif text-2xl text-foreground mb-4">
                No pieces found.
              </p>
              <p className="text-sm text-muted-foreground max-w-md">
                Your search for "{searchTerm}" did not match any items in our
                current collection. Try adjusting your filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="mt-8 border-b border-foreground pb-1 text-[11px] font-medium uppercase tracking-luxury text-foreground"
              >
                Clear Filters
              </button>
            </motion.div>
          : <motion.div
              key="product-grid"
              variants={staggerGrid}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredAndSortedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={fadeUpItem}
                  layout="position" // This is the magic for smooth sorting/filtering!
                  transition={{ duration: 0.6, ease: luxuryEase }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </main>
  );
}
