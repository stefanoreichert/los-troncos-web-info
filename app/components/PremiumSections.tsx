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

const tragosPhotos = [
  "/imagenes/tragos-1.jpeg",
  "/imagenes/tragos-2.jpeg",
  "/imagenes/tragos-3.jpeg",
];

const platosPhotos = [
  "/imagenes/milanesa-los-troncos.jpg",
  "/imagenes/milanesa-a-la-suiza-2.jpeg",
  "/imagenes/empanadas-2.jpeg",
  "/imagenes/bife-chorizo.jpg",
  "/imagenes/hamburguesa-cedro.jpg",
  "/imagenes/hamburguesa-cancharana.jpeg",
  "/imagenes/hambur-pizza.jpg",
  "/imagenes/milanesa-napolitana.jpg",
  "/imagenes/milanesa-a-la-suiza.jpeg",
  "/imagenes/milanesa-caballo.jpg",
  "/imagenes/pizza-palorosa.jpg",
  "/imagenes/pizza-araticu.jpg",
  "/imagenes/pizza-kurupi.jpg",
  "/imagenes/empanadas.jpeg",
  "/imagenes/empanadas-3.jpeg",
  "/imagenes/empanadas-arabes.jpg",
  "/imagenes/empanadas-verdura.jpg",
  "/imagenes/empanadas-capresse.jpg",
  "/imagenes/sandwich-ibira.jpg",
  "/imagenes/sandwich-loro-negro.jpg",
  "/imagenes/bife-de-chorizo.jpeg",
  "/imagenes/lomo-champignon.jpg",
  "/imagenes/pastel-de-papa.jpg",
  "/imagenes/cajita-feliz.jpeg",
  "/imagenes/timbo.jpeg",
];

