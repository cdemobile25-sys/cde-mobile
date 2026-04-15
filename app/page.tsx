'use client';

import Link from 'next/link';

const categorias = [
  { nombre: "Pantallas", icono: "📱", slug: "pantallas" },
  { nombre: "Baterías", icono: "🔋", slug: "baterias" },
  { nombre: "Cargadores", icono: "🔌", slug: "cargadores" },
  { nombre: "Fundas", icono: "🛡️", slug: "fundas" },
  { nombre: "Auriculares", icono: "🎧", slug: "auriculares" },
  { nombre: "Cables", icono: "🔗", slug: "cables" },
  { nombre: "Vidrios", icono: "🪟", slug: "vidrios" },
  { nombre: "Memorias", icono: "💾", slug: "memorias" },
];

const productos = [
  { id: 1, nombre: "Pantalla iPhone 11", precio: 25000, imagen: "📱" },
  { id: 2, nombre: "Batería iPhone XR", precio: 8000, imagen: "🔋" },
  { id: 3, nombre: "Cargador Rápido Samsung", precio: 6500, imagen: "🔌" },
  { id: 4, nombre: "Funda iPhone 13", precio: 3500, imagen: "🛡️" },
  { id: 5, nombre: "Auriculares Bluetooth", precio: 12000, imagen: "🎧" },
  { id: 6, nombre: "Cable Lightning", precio: 2500, imagen: "🔗" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] grid-bg">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="https://i.ibb.co/cXhHsZsh/Whats-App-Image-2026-04-07-at-18-41-29.jpg" alt="CDE Mobile" className="w-10 h-10 object-cover rounded-lg border border-cyan-400" />
            <span className="text-lg font-bold gradient-text hidden sm:block">CDE Mobile</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-300 hover:text-cyan-400 font-medium">Inicio</Link>
            <Link href="/productos" className="text-gray-300 hover:text-cyan-400 font-medium">Productos</Link>
            <Link href="/contacto" className="text-gray-300 hover:text-cyan-400 font-medium">Contacto</Link>
          </nav>
          <Link href="/carrito" className="relative p-2 text-gray-300 hover:text-cyan-400">
            <span className="text-2xl">🛒</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-fuchsia-500 rounded-full text-xs flex items-center justify-center text-white font-bold">0</span>
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-32 pb-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-fuchsia-500/10 to-transparent"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10">
          <div className="animate-float mb-6">
            <img src="https://i.ibb.co/cXhHsZsh/Whats-App-Image-2026-04-07-at-18-41-29.jpg" alt="CDE Mobile" className="h-32 mx-auto rounded-2xl border-2 border-cyan-400 glow-box" />
          </div>
          <h1 className="text-6xl font-black mb-4 gradient-text">CDE Mobile</h1>
          <p className="text-2xl text-gray-100 mb-2 font-medium">Repuestos y Accesorios para Celulares</p>
          <p className="text-cyan-400 mb-10 text-lg neon-cyan">📍 Costa Del Este, Buenos Aires</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/542246516868?text=Hola!" target="_blank" className="px-10 py-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full text-black font-bold text-lg hover:scale-110 transition-all glow-box animate-pulse-glow">💬 WhatsApp</a>
            <Link href="/productos" className="px-10 py-4 border-2 border-cyan-400 rounded-full text-cyan-400 font-bold text-lg hover:bg-cyan-400/20 hover:scale-105 transition-all">🛒 Ver Productos</Link>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="py-20 px-4">
        <h2 className="text-4xl font-bold text-center mb-16 gradient-text">📦 Categorías</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {categorias.map((cat, i) => (
            <Link key={i} href={"/productos?categoria=" + cat.slug} className="p-8 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-2xl text-center border border-cyan-500/30 hover:border-cyan-400 card-hover">
              <span className="text-5xl block mb-4">{cat.icono}</span>
              <p className="text-white text-lg font-medium">{cat.nombre}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A]">
        <h2 className="text-4xl font-bold text-center mb-16 gradient-text">⭐ Productos Destacados</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8">
          {productos.map((p) => (
            <div key={p.id} className="bg-[#0A0A0A] rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-400 card-hover">
              <span className="text-6xl block text-center mb-4">{p.imagen}</span>
              <h3 className="text-white text-xl font-semibold mb-3 text-center">{p.nombre}</h3>
              <p className="text-cyan-400 text-2xl font-bold text-center mb-6 neon-cyan">${p.precio.toLocaleString()}</p>
              <button className="w-full py-3 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-xl text-black font-bold hover:scale-105 transition-all">Agregar al Carrito</button>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/productos" className="inline-block px-8 py-3 border-2 border-fuchsia-400 rounded-full text-fuchsia-400 font-bold hover:bg-fuchsia-400/20 transition-all">Ver todos →</Link>
        </div>
      </section>

      {/* ENVÍOS */}
      <section className="py-20 px-4">
        <h2 className="text-4xl font-bold text-center mb-16 gradient-text">🚀 Formas de Envío</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="p-10 bg-[#1A1A1A] rounded-2xl border border-cyan-500/30 text-center card-hover">
            <span className="text-6xl block mb-6">🚚</span>
            <h3 className="text-white text-2xl font-bold mb-3">Correo Argentino</h3>
            <p className="text-gray-400 text-lg">Envíos a todo el país</p>
          </div>
          <div className="p-10 bg-[#1A1A1A] rounded-2xl border border-fuchsia-500/30 text-center card-hover">
            <span className="text-6xl block mb-6">🏍️</span>
            <h3 className="text-white text-2xl font-bold mb-3">Mensajería Local</h3>
            <p className="text-gray-400 text-lg">Costa Del Este</p>
          </div>
          <div className="p-10 bg-[#1A1A1A] rounded-2xl border border-cyan-500/30 text-center card-hover">
            <span className="text-6xl block mb-6">🏪</span>
            <h3 className="text-white text-2xl font-bold mb-3">Retiro en Local</h3>
            <p className="text-gray-400 text-lg">Sin cargo</p>
          </div>
        </div>
      </section>

      {/* HORARIOS */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A]">
        <h2 className="text-4xl font-bold text-center mb-16 gradient-text">🕐 Horarios</h2>
        <div className="max-w-3xl mx-auto bg-[#0A0A0A] rounded-3xl border border-cyan-500/30 p-10 glow-box">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="text-center p-6 bg-[#1A1A1A] rounded-2xl border border-cyan-500/20">
              <p className="text-cyan-400 text-xl font-bold mb-4 neon-cyan">Lunes a Viernes</p>
              <p className="text-white text-2xl mb-2">9:00 a 13:30 hs</p>
              <p className="text-white text-2xl">17:00 a 20:00 hs</p>
            </div>
            <div className="text-center p-6 bg-[#1A1A1A] rounded-2xl border border-fuchsia-500/20">
              <p className="text-fuchsia-400 text-xl font-bold mb-4 neon-magenta">Sábados</p>
              <p className="text-white text-2xl">9:00 a 13:30 hs</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 bg-[#0A0A0A] border-t border-cyan-500/30">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold gradient-text mb-6">CDE Mobile</h3>
          <p className="text-gray-400 mb-4">Repuestos y Accesorios para Celulares</p>
          <div className="flex justify-center gap-8 mb-6">
            <a href="https://wa.me/542246516868" target="_blank" className="text-cyan-400 hover:text-cyan-300">📱 WhatsApp</a>
            <a href="mailto:cdemobile25@gmail.com" className="text-fuchsia-400 hover:text-fuchsia-300">📧 Email</a>
          </div>
          <p className="text-gray-500 text-sm">© 2024 CDE Mobile - Costa Del Este, Buenos Aires</p>
        </div>
      </footer>
    </main>
  );
}