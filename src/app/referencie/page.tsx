import Link from "next/link";
import Image from "next/image";
import { SubpageHero } from "../../components/SubpageHero";

export default function ReferenciePage() {
  const categories = [
    {
      title: "Pozinkované plechy",
      desc: "Tradičné a ekonomicky výhodné materiály pre strešné krytiny.",
      link: "/sluzby/pozinok",
      img: "/scraped/pz01m.jpg"
    },
    {
      title: "Medené strechy",
      desc: "Prémiový materiál s extrémnou dlhovekosťou a nezameniteľným vzhľadom.",
      link: "/sluzby/med",
      img: "/scraped/m01m.jpg"
    },
    {
      title: "Titán-Zinok",
      desc: "Moderný materiál pre zložité architektonické tvary, strechy a fasády.",
      link: "/sluzby/titan-zinok",
      img: "/scraped/tz01m.jpg"
    }
  ];

  return (
    <>
      <SubpageHero />
      <div className="pt-16 pb-24 bg-zinc-50 min-h-screen">
      <div className="mx-auto w-[95vw] px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-zinc-950">Referencie</h1>
          <p className="text-xl text-zinc-600 mb-12 max-w-3xl">
            Prezrite si ukážky našich prác rozdelené podľa použitých materiálov. Za vyše 20 rokov našej existencie sme realizovali množstvo úspešných projektov na Slovensku.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <Link key={i} href={cat.link} className="group block bg-white rounded-3xl overflow-hidden shadow-sm border border-zinc-100 transition-all hover:shadow-md hover:border-zinc-200">
                <div className="aspect-[4/3] overflow-hidden bg-zinc-100">
                  <Image fill src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-8">
                  <h2 className="text-xl font-black uppercase tracking-tighter mb-4 text-zinc-950 group-hover:text-primary transition-colors">{cat.title}</h2>
                  <p className="text-sm text-zinc-500 leading-relaxed">{cat.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-950 group-hover:text-primary transition-colors">
                    Zobraziť galériu &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
