"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbonnementService = void 0;
const notification_service_1 = require("../notification/notification.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const paiement_service_1 = require("../paiement/paiement.service");
const axios_1 = require("axios");
let AbonnementService = class AbonnementService {
    abonnementRepository;
    paymentRepository;
    paymentService;
    notificationService;
    SUBSCRIPTION_DURATION_DAYS = 30;
    constructor(abonnementRepository, paymentRepository, paymentService, notificationService) {
        this.abonnementRepository = abonnementRepository;
        this.paymentRepository = paymentRepository;
        this.paymentService = paymentService;
        this.notificationService = notificationService;
    }
    async createAbonnement(createAbonnementDto) {
        const payment = await this.findPayment(createAbonnementDto);
        if (!payment) {
            return this.buildResponse(false, false);
        }
        const existingAbonnement = await this.findExistingAbonnement(createAbonnementDto.userId, payment.id);
        if (existingAbonnement) {
            return this.buildResponse(true, await this.hasActiveAbonnement(createAbonnementDto.userId), existingAbonnement);
        }
        const isPaymentValid = await this.validateCinetPayPayment(payment.payment_token, createAbonnementDto.userId, createAbonnementDto.transactionId);
        if (!isPaymentValid) {
            return this.buildResponse(true, await this.hasActiveAbonnement(createAbonnementDto.userId));
        }
        const newAbonnement = await this.createNewAbonnement(createAbonnementDto.userId, payment.id);
        await this.sendSubscriptionNotification(createAbonnementDto.userId);
        return this.buildResponse(true, true, newAbonnement);
    }
    async findPayment(createAbonnementDto) {
        return this.paymentRepository.findOneBy({
            user: { id: createAbonnementDto.userId },
            transaction_id: createAbonnementDto.transactionId,
        });
    }
    async findExistingAbonnement(userId, paymentId) {
        return this.abonnementRepository.findOne({
            where: {
                user: { id: userId },
                paiement: { id: paymentId },
            },
            relations: ['user', 'paiement'],
        });
    }
    async validateCinetPayPayment(paymentToken, userId, transactionId) {
        try {
            const response = await axios_1.default.post('https://api-checkout.cinetpay.com/v2/payment/check', {
                apikey: process.env.CINETPAY_API_KEY,
                site_id: process.env.CINETPAY_SITE_ID,
                token: paymentToken,
                return_url: `${process.env.CINETPAY_RETURN_URL}?userId=${userId}&transactionId=${transactionId}`,
            }, {
                headers: { 'Content-Type': 'application/json' },
            });
            return !!response.data.data;
        }
        catch (error) {
            console.error('CinetPay validation error:', error);
            return false;
        }
    }
    async createNewAbonnement(userId, paymentId) {
        const abonnement = this.abonnementRepository.create({
            paiement: { id: paymentId },
            user: { id: userId },
        });
        const savedAbonnement = await this.abonnementRepository.save(abonnement);
        if (!savedAbonnement) {
            throw new common_1.NotFoundException(`Échec de la création de l'abonnement pour l'utilisateur ${userId}`);
        }
        return savedAbonnement;
    }
    async sendSubscriptionNotification(userId) {
        await this.notificationService.createNotification({
            type: 'ABONNEMENT',
            userId: userId,
            message: 'Votre abonnement a bien été validé.',
            is_read: false,
            senderUserId: userId,
        });
    }
    buildResponse(isPayment, hasActiveSubscription, abonnement) {
        return {
            ...(abonnement || {}),
            isPayment,
            hasActiveSubscription,
        };
    }
    async getAbonnementsByUser(userId) {
        return this.abonnementRepository.find({
            where: { user: { id: userId } },
            relations: ['paiement', 'user'],
        });
    }
    async getAbonnementById(abonnementId) {
        const abonnement = await this.abonnementRepository.findOne({
            where: { id: abonnementId },
            relations: ['paiement', 'type', 'user'],
        });
        if (!abonnement) {
            throw new common_1.NotFoundException(`Abonnement avec l'ID ${abonnementId} introuvable`);
        }
        return abonnement;
    }
    async hasActiveAbonnement(userId) {
        const abonnement = await this.abonnementRepository.findOne({
            where: { user: { id: userId } },
            order: { createdAt: 'DESC' },
        });
        if (!abonnement)
            return false;
        return this.isSubscriptionActive(abonnement.createdAt);
    }
    isSubscriptionActive(createdAt) {
        const subscriptionDate = new Date(createdAt);
        const currentDate = new Date();
        const daysSinceSubscription = Math.floor((currentDate.getTime() - subscriptionDate.getTime()) /
            (1000 * 60 * 60 * 24));
        return daysSinceSubscription <= this.SUBSCRIPTION_DURATION_DAYS;
    }
};
exports.AbonnementService = AbonnementService;
exports.AbonnementService = AbonnementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ABONNEMENT_REPOSITORY')),
    __param(1, (0, common_1.Inject)('PAYMENT_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        paiement_service_1.PaymentService,
        notification_service_1.NotificationService])
], AbonnementService);
