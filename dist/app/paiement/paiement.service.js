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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const axios_1 = require("axios");
let PaymentService = class PaymentService {
    paymentRepository;
    constructor(paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
    getAuthParams() {
        return {
            apikey: process.env.CINETPAY_API_KEY,
            site_id: process.env.CINETPAY_SITE_ID
        };
    }
    async createPayment(createPaymentDto) {
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
                apikey: process.env.CINETPAY_API_KEY,
                site_id: process.env.CINETPAY_SITE_ID,
                transaction_id: Math.floor(Math.random() * 100000000).toString(),
                amount: createPaymentDto.amount,
                currency: createPaymentDto.currency,
                alternative_currency: '',
                description: createPaymentDto.description,
                customer_id: Math.floor(Math.random() * 100000000).toString(),
                notify_url: createPaymentDto.notify_url,
                return_url: createPaymentDto.return_url,
                channels: 'ALL',
                metadata: paymentSave.id,
                lang: 'FR',
            },
        };
        const { data: paymentData } = await (0, axios_1.default)(config);
        if (!paymentData) {
            throw new common_1.BadRequestException({
                message: "Erreur lors de l'initiation du paiement",
            });
        }
        await this.paymentRepository.update({ id: paymentSave.id }, { payment_token: paymentData.data.payment_token });
        return paymentData;
    }
    async getPaymentsByUser(userId) {
        return this.paymentRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async getPaymentById(paymentId) {
        return this.paymentRepository.findOne({
            where: { id: paymentId.toString() },
        });
    }
    async getPaymentByUserIdAndTransactionId(userId, transactionId) {
        return await this.paymentRepository.findOne({
            where: { user: { id: userId }, transaction_id: transactionId },
            relations: ['user'],
        });
    }
    async updatePaymentStatus(paymentId, status) {
        await this.paymentRepository.update(paymentId, { status });
        return this.getPaymentById(paymentId);
    }
    async updatePayment(paymentId, updateData) {
        await this.paymentRepository.update(paymentId, updateData);
        return this.getPaymentById(paymentId);
    }
    async handlePaymentNotification(notificationData) {
        const signature = this.generateSignature(notificationData.cpm_trans_id, notificationData.cpm_amount, notificationData.cpm_trans_date);
        if (signature !== notificationData.signature) {
            throw new Error('Invalid signature');
        }
        this.paymentRepository.update({ transaction_id: "03c4e006-6303-4599-8a9c-0349bda13cb7" }, { status: JSON.stringify(notificationData) });
        switch (notificationData.cpm_result) {
            case '00':
                return { status: 'SUCCESS', data: notificationData };
            case '05':
                return { status: 'FAILED', data: notificationData };
            default:
                return { status: 'PENDING', data: notificationData };
        }
    }
    generateSignature(transId, amount, transDate) {
        const { apikey, site_id } = this.getAuthParams();
        const data = `${transId}${amount}${transDate}${apikey}${site_id}`;
        return require('crypto').createHash('sha256').update(data).digest('hex');
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PAYMENT_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], PaymentService);
