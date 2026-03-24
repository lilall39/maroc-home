/**
 * Données des projets – utilisé par la page détail projet
 */
const PROJETS_DATA = [
  {
    id: 1,
    title: "Cuisine Moderne",
    category: "Cuisine",
    filter: "moderne",
    type: "Cuisine sur mesure",
    lieu: "Paris 11e",
    annee: "2024",
    description: "Réhabilitation complète d’une cuisine dans un immeuble haussmannien. Nous avons conçu un espace de travail fluide avec des matériaux nobles : plan de travail en pierre, meubles sur mesure en chêne massif et électroménager intégré. L’îlot central devient le cœur de la pièce, entre préparation et convivialité.",
    mainImage: "../assets/images/projet-1-hero.png",
    gallery: [
      "../assets/images/realisation-1-carte.png",
      {
        type: "text",
        content: "Avis du client",
        image: "../assets/images/projet-1-avis-client.png",
        revealOnImageClick: 0
      },
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80"
    ]
  },
  {
    id: 2,
    title: "Salle de bain Pierre & Bois",
    category: "Salle de bain",
    filter: "moderne",
    type: "Salle de bain",
    lieu: "Boulogne-Billancourt",
    annee: "2024",
    description: "Création d’une salle de bain épurée où la pierre naturelle et le bois se répondent. Douche à l’italienne, vasque sur mesure et rangements intégrés pour un espace à la fois fonctionnel et apaisant. Finitions soignées et éclairage indirect pour une ambiance haut de gamme.",
    mainImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dac4a53f0?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
    ]
  },
  {
    id: 3,
    title: "Salon Lumineux",
    category: "Aménagement sur mesure",
    filter: "moderne",
    type: "Salon & séjour",
    lieu: "Neuilly-sur-Seine",
    annee: "2023",
    description: "Aménagement d’un grand séjour traversant avec une volonté de préserver la lumière et d’ouvrir l’espace. Mobilier sur mesure (bibliothèque, dressings), parquet en chêne massif et menuiseries repeintes. L’ensemble respire la sérénité et l’équilibre entre classicisme et contemporain.",
    mainImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80"
    ]
  },
  {
    id: 4,
    title: "Bureau Minimaliste",
    category: "Moderne",
    filter: "moderne",
    type: "Bureau / Télétravail",
    lieu: "Paris 8e",
    annee: "2023",
    description: "Espace de travail intégré dans un appartement familial. Plan de travail en continu, rangements discrets et éclairage adapté. L’objectif : un bureau performant sans envahir le séjour, avec une esthétique sobre et cohérente avec le reste du lieu.",
    mainImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
    ]
  },
  {
    id: 5,
    title: "Appartement Paris 16e",
    category: "Traditionnel",
    filter: "traditionnel",
    type: "Rénovation complète",
    lieu: "Paris 16e",
    annee: "2023",
    description: "Rénovation d’un bel appartement haussmannien en respectant l’esprit des lieux : moulures, parquet à l’ancienne, cheminée. Nous avons modernisé les réseaux, les cuisines et salles de bain tout en conservant le caractère et la noblesse du bâti. Résultat : un intérieur raffiné et parfaitement fonctionnel.",
    mainImage: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80"
    ]
  },
  {
    id: 6,
    title: "Villa Côte d’Azur",
    category: "Futuriste",
    filter: "futuriste",
    type: "Villa contemporaine",
    lieu: "Saint-Jean-Cap-Ferrat",
    annee: "2024",
    description: "Aménagement intérieur d’une villa contemporaine face à la mer. Lignes épurées, grandes baies vitrées et matériaux bruts (beton ciré, métal, verre). L’intérieur dialogue avec le paysage et privilégie la lumière et les espaces fluides. Piscine intérieure et terrasses intégrées au projet.",
    mainImage: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dac4a53f0?w=800&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80"
    ]
  },
  {
    id: 7,
    title: "Maison familiale",
    category: "Traditionnel",
    filter: "traditionnel",
    type: "Maison individuelle",
    lieu: "Versailles",
    annee: "2023",
    description: "Extension et réaménagement d’une maison de famille. Nouvelle cuisine ouverte sur le jardin, agrandissement des ouvertures et mise aux normes. Ambiance chaleureuse et matériaux durables pour un cadre de vie adapté à une famille.",
    mainImage: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
    ]
  },
  {
    id: 8,
    title: "Loft industriel",
    category: "Futuriste",
    filter: "futuriste",
    type: "Loft",
    lieu: "Paris 19e",
    annee: "2024",
    description: "Transformation d’un ancien atelier en loft habitable. Conservation des structures (poutres, briques) et insertion de volumes contemporains (cuisine, chambre en mezzanine). Ambiance industrielle assumée avec un confort et une finition soignés.",
    mainImage: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80"
    ]
  }
];
