"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const pizzas = [
  {
    name: "Mozzarella Clásica",
    description: "Tomate San Marzano, mozzarella fior di latte, albahaca fresca y aceite de oliva extra virgen",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80&fit=crop",
    badge: "Clásica",
  },
  {
    name: "Cuatro Quesos",
    description: "Mozzarella, roquefort cremoso, parmesano reggiano y brie con nueces caramelizadas",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80&fit=crop",
    badge: "Premium",
  },
  {
    name: "Jamón y Rúcula",
    description: "Jamón serrano, rúcula fresca, tomates cherry confitados y lascas de parmesano",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80&fit=crop",
    badge: "Favorita",
  },
  {
    name: "Pepperoni Americano",
    description: "Pepperoni artesanal en abundancia, mozzarella extra, tomate y orégano de la casa",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&q=80&fit=crop",
    badge: "Top",
  },
  {
    name: "Pollo y Morrones",
    description: "Pollo grillado marinado, morrones asados al horno, cebolla caramelizada y crema de ajo",
    image: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=600&q=80&fit=crop",
    badge: "Especial",
  },
  {
    name: "Napolitana Premium",
    description: "Tomate fresco, mozzarella búfala, aceitunas negras, alcaparras y albahaca fresca",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80&fit=crop",
    badge: "Gourmet",
  },
];

function PizzaCard({
  pizza,
  index,
}: {
  pizza: (typeof pizzas)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 45 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.015 }}
      className="group relative bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#2c1f0e]/50 hover:border-[#722f37]/50 transition-all duration-500 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={pizza.image}
          alt={pizza.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
        <span className="absolute top-3 right-3 px-3 py-1 bg-[#722f37] text-[#f5f0e8] text-xs tracking-widest uppercase rounded-full">
          {pizza.badge}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-[family-name:var(--font-playfair)] text-xl text-[#f5f0e8] mb-2 group-hover:text-[#d4622a] transition-colors duration-300">
          {pizza.name}
        </h3>
        <p className="text-[#f5f0e8]/55 text-sm leading-relaxed">
          {pizza.description}
        </p>
      </div>

      {/* Hover glow ring */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl shadow-[inset_0_0_40px_rgba(114,47,55,0.12)]" />
    </motion.div>
  );
}

export default function Rodizio() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section
      id="rodizio"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d] relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#722f37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#d4622a]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#d4622a] tracking-[0.42em] uppercase text-sm mb-4"
          >
            Pizzas Ilimitadas
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl text-[#f5f0e8] mb-6"
          >
            La Experiencia{" "}
            <span className="italic text-[#d4622a]">Rodizio</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-[2px] bg-gradient-to-r from-[#722f37] to-[#d4622a] mx-auto mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="text-[#f5f0e8]/65 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Nuestros mozos recorren el salón sin parar, ofreciendo una variedad
            infinita de pizzas artesanales recién horneadas. Una experiencia
            gastronómica única en Puerto Rico, Misiones.
          </motion.p>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16"
        >
          {[
            {
              icon: "🍕",
              title: "Pizzas Ilimitadas",
              desc: "Come todo lo que quieras de nuestra infinita variedad de sabores artesanales",
            },
            {
              icon: "👨‍🍳",
              title: "Mozos Continuos",
              desc: "Servicio constante y personalizado, con atención en cada mesa sin esperas",
            },
            {
              icon: "🔥",
              title: "Horno de Barro",
              desc: "Pizzas cocinadas en horno de piedra a alta temperatura para la masa perfecta",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="text-center p-6 bg-[#1a1a1a]/60 rounded-2xl border border-[#2c1f0e]/35 hover:border-[#722f37]/30 transition-colors duration-300"
            >
              <span className="text-4xl mb-3 block">{item.icon}</span>
              <h3 className="font-[family-name:var(--font-playfair)] text-lg text-[#f5f0e8] mb-2">
                {item.title}
              </h3>
              <p className="text-[#f5f0e8]/50 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Pizza Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pizzas.map((pizza, index) => (
            <PizzaCard key={pizza.name} pizza={pizza} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center mt-14"
        >
          <button
            onClick={() =>
              document
                .querySelector("#reservas")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-10 py-4 bg-[#722f37] hover:bg-[#d4622a] text-[#f5f0e8] text-sm tracking-[0.22em] uppercase transition-all duration-300 rounded font-medium"
          >
            Reservar para el Rodizio
          </button>
        </motion.div>
      </div>
    </section>
  );
}
