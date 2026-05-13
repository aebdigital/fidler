import Link from "next/link";
import { ImageLightboxGallery } from "../../../components/ImageLightboxGallery";

export default function PozinokPage() {
  const images = [
    { src: "/scraped/pz01v.jpg", thumb: "/scraped/pz01m.jpg", title: "garáž - Veľký Biel" },
    { src: "/scraped/pz02v.jpg", thumb: "/scraped/pz02m.jpg", title: "pasáž - Malý Františkáni" }
  ];
  const previewImages = images.slice(0, 3);

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-zinc-100 min-h-full">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-zinc-950">Pozinkované plechy</h1>
      <div className="prose max-w-none text-zinc-600 mb-12">
        <p>
          Pozinkovaný plech je tradičný a ekonomicky výhodný materiál pre strešné krytiny a klampiarske prvky.
          Jeho využitie je široké a vďaka ochrannému zinkovému povlaku ponúka dobrú odolnosť voči korózii.
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
