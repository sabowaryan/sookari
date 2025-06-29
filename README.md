# Sookari - Le Marché Connecté de Kinshasa

Sookari est une application mobile de marketplace locale qui connecte acheteurs, vendeurs et livreurs à Kinshasa, République Démocratique du Congo. L'application facilite le commerce local en permettant aux utilisateurs d'acheter et vendre des produits frais et authentiques tout en offrant un service de livraison rapide et fiable.

## 🌟 Fonctionnalités Principales

### Pour les Acheteurs (Clients)
- **Navigation intuitive** : Interface moderne avec navigation par onglets
- **Catalogue de produits** : Parcourir les produits par catégories (Alimentation, Vêtements, Électronique, etc.)
- **Recherche avancée** : Trouver facilement des produits spécifiques
- **Panier intelligent** : Gestion du panier avec calcul automatique des totaux
- **Système de favoris** : Sauvegarder les produits préférés
- **Évaluations et avis** : Consulter les notes et commentaires des autres utilisateurs
- **Livraison rapide** : Livraison en 30-60 minutes dans toute la ville

### Pour les Vendeurs
- **Publication facile** : Ajouter des produits en quelques clics
- **Gestion des photos** : Upload jusqu'à 5 photos par produit avec support vidéo
- **Catégorisation** : Organiser les produits par catégories
- **Gestion des prix** : Définir les prix en Francs Congolais (FC)
- **Suivi des ventes** : Tableau de bord pour suivre les performances
- **Communication directe** : Messagerie intégrée avec les clients

### Pour les Livreurs
- **Demandes de livraison** : Voir les nouvelles demandes en temps réel
- **Navigation GPS** : Intégration avec les services de navigation
- **Gestion des revenus** : Suivi des gains et statistiques
- **Système de priorité** : Livraisons urgentes et normales
- **Communication client** : Appel direct et messagerie

## 🏗️ Architecture Technique

### Frontend
- **React Native** avec Expo SDK 53
- **Expo Router** pour la navigation
- **TypeScript** pour la sécurité des types
- **Lucide React Native** pour les icônes
- **Expo Video** pour la lecture de contenu multimédia

### Backend & Base de Données
- **Supabase** comme backend-as-a-service
- **PostgreSQL** avec Row Level Security (RLS)
- **Authentification** par email/mot de passe
- **Stockage sécurisé** avec Expo Secure Store

### Fonctionnalités Avancées
- **Système de rôles** : Customer, Seller, Delivery Driver
- **Authentification sécurisée** : Gestion des sessions avec Supabase Auth
- **Gestion d'état** : Context API pour le panier et l'authentification
- **Interface responsive** : Optimisée pour mobile et web
- **Animations fluides** : Transitions et micro-interactions

## 🎨 Design & UX

- **Design moderne** : Interface inspirée des meilleures pratiques mobiles
- **Couleurs de marque** : Orange (#FF6B35) et Teal (#00B4A6)
- **Typographie claire** : Hiérarchie visuelle optimisée
- **Micro-interactions** : Feedback visuel pour toutes les actions
- **Accessibilité** : Contraste et tailles de police optimisés

## 🔐 Sécurité & Permissions

### Système de Rôles
- **Client** : Rôle par défaut, peut acheter et évaluer
- **Vendeur** : Peut vendre des produits et gérer son inventaire
- **Livreur** : Peut accepter et effectuer des livraisons

### Sécurité des Données
- **Row Level Security (RLS)** : Protection au niveau base de données
- **Authentification JWT** : Tokens sécurisés pour les sessions
- **Validation côté serveur** : Toutes les données sont validées
- **Stockage chiffré** : Informations sensibles protégées

## 🚀 Installation & Développement

### Prérequis
- Node.js 18+
- Expo CLI
- Compte Supabase

### Configuration
1. Cloner le repository
2. Installer les dépendances : `npm install`
3. Configurer les variables d'environnement Supabase
4. Lancer le serveur de développement : `npm run dev`

### Variables d'Environnement
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📱 Plateformes Supportées

- **iOS** : Compatible iPhone et iPad
- **Android** : Compatible smartphones et tablettes
- **Web** : Version web responsive

## 🌍 Localisation

- **Langue principale** : Français
- **Devise** : Franc Congolais (FC)
- **Zone géographique** : Kinshasa, RDC

## 🔄 Statut du Projet

Sookari est actuellement en développement actif avec les fonctionnalités principales implémentées :

✅ Authentification et gestion des utilisateurs  
✅ Système de rôles et permissions  
✅ Catalogue de produits et recherche  
✅ Panier et gestion des commandes  
✅ Interface vendeur et livreur  
✅ Design responsive et animations  

🚧 En cours de développement :
- Système de paiement mobile
- Notifications push
- Chat en temps réel
- Géolocalisation avancée

- Ce projet a été réalisé dans le cadre du World’s Largest Hackathon organisé par Bolt.new.

✅ Badge visible sur la page d’accueil

✅ Badge cliquable redirigeant vers https://bolt.new

## 📄 Licence

Ce projet est développé pour la communauté de Kinshasa dans le but de faciliter le commerce local et soutenir l'économie numérique en République Démocratique du Congo.

---

**Sookari** - Connecter Kinshasa, un produit à la fois 🛒🇨🇩
