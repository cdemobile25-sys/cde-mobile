// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "../context/StoreContext"; // <--- IMPORTAR

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CDE Mobile System",
  description: "Gestión de reparaciones y ventas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <StoreProvider> {/* <--- ENVOLVER CHILDREN */}
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}