"use client";

import Image from "next/image";

import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

type NavItem = {
  href: string;
  label: string;
};

type Service = {
  image: string;
  title: string;
  description: string;
};

type Reference = {
  image: string;
  revealImage: string;
  eyebrow: string;
  title: string;
  location: string;
};

const navItems: NavItem[] = [
  { href: "#top", label: "Ponuka" },
  { href: "#onas", label: "Profil" },
  { href: "#specializacia", label: "Referencie" },
  { href: "#realizacie", label: "Kontakty" },
  { href: "#kontakt", label: "O nás" },
];

const services: Service[] = [
  {
    image: "/service1.jpg",
    title: "Klampiarske práce",
    description: "Ohýbanie 4m profilov a montáž odvodňovacích systémov.",
  },
  {
    image: "/service2.jpg",
    title: "Pokrývačské práce",
    description: "Opravy striech, hydroizolácie a montáž povlakových krytín.",
  },
  {
    image: "/service3.jpg",
    title: "Strešné systémy",
    description: "Montáž drážkovej krytiny z titán-zinok, medi a hliníka.",
  },
];

const specializations = [
  "Drážková krytina",
  "Titán-zinok",
  "Medené strechy",
  "Pozinkované plechy",
  "Farebný hliník",
  "Hydroizolácie",
  "Fasádne systémy",
  "Opravy striech",
];

const references: Reference[] = [
  {
    image: "/ref1.jpg",
    revealImage: "/ref2.jpg",
    eyebrow: "Rodinný dom",
    title: "r.d. Tomašikovo",
    location: "Tomašikovo",
  },
  {
    image: "/ref2.jpg",
    revealImage: "/ref3.jpg",
    eyebrow: "Polyfunkčný dom",
    title: "Polyfunkčný dom",
    location: "Žilina",
  },
  {
    image: "/ref3.jpg",
    revealImage: "/ref4.jpg",
    eyebrow: "Komunikačné centrum",
    title: "Central Passage",
    location: "Bratislava",
  },
  {
    image: "/ref4.jpg",
    revealImage: "/ref5.jpg",
    eyebrow: "Rodinný dom",
    title: "r.d. Koliba",
    location: "Bratislava",
  },
  {
    image: "/ref5.jpg",
    revealImage: "/ref1.jpg",
    eyebrow: "Kostol",
    title: "Kostol",
    location: "Piešťany",
  },
];

