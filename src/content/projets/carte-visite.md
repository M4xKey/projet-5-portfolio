---
titre: "Carte de visite en ligne"
resume: "Une page portfolio en HTML/CSS/JS pur : carte responsive, mode sombre mémorisé et copie d'email en un clic. Le projet des fondations."
stack: ["HTML", "CSS", "JavaScript"]
periode: "juillet 2026"
repo: "https://github.com/M4xKey/projet-1-carte-visite"
ordre: 1
publie: true
---

## Contexte et objectif

Premier projet de mon parcours d'apprentissage du développement web : construire une carte de visite en ligne sans framework, sans bibliothèque, sans outil de build. Juste trois fichiers — `index.html`, `style.css`, `script.js` — pour poser les fondations : structure sémantique, mise en page moderne et premières interactions JavaScript.

L'objectif pédagogique était double : comprendre ce que le navigateur fait *vraiment* avant de déléguer quoi que ce soit à un framework, et livrer quelque chose de montrable dès le premier projet.

## Ce qui a été construit

Une page "carte" centrée qui présente un profil : identité, à propos, compétences, une grille de projets (ajoutée au fur et à mesure que les projets suivants sortaient) et une section contact. Trois fonctionnalités interactives :

- un **toggle mode clair / mode sombre**, avec mémorisation du choix dans `localStorage` pour que la préférence survive au rechargement ;
- un bouton **« Copier l'email »** basé sur l'API `navigator.clipboard`, avec feedback visuel temporaire (« Copié ! ») ;
- un **layout responsive** : grille de projets en deux colonnes qui repasse en une colonne sous 600 px.

## Choix techniques

**HTML sémantique d'abord.** `<main>`, `<header>`, `<section>`, `<article>`, `<footer>` plutôt que des `<div>` partout — et un `aria-label` sur le bouton de thème, parce qu'un bouton qui n'affiche qu'un emoji ne dit rien à un lecteur d'écran.

**Flexbox pour centrer, Grid pour la grille.** Les deux outils de layout modernes, chacun là où il excelle : Flexbox pour le centrage global de la carte, CSS Grid pour la grille de projets.

**Le mode sombre par classe CSS.** Une classe `dark-mode` sur `<body>` que le JavaScript ajoute ou retire, et le CSS redéfinit les couleurs sous cette classe. Simple et lisible.

## Difficultés et leçons

**La duplication des couleurs.** Chaque couleur du thème clair est redéclarée à la main dans les règles `body.dark-mode ...` — une vingtaine de règles dupliquées. C'est exactement le problème que résolvent les *custom properties* CSS (`--variable`) : ce portfolio, construit trois projets plus tard, utilise des variables et le thème sombre tient en une dizaine de lignes. Voir la différence entre les deux approches est la meilleure leçon du projet.

**`localStorage` ne stocke que des chaînes.** Première rencontre avec la persistance côté navigateur, et avec ses limites : tout est chaîne de caractères, il faut y penser dès qu'on veut stocker autre chose.

**Ce que je referais autrement.** Utiliser `prefers-color-scheme` pour respecter la préférence système par défaut, et des variables CSS dès le départ.
