import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Paiements } from './models/paiement.model';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import axios from 'axios';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_REPOSITORY')
    private readonly paymentRepository: Repository<Paiements>,
  ) {}

  /**
   * Crée un nouveau paiement.
   * @param createPaymentDto - Données pour créer le paiement.
   * @returns Le paiement créé.
   */
  async createPayment(createPaymentDto: CreatePaymentDto) {
    const hasUserPaid = await this.paymentRepository.findOne({
      where: { user: { id: createPaymentDto.userId } },
      relations: ['user'],
    });
    if (hasUserPaid) {
      throw new BadRequestException({
        message: "L'utilisateur a deja paye",
      });
    }

    const payment = this.paymentRepository.create({
      ...createPaymentDto,
      user: { id: createPaymentDto.userId },
    });
    await this.paymentRepository.save(payment);

    var config = {
      method: 'post',
      url: 'https://api-checkout.cinetpay.com/v2/payment',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        apikey: process.env.CINETPAY_API_KEY, // Remplacez par votre clé API
        site_id: process.env.CINETPAY_SITE_ID, // Remplacez par votre site ID
        mode: 'PRODUCTION', // Mode PRODUCTION ou TEST
        ...createPaymentDto,
      },
    };

    const { data: paymentDataSave } = await axios(config);
    if (!paymentDataSave) {
      throw new BadRequestException({
        message: "Erreur lors de l'initiation du paiement",
      });
    }

    await this.paymentRepository.update(
      { id: paymentDataSave.id },
      { payment_token: paymentDataSave.payment_token },
    );

    return paymentDataSave;
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
  async getPaymentById(paymentId: number) {
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
  async updatePaymentStatus(paymentId: number, status: string) {
    await this.paymentRepository.update(paymentId, { status });
    return this.getPaymentById(paymentId);
  }
}
