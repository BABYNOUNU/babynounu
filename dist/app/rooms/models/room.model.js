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
exports.Room = void 0;
const typeorm_1 = require("typeorm");
const message_model_1 = require("../../messages/models/message.model");
const parent_model_1 = require("../../parent/models/parent.model");
const nounu_model_1 = require("../../nounus/models/nounu.model");
let Room = class Room {
    id;
    nounou;
    parent;
    messages;
    parentUnreadCount;
    nounuUnreadCount;
    administrateurUnreadCount;
};
exports.Room = Room;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Room.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nounu_model_1.Nounus, (nounu) => nounu.nounouRooms),
    __metadata("design:type", nounu_model_1.Nounus)
], Room.prototype, "nounou", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parent_model_1.Parents, (parent) => parent.parentRooms),
    __metadata("design:type", parent_model_1.Parents)
], Room.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_model_1.Message, (message) => message.room),
    __metadata("design:type", Array)
], Room.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Room.prototype, "parentUnreadCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Room.prototype, "nounuUnreadCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Room.prototype, "administrateurUnreadCount", void 0);
exports.Room = Room = __decorate([
    (0, typeorm_1.Entity)()
], Room);
