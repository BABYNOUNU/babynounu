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
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const notification_service_1 = require("./notification.service");
const abonnement_service_1 = require("../abonnement/abonnement.service");
const create_abonnement_dto_1 = require("../abonnement/dtos/create-abonnement.dto");
const job_application_service_1 = require("../job-application/job-application.service");
let ChatGateway = class ChatGateway {
    abonnementService;
    notificationService;
    jobApplicationService;
    server;
    constructor(abonnementService, notificationService, jobApplicationService) {
        this.abonnementService = abonnementService;
        this.notificationService = notificationService;
        this.jobApplicationService = jobApplicationService;
    }
    handleConnection(client) {
    }
    handleDisconnect(client) {
    }
    handleMessage(data, client) {
        console.log(`Message reçu: ${data}`);
        this.server.emit('message', `Réponse du serveur: ${data}`);
    }
    async CheckIsAbonnement(createAbonnementDto, client) {
        const isAbonnement = await this.abonnementService.createAbonnement(createAbonnementDto);
        console.log(isAbonnement);
        this.server.emit('isAbonnement', isAbonnement);
    }
    async GetNotifications(data, client) {
        const notification = await this.notificationService.getNotifications(data.userId);
        this.server.emit('notifications', {
            userId: data.userId,
            notifications: notification,
        });
    }
    async UpdateViewByUserId(data, client) {
        const notification = await this.notificationService.updateViewByUserId(data.userId);
        this.server.emit('notifications', {
            userId: data.userId,
            notifications: notification,
        });
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('checkIsAbonnement'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_abonnement_dto_1.CreateAbonnementDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "CheckIsAbonnement", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getNotifications'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "GetNotifications", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateViewByUserId'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "UpdateViewByUserId", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: '*' },
    }),
    __metadata("design:paramtypes", [abonnement_service_1.AbonnementService,
        notification_service_1.NotificationService,
        job_application_service_1.JobApplicationsService])
], ChatGateway);
