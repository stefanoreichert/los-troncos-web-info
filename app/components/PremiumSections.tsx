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

export function MenuImageSection() {
  return (
    <section id="menu" className="relative overflow-hidden bg-[#050403] px-5 py-28 sm:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#050403] to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-40 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[#f08a3c]/10 blur-3xl" />

      <Reveal className="relative mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className={sectionLabel}>Menu</p>
          <h2 className={sectionTitle}>
            La carta, presentada como pieza visual.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#fff4e3]/58">
            Esta seccion esta preparada para cargar imagenes reales del menu,
            limpias, centradas y legibles.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="group relative min-h-[520px] overflow-hidden rounded-[34px] border border-white/10 bg-[#0d0907] p-4 shadow-[0_34px_110px_rgba(0,0,0,0.38)] sm:min-h-[640px] sm:p-6"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,179,107,0.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_32%)] opacity-80" />
              <div className="relative flex h-full min-h-[488px] items-center justify-center rounded-[26px] border border-dashed border-[#fff4e3]/18 bg-[#fff4e3]/[0.025] p-8 text-center transition-transform duration-700 group-hover:scale-[1.015] sm:min-h-[592px]">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#ffb36b]">
                    Imagen del menu {item}
                  </p>
                  <p className="mt-4 font-[family-name:var(--font-playfair)] text-4xl text-[#fff8ee]/85">
                    Reemplazar por carta real
                  </p>
                  <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#fff4e3]/42">
                    Inserta aqui la imagen exacta del menu para mantener
                    legibilidad y una presentacion premium.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
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
          <h2 className={sectionTitle}>Platos con presencia de publicidad.</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {specialties.map((item) => (
            <article
              key={item.name}
              className="group relative overflow-hidden rounded-[34px] border border-white/10 bg-[#100b08] shadow-[0_34px_110px_rgba(0,0,0,0.34)]"
            >
              <div className="relative h-[430px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050403] via-transparent to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-[family-name:var(--font-playfair)] text-3xl text-[#fff8ee]">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#fff4e3]/58">
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
              className="group mb-5 break-inside-avoid overflow-hidden rounded-[30px] border border-white/10 bg-[#100b08]"
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#050403]/56 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-20" />
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
