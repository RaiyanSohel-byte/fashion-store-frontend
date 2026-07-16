"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IoMenuOutline,
  IoCloseOutline,
  IoBagOutline,
  IoMoonOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import { useCart } from "@/contexts/CartContext";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Cart", href: "/cart" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const { cartCount, isInitialized } = useCart();
  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md transition-colors duration-300">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
          {/*  Logo  */}
          <div className="flex-1 lg:flex-none">
            <Link
              href="/"
              className="font-serif text-lg md:text-2xl tracking-[0.25em] uppercase text-foreground transition-opacity hover:opacity-80"
            >
              L'Élégance
            </Link>
          </div>

          {/* Middle */}
          <nav className="hidden lg:flex items-center gap-12">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[11px] font-medium uppercase tracking-luxury transition-colors duration-300 ${
                    isActive ?
                      "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-1 lg:flex-none items-center justify-end gap-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="group text-muted-foreground hover:text-foreground transition-colors duration-300 focus:outline-none"
              aria-label="Toggle Theme"
            >
              {
                mounted ?
                  isDarkMode ?
                    <IoSunnyOutline className="text-[16px] transition-transform group-hover:-translate-y-[1px]" />
                  : <IoMoonOutline className="text-[16px] transition-transform group-hover:-translate-y-[1px]" />

                : <div className="h-[16px] w-[16px]" /> // Placeholder to prevent layout shift during hydration
              }
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="group relative flex items-center gap-2 text-[11px] font-medium uppercase tracking-luxury text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <IoBagOutline className="text-sm transition-transform group-hover:-translate-y-[1px]" />
              <span className="hidden sm:inline">Cart</span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[9px] font-semibold text-background transition-transform group-hover:scale-105">
                {isInitialized ? cartCount : 0}
              </span>
            </Link>

            {/* Mobile Menu Button  */}
            <button
              onClick={toggleMenu}
              className="block lg:hidden text-foreground hover:opacity-75 focus:outline-none transition-opacity"
              aria-label="Toggle Menu"
            >
              <IoMenuOutline className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ?
            "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />

      {/* Mobile Menu Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-4/5 max-w-sm bg-background border-l border-border p-6 shadow-xl transition-transform duration-300 ease-in-out transform lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between pb-6 border-b border-border">
          <span className="font-serif text-sm tracking-[0.2em] uppercase text-foreground">
            Navigation
          </span>
          <button
            onClick={toggleMenu}
            className="text-foreground hover:opacity-75 focus:outline-none"
            aria-label="Close Menu"
          >
            <IoCloseOutline className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8 flex flex-col gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={toggleMenu}
                className={`text-xs font-medium uppercase tracking-luxury transition-colors ${
                  isActive ?
                    "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
