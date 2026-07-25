# Photos des prestations 📸

Chaque dossier ici correspond à une **animation**. Les photos qu'il contient
s'affichent automatiquement dans la **modal** qui s'ouvre quand on clique sur
l'animation sur le site.

## Ajouter des photos

1. Ouvre le dossier de l'animation voulue :
   - `photobooth/` → Photobooth / Borne photo
   - `livre-audio/` → Livre audio
   - `fontaine-punch/` → Fontaine à punch & tonneau vintage
   - `chiffres-lumineux/` → Chiffres lumineux
   - `petanque/` → Terrain de pétanque mobile
2. **Glisse tes photos dedans** (formats acceptés : `.jpg`, `.jpeg`, `.png`, `.webp`).
3. C'est tout ! La photo apparaît toute seule dans la modal.
   - En développement (`npm run dev`) : elle apparaît sans rien relancer.
   - En ligne : elle sera incluse au prochain `npm run build`.

## Ordre d'affichage

Les photos sont triées par **nom de fichier**. Pour choisir l'ordre, préfixe-les :
`01-...`, `02-...`, `03-...` etc. La première photo (`01-`) sert de photo
principale à l'ouverture de la modal.

## Ajouter une nouvelle animation

1. Crée un nouveau dossier ici (ex. `mon-animation/`) et mets-y des photos.
2. Dans `src/data/site.js`, ajoute la prestation dans `services` avec
   `slug: 'mon-animation'` (le slug doit être identique au nom du dossier).

## Astuce poids des images

Pour un site rapide, garde des photos raisonnables (~1500 px de large, < 500 Ko).
Tu peux les compresser sur https://squoosh.app avant de les déposer.
