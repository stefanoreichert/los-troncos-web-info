"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  ["#inicio", "Inicio"],
  ["#menu", "Menú"],
  ["#nosotros", "Nosotros"],
  ["#especialidades", "Especialidades"],
  ["#ambiente", "Ambiente"],
  ["#contacto", "Contacto"],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const goTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6"
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between transition-all duration-500 ${
            scrolled
              ? "rounded-2xl border border-white/[0.08] bg-[#090605]/85 px-5 py-3 shadow-[0_8px_48px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
              : "px-0 py-2"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => goTo("#inicio")}
            className="group text-left leading-none"
            aria-label="Ir al inicio"
          >
            <span className="block font-[family-name:var(--font-playfair)] text-[22px] font-semibold tracking-wide text-[#fff8ee] transition-colors duration-300 group-hover:text-[#ffb36b]">
              Los Troncos
            </span>
            <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.44em] text-[#ffb36b]/75">
              Resto Bar
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 xl:flex">
            {links.map(([href, label]) => (
              <button
                key={href}
                onClick={() => goTo(href)}
                className="group relative text-[11px] font-semibold uppercase tracking-[0.16em] text-[#fff4e3]/55 transition-colors duration-300 hover:text-[#fff4e3]"
              >
                {label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-[#f08a3c] to-[#ffb36b] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="hidden items-center xl:flex">
            <button
              onClick={() => goTo("#reservar")}
              className="rounded-full bg-gradient-to-br from-[#f08a3c] to-[#e07030] px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#130a05] shadow-[0_4px_22px_rgba(240,138,60,0.32)] transition-all duration-300 hover:-translate-y-px hover:shadow-[0_8px_32px_rgba(240,138,60,0.48)]"
            >
              Reservar mesa
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-[#fff8ee] backdrop-blur-xl transition-all duration-200 hover:border-[#ffb36b]/40 hover:bg-white/10 xl:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu — full screen */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-[#060402]/97 backdrop-blur-2xl xl:hidden"
          >
            {/* Spacer for fixed header */}
            <div className="h-24 shrink-0" />

            {/* Links */}
            <motion.nav
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-1 flex-col justify-center px-6"
            >
              <div className="mx-auto w-full max-w-sm">
                {links.map(([href, label], i) => (
                  <motion.button
                    key={href}
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.06 + i * 0.055,
                      ease: [0.22, 1, 0.36, 1],
                      duration: 0.4,
                    }}
                    onClick={() => goTo(href)}
                    className="group flex w-full items-center gap-4 border-b border-white/[0.07] py-4 text-left last:border-0"
                  >
                    <span className="h-px w-4 shrink-0 bg-[#ffb36b]/0 transition-all duration-300 group-hover:w-6 group-hover:bg-[#ffb36b]/70" />
                    <span className="font-[family-name:var(--font-playfair)] text-[23px] text-[#fff8ee]/75 transition-colors duration-200 group-hover:text-[#fff8ee]">
                      {label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ delay: 0.38, duration: 0.3 }}
              className="shrink-0 border-t border-white/[0.06] p-6"
            >
              <div className="mx-auto w-full max-w-sm">
                <button
                  onClick={() => goTo("#reservar")}
                  className="w-full rounded-2xl bg-gradient-to-br from-[#f08a3c] to-[#e07030] py-4 text-sm font-bold uppercase tracking-[0.22em] text-[#130a05] shadow-[0_8px_32px_rgba(240,138,60,0.38)] transition-all duration-300 active:scale-[0.98]"
                >
                  Reservar mesa
                </button>
                <p className="mt-3 text-center text-[10px] uppercase tracking-[0.25em] text-[#fff4e3]/25">
                  Puerto Rico · Misiones
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
