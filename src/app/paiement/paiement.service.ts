import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Paiements } from './models/paiement.model';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import axios from 'axios';
import { UpdatePaymentDto } from './dtos/update-payment.dto';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_REPOSITORY')
    private readonly paymentRepository: Repository<Paiements>,
    // private readonly notificationGateway: NotificationGateway,
  ) {}

  /**
   * Crée un nouveau paiement.
   * @param createPaymentDto - Données pour créer le paiement.
   * @returns Le paiement créé.
   */
  async createPayment(createPaymentDto: CreatePaymentDto) {
    const hasUserPaid = await this.paymentRepository.findOne({
      where: { user: { id: createPaymentDto.userId }, status: 'PENDING' },
    });
    if (hasUserPaid) {
      await this.paymentRepository.softDelete(hasUserPaid.id);
    }

    const payment = this.paymentRepository.create({
      ...createPaymentDto,
      user: { id: createPaymentDto.userId },
    });
    const paymentSave = await this.paymentRepository.save(payment);

    var config = {
      method: 'post',
      url: 'https://api-checkout.cinetpay.com/v2/payment',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        apikey: process.env.CINETPAY_API_KEY, // Remplacez par votre clé API
        site_id: process.env.CINETPAY_SITE_ID, // Remplacez par votre site ID
        mode: 'TEST', // Mode PRODUCTION ou TEST
        ...createPaymentDto,
      },
    };

    const { data: paymentData } = await axios(config);
    if (!paymentData) {
      throw new BadRequestException({
        message: "Erreur lors de l'initiation du paiement",
      });
    }

    console.log(paymentData)
    await this.paymentRepository.update(
      { id: paymentSave.id },
      { payment_token: paymentData.data.payment_token },
    );

    // this.notificationGateway.CheckIsAbonnement(
    //   {
    //     userId: createPaymentDto.userId,
    //     transactionId: paymentSave.transaction_id,
    //   },
    //   null,
    // );

    return paymentData;
  }

  /**
   * Récupère tous les paiements d'un utilisateur.
   * @param userId - ID de l'utilisateur.
   * @returns Une liste de paiements.
   */
  async getPaymentsByUser(userId: number) {
    return this.paymentRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Récupère un paiement par son ID.
   * @param paymentId - ID du paiement.
   * @returns Le paiement correspondant.
   */
  async getPaymentById(paymentId: string) {
    return this.paymentRepository.findOne({
      where: { id: paymentId.toString() },
    });
  }

  /**
   * Met à jour le statut d'un paiement.
   * @param paymentId - ID du paiement.
   * @param status - Nouveau statut (ex: "completed", "failed").
   * @returns Le paiement mis à jour.
   */
  async updatePaymentStatus(paymentId: string, status: string) {
    await this.paymentRepository.update(paymentId, { status });
    return this.getPaymentById(paymentId);
  }

  /**
   * Met à jour un paiement.
   * @param paymentId - ID du paiement.
   * @param updateData - Données pour mettre à jour le paiement.
   * @returns Le paiement mis à jour.
   */
  async updatePayment(
    paymentId: string,
    updateData: Partial<UpdatePaymentDto>,
  ) {
    await this.paymentRepository.update(paymentId, updateData);
    return this.getPaymentById(paymentId);
  }
}
