import { useState, useEffect } from "react";
import portada from "./imports/portada.jpeg";
import talleres from "./imports/talleres.jpeg";
import capacitaciones from "./imports/capacitaciones.jpeg";
import campana from "./imports/campana.jpeg";
import pacientesParticipantes from "./imports/pacientes-participantes.jpeg";
import soyElRostro from "./imports/soy-el-rostro-de-lupus.jpeg";

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

/* ═══════════════════════════════════════
   TOP BAR
═══════════════════════════════════════ */
function TopBar() {
  return (
    <div className="bg-gray-100 border-b border-gray-200 text-xs text-gray-600 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-9">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
            San Salvador, El Salvador
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
            +503 2222-0000
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            lupussv@asociacion.org.sv
          </span>
        </div>
        <div className="flex items-center gap-3">
          {[
            { label: "Facebook", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
            { label: "X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
            { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
            { label: "YouTube", path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
          ].map((s) => (
            <a key={s.label} href="#" aria-label={s.label} className="text-gray-500 hover:text-purple-700 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.path} /></svg>
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
    <nav className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? "shadow-md" : "shadow-sm"}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2 flex-shrink-0">
          <svg className="w-10 h-10" viewBox="0 0 80 60" fill="none">
            <path d="M40 30 C30 10 5 8 8 28 C11 45 30 40 40 30Z" fill="#7c3aed" opacity="0.85"/>
            <path d="M40 30 C50 10 75 8 72 28 C69 45 50 40 40 30Z" fill="#a855f7" opacity="0.75"/>
            <path d="M40 30 C32 42 18 55 22 58 C26 61 35 50 40 30Z" fill="#7c3aed" opacity="0.9"/>
            <path d="M40 30 C48 42 62 55 58 58 C54 61 45 50 40 30Z" fill="#a855f7" opacity="0.8"/>
            <circle cx="40" cy="30" r="3" fill="#4c1d95"/>
          </svg>
          <div className="leading-tight">
            <div className="text-xs text-purple-500 font-semibold uppercase tracking-wider">Asociación de</div>
            <div className="text-purple-800 font-bold text-lg leading-none">Lupus El Salvador</div>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) =>
            l.highlight ? (
              <a key={l.label} href={l.href} className="ml-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold px-4 py-2 transition-colors uppercase tracking-wide">
                {l.label}
              </a>
            ) : (
              <a key={l.label} href={l.href} className="text-xs font-semibold text-gray-700 hover:text-purple-700 px-3 py-2 transition-colors uppercase tracking-wide border border-transparent hover:border-purple-200">
                {l.label}
              </a>
            )
          )}
        </div>

        <button className="lg:hidden text-purple-800 p-2" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className={`py-2 text-sm font-semibold uppercase tracking-wide ${l.highlight ? "text-purple-700" : "text-gray-700"}`}>
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
    const t = setInterval(() => setCurrent((c) => (c + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = HERO_SLIDES[current];
  return (
    <section id="inicio" className="relative h-[92vh] min-h-[520px] overflow-hidden">
      {HERO_SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img src={s.url} alt={s.alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-transparent to-purple-900/60" />
        </div>
      ))}

      {/* Text overlay */}
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wide drop-shadow-lg max-w-3xl leading-tight">
          {slide.heading}
        </h1>
        <p className="mt-4 text-lg md:text-xl font-light drop-shadow max-w-xl">{slide.sub}</p>
        <a href="#mision" className="mt-8 border-2 border-white text-white hover:bg-white hover:text-purple-800 font-bold uppercase tracking-widest text-sm px-8 py-3 transition-colors">
          Conócenos
        </a>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full transition-all ${i === current ? "bg-white w-6" : "bg-white/50"}`} />
        ))}
      </div>

      {/* Arrows */}
      <button onClick={() => setCurrent((c) => (c - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-purple-700 text-white rounded-full flex items-center justify-center transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button onClick={() => setCurrent((c) => (c + 1) % HERO_SLIDES.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-purple-700 text-white rounded-full flex items-center justify-center transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
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
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-purple-600 text-sm font-semibold uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="inline-block w-8 h-px bg-purple-400" /> Próxima conmemoración
          </p>
          <h2 className="text-5xl font-black uppercase text-gray-800 leading-none mb-2">DÍA DEL</h2>
          <h2 className="text-6xl font-black uppercase text-purple-700 leading-none mb-6">LUPUS</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span><strong>Día:</strong> 10 de Mayo</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span><strong>Lugar:</strong> Día Mundial — Todo el planeta</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            El día 10 de mayo ha sido designado como el <strong>Día Mundial del Lupus</strong>, en el que organizaciones de todo el planeta trabajan para aumentar la sensibilización social y el reconocimiento del Lupus como un problema significativo de salud pública.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            El Lupus no solo afecta al enfermo, sino que trasciende a su familia, amigos y compañeros de trabajo.
          </p>
          <a href="#mision" className="inline-block border-2 border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white font-bold uppercase tracking-widest text-sm px-6 py-3 transition-colors">
            VISITA LA SECCIÓN
          </a>
        </div>

        <div className="flex flex-col items-center gap-8">
          {/* Butterfly world logo */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="text-right">
                <span className="text-3xl font-bold text-fuchsia-600">Día</span><br />
                <span className="text-3xl font-bold text-teal-600">Mundial</span><br />
                <span className="text-2xl font-bold text-fuchsia-600">del Lupus</span><br />
                <span className="text-xl font-semibold text-gray-700">10 Mayo</span>
              </div>
              <div className="w-24 h-24 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="30" fill="none" stroke="#e11d90" strokeWidth="4"/>
                  <ellipse cx="50" cy="50" rx="14" ry="30" fill="#2dd4bf" opacity="0.7"/>
                  <path d="M50 20 C60 30 70 40 65 55 C75 45 80 30 68 22 Z" fill="#2dd4bf" opacity="0.5"/>
                  <path d="M50 20 C40 30 30 40 35 55 C25 45 20 30 32 22 Z" fill="#2dd4bf" opacity="0.5"/>
                  <path d="M50 55 C58 65 62 80 58 88 C54 82 50 70 50 55Z" fill="#e11d90" opacity="0.8"/>
                  <path d="M50 55 C42 65 38 80 42 88 C46 82 50 70 50 55Z" fill="#e11d90" opacity="0.8"/>
                  <circle cx="50" cy="50" r="4" fill="#1e3a5f"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-1 w-full max-w-sm">
            {[
              { value: cd.days, label: "Days" },
              { value: cd.hours, label: "Hours" },
              { value: cd.minutes, label: "Minutes" },
              { value: cd.seconds, label: "Seconds" },
            ].map(({ value, label }) => (
              <div key={label} className="bg-purple-700 text-white flex flex-col items-center justify-center py-5 px-2">
                <span className="text-3xl font-bold leading-none">{String(value).padStart(2, "0")}</span>
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
   NOTICIAS
═══════════════════════════════════════ */
const NOTICIAS = [
  {
    date: "15 AGO:",
    title: "JORNADA DE SENSIBILIZACIÓN SOBRE LUPUS EN EL HOSPITAL NACIONAL ROSALES",
    img: "https://images.unsplash.com/photo-1606206591513-adbfbdd7a177?w=600&h=400&fit=crop&auto=format",
    alt: "Jornada médica de lupus",
  },
  {
    date: "02 AGO:",
    title: "LUPUS Y FOTOSENSIBILIDAD: CÓMO PROTEGERTE EN EL VERANO SALVADOREÑO",
    img: "https://images.unsplash.com/photo-1561490497-b47f5576e1f0?w=600&h=400&fit=crop&auto=format",
    alt: "Información sobre lupus y sol",
  },
];

function Noticias() {
  return (
    <section id="noticias" className="relative py-16 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1717870360468-8d5a4c3ec20a?w=1600&h=800&fit=crop&auto=format"
          alt="Campo de lavanda"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-purple-900/60" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-0 min-h-[400px]">
        {/* Left text */}
        <div className="flex flex-col justify-center py-10 pr-8">
          <h2 className="text-4xl font-black uppercase text-white leading-tight mb-4">
            ÚLTIMAS<br />NOTICIAS
          </h2>
          <p className="text-purple-200 text-sm leading-relaxed mb-6">
            En esta sección encontrarás las noticias más importantes que afectan a la enfermedad, así como todas aquellas relacionadas con eventos, actividades y jornadas de la Asociación de Lupus El Salvador.
          </p>
          <a href="#noticias" className="inline-block border border-white text-white hover:bg-white hover:text-purple-800 font-bold uppercase tracking-widest text-xs px-5 py-2 transition-colors self-start">
            NOTICIAS
          </a>
        </div>

        {/* News cards */}
        {NOTICIAS.map((n) => (
          <div key={n.title} className="flex flex-col">
            <img src={n.img} alt={n.alt} className="w-full h-48 object-cover" />
            <div className="bg-gray-700/90 text-white p-6 flex-1">
              <p className="text-sm font-bold text-purple-300 mb-2">{n.date}</p>
              <p className="font-bold uppercase text-sm leading-snug">{n.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   MISIÓN — numbered sections
═══════════════════════════════════════ */
const MISSION_ITEMS = [
  {
    num: "01.",
    title: "COORDINAR ESFUERZOS",
    text: "Trabajamos en red a nivel nacional articulando a pacientes, médicos, hospitales y asociaciones para mejorar la calidad de vida de quienes viven con lupus en El Salvador. Somos miembros de redes internacionales de enfermedades autoinmunes.",
    side: "left",
    img: capacitaciones,
    alt: "Capacitación de la Asociación de Lupus El Salvador",
  },
  {
    num: "02.",
    title: "FORMAR E INFORMAR",
    text: "Uno de nuestros objetivos más importantes es brindar formación a pacientes y familias. Desde 2015 realizamos jornadas informativas, talleres y contenido digital para empoderar a nuestra comunidad con conocimiento actualizado.",
    side: "right",
    img: talleres,
    alt: "Taller informativo para pacientes y familias",
  },
  {
    num: "03.",
    title: "OFRECER APOYO",
    text: "Brindamos información veraz sobre tratamientos, derechos del paciente y recursos disponibles en el sistema de salud salvadoreño. Realizamos campañas de sensibilización para dar a conocer una enfermedad que afecta a miles de salvadoreños.",
    side: "left",
    img: pacientesParticipantes,
    alt: "Pacientes participantes de la asociación",
  },
];

function Mision() {
  return (
    <section id="mision" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black uppercase text-gray-800 tracking-wide">NUESTRA MISIÓN</h2>
          <div className="w-16 h-1 bg-purple-700 mx-auto mt-4 mb-6" />
          <p className="text-gray-600 max-w-xl mx-auto">
            Mejorar la vida de las personas afectadas por el Lupus en El Salvador, coordinando esfuerzos, formando y ofreciendo apoyo real a pacientes y familias.
          </p>
        </div>

        {/* Numbered mission items, alternating text/image */}
        <div className="flex flex-col gap-16">
          {MISSION_ITEMS.map((item) => (
            <div
              key={item.num}
              className={`grid md:grid-cols-2 gap-10 items-center ${
                item.side === "right" ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <span className="text-6xl font-black text-purple-700 leading-none block mb-2">{item.num}</span>
                <h3 className="text-xl font-black uppercase text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
              </div>
              <div className="h-72 overflow-hidden rounded-sm">
                <img src={item.img} alt={item.alt} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   APOYO — section 03 + purple cards
═══════════════════════════════════════ */
const PURPLE_CARDS = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "JORNADAS LOCALES",
    desc: "Información sobre jornadas de salud, talleres y actividades de sensibilización que realizamos en diferentes departamentos de El Salvador.",
    cta: "JORNADAS LOCALES",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "GRUPOS DE APOYO",
    desc: "Aquí encontrarás los grupos de apoyo para pacientes con Lupus en todo El Salvador junto con sus datos de contacto y horarios de reunión.",
    cta: "GRUPOS DE APOYO",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "DÍA DEL LUPUS",
    desc: "El Día del Lupus es el evento más importante a nivel internacional. Infórmate sobre el evento y únete a nuestra celebración anual el 10 de mayo.",
    cta: "DÍA DEL LUPUS",
  },
];

function Apoyo() {
  return (
    <section id="lupus" className="bg-white">
      {/* Section 03 with lab image */}
      <div className="grid md:grid-cols-2 min-h-64">
        <div className="bg-purple-100 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1639772823849-6efbd173043c?w=600&h=500&fit=crop&auto=format"
            alt="Muestra de laboratorio — diagnóstico de lupus"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        <div className="bg-purple-50 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1506093877953-f050840b0876?w=600&h=500&fit=crop&auto=format"
            alt="Comunidad de mujeres apoyándose"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-purple-900/30" />
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="text-white text-center">
              <div className="text-6xl font-black tracking-wider">LUPUS</div>
              <div className="text-xl mt-1 font-light">El Salvador</div>
            </div>
          </div>
        </div>
      </div>

      {/* Purple service cards */}
      <div className="grid md:grid-cols-3">
        {PURPLE_CARDS.map((card) => (
          <div key={card.title} className="bg-purple-700 text-white p-10 flex flex-col gap-4 group hover:bg-purple-800 transition-colors">
            <div className="text-purple-200 group-hover:text-white transition-colors">{card.icon}</div>
            <h3 className="font-black uppercase tracking-wide text-lg">{card.title}</h3>
            <p className="text-purple-200 text-sm leading-relaxed flex-1">{card.desc}</p>
            <a href="#contacto" className="inline-block border border-white text-white hover:bg-white hover:text-purple-700 font-bold uppercase tracking-widest text-xs px-4 py-2 transition-colors self-start mt-2">
              {card.cta}
            </a>
          </div>
        ))}
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
  return (
    <section id="testimonios" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-black uppercase text-gray-800 tracking-wide">TESTIMONIOS</h2>
          <div className="w-16 h-1 bg-purple-700 mx-auto mt-4 mb-4" />
          <p className="text-gray-600 max-w-lg mx-auto text-sm">Voces reales de personas que viven con lupus en El Salvador y comparten su experiencia.</p>
        </div>

        <div className="bg-white shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-5">
            <div className="md:col-span-2 relative bg-purple-900" style={{ minHeight: 320 }}>
              <img src={TESTIMONIALS[active].img} alt={TESTIMONIALS[active].name} className="w-full h-full object-cover opacity-60 absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-900/40 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xl font-bold">{TESTIMONIALS[active].name}</p>
                <p className="text-purple-300 text-sm">{TESTIMONIALS[active].city} · {TESTIMONIALS[active].years} años con diagnóstico</p>
              </div>
            </div>
            <div className="md:col-span-3 p-10 flex flex-col justify-center">
              <span className="text-7xl text-purple-100 font-serif leading-none">"</span>
              <p className="text-gray-700 text-lg italic leading-relaxed -mt-4 mb-8" style={{ fontFamily: "Lora, serif" }}>
                {TESTIMONIALS[active].quote}
              </p>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)} className={`h-2 rounded-full transition-all ${i === active ? "bg-purple-700 w-8" : "bg-gray-300 w-4 hover:bg-purple-400"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          {TESTIMONIALS.map((t, i) => (
            <button key={t.name} onClick={() => setActive(i)} className={`text-left relative overflow-hidden h-40 group ${i === active ? "ring-2 ring-purple-700" : ""}`}>
              <img src={t.img} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-900/20 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="font-bold text-sm">{t.name}</p>
                <p className="text-xs text-purple-300">{t.city}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   "NO ESTÁS SOL@" BANNER
═══════════════════════════════════════ */
function SolBanner() {
  return (
    <section className="bg-purple-700 py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="text-white opacity-60">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div className="text-white">
            <p className="text-xl font-black uppercase tracking-wide">NO ESTÁS SOL@ FRENTE AL LUPUS</p>
            <p className="text-purple-200 text-sm">¿Tienes preguntas? <span className="font-semibold">Estamos para ayudarte.</span></p>
          </div>
        </div>
        <a href="#contacto" className="border-2 border-white text-white hover:bg-white hover:text-purple-700 font-black uppercase tracking-widest text-sm px-8 py-3 transition-colors flex-shrink-0">
          CONTACTA CON NOSOTROS
        </a>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   REDES SOCIALES
═══════════════════════════════════════ */
const SOCIALS_FULL = [
  { name: "Facebook", handle: "@LupusElSalvador", color: "#1877f2", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { name: "Instagram", handle: "@lupus_sv", color: "#e1306c", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
  { name: "TikTok", handle: "@lupus.sv", color: "#010101", icon: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.69a8.13 8.13 0 004.77 1.52V6.75a4.85 4.85 0 01-1.01-.06z" },
  { name: "YouTube", handle: "Lupus El Salvador", color: "#ff0000", icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
  { name: "WhatsApp", handle: "+503 7000-0000", color: "#25d366", icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" },
];

function RedesSociales() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-black uppercase text-gray-800 tracking-wide mb-2">SÍGUENOS EN REDES</h2>
        <div className="w-12 h-1 bg-purple-700 mx-auto mb-8" />
        <div className="flex flex-wrap justify-center gap-4">
          {SOCIALS_FULL.map((s) => (
            <a key={s.name} href="#" className="flex items-center gap-3 border border-gray-200 hover:border-transparent hover:shadow-lg px-5 py-3 transition-all group rounded-sm">
              <svg className="w-6 h-6 transition-colors" style={{ color: s.color }} fill="currentColor" viewBox="0 0 24 24">
                <path d={s.icon} />
              </svg>
              <div className="text-left">
                <p className="font-bold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">{s.name}</p>
                <p className="text-xs text-gray-500">{s.handle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   CONTACTO
═══════════════════════════════════════ */
function Contacto() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  return (
    <section id="contacto" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-black uppercase text-gray-800 tracking-wide mb-2">CONTACTO</h2>
          <div className="w-12 h-1 bg-purple-700 mb-8" />

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p className="font-bold text-gray-800 text-sm uppercase tracking-wide">HORARIO</p>
              </div>
              <p className="text-gray-600 text-sm">Lunes – Viernes: 8:00 – 16:00</p>
              <p className="text-gray-600 text-sm">Sábados: Cerrado</p>
              <p className="text-gray-600 text-sm">Domingos y festivos: Cerrado</p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                </div>
                <p className="font-bold text-gray-800 text-sm uppercase tracking-wide">DÓNDE ESTAMOS</p>
              </div>
              <p className="text-gray-600 text-sm">Colonia Escalón, 3a Calle Pte.</p>
              <p className="text-gray-600 text-sm">San Salvador, El Salvador</p>
              <p className="text-gray-600 text-sm">Tel: +503 2222-0000</p>
              <p className="text-gray-600 text-sm">lupussv@asociacion.org.sv</p>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="w-full h-56 bg-purple-50 border border-purple-200 flex items-center justify-center relative overflow-hidden rounded-sm">
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="absolute border-gray-400" style={{ top: `${i * 14}%`, left: 0, right: 0, borderTopWidth: 1, borderStyle: "solid" }} />
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="absolute border-gray-400" style={{ left: `${i * 11}%`, top: 0, bottom: 0, borderLeftWidth: 1, borderStyle: "solid" }} />
              ))}
            </div>
            <div className="text-center text-purple-600">
              <svg className="w-12 h-12 mx-auto mb-2 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <p className="font-semibold text-sm">San Salvador, El Salvador</p>
              <p className="text-xs text-purple-400 mt-1">Ver en Google Maps</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-black uppercase text-gray-800 tracking-wide mb-6">ENVÍANOS UN MENSAJE</h3>
          {!sent ? (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wide text-gray-700 block mb-1">Tu nombre</label>
                <input type="text" required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-purple-600 transition-colors" placeholder="María García" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wide text-gray-700 block mb-1">Correo electrónico</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-purple-600 transition-colors" placeholder="maria@correo.com" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wide text-gray-700 block mb-1">Mensaje</label>
                <textarea required rows={5} value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })} className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-purple-600 transition-colors resize-none" placeholder="¿En qué podemos ayudarte?" />
              </div>
              <button type="submit" className="bg-purple-700 hover:bg-purple-800 text-white font-bold uppercase tracking-widest text-sm py-3 transition-colors">
                ENVIAR MENSAJE
              </button>
            </form>
          ) : (
            <div className="border border-purple-200 bg-purple-50 p-8 text-center">
              <span className="text-4xl block mb-3">🦋</span>
              <p className="font-bold text-purple-800 uppercase tracking-wide">¡Mensaje recibido!</p>
              <p className="text-gray-600 text-sm mt-2">Gracias, {form.nombre}. Te responderemos pronto.</p>
              <button onClick={() => { setSent(false); setForm({ nombre: "", email: "", mensaje: "" }); }} className="mt-4 text-xs text-purple-600 hover:text-purple-800 font-semibold uppercase tracking-wide">
                Enviar otro mensaje
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   DONACIONES
═══════════════════════════════════════ */
function Donaciones() {
  return (
    <section id="donaciones" className="py-16 bg-fuchsia-700 text-white text-center">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-black uppercase tracking-wide mb-4">APOYA NUESTRA CAUSA</h2>
        <p className="text-fuchsia-100 mb-8 leading-relaxed">
          Tu donación nos ayuda a seguir brindando apoyo, información y comunidad a miles de salvadoreños que viven con lupus. Cada aporte cuenta.
        </p>
        <a href="#contacto" className="inline-block border-2 border-white text-white hover:bg-white hover:text-fuchsia-700 font-black uppercase tracking-widest px-10 py-4 transition-colors text-sm">
          DONAR AHORA
        </a>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   FOOTER
═══════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>2024 © Asociación de Lupus El Salvador · Toda la información es educativa, no reemplaza la consulta médica.</p>
        <div className="flex gap-5 text-xs font-semibold uppercase tracking-wide">
          {["Privacidad", "Términos Legales", "Cookies"].map((l) => (
            <a key={l} href="#" className="hover:text-purple-700 transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex gap-3">
          {[
            "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
            "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z",
            "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
            "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
          ].map((path, i) => (
            <a key={i} href="#" className="text-gray-400 hover:text-purple-700 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={path} /></svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

const FUENTES = [
  { grupo: "Lupus y enfermedades autoinmunes", items: [
    "Lupus Foundation of America",
    "Hospital for Special Surgery (HSS) – Lupus Center",
    "Johns Hopkins Lupus Center",
    "American College of Rheumatology",
    "European Alliance of Associations for Rheumatology (EULAR)",
  ]},
  { grupo: "Información médica basada en evidencia", items: [
    "MedlinePlus (National Library of Medicine)",
    "Centers for Disease Control and Prevention (CDC)",
    "World Health Organization (WHO)",
    "Mayo Clinic",
    "Cleveland Clinic",
  ]},
];

function Fuentes() {
  return (
    <section id="fuentes" className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-black uppercase text-gray-800 tracking-wide text-center mb-2">FUENTES DE INFORMACIÓN</h2>
        <div className="w-12 h-1 bg-purple-700 mx-auto mb-8" />
        <div className="grid md:grid-cols-2 gap-8">
          {FUENTES.map((f) => (
            <div key={f.grupo}>
              <h3 className="font-bold text-purple-800 text-sm uppercase tracking-wide mb-3">{f.grupo}</h3>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                {f.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
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
      <DiaCountdown />
      <Noticias />
      <Mision />
      <Apoyo />
      <SolBanner />
      <Testimonios />
      <RedesSociales />
      <Donaciones />
      <Contacto />
      <Footer />
    </div>
  );
}
