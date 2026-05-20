"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight, CalendarDays, ChevronDown } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.78], [1, 0]);

  const scrollTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#090706]"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <Image
          src="/imagenes/ambiente-05.jpg"
          alt="Ambiente de Los Troncos Resto Bar"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 z-10 bg-[#080604]/58" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_36%,rgba(212,98,42,0.18),transparent_34%),linear-gradient(180deg,rgba(8,6,4,0.35)_0%,rgba(8,6,4,0.2)_38%,#090706_100%)]" />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(8,6,4,0.78)_0%,rgba(8,6,4,0.25)_52%,rgba(8,6,4,0.72)_100%)]" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-5 pb-20 pt-32 text-center sm:px-6 lg:px-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-5 rounded-full border border-[#d4622a]/30 bg-[#120d09]/45 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.32em] text-[#f1a35a] backdrop-blur-md sm:text-xs"
        >
          Puerto Rico · Misiones · Argentina
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 42 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-playfair)] text-[clamp(3.6rem,12vw,8.4rem)] font-semibold leading-[0.86] text-[#fff8ee] drop-shadow-[0_22px_55px_rgba(0,0,0,0.55)]"
        >
          Los Troncos
          <span className="mt-3 block text-[clamp(2rem,6vw,5.5rem)] italic text-[#e78a45]">
            Resto Bar
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-7 max-w-2xl text-base leading-8 text-[#fff4e3]/78 sm:text-lg md:text-xl"
        >
          Cocina generosa, tragos de autor y noches con ambiente calido en el
          corazon de Puerto Rico, Misiones.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="my-9 h-px w-28 bg-gradient-to-r from-transparent via-[#e78a45] to-transparent"
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <motion.button
            whileHover={{ y: -2, backgroundColor: "#e78a45" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("#reservas")}
            className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#722f37] px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#fff8ee] shadow-[0_20px_55px_rgba(114,47,55,0.34)] transition-colors duration-300 sm:w-auto"
          >
            <CalendarDays size={17} />
            Reservar Mesa
          </motion.button>
          <motion.button
            whileHover={{ y: -2, borderColor: "#e78a45" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("#menu")}
            className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#fff4e3]/30 bg-[#120d09]/35 px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#fff8ee] backdrop-blur-md transition-all duration-300 hover:bg-[#fff4e3]/8 sm:w-auto"
          >
            Ver Menu
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {["Cocina artesanal", "Tragos y bar", "Reservas por WhatsApp"].map(
            (item) => (
              <div
                key={item}
                className="rounded-2xl border border-[#fff4e3]/10 bg-[#0c0907]/38 px-4 py-3 text-center text-xs uppercase tracking-[0.16em] text-[#fff4e3]/62 backdrop-blur-md"
              >
                {item}
              </div>
            )
          )}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2"
        onClick={() => scrollTo("#menu")}
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#fff4e3]/38">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown className="text-[#e78a45]" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
