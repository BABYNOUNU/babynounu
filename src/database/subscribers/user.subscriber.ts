import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm';
import { User } from '../../app/user/user.model';
import { Logger } from '@nestjs/common';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  private readonly logger = new Logger(UserSubscriber.name);

  /**
   * Indique que ce subscriber écoute uniquement les événements de l'entité User.
   */
  listenTo() {
    return User;
  }

  /**
   * Appelé avant l'insertion d'un utilisateur.
   */
  beforeInsert(event: InsertEvent<User>) {
    this.logger.log(`BEFORE USER INSERTED: ${JSON.stringify(event.entity)}`);
    
    // Exemple: Définir des valeurs par défaut
    if (!event.entity.createdAt) {
      event.entity.createdAt = new Date();
    }
  }

  /**
   * Appelé après l'insertion d'un utilisateur.
   */
  afterInsert(event: InsertEvent<User>) {
    this.logger.log(`AFTER USER INSERTED: User with id ${event.entity.id} has been created`);
    
    // Exemple: Envoyer un email de bienvenue, créer des données liées, etc.
  }

  /**
   * Appelé avant la mise à jour d'un utilisateur.
   */
  beforeUpdate(event: UpdateEvent<User>) {
    this.logger.log(`BEFORE USER UPDATED: ${JSON.stringify(event.entity)}`);
    
    // Exemple: Mettre à jour le timestamp de modification
    if (event.entity) {
      event.entity.updatedAt = new Date();
    }
  }

  /**
   * Appelé après la mise à jour d'un utilisateur.
   */
  afterUpdate(event: UpdateEvent<User>) {
    this.logger.log(`AFTER USER UPDATED: User with id ${event.entity?.id} has been updated`);
    
    // Exemple: Invalider le cache, envoyer des notifications, etc.
  }

  /**
   * Appelé avant la suppression d'un utilisateur.
   */
  beforeRemove(event: RemoveEvent<User>) {
    this.logger.log(`BEFORE USER REMOVED: ${JSON.stringify(event.entity)}`);
    
    // Exemple: Sauvegarder des données avant suppression, nettoyer les relations, etc.
  }

  /**
   * Appelé après la suppression d'un utilisateur.
   */
  afterRemove(event: RemoveEvent<User>) {
    this.logger.log(`AFTER USER REMOVED: User has been removed`);
    
    // Exemple: Nettoyer les fichiers associés, envoyer des notifications, etc.
  }
}