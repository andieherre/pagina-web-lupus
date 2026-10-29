import { useState, useEffect } from "react";
import portada from "./imports/portada.jpeg";
import talleres from "./imports/talleres.jpeg";
import capacitaciones from "./imports/capacitaciones.jpeg";
import campana from "./imports/campana.jpeg";
import pacientesParticipantes from "./imports/pacientes-participantes.jpeg";
import soyElRostro from "./imports/soy-el-rostro-de-lupus.jpeg";
import logo from "./imports/logo-fundalupus.png";
import logoBlanco from "./imports/logo-fundalupus-blanco.png";
import jornadas from "./imports/jornadas.jpg";
import noticia from "./imports/noticia.jpeg";
import evento from "./imports/evento.jpeg";
import evento2 from "./imports/evento-2.jpeg";
import charlas from "./imports/charlas.jpeg";

/* ─── constants ─── */
const HERO_SLIDES = [
  {
    url: portada,
    alt: "Portada oficial de la Asociación de Lupus El Salvador",
    heading: "No estás sol@ frente al Lupus",
    sub: "Información, apoyo y comunidad para personas con lupus en El Salvador.",
  },
  {
    url: campana,
    alt: "Campaña de sensibilización sobre el lupus",
    heading: "Vivir con Lupus es posible",
    sub: "Con el tratamiento correcto y una comunidad que te acompaña, la vida continúa.",
  },
  {
    url: soyElRostro,
    alt: "Campaña Soy el Rostro de Lupus",
    heading: "Juntos somos más fuertes",
    sub: "Únete a la comunidad de guerreros del Lupus en El Salvador.",
  },
];

const NAV_LINKS = [
  { label: "INICIO", href: "#inicio" },
  { label: "QUIÉNES SOMOS", href: "#mision" },
  { label: "EL LUPUS", href: "#lupus" },
  { label: "TESTIMONIOS", href: "#testimonios" },
  { label: "NOTICIAS", href: "#noticias" },
  { label: "CONTACTO", href: "#contacto" },
  { label: "DONACIONES", href: "#donaciones", highlight: true },
];

