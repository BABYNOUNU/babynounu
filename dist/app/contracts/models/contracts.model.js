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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contracts = void 0;
const typeorm_1 = require("typeorm");
const room_model_1 = require("../../rooms/models/room.model");
const message_model_1 = require("../../messages/models/message.model");
let Contracts = class Contracts {
    id;
    room;
    message;
    status;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Contracts = Contracts;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Contracts.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => room_model_1.Rooms, (room) => room.contract, { onDelete: 'CASCADE' }),
    __metadata("design:type", room_model_1.Rooms)
], Contracts.prototype, "room", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => message_model_1.Message, (message) => message.contract, { onDelete: 'CASCADE' }),
    __metadata("design:type", message_model_1.Message)
], Contracts.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['Accepted', 'Pending', 'Canceled'], default: 'Pending' }),
    __metadata("design:type", String)
], Contracts.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Contracts.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Contracts.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Contracts.prototype, "deletedAt", void 0);
exports.Contracts = Contracts = __decorate([
    (0, typeorm_1.Entity)()
], Contracts);
