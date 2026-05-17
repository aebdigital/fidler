"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Domov" },
  { href: "/sluzby/pozinok", label: "Služby", activeWhen: "/sluzby" },
  { href: "/referencie", label: "Referencie", activeWhen: "/referencie" },
  { href: "/kontakt", label: "Kontakt", activeWhen: "/kontakt" },
];

const serviceLinks = [
  { href: "/sluzby/pozinok", label: "Pozinkované plechy" },
  { href: "/sluzby/med", label: "Medené strechy" },
  { href: "/sluzby/titan-zinok", label: "Titán-zinok" },
  { href: "/sluzby/vyroba-profilov", label: "Výroba stavebných profilov" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const isActive = (link: (typeof navLinks)[number]) => {
    if (link.activeWhen) return pathname.startsWith(link.activeWhen);
    return pathname === link.href;
  };

  return (
    <>
      <header
        id="site-header"
        className="site-header fixed top-0 left-0 right-0 z-50 h-20 md:h-24 bg-white/80 backdrop-blur-md border-b border-zinc-100"
      >
        <div className="mx-auto flex h-full w-[90vw] md:w-[95vw] items-center justify-between md:px-10">
          <Link href="/" className="flex items-center gap-4" aria-label="Domov">
            <span className="logo-text text-zinc-950">Klampiarstvo Fidler</span>
          </Link>

          <div className="flex items-center justify-end gap-8">
            <nav className="hidden md:flex items-center gap-8 text-sm font-black uppercase tracking-widest text-zinc-950">
              <Link href="/" className="group relative py-1">
                Domov
                <span className={`absolute left-0 -bottom-1 h-[2px] w-full bg-zinc-950 transition-transform origin-left duration-300 ease-out ${pathname === "/" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </Link>
              <Link href="/sluzby/pozinok" className="group relative py-1">
                Služby
                <span className={`absolute left-0 -bottom-1 h-[2px] w-full bg-zinc-950 transition-transform origin-left duration-300 ease-out ${pathname.startsWith("/sluzby") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </Link>
              <Link href="/referencie" className="group relative py-1">
                Referencie
                <span className={`absolute left-0 -bottom-1 h-[2px] w-full bg-zinc-950 transition-transform origin-left duration-300 ease-out ${pathname.startsWith("/referencie") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </Link>
            </nav>
            <Link
              href="/kontakt"
              className="hidden md:flex group items-center justify-center bg-zinc-950 px-8 py-3.5 text-sm font-black uppercase tracking-widest text-white shadow-sm transition-all hover:bg-primary"
            >
              <span className="hover-split-text"><span className="hover-split-text-inner" data-text="Kontakt">Kontakt</span></span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Otvoriť menu"
              aria-expanded={open}
              className="md:hidden flex h-12 w-12 items-center justify-center bg-zinc-950 text-white transition-colors hover:bg-primary hover:text-zinc-950"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
              aria-hidden="true"
            />
            <motion.aside
              key="panel"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Hlavné menu"
              className="fixed left-0 top-0 z-[70] flex h-full w-[88vw] max-w-md flex-col bg-zinc-950 text-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">
                <span className="logo-text text-white">Klampiarstvo Fidler</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Zavrieť menu"
                  className="flex h-12 w-12 items-center justify-center border border-white/15 text-white transition-colors hover:bg-white hover:text-zinc-950"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-8 py-10">
                <ul className="space-y-6">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`block text-3xl font-black uppercase italic tracking-tighter transition-colors hover:text-primary ${
                          isActive(link) ? "text-primary" : "text-white"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-12 border-t border-white/10 pt-8">
                  <p className="mb-5 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                    Naše služby
                  </p>
                  <ul className="space-y-3">
                    {serviceLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`block text-sm font-bold uppercase tracking-widest transition-colors hover:text-primary ${
                            pathname === link.href ? "text-primary" : "text-white/70"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>

              <div className="border-t border-white/10 px-8 py-6 text-sm text-white/60">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                  Kontakt
                </p>
                <a
                  href="tel:0905869408"
                  className="block py-1 text-white transition-colors hover:text-primary"
                >
                  0905 869 408
                </a>
                <a
                  href="mailto:jana@klampiarfidler.sk"
                  className="block py-1 text-white transition-colors hover:text-primary"
                >
                  jana@klampiarfidler.sk
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
