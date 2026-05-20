import { Clock, MapPin, Phone } from "lucide-react";

const InstagramIcon = () => (
  <svg
    className="h-[17px] w-[17px] fill-[#fff8ee]"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    className="h-[17px] w-[17px] fill-[#fff8ee]"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const navLinks = [
  ["#inicio", "Inicio"],
  ["#menu", "Menu"],
  ["#nosotros", "Nosotros"],
  ["#especialidades", "Especialidades"],
  ["#ambiente", "Ambiente"],
  ["#reservar", "Reservar"],
  ["#contacto", "Contacto"],
];

const horarios = [
  ["Lunes - Miercoles", "cerrado"],
  ["Jueves", "19:30 - 00:30"],
  ["Viernes - Sabado", "19:30 - 01:30"],
  ["Domingo", "20:00 - 00:00"],
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#fff4e3]/8 bg-[#070504] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4">
              <span className="block font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#fff8ee]">
                Los Troncos
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#e78a45]">
                Resto Bar
              </span>
            </div>
            <p className="text-sm leading-7 text-[#fff4e3]/42">
              Experiencia gastronomica en Puerto Rico, Misiones. Cocina,
              tragos artesanales y ambiente premium.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.instagram.com/lostroncos_restobar/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#fff4e3]/10 bg-[#130f0c] p-3 transition-colors duration-300 hover:bg-[#722f37]"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.facebook.com/lostroncos.restobar.2025"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#fff4e3]/10 bg-[#130f0c] p-3 transition-colors duration-300 hover:bg-[#1877f2]"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-medium uppercase tracking-widest text-[#fff8ee]">
              Navegacion
            </h4>
            <ul className="space-y-3">
              {navLinks.map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-[#fff4e3]/42 transition-colors duration-300 hover:text-[#e78a45]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-medium uppercase tracking-widest text-[#fff8ee]">
              Horarios
            </h4>
            <div className="space-y-3">
              {horarios.map(([day, hours]) => (
                <div
                  key={day}
                  className="flex items-start justify-between gap-4 text-sm"
                >
                  <span className="text-[#fff4e3]/42">{day}</span>
                  <span className="shrink-0 text-[#e78a45]">{hours}</span>
                </div>
              ))}
            </div>
          </div>

          <div id="contacto">
            <h4 className="mb-5 text-xs font-medium uppercase tracking-widest text-[#fff8ee]">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0 text-[#e78a45]" />
                <span className="text-sm leading-relaxed text-[#fff4e3]/42">
                  Puerto Rico, Misiones, Argentina
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="shrink-0 text-[#e78a45]" />
                <span className="text-sm text-[#fff4e3]/42">
                  +54 9 3743 611895
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={15} className="shrink-0 text-[#e78a45]" />
                <span className="text-sm text-[#fff4e3]/42">
                  Jue-Dom: desde las 19:30 hs
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-[#fff4e3]/8 pt-8 sm:flex-row">
          <p className="text-sm text-[#fff4e3]/24">
            © {currentYear} Los Troncos Resto Bar. Todos los derechos reservados.
          </p>
          <p className="text-xs text-[#fff4e3]/18">
            Puerto Rico, Misiones, Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}
