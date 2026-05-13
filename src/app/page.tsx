"use client";

import Image from "next/image";
import Link from "next/link";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";

type Service = {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
};

type Reference = {
  image: string;
  eyebrow: string;
  title: string;
  location: string;
};

const services: Service[] = [
  {
    image: "/service1.jpg",
    eyebrow: "01 / Klampiarstvo",
    title: "Klampiarske práce",
    description: "Ohýbanie 4m profilov a montáž odvodňovacích systémov.",
    items: ["Ohýbanie 4m profilov", "Odvodňovacie systémy", "Detailné lemovania"],
  },
  {
    image: "/service2.jpg",
    eyebrow: "02 / Strechy",
    title: "Pokrývačské práce",
    description: "Opravy striech, hydroizolácie a montáž povlakových krytín.",
    items: ["Opravy striech", "Hydroizolácie", "Povlakové krytiny"],
  },
  {
    image: "/service3.jpg",
    eyebrow: "03 / Systémy",
    title: "Strešné systémy",
    description: "Montáž drážkovej krytiny z titán-zinok, medi a hliníka.",
    items: ["Titán-zinok", "Medené strechy", "Farebný hliník"],
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
    image: "/scraped/tz01v.jpg",
    eyebrow: "Rodinný dom",
    title: "r.d. Tomašikovo",
    location: "Tomašikovo",
  },
  {
    image: "/scraped/tz03v.jpg",
    eyebrow: "Polyfunkčný dom",
    title: "Polyfunkčný dom",
    location: "Žilina",
  },
  {
    image: "/scraped/tz05v.jpg",
    eyebrow: "Komunikačné centrum",
    title: "Central Passage",
    location: "Bratislava",
  },
  {
    image: "/scraped/tz12v.jpg",
    eyebrow: "Rodinný dom",
    title: "r.d. Koliba",
    location: "Bratislava",
  },
  {
    image: "/scraped/tz18v.jpg",
    eyebrow: "Kostol",
    title: "Kostol",
    location: "Piešťany",
  },
  {
    image: "/scraped/m01v.jpg",
    eyebrow: "Medená strecha",
    title: "Piváreň Prazdroj",
    location: "Bratislava",
  },
  {
    image: "/scraped/m03v.jpg",
    eyebrow: "Rodinný dom",
    title: "r.d. Buková",
    location: "Bratislava",
  },
  {
    image: "/scraped/pz01v.jpg",
    eyebrow: "Pozinkované plechy",
    title: "Garáž",
    location: "Veľký Biel",
  },
];

