# Plan de migration Supabase → Neon + Stack Auth

## 1. Désinstallation de Supabase
- Supprimer la dépendance `@supabase/supabase-js` :
  ```bash
  npm uninstall @supabase/supabase-js
  ```

## 2. Mise en place de Neon
- Créer un compte et un projet sur https://neon.tech/
- Créer une base de données et récupérer l’URL de connexion PostgreSQL.
- (Optionnel) Importer les données existantes si besoin.

## 3. Déploiement de Stack Auth
- Suivre la documentation officielle : https://docs.stack-auth.com/next/overview
- Créer un projet sur le dashboard Stack Auth, générer les clés API (projectId, publishableClientKey, secretServerKey).
- Déployer Stack Auth (Vercel, Docker, etc.).
- Configurer les variables d’environnement (connexion Neon, secrets JWT, etc.).

## 4. Intégration Stack Auth côté client (Expo/React Native)
- Installer le SDK :
  ```bash
  npm install @stackframe/react
  ```
- Créer un fichier `stack.ts` à la racine du projet :
  ```ts
  import { StackClientApp } from "@stackframe/react";
  export const stackClientApp = new StackClientApp({
    projectId: "your-project-id",
    publishableClientKey: "your-publishable-client-key",
    tokenStore: "expo-secure-store", // ou "memory"
  });
  ```
- Envelopper l’app avec le provider Stack dans `_layout.tsx` ou `App.tsx` :
  ```tsx
  import { StackProvider } from "@stackframe/react";
  import { stackClientApp } from "./stack";
  // ...existing code...
  export default function App() {
    return (
      <StackProvider app={stackClientApp}>
        {/* ...le reste de l’app... */}
      </StackProvider>
    );
  }
  ```
- Utiliser les hooks Stack pour l’authentification :
  ```ts
  import { useStackUser } from "@stackframe/react";
  const user = useStackUser();
  // user contient les infos, ou null si non connecté
  ```
- Pour chaque appel à l’API backend, envoyer le token d’accès Stack dans les headers :
  ```ts
  const { accessToken } = await user.getAuthJson();
  await fetch("https://ton-backend/api/endpoint", {
    headers: {
      "x-stack-access-token": accessToken,
    },
  });
  ```

## 5. Création d’un backend/API (Node.js/Express, Next.js API routes, etc.)
- Utiliser le package `pg` pour se connecter à Neon côté backend.
- Protéger les endpoints avec Stack Auth :
  - Vérification JWT (rapide, locale) :
    ```js
    import * as jose from "jose";
    const jwks = jose.createRemoteJWKSet(new URL("https://api.stack-auth.com/api/v1/projects/<your-project-id>/.well-known/jwks.json"));
    const { payload } = await jose.jwtVerify(accessToken, jwks);
    // payload.sub = userId
    ```
  - Ou vérification REST API (infos complètes) :
    ```js
    const response = await fetch("https://api.stack-auth.com/api/v1/users/me", {
      headers: {
        "x-stack-access-type": "server",
        "x-stack-project-id": "<project-id>",
        "x-stack-secret-server-key": "<secret-server-key>",
        "x-stack-access-token": accessToken,
      },
    });
    if (response.status === 200) {
      const user = await response.json();
      // user authentifié
    }
    ```
- Implémenter les routes CRUD pour Neon et sécuriser chaque accès.

## 6. Sécurité et permissions
- Configurer les policies et rôles dans Stack Auth (voir https://docs.stack-auth.com/next/policies).
- Si backend custom, vérifier les permissions côté serveur avant chaque opération sur Neon.

## 7. Tests
- Tester tous les flux d’authentification (inscription, connexion, déconnexion, récupération de session).
- Tester tous les accès aux données (lecture, écriture, modification, suppression).

## 8. Nettoyage
- Supprimer tous les fichiers et références à Supabase (`lib/supabase.ts`, etc.).
- Mettre à jour la documentation du projet.

---

### Fichiers principaux à modifier côté client :
- `package.json` (dépendances)
- `lib/supabase.ts` (à supprimer/remplacer)
- `context/AuthContext.tsx` (authentification)
- `stack.ts` (nouveau)
- `_layout.tsx` ou `App.tsx` (provider Stack)
- Toutes les pages/services qui utilisaient Supabase

---

### Ressources utiles
- [Stack Auth Quickstart](https://docs.stack-auth.com/next/quickstart)
- [Neon Node.js Guide](https://neon.com/docs/guides/nodejs)
- [Stack Auth API Reference](https://docs.stack-auth.com/next/api-reference)
