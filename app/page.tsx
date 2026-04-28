"use client";
import { useState } from 'react';
import { Orbitron } from 'next/font/google';
import { useStore } from '../context/StoreContext'; // Importamos el cerebro

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-orbitron' });

// --- DATOS REALES (Simulación de Base de Datos) ---
const productosTech = [
  { id: 1, nombre: "Pantalla Samsung A54", precioPublico: 45000, precioGremio: 32000, img: "https://placehold.co/300x300/1a1a1a/00ffff?text=Pantalla" },
  { id: 2, nombre: "Batería iPhone 13", precioPublico: 28000, precioGremio: 19000, img: "https://placehold.co/300x300/1a1a1a/00ffff?text=Bateria" },
  { id: 3, nombre: "Conector Type-C", precioPublico: 8500, precioGremio: 5000, img: "https://placehold.co/300x300/1a1a1a/00ffff?text=Flex" },
];

const productosRegaleria = [
  { id: 4, nombre: "Auriculares RGB", precioPublico: 18500, precioGremio: 12500, img: "https://placehold.co/300x300/2a0a3a/ff00ff?text=Gamer" },
  { id: 5, nombre: "Lámpara Galaxia", precioPublico: 14000, precioGremio: 9500, img: "https://placehold.co/300x300/2a0a3a/ff00ff?text=Galaxia" },
];

// Datos para la Calculadora
const dispositivos = ["iPhone 11", "iPhone 13", "Samsung A54", "Samsung S23", "Xiaomi Redmi Note 12"];
const problemas: Record<string, { nombre: string; costo: number }[]> = {
  "iPhone 11": [
    { nombre: "Cambio de Pantalla", costo: 25000 },
    { nombre: "Cambio de Batería", costo: 15000 },
    { nombre: "Reparación de Placa", costo: 40000 }
  ],
  "Samsung A54": [
    { nombre: "Cambio de Pantalla", costo: 45000 },
    { nombre: "Cambio de Batería", costo: 18000 },
    { nombre: "Puerto de Carga", costo: 9000 }
  ],
  // Agregá más según necesites
  "default": [
    { nombre: "Diagnóstico General", costo: 5000 },
    { nombre: "Limpieza de Software", costo: 4000 }
  ]
};

