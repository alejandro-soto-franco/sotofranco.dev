import Link from "next/link";
import Eq from "./components/Eq";
import MathBlock from "./components/MathBlock";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-3xl w-full space-y-10 py-24">

      {/* Name */}
      <h1 className="text-5xl font-semibold tracking-tight">
        Alejandro Soto Franco
      </h1>

      {/* Subtitle */}
      <p className="text-xl leading-relaxed text-neutral-700 dark:text-neutral-300">
      Mathematician · Quant Researcher · Systems Engineer
      </p>

      <p className="text-xl leading-relaxed text-neutral-700 dark:text-neutral-300 mt-4">
      PDE theory, geometric analysis, high-performance systems (Rust/CUDA),
      relational value dynamics, and mathematical physics.
      </p>


        {/* Navigation */}
        <nav className="space-y-3">
          <SectionLink href="/nse">Navier-Stokes Program</SectionLink>
        </nav>

        {/* Footer */}
        <footer className="pt-10 text-neutral-500 text-sm dark:text-neutral-400">
          © {new Date().getFullYear()} · sotofranco.dev · all rights reserved
        </footer>
      </div>
    </main>
  );
}

function SectionLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block text-lg font-medium text-neutral-900 hover:text-black dark:text-neutral-200 dark:hover:text-white"
    >
      {children}
    </Link>
  );
}
