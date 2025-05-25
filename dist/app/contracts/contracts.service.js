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
exports.ContractsService = void 0;
const nounus_service_1 = require("./../nounus/nounus.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const notification_service_1 = require("../notification/notification.service");
let ContractsService = class ContractsService {
    contractsRepository;
    nounusRepository;
    parentsRepository;
    notificationService;
    nounusService;
    constructor(contractsRepository, nounusRepository, parentsRepository, notificationService, nounusService) {
        this.contractsRepository = contractsRepository;
        this.nounusRepository = nounusRepository;
        this.parentsRepository = parentsRepository;
        this.notificationService = notificationService;
        this.nounusService = nounusService;
    }
    async create(createContractDto) {
        const contractExist = await this.contractsRepository.findOne({
            where: {
                room: { id: createContractDto.roomId },
                message: { id: createContractDto.messageId },
            },
            relations: ['room', 'message'],
        });
        if (contractExist) {
            throw new common_1.BadRequestException('Contract already exist');
        }
        const newContract = this.contractsRepository.create({
            room: { id: createContractDto.roomId },
            message: { id: createContractDto.messageId },
        });
        const contract = await this.contractsRepository.save(newContract);
        const getContract = await this.findOne(contract.id);
        await this.notificationService.createNotification({
            type: 'CONTRAT',
            userId: getContract.room.parent.user.id,
            message: `Vous avez une nouvelle missons chez ${getContract.room.parent.fullname} pour une durée de ${JSON.parse(getContract.message.content).duration}jours.`,
            is_read: false,
            senderUserId: getContract.room.nounou.user.id,
            tolinkId: getContract.id.toString(),
        });
        await this.notificationService.createNotification({
            type: 'CONTRAT',
            userId: getContract.room.nounou.user.id,
            message: `${getContract.room.nounou.fullname} à accepté votre mission chez (Vous) pour une durée de  ${JSON.parse(getContract.message.content).duration}jours.`,
            is_read: false,
            senderUserId: getContract.room.parent.user.id,
            tolinkId: getContract.id.toString(),
        });
        const StatusNu = await this.nounusService.updateStatus(getContract.room.nounou.user.id, 'indisponible');
        if (StatusNu) {
            await this.notificationService.createNotification({
                type: 'PROFIL_DETAIL',
                userId: getContract.room.nounou.user.id,
                message: `Le statut de votre profil est passé en mode 'Indisponible', car vous avez déjà une mission en cours chez l'un de nos clients.`,
                is_read: false,
                senderUserId: getContract.room.nounou.user.id,
                tolinkId: getContract.id.toString(),
            });
            this.nounusService.decrementPoints(getContract.room.parent.user.id, 100);
        }
        return contract;
    }
    async findAll() {
        return this.contractsRepository.find({
            relations: {
                message: true,
                room: {
                    nounou: {
                        user: true,
                    },
                    parent: {
                        user: true,
                    },
                },
            },
        });
    }
    async findAllByUserId(userId) {
        return this.contractsRepository.find({
            where: [
                {
                    room: {
                        parent: {
                            user: { id: userId },
                        },
                    },
                },
                {
                    room: {
                        nounou: {
                            user: { id: userId },
                        },
                    },
                },
            ],
            relations: {
                message: true,
                room: {
                    nounou: {
                        user: true,
                    },
                    parent: {
                        user: true,
                    },
                },
            },
        });
    }
    async findOne(id) {
        const contract = await this.contractsRepository.findOne({
            where: { id },
            relations: {
                message: {
                    room: true,
                },
                room: {
                    nounou: {
                        user: {
                            medias: {
                                type_media: true,
                            },
                        },
                    },
                    parent: {
                        user: {
                            medias: {
                                type_media: true,
                            },
                        },
                    },
                },
            },
        });
        if (!contract) {
            throw new common_1.NotFoundException(`Contract with ID ${id} not found`);
        }
        return {
            ...contract,
            photoNounou: contract.room.nounou.user.medias?.find((media) => media?.type_media.slug === 'image-profil'),
            photoParent: contract.room.parent.user.medias?.find((media) => media?.type_media?.slug === 'image-profil'),
        };
    }
    async update(id, updateContractDto) {
        const contract = await this.findOne(id);
        const updated = this.contractsRepository.merge(contract, {
            room: { id: updateContractDto.roomId },
            message: { id: updateContractDto.messageId },
        });
        return this.contractsRepository.save(updated);
    }
    async updateStatus(id, status) {
        const contract = await this.findOne(id);
        const updated = this.contractsRepository.merge(contract, {
            status,
        });
        return this.contractsRepository.save(updated);
    }
    async remove(id) {
        const result = await this.contractsRepository.softDelete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Contract with ID ${id} not found`);
        }
    }
    async restore(id) {
        const result = await this.contractsRepository.restore(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Contract with ID ${id} not found`);
        }
        return this.findOne(id);
    }
};
exports.ContractsService = ContractsService;
exports.ContractsService = ContractsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CONTRACTS_REPOSITORY')),
    __param(1, (0, common_1.Inject)('NOUNUS_REPOSITORY')),
    __param(2, (0, common_1.Inject)('PARENT_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        notification_service_1.NotificationService,
        nounus_service_1.NounusService])
], ContractsService);