function SplitText({ children }: { children: string }) {
  return (
    <span className="hover-split-text">
      <span className="hover-split-text-inner" data-text={children}>
        {children}
      </span>
    </span>
  );
}

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (time: number) => Math.min(1, 1.001 - 2 ** (-10 * time)),
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    const header = document.getElementById("site-header");
    const heroParallax = document.querySelector<HTMLElement>(".hero-parallax");

    const handleScroll = () => {
      header?.classList.toggle("scrolled", window.scrollY > 50);

      if (heroParallax) {
        const speed = Number(heroParallax.dataset.speed ?? 0.1);
        heroParallax.style.transform = `translateY(${window.scrollY * speed}px)`;
      }
    };

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    document
      .querySelectorAll(".reveal-on-scroll")
      .forEach((element) => revealObserver.observe(element));
    document
      .querySelectorAll(".image-reveal-wrapper")
      .forEach((element) => imageObserver.observe(element));

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      revealObserver.disconnect();
      imageObserver.disconnect();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);


  const scrollReferences = (distance: number) => {
    sliderRef.current?.scrollBy({ left: distance, behavior: "smooth" });
  };


  return (
    <>


      <main>
        <section
          id="top"
          className="sticky top-0 z-0 flex h-screen w-full items-center overflow-hidden bg-white"
        >
          <div className="parallax-container pointer-events-none absolute inset-0 overflow-hidden">
            <div className="parallax-target hero-parallax relative h-full w-full scale-110" data-speed="0.1">
              <Image
                fill
                src="/hero.jpg"
                alt="Klampiarstvo Fidler"
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
          <div className="relative z-10 mx-auto w-[95vw] px-6 md:px-10">
            <div className="flex translate-y-12 flex-col items-start">
              <div className="fade-up mb-10 inline-flex items-center gap-4 rounded-full bg-primary px-6 py-2.5 shadow-lg">
                <span className="h-2 w-2 animate-pulse rounded-full bg-zinc-950" />
                <span className="font-sans text-[10px] font-black uppercase tracking-[0.4em] text-zinc-950">
                  Montáž drážkovej krytiny
                </span>
              </div>
              <h1 className="hero-headline fade-up fade-up-1 max-w-6xl font-black uppercase text-white italic tracking-tighter drop-shadow-sm">
                Klampiarstvo a pokrývačské práce
              </h1>
              <p className="fade-up fade-up-2 mt-12 max-w-2xl font-sans text-lg font-light leading-relaxed text-white/70 md:text-2xl">
                Vykonávame predaj, montáž a servis klampiarskeho materiálu.
                Špecializujeme sa na drážkovú krytinu a opravy striech.
              </p>
              <div className="fade-up fade-up-3 mt-16 flex flex-col gap-6 sm:flex-row">
                <a
                  href="#kontakt"
                  className="hero-cta group inline-flex items-center justify-center rounded-full bg-primary py-5 text-sm font-black text-zinc-950 shadow-xl transition-all duration-500 hover:bg-white"
                >
                  <span className="hover-split-text"><span className="hover-split-text-inner" data-text="Zavolajte nám">Zavolajte nám</span></span>
                </a>
                <a
                  href="#onas"
                  className="hero-cta group inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent py-5 text-sm font-bold text-white transition-all duration-500 hover:bg-white/10"
                >
                  <span className="hover-split-text"><span className="hover-split-text-inner" data-text="Nezáväzná ponuka">Nezáväzná ponuka</span></span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="relative z-10 bg-white">
          <section
            id="onas"
            className="grain-overlay relative overflow-hidden bg-white py-28 text-zinc-950 md:py-48"
          >
            <div className="relative z-10 mx-auto w-[95vw] px-6 md:px-10">
              <div className="grid grid-cols-1 items-center gap-24 lg:grid-cols-2">
                <div className="reveal-on-scroll">
                  <div className="divider" />
                  <p className="mb-8 text-xs font-black uppercase tracking-[0.3em] text-primary">
                    O firme
                  </p>
                  <h2 className="mb-12 text-4xl font-black uppercase leading-none text-zinc-950 italic tracking-tighter md:text-6xl">
                    Skúsenosti od roku 1996
                  </h2>
                  <div className="space-y-10 text-xl font-light leading-relaxed text-zinc-500">
                    <p>
                      Naša firma pôsobí na trhu od roku 1996. Vykonávame predaj,
                      montáž a servis klampiarskeho materiálu s dôrazom na kvalitu
                      a odborný prístup.
                    </p>
                    <blockquote className="rounded-r-2xl border-l-4 border-primary bg-zinc-50 py-4 pl-8 font-medium text-zinc-950">
                      V roku 2001 sme absolvovali úspešne školenie na montáž
                      strešných systémov RHEINZINK a od tohto obdobia sa
                      špecializujeme na montáž drážkovej strešnej krytiny.
                    </blockquote>
                    <p>
                      Montážnici našej firmy sú školení a zodpovední odborníci.
                      Máme v tejto oblasti veľmi dobré výsledky, o ktorých svedčia
                      naše referencie.
                    </p>
                  </div>
                </div>
                <div className="reveal-on-scroll" style={{ transitionDelay: "200ms" }}>
                  <div className="image-reveal-wrapper group aspect-[4/3] overflow-hidden shadow-2xl">
                    <div className="image-reveal-shutter" />
                    <Image
                      fill
                      src="/about.jpg"
                      alt="Skúsenosti od roku 1996"
                      className="image-reveal-img object-cover"
                    />
                    <div className="absolute bottom-8 left-8 right-8 translate-y-4 rounded-2xl border border-zinc-100 bg-white/90 p-8 backdrop-blur-md transition-transform group-hover:translate-y-0">
                      <div className="mb-2 text-3xl font-black uppercase leading-none tracking-tighter">
                        25 rokov
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                        skúseností
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="specializacia"
            className="relative overflow-hidden border-y border-zinc-100 bg-zinc-50 py-28 md:py-48"
          >
            <div
              className="absolute inset-0 z-0 opacity-5"
              style={{ backgroundImage: "url('/texture.svg')", backgroundSize: "cover" }}
            />
            <div className="relative z-10 mx-auto w-[95vw] px-6 md:px-10">
              <div className="reveal-on-scroll mb-24 max-w-4xl">
                <h2 className="mb-10 break-words text-[clamp(1.8rem,7vw,6rem)] font-black uppercase leading-none text-zinc-950 italic tracking-tighter">
                  Naše služby
                </h2>
                <p className="text-xl font-light text-zinc-500">
                  Komplexné riešenia pre strešné a fasádne systémy vrátane predaja
                  materiálu a odborného poradenstva.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {services.map((service, index) => (
                  <article
                    key={service.title}
                    className={`reveal-on-scroll relative min-h-[450px] flex flex-col justify-end overflow-hidden p-10 group shadow-lg ${
                      index === 1 ? "md:mt-12" : index === 2 ? "md:mt-24" : ""
                    }`}
                  >
                    <Image
                      fill
                      src={service.image}
                      alt={service.title}
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/40 to-transparent" />
                    <div className="relative z-10">
                      <span className="mb-4 block text-xs font-black uppercase tracking-widest text-primary">
                        0{index + 1} / Služba
                      </span>
                      <h3 className="mb-6 text-3xl font-black uppercase leading-none text-white italic">
                        {service.title}
                      </h3>
                      <p className="font-sans text-xs font-medium leading-relaxed tracking-wide text-white/80">
                        {service.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-24 flex flex-col items-start justify-between gap-12 border-t border-zinc-200 pt-12 md:flex-row">
                <div className="flex-1">
                  <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                    Špecializácie
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {specializations.map((item) => (
                      <span key={item} className="pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="realizacie" className="grain-overlay overflow-hidden bg-white py-28 md:py-48">
            <div className="relative z-10 mx-auto w-[95vw] px-6 md:px-10">
              <div className="reveal-on-scroll mb-24 flex flex-col items-end justify-between gap-10 md:flex-row">
                <div>
                  <div className="divider" />
                  <h2 className="break-words text-[clamp(1.8rem,7vw,6rem)] font-black uppercase leading-none text-zinc-950 italic tracking-tighter">
                    Realizácie<span className="text-primary italic">.</span>
                  </h2>
                  <p className="mt-4 text-xs font-bold uppercase text-zinc-400">
                    Vybrané projekty z oblasti klampiarstva a pokrývačstva
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => scrollReferences(-500)}
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm transition-all hover:bg-zinc-50"
                    aria-label="Predchádzajúce realizácie"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollReferences(500)}
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm transition-all hover:bg-zinc-50"
                    aria-label="Ďalšie realizácie"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div ref={sliderRef} id="ref-slider" className="ref-slider reveal-on-scroll">
                {references.map((item) => (
                  <article key={`${item.title}-${item.location}`} className="ref-card group">
                    <Image
                      fill
                      src={item.image}
                      alt={item.title}
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="hover-reveal-clip">
                      <Image
                        fill
                        src={item.revealImage}
                        alt=""
                        className="object-cover"
                      />
                    </div>
                    <div className="ref-card-overlay">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                        {item.eyebrow}
                      </p>
                      <h3 className="text-3xl font-black uppercase italic tracking-tighter">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm font-light text-white/80">
                        {item.location}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>


        </div>
      </main>
    </>
  );
}
