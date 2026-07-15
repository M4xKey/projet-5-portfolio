# Projet 5 — Portfolio (Astro)

Portfolio personnel construit avec [Astro](https://astro.build) : une page d'accueil avec la grille des projets, et une étude de cas par projet, rédigée en Markdown.

C'est la vitrine du parcours d'apprentissage web dev — et une **machine à études de cas** : publier un nouveau projet = déposer un fichier `.md` dans `src/content/projets/`.

## Fonctionnement

```
src/
├── content.config.ts        → schéma de la collection "projets" (frontmatter validé)
├── content/projets/*.md     → une étude de cas par projet (le contenu du site)
├── layouts/Base.astro       → structure HTML commune (header, footer)
├── pages/index.astro        → accueil : bio + grille des projets
├── pages/projets/[slug].astro → page générée pour chaque .md
└── styles/global.css        → styles (palette héritée du projet-1, dark mode auto)
```

Chaque fichier Markdown a un frontmatter (`titre`, `resume`, `stack`, `periode`, `repo`, `demo`, `ordre`, `publie`) validé au build : un champ manquant = erreur de build, pas une page cassée en prod.

`publie: false` permet de garder un brouillon dans le dossier sans le mettre en ligne.

## Ajouter une étude de cas

1. Créer `src/content/projets/mon-projet.md` (le nom du fichier devient l'URL : `/projets/mon-projet/`)
2. Remplir le frontmatter + le contenu (trame : contexte → construit → choix techniques → difficultés et leçons)
3. `npm run build` pour vérifier, puis commit

L'agent `dev-case-study` (voir `.claude/agents/` à la racine de `Web dev`) génère un brouillon automatiquement en fin de projet.

## Commandes

Prérequis : **Node.js ≥ 22.12** (exigé par Astro 6 — vérifier avec `node --version`).

```bash
npm install       # installer les dépendances
npm run dev       # serveur de dev → http://localhost:4321
npm run build     # build de production dans dist/
npm run preview   # prévisualiser le build
```

## Déploiement (Vercel)

1. Pousser le repo sur GitHub
2. Sur vercel.com : "Add New Project" → importer le repo — Vercel détecte Astro tout seul
3. Chaque push sur `main` redéploie automatiquement

Penser à mettre à jour `site` dans `astro.config.mjs` avec l'URL définitive.

## À personnaliser

Les textes de bio sont des placeholders : chercher `Prénom NOM` dans `src/layouts/Base.astro` et `src/pages/index.astro`.
