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
    title: 'Photobooth numérique / Borne photo',
    description:
      "Impression instantanée, éclairage professionnel et une caisse d'accessoires fun. Vos invités repartent avec un souvenir imprimé sur-le-champ.",
    features: ['Tirages illimités', 'Éclairage pro', 'Accessoires fun', 'À partir de 150 €'],
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

// Galerie — sélection de photos réelles d'événements
export const gallery = [
  { src: asset('images/gallery/g01.jpg'), alt: 'Bande de souvenirs imprimés au photobooth' },
  { src: asset('images/gallery/g02.jpg'), alt: 'Jeunes mariés devant le photobooth' },
  { src: asset('images/gallery/g03.jpg'), alt: 'Photobooth aux couleurs Burger King' },
  { src: asset('images/gallery/g04.jpg'), alt: 'Chiffre lumineux « 50 » et décor floral' },
  { src: asset('images/gallery/g05.jpg'), alt: 'Chiffre lumineux « 30 » coloré' },
  { src: asset('images/gallery/g06.jpg'), alt: 'Fontaine à punch lumineuse — tonneau vintage' },
  { src: asset('images/gallery/g07.jpg'), alt: 'Photobooth installé dans un lieu de prestige' },
  { src: asset('images/gallery/g08.jpg'), alt: 'Fond à paillettes pour le photobooth' },
  { src: asset('images/gallery/g09.jpg'), alt: 'Décor à paillettes et ballons' },
  { src: asset('images/gallery/g10.jpg'), alt: 'Invités posant devant le photobooth' },
  { src: asset('images/gallery/g11.jpg'), alt: 'Terrain de pétanque mobile en extérieur' },
  { src: asset('images/gallery/g12.jpg'), alt: 'Souvenir imprimé lors d\'un baptême' },
];

// Références / partenaires.
// Avec logo → { label, logo, url? } ; sans logo → { label } (affiché en texte).
export const references = [
  { label: 'Hôtel du Collectionneur', logo: asset('images/logos/hotel-collectionneur.webp') },
  { label: 'Château de Champvallins', logo: asset('images/logos/champvallins.png') },
  { label: 'Mademoiselle Centre-Val de Loire', logo: asset('images/logos/mademoiselle.jpg') },
  { label: 'Burger King', logo: asset('images/logos/burger-king.svg') },
  { label: 'Guy Hoquet', logo: asset('images/logos/guy-hoquet.svg') },
  { label: 'FLS', logo: asset('images/logos/fls.jpg') },
  { label: 'Loiret Tourisme', logo: asset('images/logos/loiret-tourisme.svg'), url: 'https://www.tourismeloiret.com' },
  { label: 'Maison Delano — Paris', logo: asset('images/logos/delano.jpg') },
  // Sans logo → repris en texte sous les logos
  { label: 'Château de Cossoles' },
  { label: 'Lycée Duhamel' },
  { label: 'Mairie de Milly-la-Forêt' },
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
