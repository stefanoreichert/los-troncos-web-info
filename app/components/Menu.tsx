"use client";

import { useMemo, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { MenuGroups, MenuItem } from "../lib/wordpress";

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

const fallbackMenuItems: MenuGroups = {
  Pizzas: [
    {
      name: "Palo Rosa",
      description: "Nuestra pizza insignia con combinación única de ingredientes frescos, aceitunas, tomates cherry y un toque de pesto artesanal.",
      price: "$16.000",
      image: "/imagenes/pizza-palorosa.jpg",
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
      image: "/imagenes/pizza-araticu.jpg",
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
      image: "/imagenes/pizza-kurupi.jpg",
    },
    {
      name: "4 Quesos",
      description: "Selección de cuatro quesos artesanales: mozzarella, provolone, roquefort y parmesano sobre masa crujiente.",
      price: "$18.000",
      image: "/imagenes/pizza-araticu.jpg",
    },
    {
      name: "Los Troncos",
      description: "La pizza de la casa: combinación especial del chef con ingredientes premium seleccionados de la temporada.",
      price: "$19.000",
      image: "/imagenes/hambur-pizza.jpg",
    },
    {
      name: "Anchico",
      description: "Jamón crudo, rúcula fresca, tomates cherry, lascas de parmesano y reducción de balsámico sobre masa artesanal.",
      price: "$20.000",
      image: "/imagenes/pizza-palorosa.jpg",
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
      image: "/imagenes/milanesa-a-la-suiza.jpeg",
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
      image: "/imagenes/pastel-de-papa.jpg",
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
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-[28px] border border-[#fff4e3]/9 bg-[#130f0c]/82 shadow-[0_20px_70px_rgba(0,0,0,0.22)] transition-all duration-500 hover:border-[#e78a45]/35 hover:shadow-[0_26px_80px_rgba(0,0,0,0.38)]"
    >
      <div className="relative h-72 overflow-hidden sm:h-80 lg:h-96">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#130f0c] via-[#130f0c]/10 to-transparent" />
        {item.price ? (
          <div className="absolute bottom-4 right-4 rounded-full border border-[#e78a45]/25 bg-[#090706]/82 px-4 py-2 text-sm font-semibold text-[#f1a35a] backdrop-blur-md">
            {item.price}
          </div>
        ) : null}
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="mb-2 font-[family-name:var(--font-playfair)] text-2xl text-[#fff8ee] transition-colors duration-300 group-hover:text-[#f1a35a]">
          {item.name}
        </h3>
        <p className="line-clamp-3 text-sm leading-7 text-[#fff4e3]/54">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Menu({ wordpressItems }: { wordpressItems?: MenuGroups | null }) {
  const menuItems = wordpressItems ?? fallbackMenuItems;
  const displayCategories = useMemo(
    () => (wordpressItems ? Object.keys(menuItems) : categories),
    [menuItems, wordpressItems]
  );
  const [activeCategory, setActiveCategory] = useState(displayCategories[0] ?? "");
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });
  const currentCategory = displayCategories.includes(activeCategory)
    ? activeCategory
    : displayCategories[0] ?? "";
  const activeItems = menuItems[currentCategory] ?? [];

  return (
    <section
      id="menu"
      className="relative overflow-hidden bg-[#0d0a08] px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-[#e78a45]/7 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#722f37]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div ref={titleRef} className="mx-auto mb-12 max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4 text-xs uppercase tracking-[0.36em] text-[#f1a35a]"
          >
            Nuestra Carta
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mb-5 font-[family-name:var(--font-playfair)] text-4xl text-[#fff8ee] sm:text-6xl"
          >
            Menú{" "}
            <span className="italic text-[#e78a45]">Completo</span>
          </motion.h2>
          <p className="text-sm leading-7 text-[#fff4e3]/56 sm:text-base">
            Platos pensados para compartir, sabores clasicos y una carta con
            espiritu de resto bar.
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-7 h-px w-24 bg-gradient-to-r from-transparent via-[#e78a45] to-transparent"
          />
        </div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible"
        >
          {displayCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`min-h-11 shrink-0 rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.15em] transition-all duration-300 ${
                currentCategory === cat
                  ? "bg-[#e78a45] text-[#140d08] shadow-lg shadow-[#e78a45]/20"
                  : "border border-[#fff4e3]/10 bg-[#130f0c] text-[#fff4e3]/62 hover:border-[#e78a45]/35 hover:text-[#fff8ee]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
          >
            {activeItems.map((item, i) => (
              <MenuCard key={item.name} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
