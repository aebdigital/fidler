import Image from "next/image";

export function SubpageHero() {
  return (
    <div className="relative w-full h-[30vh] min-h-[250px] bg-zinc-950 overflow-hidden">
      <Image 
        src="/hero.jpg" 
        alt="Hero background" 
        fill 
        priority
        className="object-cover opacity-30 grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-zinc-950/20 to-zinc-950/80" />
    </div>
  );
}
