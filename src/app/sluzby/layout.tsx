"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SubpageHero } from "../../components/SubpageHero";

export default function SluzbyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `text-sm font-bold uppercase tracking-widest transition-all hover:underline hover:text-zinc-950 underline-offset-8 decoration-2 ${isActive ? "text-zinc-950 underline" : "text-zinc-500"}`;
  };

  return (
    <>
      <SubpageHero />
      <div className="pt-16 pb-24 bg-zinc-50 min-h-screen">
        <div className="mx-auto w-[95vw] px-6 md:px-10">
          <div className="flex flex-col md:flex-row gap-12">
            <aside className="w-full md:w-1/4">
              <div className="sticky top-32 p-8 rounded-none bg-white shadow-sm border border-zinc-100">
                <h3 className="text-xl font-black uppercase mb-6 text-zinc-950 tracking-tighter">Naše služby</h3>
                <nav className="flex flex-col gap-4">
                  <Link href="/sluzby/pozinok" className={getLinkClass("/sluzby/pozinok")}>Pozinkované plechy</Link>
                  <Link href="/sluzby/med" className={getLinkClass("/sluzby/med")}>Medené strechy</Link>
                  <Link href="/sluzby/titan-zinok" className={getLinkClass("/sluzby/titan-zinok")}>Titán-zinok</Link>
                  <Link href="/sluzby/vyroba-profilov" className={getLinkClass("/sluzby/vyroba-profilov")}>Výroba stavebných profilov</Link>
                </nav>
              </div>
            </aside>
            <main className="w-full md:w-3/4">
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
