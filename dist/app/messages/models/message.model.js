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
exports.Message = void 0;
const typeorm_1 = require("typeorm");
const user_model_1 = require("../../user/user.model");
const room_model_1 = require("../../rooms/models/room.model");
const contracts_model_1 = require("../../contracts/models/contracts.model");
let Message = class Message {
    id;
    content;
    sender;
    contract;
    room;
    isRead;
    type;
    isProposition;
    propositionExpired;
    proposalStatus;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Message = Message;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Message.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.messages, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_model_1.User)
], Message.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contracts_model_1.Contracts, (contract) => contract.message, { onDelete: 'CASCADE' }),
    __metadata("design:type", contracts_model_1.Contracts)
], Message.prototype, "contract", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => room_model_1.Rooms, (room) => room.messages, { onDelete: 'CASCADE' }),
    __metadata("design:type", room_model_1.Rooms)
], Message.prototype, "room", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Message.prototype, "isRead", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['Message', 'Proposition'], default: 'Message' }),
    __metadata("design:type", String)
], Message.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Message.prototype, "isProposition", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "propositionExpired", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['Accepted', 'Refused', 'Pending'], default: 'Pending' }),
    __metadata("design:type", String)
], Message.prototype, "proposalStatus", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Message.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Message.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Message.prototype, "deletedAt", void 0);
exports.Message = Message = __decorate([
    (0, typeorm_1.Entity)()
], Message);
