import Image from "next/image";
import Link from "next/link";
import { SubpageHero } from "../../components/SubpageHero";
import { photoUrl, projects } from "../../data/projekty";

export default function ReferenciePage() {
  return (
    <>
      <SubpageHero />
      <div className="pt-16 pb-24 bg-zinc-50 min-h-screen">
        <div className="mx-auto w-[90vw] md:w-[95vw] md:px-10">
          <div className="mx-auto">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-zinc-950">
              Referencie
            </h1>
            <p className="text-xl text-zinc-600 mb-12 max-w-3xl">
              Prezrite si ukážky našich prác rozdelené podľa použitých materiálov. Za vyše 20 rokov našej existencie sme realizovali množstvo úspešných projektov na Slovensku.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/referencie/${project.slug}`}
                  className="group relative block overflow-hidden border border-zinc-100 bg-zinc-950 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary"
                  aria-label={`Otvoriť projekt ${project.title}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                    <Image
                      fill
                      src={photoUrl(project.folder, project.photos[0])}
                      alt={project.title}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-white leading-tight drop-shadow-lg group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
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
