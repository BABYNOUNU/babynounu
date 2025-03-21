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
exports.ChatRooms = void 0;
const typeorm_1 = require("typeorm");
const rooms_model_1 = require("./rooms.model");
const user_model_1 = require("../../user/user.model");
let ChatRooms = class ChatRooms {
    id;
    sender;
    room;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.ChatRooms = ChatRooms;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChatRooms.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.messages, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_model_1.User)
], ChatRooms.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rooms_model_1.Rooms, (room) => room.id, { onDelete: 'CASCADE' }),
    __metadata("design:type", rooms_model_1.Rooms)
], ChatRooms.prototype, "room", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ChatRooms.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ChatRooms.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ChatRooms.prototype, "deletedAt", void 0);
exports.ChatRooms = ChatRooms = __decorate([
    (0, typeorm_1.Entity)()
], ChatRooms);
