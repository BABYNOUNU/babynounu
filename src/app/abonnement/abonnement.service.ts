import { NotificationService } from '../notification/notification.service';
import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Abonnements } from './models/abonnement.model';
import { CreateAbonnementDto } from './dtos/create-abonnement.dto';
import { PaymentService } from '../paiement/paiement.service';
import axios from 'axios';
import { Paiements } from '../paiement/models/paiement.model';
import { ChatGateway } from '../chat/chat.gateway';
import { NounusService } from '../nounus/nounus.service';

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
    private readonly nounuService: NounusService,
  ) {}

  /**
   * Vérifie les points associés à un paiement
   * @param paymentId - ID du paiement
   * @returns Nombre de points associés au paiement
   */
  public async createPaymentPoint({
    transactionId,
    userId,
    points,
  }): Promise<any> {
    const payment = await this.paymentRepository.findOne({
      where: { transaction_id: transactionId, user: { id: userId } },
      relations: ['user'],
    });

    if (!payment) {
      throw new NotFoundException(
        `Paiement avec l'ID ${transactionId} introuvable`,
      );
    }

    const iSAcceptedPayment = await this.paymentRepository.findOne({
      where: {
        transaction_id: transactionId,
        user: { id: userId },
        status: 'ACCEPTED',
      },
      relations: ['user'],
    });

    // Validation du paiement avec CinetPay
    const isPaymentValid = await this.validateCinetPayPayment(
      payment.transaction_id,
    );

    if (isPaymentValid && iSAcceptedPayment) {
      await this.nounuService.updatePoints(payment.user.id, points);
      await this.notificationService.createNotification({
        type: 'PAIEMENT_VALID',
        userId: payment.user.id,
        message: `Vous avez acheté ${points} points de disponibilité pour un prix de ${payment.amount} Fcfa. Votre paiement a bien était validé.`,
        is_read: false,
        senderUserId: payment.user.id,
      });
    }

    return payment;
  }

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
    if (payment.user.nounu && payment.user.nounu[0]) {
      await this.nounuService.updatePoints(
        payment.user.nounu.length != 0
          ? payment.user.nounu[0].id
          : payment.user.parent[0].id,
        100,
      );
    }

    if (payment.user.parent && payment.user.parent[0]) {
      await this.nounuService.updatePoints(
        payment.user.parent.length != 0
          ? payment.user.parent[0].id
          : payment.user.parent[0].id,
        500,
      );
    }

    return this.buildResponse(true, true, newAbonnement);
  }

  /**
   * Recherche un paiement par utilisateur et transaction ID
   */
  private async findPayment(
    createAbonnementDto: CreateAbonnementDto,
  ): Promise<Paiements | null> {
    return this.paymentRepository.findOne({
      where: {
        user: { id: createAbonnementDto.userId },
        transaction_id: createAbonnementDto.transactionId,
      },
      relations: {
        user: {
          nounu: true,
          parent: true,
        },
      },
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
    transaction_id: string,
  ): Promise<boolean> {
    try {
      const { data } = await axios.post(
        'https://api-checkout.cinetpay.com/v2/payment/check',
        {
          apikey: process.env.CINETPAY_API_KEY,
          site_id: process.env.CINETPAY_SITE_ID,
          transaction_id: transaction_id,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (data.data?.operator_id != null) {
        const payment = await this.paymentRepository.update(
          { transaction_id },
          {
            status: data.data.status,
            paymentMethod: data.data.payment_method,
            operator_id: data.data.operator_id,
            payment_date: data.data.payment_date,
            amount: data.data.amount,
            currency: data.data.currency,
            payment_token: data.data.payment_token,
          },
        );

        if (payment.affected == 1) {
          return true;
        }
      }

      return false;
    } catch (error) {
      // console.error('CinetPay validation error:', error);
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
    const isOperationId = await this.paymentRepository.find({
      where: {
        id: paymentId,
      },
    });

    if (!isOperationId) {
      throw new NotFoundException(
        `Paiement avec l'ID ${paymentId} introuvable`,
      );
    }

    const isAbonnementExist = await this.abonnementRepository.findOne({
      where: {
        user: { id: userId },
        paiement: { id: paymentId },
      },
    });

    if (isAbonnementExist) {
      throw new BadRequestException(
        `L'utilisateur ${userId} a deja un abonnement`,
      );
    }

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
   * Récupère l'abonnement le plus récent d'un utilisateur
   */
  async getAbonnementByUserId(userId: string): Promise<any> {
    const abonnement = await this.abonnementRepository.findOne({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      relations: ['paiement', 'type', 'user'],
    });

    if (!abonnement) {
      throw new NotFoundException(
        `Aucun abonnement pour l'utilisateur ${userId} n'a été trouvé`,
      );
    }

    return {
      ...abonnement,
      isActived: await this.hasActiveAbonnement(userId),
    };
  }

  /**
   * Vérifie si un utilisateur a un abonnement actif
   */
  async hasActiveAbonnement(userId: string): Promise<boolean> {
    const abonnement = await this.abonnementRepository.findOne({
      where: { user: { id: userId } },
      relations: ['paiement', 'type', 'user'],
      order: { createdAt: 'DESC' },
    });

    if (!abonnement) return false;
    abonnement.user.nounu;

    return this.isSubscriptionActive(
      abonnement.paiement.payment_date,
      abonnement.user.nounu.length > 0 ? true : false,
    );
  }

  /**
   * Vérifie si une date de création d'abonnement est toujours active
   */
  private isSubscriptionActive(createdAt: Date, nounuProfil: any): boolean {
    const subscriptionDate = new Date(createdAt);
    const currentDate = new Date();
    const daysSinceSubscription = Math.floor(
      ((parseInt(`${!nounuProfil ? 1 : ''}${currentDate.getTime()}`) -
        subscriptionDate.getTime()) /
        1000) *
        60 *
        60 *
        24,
    );

    return daysSinceSubscription <= this.SUBSCRIPTION_DURATION_DAYS;
  }

  /**
   * Annule un abonnement par son ID
   */
  async cancelAbonnement(abonnementId: string): Promise<void> {
    const abonnement = await this.abonnementRepository.findOne({
      where: { id: abonnementId },
    });

    if (!abonnement) {
      throw new NotFoundException(
        `Abonnement avec l'ID ${abonnementId} introuvable`,
      );
    }

    await this.abonnementRepository.softRemove(abonnement);
    await this.notificationService.createNotification({
      type: 'ABONNEMENT_CANCEL',
      userId: abonnement.user.id,
      message: 'Votre abonnement a été annulé.',
      is_read: false,
      senderUserId: abonnement.user.id,
    });
  }
}
