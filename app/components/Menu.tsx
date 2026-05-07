"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Category = "Pizzas" | "Hamburguesas" | "Picadas" | "Bebidas" | "Tragos" | "Postres";

const categories: Category[] = [
  "Pizzas",
  "Hamburguesas",
  "Picadas",
  "Bebidas",
  "Tragos",
  "Postres",
];

type MenuItem = { name: string; description: string; price: string; image: string };

const menuItems: Record<Category, MenuItem[]> = {
  Pizzas: [
    { name: "Mozzarella", description: "Tomate, mozzarella y albahaca fresca", price: "$3.500", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=75&fit=crop" },
    { name: "Cuatro Quesos", description: "Mozzarella, roquefort, parmesano y brie", price: "$4.200", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=75&fit=crop" },
    { name: "Pepperoni", description: "Pepperoni artesanal y mozzarella extra", price: "$4.000", image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&q=75&fit=crop" },
    { name: "Jamón y Rúcula", description: "Jamón serrano, rúcula y tomates cherry", price: "$4.500", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=75&fit=crop" },
    { name: "Fugazzeta", description: "Cebolla caramelizada, aceitunas y mozzarella", price: "$3.800", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=75&fit=crop" },
    { name: "Napolitana", description: "Tomate, mozzarella, aceitunas y albahaca", price: "$3.600", image: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&q=75&fit=crop" },
  ],
  Hamburguesas: [
    { name: "Classic Burger", description: "Carne artesanal, queso cheddar, lechuga y tomate", price: "$4.800", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=75&fit=crop" },
    { name: "BBQ Bacon", description: "Carne, bacon crocante, salsa BBQ y cheddar fundido", price: "$5.500", image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400&q=75&fit=crop" },
    { name: "Crispy Chicken", description: "Pollo crispy, salsa ranch, pickles y lechuga", price: "$4.500", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=75&fit=crop" },
    { name: "Veggie Burger", description: "Medallón de garbanzos y verduras grilladas", price: "$4.200", image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=400&q=75&fit=crop" },
  ],
  Picadas: [
    { name: "Picada Clásica", description: "Jamón, salame, queso, aceitunas y panificados", price: "$6.500", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=75&fit=crop" },
    { name: "Picada Premium", description: "Jamón serrano, brie, uvas, nueces y miel", price: "$9.500", image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&q=75&fit=crop" },
    { name: "Tabla de Quesos", description: "Selección de 4 quesos artesanales con acompañamientos", price: "$7.000", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=75&fit=crop" },
  ],
  Bebidas: [
    { name: "Agua Mineral", description: "Con o sin gas 500ml", price: "$800", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=75&fit=crop" },
    { name: "Gaseosas", description: "Coca-Cola, Fanta o Sprite 350ml", price: "$950", image: "https://images.unsplash.com/photo-1624552184280-9e48a02bf8cd?w=400&q=75&fit=crop" },
    { name: "Limonada Natural", description: "Limón fresco, menta y azúcar 500ml", price: "$1.200", image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=75&fit=crop" },
    { name: "Cerveza Artesanal", description: "Rubia, Negra o Roja de producción local", price: "$1.800", image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&q=75&fit=crop" },
    { name: "Vino de la Casa", description: "Copa de vino tinto o blanco seleccionado", price: "$1.500", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=75&fit=crop" },
  ],
  Tragos: [
    { name: "Aperol Spritz", description: "Aperol, prosecco, soda y naranja", price: "$2.800", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=75&fit=crop" },
    { name: "Mojito Clásico", description: "Ron, menta fresca, limón, azúcar y soda", price: "$2.500", image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=75&fit=crop" },
    { name: "Fernet con Coca", description: "Fernet Branca con Coca-Cola", price: "$2.200", image: "https://images.unsplash.com/photo-1568644396922-5c3bfae12521?w=400&q=75&fit=crop" },
    { name: "Tequila Sunrise", description: "Tequila, jugo de naranja y granadina", price: "$2.600", image: "https://images.unsplash.com/photo-1587889873849-e7f27de99c2a?w=400&q=75&fit=crop" },
    { name: "Negroni", description: "Gin, vermouth rosso y Campari con rodaja de naranja", price: "$2.800", image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400&q=75&fit=crop" },
  ],
  Postres: [
    { name: "Tiramisú", description: "Receta italiana clásica con mascarpone y café", price: "$2.500", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=75&fit=crop" },
    { name: "Volcán de Chocolate", description: "Bizcochuelo tibio con centro fundido y helado", price: "$2.800", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=75&fit=crop" },
    { name: "Panna Cotta", description: "Vainilla con coulis de frutos rojos", price: "$2.200", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=75&fit=crop" },
    { name: "Helado Artesanal", description: "Tres bochas de sabores de estación", price: "$1.800", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=75&fit=crop" },
  ],
};

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#2c1f0e]/40 hover:border-[#722f37]/45 transition-all duration-400"
    >
      <div className="relative h-44 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
        <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-[#0d0d0d]/80 backdrop-blur-sm text-[#d4622a] text-sm font-semibold rounded-lg">
          {item.price}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-[family-name:var(--font-playfair)] text-lg text-[#f5f0e8] group-hover:text-[#d4622a] transition-colors duration-300 mb-1">
          {item.name}
        </h3>
        <p className="text-[#f5f0e8]/50 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<Category>("Pizzas");
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section
      id="menu"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#111111] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#722f37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#d4622a] tracking-[0.42em] uppercase text-sm mb-4"
          >
            Nuestra Carta
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl text-[#f5f0e8] mb-6"
          >
            Menú{" "}
            <span className="italic text-[#d4622a]">Completo</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-[2px] bg-gradient-to-r from-[#722f37] to-[#d4622a] mx-auto"
          />
        </div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-xs tracking-[0.15em] uppercase transition-all duration-300 rounded-full ${
                activeCategory === cat
                  ? "bg-[#722f37] text-[#f5f0e8] shadow-lg shadow-[#722f37]/25"
                  : "bg-[#1a1a1a] text-[#f5f0e8]/60 hover:text-[#f5f0e8] border border-[#2c1f0e]/40 hover:border-[#722f37]/35"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {menuItems[activeCategory].map((item, i) => (
              <MenuCard key={item.name} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
