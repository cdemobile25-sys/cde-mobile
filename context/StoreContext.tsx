// context/StoreContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

// Definimos la estructura de un producto
type Product = {
  id: number;
  nombre: string;
  precioPublico: number;
  precioGremio: number;
  img: string;
  tag?: string;
};

// Definimos lo que guarda el cerebro
type StoreContextType = {
  esGremio: boolean;
  toggleGremio: () => void;
  carrito: Product[];
  agregarAlCarrito: (producto: Product) => void;
  vaciarCarrito: () => void;
  totalCarrito: number;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [esGremio, setEsGremio] = useState(false);
  const [carrito, setCarrito] = useState<Product[]>([]);

  const toggleGremio = () => setEsGremio(!esGremio);

  const agregarAlCarrito = (producto: Product) => {
    setCarrito([...carrito, producto]);
    alert(`Agregaste: ${producto.nombre}`);
  };

  const vaciarCarrito = () => setCarrito([]);

  const totalCarrito = carrito.reduce((acc, prod) => {
    const precio = esGremio ? prod.precioGremio : prod.precioPublico;
    return acc + precio;
  }, 0);

  return (
    <StoreContext.Provider value={{ esGremio, toggleGremio, carrito, agregarAlCarrito, vaciarCarrito, totalCarrito }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore debe usarse dentro de StoreProvider");
  return context;
}