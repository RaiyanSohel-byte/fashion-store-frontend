"use client";
import React from "react";
import Link from "next/link";
import { IoArrowForwardOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border pt-24 pb-8 selection:bg-accent selection:text-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24 mb-24">
          <div className="lg:col-span-5">
            <span className="mb-4 block text-[10px] font-medium uppercase tracking-luxury text-muted-foreground">
              The Inner Circle
            </span>
            <h3 className="mb-6 font-serif text-3xl text-foreground">
              Subscribe to L'Élégance
            </h3>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground max-w-sm">
              Receive early access to seasonal collections, exclusive bespoke
              events, and editorial campaigns.
            </p>

            <form
              className="relative flex items-center border-b border-border pb-2 transition-colors focus-within:border-foreground"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                required
              />
              <button
                type="submit"
                className="group p-2 text-foreground transition-transform hover:scale-110 focus:outline-none"
                aria-label="Subscribe"
              >
                <IoArrowForwardOutline className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 lg:col-span-7">
            {/* Column 1 */}
            <div className="flex flex-col gap-5">
              <h4 className="text-[10px] font-medium uppercase tracking-luxury text-foreground mb-2">
                Boutique
              </h4>
              <Link
                href="/products"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                New Arrivals
              </Link>
              <Link
                href="/products?category=ready-to-wear"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Ready to Wear
              </Link>
              <Link
                href="/products?category=accessories"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Accessories
              </Link>
              <Link
                href="/collections"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Lookbooks
              </Link>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-5">
              <h4 className="text-[10px] font-medium uppercase tracking-luxury text-foreground mb-2">
                La Maison
              </h4>
              <Link
                href="/heritage"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Our Heritage
              </Link>
              <Link
                href="/ateliers"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                The Ateliers
              </Link>
              <Link
                href="/sustainability"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Sustainability
              </Link>
              <Link
                href="/careers"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Careers
              </Link>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-5">
              <h4 className="text-[10px] font-medium uppercase tracking-luxury text-foreground mb-2">
                Support
              </h4>
              <Link
                href="/contact"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Client Services
              </Link>
              <Link
                href="/shipping"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Shipping & Returns
              </Link>
              <Link
                href="/care"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Garment Care
              </Link>
              <Link
                href="/faq"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                FAQ
              </Link>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-5">
              <h4 className="text-[10px] font-medium uppercase tracking-luxury text-foreground mb-2">
                Social
              </h4>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Pinterest
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Journal
              </a>
            </div>
          </div>
        </div>

        <div className="mb-12 flex justify-center border-b border-border pb-12">
          <h2 className="font-serif text-[12vw] leading-none tracking-widest text-foreground uppercase opacity-90 sm:text-[9vw] lg:text-[7vw]">
            L'Élégance
          </h2>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-6 text-[9px] font-medium uppercase tracking-luxury text-muted-foreground">
            <span>&copy; {new Date().getFullYear()} L'Élégance</span>
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </Link>
          </div>

          <button className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-luxury text-muted-foreground hover:text-foreground transition-colors">
            <span>Location:</span>
            <span className="text-foreground">International (USD)</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
