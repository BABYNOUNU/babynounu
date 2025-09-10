# Configuration TypeORM Moderne - BabyNounu

## Vue d'ensemble

Cette configuration TypeORM moderne utilise les meilleures pratiques actuelles pour NestJS et TypeORM 0.3.x.

## Structure des fichiers

```
src/database/
├── README.md                 # Ce fichier
├── database.module.ts        # Module principal de base de données
├── data-source.ts           # Configuration pour les migrations CLI
├── modern.providers.ts      # Helpers pour les entités groupées
├── migrations/              # Dossier des migrations
│   └── .gitkeep
└── subscribers/             # Event subscribers TypeORM
    └── user.subscriber.ts   # Exemple de subscriber
```

## Fonctionnalités modernes implémentées

### 1. Configuration TypeORM avec `forRootAsync()`
- Configuration asynchrone avec injection de ConfigService
- Support des variables d'environnement
- Configuration différenciée prod/dev

### 2. Injection de dépendances moderne
- Utilisation de `@InjectRepository()` au lieu des providers personnalisés
- `TypeOrmModule.forFeature()` dans chaque module
- Suppression des anciens providers manuels

### 3. Configuration avancée
- **Auto-loading des entités** : `autoLoadEntities: true`
- **Logging configuré** : Différents niveaux selon l'environnement
- **Cache Redis** : Configuration pour améliorer les performances
- **Pool de connexions** : Optimisation des connexions DB
- **SSL** : Support SSL pour la production
- **Retry logic** : Reconnexion automatique

### 4. Migrations
- Scripts npm pour gérer les migrations
- Configuration CLI séparée
- Support des migrations automatiques en production

### 5. Event Subscribers
- Exemple de subscriber pour les événements d'entités
- Logging automatique des opérations CRUD
- Hooks pour la logique métier

## Scripts disponibles

```bash
# Générer une migration basée sur les changements d'entités
npm run migration:generate -- src/database/migrations/MigrationName

# Créer une migration vide
npm run migration:create -- src/database/migrations/MigrationName

# Exécuter les migrations
npm run migration:run

# Annuler la dernière migration
npm run migration:revert

# Voir le statut des migrations
npm run migration:show

# Synchroniser le schéma (attention en production !)
npm run schema:sync

# Supprimer le schéma
npm run schema:drop
```

## Variables d'environnement requises

```env
# Base de données
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=your_database

# Pour le développement local
DB_USERNAME_LOCAL=local_username
DB_PASSWORD_LOCAL=local_password
DB_DATABASE_LOCAL=local_database

# Redis (optionnel, pour le cache)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# Environnement
NODE_ENV=development|production
```

## Migration depuis l'ancienne configuration

### Avant (ancienne méthode)
```typescript
// Ancien provider
export const UserProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];

// Ancien service
constructor(
  @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
) {}
```

### Après (nouvelle méthode)
```typescript
// Nouveau module
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
})
export class UserModule {}

// Nouveau service
constructor(
  @InjectRepository(User) private userRepository: Repository<User>,
) {}
```

## Bonnes pratiques

1. **Utilisez les migrations** : Désactivez `synchronize` en production
2. **Groupez les entités** : Utilisez `modern.providers.ts` pour organiser
3. **Configurez le logging** : Adaptez selon l'environnement
4. **Utilisez le cache** : Activez Redis pour les requêtes fréquentes
5. **Surveillez les connexions** : Configurez les pools appropriés
6. **Event Subscribers** : Utilisez pour la logique transversale

## Dépannage

### Erreur de connexion
- Vérifiez les variables d'environnement
- Testez la connexion à la base de données
- Vérifiez les permissions utilisateur

### Erreurs de migration
- Vérifiez que les entités sont correctement importées
- Assurez-vous que le schéma est cohérent
- Utilisez `migration:show` pour voir le statut

### Performance
- Activez le cache Redis
- Optimisez les requêtes avec des index
- Surveillez les logs de requêtes

## Support

Pour plus d'informations, consultez :
- [Documentation TypeORM](https://typeorm.io/)
- [Documentation NestJS TypeORM](https://docs.nestjs.com/techniques/database)