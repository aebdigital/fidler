"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  return (
    <header
      id="site-header"
      className="site-header fixed top-0 left-0 right-0 z-50 h-20 md:h-24 bg-white/80 backdrop-blur-md border-b border-zinc-100"
    >
      <div className="mx-auto flex h-full w-[95vw] items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center gap-4" aria-label="Domov">
          <span className="logo-text text-zinc-950">Klampiarstvo Fidler</span>
        </Link>

        <div className="flex items-center justify-end gap-8">
          <nav className="hidden md:flex items-center gap-8 text-sm font-black uppercase tracking-widest text-zinc-950">
            <Link href="/" className={`transition-all hover:underline underline-offset-8 decoration-2 ${pathname === "/" ? "underline" : ""}`}>Domov</Link>
            <Link href="/sluzby/pozinok" className={`transition-all hover:underline underline-offset-8 decoration-2 ${pathname.startsWith("/sluzby") ? "underline" : ""}`}>Služby</Link>
            <Link href="/referencie" className={`transition-all hover:underline underline-offset-8 decoration-2 ${pathname.startsWith("/referencie") ? "underline" : ""}`}>Referencie</Link>
            {pathname === "/" && (
              <Link href="/#onas" className="transition-all hover:underline underline-offset-8 decoration-2">O nás</Link>
            )}
          </nav>
          <Link
            href="/kontakt"
            className="group flex items-center justify-center bg-zinc-950 px-8 py-3.5 text-sm font-black uppercase tracking-widest text-white shadow-sm transition-all hover:bg-primary"
          >
            <span className="hover-split-text"><span className="hover-split-text-inner" data-text="Kontakt">Kontakt</span></span>
          </Link>
        </div>
      </div>
    </header>
  );
}