export function MenuImageSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [tragosOpen, setTragosOpen] = useState(false);
  const [tragosIdx, setTragosIdx] = useState(0);
  const [platosOpen, setPlatosOpen] = useState(false);
  const [platosIdx, setPlatosIdx] = useState(0);

  useEffect(() => {
    if (!modalOpen && !tragosOpen && !platosOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setModalOpen(false); setTragosOpen(false); setPlatosOpen(false); }
      if (modalOpen) {
        if (e.key === "ArrowRight") setPage((p) => Math.min(menuPages.length - 1, p + 1));
        if (e.key === "ArrowLeft") setPage((p) => Math.max(0, p - 1));
      }
      if (tragosOpen) {
        if (e.key === "ArrowRight") setTragosIdx((i) => Math.min(tragosPhotos.length - 1, i + 1));
        if (e.key === "ArrowLeft") setTragosIdx((i) => Math.max(0, i - 1));
      }
      if (platosOpen) {
        if (e.key === "ArrowRight") setPlatosIdx((i) => Math.min(platosPhotos.length - 1, i + 1));
        if (e.key === "ArrowLeft") setPlatosIdx((i) => Math.max(0, i - 1));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalOpen, tragosOpen, platosOpen]);

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
          {/* ── Carta principal — estilo papel ── */}
          <button
            onClick={() => openModal(0)}
            className="group relative min-h-[440px] w-full cursor-pointer overflow-hidden rounded-[34px] border border-white/10 bg-[#0d0907] p-4 shadow-[0_34px_110px_rgba(0,0,0,0.38)] text-left transition-all duration-300 hover:border-[#ffb36b]/30 hover:shadow-[0_40px_120px_rgba(240,138,60,0.18)] sm:min-h-[560px] sm:p-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,179,107,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%)] opacity-80" />
            <div className="relative flex h-full min-h-[408px] items-center justify-center overflow-hidden rounded-[26px] border border-[#fff4e3]/12 bg-[#f3e4cf] p-5 text-center transition-transform duration-700 group-hover:scale-[1.015] sm:min-h-[512px] sm:p-8">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(230,207,178,0.82)),radial-gradient(circle_at_30%_20%,rgba(240,138,60,0.22),transparent_35%)]" />
              <div className="relative flex h-full w-full flex-col items-center justify-center rounded-[22px] border border-[#2b170d]/10 bg-white/44 px-6 py-12 shadow-[inset_0_0_80px_rgba(43,23,13,0.08)]">
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#8b3e1f]">Los Troncos Resto Bar</p>
                <p className="mt-5 font-[family-name:var(--font-playfair)] text-5xl text-[#1b100b] sm:text-6xl">Carta principal</p>
                <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-[#1b100b]/58">Platos, pizzas, hamburguesas y especialidades</p>
                <div className="mt-8 h-px w-28 bg-gradient-to-r from-transparent via-[#8b3e1f]/45 to-transparent" />
                <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b3e1f]/70 transition-colors group-hover:text-[#8b3e1f]">Toca para ver la carta completa →</p>
              </div>
            </div>
          </button>

          {/* ── Bebidas y tragos — con foto real ── */}
          <button
            onClick={() => { setTragosIdx(0); setTragosOpen(true); }}
            className="group relative min-h-[440px] w-full cursor-pointer overflow-hidden rounded-[34px] border border-white/10 bg-[#0d0907] p-4 shadow-[0_34px_110px_rgba(0,0,0,0.38)] text-left transition-all duration-300 hover:border-[#ffb36b]/30 hover:shadow-[0_40px_120px_rgba(240,138,60,0.18)] sm:min-h-[560px] sm:p-6"
          >
            <div className="relative h-full min-h-[408px] overflow-hidden rounded-[26px] sm:min-h-[512px]">
              <Image
                src="/imagenes/tragos-1.jpeg"
                alt="Bebidas y tragos Los Troncos"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050403] via-[#050403]/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <div className="mb-3 h-px w-8 bg-gradient-to-r from-[#ffb36b] to-transparent transition-all duration-500 group-hover:w-20" />
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#ffb36b]">Los Troncos Resto Bar</p>
                <p className="mt-3 font-[family-name:var(--font-playfair)] text-4xl text-[#fff8ee] sm:text-5xl">Bebidas y tragos</p>
                <p className="mt-3 text-sm leading-7 text-[#fff4e3]/68">Bar, cocteles, cervezas y opciones para compartir</p>
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#ffb36b]/70 transition-colors group-hover:text-[#ffb36b]">Toca para ver la carta →</p>
              </div>
            </div>
          </button>
        </div>

        {/* ── Nuestros platos — card con galería lightbox ── */}
        <div className="mt-6">
          <button
            onClick={() => { setPlatosIdx(0); setPlatosOpen(true); }}
            className="group relative w-full cursor-pointer overflow-hidden rounded-[34px] border border-white/10 bg-[#0d0907] p-4 shadow-[0_34px_110px_rgba(0,0,0,0.38)] transition-all duration-300 hover:border-[#ffb36b]/30 hover:shadow-[0_40px_120px_rgba(240,138,60,0.18)] sm:p-6"
          >
            {/* Collage de 4 fotos */}
            <div className="grid grid-cols-4 gap-2 overflow-hidden rounded-[26px] h-52 sm:h-72">
              {platosPhotos.slice(0, 4).map((src, i) => (
                <div key={i} className="relative overflow-hidden">
                  <Image src={src} alt="Plato" fill sizes="25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 rounded-[34px] bg-gradient-to-t from-[#050403]/80 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <div className="mb-3 h-px w-8 bg-gradient-to-r from-[#ffb36b] to-transparent transition-all duration-500 group-hover:w-20" />
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#ffb36b]">Los Troncos Resto Bar</p>
              <p className="mt-3 font-[family-name:var(--font-playfair)] text-4xl text-[#fff8ee] sm:text-5xl">Nuestros platos</p>
              <p className="mt-2 text-sm leading-7 text-[#fff4e3]/68">Hacé click para ver todas las fotos</p>
            </div>
          </button>
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
      {/* ─── Modal tragos ──────────────────────────────────────── */}
      {tragosOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#050403]/95 backdrop-blur-2xl" onClick={() => setTragosOpen(false)}>
          <div className="relative flex w-full max-w-2xl flex-col items-center px-4" onClick={e => e.stopPropagation()}>
            <div className="mb-4 flex w-full items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#ffb36b]">{tragosIdx + 1} / {tragosPhotos.length}</span>
              <button onClick={() => setTragosOpen(false)} className="text-xs font-bold uppercase tracking-[0.25em] text-[#fff4e3]/50 hover:text-[#fff4e3]">Cerrar ✕</button>
            </div>
            <div className="relative w-full overflow-hidden rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
              <Image src={tragosPhotos[tragosIdx]} alt="Trago" width={900} height={900} className="h-auto max-h-[76vh] w-full object-contain" priority />
            </div>
            <div className="mt-5 flex items-center gap-5">
              <button onClick={() => setTragosIdx(i => Math.max(0, i - 1))} disabled={tragosIdx === 0} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xl text-[#fff4e3]/60 hover:border-[#ffb36b]/50 hover:text-[#ffb36b] disabled:opacity-20">‹</button>
              <div className="flex gap-2">
                {tragosPhotos.map((_, i) => (
                  <button key={i} onClick={() => setTragosIdx(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === tragosIdx ? "w-6 bg-[#ffb36b]" : "w-1.5 bg-white/25 hover:bg-white/50"}`} />
                ))}
              </div>
              <button onClick={() => setTragosIdx(i => Math.min(tragosPhotos.length - 1, i + 1))} disabled={tragosIdx === tragosPhotos.length - 1} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xl text-[#fff4e3]/60 hover:border-[#ffb36b]/50 hover:text-[#ffb36b] disabled:opacity-20">›</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Modal platos ───────────────────────────────────────── */}
      {platosOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#050403]/95 backdrop-blur-2xl" onClick={() => setPlatosOpen(false)}>
          <div className="relative flex w-full max-w-2xl flex-col items-center px-4" onClick={e => e.stopPropagation()}>
            <div className="mb-4 flex w-full items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#ffb36b]">{platosIdx + 1} / {platosPhotos.length}</span>
              <button onClick={() => setPlatosOpen(false)} className="text-xs font-bold uppercase tracking-[0.25em] text-[#fff4e3]/50 hover:text-[#fff4e3]">Cerrar ✕</button>
            </div>
            <div className="relative w-full overflow-hidden rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
              <Image src={platosPhotos[platosIdx]} alt="Plato" width={900} height={900} className="h-auto max-h-[76vh] w-full object-contain" priority />
            </div>
            <div className="mt-5 flex items-center gap-5">
              <button onClick={() => setPlatosIdx(i => Math.max(0, i - 1))} disabled={platosIdx === 0} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xl text-[#fff4e3]/60 hover:border-[#ffb36b]/50 hover:text-[#ffb36b] disabled:opacity-20">‹</button>
              <div className="flex flex-wrap justify-center gap-1.5 max-w-xs">
                {platosPhotos.map((_, i) => (
                  <button key={i} onClick={() => setPlatosIdx(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === platosIdx ? "w-5 bg-[#ffb36b]" : "w-1.5 bg-white/25 hover:bg-white/50"}`} />
                ))}
              </div>
              <button onClick={() => setPlatosIdx(i => Math.min(platosPhotos.length - 1, i + 1))} disabled={platosIdx === platosPhotos.length - 1} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xl text-[#fff4e3]/60 hover:border-[#ffb36b]/50 hover:text-[#ffb36b] disabled:opacity-20">›</button>
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
            La experiencia combina comida casera, sabores reconocibles,
            atencion cercana y un ambiente acogedor, moderno y familiar que invita
            a quedarse.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

type AmbiencePhoto = { src: string; cols?: string };

const ambiencePhotos: AmbiencePhoto[] = [
  { src: "/imagenes/ambiente-7.jpeg",      cols: "col-span-2 md:col-span-2" },
  { src: "/imagenes/ambiente-06.jpeg" },
  { src: "/imagenes/ambiente-05.jpg" },
  { src: "/imagenes/ambiente-interior.jpg" },
  { src: "/imagenes/ambiente-12.jpeg" },
  { src: "/imagenes/ambiente-13.jpeg",     cols: "col-span-2 md:col-span-3" },
  { src: "/imagenes/ambiente-04.jpg" },
  { src: "/imagenes/ambiente-11.jpeg" },
  { src: "/imagenes/ambiente-8.jpeg",      cols: "col-span-2 md:col-span-1" },
];

export function AmbienceSection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight")
        setLightbox((p) => (p! + 1) % ambiencePhotos.length);
      if (e.key === "ArrowLeft")
        setLightbox((p) => (p! - 1 + ambiencePhotos.length) % ambiencePhotos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <section id="ambiente" className="bg-[#080605] px-5 py-28 sm:px-8">
      <Reveal className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={sectionLabel}>El espacio</p>
            <h2 className={sectionTitle}>Dos ambientes,{"\n"}una sola noche.</h2>
          </div>
          <p className="max-w-xs text-[15px] leading-7 text-[#fff4e3]/48 sm:text-right">
            Salon interior con luz de tungsteno y terraza bajo las estrellas.
            Cada rincon, una imagen.
          </p>
        </div>

        {/* Editorial grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {ambiencePhotos.map((photo, i) => {
            const isFullWidth = photo.cols?.includes("col-span-3");
            const isWide = photo.cols?.includes("col-span-2");
            const heightClass = isFullWidth
              ? "h-[200px] sm:h-[280px] md:h-[440px]"
              : isWide
              ? "h-[200px] sm:h-[260px] md:h-[340px]"
              : "h-[180px] sm:h-[240px] md:h-[340px]";
            return (
              <button
                key={photo.src}
                onClick={() => setLightbox(i)}
                className={`group relative cursor-zoom-in overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d0a08] transition-all duration-500 hover:border-[#ffb36b]/30 hover:shadow-[0_20px_60px_rgba(240,138,60,0.15)] ${photo.cols ?? ""}`}
              >
                <div className={`relative ${heightClass}`}>
                  <Image
                    src={photo.src}
                    alt="Ambiente Los Troncos Resto Bar"
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  {/* Subtle permanent gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050403]/40 via-transparent to-transparent" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#050403]/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  {/* Warm shine */}
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,179,107,0.08),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  {/* Zoom icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm ring-1 ring-white/20">
                      <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                      </svg>
                    </div>
                  </div>
                  {/* Bottom amber line */}
                  <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#ffb36b]/70 via-[#f08a3c]/40 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/94 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          {/* Prev */}
          <button
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur-sm transition hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((p) => (p! - 1 + ambiencePhotos.length) % ambiencePhotos.length);
            }}
          >
            ‹
          </button>

          {/* Image */}
          <div
            className="relative mx-14 flex max-h-[90vh] max-w-[90vw] items-center justify-center overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={ambiencePhotos[lightbox].src}
              alt="Ambiente"
              width={1600}
              height={1067}
              className="max-h-[88vh] w-auto max-w-[88vw] rounded-2xl object-contain"
              priority
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur-sm transition hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((p) => (p! + 1) % ambiencePhotos.length);
            }}
          >
            ›
          </button>

          {/* Close */}
          <button
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm text-white backdrop-blur-sm transition hover:bg-white/20"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>

          {/* Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1 text-xs text-white/60 backdrop-blur-sm">
            {lightbox + 1} / {ambiencePhotos.length}
          </div>
        </div>
      )}
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

const DIAS_SHORT = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MESES_SHORT = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const DIAS_FULL = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const MESES_FULL = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

function getAvailableDates(): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  for (let i = 1; i <= 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dow = d.getDay(); // 0=Dom 4=Jue 5=Vie 6=Sáb
    if (dow === 0 || dow === 4 || dow === 5 || dow === 6) dates.push(d);
  }
  return dates;
}

export function ReservationSection() {
  const [form, setForm] = useState({ nombre: "", personas: "2", fecha: "" });
  const [availableDates] = useState<Date[]>(getAvailableDates);

  function formatFecha(d: Date) {
    return `${DIAS_FULL[d.getDay()]} ${d.getDate()} de ${MESES_FULL[d.getMonth()]}`;
  }

  const canSubmit = form.nombre.trim() && form.personas && form.fecha;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `Hola! Quiero reservar mesa en Los Troncos Resto Bar.\n\nNombre: ${form.nombre}\nPersonas: ${form.personas}\nFecha: ${form.fecha}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section id="reservar" className="relative overflow-hidden bg-[#080605] px-5 py-28 sm:px-8">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f08a3c]/10 blur-3xl" />
      <Reveal className="relative mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="pt-2">
          <p className={sectionLabel}>Reservar</p>
          <h2 className={sectionTitle}>Tu mesa, en minutos.</h2>
          <p className="mt-6 max-w-md text-base leading-8 text-[#fff4e3]/58">
            Completá tus datos, elegí el día y te enviamos la reserva directo por WhatsApp.
          </p>
          <p className="mt-4 text-xs leading-6 text-[#fff4e3]/35">
            Abrimos Jue — Dom desde las 19:30 hs
          </p>
        </div>

        <form onSubmit={submit} className="space-y-6 rounded-[36px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_34px_110px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:p-8">
          {/* Nombre + Personas */}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#fff4e3]/48">Nombre</span>
              <input
                type="text"
                required
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={e => setForm({ ...form, nombre: e.target.value })}
                className="min-h-14 w-full rounded-2xl border border-white/10 bg-[#050403]/72 px-4 text-[#fff8ee] placeholder-[#fff4e3]/25 outline-none transition-colors duration-300 focus:border-[#ffb36b]"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#fff4e3]/48">Personas</span>
              <input
                type="number"
                min="1"
                max="20"
                required
                placeholder="Ej: 4"
                value={form.personas}
                onChange={e => setForm({ ...form, personas: e.target.value })}
                className="min-h-14 w-full rounded-2xl border border-white/10 bg-[#050403]/72 px-4 text-[#fff8ee] placeholder-[#fff4e3]/25 outline-none transition-colors duration-300 focus:border-[#ffb36b]"
              />
            </label>
          </div>

          {/* Date picker — solo Jue/Vie/Sáb/Dom */}
          <div>
            <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#fff4e3]/48">
              Elegí una fecha disponible
            </span>
            <div className="flex flex-wrap gap-2">
              {availableDates.map(d => {
                const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
                const label = formatFecha(d);
                const selected = form.fecha === label;
                return (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setForm({ ...form, fecha: label })}
                    className={`flex flex-col items-center rounded-2xl border px-3 py-2.5 text-center transition-all duration-200 ${
                      selected
                        ? "border-[#ffb36b] bg-[#ffb36b] text-[#130a05]"
                        : "border-white/12 bg-white/[0.04] text-[#fff4e3]/70 hover:border-[#ffb36b]/40 hover:text-[#fff4e3]"
                    }`}
                  >
                    <span className="text-[9px] font-bold uppercase tracking-wider">{DIAS_SHORT[d.getDay()]}</span>
                    <span className="text-lg font-bold leading-none mt-0.5">{d.getDate()}</span>
                    <span className="text-[9px] leading-none mt-0.5">{MESES_SHORT[d.getMonth()]}</span>
                  </button>
                );
              })}
            </div>
            {form.fecha && (
              <p className="mt-3 text-xs font-medium text-[#ffb36b]/80">✓ {form.fecha}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="min-h-14 w-full rounded-full bg-[#f08a3c] px-8 text-sm font-bold uppercase tracking-[0.2em] text-[#130a05] transition-colors duration-300 hover:bg-[#ffb36b] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Reservar por WhatsApp →
          </button>
        </form>
      </Reveal>
    </section>
  );
}
