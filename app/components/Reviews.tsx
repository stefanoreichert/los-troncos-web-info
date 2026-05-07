"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "Martina García",
    stars: 5,
    text: "El rodizio de pizzas es increíble. Las pizzas llegaban sin parar y todas estaban riquísimas. El ambiente es muy acogedor y el servicio excelente. ¡Ya tenemos reserva para el mes que viene!",
    location: "Puerto Rico, Misiones",
  },
  {
    name: "Lucas Rodríguez",
    stars: 5,
    text: "Fuimos a celebrar nuestro aniversario y fue una noche perfecta. La atención personalizada, las pizzas artesanales y los tragos de la barra... todo de primera. Un lujo al alcance de todos.",
    location: "Posadas, Misiones",
  },
  {
    name: "Sofía Herrera",
    stars: 5,
    text: "El mejor lugar para salir a comer en Puerto Rico. Las pizzas del rodizio son de otro nivel, especialmente la de cuatro quesos. El ambiente nocturno es precioso, luces tenues y música perfecta.",
    location: "Puerto Rico, Misiones",
  },
  {
    name: "Diego Fernández",
    stars: 5,
    text: "Vine con todo el grupo del trabajo para una despedida. Los mozos impecables, las pizzas ilimitadas y los tragos de calidad. El local tiene un diseño muy lindo y moderno. ¡Recomendadísimo!",
    location: "Puerto Esperanza, Misiones",
  },
  {
    name: "Valentina López",
    stars: 5,
    text: "Primera vez que probé el concepto de rodizio de pizzas y quedé enamorada. Se nota que los ingredientes son de calidad, la masa es perfecta y la variedad de sabores es enorme. Ambiente increíble.",
    location: "Eldorado, Misiones",
  },
  {
    name: "Facundo Torres",
    stars: 5,
    text: "La combinación de pizza + tragos + ambiente nocturno es imbatible en Los Troncos. Estuve tres veces este mes y nunca defrauda. Personal amable y muy profesional. 100% recomendado.",
    location: "Puerto Rico, Misiones",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 justify-center">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-[#d4622a] text-[#d4622a]" />
      ))}
    </div>
  );
}

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % reviews.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent((c) => (c + 1) % reviews.length);

  return (
    <section
      id="nosotros"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#722f37]/4 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <div ref={titleRef} className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-[#d4622a] tracking-[0.42em] uppercase text-sm mb-4"
          >
            Lo que dicen nuestros clientes
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl text-[#f5f0e8] mb-6"
          >
            Opiniones{" "}
            <span className="italic text-[#d4622a]">Reales</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="w-20 h-[2px] bg-gradient-to-r from-[#722f37] to-[#d4622a] mx-auto"
          />
        </div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-[#1a1a1a] rounded-2xl p-8 sm:p-12 text-center border border-[#2c1f0e]/40"
            >
              {/* Quote mark */}
              <div className="font-[family-name:var(--font-playfair)] text-[#722f37] text-7xl leading-none mb-4 select-none">
                "
              </div>
              <p className="text-[#f5f0e8]/80 text-lg sm:text-xl leading-relaxed italic mb-8 max-w-2xl mx-auto">
                {reviews[current].text}
              </p>
              <Stars count={reviews[current].stars} />
              <div className="mt-4">
                <p className="font-[family-name:var(--font-playfair)] text-[#f5f0e8] text-lg mt-3">
                  {reviews[current].name}
                </p>
                <p className="text-[#f5f0e8]/40 text-sm mt-1">
                  {reviews[current].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center items-center gap-5 mt-8">
            <button
              onClick={prev}
              className="text-[#f5f0e8]/40 hover:text-[#d4622a] transition-colors p-2"
              aria-label="Opinión anterior"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? "w-7 h-2 bg-[#d4622a]"
                      : "w-2 h-2 bg-[#f5f0e8]/20 hover:bg-[#f5f0e8]/40"
                  }`}
                  aria-label={`Ver opinión ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="text-[#f5f0e8]/40 hover:text-[#d4622a] transition-colors p-2"
              aria-label="Opinión siguiente"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
