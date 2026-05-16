import Link from "next/link";
import { ImageLightboxGallery } from "../../../components/ImageLightboxGallery";

export default function VyrobaProfilovPage() {
  const images = [
    { src: "/vyroba-profilov/IMG_5018.jpg", thumb: "/vyroba-profilov/IMG_5018.jpg", title: "Výroba profilov" },
    { src: "/vyroba-profilov/IMG_6562.jpg", thumb: "/vyroba-profilov/IMG_6562.jpg", title: "Ohýbanie 4m profilov" },
    { src: "/vyroba-profilov/IMG_6573.jpg", thumb: "/vyroba-profilov/IMG_6573.jpg", title: "Klampiarske prvky" },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-zinc-100 min-h-full">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-zinc-950">Výroba stavebných profilov</h1>
      <div className="prose max-w-none text-zinc-600 mb-12 space-y-5">
        <p>
          Vyrábame stavebné a lineárne strešné profily do hrúbky plechu 1 mm.
          Ponúkame výrobu rôznych plechov na zákazku podľa vašej špecifikácie –
          pre strešné lemovania, oplechovania, atiky, parapety a ďalšie klampiarske prvky.
        </p>
        <p>
          Druhý rok pracujeme s profesionálnou ohýbačkou plechov nemeckej špičkovej značky
          <strong className="text-zinc-950"> Variobend</strong> s maximálnou dĺžkou ohýbaného
          profilu <strong className="text-zinc-950">4 300 mm</strong>.
        </p>
        <p>
          Máte záujem o profil na mieru? Kontaktujte nás – pripravíme vám nezáväznú cenovú ponuku.
        </p>
      </div>

      <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 text-zinc-950">Ukážky našich prác</h2>
      <ImageLightboxGallery photos={images} />
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
