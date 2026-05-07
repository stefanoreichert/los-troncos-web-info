"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Clock, Users, MessageSquare, CheckCircle } from "lucide-react";

type FormData = {
  nombre: string;
  telefono: string;
  email: string;
  personas: string;
  fecha: string;
  horario: string;
  comentarios: string;
};

const WHATSAPP_NUMBER = "5493743000000";

const inputClass =
  "w-full bg-[#1a1a1a] border border-[#2c1f0e]/60 hover:border-[#722f37]/45 focus:border-[#722f37] text-[#f5f0e8] placeholder-[#f5f0e8]/28 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[#722f37]/18";

const HORARIOS = [
  "20:00", "20:30", "21:00", "21:30",
  "22:00", "22:30", "23:00", "23:30",
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
Teléfono: ${form.telefono}
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
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#111111] relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#722f37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-[#d4622a] tracking-[0.42em] uppercase text-sm mb-4"
          >
            Reservá tu lugar
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl text-[#f5f0e8] mb-6"
          >
            Hacé tu{" "}
            <span className="italic text-[#d4622a]">Reserva</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="w-20 h-[2px] bg-gradient-to-r from-[#722f37] to-[#d4622a] mx-auto"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[#f5f0e8] mb-3">
                Una experiencia que no olvidarás
              </h3>
              <p className="text-[#f5f0e8]/60 leading-relaxed">
                Reservá tu mesa y disfrutá de nuestro rodizio de pizzas
                ilimitadas, tragos artesanales y el mejor ambiente nocturno en
                Puerto Rico, Misiones.
              </p>
            </div>

            {[
              {
                icon: <Clock size={18} />,
                title: "Horarios",
                desc: "Lunes a Domingo: 20:00 a 01:00 hs",
              },
              {
                icon: <Phone size={18} />,
                title: "Contacto",
                desc: "+54 9 3743 000-000",
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
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="text-[#d4622a] mt-0.5 shrink-0">{item.icon}</div>
                <div>
                  <p className="text-[#f5f0e8] font-medium text-sm">
                    {item.title}
                  </p>
                  <p className="text-[#f5f0e8]/50 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}

            {/* WhatsApp direct button */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola!%20Quiero%20hacer%20una%20reserva.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-[#25D366] hover:bg-[#1da851] text-white rounded-xl transition-colors duration-300 text-sm font-medium w-fit"
            >
              <svg className="w-5 h-5 fill-white shrink-0" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Reservar por WhatsApp
            </a>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <CheckCircle className="text-[#25D366] mb-4" size={56} />
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[#f5f0e8] mb-2">
                  ¡Redirigiendo a WhatsApp!
                </h3>
                <p className="text-[#f5f0e8]/60">
                  Tu reserva está siendo procesada. Te respondemos a la
                  brevedad.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#f5f0e8]/55 text-xs tracking-widest uppercase mb-2 block">
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
                    <label className="text-[#f5f0e8]/55 text-xs tracking-widest uppercase mb-2 block">
                      Teléfono *
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
                  <label className="text-[#f5f0e8]/55 text-xs tracking-widest uppercase mb-2 block">
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

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[#f5f0e8]/55 text-xs tracking-widest uppercase mb-2 block">
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
                    <label className="text-[#f5f0e8]/55 text-xs tracking-widest uppercase mb-2 block">
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
                    <label className="text-[#f5f0e8]/55 text-xs tracking-widest uppercase mb-2 block">
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
                  <label className="text-[#f5f0e8]/55 text-xs tracking-widest uppercase mb-2 block">
                    Comentarios adicionales
                  </label>
                  <textarea
                    name="comentarios"
                    value={form.comentarios}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Alergias, ocasión especial, preferencias de mesa..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-[#722f37] hover:bg-[#d4622a] text-[#f5f0e8] tracking-[0.22em] uppercase text-sm font-medium rounded-xl transition-colors duration-300"
                >
                  Confirmar Reserva vía WhatsApp
                </motion.button>
                <p className="text-[#f5f0e8]/28 text-xs text-center">
                  Al confirmar, serás redirigido a WhatsApp para completar tu
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
