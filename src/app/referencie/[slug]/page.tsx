import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SubpageHero } from "../../../components/SubpageHero";
import { categoryLabels, getProjectBySlug, photoUrl, projects } from "../../../data/projekty";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Referencia" };
  }
  return {
    title: `${project.title}${project.location ? ` – ${project.location}` : ""} | Klampiarstvo Fidler`,
    description: `${project.title} – ${project.material}`,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const [mainPhoto, ...restPhotos] = project.photos;

  return (
    <>
      <SubpageHero />
      <div className="pt-16 pb-24 bg-zinc-50 min-h-screen">
        <div className="mx-auto w-[90vw] md:w-[95vw] md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <aside className="lg:col-span-4 lg:sticky lg:top-32">
              <Link
                href="/referencie"
                className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-zinc-500 hover:text-zinc-950 transition-colors mb-8"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Späť na referencie
              </Link>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">
                {categoryLabels[project.category]}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-zinc-950 italic leading-[0.95] mb-6">
                {project.title}
              </h1>
              {project.location && (
                <p className="text-lg text-zinc-500 font-light mb-6">{project.location}</p>
              )}
              <div className="h-px w-12 bg-primary mb-6" />
              <p className="text-sm text-zinc-600 leading-relaxed">{project.material}</p>
              <p className="mt-4 text-xs text-zinc-400 uppercase tracking-widest font-bold">
                {project.photos.length}{" "}
                {project.photos.length === 1
                  ? "fotografia"
                  : project.photos.length < 5
                  ? "fotografie"
                  : "fotografií"}
              </p>
            </aside>

            <div className="lg:col-span-8 space-y-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-200 shadow-lg">
                <Image
                  fill
                  src={photoUrl(project.folder, mainPhoto)}
                  alt={project.title}
                  className="object-cover"
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  priority
                  unoptimized
                />
              </div>

              {restPhotos.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {restPhotos.map((photo) => (
                    <div
                      key={photo}
                      className="relative aspect-square overflow-hidden rounded-xl bg-zinc-200 shadow-sm"
                    >
                      <Image
                        fill
                        src={photoUrl(project.folder, photo)}
                        alt={`${project.title} – ${photo}`}
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 100vw"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
