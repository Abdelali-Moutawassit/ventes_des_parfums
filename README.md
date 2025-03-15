# Boutique en ligne de Parfums

## Description
Ce projet est une boutique en ligne de parfums développée avec Node.js, Express, MongoDB et EJS pour le rendu côté serveur. L'application permet aux utilisateurs de s'inscrire, de se connecter, d'ajouter des parfums à leur panier ou à leur liste de souhaits, et d'effectuer des achats.

## Fonctionnalités
- **Gestion des utilisateurs** : Inscription, connexion, déconnexion
- **Authentification avec Passport.js**
- **Gestion des produits** : Affichage des parfums, pagination
- **Panier et Wishlist** : Ajout, suppression, gestion des produits
- **Système de sessions**

## Technologies utilisées
- **Backend** : Node.js, Express.js, MongoDB, Mongoose
- **Authentification** : Passport.js, express-session
- **Vue** : EJS (Embedded JavaScript Templates)
- **Gestion des styles** : Bootstrap, CSS
- **Autres** : dotenv, connect-flash

## Installation
### 1. Cloner le projet
```bash
git clone https://github.com/votre-utilisateur/votre-repo.git
cd votre-repo
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration de l'environnement
Créer un fichier `.env` à la racine du projet et y ajouter les variables suivantes :
```env
SESSION_SECRET=supersecretkey
MONGODB_URI=mongodb://localhost:27017/boutique
```

### 4. Lancer le serveur
```bash
npm start
```
L'application sera disponible sur `http://localhost:3000`

## Structure du projet
```
├── models/         # Modèles Mongoose
├── routes/         # Routes Express
├── views/          # Templates EJS
├── public/         # Fichiers statiques (CSS, JS, images)
├── app.js          # Fichier principal
├── package.json    # Dépendances du projet
└── .env            # Variables d'environnement
```

## Améliorations futures
- Implémentation d'un système de paiement
- Gestion avancée des commandes
- Notifications par email après l'achat 

## Auteur
Développé par **[Moutawassit Abdelali]**

