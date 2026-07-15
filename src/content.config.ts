// Configuration des content collections (Content Layer API, Astro 5+/6).
// Chaque fichier Markdown dans src/content/projets/ devient une entrée
// de la collection "projets" — c'est ici que le frontmatter est validé.
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projets = defineCollection({
  // glob() lit tous les .md du dossier ; l'id de chaque entrée = nom du fichier sans extension
  loader: glob({ pattern: "**/*.md", base: "./src/content/projets" }),
  schema: z.object({
    titre: z.string(),
    resume: z.string(), // 1-2 phrases affichées sur la carte de l'accueil
    stack: z.array(z.string()),
    periode: z.string(), // ex. "juillet 2026" — texte libre, pas besoin d'une vraie date
    repo: z.string().url(),
    demo: z.string().url().optional(), // pas tous les projets ont une démo en ligne
    ordre: z.number(), // position dans la grille (1 = premier projet)
    publie: z.boolean().default(true), // false = brouillon, pas affiché sur le site
  }),
});

export const collections = { projets };
