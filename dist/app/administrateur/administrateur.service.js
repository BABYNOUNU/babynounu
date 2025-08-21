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
exports.AdministrateurService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AdministrateurService = class AdministrateurService {
    updateAppRepository;
    constructor(updateAppRepository) {
        this.updateAppRepository = updateAppRepository;
    }
    async create(createUpdateAppDto) {
        try {
            const updateApp = this.updateAppRepository.create({
                ...createUpdateAppDto,
                lastUpdate: new Date(),
            });
            const savedUpdateApp = await this.updateAppRepository.save(updateApp);
            if (!savedUpdateApp) {
                throw new common_1.BadRequestException('Échec de la création de la configuration');
            }
            return savedUpdateApp;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Erreur lors de la création: ${error.message}`);
        }
    }
    async findAll(page = 1, limit = 10) {
        try {
            const pageNumber = Math.max(1, parseInt(page.toString(), 10) || 1);
            const limitNumber = Math.max(1, Math.min(100, parseInt(limit.toString(), 10) || 10));
            const skip = (pageNumber - 1) * limitNumber;
            const [data, totalCount] = await this.updateAppRepository.findAndCount({
                order: { lastUpdate: 'DESC' },
                skip,
                take: limitNumber,
            });
            const totalPages = Math.ceil(totalCount / limitNumber);
            const hasNextPage = pageNumber < totalPages;
            const hasPreviousPage = pageNumber > 1;
            return {
                data,
                pagination: {
                    currentPage: pageNumber,
                    totalPages,
                    totalItems: totalCount,
                    itemsPerPage: limitNumber,
                    hasNextPage,
                    hasPreviousPage,
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Erreur lors de la récupération: ${error.message}`);
        }
    }
    async findOne(id) {
        try {
            const updateApp = await this.updateAppRepository.findOne({
                where: { id },
            });
            if (!updateApp) {
                throw new common_1.NotFoundException(`Configuration avec l'ID ${id} introuvable`);
            }
            return updateApp;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Erreur lors de la récupération: ${error.message}`);
        }
    }
    async findActive() {
        try {
            const activeConfig = await this.updateAppRepository.findOne({
                where: { isActive: true },
                order: { lastUpdate: 'DESC' },
            });
            if (!activeConfig) {
                throw new common_1.NotFoundException('Aucune configuration active trouvée');
            }
            return activeConfig;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Erreur lors de la récupération: ${error.message}`);
        }
    }
    async update(id, updateUpdateAppDto) {
        try {
            const existingUpdateApp = await this.findOne(id);
            const updateResult = await this.updateAppRepository.update(id, {
                ...updateUpdateAppDto,
                lastUpdate: new Date(),
            });
            if (updateResult.affected === 0) {
                throw new common_1.BadRequestException('Aucune modification effectuée');
            }
            return await this.findOne(id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Erreur lors de la mise à jour: ${error.message}`);
        }
    }
    async remove(id) {
        try {
            await this.findOne(id);
            const deleteResult = await this.updateAppRepository.delete(id);
            if (deleteResult.affected === 0) {
                throw new common_1.BadRequestException('Échec de la suppression');
            }
            return { message: `Configuration avec l'ID ${id} supprimée avec succès` };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Erreur lors de la suppression: ${error.message}`);
        }
    }
    async toggleActive(id, isActive) {
        try {
            if (isActive) {
                await this.updateAppRepository.update({ isActive: true }, { isActive: false });
            }
            return await this.update(id, { isActive });
        }
        catch (error) {
            throw new common_1.BadRequestException(`Erreur lors du changement de statut: ${error.message}`);
        }
    }
    async searchByAppName(appName, page = 1, limit = 10) {
        try {
            const pageNumber = Math.max(1, parseInt(page.toString(), 10) || 1);
            const limitNumber = Math.max(1, Math.min(100, parseInt(limit.toString(), 10) || 10));
            const skip = (pageNumber - 1) * limitNumber;
            const [data, totalCount] = await this.updateAppRepository.findAndCount({
                where: {
                    appName: (0, typeorm_1.Like)(`%${appName}%`),
                },
                order: { lastUpdate: 'DESC' },
                skip,
                take: limitNumber,
            });
            const totalPages = Math.ceil(totalCount / limitNumber);
            return {
                data,
                pagination: {
                    currentPage: pageNumber,
                    totalPages,
                    totalItems: totalCount,
                    itemsPerPage: limitNumber,
                    hasNextPage: pageNumber < totalPages,
                    hasPreviousPage: pageNumber > 1,
                },
                searchTerm: appName,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Erreur lors de la recherche: ${error.message}`);
        }
    }
    async findVersionToActive(version) {
        try {
            const versionConfig = await this.updateAppRepository.findOne({
                where: { version },
            });
            if (!versionConfig) {
                throw new common_1.NotFoundException(`Version ${version} introuvable`);
            }
            await this.updateAppRepository.update({ isActive: true }, { isActive: false, lastUpdate: new Date() });
            await this.updateAppRepository.update({ id: versionConfig.id }, {
                isActive: true,
                lastUpdate: new Date()
            });
            const updatedConfig = await this.updateAppRepository.findOne({
                where: { id: versionConfig.id },
            });
            return updatedConfig;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Erreur lors de l'activation de la version: ${error.message}`);
        }
    }
};
exports.AdministrateurService = AdministrateurService;
exports.AdministrateurService = AdministrateurService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ADMINISTRATEUR_APP_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AdministrateurService);
