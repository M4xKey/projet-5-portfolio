---
titre: "Application React de recettes"
resume: "Le front qui consomme mon API : React 19, migration progressive vers TypeScript strict, authentification par Context, et tests avec MSW."
stack: ["React 19", "TypeScript", "Vite", "Vitest", "MSW"]
periode: "juillet 2026"
repo: "https://github.com/M4xKey/projet-4-react-recettes"
demo: "https://projet-4-react-recettes.vercel.app"
ordre: 4
publie: true
---

## Contexte et objectif

Quatrième projet, celui qui referme la boucle : une application React qui consomme l'API de recettes construite au projet précédent. Consultation publique des recettes, connexion/inscription, et ajout/suppression réservés aux utilisateurs connectés — chacun ne pouvant supprimer que ses propres recettes.

Objectif pédagogique : le passage au framework (composants, état, contexte), puis deux montées en exigence sur un code qui marchait déjà : la migration vers TypeScript et une vraie suite de tests.

## Ce qui a été construit

Une SPA Vite + React 19 déployée sur Vercel :

- des **composants contrôlés** pour les formulaires (connexion/inscription, ajout de recette) ;
- un **AuthContext** qui centralise le token JWT, l'utilisateur courant et les fonctions `login` / `register` / `logout` — accessible partout via un hook `useAuth` maison ;
- la gestion des **sessions expirées** : toute réponse 401 de l'API déconnecte proprement l'utilisateur avec un message, plutôt que d'échouer en silence ;
- des **tests** Vitest + React Testing Library, avec MSW pour simuler l'API, et un workflow CI GitHub Actions.

## Choix techniques

**Context plutôt que du prop drilling.** Le token et l'utilisateur sont nécessaires un peu partout ; les faire descendre de composant en composant aurait pollué toutes les signatures. Le pattern `Provider` + hook `useAuth` (qui lève une erreur claire s'il est utilisé hors du Provider) est le premier vrai pattern d'architecture React du parcours.

**`sessionStorage` plutôt que `localStorage` pour le token.** Un JWT volé se rejoue ; le garder dans une session qui meurt avec l'onglet réduit la fenêtre d'exposition. Compromis assumé : on se reconnecte à chaque visite.

**Migration TypeScript fichier par fichier.** Vite permet de faire cohabiter `.jsx` et `.tsx`, donc la migration s'est faite par petits commits, en commençant par les types partagés (`Recette`, `Utilisateur`). Une fois tout migré : activation du mode `strict`, puis de `noUnusedLocals` / `noUnusedParameters` — le compilateur a immédiatement trouvé des choses à redire, c'est le but.

**MSW pour tester au niveau réseau.** Plutôt que de mocker `fetch` à la main, MSW intercepte les vraies requêtes HTTP et y répond avec des handlers déclaratifs. Les tests exercent le vrai code réseau de l'application, pas une version court-circuitée.

## Difficultés et leçons

**L'URL de l'API codée en dur.** La première version pointait `http://localhost:3000` en dur — impossible à déployer. Passage par une variable d'environnement `VITE_API_URL`, avec repli local par défaut. Leçon simple mais structurante : toute valeur qui change entre dev et prod doit sortir du code.

**Décoder un JWT côté client sans le vérifier.** Le front décode le payload du token (base64) pour afficher l'email et l'id — mais ne peut pas *vérifier* la signature : seule l'API le peut. Comprendre cette asymétrie (le client lit, le serveur fait foi) clarifie beaucoup le modèle de sécurité de JWT.

**TypeScript strict après coup, c'est un audit gratuit.** Activer `strict` sur du code existant fait remonter les `null` non gérés et les types trop optimistes. Le faire en fin de projet a transformé la migration en session de review du code — la prochaine fois, TypeScript strict dès le premier fichier.
