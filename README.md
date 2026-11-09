# Top Spot : Back End

Squelette de l'API Top Spot. Il fournit l'infrastructure et l'architecture en couches, sans aucun code métier : vous écrivez toutes les entités, tous les services et toutes les routes.

**Étudiant 1** : nom et prénom
**Étudiant 2** : nom et prénom

## Stack

- Bun, TypeScript
- Hono (API REST)
- TypeORM et MariaDB
- Zod (validation)
- Docker et Docker Compose

## Lancement

```sh
cp .env.example .env
docker compose up --build
```

| Service | URL |
| --- | --- |
| API | <http://localhost:3000> |
| Santé de l'API | <http://localhost:3000/health> |
| Adminer | <http://localhost:8080> (serveur : mariadb) |

Les fichiers de **src/** sont montés dans le conteneur : l'API redémarre à chaque modification.

Vérification des types :

```sh
bun install
bun run typecheck
```

## Tests avec Bruno

La collection **top-spot** complète est fournie dans le dossier **bruno/** avec un environnement **local** pointant vers <http://localhost:3000>. Elle constitue le contrat de l'API finale et contient dès le départ les scénarios des quatre TD back end.

Au premier lancement du starter kit, seules les requêtes **GET /** et **GET /health** sont attendues en succès. Les autres requêtes échouent tant que les fonctionnalités correspondantes ne sont pas implémentées : utilisez-les progressivement, sans modifier le contrat attendu.

| Séance | Requêtes à utiliser |
| --- | --- |
| TD01 | `GET /`, santé et dossier **categories** |
| TD02 | dossiers **auth** et **me** |
| TD03 | dossier **places**, upload de fichiers et `GET /me/places` |
| TD04 | dossiers **ratings** et **moderation** |

Pour les scénarios enchaînés, exécutez d'abord les connexions du dossier **auth**, puis la création du spot dans **places**, avant **ratings** et **moderation**. Les scripts *post-response* fournis conservent les tokens et les identifiants nécessaires aux requêtes suivantes.

## Éléments fournis

Ces éléments techniques sont déjà en place : vous les utilisez sans les réécrire.

| Élément | Fichier | Séance |
| --- | --- | --- |
| Route **GET /** (identification de l'API) | **src/presentation/http/routes/homeRoutes.ts** | TD01 |
| **getJwtSecret()** : lecture de **JWT_SECRET** | **src/application/services/jwtSecret.ts** | TD02 |
| **decimalTransformer** : colonnes `decimal` en nombres | **src/persistence/mariadb/decimalTransformer.ts** | TD03 |
| Volume **uploads**, **UPLOAD_DIR** et service des photos sur **/uploads/\*** | **docker-compose.yml**, **.env.example**, **src/app.ts** | TD03 |

## Architecture

| Couche | Dossier | Rôle |
| --- | --- | --- |
| Domaine | | |
| Application | | |
| Persistance | | |
| Présentation | | |

## Conventions

- **Enveloppe de réponse** : `{ success: true, data, message }` en cas de succès, `{ success: false, error }` en cas d'erreur (**src/presentation/http/response.ts**).
- **Validation** : toute donnée reçue est validée avec un schéma Zod et la fonction **validate()** (**src/presentation/http/validate.ts**), qui renvoie **400** en cas d'échec.
- **Erreurs métier** : les services lèvent des sous-classes de **AppError** (**src/application/errors**), indépendantes du protocole de communication (ici HTTP). Les contrôleurs les traduisent en **HTTPException** avec le code correspondant.
- **Contrôleurs** : une classe par cas d'utilisation, avec une méthode **handle(c: Context)**. Le service est reçu dans le constructeur.
- **Injection de dépendance** : chaque contrôleur reçoit le ou les service(s) qu'il utilise par injection de dépendance dans son constructeur.

  ```ts
  export class ListCategoriesController {
    private readonly categoryService: CategoryService;

    constructor(categoryService: CategoryService) {
      this.categoryService = categoryService;
    }
  }
  ```

- **Routeurs** : un routeur Hono par ressource dans **src/presentation/http/routes**, qui construit son service et ses contrôleurs, puis est monté dans **src/app.ts**.
- **Entités** : chaque entité de **src/domain** est déclarée dans **src/persistence/mariadb/dataSource.ts**.
- **DTO** : un service ne renvoie jamais une entité à la couche de présentation. Les types d'entrée vont dans **src/application/services/dtos/inputs**. En sortie, une classe **XDto** (**src/application/services/dtos/outputs**) déclare la forme exposée, et son constructeur la construit à partir de l'entité : pratique dès qu'un champ ne doit pas être sérialisé tel quel (mot de passe, relation trop complète...).
- **Alias d'import** : un alias par couche, `@domain`, `@application`, `@persistence` et `@presentation` (voir **tsconfig.json**), par exemple `@application/services/CategoryService` ou `@application/errors/NotFoundError`. Tous les imports internes passent par un alias, y compris vers un fichier du même dossier (`@application/errors/AppError` plutôt que `./AppError`). Seul **src/index.ts** importe **./app**, qui n'appartient à aucune couche. Le fichier **.vscode/settings.json** fait utiliser les alias aux imports automatiques de VS Code.

## Tableau de bord

- TD réalisés : À compléter.
- Fonctionnalités manquantes ou non fonctionnelles : À compléter.
- Difficultés rencontrées : À compléter.

## Comptes de test

À compléter.

## Choix de conception

À compléter (en cas d'écart avec les consignes).

## Usage de l'IA générative

Usages ayant influencé la réalisation, propositions retenues et vérifications effectuées : à compléter.
