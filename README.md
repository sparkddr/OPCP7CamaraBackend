# GROUPOMANIA

Repo Back End du réseau social interne d'entreprise Groupamania

## Installation

```bash
  npm install
```

Créer un fichier .env à la racine du dossier backend en ajoutant vos informations de connexion pour le token et la base de donnée :

```bash
  PORT=8000 // Par défaut utiliser le port 8000 svp
  PRIVATEKEY= "Votre clé Privée"
  DB_USERNAME = root
  DB_PASSWORD = password
  DB_DATABASE = nom_database
```

Créer la base de donnée (Vous devez au préalable avoir installé MySql sur votre ordinateur)

```bash
npx sequelize-cli db:create
```

Initialiser la base de donnée :

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## Initialisation du serveur et connexion à la base de donnée

```bash
  nodemon server.js
```

Bonne visite.
