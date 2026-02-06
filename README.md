# 🎮 Portfolio Gaming - Full Stack Developer

Portfolio moderne avec direction artistique inspirée du jeu vidéo, créé pour un test technique de stage.

## ✨ Fonctionnalités

### 🎨 Direction Artistique Gaming
- **Curseur personnalisé** en forme de pixel art (croix de jeu)
- **Effets parallaxe** multi-couches sur le fond étoilé
- **Animations de type arcade** avec glitch effects
- **Design cyberpunk/rétro-gaming** avec néons et effets lumineux
- **Grille animée** en arrière-plan avec effet de défilement

### 💼 Sections du Portfolio
- **Hero** : Présentation avec effet glitch sur le titre
- **About** : Présentation personnelle avec statistiques
- **Skills** : Barres de compétences animées
- **Projects** : Cartes de projets avec hover effects
- **Contact** : Formulaire modal avec intégration n8n

### 🔧 Stack Technique
- **Frontend** : React 18 + Vite
- **Animations** : Framer Motion
- **Styling** : CSS custom (pas de Tailwind pour ce projet)
- **Fonts** : Press Start 2P, Orbitron, Space Mono
- **Backend** : n8n pour les notifications automatiques

### 🚀 Backend n8n
- Email d'alerte automatique via Gmail
- Notification Slack ou WhatsApp
- **BONUS** : Génération de réponse IA (Groq) dans brouillons Gmail

---

## 📦 Installation

