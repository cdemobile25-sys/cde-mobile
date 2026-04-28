"use client";
import { useState } from 'react';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-orbitron' });

// --- DATOS DE PRUEBA (Simulación) ---
const productosTech = [
  { id: 1, nombre: "Pantalla Samsung A54", precioPublico: 45000, precioGremio: 32000, img: "https://placehold.co/300x300/1a1a1a/00ffff?text=Pantalla" },
  { id: 2, nombre: "Batería iPhone 13", precioPublico: 28000, precioGremio: 19000, img: "https://placehold.co/300x300/1a1a1a/00ffff?text=Bateria" },
  { id: 3, nombre: "Conector Type-C", precioPublico: 8500, precioGremio: 5000, img: "https://placehold.co/300x300/1a1a1a/00ffff?text=Flex" },
];

const productosRegaleria = [
  { id: 4, nombre: "Auriculares RGB", precioPublico: 18500, precioGremio: 12500, img: "https://placehold.co/300x300/2a0a3a/ff00ff?text=Gamer" },
  { id: 5, nombre: "Lámpara Galaxia", precioPublico: 14000, precioGremio: 9500, img: "https://placehold.co/300x300/2a0a3a/ff00ff?text=Galaxia" },
];

const reviews = [
  { id: 1, nombre: "Carlos G.", texto: "Excelente servicio. Rápidos y confiables.", stars: 5 },
  { id: 2, nombre: "María L.", texto: "Muy buena atención.", stars: 5 },
];

const portfolioTrabajos = [
  { id: 1, titulo: "iPhone 11 Restaurado", desc: "Pantalla y batería nueva.", img: "https://placehold.co/600x400/111/fff?text=iPhone+11" },
  { id: 2, titulo: "Samsung S22 Ultra", desc: "Reparación placa madre.", img: "https://placehold.co/600x400/111/fff?text=Samsung" },
];

