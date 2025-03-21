import { NotificationService } from './../notification/notification.service';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Abonnements } from './models/abonnement.model';
import { CreateAbonnementDto } from './dtos/create-abonnement.dto';
import { NotificationGateway } from '../notification/notification.gateway';
import { PaymentService } from '../paiement/paiement.service';
import axios from 'axios';
import { Paiements } from '../paiement/models/paiement.model';

@Injectable()
export class AbonnementService {
  constructor(
    @Inject('ABONNEMENT_REPOSITORY')
    private readonly abonnementRepository: Repository<Abonnements>,

    @Inject('PAYMENT_REPOSITORY')
    private readonly payRepository: Repository<Paiements>,
    private readonly paymentService: PaymentService,
    private readonly NotificationService: NotificationService,
    // private readonly notificationGateway: NotificationGateway,
  ) {}

  /**
   * Crée un nouvel abonnement.
   * @param createAbonnementDto - Données pour créer l'abonnement.
   * @returns L'abonnement créé.
   */
  async createAbonnement(createAbonnementDto: CreateAbonnementDto) {
    // Vérifie si le paiement existe
    const paiement = await this.payRepository.findOne({
      where: {
        user: { id: createAbonnementDto.userId },
        transaction_id: createAbonnementDto.transactionId,
      },
    });

    if (!paiement) {
      throw new NotFoundException(
        `Aucun paiement avec l'ID de transaction ${createAbonnementDto.transactionId} n'a été trouvé.`,
      );
    }

    // Vérifie si l'abonnement existe déjà
    const isAbonnementExist = await this.abonnementRepository.findOne({
      where: {
        user: { id: createAbonnementDto.userId },
        paiement: { id: paiement.id },
      },
    });

    if (isAbonnementExist) {
      return isAbonnementExist; // Retourne l'abonnement existant
    }

    // Vérifie le statut du paiement via l'API CinetPay
    const config = {
      method: 'post',
      url: 'https://api-checkout.cinetpay.com/v2/payment/check',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        apikey: process.env.CINETPAY_API_KEY, // Remplacez par votre clé API
        site_id: process.env.CINETPAY_SITE_ID, // Remplacez par votre site ID
        token: paiement.payment_token, // Remplacez par votre transaction ID
      },
    };

    let abonnementChecked: any;

    try {
      const response = await axios(config);
      abonnementChecked = response.data;

      // Vérifie que la réponse contient les données attendues
      if (!abonnementChecked || !abonnementChecked.data) {
        throw new NotFoundException(
          `La réponse de l'API CinetPay est invalide pour la transaction ${createAbonnementDto.transactionId}.`,
        );
      }
    } catch (error) {
      throw new NotFoundException(
        `Le paiement avec l'ID de transaction ${createAbonnementDto.transactionId} n'a pas pu être vérifié.`,
      );
    }

    // Crée un nouvel abonnement
    const abonnement = this.abonnementRepository.create({
      paiement: { id: paiement.id },
      user: { id: createAbonnementDto.userId },
    });

    const abonnementSave = await this.abonnementRepository.save(abonnement);

    if (!abonnementSave) {
      throw new NotFoundException(
        `L'abonnement avec l'ID de transaction ${createAbonnementDto.transactionId} n'a pas pu être créé.`,
      );
    }

    // Met à jour le paiement
    await this.paymentService.updatePayment(paiement.id, {
      status: abonnementChecked.data.status,
      paymentMethod: abonnementChecked.data.payment_method,
      currency: abonnementChecked.data.currency,
      operator_id: abonnementChecked.data.operator_id,
    });

    // Émet une notification
    await this.NotificationService.createNotification({
      type: 'ABONNEMENT',
      userId: createAbonnementDto.userId.toString(),
      message: `Votre abonnement a bien été validé.`,
      is_read: false,
      senderUserId: createAbonnementDto.userId.toString(),
    });

    const Abonnement = await this.getAbonnementById(abonnementSave.id);

    return Abonnement;
  }
  /**
   * Récupère tous les abonnements d'un utilisateur.
   * @param userId - ID de l'utilisateur.
   * @returns Une liste d'abonnements.
   */
  async getAbonnementsByUser(userId: string) {
    return this.abonnementRepository.find({
      where: { user: { id: userId } },
      relations: {
        paiement: true,
        user: true,
      },
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
      relations: {
        paiement: true,
        type: true,
        user: true,
      }, // Charge les relations
    });

    if (!abonnement) {
      throw new NotFoundException(
        `Abonnement with ID ${abonnementId} not found`,
      );
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
      (currentDate.getTime() - abonnementDate.getTime()) /
        (1000 * 60 * 60 * 24),
    );

    // Supposons que l'abonnement est valide pendant 30 jours
    return daysSinceAbonnement <= 30;
  }
}
