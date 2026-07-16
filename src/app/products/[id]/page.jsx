"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

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

  if (isLoading) {
    return <Loading />;
  }

  if (!product) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <nav className="mb-12">
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
        </nav>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-7">
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
          </div>

          <div className="flex flex-col justify-center lg:col-span-5 lg:py-12">
            <span className="mb-4 block text-[10px] font-medium uppercase tracking-luxury text-muted-foreground">
              {product.category}
            </span>

            <h1 className="font-serif text-3xl text-foreground sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-4 text-sm tracking-wider text-muted-foreground">
              ${product.price.toLocaleString("en-US")}
            </p>

            <div className="my-10 h-px w-full bg-border"></div>

            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <span className="mb-4 block text-[10px] font-medium uppercase tracking-luxury text-foreground">
                  Color:{" "}
                  <span className="text-muted-foreground">{selectedColor}</span>
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
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-10">
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
              </div>
            )}

            <button
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
            </button>

            <div className="prose prose-sm text-muted-foreground">
              <p className="leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