export default function Home() {
  // Hooks del cerebro
  const { esGremio, toggleGremio, carrito, agregarAlCarrito, totalCarrito } = useStore();

  // Estados locales para modales y calculadora
  const [showCalculadora, setShowCalculadora] = useState(false);
  const [showCarrito, setShowCarrito] = useState(false);
  
  // Estados de la calculadora
  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedProblem, setSelectedProblem] = useState("");
  const [quotePrice, setQuotePrice] = useState(0);

  // Lógica de la calculadora
  const handleDeviceChange = (e: any) => {
    const device = e.target.value;
    setSelectedDevice(device);
    setSelectedProblem(""); // Reset problema
    setQuotePrice(0);
  };

  const handleProblemChange = (e: any) => {
    const problemName = e.target.value;
    setSelectedProblem(problemName);
    
    // Buscar costo
    const deviceProblems = problemas[selectedDevice] || problemas["default"];
    const problemObj = deviceProblems.find(p => p.nombre === problemName);
    if (problemObj) setQuotePrice(problemObj.costo);
  };

  const obtenerProblemas = () => {
    return problemas[selectedDevice] || problemas["default"];
  };

  return (
    <main className={`min-h-screen bg-[#0A0A0A] text-white ${orbitron.variable}`}>
      
      {/* --- HEADER FUNCIONAL --- */}
      <nav className="w-full flex justify-between items-center p-6 border-b border-white/10 sticky top-0 bg-[#0A0A0A]/90 backdrop-blur-md z-40">
        <div className={`${orbitron.className} text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500`}>
          CDE MOBILE
        </div>
        
        <ul className="hidden md:flex gap-8 text-sm font-medium items-center text-gray-300">
          <li className="hover:text-white cursor-pointer">Inicio</li>
          <li className="hover:text-white cursor-pointer">Tienda</li>
          <li onClick={toggleGremio} className={`cursor-pointer font-bold px-3 py-1 rounded border transition-all ${esGremio ? "bg-fuchsia-600 border-fuchsia-400 text-white" : "border-fuchsia-500/50 text-fuchsia-400"}`}>
            {esGremio ? "✓ Modo Gremio" : "Acceso Gremio"}
          </li>
        </ul>

        <div className="flex gap-3 items-center">
          {/* Botón Carrito con Contador */}
          <button onClick={() => setShowCarrito(true)} className="relative bg-white/10 hover:bg-white/20 p-2 rounded-lg text-lg transition-colors">
            🛒
            {carrito.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {carrito.length}
              </span>
            )}
          </button>
          
          {/* Botón Calculadora */}
          <button onClick={() => setShowCalculadora(true)} className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-lg shadow-cyan-500/20">
            Cotizar Reparación
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative py-32 px-4 text-center flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.1)_0%,_transparent_70%)]"></div>
        <h1 className={`${orbitron.className} relative z-10 text-6xl md:text-9xl font-black uppercase tracking-wider mb-6`}
          style={{ color: '#0ff', textShadow: '0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #00ffff' }}>
          CDE MOBILE
        </h1>
        <p className="relative z-10 text-gray-400 text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
          Sistema Integrado de Reparaciones y Ventas
        </p>
      </section>

      {/* --- GRILLA DE PRODUCTOS CON LÓGICA --- */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Tienda Técnica</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {productosTech.map((prod) => (
              <div key={prod.id} className="bg-[#161616] p-4 rounded-xl border border-white/5 hover:border-cyan-500/50 transition-all flex flex-col">
                <img src={prod.img} alt={prod.nombre} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className="font-semibold text-sm">{prod.nombre}</h3>
                <p className={`text-lg font-bold mt-1 ${esGremio ? "text-fuchsia-400" : "text-white"}`}>
                  ${(esGremio ? prod.precioGremio : prod.precioPublico).toLocaleString()}
                </p>
                <button 
                  onClick={() => agregarAlCarrito(prod)}
                  className="mt-auto bg-white/10 hover:bg-white/20 text-white text-xs py-2 rounded-lg mt-4 transition-colors"
                >
                  Agregar al Carrito
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MODAL CALCULADORA --- */}
      {showCalculadora && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowCalculadora(false)}>
          <div className="bg-[#111] border border-cyan-500/30 p-8 rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className={`${orbitron.className} text-2xl text-cyan-400 mb-6 text-center`}>Calculadora de Reparación</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs block mb-1">1. Seleccioná tu Equipo</label>
                <select value={selectedDevice} onChange={handleDeviceChange} className="w-full bg-black border border-white/20 p-3 rounded-lg text-white outline-none focus:border-cyan-500">
                  <option value="">-- Elegir --</option>
                  {dispositivos.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              {selectedDevice && (
                <div className="animate-fade-in">
                  <label className="text-gray-400 text-xs block mb-1">2. ¿Qué problema tiene?</label>
                  <select value={selectedProblem} onChange={handleProblemChange} className="w-full bg-black border border-white/20 p-3 rounded-lg text-white outline-none focus:border-cyan-500">
                    <option value="">-- Elegir --</option>
                    {obtenerProblemas().map(p => <option key={p.nombre} value={p.nombre}>{p.nombre}</option>)}
                  </select>
                </div>
              )}

              {quotePrice > 0 && (
                <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500 rounded-lg text-center animate-fade-in">
                  <p className="text-gray-300 text-sm">Precio estimado:</p>
                  <p className="text-4xl font-bold text-cyan-400">${quotePrice.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">Incluye mano de obra y repuestos</p>
                  <button className="mt-4 bg-white text-black font-bold px-6 py-2 rounded-full text-sm hover:bg-gray-200 transition-colors">
                    Solicitar Presupuesto
                  </button>
                </div>
              )}
            </div>

            <button onClick={() => setShowCalculadora(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">✕</button>
          </div>
        </div>
      )}

      {/* --- MODAL CARRITO --- */}
      {showCarrito && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowCarrito(false)}>
          <div className="bg-[#111] border border-white/10 p-8 rounded-2xl max-w-md w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <h3 className={`${orbitron.className} text-2xl text-white mb-6`}>Tu Carrito</h3>
            
            {carrito.length === 0 ? (
              <p className="text-gray-500 text-center">El carrito está vacío.</p>
            ) : (
              <>
                <ul className="space-y-4 max-h-60 overflow-auto mb-4">
                  {carrito.map((item, index) => (
                    <li key={index} className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-sm">{item.nombre}</span>
                      <span className="font-bold text-fuchsia-400">
                        ${(esGremio ? item.precioGremio : item.precioPublico).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-white/20 pt-4 flex justify-between items-center">
                  <span className="font-bold text-lg">Total:</span>
                  <span className="font-bold text-2xl text-cyan-400">${totalCarrito.toLocaleString()}</span>
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg mt-6 transition-colors">
                  Finalizar Compra (Simulación)
                </button>
              </>
            )}
            <button onClick={() => setShowCarrito(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">✕</button>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center text-gray-600 text-xs border-t border-white/5">
        © 2024 CDE Mobile System.
      </footer>

    </main>
  );
}