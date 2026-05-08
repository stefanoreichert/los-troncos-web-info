"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Category =
  | "Pizzas"
  | "Hamburguesas"
  | "Milanesas"
  | "Carnes"
  | "Empanadas"
  | "Sándwiches"
  | "Bebidas & Tragos"
  | "Postres";

const categories: Category[] = [
  "Pizzas",
  "Hamburguesas",
  "Milanesas",
  "Carnes",
  "Empanadas",
  "Sándwiches",
  "Bebidas & Tragos",
  "Postres",
];

type MenuItem = { name: string; description: string; price: string; image: string };

const menuItems: Record<Category, MenuItem[]> = {
  Pizzas: [
    {
      name: "Palo Rosa",
      description: "Nuestra pizza insignia con combinación única de ingredientes frescos, aceitunas, tomates cherry y un toque de pesto artesanal.",
      price: "$16.000",
      image: "/imagenes/pizza-palo-rosa.jpg",
    },
    {
      name: "Kurupí",
      description: "Masa artesanal, salsa de tomate, queso mozzarella con carne de ternera picada a cuchillo y cebolla caramelizada.",
      price: "$20.000",
      image: "/imagenes/pizza-kurupi.jpg",
    },
    {
      name: "Araticú",
      description: "Masa artesanal con queso mozzarella, provolone, jamón, morrones asados, cubierta de cebolla, oliva y orégano.",
      price: "$22.000",
      image: "/imagenes/pizza-aratigu.jpg",
    },
    {
      name: "Hambur Pizza",
      description: "Masa artesanal, salsa de tomate, queso mozzarella con cuatro medallones de carne, tomate fresco y huevo frito.",
      price: "$27.000",
      image: "/imagenes/hambur-pizza.jpg",
    },
    {
      name: "Timbó",
      description: "Pizza clásica con base de tomate artesanal, queso mozzarella extra y orégano fresco de la casa.",
      price: "$14.000",
      image: "/imagenes/pizza-palo-rosa.jpg",
    },
    {
      name: "4 Quesos",
      description: "Selección de cuatro quesos artesanales: mozzarella, provolone, roquefort y parmesano sobre masa crujiente.",
      price: "$18.000",
      image: "/imagenes/pizza-aratigu.jpg",
    },
    {
      name: "Los Troncos",
      description: "La pizza de la casa: combinación especial del chef con ingredientes premium seleccionados de la temporada.",
      price: "$19.000",
      image: "/imagenes/pizza-kurupi.jpg",
    },
    {
      name: "Anchico",
      description: "Jamón crudo, rúcula fresca, tomates cherry, lascas de parmesano y reducción de balsámico sobre masa artesanal.",
      price: "$20.000",
      image: "/imagenes/pizza-aratigu.jpg",
    },
  ],
  Hamburguesas: [
    {
      name: "Tacuarembó",
      description: "Doble medallón de carne artesanal, cebolla caramelizada, queso cheddar y bacon crocante. Acompañada de papas fritas.",
      price: "$13.000",
      image: "/imagenes/hamburguesa-tacuarembo.jpg",
    },
    {
      name: "Cedro Misionero",
      description: "Medallón de carne, jamón, doble queso, panceta, lechuga, tomates cherry caramelizados y huevo frito. Con guarnición.",
      price: "$10.500",
      image: "/imagenes/hamburguesa-cedro.jpg",
    },
    {
      name: "Lapacho Negro",
      description: "Clásica hamburguesa artesanal con queso cheddar, lechuga, tomate y salsa de la casa en pan brioche tostado.",
      price: "$9.500",
      image: "/imagenes/hamburguesa-tacuarembo.jpg",
    },
    {
      name: "Araucaria",
      description: "Hamburguesa con doble queso fundido, cebolla crispy, pepinos encurtidos y mayonesa casera de la casa.",
      price: "$11.500",
      image: "/imagenes/hamburguesa-cedro.jpg",
    },
    {
      name: "Cancharana",
      description: "Medallón de carne artesanal, queso brie, champiñones salteados, rúcula y salsa de mostaza antigua.",
      price: "$11.000",
      image: "/imagenes/hamburguesa-tacuarembo.jpg",
    },
    {
      name: "María Preta",
      description: "Medallón de pollo grillado, queso brie, rúcula, tomates cherry y salsa de miel con mostaza en pan artesanal.",
      price: "$12.000",
      image: "/imagenes/hamburguesa-cedro.jpg",
    },
    {
      name: "Laurel Negro",
      description: "Doble medallón con queso azul fundido, cebolla caramelizada al vino tinto y reducción de balsámico.",
      price: "$12.000",
      image: "/imagenes/hamburguesa-tacuarembo.jpg",
    },
    {
      name: "Chicken Burger",
      description: "Medallón de pollo crocante, salsa ranch casera, pickles, lechuga fresca y tomate en pan artesanal.",
      price: "$10.500",
      image: "/imagenes/hamburguesa-cedro.jpg",
    },
    {
      name: "Kid Burger",
      description: "Pequeña hamburguesa artesanal con queso cheddar, lechuga y kétchup. Ideal para los más chicos.",
      price: "$8.000",
      image: "/imagenes/hamburguesa-tacuarembo.jpg",
    },
  ],
  Milanesas: [
    {
      name: "Napolitana",
      description: "Clásica de la gastronomía rioplatense: carne jugosa y crujiente, cubierta con jamón, tomate fresco y queso fundido gratinado al punto justo.",
      price: "$16.500",
      image: "/imagenes/milanesa-napolitana.jpg",
    },
    {
      name: "A Caballo",
      description: "Clásica milanesa de ternera, crujiente y jugosa, coronada con un huevo frito y hierbas frescas. Con guarnición a elección.",
      price: "$15.000",
      image: "/imagenes/milanesa-caballo.jpg",
    },
    {
      name: "A la Suiza",
      description: "Carne jugosa y crujiente con raíces europeas, cubierta con salsa blanca, jamón y queso gratinado al punto justo.",
      price: "$16.500",
      image: "/imagenes/milanesa-suiza.jpg",
    },
    {
      name: "Los Troncos",
      description: "Ternera dorada cubierta con mozzarella y cheddar fundidos, coronada con panceta crocante y huevo frito. Con guarnición.",
      price: "$17.000",
      image: "/imagenes/milanesa-los-troncos.jpg",
    },
    {
      name: "De Ternera",
      description: "Milanesa clásica de ternera, fina, crujiente por fuera y tierna por dentro, con pan rallado y especias de la casa.",
      price: "$14.000",
      image: "/imagenes/milanesa-napolitana.jpg",
    },
    {
      name: "Desbordé",
      description: "Milanesa extra grande con doble cobertura: salsa napolitana, jamón, queso cheddar, mozzarella y panceta. Para los más atrevidos.",
      price: "$21.000",
      image: "/imagenes/milanesa-los-troncos.jpg",
    },
  ],
  Carnes: [
    {
      name: "Lomo al Champiñón",
      description: "Tiernos medallones de lomo en una rica salsa de champiñones, cebollita y crema, servidos con puré de calabaza.",
      price: "$17.000",
      image: "/imagenes/lomo-champignon.jpg",
    },
    {
      name: "Bife de Chorizo",
      description: "Bife de chorizo jugoso y tierno, acompañado de papas aplastadas doradas y crujientes, con un toque de hierbas que realza su sabor.",
      price: "$17.000",
      image: "/imagenes/bife-chorizo.jpg",
    },
    {
      name: "Lomo a la Provenzal",
      description: "Medallones de lomo con salsa provenzal de ajo, perejil y aceite de oliva extra virgen. Con guarnición a elección.",
      price: "$17.000",
      image: "/imagenes/lomo-champignon.jpg",
    },
    {
      name: "Pastel de Papa",
      description: "Suave puré de papas cremoso, relleno con carne especiada y gratinado al horno. Combinación cálida y reconfortante con toque gourmet.",
      price: "$15.000",
      image: "/imagenes/bife-chorizo.jpg",
    },
  ],
  Empanadas: [
    {
      name: "Árabes",
      description: "Empanadas rellenas de carne especial, sazonadas con cebolla, morrón y un toque de limón. Receta tradicional de la casa.",
      price: "$2.000 c/u",
      image: "/imagenes/empanadas-arabes.jpg",
    },
    {
      name: "Capresse",
      description: "Rellenas de mozzarella fresca, tomate y albahaca, acompañadas de salsa de pesto artesanal.",
      price: "$2.000 c/u",
      image: "/imagenes/empanadas-capresse.jpg",
    },
    {
      name: "De Verdura",
      description: "Empanadas artesanales de verduras frescas de temporada y queso, horneadas en horno de barro.",
      price: "$1.800 c/u",
      image: "/imagenes/empanadas-verdura.jpg",
    },
    {
      name: "Jamón y Queso",
      description: "Clásica combinación de jamón y queso fundido en masa casera crujiente, horneada a la perfección.",
      price: "$1.800 c/u",
      image: "/imagenes/empanadas-capresse.jpg",
    },
    {
      name: "Carne Molida",
      description: "Carne molida sazonada con especias de la casa, cebolla, huevo y aceitunas en masa artesanal horneada.",
      price: "$1.800 c/u",
      image: "/imagenes/empanadas-arabes.jpg",
    },
    {
      name: "Cuatro Quesos",
      description: "Mozzarella, provolone, roquefort y parmesano en masa crocante artesanal. Para los amantes del queso.",
      price: "$2.000 c/u",
      image: "/imagenes/empanadas-verdura.jpg",
    },
    {
      name: "Carne a Cuchillo",
      description: "Carne cortada a cuchillo, marinada con hierbas y especias del campo, en masa artesanal dorada al horno.",
      price: "$2.200 c/u",
      image: "/imagenes/empanadas-arabes.jpg",
    },
  ],
  Sándwiches: [
    {
      name: "Loro Negro",
      description: "Pan artesanal con milanesa de carne de la casa, lechuga, tomate, huevo frito, jamón y queso. Con guarnición.",
      price: "$15.000",
      image: "/imagenes/sandwich-loro-negro.jpg",
    },
    {
      name: "Ibirá",
      description: "Pan árabe relleno de carne desmechada al vino tinto, cebolla y morrones salteados, con suave salsa de ajo y especias.",
      price: "$15.000",
      image: "/imagenes/sandwich-ibira.jpg",
    },
    {
      name: "Guatembú Blanco",
      description: "Pollo grillado, queso brie, rúcula, tomates cherry y mayonesa de hierbas en pan de campo artesanal.",
      price: "$13.000",
      image: "/imagenes/sandwich-loro-negro.jpg",
    },
    {
      name: "Angelim Rojo",
      description: "Pan rústico con bife a la parrilla, queso provolone, chimichurri de la casa, cebolla y morrones asados.",
      price: "$16.000",
      image: "/imagenes/sandwich-ibira.jpg",
    },
    {
      name: "Los Troncos",
      description: "El sándwich insignia: milanesa, doble queso, panceta, huevo frito y todos los ingredientes premium de la casa.",
      price: "$16.000",
      image: "/imagenes/sandwich-loro-negro.jpg",
    },
    {
      name: "Tostado",
      description: "Tostado artesanal con jamón y queso, tostado a la piedra con manteca de hierbas.",
      price: "$8.000",
      image: "/imagenes/sandwich-ibira.jpg",
    },
    {
      name: "Veggie",
      description: "Verduras grilladas, queso brie, rúcula, tomates cherry y pesto casero en pan integral artesanal.",
      price: "$8.500",
      image: "/imagenes/sandwich-loro-negro.jpg",
    },
  ],
  "Bebidas & Tragos": [
    {
      name: "Aperol Spritz",
      description: "Aperol, prosecco, soda y rodaja de naranja fresca. Refrescante y elegante.",
      price: "$6.500",
      image: "/imagenes/ambiente-01.jpg",
    },
    {
      name: "Fernet con Coca",
      description: "Fernet Branca con Coca-Cola helada. El clásico argentino infalible.",
      price: "$6.000",
      image: "/imagenes/ambiente-interior.jpg",
    },
    {
      name: "Cuba Libre",
      description: "Ron, Coca-Cola y toque de limón fresco sobre hielo.",
      price: "$6.500",
      image: "/imagenes/ambiente-01.jpg",
    },
    {
      name: "Gin Tonic",
      description: "Gin premium con agua tónica artesanal, pepino, limón y hierbas aromáticas.",
      price: "$6.500",
      image: "/imagenes/ambiente-interior.jpg",
    },
    {
      name: "Mojito",
      description: "Ron, menta fresca, limón, azúcar y soda con hielo triturado.",
      price: "$6.000",
      image: "/imagenes/ambiente-01.jpg",
    },
    {
      name: "Stella Artois",
      description: "Cerveza Stella Artois fría, servida en copa helada.",
      price: "$7.500",
      image: "/imagenes/ambiente-interior.jpg",
    },
    {
      name: "Patagonia Amber",
      description: "Cerveza artesanal Patagonia Amber Lager con notas carameladas.",
      price: "$7.000",
      image: "/imagenes/ambiente-01.jpg",
    },
    {
      name: "Corona 710ml",
      description: "Corona Extra en botella 710ml con rodaja de limón. Ligera y refrescante.",
      price: "$7.000",
      image: "/imagenes/ambiente-interior.jpg",
    },
    {
      name: "Limonada Natural",
      description: "Limón exprimido, agua mineral, azúcar y menta fresca. 500ml de frescura natural.",
      price: "$7.000",
      image: "/imagenes/ambiente-01.jpg",
    },
    {
      name: "Coca-Cola 1.5L",
      description: "Gaseosa Coca-Cola en botella familiar, ideal para compartir.",
      price: "$5.000",
      image: "/imagenes/ambiente-interior.jpg",
    },
  ],
  Postres: [
    {
      name: "Flan Casero",
      description: "Flan artesanal de la casa con dulce de leche y crema chantilly. Receta tradicional preparada diariamente.",
      price: "$5.500",
      image: "/imagenes/ambiente-interior.jpg",
    },
    {
      name: "Bombón Helado",
      description: "Bombón helado artesanal bañado en chocolate amargo con corazón cremoso. Frío, suave e irresistible.",
      price: "$5.500",
      image: "/imagenes/ambiente-02.jpg",
    },
    {
      name: "Panqueque de DDL",
      description: "Panqueque casero relleno de dulce de leche artesanal, flameado a la naranja y servido con crema.",
      price: "$5.500",
      image: "/imagenes/ambiente-interior.jpg",
    },
    {
      name: "Helado Artesanal",
      description: "Selección de sabores artesanales de temporada. Consultá con nuestro personal.",
      price: "Consultar",
      image: "/imagenes/ambiente-02.jpg",
    },
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
