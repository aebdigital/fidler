import Image from "next/image";

export default function TitanZinokPage() {
  // We have tz01 to tz21, some have custom titles based on scraped data
  const titles = [
    "r.d. Tomašikovo", "r.d. Tomašikovo", 
    "polyfunkčný dom Žilina", "polyfunkčný dom Žilina",
    "central passage BA", "central passage BA",
    "sídlo firmy Belová", "sídlo firmy Belová",
    "r.d. BA", "r.d. BA", "r.d. BA", "r.d. Koliba",
    "r.d. Koliba", "r.d. Koliba", "garáž BA", "kostol Koniarovce",
    "kostol Koniarovce", "kostol Piešťany", "kostol Piešťany",
    "komunikačné centrum Prievidza", "komunikačné centrum Prievidza"
  ];

  const images = Array.from({ length: 21 }, (_, i) => {
    const num = (i + 1).toString().padStart(2, '0');
    return {
      src: `/scraped/tz${num}v.jpg`,
      thumb: `/scraped/tz${num}m.jpg`,
      title: titles[i] || `Práca ${num}`
    };
  });

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-zinc-100 min-h-full">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-zinc-950">Titán-Zinok</h1>
      <div className="prose max-w-none text-zinc-600 mb-12">
        <p>
          Titán-zinok je moderný materiál spĺňajúci najvyššie nároky na kvalitu, životnosť a ekológiu.
          Vďaka svojej vynikajúcej tvárnosti je ideálny pre zložité architektonické tvary, strechy a fasády.
        </p>
      </div>

      <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 text-zinc-950">Ukážky našich prác</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <a key={i} href={img.src} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-xl border border-zinc-100">
            <div className="aspect-[4/3] relative overflow-hidden bg-zinc-100">
              <Image fill src={img.thumb} alt={img.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="p-4 bg-white">
              <p className="text-sm font-bold uppercase tracking-widest text-zinc-950">{img.title}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
