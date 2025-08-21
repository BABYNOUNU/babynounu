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
exports.WsJwtGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let WsJwtGuard = class WsJwtGuard {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        console.log('switch to ws', context.getType());
        if (context.getType() !== 'ws') {
            return true;
        }
        const client = context.switchToWs().getClient();
        const token = this.extractTokenFromSocket(client);
        if (!token) {
            throw new common_1.UnauthorizedException('Authentication token not found');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });
            if (!payload.id) {
                throw new common_1.UnauthorizedException('Invalid token payload');
            }
            client.user = payload;
            return true;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
    extractTokenFromSocket(client) {
        try {
            if (client.handshake?.auth?.token) {
                return client.handshake.auth.token;
            }
            const queryToken = client.handshake?.query?.token;
            if (queryToken && typeof queryToken === 'string') {
                return queryToken;
            }
            const authHeader = client.handshake?.auth?.authorization;
            if (authHeader) {
                const [type, token] = authHeader.split(' ');
                if (type === 'Bearer' && token) {
                    return token;
                }
            }
            return null;
        }
        catch (error) {
            return null;
        }
    }
};
exports.WsJwtGuard = WsJwtGuard;
exports.WsJwtGuard = WsJwtGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], WsJwtGuard);