export default function Home() {
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isLightboxClosing, setIsLightboxClosing] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"open" | "next" | "prev">("open");

  useEffect(() => {

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
      window.removeEventListener("scroll", handleScroll);
      revealObserver.disconnect();
      imageObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowRight") {
        showServiceSlide("next");
      }

      if (event.key === "ArrowLeft") {
        showServiceSlide("prev");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex]);

  const openLightbox = (index: number) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    setSlideDirection("open");
    setIsLightboxClosing(false);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    if (lightboxIndex === null || isLightboxClosing) {
      return;
    }

    setIsLightboxClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setLightboxIndex(null);
      setIsLightboxClosing(false);
    }, 240);
  };

  const showServiceSlide = (direction: "next" | "prev") => {
    setSlideDirection(direction);
    setLightboxIndex((current) => {
      if (current === null) {
        return 0;
      }

      const offset = direction === "next" ? 1 : -1;
      return (current + offset + services.length) % services.length;
    });
  };

  const handleServiceCardKeyDown = (
    event: ReactKeyboardEvent<HTMLElement>,
    index: number,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(index);
    }
  };

  const activeService = lightboxIndex === null ? null : services[lightboxIndex];

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
            className="relative overflow-hidden bg-[#111827] py-28 text-white md:py-36"
          >
            <div className="absolute inset-0 z-0">
              <Image
                fill
                src="/service2.jpg"
                alt=""
                className="object-cover opacity-20 grayscale"
              />
              <div className="absolute inset-0 bg-[#111827]/85" />
            </div>
            <div
              className="absolute inset-0 z-0 opacity-20 invert"
              style={{ backgroundImage: "url('/texture.svg')", backgroundSize: "cover" }}
            />
            <div className="relative z-10 mx-auto w-[95vw] px-6 md:px-10">
              <div className="reveal-on-scroll mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
                <div>
                  <p className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-primary">
                    Naše služby
                  </p>
                  <h2 className="break-words text-[clamp(1.8rem,7vw,6rem)] font-black uppercase leading-none text-white italic tracking-tighter">
                    Čo robíme
                  </h2>
                </div>
                <p className="max-w-md text-xl font-light text-white/60">
                  Komplexné riešenia pre strešné a fasádne systémy vrátane predaja
                  materiálu a odborného poradenstva.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service, index) => (
                  <article
                    key={service.title}
                    role="button"
                    tabIndex={0}
                    onClick={() => openLightbox(index)}
                    onKeyDown={(event) => handleServiceCardKeyDown(event, index)}
                    className="reveal-on-scroll group relative flex min-h-[450px] cursor-pointer flex-col justify-end overflow-hidden p-10 text-left shadow-2xl outline-none ring-primary/0 transition-[box-shadow,transform] duration-500 hover:-translate-y-2 focus-visible:ring-4"
                    style={{ transitionDelay: `${index * 150}ms` }}
                    aria-label={`Otvoriť službu ${service.title}`}
                  >
                    <Image
                      fill
                      src={service.image}
                      alt={service.title}
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
                    <div className="relative z-10">
                      <span className="mb-4 block text-xs font-black uppercase tracking-widest text-primary">
                        {service.eyebrow}
                      </span>
                      <h3 className="mb-6 text-3xl font-black uppercase leading-none text-white italic">
                        {service.title}
                      </h3>
                      <p className="mb-6 font-sans text-sm font-light leading-relaxed text-white/70">
                        {service.description}
                      </p>
                      <ul className="space-y-3 text-xs font-semibold uppercase tracking-wide text-white/75">
                        {service.items.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-24 flex flex-col items-start justify-between gap-12 border-t border-white/10 pt-12 md:flex-row">
                <div className="flex-1">
                  <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                    Špecializácie
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {specializations.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-white/80"
                      >
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
              <div className="reveal-on-scroll mb-24">
                <div>
                  <div className="divider" />
                  <h2 className="break-words text-[clamp(1.8rem,7vw,6rem)] font-black uppercase leading-none text-zinc-950 italic tracking-tighter">
                    Realizácie
                  </h2>
                  <p className="mt-4 text-xs font-bold uppercase text-zinc-400">
                    Vybrané projekty z oblasti klampiarstva a pokrývačstva
                  </p>
                </div>
              </div>

              <div className="reveal-on-scroll grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {references.map((item) => (
                  <article
                    key={`${item.title}-${item.location}-${item.image}`}
                    className="group relative block overflow-hidden rounded-xl border border-zinc-100 bg-zinc-950 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                      <Image
                        fill
                        src={item.image}
                        alt={item.title}
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                          {item.eyebrow}
                        </p>
                        <h3 className="mt-2 text-sm font-bold uppercase tracking-widest text-white drop-shadow-lg transition-colors group-hover:text-primary">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-xs text-white/70">{item.location}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="mt-12 flex justify-center">
                <Link
                  href="/referencie"
                  className="inline-flex items-center justify-center bg-zinc-950 px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-primary hover:text-zinc-950"
                >
                  Viac realizácií
                </Link>
              </div>
            </div>
          </section>

          {activeService && (
            <div
              className={`lightbox-overlay ${isLightboxClosing ? "is-closing" : ""}`}
              role="dialog"
              aria-modal="true"
              aria-label={activeService.title}
              onClick={closeLightbox}
            >
              <button
                type="button"
                className="absolute right-5 top-5 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-2xl leading-none text-white backdrop-blur-md transition-colors hover:bg-white hover:text-zinc-950 md:right-8 md:top-8"
                onClick={closeLightbox}
                aria-label="Zavrieť lightbox"
              >
                ×
              </button>

              <button
                type="button"
                className="absolute left-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-zinc-950 md:left-8 md:h-14 md:w-14"
                onClick={(event) => {
                  event.stopPropagation();
                  showServiceSlide("prev");
                }}
                aria-label="Predchádzajúca služba"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                type="button"
                className="absolute right-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-zinc-950 md:right-8 md:h-14 md:w-14"
                onClick={(event) => {
                  event.stopPropagation();
                  showServiceSlide("next");
                }}
                aria-label="Ďalšia služba"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="lightbox-shell" onClick={(event) => event.stopPropagation()}>
                <div
                  key={`${activeService.title}-${lightboxIndex}-${slideDirection}`}
                  className={`lightbox-slide lightbox-slide-${slideDirection}`}
                >
                  <Image
                    fill
                    src={activeService.image}
                    alt={activeService.title}
                    className="object-contain"
                    sizes="100vw"
                    unoptimized
                    priority
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#061737] via-[#061737]/75 to-transparent p-6 text-white md:p-10">
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-primary">
                      {activeService.eyebrow}
                    </p>
                    <h3 className="max-w-3xl text-3xl font-black uppercase leading-none italic tracking-tighter md:text-5xl">
                      {activeService.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-white/75 md:text-base">
                      {activeService.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 gap-3 md:bottom-8">
                {services.map((service, index) => (
                  <button
                    key={service.title}
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSlideDirection(index > (lightboxIndex ?? 0) ? "next" : "prev");
                      setLightboxIndex(index);
                    }}
                    className={`h-2.5 rounded-full transition-all ${
                      index === lightboxIndex ? "w-10 bg-primary" : "w-2.5 bg-white/35 hover:bg-white"
                    }`}
                    aria-label={`Zobraziť ${service.title}`}
                    aria-current={index === lightboxIndex}
                  />
                ))}
              </div>
            </div>
          )}


        </div>
      </main>
    </>
  );
}
