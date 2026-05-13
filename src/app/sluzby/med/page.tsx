import Link from "next/link";
import { ImageLightboxGallery } from "../../../components/ImageLightboxGallery";

export default function MedPage() {
  const images = [
    { src: "/scraped/m01v.jpg", thumb: "/scraped/m01m.jpg", title: "piváreň Prazdroj BA" },
    { src: "/scraped/m02v.jpg", thumb: "/scraped/m02m.jpg", title: "piváreň Prazdroj BA" },
    { src: "/scraped/m03v.jpg", thumb: "/scraped/m03m.jpg", title: "r.d. Buková BA" },
    { src: "/scraped/m04v.jpg", thumb: "/scraped/m04m.jpg", title: "r.d. Buková BA" }
  ];
  const previewImages = images.slice(0, 3);

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
      <ImageLightboxGallery photos={previewImages} />
      <div className="mt-10 flex justify-center">
        <Link
          href="/referencie"
          className="inline-flex items-center justify-center bg-zinc-950 px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-primary hover:text-zinc-950"
        >
          Viac realizácií
        </Link>
      </div>
    </div>
  );
}
