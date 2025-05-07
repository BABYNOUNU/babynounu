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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const paiement_service_1 = require("./paiement.service");
const create_payment_dto_1 = require("./dtos/create-payment.dto");
const swagger_1 = require("@nestjs/swagger");
const update_payment_dto_1 = require("./dtos/update-payment.dto");
let PaymentController = class PaymentController {
    paymentService;
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async createPayment(createPaymentDto) {
        return this.paymentService.createPayment(createPaymentDto);
    }
    async getPaymentsByUser(userId) {
        return this.paymentService.getPaymentsByUser(userId);
    }
    async getPaymentByUserIdAndTransactionId(userId, transactionId) {
        return this.paymentService.getPaymentByUserIdAndTransactionId(userId, transactionId);
    }
    async getPaymentById(paymentId) {
        return this.paymentService.getPaymentById(paymentId);
    }
    async updatePaymentStatus(paymentId, status) {
        return this.paymentService.updatePaymentStatus(paymentId, status);
    }
    async updatePayment(paymentId, updatePaymentDto) {
        return this.paymentService.updatePayment(paymentId, updatePaymentDto);
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new payment' }),
    (0, swagger_1.ApiBody)({ type: create_payment_dto_1.CreatePaymentDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Payment created successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payments for a user' }),
    (0, swagger_1.ApiParam)({ name: 'userId', type: Number, description: 'ID of the user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Payments retrieved successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getPaymentsByUser", null);
__decorate([
    (0, common_1.Get)('user/:userId/transaction/:transactionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a payment by user ID and transaction ID' }),
    (0, swagger_1.ApiParam)({ name: 'userId', type: Number, description: 'ID of the user' }),
    (0, swagger_1.ApiParam)({ name: 'transactionId', type: String, description: 'ID of the transaction' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Payment retrieved successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payment not found' }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('transactionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getPaymentByUserIdAndTransactionId", null);
__decorate([
    (0, common_1.Get)(':paymentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a payment by ID' }),
    (0, swagger_1.ApiParam)({ name: 'paymentId', type: Number, description: 'ID of the payment' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Payment retrieved successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payment not found' }),
    __param(0, (0, common_1.Param)('paymentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getPaymentById", null);
__decorate([
    (0, common_1.Patch)(':paymentId/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update payment status' }),
    (0, swagger_1.ApiParam)({ name: 'paymentId', type: Number, description: 'ID of the payment' }),
    (0, swagger_1.ApiBody)({ schema: { example: { status: 'completed' } } }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Payment status updated successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payment not found' }),
    __param(0, (0, common_1.Param)('paymentId')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "updatePaymentStatus", null);
__decorate([
    (0, common_1.Put)(':paymentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a payment by ID' }),
    (0, swagger_1.ApiParam)({ name: 'paymentId', type: Number, description: 'ID of the payment' }),
    (0, swagger_1.ApiBody)({ schema: { example: { amount: 100.99, paymentMethod: 'CB' } } }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Payment updated successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payment not found' }),
    __param(0, (0, common_1.Param)('paymentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_payment_dto_1.UpdatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "updatePayment", null);
exports.PaymentController = PaymentController = __decorate([
    (0, swagger_1.ApiTags)('payments'),
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [paiement_service_1.PaymentService])
], PaymentController);
