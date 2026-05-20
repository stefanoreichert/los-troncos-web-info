"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";

const WHATSAPP_NUMBER = "+543743611895";

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        visible ? "translate-y-0 opacity-100 blur-0" : "translate-y-10 opacity-0 blur-sm"
      } ${className}`}
    >
      {children}
    </div>
  );
}

const sectionLabel =
  "mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-[#ffb36b]";
const sectionTitle =
  "font-[family-name:var(--font-playfair)] text-4xl font-semibold leading-tight text-[#fff8ee] sm:text-6xl lg:text-7xl";

const menuPages = [
  "/imagenes/carta-1.jpg",
  "/imagenes/carta-2.jpg",
  "/imagenes/carta-3.jpg",
  "/imagenes/carta-4.jpg",
  "/imagenes/carta-5.jpg",
  "/imagenes/carta-6.jpg",
  "/imagenes/carta-7.jpg",
  "/imagenes/carta-8.jpg",
];

export function MenuImageSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!modalOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
      if (e.key === "ArrowRight") setPage((p) => Math.min(menuPages.length - 1, p + 1));
      if (e.key === "ArrowLeft") setPage((p) => Math.max(0, p - 1));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalOpen]);

  function openModal(startPage = 0) {
    setPage(startPage);
    setModalOpen(true);
  }

  return (
    <section id="menu" className="relative overflow-hidden bg-[#050403] px-5 py-28 sm:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#050403] to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-40 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[#f08a3c]/10 blur-3xl" />

      <Reveal className="relative mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className={sectionLabel}>Menu</p>
          <h2 className={sectionTitle}>La carta completa.</h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#fff4e3]/58">
            Hace click en cualquier carta para verla completa.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {[
            { title: "Carta principal", subtitle: "Platos, pizzas, hamburguesas y especialidades", startPage: 0 },
            { title: "Bebidas y tragos", subtitle: "Bar, cocteles, cervezas y opciones para compartir", startPage: 4 },
          ].map((item) => (
            <button
              key={item.title}
              onClick={() => openModal(item.startPage)}
              className="group relative min-h-[440px] w-full cursor-pointer overflow-hidden rounded-[34px] border border-white/10 bg-[#0d0907] p-4 shadow-[0_34px_110px_rgba(0,0,0,0.38)] text-left transition-all duration-300 hover:border-[#ffb36b]/30 hover:shadow-[0_40px_120px_rgba(240,138,60,0.18)] sm:min-h-[560px] sm:p-6"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,179,107,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%)] opacity-80" />
              <div className="relative flex h-full min-h-[408px] items-center justify-center overflow-hidden rounded-[26px] border border-[#fff4e3]/12 bg-[#f3e4cf] p-5 text-center transition-transform duration-700 group-hover:scale-[1.015] sm:min-h-[512px] sm:p-8">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(230,207,178,0.82)),radial-gradient(circle_at_30%_20%,rgba(240,138,60,0.22),transparent_35%)]" />
                <div className="relative flex h-full w-full flex-col items-center justify-center rounded-[22px] border border-[#2b170d]/10 bg-white/44 px-6 py-12 shadow-[inset_0_0_80px_rgba(43,23,13,0.08)]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#8b3e1f]">
                    Los Troncos Resto Bar
                  </p>
                  <p className="mt-5 font-[family-name:var(--font-playfair)] text-5xl text-[#1b100b] sm:text-6xl">
                    {item.title}
                  </p>
                  <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-[#1b100b]/58">
                    {item.subtitle}
                  </p>
                  <div className="mt-8 h-px w-28 bg-gradient-to-r from-transparent via-[#8b3e1f]/45 to-transparent" />
                  <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b3e1f]/70 transition-colors group-hover:text-[#8b3e1f]">
                    Toca para ver la carta completa →
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Reveal>

      {/* ─── Modal carta completa ────────────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#050403]/95 backdrop-blur-2xl"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative flex w-full max-w-xl flex-col items-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-4 flex w-full items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#ffb36b]">
                Página {page + 1} / {menuPages.length}
              </span>
              <button
                onClick={() => setModalOpen(false)}
                className="text-xs font-bold uppercase tracking-[0.25em] text-[#fff4e3]/50 transition-colors hover:text-[#fff4e3]"
              >
                Cerrar ✕
              </button>
            </div>

            {/* Imagen */}
            <div className="relative w-full overflow-hidden rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
              <Image
                src={menuPages[page]}
                alt={`Menú página ${page + 1}`}
                width={800}
                height={1100}
                className="h-auto max-h-[76vh] w-full object-contain"
                priority
              />
            </div>

            {/* Navegación */}
            <div className="mt-5 flex items-center gap-5">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xl text-[#fff4e3]/60 transition-all hover:border-[#ffb36b]/50 hover:text-[#ffb36b] disabled:opacity-20"
              >
                ‹
              </button>
              {/* Dots */}
              <div className="flex gap-2">
                {menuPages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === page ? "w-6 bg-[#ffb36b]" : "w-1.5 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(menuPages.length - 1, p + 1))}
                disabled={page === menuPages.length - 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xl text-[#fff4e3]/60 transition-all hover:border-[#ffb36b]/50 hover:text-[#ffb36b] disabled:opacity-20"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="nosotros" className="relative bg-[#080605] px-5 py-28 sm:px-8">
      <Reveal className="mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className={sectionLabel}>Nosotros</p>
          <h2 className={sectionTitle}>
            Un resto bar con identidad calida y alma misionera.
          </h2>
        </div>
        <div className="space-y-6 text-lg leading-9 text-[#fff4e3]/62">
          <p>
            Los Troncos Resto Bar nace como un punto de encuentro para comer
            bien, compartir sin apuro y disfrutar una noche con caracter propio.
          </p>
          <p>
            La experiencia combina cocina abundante, sabores reconocibles,
            atencion cercana y un ambiente oscuro, moderno y familiar que invita
            a quedarse.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

const specialties = [
  {
    name: "Hamburguesa de autor",
    desc: "Pan suave, carne jugosa, queso fundido y capas pensadas para una mordida intensa.",
    image: "/imagenes/hamburguesa-tacuarembo.jpg",
  },
  {
    name: "Milanesa Los Troncos",
    desc: "Crujiente, generosa y con terminacion de casa para compartir o disfrutar solo.",
    image: "/imagenes/milanesa-los-troncos.jpg",
  },
  {
    name: "Pizza artesanal",
    desc: "Masa dorada, ingredientes frescos y sabores clasicos con personalidad.",
    image: "/imagenes/pizza-palorosa.jpg",
  },
];

export function SpecialtiesSection() {
  return (
    <section
      id="especialidades"
      className="relative overflow-hidden bg-[#050403] px-5 py-28 sm:px-8"
    >
      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-[#722f37]/20 blur-3xl" />
      <Reveal className="relative mx-auto max-w-7xl">
        <div className="mb-12 max-w-4xl">
          <p className={sectionLabel}>Nuestras Especialidades</p>
          <h2 className={sectionTitle}>Especialidades de la casa.</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {specialties.map((item, i) => (
            <article
              key={item.name}
              className="group relative overflow-hidden rounded-[34px] border border-white/10 bg-[#100b08] shadow-[0_34px_110px_rgba(0,0,0,0.34)] transition-all duration-500 hover:border-[#ffb36b]/25 hover:shadow-[0_40px_120px_rgba(240,138,60,0.16)]"
            >
              {/* Number badge */}
              <span className="pointer-events-none absolute right-6 top-5 z-10 select-none font-[family-name:var(--font-playfair)] text-[88px] font-bold leading-none text-white/[0.052] transition-all duration-700 group-hover:text-[#ffb36b]/10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative h-[430px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050403] via-[#050403]/20 to-transparent" />
                {/* Warm hover tint */}
                <div className="absolute inset-0 bg-[#f08a3c]/0 transition-colors duration-700 group-hover:bg-[#f08a3c]/[0.07]" />
                {/* Top shine */}
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,179,107,0.07),transparent_50%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                {/* Animated amber line */}
                <div className="mb-3 h-px w-8 bg-gradient-to-r from-[#ffb36b] to-transparent transition-all duration-500 group-hover:w-20" />
                <h3 className="font-[family-name:var(--font-playfair)] text-3xl text-[#fff8ee]">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#fff4e3]/58 transition-colors duration-500 group-hover:text-[#fff4e3]/80">
                  {item.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

const ambienceImages = [
  "/imagenes/ambiente-01.jpg",
  "/imagenes/ambiente-02.jpg",
  "/imagenes/ambiente-03.jpg",
  "/imagenes/ambiente-04.jpg",
  "/imagenes/ambiente-05.jpg",
  "/imagenes/ambiente-06.jpeg",
  "/imagenes/ambiente-7.jpeg",
  "/imagenes/ambiente-8.jpeg",
  "/imagenes/ambiente-9.jpeg",
  "/imagenes/ambiente-10.jpeg",
  "/imagenes/ambiente-11.jpeg",
  "/imagenes/ambiente-12.jpeg",
  "/imagenes/ambiente-13.jpeg",
  "/imagenes/ambiente-interior.jpg",
];

export function AmbienceSection() {
  return (
    <section id="ambiente" className="bg-[#080605] px-5 py-28 sm:px-8">
      <Reveal className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className={sectionLabel}>Ambiente</p>
          <h2 className={sectionTitle}>Luz baja, madera y noches con textura.</h2>
        </div>
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {ambienceImages.map((image, index) => (
            <div
              key={image}
              className="group mb-5 break-inside-avoid overflow-hidden rounded-[30px] border border-white/10 bg-[#100b08] transition-all duration-500 hover:border-[#ffb36b]/30 hover:shadow-[0_20px_60px_rgba(240,138,60,0.12)]"
            >
              <div
                className={`relative ${
                  index % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={image}
                  alt="Ambiente Los Troncos Resto Bar"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050403]/56 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-15" />
                {/* Warm shine on hover */}
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,179,107,0.09),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {/* Bottom amber micro-line */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#ffb36b]/60 via-[#f08a3c]/40 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contacto" className="relative bg-[#050403] px-5 py-28 sm:px-8">
      <Reveal className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className={sectionLabel}>Contacto</p>
          <h2 className={sectionTitle}>Estamos cerca. La mesa tambien.</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-5">
          {[
            {
              icon: <MapPin />,
              title: "Ubicacion",
              value: "Puerto Rico, Misiones, Argentina",
            },
            { icon: <Clock />, title: "Horarios", value: "Jue-Dom desde 19:30 hs" },
            { icon: <Phone />, title: "Telefono", value: "+54 9 3743 611895" },
            { icon: <MessageCircle />, title: "Instagram", value: "@lostroncos_restobar" },
            { icon: <Users />, title: "Facebook", value: "Los Troncos Resto Bar" },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-[#ffb36b]/35"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#ffb36b]/12 text-[#ffb36b]">
                {item.icon}
              </div>
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#fff8ee]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#fff4e3]/54">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export function ReservationSection() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    personas: "",
    fecha: "",
    hora: "",
  });

  const update = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const text = `Hola! Quiero reservar mesa en Los Troncos Resto Bar.

Nombre: ${form.nombre}
Telefono: ${form.telefono}
Personas: ${form.personas}
Fecha: ${form.fecha}
Hora: ${form.hora}`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section
      id="reservar"
      className="relative overflow-hidden bg-[#080605] px-5 py-28 sm:px-8"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f08a3c]/10 blur-3xl" />
      <Reveal className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className={sectionLabel}>Reservar</p>
          <h2 className={sectionTitle}>Tu mesa, en minutos.</h2>
          <p className="mt-6 max-w-md text-base leading-8 text-[#fff4e3]/58">
            Completa tus datos y enviamos la solicitud directamente por
            WhatsApp.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="grid gap-4 rounded-[36px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_34px_110px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:grid-cols-2 sm:p-8"
        >
          {[
            ["nombre", "Nombre", "text"],
            ["telefono", "Telefono", "tel"],
            ["personas", "Cantidad de personas", "number"],
            ["fecha", "Fecha", "date"],
          ].map(([name, label, type]) => (
            <label key={name} className="block">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#fff4e3]/48">
                {label}
              </span>
              <input
                name={name}
                type={type}
                required
                value={form[name as keyof typeof form]}
                onChange={update}
                className="min-h-14 w-full rounded-2xl border border-white/10 bg-[#050403]/72 px-4 text-[#fff8ee] outline-none transition-colors duration-300 focus:border-[#ffb36b]"
              />
            </label>
          ))}
          <label className="block sm:col-span-2">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#fff4e3]/48">
              Hora
            </span>
            <select
              name="hora"
              required
              value={form.hora}
              onChange={update}
              className="min-h-14 w-full rounded-2xl border border-white/10 bg-[#050403]/72 px-4 text-[#fff8ee] outline-none transition-colors duration-300 focus:border-[#ffb36b]"
            >
              <option value="">Seleccionar horario</option>
              {["20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"].map(
                (hour) => (
                  <option key={hour} value={hour}>
                    {hour} hs
                  </option>
                )
              )}
            </select>
          </label>
          <button className="min-h-14 rounded-full bg-[#f08a3c] px-8 text-sm font-bold uppercase tracking-[0.2em] text-[#130a05] transition-colors duration-300 hover:bg-[#ffb36b] sm:col-span-2">
            Reservar Mesa
          </button>
        </form>
      </Reveal>
    </section>
  );
}
