## Installation
Projet disponnible ici : https://github.com/axelgazeau-fr/linxea
Necessite node 18+

## Commandes
cd linxea-test
npm install
npm run dev

## urls
Listes des articles : http://localhost:3000/articles
Article : http://localhost:3000/articles/{slug} (ex: http://localhost:3000/articles/per-retraite)

## Choix techniques

Le projet est réalisé avec Next.js et TypeScript, en utilisant Tailwind CSS pour le style et TanStack Query pour la gestion des données.

Pour les informations des articles, j’ai créé une mini API avec Hono, au lieu d’importer directement des fichiers JSON, afin de rendre le projet plus réaliste. L’API est disponible sur mon GitHub.

Le projet est en CSR (Client-Side Rendering), étant donné la légèreté du contenu. Les appels API sont effectués côté client avec TanStack Query, ce qui permet une gestion efficace du cache grâce aux queryKey.

Dans un projet plus conséquent, mais dans un contexte similaire, j’opterais pour une approche SSG (Static Site Generation) avec revalidation. Cette solution présente plusieurs avantages :

- revalidation personnalisable des articles (refresh du contenu à un intervalle défini, sans besoin de rebuild complet),
- meilleures performances SEO,
- exécution plus rapide