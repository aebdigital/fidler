"use client";

import Image from "next/image";

export function Footer() {
  return (
    <footer id="kontakt" className="relative mt-auto overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        <Image
          fill
          src="/hero.jpg"
          alt=""
          className="h-full w-full object-cover opacity-50 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/90 to-zinc-950" />
      </div>
      <div className="relative z-10">
        <div className="mx-auto w-[90vw] md:w-[95vw] pt-32 pb-16 text-center">
          <div className="fade-up fade-up-1">
            <h2 className="mb-6 text-4xl font-black uppercase text-white tracking-tighter md:text-5xl">
              Máte záujem o spoluprácu?<span className="text-primary">.</span>
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/60">
              Kontaktujte nás pre obhliadku, cenovú ponuku alebo poradenstvo.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:0905869408"
                className="group inline-flex items-center justify-center rounded-none bg-white px-12 py-5 text-xs font-black uppercase text-zinc-950 shadow-xl transition-all duration-500 hover:bg-primary"
              >
                <span className="hover-split-text"><span className="hover-split-text-inner" data-text="Zavolajte teraz">Zavolajte teraz</span></span>
              </a>
              <a
                href="mailto:jana@klampiarfidler.sk"
                className="group inline-flex items-center justify-center rounded-none border border-white/20 px-12 py-5 text-xs font-bold uppercase text-white transition-all duration-500 hover:bg-white/10"
              >
                <span className="hover-split-text"><span className="hover-split-text-inner" data-text="Napíšte e-mail">Napíšte e-mail</span></span>
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto w-[90vw] md:w-[95vw] pb-12 pt-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <span className="logo-text footer-logo mb-6 block">Klampiarstvo Fidler</span>
              <p className="text-sm uppercase leading-relaxed text-white/40">
                Klampiarstvo Fidler - predaj, montáž a servis klampiarskeho
                materiálu a strešných systémov.
              </p>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/30 italic">
                Adresa
              </h4>
              <ul className="space-y-4 text-base text-white/60">
                <li>
                  <strong className="text-white/80">Klampiarstvo Fidler</strong>
                </li>
                <li>Čepenská 3081/119</li>
                <li>Sereď</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/30 italic">
                Kontakt
              </h4>
              <ul className="space-y-4 text-base text-white/60">
                <li>
                  Sídlo: <span className="text-white/80">Slovensko</span>
                </li>
                <li>
                  Telefón:{" "}
                  <a href="tel:0905869408" className="transition-colors hover:text-primary">
                    0905 869 408
                  </a>
                </li>
                <li>
                  Telefón:{" "}
                  <a href="tel:0905490399" className="transition-colors hover:text-primary">
                    0905 490 399
                  </a>
                </li>
                <li className="pt-2">
                  <a
                    href="mailto:jana@klampiarfidler.sk"
                    className="underline underline-offset-8 transition-colors hover:text-primary"
                  >
                    jana@klampiarfidler.sk
                  </a>
                </li>
                <li className="pt-2">
                  <a
                    href="mailto:fidler@klampiarfidler.sk"
                    className="underline underline-offset-8 transition-colors hover:text-primary"
                  >
                    fidler@klampiarfidler.sk
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/30 italic">
                Špecializácia
              </h4>
              <ul className="space-y-4 text-base text-white/60">
                <li>Klampiarske práce</li>
                <li>Pokrývačské práce</li>
                <li>Montáž krytín</li>
                <li>Hydroizolácie</li>
              </ul>
            </div>
          </div>
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[10px] font-bold uppercase tracking-[0.4em] text-white/10 md:flex-row">
            <p>© 2024 Klampiarstvo Fidler. Všetky práva vyhradené.</p>
            <div className="flex gap-8">
              <a href="#" className="transition-colors hover:text-white">
                Facebook
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Instagram
              </a>
              <button 
                onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('openCookieSettings')); }} 
                className="transition-colors hover:text-white uppercase"
              >
                Cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
