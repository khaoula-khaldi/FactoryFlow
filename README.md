# FactoryFlow
API REST de gestion des matières premières, des stocks et des ordres de fabrication pour un environnement industriel.
## 1. Prérequis
Avant de démarrer le projet, les outils suivants doivent être installés :
- **Node.js** : pour exécuter l'application.
- **npm** : pour installer les dépendances.
- **Docker Desktop** : pour exécuter les conteneurs.
- **Docker Compose** : pour démarrer et arrêter l'application et la base de données.
Vérifier les installations :
```bash
node -v
npm -v
docker --version
docker compose version
```
## 2. Configuration
Le projet utilise les technologies suivantes :
- Node.js et Express.js pour l'API REST.
- MongoDB pour la base de données.
- Mongoose pour la gestion des modèles et l'accès aux données.
- JWT pour l'authentification.
- Docker Compose pour l'exécution des services.
### Variables d'environnement
Créer un fichier `.env` à la racine du projet si nécessaire, en respectant les variables utilisées dans le code :
```env
PORT=3000
MONGO_URI=mongodb://mongodb:27017/factoryflow
JWT_SECRET=votre_cle_secrete
``
**Important :** ces valeurs correspondent à un exemple de configuration Docker. Le nom des variables doit correspondre exactement à celui utilisé dans le projet. Ne jamais publier de véritables secrets dans un dépôt public.

## 3. Installation

Cloner le dépôt :

```bash
git clone <URL_DU_DEPOT>
cd FactoryFlow
```

Installer les dépendances du backend :

```bash
npm install
```

Si le projet utilise Docker Compose, vérifier que le fichier `docker-compose.yml` est présent à la racine du projet.

## 4. Démarrage avec Docker Compose

Depuis le dossier contenant `docker-compose.yml`, exécuter :

```bash
docker compose up --build -d
```

Cette commande construit les images si nécessaire et démarre les conteneurs en arrière-plan.

Vérifier l'état des conteneurs :

```bash
docker compose ps
```

Consulter les logs :

```bash
docker compose logs -f
```

L'API est accessible à l'adresse suivante lorsque le service démarre correctement :

`http://localhost:3000`

## 5. Arrêt avec Docker Compose

Pour arrêter les services :

```bash
docker compose down
```

Cette commande arrête et supprime les conteneurs du projet. Les données stockées dans un volume Docker nommé sont normalement conservées.

Pour supprimer également les volumes et les données persistées, utiliser :

```bash
docker compose down -v
```

**Attention :** cette dernière commande peut supprimer les données de la base de données. Elle ne doit pas être utilisée si les données doivent être conservées.

## 6. Exécution en mode développement sans Docker

Si Node.js est installé et qu'une instance MongoDB accessible est déjà disponible, installer les dépendances :

```bash
npm install
```

Configurer le fichier `.env` avec l'adresse de cette instance MongoDB. Par exemple, si MongoDB fonctionne directement sur la machine :

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/factoryflow
JWT_SECRET=votre_cle_secrete
```

Démarrer le serveur en mode développement :

```bash
npm run dev
```

Pour démarrer le serveur sans nodemon :

```bash
npm start
```

## 7. Tests

Exécuter les tests automatisés :

```bash
npm test
```

Pour lancer les tests Jest en mode séquentiel :

```bash
npx jest --runInBand
```

## 8. Fonctionnalités principales

- Authentification et gestion des utilisateurs selon leur rôle.
- Gestion des matières premières.
- Gestion des produits et de leurs compositions.
- Enregistrement des mouvements de stock.
- Calcul du stock disponible à partir des mouvements.
- Création et suivi des ordres de fabrication.
- Vérification des quantités disponibles avant la fabrication.
- Gestion des accès selon le rôle de l'utilisateur.

