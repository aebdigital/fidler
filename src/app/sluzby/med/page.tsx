import Image from "next/image";

export default function MedPage() {
  const images = [
    { src: "/scraped/m01v.jpg", thumb: "/scraped/m01m.jpg", title: "piváreň Prazdroj BA" },
    { src: "/scraped/m02v.jpg", thumb: "/scraped/m02m.jpg", title: "piváreň Prazdroj BA" },
    { src: "/scraped/m03v.jpg", thumb: "/scraped/m03m.jpg", title: "r.d. Buková BA" },
    { src: "/scraped/m04v.jpg", thumb: "/scraped/m04m.jpg", title: "r.d. Buková BA" }
  ];

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-zinc-100 min-h-full">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-zinc-950">Medené strechy</h1>
      <div className="prose max-w-none text-zinc-600 mb-12">
        <p>
          Meď je prémiový materiál, ktorý sa vyznačuje extrémnou dlhovekosťou a nezameniteľným vzhľadom.
          Postupom času získava charakteristickú patinu, ktorá chráni materiál a dodáva mu jedinečnú estetickú hodnotu.
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
