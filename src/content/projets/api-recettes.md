---
titre: "API REST de recettes (Node/Express)"
resume: "Une API complète : CRUD, authentification JWT, persistance qui a évolué de JSON à PostgreSQL via Prisma, tests d'intégration et CI."
stack: ["Node.js", "Express 5", "Prisma", "PostgreSQL", "JWT", "Vitest"]
periode: "juillet 2026"
repo: "https://github.com/M4xKey/projet-3-api-recettes"
demo: "https://projet-3-api-recettes.onrender.com/recettes"
ordre: 3
publie: true
---

## Contexte et objectif

Troisième projet : passer côté serveur. Après avoir *consommé* une API dans le projet précédent, l'objectif était d'en *construire* une — une API REST de recettes de cuisine avec comptes utilisateurs, droits d'accès et vraie base de données. C'est aussi le backend qu'utilise le projet suivant (l'application React).

## Ce qui a été construit

Une API Express avec deux groupes de routes :

- `/recettes` — CRUD complet : lecture publique, création/modification/suppression réservées aux utilisateurs connectés, et uniquement sur **leurs propres** recettes (403 sinon) ;
- `/auth` — inscription et connexion, avec mots de passe hashés (bcrypt) et émission d'un token JWT valable 7 jours.

Autour du code : des tests unitaires sur la validation, des tests d'intégration Vitest + Supertest sur les routes, un workflow CI GitHub Actions qui rejoue les tests à chaque push, et un déploiement sur Render.

## Choix techniques

**La persistance a évolué en trois étapes** — et c'est voulu : d'abord un fichier JSON (comprendre le besoin), puis SQLite via Prisma (comprendre l'ORM et les migrations), enfin PostgreSQL (la base de production). Grâce à Prisma, la dernière migration a surtout consisté à changer le *datasource* — le code des routes n'a presque pas bougé. C'est l'argument des ORM rendu tangible.

**`app.js` séparé de `server.js`.** L'application Express est exportée sans être démarrée ; `server.js` ne fait que `listen`. Ce découpage de neuf lignes est ce qui rend les tests d'intégration possibles : Supertest importe `app` et simule des requêtes sans ouvrir de port.

**Un middleware d'authentification maison.** Plutôt qu'une bibliothèque toute faite, un middleware de vingt lignes qui extrait le `Bearer` token, le vérifie et attache `req.user` — la meilleure façon de comprendre ce que font les solutions clés en main.

**La validation dans un module dédié.** Les règles métier (`tempsPreparation` doit être un nombre positif…) vivent dans `validation/recette.js`, des fonctions pures testables unitairement, indépendantes d'Express.

## Difficultés et leçons

**La validation est arrivée après les premiers oublis.** La première version acceptait n'importe quoi dans `tempsPreparation` ; la règle de validation a été ajoutée dans un second temps, avec ses tests. Leçon retenue : côté serveur, tout ce qui entre est suspect — la validation n'est pas une option qu'on ajoute plus tard.

**Deux erreurs différentes pour deux cas différents.** Distinguer 401 (pas identifié), 403 (identifié mais pas propriétaire) et 404 (ressource inexistante) force à penser le contrôle d'accès sérieusement, pas juste "connecté ou non".

**Le message d'erreur de login volontairement flou.** « Email ou mot de passe incorrect » dans les deux cas : ne pas révéler si un email existe en base est un réflexe de sécurité de base contre l'énumération de comptes.
