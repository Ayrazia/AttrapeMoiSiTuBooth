// ============================================================
//  Données du site — modifie ce fichier pour changer le contenu
// ============================================================

export const brand = {
  name: 'Attrape Moi Si Tu Booth',
  tagline: 'Location de photobooth & animations événementielles',
  baseline: 'Des souvenirs uniques, fun et instantanés pour vos plus beaux moments.',
  founder: 'Fredo',
};

export const contact = {
  phone: '06 31 62 35 69',
  phoneHref: 'tel:+33631623569',
  email: 'attrape.moisi.tubooth@outlook.com',
  zone: 'Centre-Val de Loire · Île-de-France',
  instagram: 'attrape.moisi.tubooth',
  instagramUrl: 'https://www.instagram.com/attrape.moisi.tubooth/',
};

// Prestations proposées
export const services = [
  {
    // slug = nom du dossier dans src/prestations/ (dépose tes photos dedans)
    slug: 'photobooth',
    icon: 'camera',
    title: 'Photobooth / Borne photo',
    description:
      "Impression instantanée, éclairage professionnel et une caisse d'accessoires fun. Vos invités repartent avec un souvenir imprimé sur-le-champ.",
    features: ['Tirages illimités', 'Éclairage pro', 'Accessoires fun', 'Prise en main facile'],
    featured: true,
  },
  {
    slug: 'livre-audio',
    icon: 'mic',
    title: 'Livre audio',
    description:
      "Vos invités laissent un message vocal rempli d'émotion. Un souvenir vivant que vous pourrez réécouter encore et encore.",
    features: ['Messages vocaux', 'Souvenir à réécouter', 'Animation originale'],
  },
  {
    slug: 'fontaine-punch',
    icon: 'martini',
    title: 'Fontaine à punch & tonneau vintage',
    description:
      'Un tonneau au style vintage pour faire couler le bon punch toute la soirée. Ambiance conviviale garantie.',
    features: ['Style vintage', 'Convivialité', 'Effet garanti'],
  },
  {
    slug: 'chiffres-lumineux',
    icon: 'lightbulb',
    title: 'Chiffres lumineux',
    description:
      "Des chiffres lumineux XXL pour habiller votre décor et marquer l'occasion : anniversaires, dates de mariage, jubilés…",
    features: ['Décor lumineux', 'Format XXL', 'Personnalisable'],
  },
  {
    slug: 'petanque',
    icon: 'target',
    title: 'Terrain de pétanque mobile',
    description:
      "Un terrain de pétanque mobile de 2 × 7 m, installé en un clin d'œil. L'animation originale pour vos événements en intérieur comme en extérieur.",
    features: ['2 × 7 mètres', 'Installation rapide', '250 € la journée'],
  },
];

// Types d'événements couverts
export const events = [
  { icon: 'heart', label: 'Mariages' },
  { icon: 'cake', label: 'Anniversaires' },
  { icon: 'baby', label: 'Baptêmes' },
  { icon: 'party', label: 'Soirées privées' },
  { icon: 'building', label: "Séminaires d'entreprise" },
  { icon: 'graduation', label: 'Soirées étudiantes' },
];

// Préfixe le chemin avec la base du site (gère le sous-dossier GitHub Pages)
const asset = (p) => `${import.meta.env.BASE_URL}${p}`;

// Galerie — images téléchargées depuis le compte Instagram (@attrape.moisi.tubooth)
export const gallery = [
  { src: asset('images/gallery/photobooth-ambiance.jpg'), alt: 'Photobooth en pleine soirée, sourires et bonne humeur' },
  { src: asset('images/gallery/mariage-chateau.jpg'), alt: 'Photobooth vintage au Château de Cossoles pour un mariage' },
  { src: asset('images/gallery/hotel-5-etoiles.jpg'), alt: "Photobooth installé dans un hôtel 5 étoiles à Paris" },
  { src: asset('images/gallery/soiree-potes.jpg'), alt: 'Bande de potes et accessoires devant le photobooth' },
  { src: asset('images/gallery/petanque.jpg'), alt: 'Terrain de pétanque mobile en intérieur' },
  { src: asset('images/gallery/livre-audio.jpg'), alt: 'Livre audio pour recueillir les messages des invités' },
  { src: asset('images/gallery/lycee-duhamel.jpg'), alt: 'Photobooth lors d\'un événement au lycée Duhamel' },
  { src: asset('images/gallery/paris-hotel.jpg'), alt: 'Événement à Paris à l\'Hôtel du Collectionneur' },
  { src: asset('images/gallery/soiree-iles.jpg'), alt: 'Soirée à thème îles avec photobooth et tonneau à punch' },
  { src: asset('images/gallery/couple.jpg'), alt: 'Le duo derrière Attrape Moi Si Tu Booth' },
  { src: asset('images/gallery/fredo-createur.jpg'), alt: 'Fredo, le créateur d\'Attrape Moi Si Tu Booth' },
];

// Références / lieux marquants
export const references = [
  'Hôtel du Collectionneur — Paris 5★',
  'Maison Delano — Paris',
  'Château de Cossoles',
  'Lycée Duhamel',
];

// ⚠️ À REMPLACER par de vrais avis clients (voir note transmise).
export const testimonials = [
  {
    quote:
      "Le photobooth a été l'attraction de notre mariage ! Fredo est au top, réactif et de très bon conseil. Tous nos invités en parlent encore.",
    author: 'Camille & Thomas',
    event: 'Mariage',
  },
  {
    quote:
      "Animation parfaite pour notre séminaire d'entreprise. Installation rapide, matériel de qualité et une ambiance folle. Je recommande à 100 %.",
    author: 'Julie R.',
    event: "Séminaire d'entreprise",
  },
  {
    quote:
      "On a adopté le livre audio pour le baptême de notre fils : réécouter les messages des proches, c'est juste magique. Merci pour ce beau souvenir.",
    author: 'Sofiane & Nadia',
    event: 'Baptême',
  },
];
