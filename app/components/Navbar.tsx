"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#menu", label: "Menu" },
  { href: "#galeria", label: "Galeria" },
  { href: "#reservas", label: "Reservas" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

const WHATSAPP_NUMBER = "+543743611895";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 36);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              isScrolled
                ? "rounded-full border border-[#fff4e3]/10 bg-[#0b0806]/78 px-4 py-3 shadow-[0_18px_70px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:px-5"
                : "px-0 py-0"
            }`}
          >
            <motion.a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#inicio");
              }}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col leading-none"
            >
              <span className="font-[family-name:var(--font-playfair)] text-2xl font-semibold tracking-wide text-[#fff8ee]">
                Los Troncos
              </span>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.34em] text-[#e78a45]">
                Resto Bar
              </span>
            </motion.a>

            <nav className="hidden items-center gap-7 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="group relative text-[11px] font-medium uppercase tracking-[0.18em] text-[#fff4e3]/72 transition-colors duration-300 hover:text-[#f1a35a]"
                >
                  {link.label}
                  <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#e78a45] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola!%20Quiero%20hacer%20una%20reserva.`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#722f37] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#fff8ee] shadow-[0_16px_36px_rgba(114,47,55,0.28)] transition-colors duration-300 hover:bg-[#e78a45]"
              >
                Reservar
              </a>
            </nav>

            <button
              onClick={() => setIsMobileOpen((open) => !open)}
              className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[#fff4e3]/14 bg-[#120d09]/58 text-[#fff8ee] backdrop-blur-md lg:hidden"
              aria-label="Abrir menu"
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#080604]/96 px-5 pt-28 backdrop-blur-2xl lg:hidden"
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mx-auto flex max-w-sm flex-col gap-3"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.045 }}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="rounded-2xl border border-[#fff4e3]/9 bg-[#fff4e3]/5 px-5 py-4 font-[family-name:var(--font-playfair)] text-2xl text-[#fff8ee] transition-colors duration-300 hover:border-[#e78a45]/45 hover:text-[#f1a35a]"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola!%20Quiero%20hacer%20una%20reserva.`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 rounded-full bg-[#722f37] px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#fff8ee] transition-colors duration-300 hover:bg-[#e78a45]"
              >
                Reservar por WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
