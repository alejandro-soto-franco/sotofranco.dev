import type { Metadata } from "next";
import "./globals.css";
import ClientKatex from "./components/ClientKatex";

export const metadata: Metadata = {
  title: "Alejandro Soto Franco",
  description: "Mathematics · Quant Research · Systems Engineering",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-body bg-[var(--background)] text-[var(--foreground)]">
        <ClientKatex />
        {children}
      </body>
    </html>
  );
}
