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
    private readonly notificationGateway: NotificationGateway,
  ) {}

  /**
   * Crée un nouvel abonnement.
   * @param createAbonnementDto - Données pour créer l'abonnement.
   * @returns L'abonnement créé.
   */
  async createAbonnement(createAbonnementDto: CreateAbonnementDto) {
    const paiement = await this.payRepository.findOne({
      where: {
        user: { id: createAbonnementDto.userId },
        transaction_id: createAbonnementDto.transactionId,
      },
    });

    if (!paiement) {
      throw new NotFoundException(
        `Auccun paiement avec l'ID de transaction ${createAbonnementDto.transactionId} n'a pas été trouvé`,
      );
    }

    // var Getconfig = {
    //   method: 'get',
    //   url: process.env.PAYMENT_NOTIFICATION,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   }
    // };
    // await axios(config).then((response) => {
    //   abonnementChecked = response.data;
    // }).catch((error) => {
    //   throw new NotFoundException(`Paiement with transaction ID ${createAbonnementDto.transactionId} not found`);
    // });

    // console.log(paiement)

    var config = {
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

    await axios(config)
      .then((response) => {
        abonnementChecked = response.data;
      })
      .catch((error) => {
        throw new NotFoundException(
          `Le paiement avec l'ID de transaction ${createAbonnementDto.transactionId} n'a pas été trouvé`,
        );
      });

    const abonnement = this.abonnementRepository.create({
      paiement: { id: paiement.id },
      user: { id: createAbonnementDto.userId },
    });
    const abonnementSave = await this.abonnementRepository.save(abonnement);

    if (!abonnementSave) {
      throw new NotFoundException(
        `Abonnement with transaction ID ${createAbonnementDto.transactionId} not found`,
      );
    }

    // Mettre à jour le paiement

    this.paymentService.updatePayment(paiement.id, {
      status: abonnementChecked.data.status,
      paymentMethod: abonnementChecked.data.payment_method,
      currency: abonnementChecked.data.currency,
      operator_id: abonnementChecked.data.operator_id,
    });
    this.NotificationService.createNotification({
      type: 'ABONNEMENT',
      userId: createAbonnementDto.userId.toString(),
      message: `Votre abonnement a bien été validé`,
      is_read: false,
      senderUserId: createAbonnementDto.userId.toString(),
    });

    // Émettre un événement Socket.IO
    const GetAbonnement = await this.getAbonnementById(abonnementSave.id);
    this.notificationGateway.server.emit('abonnementValide', {
      message: GetAbonnement,
    });

    return abonnementSave;
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
