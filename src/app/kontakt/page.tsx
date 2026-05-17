"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { SubpageHero } from "../../components/SubpageHero";

const locationImages = [
  { src: "/scraped/pred_v.jpg", thumb: "/scraped/pred_m.jpg", title: "Predajňa" },
  { src: "/scraped/mapa_v.jpg", thumb: "/scraped/mapa_m.jpg", title: "Areál" },
];

export default function KontaktPage() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex]);

  const activeImage = lightboxIndex === null ? null : locationImages[lightboxIndex];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
    setLoading(false);
  };

  return (
    <>
      <SubpageHero />
      <div className="pt-16 pb-24 bg-zinc-50 min-h-screen">
        <div className="mx-auto w-[90vw] md:w-[95vw] md:px-10">
          <div className="mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-zinc-100">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12 text-zinc-950">Kontaktujte nás</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Left Column: Contact Info */}
              <div>
                <div className="mb-12">
                  <h2 className="text-xl font-black uppercase tracking-tighter mb-4 text-zinc-950">Fakturačné údaje a Adresa</h2>
                  <ul className="space-y-2 text-zinc-600">
                    <li><strong className="text-zinc-950">Klampiarstvo Fidler</strong></li>
                    <li>Čepenská 3081/119</li>
                    <li>Sereď, Slovensko</li>
                  </ul>
                </div>

                <div className="mb-12">
                  <h2 className="text-xl font-black uppercase tracking-tighter mb-4 text-zinc-950">Telefón</h2>
                  <ul className="space-y-2 text-zinc-600">
                    <li><a href="tel:0905869408" className="hover:text-primary transition-colors">0905 869 408</a></li>
                    <li><a href="tel:0905490399" className="hover:text-primary transition-colors">0905 490 399</a></li>
                  </ul>
                </div>

                <div className="mb-12">
                  <h2 className="text-xl font-black uppercase tracking-tighter mb-4 text-zinc-950">E-mail</h2>
                  <ul className="space-y-2 text-zinc-600">
                    <li><a href="mailto:jana@klampiarfidler.sk" className="hover:text-primary transition-colors">jana@klampiarfidler.sk</a></li>
                    <li><a href="mailto:fidler@klampiarfidler.sk" className="hover:text-primary transition-colors">fidler@klampiarfidler.sk</a></li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {locationImages.map((image, index) => (
                    <div key={image.src} className="bg-zinc-50 p-6 rounded-xl border border-zinc-100">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-950 mb-4">{image.title}</h3>
                      <button
                        type="button"
                        onClick={() => setLightboxIndex(index)}
                        className="group block relative aspect-video w-full overflow-hidden rounded-lg shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary"
                        aria-label={`Zobraziť ${image.title}`}
                      >
                        <Image
                          fill
                          src={image.thumb}
                          alt={image.title}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(min-width: 1024px) 25vw, 50vw"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Form */}
              <div>
                <div className="bg-zinc-50 p-8 rounded-2xl border border-zinc-100 h-full">
                  <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 text-zinc-950">Napíšte nám správu</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Meno a priezvisko</label>
                      <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">E-mail</label>
                      <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Správa</label>
                      <textarea id="message" name="message" rows={6} required className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"></textarea>
                    </div>
                    <button disabled={loading} type="submit" className="w-full group flex items-center justify-center bg-zinc-950 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-sm transition-all hover:bg-primary disabled:opacity-50 rounded-xl">
                      <span className="hover-split-text"><span className="hover-split-text-inner" data-text={loading ? "Odosielam..." : "Odoslať správu"}>{loading ? "Odosielam..." : "Odoslať správu"}</span></span>
                    </button>
                    
                    {status === "success" && <p className="text-green-600 font-medium mt-4">Vaša správa bola úspešne odoslaná. Ďakujeme!</p>}
                    {status === "error" && <p className="text-red-600 font-medium mt-4">Nastala chyba pri odosielaní. Skúste to prosím neskôr.</p>}
                  </form>
                </div>
              </div>

            </div>
            
            {/* Bottom: Google Map iframe */}
            <div className="mt-16 pt-16 border-t border-zinc-100">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 text-zinc-950 text-center">Nájdete nás tu</h2>
              <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-zinc-100 shadow-sm border border-zinc-200">
                <iframe 
                  src="https://maps.google.com/maps?q=Klampiarstvo%20Fidler%20Sered&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            key="kontakt-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={activeImage.title}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 md:p-12"
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Zavrieť"
              className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-zinc-950 md:right-8 md:top-8"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              key={activeImage.src}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="relative w-full max-w-5xl aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                fill
                src={activeImage.src}
                alt={activeImage.title}
                className="object-contain"
                sizes="100vw"
                priority
                unoptimized
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 md:p-8">
                <p className="text-xl md:text-3xl font-black uppercase italic tracking-tighter text-white">
                  {activeImage.title}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
