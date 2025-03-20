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
exports.Rooms = void 0;
const typeorm_1 = require("typeorm");
const user_model_1 = require("../../user/user.model");
const message_model_1 = require("./message.model");
let Rooms = class Rooms {
    id;
    sender;
    receiver;
    messages;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Rooms = Rooms;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Rooms.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.conversations_sender),
    __metadata("design:type", user_model_1.User)
], Rooms.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.conversations_receiver),
    __metadata("design:type", user_model_1.User)
], Rooms.prototype, "receiver", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_model_1.Message, (message) => message.room),
    __metadata("design:type", Array)
], Rooms.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Rooms.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Rooms.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Rooms.prototype, "deletedAt", void 0);
exports.Rooms = Rooms = __decorate([
    (0, typeorm_1.Entity)()
], Rooms);
