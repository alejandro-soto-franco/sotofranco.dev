import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black flex items-center justify-center px-6">
      <div className="max-w-3xl w-full space-y-10 py-24">

        {/* Name */}
        <h1 className="text-4xl font-semibold tracking-tight">
          Alejandro Soto Franco
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-neutral-700 leading-relaxed">
          Mathematician · Quant Researcher · Systems Engineer  
          <br />
          PDE theory, geometric analysis, high-performance systems (Rust/CUDA), and
          relational value dynamics.
        </p>

        {/* Navigation */}
        <nav className="space-y-3">
          <SectionLink href="/research">Research</SectionLink>
          <SectionLink href="/notes">Technical Notes</SectionLink>
          <SectionLink href="/rvt">Relational Value Theory</SectionLink>
          <SectionLink href="/nse">Navier–Stokes Program</SectionLink>
          <SectionLink href="/projects">Software & Engineering</SectionLink>
          <SectionLink href="/about">About / CV</SectionLink>
        </nav>

        {/* Footer */}
        <footer className="pt-10 text-neutral-500 text-sm">
          © {new Date().getFullYear()} · sotofranco.dev
        </footer>
      </div>
    </main>
  );
}

function SectionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block text-lg font-medium text-neutral-900 hover:text-black"
    >
      {children}
    </Link>
  );
}
