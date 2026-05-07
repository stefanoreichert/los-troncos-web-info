"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80&fit=crop", alt: "Pizza artesanal", category: "Pizzas" },
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80&fit=crop", alt: "Ambiente del restaurante", category: "Ambiente" },
  { src: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80&fit=crop", alt: "Cócteles artesanales", category: "Tragos" },
  { src: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80&fit=crop", alt: "Porción de pizza", category: "Pizzas" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&fit=crop", alt: "Salón elegante", category: "Ambiente" },
  { src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80&fit=crop", alt: "Hamburguesa artesanal", category: "Cocina" },
  { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80&fit=crop", alt: "Pizza margherita", category: "Pizzas" },
  { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80&fit=crop", alt: "Bar nocturno", category: "Ambiente" },
  { src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80&fit=crop", alt: "Cocktail de la casa", category: "Tragos" },
  { src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80&fit=crop", alt: "Pizza cuatro quesos", category: "Pizzas" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&fit=crop", alt: "Mesa servida", category: "Cocina" },
  { src: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=800&q=80&fit=crop", alt: "Pizza en horno", category: "Cocina" },
];

const aspectClasses = ["aspect-square", "aspect-[4/5]", "aspect-[3/4]"];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const prev = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null
    );
  }, []);

  const next = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % galleryImages.length : null
    );
  }, []);

  return (
    <section id="galeria" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-[#d4622a] tracking-[0.42em] uppercase text-sm mb-4"
          >
            Nuestro Espacio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl text-[#f5f0e8] mb-6"
          >
            Galería{" "}
            <span className="italic text-[#d4622a]">Premium</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="w-20 h-[2px] bg-gradient-to-r from-[#722f37] to-[#d4622a] mx-auto"
          />
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-gap:1rem]">
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => openLightbox(index)}
              className="group relative break-inside-avoid mb-4 overflow-hidden rounded-2xl cursor-pointer"
            >
              <div
                className={`relative w-full ${aspectClasses[index % 3]}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
                  <span className="text-[#f5f0e8] text-xs tracking-widest uppercase px-2.5 py-1 bg-[#722f37]/85 rounded">
                    {img.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/96 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-[#f5f0e8]/60 hover:text-[#f5f0e8] transition-colors z-10 p-2"
            >
              <X size={28} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f5f0e8]/60 hover:text-[#f5f0e8] transition-colors z-10 p-2.5 bg-[#1a1a1a]/60 rounded-full"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#f5f0e8]/60 hover:text-[#f5f0e8] transition-colors z-10 p-2.5 bg-[#1a1a1a]/60 rounded-full"
            >
              <ChevronRight size={28} />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-h-[78vh] aspect-[4/3]">
                <Image
                  src={galleryImages[lightboxIndex].src}
                  alt={galleryImages[lightboxIndex].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
              <p className="text-[#f5f0e8]/50 text-sm tracking-wider">
                {lightboxIndex + 1} / {galleryImages.length} —{" "}
                {galleryImages[lightboxIndex].alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
