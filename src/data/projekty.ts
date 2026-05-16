export type ProjectCategory = "titan" | "pozinok" | "med";

export type Project = {
  slug: string;
  title: string;
  location?: string;
  material: string;
  category: ProjectCategory;
  folder: string;
  photos: string[];
};

export const projects: Project[] = [
  {
    slug: "hotel-safron-ba",
    title: "Hotel Safron",
    location: "Bratislava",
    material: "Titán-zinok lesklý",
    category: "titan",
    folder: "Hotel Safron BA Titánzinok lesklý",
    photos: ["IMG_1841.JPG", "IMG_7409.jpg", "IMG_7411.jpg", "IMG_7414.jpg", "IMG_7415.jpg"],
  },
  {
    slug: "hotel-ring-slovakiaring",
    title: "Hotel Ring",
    location: "Orechová Potôň – Slovakiaring",
    material: "Titán-zinok",
    category: "titan",
    folder: "Hotel ring Titánzinok Orechová Potôň Slovakiaring",
    photos: ["IMG_5693.jpg", "IMG_5695.jpg", "IMG_5697.jpg"],
  },
  {
    slug: "nadstavba-rd-senec",
    title: "Nadstavba rodinného domu",
    location: "Senec",
    material: "Titán-zinok bridlica",
    category: "titan",
    folder: "Nádstavba RD v Senci Titánzinok bridlica",
    photos: ["IMGA0003.JPG", "IMGA0009.JPG", "IMGA0010.JPG", "IMGA0018.JPG"],
  },
  {
    slug: "obytny-subor-jarovce",
    title: "Obytný súbor",
    location: "Jarovce",
    material: "Titán-zinok",
    category: "titan",
    folder: "Obytný súbor Jarovce",
    photos: [
      "IMG_0166.jpg",
      "IMG_0179.jpg",
      "IMG_0628.jpg",
      "IMG_1014.jpg",
      "IMG_1016.jpg",
      "IMG_1017.jpg",
    ],
  },
  {
    slug: "pz-oplechovanie-komina",
    title: "Oplechovanie komína",
    material: "Pozinkovaný plech farbený – lakoplast",
    category: "pozinok",
    folder: "PZ farb lakoplast oplechovanie komína",
    photos: ["IMG_6887.jpg", "IMG_6888.jpg"],
  },
  {
    slug: "pastoracne-centrum-trnava",
    title: "Pastoračné centrum",
    location: "Trnava",
    material: "Titán-zinok bridlicový",
    category: "titan",
    folder: "Pastoraščné centrum Trnava titánzinok Bridleicový",
    photos: ["IMGA0029.JPG", "IMG_1671.JPG", "IMG_1676.JPG", "IMG_1686.JPG"],
  },
  {
    slug: "rd-sokrates-sala",
    title: "RD Sokrates",
    location: "Šaľa",
    material: "Titán-zinok bridlica",
    category: "titan",
    folder: "RD Sokrates Šaľa Titánzinok bridlica",
    photos: ["IMGA0001.JPG", "IMGA0004.JPG", "IMGA0005.JPG"],
  },
  {
    slug: "rd-piestany",
    title: "Rodinný dom",
    location: "Piešťany",
    material: "Titán-zinok bridlica",
    category: "titan",
    folder: "RD v Pieštanoch Titánzinok bridleica",
    photos: ["IMGA0001.JPG", "IMGA0003.JPG", "IMGA0004.JPG", "IMGA0007.JPG", "IMGA0010.JPG"],
  },
  {
    slug: "rd-stupava",
    title: "Rodinný dom",
    location: "Stupava",
    material: "Titán-zinok modrošedý",
    category: "titan",
    folder: "RD v Stupave Titánzinok modrošedý",
    photos: ["20042010205.jpg", "20042010206.jpg", "IMGA0019.JPG"],
  },
  {
    slug: "radova-vystavba-rovinka",
    title: "Radová výstavba",
    location: "Rovinka",
    material: "Titán-zinok lesklý",
    category: "titan",
    folder: "Radová výstavba Rovinka Titánzinok lesklý",
    photos: [
      "IMG_3820.jpg",
      "IMG_3830.jpg",
      "IMG_3832.jpg",
      "IMG_3837.jpg",
      "IMG_3838.jpg",
      "IMG_3839.jpg",
    ],
  },
  {
    slug: "reholny-dom-podunajske-biskupice",
    title: "Rehoľný dom",
    location: "Podunajské Biskupice",
    material: "Titán-zinok bridlica",
    category: "titan",
    folder: "Rehoľný dom Podunajské Biskupice Titánzinok bridlica",
    photos: ["IMG_7261.JPG", "IMG_7264.JPG", "IMG_7265.JPG", "IMG_7266.JPG"],
  },
  {
    slug: "rd-sladkovicovo",
    title: "Rodinný dom",
    location: "Sládkovičovo",
    material: "Titán-zinok modrošedý – oplechovanie podhľadu",
    category: "titan",
    folder: "Rodinný dom v Sládkovičove Titánzinok modrošedý oplechovanie podhľadu",
    photos: ["IMGA0001.JPG", "IMGA0004.JPG", "IMGA0010.JPG", "IMGA0013.JPG"],
  },
  {
    slug: "samota-nova-bana",
    title: "Samota Nová Baňa",
    location: "Nová Baňa",
    material: "Titán-zinok bridlicový – horizontálne krytie",
    category: "titan",
    folder: "Samota Nová Baňa Titánzinok bridlicový horizontálne krytie",
    photos: ["IMGA0007.JPG", "IMGA0011.JPG", "IMGA0015.JPG", "IMGA0018.JPG"],
  },
  {
    slug: "sidlo-firmy-trencin",
    title: "Sídlo firmy a výrobná hala",
    location: "Trenčín",
    material: "Titán-zinok modrošedý",
    category: "titan",
    folder: "Sídlo firmy a výrobná hala Trenčín Titánzinok modrošedý",
    photos: ["IMG_3035.jpg", "IMG_3045.jpg", "P1010378.JPG"],
  },
];

export function photoUrl(folder: string, file: string): string {
  return `/projekty/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const categoryLabels: Record<ProjectCategory, string> = {
  titan: "Titán-zinok",
  pozinok: "Pozinkované plechy",
  med: "Medené strechy",
};
