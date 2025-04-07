import { NotificationService } from '../notification/notification.service';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Abonnements } from './models/abonnement.model';
import { CreateAbonnementDto } from './dtos/create-abonnement.dto';
import { PaymentService } from '../paiement/paiement.service';
import axios from 'axios';
import { Paiements } from '../paiement/models/paiement.model';

@Injectable()
export class AbonnementService {
  private readonly SUBSCRIPTION_DURATION_DAYS = 30;

  constructor(
    @Inject('ABONNEMENT_REPOSITORY')
    private readonly abonnementRepository: Repository<Abonnements>,
    @Inject('PAYMENT_REPOSITORY')
    private readonly paymentRepository: Repository<Paiements>,
    private readonly paymentService: PaymentService,
    private readonly notificationService: NotificationService,
  ) {}

  /**
   * Crée un nouvel abonnement ou retourne l'existant
   * @param createAbonnementDto - Données de création d'abonnement
   * @returns Réponse contenant les informations d'abonnement
   */
  async createAbonnement(
    createAbonnementDto: CreateAbonnementDto,
  ): Promise<any> {
    // Vérification du paiement
    const payment = await this.findPayment(createAbonnementDto);
    if (!payment) {
      return this.buildResponse(false, false);
    }

    // Vérification de l'abonnement existant
    const existingAbonnement = await this.findExistingAbonnement(
      createAbonnementDto.userId,
      payment.id,
    );
    if (existingAbonnement) {
      return this.buildResponse(
        true,
        await this.hasActiveAbonnement(createAbonnementDto.userId),
        existingAbonnement,
      );
    }

    // Validation du paiement avec CinetPay
    const isPaymentValid = await this.validateCinetPayPayment(
      payment.payment_token,
      createAbonnementDto.userId,
      createAbonnementDto.transactionId,
    );
    if (!isPaymentValid) {
      return this.buildResponse(
        true,
        await this.hasActiveAbonnement(createAbonnementDto.userId),
      );
    }

    // Création du nouvel abonnement
    const newAbonnement = await this.createNewAbonnement(
      createAbonnementDto.userId,
      payment.id,
    );

    // Envoi de notification
    await this.sendSubscriptionNotification(createAbonnementDto.userId);

    return this.buildResponse(
      true,
      true,
      newAbonnement,
    );
  }

  /**
   * Recherche un paiement par utilisateur et transaction ID
   */
  private async findPayment(
    createAbonnementDto: CreateAbonnementDto,
  ): Promise<Paiements | null> {
    return this.paymentRepository.findOneBy({
      user: { id: createAbonnementDto.userId },
      transaction_id: createAbonnementDto.transactionId,
    });
  }

  /**
   * Recherche un abonnement existant
   */
  private async findExistingAbonnement(
    userId: string,
    paymentId: string,
  ): Promise<Abonnements | null> {
    return this.abonnementRepository.findOne({
      where: {
        user: { id: userId },
        paiement: { id: paymentId },
      },
      relations: ['user', 'paiement'],
    });
  }

  /**
   * Valide le paiement avec CinetPay
   */
  private async validateCinetPayPayment(
    paymentToken: string,
    userId: string,
    transactionId: string,
  ): Promise<boolean> {
    try {
      const response = await axios.post(
        'https://api-checkout.cinetpay.com/v2/payment/check',
        {
          apikey: process.env.CINETPAY_API_KEY,
          site_id: process.env.CINETPAY_SITE_ID,
          token: paymentToken,
          return_url: `${process.env.CINETPAY_RETURN_URL}?userId=${userId}&transactionId=${transactionId}`,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      return !!response.data.data;
    } catch (error) {
      console.error('CinetPay validation error:', error);
      return false;
    }
  }

  /**
   * Crée un nouvel abonnement
   */
  private async createNewAbonnement(
    userId: string,
    paymentId: string,
  ): Promise<Abonnements> {
    const abonnement = this.abonnementRepository.create({
      paiement: { id: paymentId },
      user: { id: userId },
    });

    const savedAbonnement = await this.abonnementRepository.save(abonnement);
    if (!savedAbonnement) {
      throw new NotFoundException(
        `Échec de la création de l'abonnement pour l'utilisateur ${userId}`,
      );
    }

    return savedAbonnement;
  }

  /**
   * Envoie une notification de nouvel abonnement
   */
  private async sendSubscriptionNotification(userId: string): Promise<void> {
    await this.notificationService.createNotification({
      type: 'ABONNEMENT',
      userId: userId,
      message: 'Votre abonnement a bien été validé.',
      is_read: false,
      senderUserId: userId,
    });
  }

  /**
   * Construit la réponse standardisée
   */
  private buildResponse(
    isPayment: boolean,
    hasActiveSubscription: boolean,
    abonnement?: Abonnements,
  ): any {
    return {
      ...(abonnement || {}),
      isPayment,
      hasActiveSubscription,
    };
  }

  /**
   * Récupère tous les abonnements d'un utilisateur
   */
  async getAbonnementsByUser(userId: string): Promise<Abonnements[]> {
    return this.abonnementRepository.find({
      where: { user: { id: userId } },
      relations: ['paiement', 'user'],
    });
  }

  /**
   * Récupère un abonnement par son ID
   */
  async getAbonnementById(abonnementId: string): Promise<Abonnements> {
    const abonnement = await this.abonnementRepository.findOne({
      where: { id: abonnementId },
      relations: ['paiement', 'type', 'user'],
    });

    if (!abonnement) {
      throw new NotFoundException(
        `Abonnement avec l'ID ${abonnementId} introuvable`,
      );
    }

    return abonnement;
  }

  /**
   * Vérifie si un utilisateur a un abonnement actif
   */
  async hasActiveAbonnement(userId: string): Promise<boolean> {
    const abonnement = await this.abonnementRepository.findOne({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });

    if (!abonnement) return false;

    return this.isSubscriptionActive(abonnement.createdAt);
  }

  /**
   * Vérifie si une date de création d'abonnement est toujours active
   */
  private isSubscriptionActive(createdAt: Date): boolean {
    const subscriptionDate = new Date(createdAt);
    const currentDate = new Date();
    const daysSinceSubscription = Math.floor(
      (currentDate.getTime() - subscriptionDate.getTime()) / 
      (1000 * 60 * 60 * 24),
    );

    return daysSinceSubscription <= this.SUBSCRIPTION_DURATION_DAYS;
  }
}