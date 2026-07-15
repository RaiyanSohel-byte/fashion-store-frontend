import React from "react";
import Link from "next/link";
import products from "@/data/products.json";

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
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className={`group block ${!product.inStock ? "cursor-not-allowed" : ""}`}
            >
              <div className="relative mb-6 aspect-[3/4] w-full overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`h-full w-full object-cover object-center transition-all duration-[800ms] ease-out ${
                    product.inStock ?
                      "group-hover:scale-105"
                    : "opacity-80 grayscale-[20%]"
                  }`}
                />

                {!product.inStock && (
                  <span className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 text-[9px] font-medium uppercase tracking-[0.15em] text-muted-foreground border border-border">
                    Sold Out
                  </span>
                )}
              </div>

              <div className="flex flex-col items-center text-center">
                <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                  {product.name}
                </h3>
                {/* Formatting the raw number into a styled price (e.g., 1490 -> $1,490) */}
                <span className="text-[11px] tracking-wider text-muted-foreground">
                  ${product.price.toLocaleString("en-US")}
                </span>
              </div>
            </Link>
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
