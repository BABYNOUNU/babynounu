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
const nounus_service_1 = require("../nounus/nounus.service");
let AbonnementService = class AbonnementService {
    abonnementRepository;
    paymentRepository;
    paymentService;
    notificationService;
    nounuService;
    SUBSCRIPTION_DURATION_DAYS = 30;
    constructor(abonnementRepository, paymentRepository, paymentService, notificationService, nounuService) {
        this.abonnementRepository = abonnementRepository;
        this.paymentRepository = paymentRepository;
        this.paymentService = paymentService;
        this.notificationService = notificationService;
        this.nounuService = nounuService;
    }
    async createPaymentPoint({ transactionId, userId, points, }) {
        const payment = await this.paymentRepository.findOne({
            where: { transaction_id: transactionId, user: { id: userId } },
            relations: ['user'],
        });
        if (!payment) {
            throw new common_1.NotFoundException(`Paiement avec l'ID ${transactionId} introuvable`);
        }
        const iSAcceptedPayment = await this.paymentRepository.findOne({
            where: {
                transaction_id: transactionId,
                user: { id: userId },
                status: 'ACCEPTED',
            },
            relations: ['user'],
        });
        const isPaymentValid = await this.validateCinetPayPayment(payment.transaction_id);
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
    async createAbonnement(createAbonnementDto) {
        const payment = await this.findPayment(createAbonnementDto);
        if (!payment) {
            return this.buildResponse(false, false);
        }
        const existingAbonnement = await this.findExistingAbonnement(createAbonnementDto.userId, payment.id);
        if (existingAbonnement) {
            return this.buildResponse(true, await this.hasActiveAbonnement(createAbonnementDto.userId), existingAbonnement);
        }
        const isPaymentValid = await this.validateCinetPayPayment(createAbonnementDto.transactionId);
        if (!isPaymentValid) {
            return this.buildResponse(true, await this.hasActiveAbonnement(createAbonnementDto.userId));
        }
        const newAbonnement = await this.createNewAbonnement(createAbonnementDto.userId, payment.id);
        await this.sendSubscriptionNotification(createAbonnementDto.userId);
        if (payment.user.nounu && payment.user.nounu[0]) {
            await this.nounuService.updatePoints(payment.user.nounu.length != 0 ? payment.user.nounu[0].id : payment.user.parent[0].id, 500);
        }
        return this.buildResponse(true, true, newAbonnement);
    }
    async findPayment(createAbonnementDto) {
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
    async findExistingAbonnement(userId, paymentId) {
        return this.abonnementRepository.findOne({
            where: {
                user: { id: userId },
                paiement: { id: paymentId },
            },
            relations: ['user', 'paiement'],
        });
    }
    async validateCinetPayPayment(transaction_id) {
        try {
            const { data } = await axios_1.default.post('https://api-checkout.cinetpay.com/v2/payment/check', {
                apikey: process.env.CINETPAY_API_KEY,
                site_id: process.env.CINETPAY_SITE_ID,
                transaction_id: transaction_id,
            }, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (data.data) {
                const payment = await this.paymentRepository.update({ transaction_id }, {
                    status: data.data.status,
                    paymentMethod: data.data.payment_method,
                    operator_id: data.data.operator_id,
                    payment_date: data.data.payment_date,
                    amount: data.data.amount,
                    currency: data.data.currency,
                    payment_token: data.data.payment_token,
                });
                if (payment.affected == 1) {
                    return true;
                }
            }
            return false;
        }
        catch (error) {
            return false;
        }
    }
    async createNewAbonnement(userId, paymentId) {
        const isOperationId = await this.paymentRepository.find({
            where: {
                id: paymentId,
            },
        });
        if (!isOperationId) {
            throw new common_1.NotFoundException(`Paiement avec l'ID ${paymentId} introuvable`);
        }
        const isAbonnementExist = await this.abonnementRepository.findOne({
            where: {
                user: { id: userId },
                paiement: { id: paymentId },
            },
        });
        if (isAbonnementExist) {
            throw new common_1.BadRequestException(`L'utilisateur ${userId} a deja un abonnement`);
        }
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
    async getAbonnementByUserId(userId) {
        const abonnement = await this.abonnementRepository.findOne({
            where: { user: { id: userId } },
            order: { createdAt: 'DESC' },
            relations: ['paiement', 'type', 'user'],
        });
        if (!abonnement) {
            throw new common_1.NotFoundException(`Aucun abonnement pour l'utilisateur ${userId} n'a été trouvé`);
        }
        return {
            ...abonnement,
            isActived: await this.hasActiveAbonnement(userId),
        };
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
    async cancelAbonnement(abonnementId) {
        const abonnement = await this.abonnementRepository.findOne({
            where: { id: abonnementId },
        });
        if (!abonnement) {
            throw new common_1.NotFoundException(`Abonnement avec l'ID ${abonnementId} introuvable`);
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
};
exports.AbonnementService = AbonnementService;
exports.AbonnementService = AbonnementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ABONNEMENT_REPOSITORY')),
    __param(1, (0, common_1.Inject)('PAYMENT_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        paiement_service_1.PaymentService,
        notification_service_1.NotificationService,
        nounus_service_1.NounusService])
], AbonnementService);
