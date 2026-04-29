"use client";
import { useState, useEffect } from 'react';
import { Orbitron } from 'next/font/google';
import { supabase } from '../../lib/supabaseClient'; // Importamos la conexión

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-orbitron' });

export default function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estado para nuevo producto
  const [newProd, setNewProd] = useState({ 
    name: '', 
    category: 'repuestos', 
    price_public: 0, 
    price_gremio: 0, 
    stock: 0, 
    image_url: '' 
  });

  // 1. Cargar productos existentes al iniciar
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false });
    if (error) console.error("Error cargando:", error);
    else setProductos(data || []);
    setLoading(false);
  };

  // 2. Función para guardar en Supabase
  const handleSave = async () => {
    if(!newProd.name) return alert("Poné un nombre!");
    
    const { error } = await supabase.from('products').insert([newProd]);
    
    if (error) {
      alert("Error al guardar: " + error.message);
    } else {
      alert("¡Producto guardado con éxito!");
      setNewProd({ name: '', category: 'repuestos', price_public: 0, price_gremio: 0, stock: 0, image_url: '' });
      fetchProducts(); // Recargamos la lista
    }
  };

  // 3. Función para eliminar
  const handleDelete = async (id) => {
    if(confirm("¿Seguro borrás este producto?")) {
      await supabase.from('products').delete().match({ id });
      fetchProducts();
    }
  };

  return (
    <main className={`min-h-screen bg-[#0A0A0A] text-white p-8 ${orbitron.variable}`}>
      <div className="max-w-5xl mx-auto">
        
        <header className="mb-12 border-b border-white/10 pb-4">
          <h1 className={`${orbitron.className} text-3xl text-fuchsia-500`}>
            Panel de Administración
          </h1>
          <p className="text-gray-500 text-sm">Conectado a Supabase.</p>
        </header>

        {/* FORMULARIO DE CARGA */}
        <section className="bg-[#161616] border border-fuchsia-500/30 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Cargar Producto Nuevo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Nombre (ej: Pantalla Samsung A54)" 
              value={newProd.name}
              onChange={e => setNewProd({...newProd, name: e.target.value})}
              className="bg-black border border-white/20 p-3 rounded-lg text-white"
            />
            <select 
              value={newProd.category}
              onChange={e => setNewProd({...newProd, category: e.target.value})}
              className="bg-black border border-white/20 p-3 rounded-lg text-white"
            >
              <option value="repuestos">Repuestos</option>
              <option value="accesorios">Accesorios</option>
              <option value="regaleria">Regalería</option>
            </select>
            <input 
              type="number" 
              placeholder="Precio Público" 
              value={newProd.price_public}
              onChange={e => setNewProd({...newProd, price_public: Number(e.target.value)})}
              className="bg-black border border-white/20 p-3 rounded-lg text-white"
            />
             <input 
              type="number" 
              placeholder="Precio Gremio" 
              value={newProd.price_gremio}
              onChange={e => setNewProd({...newProd, price_gremio: Number(e.target.value)})}
              className="bg-black border border-white/20 p-3 rounded-lg text-white"
            />
            <input 
              type="number" 
              placeholder="Stock" 
              value={newProd.stock}
              onChange={e => setNewProd({...newProd, stock: Number(e.target.value)})}
              className="bg-black border border-white/20 p-3 rounded-lg text-white"
            />
             <input 
              type="text" 
              placeholder="URL de Imagen" 
              value={newProd.image_url}
              onChange={e => setNewProd({...newProd, image_url: e.target.value})}
              className="bg-black border border-white/20 p-3 rounded-lg text-white"
            />
          </div>
          <button 
            onClick={handleSave}
            className="mt-4 bg-fuchsia-600 hover:bg-fuchsia-700 px-6 py-3 rounded-lg font-bold transition-colors"
          >
            Guardar en Base de Datos
          </button>
        </section>

        {/* LISTA DE PRODUCTOS GUARDADOS */}
        <section className="bg-[#161616] border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Inventario Actual</h2>
          {loading ? <p>Cargando...</p> : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-white/20 text-gray-400">
                  <tr>
                    <th className="p-2">Nombre</th>
                    <th className="p-2">Categoría</th>
                    <th className="p-2">P. Público</th>
                    <th className="p-2">P. Gremio</th>
                    <th className="p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((p: any) => (
                    <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="p-2 font-medium">{p.name}</td>
                      <td className="p-2"><span className="bg-cyan-900 text-cyan-300 px-2 py-0.5 rounded text-xs">{p.category}</span></td>
                      <td className="p-2">${p.price_public.toLocaleString()}</td>
                      <td className="p-2 text-fuchsia-400">${p.price_gremio.toLocaleString()}</td>
                      <td className="p-2">
                        <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:underline text-xs">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}