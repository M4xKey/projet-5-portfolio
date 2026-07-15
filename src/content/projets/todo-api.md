---
titre: "To-do list avec citation du jour"
resume: "Une application de tâches en JavaScript modulaire : modules ES, état immutable, persistance localStorage et premier appel à une API externe."
stack: ["JavaScript", "Modules ES", "Fetch API"]
periode: "juillet 2026"
repo: "https://github.com/M4xKey/projet-2-todo-api"
ordre: 2
publie: true
---

## Contexte et objectif

Deuxième projet du parcours : passer du JavaScript "décoratif" du projet précédent à une vraie application avec de l'état, de la persistance et un appel réseau. Le cahier des charges : une to-do list complète (ajouter, cocher, supprimer) qui survit au rechargement, plus une citation du jour récupérée depuis une API externe.

L'objectif pédagogique : apprendre à **organiser du code** — plus question de tout mettre dans un seul fichier — et toucher pour la première fois à l'asynchrone.

## Ce qui a été construit

Une application découpée en quatre modules ES, chacun avec une responsabilité :

- `storage.js` — lire/écrire les tâches dans `localStorage` (sérialisation JSON) ;
- `tasks.js` — la logique métier : créer, ajouter, supprimer, basculer une tâche, et le rendu de la liste ;
- `quote.js` — l'appel `fetch` vers l'API de citations, avec gestion d'erreur ;
- `app.js` — l'orchestrateur : il branche le tout sur le DOM et les événements.

## Choix techniques

**L'état est immutable.** Aucune fonction ne modifie le tableau de tâches en place : `addTask` retourne un nouveau tableau avec spread, `removeTask` passe par `filter`, `toggleTask` par `map`. À l'époque c'était un exercice de style ; deux projets plus tard, en React, c'est devenu la règle du jeu — `setState` exige exactement cette discipline. Le meilleur investissement du parcours.

**`crypto.randomUUID()` pour les identifiants.** Plutôt qu'un compteur qui se répète après suppression, un identifiant unique natif du navigateur.

**`async/await` avec `try/catch`.** L'appel à l'API de citations peut échouer (réseau, service down) : la fonction retourne `null` en cas d'échec et l'interface affiche un message de repli au lieu de casser. Premier réflexe de programmation défensive côté réseau.

## Difficultés et leçons

**Séparer la logique du DOM… presque.** Le découpage en modules a clarifié énormément, mais `tasks.js` mélange encore la logique métier pure (testable sans navigateur) et le rendu DOM (`renderTasks`). Avec le recul, ce sont deux modules différents — c'est exactement la séparation que React institutionnalise avec ses composants d'un côté et son état de l'autre.

**Re-rendre toute la liste à chaque changement.** `renderTasks` vide le `<ul>` et reconstruit tout. Pour dix tâches, aucun problème ; pour dix mille, on comprendrait pourquoi les frameworks font du rendu différentiel. Poser le problème soi-même rend l'intérêt du Virtual DOM concret.

**Les modules ES imposent un serveur.** Contrainte découverte avec ce projet : `type="module"` ne fonctionne pas en ouvrant simplement le fichier (`file://`), il faut servir la page en HTTP — d'où l'utilité d'un petit serveur de dev même pour un projet sans build.
