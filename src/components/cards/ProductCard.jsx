import React from "react";
import Link from "next/link";
const ProductCard = ({ product }) => {
  return (
    <Link
      key={product.id}
      href={`/products/${product.id}`}
      className={`group block ${!product.inStock ? "cursor-not-allowed" : ""}`}
    >
      {/* Visual Container */}
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

        {/* Out of Stock Badge */}
        {!product.inStock && (
          <span className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 text-[9px] font-medium uppercase tracking-[0.15em] text-muted-foreground border border-border">
            Sold Out
          </span>
        )}
      </div>

      {/* Typography Block */}
      <div className="flex flex-col items-center text-center">
        <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-foreground group-hover:text-muted-foreground transition-colors duration-300">
          {product.name}
        </h3>
        <span className="text-[11px] tracking-wider text-muted-foreground">
          ${product.price.toLocaleString("en-US")}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
