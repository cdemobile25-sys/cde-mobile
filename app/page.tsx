"use client";
import { useState, useEffect } from 'react';
import { Orbitron } from 'next/font/google';
import { supabase } from '../lib/supabaseClient'; // Importamos la conexión

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-orbitron' });

const WHATSAPP_NUMBER = "542246516868"; 
const generarLinkWhatsApp = (texto: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;

const WaIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Datos estáticos que no cambiaron (Reviews y Portfolio)
const reviews = [
  { id: 1, nombre: "Carlos G.", texto: "Excelente servicio. Rápidos y confiables.", stars: 5 },
  { id: 2, nombre: "María L.", texto: "Muy buena atención.", stars: 5 },
];

const portfolioTrabajos = [
  { id: 1, titulo: "iPhone 11 Restaurado", desc: "Pantalla y batería nueva.", img: "https://placehold.co/600x400/111/fff?text=iPhone+11" },
  { id: 2, titulo: "Samsung S22 Ultra", desc: "Reparación placa madre.", img: "https://placehold.co/600x400/111/fff?text=Samsung" },
  { id: 3, titulo: "Xiaomi Redmi", desc: "Cambio de conector.", img: "https://placehold.co/600x400/111/fff?text=Xiaomi" },
  { id: 4, titulo: "PS5 Limpieza", desc: "Mantenimiento total.", img: "https://placehold.co/600x400/111/fff?text=PS5" },
];

export default function Home() {
  const [esGremio, setEsGremio] = useState(false);
  const [carrito, setCarrito] = useState<any[]>([]);
  
  // ESTADOS PARA BASE DE DATOS
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCalc, setShowCalc] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showGremioForm, setShowGremioForm] = useState(false);
  const [lightbox, setLightbox] = useState<any>(null);
  
  const [device, setDevice] = useState("");
  const [problem, setProblem] = useState("");
  const [quote, setQuote] = useState(0);

  const [activeFilter, setActiveFilter] = useState("todos");

  // --- CONEXIÓN A BASE DE DATOS ---
  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) console.error("Error trayendo productos", error);
    else setProductos(data || []);
    setLoading(false);
  };

  // Lógica existente
  const toggleGremio = () => {
    if (!esGremio) setShowGremioForm(true);
    else setEsGremio(false);
  };
  
  const agregarAlCarrito = (producto: any) => {
    setCarrito([...carrito, producto]);
    alert(`✅ Agregaste: ${producto.name}`);
  };

  const totalCarrito = carrito.reduce((acc, prod) => {
    const precio = esGremio ? prod.price_gremio : prod.price_public;
    return acc + precio;
  }, 0);

  const handleCalc = (p: string) => {
    setProblem(p);
    let costo = 0;
    if (device === "iPhone 11" && p === "Pantalla") costo = 25000;
    if (device === "iPhone 11" && p === "Batería") costo = 15000;
    if (device === "Samsung A54" && p === "Pantalla") costo = 45000;
    if (device === "Samsung A54" && p === "Carga") costo = 9000;
    if (costo === 0) costo = 5000;
    setQuote(costo);
  };

  const productosFiltrados = activeFilter === "todos" 
    ? productos 
    : productos.filter(p => p.category === activeFilter);

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

      {/* HERO */}
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
          <a href={generarLinkWhatsApp("Hola! Quiero hacer una consulta.")} target="_blank" rel="noopener noreferrer" className="border border-white/30 py-4 px-10 rounded-full text-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700">
            <WaIcon /> Contactar
          </a>
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

      {/* TIENDA (Ahora dinámica) */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Tienda</h2>
          
          {/* Filtros */}
          <div className="flex flex-wrap gap-3 mb-8">
            {["todos", "repuestos", "accesorios", "regaleria"].map((cat) => (
              <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-4 py-2 rounded-full text-sm border transition-all ${activeFilter === cat ? "bg-fuchsia-600 border-fuchsia-400 text-white" : "border-white/20 text-gray-400 hover:bg-white/10"}`}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {loading ? <p className="text-center text-gray-500">Cargando productos...</p> : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {productosFiltrados.length === 0 ? <p className="col-span-3 text-center text-gray-500">No hay productos en esta categoría. Cargá algunos desde el Admin.</p> : 
              productosFiltrados.map((p) => (
                <div key={p.id} className="bg-[#161616] p-4 rounded-xl border border-white/5 hover:border-cyan-500/50 transition-all flex flex-col">
                  <img src={p.image_url || "https://placehold.co/300x300/1a1a1a/00ffff?text=Sin+Img"} alt={p.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                  <h3 className="font-semibold text-sm">{p.name}</h3>
                  <p className={`text-lg font-bold mt-1 ${esGremio ? "text-fuchsia-400" : "text-white"}`}>
                    ${(esGremio ? p.price_gremio : p.price_public).toLocaleString()}
                  </p>
                  
                  <div className="mt-auto flex gap-2 mt-4">
                    <button onClick={() => agregarAlCarrito(p)} className="flex-1 bg-white/10 hover:bg-white/20 text-white text-xs py-2 rounded-lg transition-colors">
                      Agregar
                    </button>
                    <a href={generarLinkWhatsApp(`Hola! Consulta por: *${p.name}* ($${(esGremio ? p.price_gremio : p.price_public).toLocaleString()})`)} target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs py-2 rounded-lg transition-colors flex items-center justify-center">
                      <WaIcon /> Consultar
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* GALERÍA */}
      <section className="py-20 px-4 bg-[#080808]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Trabajos Recientes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {portfolioTrabajos.map((w) => (
              <div key={w.id} onClick={() => setLightbox(w)} className="relative group cursor-pointer overflow-hidden rounded-lg aspect-video sm:aspect-square">
                <img src={w.img} alt={w.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                  <p className="text-white font-bold text-sm text-center px-2">{w.titulo}</p>
                </div>
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

      {/* MODALS (Igual que antes) */}
      {showCalc && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowCalc(false)}>
          <div className="bg-[#111] border border-cyan-500/30 p-8 rounded-2xl max-w-md w-full relative" onClick={e => e.stopPropagation()}>
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
                  <option value="Carga">Puerto de Carga</option>
                </select>
              )}
              {quote > 0 && (
                <div className="p-4 bg-cyan-500/10 border border-cyan-500 rounded-lg text-center mt-4">
                  <p className="text-sm text-gray-400">Precio estimado:</p>
                  <p className="text-4xl font-bold text-cyan-400">${quote.toLocaleString()}</p>
                  <a href={generarLinkWhatsApp(`Hola! Tengo un *${device}* con problema de *${problem}*. Me pasaron un presupuesto de $${quote.toLocaleString()}.`)} target="_blank" rel="noopener noreferrer" className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <WaIcon /> Consultar
                  </a>
                </div>
              )}
            </div>
            <button onClick={() => setShowCalc(false)} className="absolute top-4 right-4 text-white/50 hover:text-white text-xl">✕</button>
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
                      <span className="text-sm">{item.name}</span>
                      <span className="text-fuchsia-400">${(esGremio ? item.price_gremio : item.price_public).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-white/20 flex justify-between font-bold">
                  <span>Total:</span>
                  <span className="text-cyan-400">${totalCarrito.toLocaleString()}</span>
                </div>
                <a href={generarLinkWhatsApp(`Hola! Quiero hacer un pedido de:\n${carrito.map(c => `- ${c.name}`).join('\n')}\nTotal: $${totalCarrito.toLocaleString()}`)} target="_blank" rel="noopener noreferrer" className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <WaIcon /> Pedir por WhatsApp
                </a>
              </>
            )}
            <button onClick={() => setShowCart(false)} className="absolute top-4 right-4 text-white/50 hover:text-white text-xl">✕</button>
          </div>
        </div>
      )}

      {showGremioForm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowGremioForm(false)}>
          <div className="bg-[#111] border border-fuchsia-500/30 p-8 rounded-2xl max-w-md w-full relative" onClick={e => e.stopPropagation()}>
            <h3 className={`${orbitron.className} text-2xl text-fuchsia-400 mb-2 text-center`}>Acceso Gremio</h3>
            <p className="text-gray-400 text-sm text-center mb-6">Completá tus datos para acceder a precios mayoristas.</p>
            <div className="space-y-4">
              <input type="text" placeholder="Nombre del Local / Técnico" className="w-full bg-black border border-white/20 p-3 rounded-lg text-white outline-none focus:border-fuchsia-500" />
              <input type="text" placeholder="Localidad" className="w-full bg-black border border-white/20 p-3 rounded-lg text-white outline-none focus:border-fuchsia-500" />
              <input type="tel" placeholder="WhatsApp de contacto" className="w-full bg-black border border-white/20 p-3 rounded-lg text-white outline-none focus:border-fuchsia-500" />
              <button onClick={() => { setEsGremio(true); setShowGremioForm(false); alert("¡Cuenta Gremio activada!"); }} className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 rounded-lg transition-colors">
                Solicitar Acceso
              </button>
            </div>
            <button onClick={() => setShowGremioForm(false)} className="absolute top-4 right-4 text-white/50 hover:text-white text-xl">✕</button>
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

      <a href={generarLinkWhatsApp("Hola! Estoy en la web y necesito ayuda.")} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white text-4xl w-16 h-16 flex items-center justify-center rounded-full shadow-lg z-50 transition-all hover:scale-110 border-2 border-white/20">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

    </main>
  );
}