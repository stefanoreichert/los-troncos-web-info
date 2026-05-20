"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle, Clock, MessageSquare, Phone, Users } from "lucide-react";

type FormData = {
  nombre: string;
  telefono: string;
  email: string;
  personas: string;
  fecha: string;
  horario: string;
  comentarios: string;
};

const WHATSAPP_NUMBER = "+543743611895";

const inputClass =
  "w-full min-h-12 rounded-2xl border border-[#fff4e3]/10 bg-[#0d0a08]/82 px-4 py-3 text-sm text-[#fff8ee] outline-none transition-all duration-300 placeholder:text-[#fff4e3]/28 hover:border-[#e78a45]/35 focus:border-[#e78a45] focus:ring-2 focus:ring-[#e78a45]/14";

const HORARIOS = [
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

export default function Reservations() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    nombre: "",
    telefono: "",
    email: "",
    personas: "",
    fecha: "",
    horario: "",
    comentarios: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hola! Quiero hacer una reserva en Los Troncos Resto Bar.

Nombre: ${form.nombre}
Telefono: ${form.telefono}
Personas: ${form.personas}
Fecha: ${form.fecha}
Horario: ${form.horario} hs${form.comentarios ? `\nComentarios: ${form.comentarios}` : ""}`.trim();

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section
      id="reservas"
      className="relative overflow-hidden bg-[#090706] px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#e78a45]/7 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div ref={titleRef} className="mx-auto mb-14 max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="mb-4 text-xs uppercase tracking-[0.36em] text-[#f1a35a]"
          >
            Reserva tu lugar
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="mb-5 font-[family-name:var(--font-playfair)] text-4xl text-[#fff8ee] sm:text-6xl"
          >
            Hace tu <span className="italic text-[#e78a45]">Reserva</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-[#e78a45] to-transparent"
          />
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6 rounded-[30px] border border-[#fff4e3]/8 bg-[#130f0c]/58 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8"
          >
            <div>
              <h3 className="mb-3 font-[family-name:var(--font-playfair)] text-3xl text-[#fff8ee]">
                Una noche para disfrutar
              </h3>
              <p className="leading-7 text-[#fff4e3]/58">
                Reserva tu mesa y disfruta de nuestra cocina, tragos
                artesanales y el mejor ambiente nocturno en Puerto Rico,
                Misiones.
              </p>
            </div>

            {[
              {
                icon: <Clock size={18} />,
                title: "Horarios",
                desc: "Jue-Dom: desde las 19:30 hs · Lun-Mie cerrado",
              },
              {
                icon: <Phone size={18} />,
                title: "Contacto",
                desc: "+54 9 3743 611895",
              },
              {
                icon: <Users size={18} />,
                title: "Grupos",
                desc: "Capacidad para grupos grandes y eventos",
              },
              {
                icon: <MessageSquare size={18} />,
                title: "WhatsApp",
                desc: "Te respondemos en minutos",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="mt-0.5 shrink-0 text-[#e78a45]">{item.icon}</div>
                <div>
                  <p className="text-sm font-medium text-[#fff8ee]">
                    {item.title}
                  </p>
                  <p className="text-sm text-[#fff4e3]/50">{item.desc}</p>
                </div>
              </div>
            ))}

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola!%20Quiero%20hacer%20una%20reserva.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(37,211,102,0.18)] transition-colors duration-300 hover:bg-[#1da851]"
            >
              Reservar por WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="rounded-[30px] border border-[#fff4e3]/8 bg-[#130f0c]/72 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-8"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <CheckCircle className="mb-4 text-[#25D366]" size={56} />
                <h3 className="mb-2 font-[family-name:var(--font-playfair)] text-2xl text-[#fff8ee]">
                  Redirigiendo a WhatsApp
                </h3>
                <p className="text-[#fff4e3]/60">
                  Tu reserva esta siendo procesada. Te respondemos a la brevedad.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-widest text-[#fff4e3]/55">
                      Nombre *
                    </label>
                    <input
                      name="nombre"
                      required
                      value={form.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre completo"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-widest text-[#fff4e3]/55">
                      Telefono *
                    </label>
                    <input
                      name="telefono"
                      required
                      type="tel"
                      value={form.telefono}
                      onChange={handleChange}
                      placeholder="+54 9 3743..."
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs uppercase tracking-widest text-[#fff4e3]/55">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className={inputClass}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-widest text-[#fff4e3]/55">
                      Personas *
                    </label>
                    <select
                      name="personas"
                      required
                      value={form.personas}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Cantidad</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, "9+"].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-widest text-[#fff4e3]/55">
                      Fecha *
                    </label>
                    <input
                      name="fecha"
                      required
                      type="date"
                      value={form.fecha}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-widest text-[#fff4e3]/55">
                      Horario *
                    </label>
                    <select
                      name="horario"
                      required
                      value={form.horario}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Hora</option>
                      {HORARIOS.map((h) => (
                        <option key={h} value={h}>
                          {h} hs
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs uppercase tracking-widest text-[#fff4e3]/55">
                    Comentarios adicionales
                  </label>
                  <textarea
                    name="comentarios"
                    value={form.comentarios}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Alergias, ocasion especial, preferencias de mesa..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <motion.button
                  whileHover={{ y: -2, backgroundColor: "#e78a45" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="min-h-13 w-full rounded-full bg-[#722f37] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#fff8ee] shadow-[0_18px_45px_rgba(114,47,55,0.24)] transition-colors duration-300"
                >
                  Confirmar via WhatsApp
                </motion.button>
                <p className="text-center text-xs text-[#fff4e3]/32">
                  Al confirmar, seras redirigido a WhatsApp para completar tu
                  reserva.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
