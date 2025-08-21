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
const message_model_1 = require("../../messages/models/message.model");
const parent_model_1 = require("../../parent/models/parent.model");
const nounu_model_1 = require("../../nounus/models/nounu.model");
const unreadCount_model_1 = require("./unreadCount.model");
const contracts_model_1 = require("../../contracts/models/contracts.model");
let Rooms = class Rooms {
    id;
    nounou;
    parent;
    receiver;
    sender;
    contract;
    unreadCounts;
    messages;
};
exports.Rooms = Rooms;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Rooms.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nounu_model_1.ProfilNounus, (nounu) => nounu.nounouRooms, { onDelete: 'CASCADE' }),
    __metadata("design:type", nounu_model_1.ProfilNounus)
], Rooms.prototype, "nounou", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parent_model_1.ProfilParents, (parent) => parent.parentRooms, { onDelete: 'CASCADE' }),
    __metadata("design:type", parent_model_1.ProfilParents)
], Rooms.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.roomReceiver, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_model_1.User)
], Rooms.prototype, "receiver", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.roomSender, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_model_1.User)
], Rooms.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contracts_model_1.Contracts, (contract) => contract.room, { cascade: true }),
    __metadata("design:type", contracts_model_1.Contracts)
], Rooms.prototype, "contract", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => unreadCount_model_1.RoomMessageCount, (roomUnreadCount) => roomUnreadCount.room, { cascade: true }),
    __metadata("design:type", Array)
], Rooms.prototype, "unreadCounts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_model_1.Message, (message) => message.room),
    __metadata("design:type", Array)
], Rooms.prototype, "messages", void 0);
exports.Rooms = Rooms = __decorate([
    (0, typeorm_1.Entity)()
], Rooms);
