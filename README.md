# GROUPOMANIA

Repo Back End du réseau social interne d'entreprise Groupamania

## Installation

```bash
  npm install
```

Créer un fichier .env à la racine du dossier backend en ajoutant vos informations de connexion pour le token et la base de donnée :

```bash
NODE_ENV=development
PORT=8000
API_URL=127.0.0.1
PRIVATEKEY="CUSTOM_PRIVATE_KEY"
DB_USERNAME="root"
DB_PASSWORD="PASSWORD"
DB_DATABASE="DATABASE_NAME"

```

Créer la base de donnée (Vous devez au préalable avoir installé MySql sur votre ordinateur) :
Solution 1 :

```bash
npx sequelize-cli db:create
```

Initialiser la base de donnée :

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Solution 2 :
Importer la bdd groupomania.sql fournie à la racine du projet.

## Initialisation du serveur et connexion à la base de donnée

```bash
  nodemon server.js
```

Bonne visite.
Log admin : cc@gmail.com
mdp : 1234
