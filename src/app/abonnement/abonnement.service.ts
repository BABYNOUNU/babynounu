import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Abonnements } from './models/abonnement.model';
import { CreateAbonnementDto } from './dtos/create-abonnement.dto';
import { NotificationGateway } from '../notification/notification.gateway';

@Injectable()
export class AbonnementService {
  constructor(
    @Inject('ABONNEMENT_REPOSITORY')
    private readonly abonnementRepository: Repository<Abonnements>,
    private readonly notificationGateway: NotificationGateway
  ) {}

  /**
   * Crée un nouvel abonnement.
   * @param createAbonnementDto - Données pour créer l'abonnement.
   * @returns L'abonnement créé.
   */
  async createAbonnement(createAbonnementDto: CreateAbonnementDto) {

    const paiement = await this.abonnementRepository.findOne({
        where: { paiement: { user: { id: createAbonnementDto.userId }, transaction_id: createAbonnementDto.transactionId } }
    });

    if (!paiement) {
        throw new NotFoundException(`Paiement with transaction ID ${createAbonnementDto.transactionId} not found`);
    }


    const abonnement = this.abonnementRepository.create({
        paiement: { id: paiement.id },
        user: { id: createAbonnementDto.userId }
    });
    const abonnementSave = await this.abonnementRepository.save(abonnement);

    if(!abonnementSave) {
        throw new NotFoundException(`Abonnement with transaction ID ${createAbonnementDto.transactionId} not found`);
    }

     // Émettre un événement Socket.IO
     const GetAbonnement = await this.getAbonnementById(abonnementSave.id);
     this.notificationGateway.server.emit('abonnementValide', {
      message: GetAbonnement,
    });

    return abonnementSave
  }

  /**
   * Récupère tous les abonnements d'un utilisateur.
   * @param userId - ID de l'utilisateur.
   * @returns Une liste d'abonnements.
   */
  async getAbonnementsByUser(userId: string) {
    return this.abonnementRepository.find({
      where: { user: { id: userId } },
      relations: ['paiement', 'type'], // Charge les relations
    });
  }

  /**
   * Récupère un abonnement par son ID.
   * @param abonnementId - ID de l'abonnement.
   * @returns L'abonnement correspondant.
   */
  async getAbonnementById(abonnementId: string) {
    const abonnement = await this.abonnementRepository.findOne({
      where: { id: abonnementId },
      relations: ['paiement', 'type', 'user'], // Charge les relations
    });

    if (!abonnement) {
      throw new NotFoundException(`Abonnement with ID ${abonnementId} not found`);
    }

    return abonnement;
  }

  /**
   * Vérifie si un utilisateur a un abonnement actif.
   * @param userId - ID de l'utilisateur.
   * @returns True si l'utilisateur a un abonnement actif, sinon False.
   */
  async hasActiveAbonnement(userId: string): Promise<boolean> {
    const abonnement = await this.abonnementRepository.findOne({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' }, // Prend le dernier abonnement
    });

    if (!abonnement) {
      return false; // Aucun abonnement trouvé
    }

    // Vérifie si l'abonnement est encore valide (ex: 30 jours)
    const abonnementDate = new Date(abonnement.createdAt);
    const currentDate = new Date();
    const daysSinceAbonnement = Math.floor(
      (currentDate.getTime() - abonnementDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    // Supposons que l'abonnement est valide pendant 30 jours
    return daysSinceAbonnement <= 30;
  }
}