export default function Home() {
  // Estados locales (Todo en uno para que no falle)
  const [esGremio, setEsGremio] = useState(false);
  const [carrito, setCarrito] = useState<any[]>([]);
  
  const [showCalc, setShowCalc] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [lightbox, setLightbox] = useState<any>(null);
  
  const [device, setDevice] = useState("");
  const [problem, setProblem] = useState("");
  const [quote, setQuote] = useState(0);

  // Funciones lógicas
  const toggleGremio = () => setEsGremio(!esGremio);
  
  const agregarAlCarrito = (producto: any) => {
    setCarrito([...carrito, producto]);
    alert(`✅ Agregaste: ${producto.nombre}`);
  };

  const totalCarrito = carrito.reduce((acc, prod) => {
    const precio = esGremio ? prod.precioGremio : prod.precioPublico;
    return acc + precio;
  }, 0);

  const handleCalc = (p: string) => {
    setProblem(p);
    // Lógica simple de calculadora
    let costo = 0;
    if (device === "iPhone 11" && p === "Pantalla") costo = 25000;
    if (device === "iPhone 11" && p === "Batería") costo = 15000;
    if (device === "Samsung A54" && p === "Pantalla") costo = 45000;
    if (device === "Samsung A54" && p === "Carga") costo = 9000;
    if (costo === 0) costo = 5000; // Default diagnóstico
    setQuote(costo);
  };

  return (
    <main className={`min-h-screen bg-[#0A0A0A] text-white ${orbitron.variable}`}>
      
      {/* HEADER */}
      <nav className="w-full flex justify-between items-center p-6 border-b border-white/10 sticky top-0 bg-[#0A0A0A]/95 backdrop-blur-md z-40">
        <div className={`${orbitron.className} text-2xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent`}>
          CDE MOBILE
        </div>
        
        <ul className="hidden md:flex gap-8 text-sm font-medium items-center text-gray-300">
          <li className="hover:text-white cursor-pointer">Inicio</li>
          <li onClick={() => setShowCalc(true)} className="hover:text-cyan-400 cursor-pointer">Reparaciones</li>
          <li onClick={toggleGremio} className={`cursor-pointer font-bold px-3 py-1 rounded border transition-all ${esGremio ? "bg-fuchsia-600 border-fuchsia-400 text-white" : "border-fuchsia-500/50 text-fuchsia-400"}`}>
            {esGremio ? "✓ Modo Gremio" : "Acceso Gremio"}
          </li>
        </ul>

        <div className="flex gap-3 items-center">
          <button onClick={() => setShowCart(true)} className="relative bg-white/10 hover:bg-white/20 p-2 rounded-lg text-lg transition-colors">
            🛒
            {carrito.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{carrito.length}</span>}
          </button>
          <button onClick={() => setShowCalc(true)} className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-lg shadow-cyan-500/20">
            Cotizar
          </button>
        </div>
      </nav>

      {/* HERO (Título Violeta) */}
      <section className="relative py-32 px-4 text-center flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.15)_0%,_transparent_70%)]"></div>
        
        <h1 className={`${orbitron.className} relative z-10 text-6xl md:text-9xl font-black uppercase tracking-wider mb-6 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-white bg-clip-text text-transparent drop-shadow-lg`}>
          CDE MOBILE
        </h1>
        
        <p className="relative z-10 text-gray-400 text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
          Servicio Técnico Profesional y Tienda Online
        </p>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-4">
          <button onClick={() => setShowCalc(true)} className="bg-fuchsia-600 text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-fuchsia-700 transition-all shadow-lg shadow-fuchsia-600/30">
            Calcular Reparación
          </button>
        </div>
      </section>

      {/* RESEÑAS */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Opiniones</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.id} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
                <div className="flex gap-1 mb-3 text-yellow-400">
                  {Array(r.stars).fill("★").map((s, i) => <span key={i}>{s}</span>)}
                </div>
                <p className="text-gray-300 text-sm mb-4 italic">"{r.texto}"</p>
                <p className="text-white font-semibold text-sm">{r.nombre}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTOS TECH */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Tienda Técnica</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {productosTech.map((p) => (
              <div key={p.id} className="bg-[#161616] p-4 rounded-xl border border-white/5 hover:border-cyan-500/50 transition-all flex flex-col">
                <img src={p.img} alt={p.nombre} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className="font-semibold text-sm">{p.nombre}</h3>
                <p className={`text-lg font-bold mt-1 ${esGremio ? "text-fuchsia-400" : "text-white"}`}>
                  ${(esGremio ? p.precioGremio : p.precioPublico).toLocaleString()}
                </p>
                <button onClick={() => agregarAlCarrito(p)} className="mt-auto bg-white/10 hover:bg-white/20 text-white text-xs py-2 rounded-lg mt-4">Agregar</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="py-20 px-4 bg-[#080808]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Trabajos Recientes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {portfolioTrabajos.map((w) => (
              <div key={w.id} onClick={() => setLightbox(w)} className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square">
                <img src={w.img} alt={w.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                  <p className="text-white font-bold text-sm text-center px-2">{w.titulo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGALERÍA */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-fuchsia-950/20 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Regalería</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {productosRegaleria.map((p) => (
              <div key={p.id} className="bg-[#111] rounded-xl border border-fuchsia-500/20 p-4 flex flex-col">
                <img src={p.img} alt={p.nombre} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className="font-semibold text-white">{p.nombre}</h3>
                <p className="text-white font-bold mt-1">${(esGremio ? p.precioGremio : p.precioPublico).toLocaleString()}</p>
                <button onClick={() => agregarAlCarrito(p)} className="mt-auto bg-fuchsia-600/20 hover:bg-fuchsia-600/40 border border-fuchsia-500 text-white text-xs py-2 rounded-lg mt-4">Agregar</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050505] pt-16 pb-8 px-4 border-t border-white/5 mt-12">
        <div className="max-w-6xl mx-auto text-center">
            <h3 className={`${orbitron.className} text-2xl text-fuchsia-400 mb-4`}>CDE MOBILE</h3>
            <p className="text-gray-600 text-xs">© 2024 Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* MODALS */}
      {showCalc && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowCalc(false)}>
          <div className="bg-[#111] border border-cyan-500/30 p-8 rounded-2xl max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h3 className={`${orbitron.className} text-2xl text-cyan-400 mb-6 text-center`}>Calculadora</h3>
            <div className="space-y-4">
              <select value={device} onChange={e => { setDevice(e.target.value); setQuote(0); }} className="w-full bg-black border border-white/20 p-3 rounded-lg text-white">
                <option value="">Seleccionar Equipo</option>
                <option value="iPhone 11">iPhone 11</option>
                <option value="Samsung A54">Samsung A54</option>
              </select>
              {device && (
                <select value={problem} onChange={e => handleCalc(e.target.value)} className="w-full bg-black border border-white/20 p-3 rounded-lg text-white">
                  <option value="">Seleccionar Problema</option>
                  <option value="Pantalla">Pantalla</option>
                  <option value="Batería">Batería</option>
                  <option value="Carga">Carga</option>
                </select>
              )}
              {quote > 0 && (
                <div className="p-4 bg-cyan-500/10 border border-cyan-500 rounded-lg text-center mt-4">
                  <p className="text-4xl font-bold text-cyan-400">${quote.toLocaleString()}</p>
                </div>
              )}
            </div>
            <button onClick={() => setShowCalc(false)} className="absolute top-4 right-4 text-white/50">✕</button>
          </div>
        </div>
      )}

      {showCart && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowCart(false)}>
          <div className="bg-[#111] border border-white/10 p-8 rounded-2xl max-w-md w-full relative" onClick={e => e.stopPropagation()}>
            <h3 className={`${orbitron.className} text-2xl text-white mb-6`}>Mi Carrito</h3>
            {carrito.length === 0 ? <p className="text-gray-500 text-center">Vacío</p> : (
              <>
                <ul className="space-y-2 max-h-60 overflow-auto">
                  {carrito.map((item, i) => (
                    <li key={i} className="flex justify-between border-b border-white/10 pb-1">
                      <span className="text-sm">{item.nombre}</span>
                      <span className="text-fuchsia-400">${(esGremio ? item.precioGremio : item.precioPublico).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-white/20 flex justify-between font-bold">
                  <span>Total:</span>
                  <span className="text-cyan-400">${totalCarrito.toLocaleString()}</span>
                </div>
              </>
            )}
            <button onClick={() => setShowCart(false)} className="absolute top-4 right-4 text-white/50">✕</button>
          </div>
        </div>
      )}

      {lightbox && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div className="max-w-lg w-full">
            <img src={lightbox.img} className="w-full rounded-lg mb-4" />
            <h3 className="text-white font-bold">{lightbox.titulo}</h3>
            <p className="text-gray-400 text-sm">{lightbox.desc}</p>
          </div>
        </div>
      )}

      <a href="#" className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white text-3xl w-14 h-14 flex items-center justify-center rounded-full shadow-lg z-50 border-2 border-white/20">💬</a>

    </main>
  );
}