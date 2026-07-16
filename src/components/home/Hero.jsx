"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <section className="relative h-[calc(100vh-15rem)] w-full overflow-hidden">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        className="absolute inset-0 bg-muted"
      >
        <Image
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Autumn Collection Campaign"
          height={540}
          width={540}
          className="h-full w-full object-cover opacity-90"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 flex flex-col items-center justify-end pb-24 text-center sm:pb-32"
      >
        <motion.span
          variants={itemVariants}
          className="mb-4 text-[10px] font-medium uppercase tracking-luxury text-white/80"
        >
          Automne / Hiver 2026
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="mb-8 font-serif text-5xl tracking-widest text-white sm:text-7xl md:text-8xl"
        >
          L'Élégance
        </motion.h1>

        <motion.div variants={itemVariants}>
          <Link
            href="/products"
            className="group flex items-center gap-4 border-b border-white/50 pb-2 text-xs font-medium uppercase tracking-luxury text-white transition-colors hover:border-white"
          >
            Discover the Campaign
            <IoArrowForwardOutline className="transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
