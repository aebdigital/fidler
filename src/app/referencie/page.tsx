"use client";

import { useState } from "react";
import Image from "next/image";
import { SubpageHero } from "../../components/SubpageHero";

const titanTitles = [
  "r.d. Tomašikovo", "r.d. Tomašikovo", 
  "polyfunkčný dom Žilina", "polyfunkčný dom Žilina",
  "central passage BA", "central passage BA",
  "sídlo firmy Belová", "sídlo firmy Belová",
  "r.d. BA", "r.d. BA", "r.d. BA", "r.d. Koliba",
  "r.d. Koliba", "r.d. Koliba", "garáž BA", "kostol Koniarovce",
  "kostol Koniarovce", "kostol Piešťany", "kostol Piešťany",
  "komunikačné centrum Prievidza", "komunikačné centrum Prievidza"
];

const allPhotos = [
  { category: "pozinok", src: "/scraped/pz01v.jpg", thumb: "/scraped/pz01m.jpg", title: "garáž - Veľký Biel" },
  { category: "pozinok", src: "/scraped/pz02v.jpg", thumb: "/scraped/pz02m.jpg", title: "pasáž - Malý Františkáni" },
  { category: "med", src: "/scraped/m01v.jpg", thumb: "/scraped/m01m.jpg", title: "piváreň Prazdroj BA" },
  { category: "med", src: "/scraped/m02v.jpg", thumb: "/scraped/m02m.jpg", title: "piváreň Prazdroj BA" },
  { category: "med", src: "/scraped/m03v.jpg", thumb: "/scraped/m03m.jpg", title: "r.d. Buková BA" },
  { category: "med", src: "/scraped/m04v.jpg", thumb: "/scraped/m04m.jpg", title: "r.d. Buková BA" },
  ...Array.from({ length: 21 }, (_, i) => {
    const num = (i + 1).toString().padStart(2, '0');
    return {
      category: "titan",
      src: `/scraped/tz${num}v.jpg`,
      thumb: `/scraped/tz${num}m.jpg`,
      title: titanTitles[i] || `Práca ${num}`
    };
  })
];

export default function ReferenciePage() {
  const [filter, setFilter] = useState("all");

  const filteredPhotos = allPhotos.filter(
    (photo) => filter === "all" || photo.category === filter
  );

  return (
    <>
      <SubpageHero />
      <div className="pt-16 pb-24 bg-zinc-50 min-h-screen">
        <div className="mx-auto w-[95vw] px-6 md:px-10">
          <div className="mx-auto">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-zinc-950">Referencie</h1>
            <p className="text-xl text-zinc-600 mb-12 max-w-3xl">
              Prezrite si ukážky našich prác rozdelené podľa použitých materiálov. Za vyše 20 rokov našej existencie sme realizovali množstvo úspešných projektov na Slovensku.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={() => setFilter("all")}
                className={`px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${filter === "all" ? "bg-zinc-950 text-white shadow-sm" : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"}`}
              >
                Všetky
              </button>
              <button
                onClick={() => setFilter("pozinok")}
                className={`px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${filter === "pozinok" ? "bg-zinc-950 text-white shadow-sm" : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"}`}
              >
                Pozinok
              </button>
              <button
                onClick={() => setFilter("med")}
                className={`px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${filter === "med" ? "bg-zinc-950 text-white shadow-sm" : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"}`}
              >
                Meď
              </button>
              <button
                onClick={() => setFilter("titan")}
                className={`px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${filter === "titan" ? "bg-zinc-950 text-white shadow-sm" : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"}`}
              >
                Titán-zinok
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPhotos.map((photo, i) => (
                <a key={i} href={photo.src} target="_blank" rel="noreferrer" className="group block bg-white rounded-xl overflow-hidden shadow-sm border border-zinc-100 transition-all hover:shadow-md hover:border-zinc-200">
                  <div className="aspect-[4/3] relative overflow-hidden bg-zinc-100">
                    <Image fill src={photo.thumb} alt={photo.title} className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-950 group-hover:text-primary transition-colors">{photo.title}</p>
                    <p className="text-[10px] uppercase text-zinc-400 mt-1">{photo.category}</p>
                  </div>
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
