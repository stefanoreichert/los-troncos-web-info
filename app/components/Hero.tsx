"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative h-screen min-h-[620px] overflow-hidden bg-[#0d0d0d]"
    >
      {/* Background Image with Parallax */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&q=85&fit=crop"
          alt="Pizza artesanal Los Troncos Resto Bar"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/65 via-[#0d0d0d]/35 to-[#0d0d0d] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/55 via-transparent to-[#0d0d0d]/25 z-10" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[#d4622a] tracking-[0.45em] uppercase text-xs sm:text-sm mb-6 font-light"
        >
          Puerto Rico · Misiones · Argentina
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[100px] font-bold text-[#f5f0e8] leading-tight"
        >
          Los Troncos
          <span className="block italic text-[#d4622a] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mt-1">
            Resto Bar
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="text-[#f5f0e8]/75 text-lg sm:text-xl md:text-2xl mt-5 mb-10 max-w-xl tracking-wide font-light"
        >
          Rodizio de Pizzas en Puerto Rico, Misiones
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="w-20 h-px bg-gradient-to-r from-transparent via-[#d4622a] to-transparent mb-10"
        />

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#d4622a" }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              document
                .querySelector("#reservas")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-10 py-4 bg-[#722f37] text-[#f5f0e8] text-sm tracking-[0.22em] uppercase font-medium transition-colors duration-300 rounded"
          >
            Reservar Mesa
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, borderColor: "#d4622a" }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              document
                .querySelector("#menu")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-10 py-4 border border-[#f5f0e8]/35 text-[#f5f0e8] text-sm tracking-[0.22em] uppercase font-medium transition-all duration-300 rounded hover:border-[#d4622a]"
          >
            Ver Menú
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() =>
          document
            .querySelector("#rodizio")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <span className="text-[#f5f0e8]/35 text-xs tracking-[0.35em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown className="text-[#d4622a]" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
