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
const notification_service_1 = require("./../notification/notification.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const notification_gateway_1 = require("../notification/notification.gateway");
const paiement_service_1 = require("../paiement/paiement.service");
const axios_1 = require("axios");
let AbonnementService = class AbonnementService {
    abonnementRepository;
    payRepository;
    paymentService;
    NotificationService;
    notificationGateway;
    constructor(abonnementRepository, payRepository, paymentService, NotificationService, notificationGateway) {
        this.abonnementRepository = abonnementRepository;
        this.payRepository = payRepository;
        this.paymentService = paymentService;
        this.NotificationService = NotificationService;
        this.notificationGateway = notificationGateway;
    }
    async createAbonnement(createAbonnementDto) {
        const paiement = await this.payRepository.findOne({
            where: {
                user: { id: createAbonnementDto.userId },
                transaction_id: createAbonnementDto.transactionId,
            },
        });
        if (!paiement) {
            throw new common_1.NotFoundException(`Auccun paiement avec l'ID de transaction ${createAbonnementDto.transactionId} n'a pas été trouvé`);
        }
        var config = {
            method: 'post',
            url: 'https://api-checkout.cinetpay.com/v2/payment/check',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                apikey: process.env.CINETPAY_API_KEY,
                site_id: process.env.CINETPAY_SITE_ID,
                token: paiement.payment_token,
            },
        };
        let abonnementChecked;
        await (0, axios_1.default)(config)
            .then((response) => {
            abonnementChecked = response.data;
        })
            .catch((error) => {
            throw new common_1.NotFoundException(`Le paiement avec l'ID de transaction ${createAbonnementDto.transactionId} n'a pas été trouvé`);
        });
        const abonnement = this.abonnementRepository.create({
            paiement: { id: paiement.id },
            user: { id: createAbonnementDto.userId },
        });
        const abonnementSave = await this.abonnementRepository.save(abonnement);
        if (!abonnementSave) {
            throw new common_1.NotFoundException(`Abonnement with transaction ID ${createAbonnementDto.transactionId} not found`);
        }
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
        const GetAbonnement = await this.getAbonnementById(abonnementSave.id);
        this.notificationGateway.server.emit('abonnementValide', {
            message: GetAbonnement,
        });
        return abonnementSave;
    }
    async getAbonnementsByUser(userId) {
        return this.abonnementRepository.find({
            where: { user: { id: userId } },
            relations: ['paiement', 'type'],
        });
    }
    async getAbonnementById(abonnementId) {
        const abonnement = await this.abonnementRepository.findOne({
            where: { id: abonnementId },
            relations: ['paiement', 'type', 'user'],
        });
        if (!abonnement) {
            throw new common_1.NotFoundException(`Abonnement with ID ${abonnementId} not found`);
        }
        return abonnement;
    }
    async hasActiveAbonnement(userId) {
        const abonnement = await this.abonnementRepository.findOne({
            where: { user: { id: userId } },
            order: { createdAt: 'DESC' },
        });
        if (!abonnement) {
            return false;
        }
        const abonnementDate = new Date(abonnement.createdAt);
        const currentDate = new Date();
        const daysSinceAbonnement = Math.floor((currentDate.getTime() - abonnementDate.getTime()) /
            (1000 * 60 * 60 * 24));
        return daysSinceAbonnement <= 30;
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
        notification_gateway_1.NotificationGateway])
], AbonnementService);