/* Redes oficiales. Las que tienen href vacío no se muestran hasta tener su enlace. */
const SOCIALS_FULL = [
  { name: "Facebook", handle: "Lupus El Salvador", href: "https://www.facebook.com/LupusElSalv/", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { name: "Instagram", handle: "@fundalupus", href: "https://www.instagram.com/fundalupus/", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
  { name: "TikTok", handle: "", href: "", icon: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.69a8.13 8.13 0 004.77 1.52V6.75a4.85 4.85 0 01-1.01-.06z" },
  { name: "YouTube", handle: "", href: "", icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
  { name: "WhatsApp", handle: "", href: "", icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" },
];
const SOCIALS = SOCIALS_FULL.filter((s) => s.href);

/* ─── countdown to next May 10 ─── */
function getCountdown() {
  const now = new Date();
  let target = new Date(now.getFullYear(), 4, 10); // May 10
  if (now >= target) target = new Date(now.getFullYear() + 1, 4, 10);
  const diff = target.getTime() - now.getTime();
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

/* ─── encabezado de sección al estilo del Brand Book:
   palabra grande y tenue detrás, subtítulo en minúscula y título en negrita ─── */
function SectionTitle({ eyebrow, title, ghost, light = false, center = true }: { eyebrow?: string; title: string; ghost?: string; light?: boolean; center?: boolean }) {
  return (
    <div className={`relative overflow-hidden ${ghost ? "pt-10 md:pt-14" : ""} ${center ? "text-center mb-14" : "mb-10"}`}>
      {ghost && (
        <span aria-hidden className={`absolute top-0 inset-x-0 whitespace-nowrap select-none font-extrabold uppercase leading-none text-7xl md:text-8xl ${light ? "text-white/10" : "text-primary-100"}`}>
          {ghost}
        </span>
      )}
      <div className="relative">
        {eyebrow && (
          <p className={`font-sans text-lg md:text-xl font-bold lowercase mb-1 ${light ? "text-primary-200" : "text-primary-400"}`}>{eyebrow}</p>
        )}
        <h2 className={`text-4xl md:text-5xl font-extrabold uppercase leading-none ${light ? "text-white" : "text-primary-800"}`}>{title}</h2>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   TOP BAR
═══════════════════════════════════════ */
function TopBar() {
  return (
    <div className="bg-primary-800 text-xs text-primary-100 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-9">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-primary-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
            San Salvador, El Salvador
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-primary-300" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
            +503 2222-0000
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            lupussv@asociacion.org.sv
          </span>
        </div>
        <div className="flex items-center gap-3">
          {SOCIALS.map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="text-primary-200 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.icon} /></svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   NAVBAR
═══════════════════════════════════════ */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow ${scrolled ? "shadow-md" : "shadow-sm"}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <a href="#inicio" className="flex items-center flex-shrink-0">
          <img src={logo} alt="FundaLupus El Salvador" className="h-14 w-auto" />
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) =>
            l.highlight ? (
              <a key={l.label} href={l.href} className="ml-3 bg-primary-400 hover:bg-primary-500 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-colors uppercase tracking-wide shadow-sm">
                {l.label}
              </a>
            ) : (
              <a key={l.label} href={l.href} className="text-xs font-semibold text-primary-800 hover:text-primary-400 px-3 py-2 transition-colors uppercase tracking-wide">
                {l.label}
              </a>
            )
          )}
        </div>

        <button className="lg:hidden text-primary-800 p-2" onClick={() => setOpen(!open)} aria-label="Menú">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-white border-t border-primary-100 px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className={`py-2 text-sm font-semibold uppercase tracking-wide ${l.highlight ? "text-primary-400" : "text-primary-800"}`}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════
   HERO CAROUSEL
═══════════════════════════════════════ */
function Hero() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const slide = HERO_SLIDES[current];
  return (
    <section id="inicio" className="relative h-[88vh] min-h-[520px] overflow-hidden">
      {HERO_SLIDES.map((s, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === current ? 1 : 0 }}>
          <img src={s.url} alt={s.alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/85 via-primary-800/55 to-primary-700/10" />
        </div>
      ))}

      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center text-white">
        <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-primary-200 mb-4">FundaLupus El Salvador</p>
        <h1 key={current} className="text-4xl md:text-6xl font-extrabold uppercase leading-[1.05] max-w-2xl drop-shadow-lg">
          {slide.heading}
        </h1>
        <p className="mt-5 text-lg md:text-xl font-light max-w-xl text-primary-50">{slide.sub}</p>
        <div className="mt-9 flex flex-wrap gap-4">
          <a href="#mision" className="bg-primary-400 hover:bg-primary-500 text-white font-bold uppercase tracking-widest text-sm px-8 py-3.5 rounded-full shadow-lg transition-colors">
            Conócenos
          </a>
          <a href="#lupus" className="border-2 border-white/80 text-white hover:bg-white hover:text-primary-800 font-bold uppercase tracking-widest text-sm px-8 py-3 rounded-full transition-colors">
            ¿Qué es el lupus?
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} aria-label={`Diapositiva ${i + 1}`} className={`h-2.5 rounded-full transition-all ${i === current ? "bg-primary-400 w-8" : "bg-white/60 w-2.5"}`} />
        ))}
      </div>

      <button onClick={() => setCurrent((c) => (c - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)} aria-label="Anterior" className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/15 hover:bg-primary-400 text-white rounded-full items-center justify-center transition-colors backdrop-blur">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button onClick={() => setCurrent((c) => (c + 1) % HERO_SLIDES.length)} aria-label="Siguiente" className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/15 hover:bg-primary-400 text-white rounded-full items-center justify-center transition-colors backdrop-blur">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </section>
  );
}

/* ═══════════════════════════════════════
   MISIÓN — nuestros objetivos / pilares
═══════════════════════════════════════ */
const MISSION_ITEMS = [
  {
    num: "01.",
    title: "CONCIENTIZACIÓN",
    text: "Contribuimos a que más personas entiendan la enfermedad para la detección de un diagnóstico temprano, tratamiento oportuno, reducción del estigma y la desinformación, mejor calidad de vida para el paciente, apoyo emocional y social.",
    side: "left",
    img: capacitaciones,
    alt: "Capacitación de FundaLupus El Salvador",
  },
  {
    num: "02.",
    title: "COMUNIDAD",
    text: "Generamos un espacio seguro para que los pacientes puedan desarrollar habilidades clave de comunicación, empatía y trabajo en equipo.",
    side: "right",
    img: talleres,
    alt: "Taller con pacientes y familias",
  },
  {
    num: "03.",
    title: "DEFENSA DE LOS DERECHOS",
    text: "Garantizar que las personas con esta enfermedad reciban el acceso adecuado a la salud, adaptación al entorno laboral y educativo, y protección contra la discriminación.",
    side: "left",
    img: pacientesParticipantes,
    alt: "Pacientes participantes de FundaLupus El Salvador",
  },
];

function Mision() {
  return (
    <section id="mision" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle title="Nuestros 3 pilares" />

        <div className="flex flex-col gap-20">
          {MISSION_ITEMS.map((item) => (
            <div
              key={item.num}
              className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${item.side === "right" ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div>
                <span className="text-7xl font-extrabold leading-none block mb-3 bg-gradient-to-br from-primary-400 to-primary-700 bg-clip-text text-transparent">{item.num}</span>
                <h3 className="text-2xl font-extrabold uppercase text-primary-800 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </div>
              <div className="relative">
                <div className={`absolute -inset-3 rounded-3xl bg-primary-100 ${item.side === "right" ? "-rotate-2" : "rotate-2"}`} />
                <div className="relative h-80 overflow-hidden rounded-2xl shadow-xl">
                  <img src={item.img} alt={item.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   EL LUPUS — qué es + datos clave
═══════════════════════════════════════ */
const SINTOMAS = [
  "Fatiga persistente",
  "Dolor e inflamación en articulaciones",
  "Erupción en forma de mariposa en el rostro",
  "Fiebre sin causa aparente",
  "Sensibilidad al sol",
  "Caída del cabello",
];

const DATOS = [
  {
    valor: "9 de 10",
    texto: "personas diagnosticadas son mujeres",
    icon: (
      <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 64 64" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="12" r="6" /><circle cx="44" cy="12" r="6" />
        <path d="M20 20l-8 22h16L20 20zM44 20l-8 22h16L44 20z" />
        <path d="M16 42v16M24 42v16M40 42v16M48 42v16" />
      </svg>
    ),
  },
  {
    valor: "15–45",
    texto: "años: edad en que suele aparecer",
    icon: (
      <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 64 64" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="12" width="48" height="44" rx="4" />
        <path d="M8 24h48M20 6v12M44 6v12" />
        <path d="M20 34h4M30 34h4M40 34h4M20 44h4M30 44h4M40 44h4" />
      </svg>
    ),
  },
  {
    valor: "No",
    texto: "es contagioso",
    icon: (
      <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 64 64" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 6l22 8v16c0 14-9.5 24-22 28C19.5 54 10 44 10 30V14l22-8z" />
        <path d="M22 31l7 7 13-14" />
      </svg>
    ),
  },
];

function ElLupus() {
  return (
    <section id="lupus">
      {/* Imagen + titular */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <img src={campana} alt="Campaña de sensibilización sobre el lupus" className="w-full h-[420px] object-cover shadow-lg" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-400 mb-3">Conoce la enfermedad</p>
            <h2 className="text-5xl md:text-6xl font-extrabold text-primary-900 leading-[1.05] mb-6">¿Qué es el lupus?</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Es una enfermedad <strong className="text-primary-700">autoinmune y crónica</strong>: el sistema inmunitario ataca por error tejidos y órganos sanos como la piel, las articulaciones, los riñones, el corazón o los pulmones. No tiene cura, pero con diagnóstico temprano y tratamiento adecuado es posible llevar una vida plena.
            </p>
            <p className="text-xs font-bold uppercase tracking-widest text-primary-800 mb-3">Señales frecuentes</p>
            <div className="flex flex-wrap gap-2">
              {SINTOMAS.map((s) => (
                <span key={s} className="bg-primary-50 text-primary-700 border border-primary-200 text-sm px-4 py-1.5 rounded-full">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Franja magenta con datos clave */}
      <div className="relative bg-primary-400 text-white pt-16 pb-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <img src={logoBlanco} alt="FundaLupus El Salvador" className="h-28 w-auto mx-auto mb-14" />
          <div className="grid md:grid-cols-3 gap-12">
            {DATOS.map((d) => (
              <div key={d.texto} className="flex items-center gap-5">
                <div className="flex-shrink-0">{d.icon}</div>
                <div>
                  <p className="text-4xl font-extrabold leading-none">{d.valor}</p>
                  <p className="text-lg font-semibold leading-snug mt-1">{d.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <svg className="absolute bottom-0 left-0 w-full h-16 text-white" viewBox="0 0 1440 80" preserveAspectRatio="none" fill="currentColor">
          <path d="M0 80V40c240 40 480 40 720 0s480-40 720 0v40H0z" />
        </svg>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SERVICIOS — tarjetas en tonos de la paleta
═══════════════════════════════════════ */
const SERVICIOS = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "JORNADAS LOCALES",
    img: charlas,
    alt: "Charla de la Asociación de Lupus El Salvador",
    desc: "Jornadas de salud, talleres y actividades de sensibilización que realizamos en diferentes departamentos de El Salvador.",
    bg: "bg-primary-400",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "GRUPOS DE APOYO",
    img: evento,
    alt: "Evento de la Asociación de Lupus El Salvador",
    desc: "Grupos de apoyo para pacientes con lupus en todo El Salvador, con sus datos de contacto y horarios de reunión.",
    bg: "bg-primary-500",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "DÍA DEL LUPUS",
    img: evento2,
    alt: "Evento del Día del Lupus",
    desc: "El evento más importante a nivel internacional. Únete a nuestra celebración anual cada 10 de mayo.",
    bg: "bg-primary-700",
  },
];

function Servicios() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle title="¿Cómo te apoyamos?" />
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICIOS.map((card) => (
            <div key={card.title} className={`${card.bg} text-white rounded-3xl overflow-hidden flex flex-col shadow-lg hover:-translate-y-1.5 hover:shadow-2xl transition-all`}>
              <div className="relative h-48">
                <img src={card.img} alt={card.alt} className="w-full h-full object-cover" />
                <div className={`absolute -bottom-8 left-8 w-16 h-16 rounded-2xl ${card.bg} border-4 border-white flex items-center justify-center`}>{card.icon}</div>
              </div>
              <div className="p-8 pt-12 flex flex-col gap-4 flex-1">
              <h3 className="font-extrabold uppercase tracking-wide text-lg">{card.title}</h3>
              <p className="text-primary-50/90 text-sm leading-relaxed flex-1">{card.desc}</p>
              <a href="#contacto" className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs mt-2 group">
                Más información
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   DÍA MUNDIAL COUNTDOWN
═══════════════════════════════════════ */
function DiaCountdown() {
  const [cd, setCd] = useState(getCountdown());
  useEffect(() => {
    const t = setInterval(() => setCd(getCountdown()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-20 bg-white border-t border-primary-100">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-primary-500 text-sm font-semibold uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="inline-block w-8 h-px bg-primary-400" /> Próxima conmemoración
          </p>
          <h2 className="text-5xl font-extrabold uppercase text-primary-800 leading-none mb-2">DÍA DEL</h2>
          <h2 className="text-6xl font-extrabold uppercase text-primary-700 leading-none mb-6">LUPUS</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span><strong>Día:</strong> 10 de mayo</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span><strong>Lugar:</strong> Día Mundial — Todo el planeta</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            El día 10 de mayo ha sido designado como el <strong>Día Mundial del Lupus</strong>, en el que organizaciones de todo el planeta trabajan para aumentar la sensibilización social y el reconocimiento del lupus como un problema significativo de salud pública.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            El lupus no solo afecta al enfermo, sino que trasciende a su familia, amigos y compañeros de trabajo.
          </p>
          <a href="#lupus" className="inline-block border-2 border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white font-bold uppercase tracking-widest text-sm px-6 py-3 transition-colors">
            VISITA LA SECCIÓN
          </a>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center justify-center gap-5">
            <div className="text-right">
              <span className="text-3xl font-bold text-primary-400">Día</span><br />
              <span className="text-3xl font-bold text-primary-700">Mundial</span><br />
              <span className="text-2xl font-bold text-primary-400">del Lupus</span><br />
              <span className="text-xl font-semibold text-primary-800">10 Mayo</span>
            </div>
            <img src={logo} alt="FundaLupus El Salvador" className="h-32 w-auto" />
          </div>

          <div className="grid grid-cols-4 gap-1 w-full max-w-sm">
            {[
              { value: cd.days, label: "Días" },
              { value: cd.hours, label: "Horas" },
              { value: cd.minutes, label: "Minutos" },
              { value: cd.seconds, label: "Segundos" },
            ].map(({ value, label }) => (
              <div key={label} className="bg-primary-700 text-white flex flex-col items-center justify-center py-5 px-2">
                <span className="text-3xl font-bold leading-none tabular-nums">{String(value).padStart(2, "0")}</span>
                <span className="text-xs mt-1 opacity-80">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   TESTIMONIOS
═══════════════════════════════════════ */
const TESTIMONIALS = [
  {
    name: "María Elena Rodríguez",
    city: "San Salvador",
    years: 5,
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&auto=format",
    quote: "Cuando me diagnosticaron pensé que mi vida había terminado. Hoy, cinco años después, soy parte de una comunidad que me da fuerza cada día. El lupus no me define, pero me enseñó a valorar cada momento.",
  },
  {
    name: "Ana Lucía Martínez",
    city: "Santa Ana",
    years: 3,
    img: "https://images.unsplash.com/photo-1489278353717-f64c6ee8a4d2?w=400&h=400&fit=crop&auto=format",
    quote: "Lo más difícil fue que nadie me creía porque se me veía bien. Gracias a esta asociación encontré médicos que me escucharon y personas que de verdad entienden lo que es vivir con lupus.",
  },
  {
    name: "Carmen Sofía Valle",
    city: "San Miguel",
    years: 8,
    img: "https://images.unsplash.com/photo-1562337404-3044c84ac061?w=400&h=400&fit=crop&auto=format",
    quote: "Soy mamá, trabajadora y guerrera del lupus. Aprendí a escuchar mi cuerpo y a no rendirme. Si estás recién diagnosticada, sabe que no estás sola — somos muchas y somos fuertes.",
  },
];

function Testimonios() {
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];
  return (
    <section id="testimonios" className="py-24 bg-primary-50">
      <div className="max-w-5xl mx-auto px-4">
        <SectionTitle ghost="Voces" eyebrow="voces reales" title="Testimonios" />

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-5">
          <div className="md:col-span-2 relative min-h-[300px]">
            <img src={t.img} alt={t.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-800/30 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-xl font-bold">{t.name}</p>
              <p className="text-primary-200 text-sm">{t.city} · {t.years} años con diagnóstico</p>
            </div>
          </div>
          <div className="md:col-span-3 p-10 md:p-12 flex flex-col justify-center">
            <span className="text-8xl font-extrabold text-primary-200 leading-none h-12">“</span>
            <p className="font-sans text-primary-900 text-lg font-light italic leading-relaxed mb-8">{t.quote}</p>
            <div className="flex items-center gap-3">
              {TESTIMONIALS.map((p, i) => (
                <button key={p.name} onClick={() => setActive(i)} aria-label={p.name} className={`rounded-full overflow-hidden transition-all ${i === active ? "w-12 h-12 ring-4 ring-primary-400" : "w-10 h-10 opacity-60 hover:opacity-100"}`}>
                  <img src={p.img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   GALERÍA — agregar nuevas fotos a este arreglo
═══════════════════════════════════════ */
const GALERIA = [
  { img: talleres, alt: "Taller con pacientes y familias", wide: true },
  { img: soyElRostro, alt: "Campaña Soy el Rostro de Lupus" },
  { img: capacitaciones, alt: "Capacitación de FundaLupus El Salvador" },
  { img: pacientesParticipantes, alt: "Pacientes participantes de FundaLupus El Salvador", wide: true },
  { img: portada, alt: "Portada oficial de FundaLupus El Salvador" },
  { img: campana, alt: "Campaña de sensibilización sobre el lupus" },
];

function Galeria() {
  return (
    <section id="galeria" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle ghost="Fotos" eyebrow="nuestra comunidad" title="Galería" />
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
          {GALERIA.map((g) => (
            <div key={g.alt} className={`group relative overflow-hidden rounded-2xl ${g.wide ? "md:col-span-2" : ""}`}>
              <img src={g.img} alt={g.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-800/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white text-sm font-semibold">{g.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   NOTICIAS
═══════════════════════════════════════ */
const NOTICIAS = [
  {
    date: "15 AGO",
    title: "Jornada de sensibilización sobre lupus en el Hospital Nacional Rosales",
    img: jornadas,
    alt: "Jornada de sensibilización sobre lupus",
  },
  {
    date: "02 AGO",
    title: "Lupus y fotosensibilidad: cómo protegerte en el verano salvadoreño",
    img: noticia,
    alt: "Información sobre lupus y sol",
  },
];

function Noticias() {
  return (
    <section id="noticias" className="py-24 bg-primary-50">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 items-stretch">
        <div className="flex flex-col justify-center">
          <SectionTitle ghost="News" eyebrow="actualidad" title="Últimas noticias" center={false} />
          <p className="text-gray-600 leading-relaxed">
            Las noticias más importantes sobre la enfermedad, así como eventos, actividades y jornadas de la Asociación de Lupus El Salvador.
          </p>
        </div>

        {NOTICIAS.map((n) => (
          <article key={n.title} className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group flex flex-col">
            <div className="relative h-52 overflow-hidden">
              <img src={n.img} alt={n.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <span className="absolute top-4 left-4 bg-primary-400 text-white text-xs font-bold px-3 py-1 rounded-full">{n.date}</span>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="font-bold text-primary-800 leading-snug flex-1">{n.title}</h3>
              <span className="mt-4 text-xs font-bold uppercase tracking-widest text-primary-400">Leer más →</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   DONACIONES + "NO ESTÁS SOL@"
═══════════════════════════════════════ */
/* Enlace a la plataforma externa de donación. Mientras esté vacío, el botón lleva a Contacto. */
const DONACION_URL = "";

const PASOS_DONACION = [
  { num: "1", titulo: "Haz clic en Donar ahora", texto: "Se abrirá nuestra plataforma de donación en una pestaña nueva." },
  { num: "2", titulo: "Elige tu aporte", texto: "Selecciona el monto y el método de pago que prefieras." },
  { num: "3", titulo: "Confirma tu donación", texto: "Recibirás un comprobante. ¡Gracias por sumarte a la causa!" },
];

function Donaciones() {
  const externo = DONACION_URL !== "";
  return (
    <section id="donaciones" className="relative py-24 overflow-hidden text-white">
      <img src={soyElRostro} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-400/95 via-primary-500/90 to-primary-800/95" />
      <div className="relative max-w-5xl mx-auto px-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-100 mb-4">No estás sol@ frente al lupus</p>
        <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide mb-5">Apoya nuestra causa</h2>
        <p className="text-primary-50 text-lg mb-12 leading-relaxed max-w-3xl mx-auto">
          Tu donación nos ayuda a seguir brindando apoyo, información y comunidad a miles de salvadoreños que viven con lupus. Cada aporte cuenta.
        </p>
        <div className="grid md:grid-cols-3 gap-5 mb-12 text-left">
          {PASOS_DONACION.map((p) => (
            <div key={p.num} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6">
              <span className="w-10 h-10 rounded-full bg-white text-primary-700 font-extrabold flex items-center justify-center mb-4">{p.num}</span>
              <p className="font-bold uppercase tracking-wide text-sm mb-1">{p.titulo}</p>
              <p className="text-primary-50 text-sm leading-relaxed">{p.texto}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={externo ? DONACION_URL : "#contacto"}
            {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex items-center gap-2 bg-white text-primary-700 hover:bg-primary-50 font-extrabold uppercase tracking-widest px-10 py-4 rounded-full shadow-xl transition-colors text-sm"
          >
            Donar ahora
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
          <a href="#contacto" className="border-2 border-white text-white hover:bg-white/10 font-bold uppercase tracking-widest px-10 py-4 rounded-full transition-colors text-sm">
            Contáctanos
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   CONTACTO + REDES
═══════════════════════════════════════ */
function Contacto() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const inputCls = "w-full bg-primary-50 border border-primary-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-400 focus:bg-white transition-colors";

  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle title="Contacto" />
        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-primary-50 rounded-2xl p-6">
                <div className="w-11 h-11 bg-primary-400 rounded-xl flex items-center justify-center text-white mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p className="font-bold text-primary-800 text-sm uppercase tracking-wide mb-2">Horario</p>
                <p className="text-gray-600 text-sm">Lunes – Viernes: 8:00 – 16:00</p>
                <p className="text-gray-600 text-sm">Sábados, domingos y festivos: cerrado</p>
              </div>
              <div className="bg-primary-50 rounded-2xl p-6">
                <div className="w-11 h-11 bg-primary-700 rounded-xl flex items-center justify-center text-white mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <p className="font-bold text-primary-800 text-sm uppercase tracking-wide mb-2">Dónde estamos</p>
                <p className="text-gray-600 text-sm">Colonia Escalón, 3a Calle Pte.</p>
                <p className="text-gray-600 text-sm">San Salvador, El Salvador</p>
                <p className="text-gray-600 text-sm">+503 2222-0000</p>
                <p className="text-gray-600 text-sm break-all">lupussv@asociacion.org.sv</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-700 to-primary-800 rounded-2xl p-6 text-white">
              <p className="font-bold uppercase tracking-wide text-sm mb-4">Síguenos en redes</p>
              <div className="flex flex-wrap gap-3">
                {SOCIALS.map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/10 hover:bg-white hover:text-primary-700 rounded-xl px-4 py-3 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={s.icon} /></svg>
                    <div className="text-left">
                      <p className="font-bold text-sm leading-tight">{s.name}</p>
                      <p className="text-xs opacity-75">{s.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-primary-100 p-8">
            <h3 className="text-xl font-extrabold uppercase text-primary-800 tracking-wide mb-6">Envíanos un mensaje</h3>
            {!sent ? (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wide text-primary-800 block mb-1">Tu nombre</label>
                  <input type="text" required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className={inputCls} placeholder="María García" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wide text-primary-800 block mb-1">Correo electrónico</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="maria@correo.com" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wide text-primary-800 block mb-1">Mensaje</label>
                  <textarea required rows={5} value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })} className={`${inputCls} resize-none`} placeholder="¿En qué podemos ayudarte?" />
                </div>
                <button type="submit" className="bg-primary-400 hover:bg-primary-500 text-white font-bold uppercase tracking-widest text-sm py-3.5 rounded-full shadow-md transition-colors">
                  Enviar mensaje
                </button>
              </form>
            ) : (
              <div className="bg-primary-50 rounded-2xl p-8 text-center">
                <span className="text-4xl block mb-3">🦋</span>
                <p className="font-bold text-primary-800 uppercase tracking-wide">¡Mensaje recibido!</p>
                <p className="text-gray-600 text-sm mt-2">Gracias, {form.nombre}. Te responderemos pronto.</p>
                <button onClick={() => { setSent(false); setForm({ nombre: "", email: "", mensaje: "" }); }} className="mt-4 text-xs text-primary-500 hover:text-primary-800 font-semibold uppercase tracking-wide">
                  Enviar otro mensaje
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   FOOTER
═══════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-primary-900 text-primary-100">
      <div className="max-w-7xl mx-auto px-4 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <img src={logoBlanco} alt="FundaLupus El Salvador" className="h-16 w-auto mb-4" />
          <p className="text-sm text-primary-200 leading-relaxed">Información, apoyo y comunidad para personas con lupus en El Salvador.</p>
        </div>
        <div>
          <p className="font-bold uppercase tracking-wide text-white text-sm mb-4">Navegación</p>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-primary-300 transition-colors capitalize">{l.label.toLowerCase()}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-bold uppercase tracking-wide text-white text-sm mb-4">Contacto</p>
          <p className="text-sm">San Salvador, El Salvador</p>
          <p className="text-sm">+503 2222-0000</p>
          <p className="text-sm mb-4">lupussv@asociacion.org.sv</p>
          <div className="flex gap-3">
            {SOCIALS.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary-400 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.icon} /></svg>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-200">
          <p>2026 © Asociación de Lupus El Salvador · Toda la información es educativa, no reemplaza la consulta médica.</p>
          <div className="flex gap-5 font-semibold uppercase tracking-wide">
            {["Privacidad", "Términos Legales", "Cookies"].map((l) => (
              <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════
   APP
═══════════════════════════════════════ */
export default function App() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar />
      <Hero />
      <Mision />
      <ElLupus />
      <Servicios />
      <DiaCountdown />
      <Testimonios />
      <Galeria />
      <Noticias />
      <Donaciones />
      <Contacto />
      <Footer />
    </div>
  );
}
