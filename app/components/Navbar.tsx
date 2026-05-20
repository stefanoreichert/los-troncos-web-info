"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  ["#inicio", "Inicio"],
  ["#menu", "Menu"],
  ["#nosotros", "Nosotros"],
  ["#especialidades", "Nuestras Especialidades"],
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
              ? "rounded-full border border-white/10 bg-[#090605]/72 px-4 py-3 shadow-[0_24px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:px-5"
              : "px-0 py-2"
          }`}
        >
          <button
            onClick={() => goTo("#inicio")}
            className="text-left leading-none"
            aria-label="Ir al inicio"
          >
            <span className="block font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#fff8ee]">
              Los Troncos
            </span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.34em] text-[#ffb36b]">
              Resto Bar
            </span>
          </button>

          <nav className="hidden items-center gap-6 xl:flex">
            {links.map(([href, label]) => (
              <button
                key={href}
                onClick={() => goTo(href)}
                className="group relative text-[10px] font-semibold uppercase tracking-[0.18em] text-[#fff4e3]/68 transition-colors duration-300 hover:text-[#ffb36b]"
              >
                {label}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#ffb36b] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <button
              onClick={() => goTo("#reservar")}
              className="rounded-full bg-[#f08a3c] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#130a05] shadow-[0_16px_42px_rgba(240,138,60,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffb36b]"
            >
              Reservar
            </button>
          </nav>

          <button
            onClick={() => setOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#fff8ee] backdrop-blur-xl xl:hidden"
            aria-label="Abrir menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#050403]/96 px-5 pt-28 backdrop-blur-2xl xl:hidden"
          >
            <motion.div
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 28, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto flex max-w-md flex-col gap-3"
            >
              {links.map(([href, label], index) => (
                <motion.button
                  key={href}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => goTo(href)}
                  className="rounded-[26px] border border-white/10 bg-white/[0.04] px-5 py-4 text-left font-[family-name:var(--font-playfair)] text-2xl text-[#fff8ee] transition-colors duration-300 hover:border-[#ffb36b]/45 hover:text-[#ffb36b]"
                >
                  {label}
                </motion.button>
              ))}
              <button
                onClick={() => goTo("#reservar")}
                className="mt-3 min-h-14 rounded-full bg-[#f08a3c] px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-[#130a05]"
              >
                Reservar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
