# Contexte Claude Code - Projet Themes

## Vue d'ensemble du projet

Projet Next.js 15 basé sur le template nextjs_template, dédié au développement d'un système de thèmes avancé.

**Application complète de génération et test de thèmes UI** avec :
- Système de thèmes basé sur OKLCH (couleurs perceptuellement uniformes)
- Génération automatique de palettes à partir de 2 couleurs principales
- Prévisualisation temps réel sur tous les composants Shadcn/ui
- Éditeur interactif de thèmes avec export de code
- Interface responsive avec navigation unifiée

## Architecture technique

### Stack
- **Framework :** Next.js 15 avec App Router et Turbopack
- **Langage :** TypeScript
- **Authentification :** NextAuth.js v5 (GitHub, Google)
- **Base de données :** PostgreSQL sur NUC (192.168.1.30:5432)
- **ORM :** Prisma
- **Styling :** Tailwind CSS 4 + Shadcn/ui
- **Couleurs :** Système OKLCH pour uniformité perceptuelle
- **Déploiement :** PM2 multi-environnement

### Base de données
- **Serveur :** NUC à l'adresse 192.168.1.30:5432
- **Base :** `themes-dev`
- **Utilisateur :** `user_themes_dev`
- **Configuration :** DATABASE_URL dans `.env.local` ET `.env` (requis pour Prisma CLI)

## Structure de l'application

### Pages principales
- **`/`** - Page d'accueil avec présentation du générateur de thèmes
- **`/demo`** - Démonstration de tous les composants Shadcn/ui avec sélecteur de thèmes
- **`/theme-editor`** - Éditeur interactif pour créer des thèmes personnalisés

### Composants clés
- **`MainNav`** - Navigation principale avec highlighting automatique
- **`AdvancedThemeSwitcher`** - Sélecteur de thèmes avec aperçu dual-color
- **`ThemeGenerator`** - Système de génération de palettes OKLCH
- **Thèmes prédéfinis** - Produire, Comprendre, Optimiser + thèmes demo

## Particularités du projet

### Système de thèmes OKLCH
- **Génération automatique** à partir de 2 couleurs principales (primary/secondary)
- **Variantes automatiques** : light/dark, muted/vibrant, variants de luminosité
- **Prévisualisation temps réel** avec application DOM directe
- **Palette réactive** : mise à jour automatique + bouton de régénération manuelle
- **Export de code** pour intégration facile dans PREDEFINED_THEMES
- **Invalidation forcée** avec `useMemo` et clé de régénération

### Configuration Prisma
- **Important :** Prisma CLI ne lit que `.env`, pas `.env.local`
- **Solution :** Copier `.env.local` vers `.env` avant les commandes Prisma
- **Commande :** `cp .env.local .env`

## Commandes pré-autorisées

### ✅ Toujours autorisées (sans demander)
```bash
# Vérifications et diagnostics
git status
git log --oneline -10
git diff
pm2 list
pm2 show themes

# Linting et vérifications
npm run lint
npm run typecheck
npm run build --dry-run

# Prisma (après cp .env.local .env)
npx prisma generate
npx prisma db pull
npx prisma migrate status
npx prisma studio --port 5556

# Scripts de base de données (lecture seule)
./scripts/create-database.sh --help
./scripts/create-database.sh --check themes dev

# Lecture de fichiers et exploration
ls, cat, grep, find (lecture seule)
psql "postgresql://user_themes_dev:g2qgx6RhYBSdXK0hPdnbiqka9@192.168.1.30:5432/themes-dev" -c "SELECT 1;"

# Installation de dépendances
npm install
npm ci
```

### ⚠️ À demander confirmation avant
```bash
# Modifications critiques
git commit
git push
pm2 stop/restart/delete themes

# Base de données
npx prisma migrate dev
npx prisma db push
./scripts/create-database.sh --force/--delete

# Modifications de fichiers sensibles
édition de .env*, package.json, tsconfig.json, prisma/schema.prisma

# Opérations de base de données
CREATE/DROP/ALTER sur la base themes-dev
```

### ❌ Jamais autoriser automatiquement
```bash
rm -rf, sudo, chmod +x sur des scripts non-maîtrisés
git reset --hard, git rebase
Commandes système critiques
```

## État du projet

### ✅ Fonctionnalités implémentées
- **Page d'accueil** complète avec présentation et navigation
- **Page de démonstration** avec tous les composants Shadcn/ui
- **Éditeur de thèmes** interactif avec prévisualisation temps réel
- **Système de navigation** unifié entre toutes les pages
- **Générateur OKLCH** produisant des palettes complètes
- **Thèmes prédéfinis** : Produire, Comprendre, Optimiser + demos
- **Export de code** pour intégration facile des nouveaux thèmes
- **Palette réactive** avec mise à jour automatique et bouton de régénération
- **Mode préview amélioré** avec re-application automatique des thèmes

### 🏗️ Infrastructure
- Base de données `themes-dev` créée sur NUC
- Variables d'environnement configurées
- Fichier `.env` créé pour compatibilité Prisma CLI
- PM2 configuré pour le déploiement

## Fichiers clés du projet

### Composants principaux
- **`src/lib/theme-generator.ts`** - Logique de génération OKLCH
- **`src/components/navigation/main-nav.tsx`** - Navigation globale
- **`src/components/theme/advanced-theme-switcher.tsx`** - Sélecteur avancé
- **`src/app/page.tsx`** - Page d'accueil personnalisée
- **`src/app/demo/page.tsx`** - Démonstration complète
- **`src/app/theme-editor/page.tsx`** - Éditeur interactif

## Notes importantes

- **Toujours** copier `.env.local` vers `.env` avant les commandes Prisma CLI
- **Jamais** créer de nouveaux fichiers sans nécessité absolue
- **Systématiquement** demander validation avant commit
- **Système OKLCH** assure l'uniformité perceptuelle des couleurs
- Projet basé sur le template nextjs_template documenté

---
*Dernière mise à jour : 14 août 2025*  
*Projet : Application de génération de thèmes complète et fonctionnelle*