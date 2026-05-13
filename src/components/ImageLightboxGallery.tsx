"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";

export type LightboxPhoto = {
  src: string;
  thumb: string;
  title: string;
  category?: string;
};

type ImageLightboxGalleryProps = {
  photos: LightboxPhoto[];
  className?: string;
  showCategory?: boolean;
};

export function ImageLightboxGallery({
  photos,
  className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
  showCategory = false,
}: ImageLightboxGalleryProps) {
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"open" | "next" | "prev">("open");

  const activePhoto = lightboxIndex === null ? null : photos[lightboxIndex];

  useEffect(() => {
    if (lightboxIndex !== null && lightboxIndex >= photos.length) {
      setLightboxIndex(null);
    }
  }, [lightboxIndex, photos.length]);

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowRight") {
        showSlide("next");
      }

      if (event.key === "ArrowLeft") {
        showSlide("prev");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const openLightbox = (index: number) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    setSlideDirection("open");
    setIsClosing(false);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    if (lightboxIndex === null || isClosing) {
      return;
    }

    setIsClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setLightboxIndex(null);
      setIsClosing(false);
    }, 240);
  };

  const showSlide = (direction: "next" | "prev") => {
    if (!photos.length) {
      return;
    }

    setSlideDirection(direction);
    setLightboxIndex((current) => {
      if (current === null) {
        return 0;
      }

      const offset = direction === "next" ? 1 : -1;
      return (current + offset + photos.length) % photos.length;
    });
  };

  const handleCardKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(index);
    }
  };

  return (
    <>
      <motion.div layout className={className}>
        <AnimatePresence mode="popLayout">
          {photos.map((photo, index) => (
            <motion.button
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
              key={photo.src}
              type="button"
              onClick={() => openLightbox(index)}
              onKeyDown={(event) => handleCardKeyDown(event, index)}
              className="group relative block overflow-hidden rounded-xl border border-zinc-100 bg-zinc-950 text-left shadow-sm outline-none transition-all hover:border-zinc-300 hover:shadow-md focus-visible:ring-4 focus-visible:ring-primary"
              aria-label={`Otvoriť obrázok ${photo.title}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                <Image
                  fill
                  src={photo.thumb}
                  alt={photo.title}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-white drop-shadow-lg transition-colors group-hover:text-primary md:text-sm">
                    {photo.title}
                  </p>
                  {showCategory && photo.category ? (
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                      {photo.category}
                    </p>
                  ) : null}
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {activePhoto && (
        <div
          className={`lightbox-overlay ${isClosing ? "is-closing" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="absolute right-5 top-5 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-2xl leading-none text-white backdrop-blur-md transition-colors hover:bg-white hover:text-zinc-950 md:right-8 md:top-8"
            onClick={closeLightbox}
            aria-label="Zavrieť lightbox"
          >
            x
          </button>

          <button
            type="button"
            className="absolute left-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-zinc-950 md:left-8 md:h-14 md:w-14"
            onClick={(event) => {
              event.stopPropagation();
              showSlide("prev");
            }}
            aria-label="Predchádzajúci obrázok"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            className="absolute right-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-zinc-950 md:right-8 md:h-14 md:w-14"
            onClick={(event) => {
              event.stopPropagation();
              showSlide("next");
            }}
            aria-label="Ďalší obrázok"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="lightbox-shell" onClick={(event) => event.stopPropagation()}>
            <div
              key={`${activePhoto.src}-${lightboxIndex}-${slideDirection}`}
              className={`lightbox-slide lightbox-slide-${slideDirection}`}
            >
              <Image
                fill
                src={activePhoto.src}
                alt={activePhoto.title}
                className="object-contain"
                sizes="100vw"
                unoptimized
                priority
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/65 to-transparent p-6 text-white md:p-10">
                <p className="max-w-3xl text-2xl font-black uppercase leading-none tracking-tighter md:text-4xl">
                  {activePhoto.title}
                </p>
                {showCategory && activePhoto.category ? (
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                    {activePhoto.category}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 gap-3 md:bottom-8">
            {photos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setSlideDirection(index > (lightboxIndex ?? 0) ? "next" : "prev");
                  setLightboxIndex(index);
                }}
                className={`h-2.5 rounded-full transition-all ${
                  index === lightboxIndex ? "w-10 bg-primary" : "w-2.5 bg-white/35 hover:bg-white"
                }`}
                aria-label={`Zobraziť ${photo.title}`}
                aria-current={index === lightboxIndex}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
