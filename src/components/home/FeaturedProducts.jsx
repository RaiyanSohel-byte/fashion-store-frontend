import React from "react";
import Link from "next/link";
import products from "@/data/products.json";
import FeaturedCard from "../cards/FeaturedCard";

const FeaturedProducts = () => {
  const featuredList = products?.slice(0, 6) || [];

  return (
    <section className="bg-background py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 text-center md:text-left md:flex md:items-end md:justify-between">
          <div>
            <span className="text-[10px] font-medium uppercase tracking-luxury text-muted-foreground block mb-2">
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl tracking-[0.08em] text-foreground sm:text-4xl">
              Featured Pieces
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden md:inline-block text-[11px] font-medium uppercase tracking-luxury text-muted-foreground hover:text-foreground transition-colors duration-300 border-b border-border pb-1"
          >
            Explore All Collection
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {featuredList.map((product) => (
            <FeaturedCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-16 flex justify-center md:hidden">
          <Link
            href="/products"
            className="border-b border-foreground pb-1 text-[11px] font-medium uppercase tracking-luxury text-foreground"
          >
            Explore All Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