### Prérequis
- Node.js 18+ ([télécharger](https://nodejs.org))
- npm ou yarn
- Compte n8n (cloud ou local)

### 1. Cloner/Télécharger le projet

Si vous avez reçu un ZIP, extrayez-le. Sinon :

```bash
# Si c'est un repo git
git clone <url-du-repo>
cd portfolio-gaming
```

### 2. Installer les dépendances

```bash
npm install
# ou
yarn install
```

### 3. Configuration n8n

Suivez le guide détaillé dans **`N8N_SETUP_GUIDE.md`**

TL;DR :
1. Créez un compte sur [n8n.cloud](https://n8n.cloud) (gratuit)
2. Créez un workflow avec Webhook + Gmail + Slack/WhatsApp
3. Copiez l'URL du webhook
4. Modifiez `src/App.jsx` ligne 35 avec votre URL

```javascript
// Ligne 35 dans src/App.jsx
const response = await fetch('https://VOTRE-URL-N8N.n8n.cloud/webhook/portfolio-contact', {
```

### 4. Personnalisation

Éditez le fichier `src/App.jsx` pour personnaliser :

- **Ligne 124** : Votre nom
- **Ligne 126** : Votre titre
- **Lignes 70-90** : Vos projets
- **Lignes 92-100** : Vos compétences
- **Ligne 300** : Votre texte "À propos"
- **Lignes 542-560** : Vos liens sociaux

### 5. Lancer en développement

```bash
npm run dev
```

Le site s'ouvrira automatiquement sur `http://localhost:3000`

---

## 🌐 Déploiement

### Option 1 : Vercel (Recommandé - Gratuit)

1. **Créez un compte** sur [vercel.com](https://vercel.com)
2. **Installez Vercel CLI** :
   ```bash
   npm install -g vercel
   ```
3. **Déployez** :
   ```bash
   npm run build
   vercel --prod
   ```
4. Suivez les instructions

### Option 2 : Netlify (Gratuit)

1. **Build** le projet :
   ```bash
   npm run build
   ```
2. **Créez un compte** sur [netlify.com](https://netlify.com)
3. **Déployez** :
   - Drag & drop le dossier `dist` sur Netlify
   - Ou connectez votre repo GitHub

### Option 3 : GitHub Pages

1. **Installez gh-pages** :
   ```bash
   npm install --save-dev gh-pages
   ```
2. **Ajoutez dans package.json** :
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. **Modifiez vite.config.js** :
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/nom-du-repo/'
   })
   ```
4. **Déployez** :
   ```bash
   npm run deploy
   ```

---

## 🎬 Créer la Vidéo de Démo

### Ce qu'il faut montrer (2-3 minutes)

1. **Introduction (15s)**
   - Présentez-vous brièvement
   - Montrez l'URL du portfolio

2. **Parcours du portfolio (1min)**
   - Scrollez pour montrer les animations parallaxe
   - Montrez le curseur personnalisé
   - Survolez les éléments interactifs
   - Montrez les différentes sections

3. **Démo du backend n8n (1min30)**
   - Montrez votre workflow n8n (capture d'écran)
   - Remplissez le formulaire de contact
   - Montrez la notification Slack/WhatsApp en temps réel
   - Montrez l'email reçu
   - **BONUS** : Montrez le brouillon Gmail avec réponse IA

4. **Conclusion (30s)**
   - Récapitulez les technos utilisées
   - Mentionnez les efforts sur l'UX/UI

### Outils pour enregistrer

- **Loom** (le plus simple) : [loom.com](https://loom.com)
- **OBS Studio** (gratuit) : [obsproject.com](https://obsproject.com)
- **QuickTime** (Mac) : natif
- **Xbox Game Bar** (Windows) : Win + G

### Upload sur Google Drive

1. Uploadez la vidéo
2. Clic droit → Partager
3. "Toute personne disposant du lien peut consulter"
4. Copiez le lien

---

## 📝 Structure du Projet

```
portfolio-gaming/
├── src/
│   ├── App.jsx          # Composant principal
│   ├── App.css          # Styles gaming
│   └── main.jsx         # Point d'entrée
├── index.html           # HTML de base
├── package.json         # Dépendances
├── vite.config.js       # Config Vite
├── N8N_SETUP_GUIDE.md   # Guide n8n détaillé
└── README.md            # Ce fichier
```

---

## 🎯 Points Forts du Portfolio

### Direction Artistique
✅ Curseur personnalisé pixel art  
✅ Animations parallaxe sur scroll  
✅ Effets glitch sur le titre  
✅ Grille animée en arrière-plan  
✅ Néons et effets lumineux  
✅ Palette de couleurs cyberpunk  

### UX/UI
✅ Navigation smooth scroll  
✅ Micro-interactions sur hover  
✅ Modal de contact animé  
✅ Responsive design  
✅ Performance optimisée  

### Code
✅ React moderne (hooks)  
✅ Framer Motion pour les animations  
✅ Code propre et commenté  
✅ Architecture claire  
✅ Pas de code IA générique  

### Backend
✅ n8n workflow fonctionnel  
✅ Notifications multi-canal  
✅ **BONUS** : Intégration IA  

---

## 🔧 Personnalisation Avancée

### Changer les couleurs

Dans `src/App.css`, ligne 9-15 :

```css
:root {
  --primary: #FF6B9D;      /* Rose néon */
  --secondary: #4ECDC4;    /* Cyan */
  --accent: #FFE66D;       /* Jaune */
  --dark: #0A0E27;         /* Bleu foncé */
  --darker: #050816;       /* Presque noir */
}
```

### Ajouter des projets

Dans `src/App.jsx`, ligne 70-90 :

```javascript
const projects = [
  {
    title: "Nom du Projet",
    tech: "React · Node.js",
    description: "Description courte",
    color: "#FF6B9D"  // Couleur de l'accent
  },
  // ... ajoutez d'autres projets
];
```

### Modifier les compétences

Dans `src/App.jsx`, ligne 92-100 :

```javascript
const skills = [
  { name: "React", level: 90, color: "#61DAFB" },
  // ... ajoutez vos compétences
];
```

---

## 🐛 Résolution de Problèmes

### Le curseur personnalisé ne s'affiche pas ?
- Vérifiez que vous n'êtes pas sur mobile (il est désactivé sur mobile)
- Vérifiez la console pour des erreurs

### Les animations ne fonctionnent pas ?
- Vérifiez que Framer Motion est bien installé :
  ```bash
  npm install framer-motion
  ```

### Le formulaire ne s'envoie pas ?
- Vérifiez l'URL du webhook n8n (ligne 35 de App.jsx)
- Vérifiez que le workflow n8n est activé
- Testez l'URL avec Postman

### Le build échoue ?
- Supprimez `node_modules` et réinstallez :
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

---

## 📚 Ressources Utilisées

- **React** : [react.dev](https://react.dev)
- **Framer Motion** : [framer.com/motion](https://www.framer.com/motion/)
- **Vite** : [vitejs.dev](https://vitejs.dev)
- **n8n** : [n8n.io](https://n8n.io)
- **Press Start 2P** : Google Fonts
- **Orbitron** : Google Fonts

---

## 📧 Contact

Pour toute question sur ce portfolio :

- Email : votre@email.com
- GitHub : @votreusername
- LinkedIn : /in/votreusername

---

## 📄 Licence

Ce portfolio est créé pour un test technique de stage.  
Libre d'utilisation et de modification.

---

**Fait avec ❤️ et ☕ en une nuit de dev intensive** 🚀

---

## ⚡ Quick Start (TL;DR)

```bash
# 1. Installer
npm install

# 2. Configurer n8n (voir N8N_SETUP_GUIDE.md)
# Créer workflow → Copier URL webhook → Modifier ligne 35 App.jsx

# 3. Lancer
npm run dev

# 4. Personnaliser
# Éditez App.jsx pour vos infos

# 5. Builder
npm run build

# 6. Déployer
vercel --prod
# ou uploadez le dossier dist/ sur Netlify
```

Bonne chance pour le test technique ! 🎯
