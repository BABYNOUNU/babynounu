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
exports.ParentsService = void 0;
const media_service_1 = require("./../media/media.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const database_providers_1 = require("../../database/database.providers");
const nounus_service_1 = require("../nounus/nounus.service");
let ParentsService = class ParentsService {
    parentsRepository;
    preferenceRepository;
    mediaService;
    nounuService;
    constructor(parentsRepository, preferenceRepository, mediaService, nounuService) {
        this.parentsRepository = parentsRepository;
        this.preferenceRepository = preferenceRepository;
        this.mediaService = mediaService;
        this.nounuService = nounuService;
    }
    async findAll(userId, page = 1, limit = 10) {
        page = parseInt(page.toString(), 10) || 1;
        limit = parseInt(limit.toString(), 10) || 10;
        const skip = (page - 1) * limit;
        const [parents, total] = await this.parentsRepository.findAndCount({
            relations: [
                'user',
                'user.medias',
                'user.medias.type_media',
                'preferences',
                'preferences.garde_enfants',
                'preferences.horaire_souhaites',
                'preferences.adress',
            ],
            where: {
                user: {
                    id: (0, typeorm_1.Not)(userId),
                },
            },
            skip: skip,
            take: limit,
            order: {
                createdAt: 'DESC',
            },
        });
        if (!parents) {
            throw new common_1.NotFoundException(`Parent with not found`);
        }
        const formattedParents = await this.nounuService.ReturnN(parents, [
            'frequence_des_services',
            'horaire_souhaites',
            'adress',
        ]);
        return {
            data: formattedParents,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                hasNextPage: page < Math.ceil(total / limit),
                hasPrevPage: page > 1
            }
        };
    }
    async findOne(id) {
        const parent = await this.parentsRepository.findOne({
            where: { id },
            relations: [
                'user',
                'user.medias',
                'user.medias.type_media',
                'preferences',
                'preferences.besions_specifiques',
                'preferences.garde_enfants',
                'preferences.aide_menagere',
                'preferences.frequence_des_services',
                'preferences.horaire_souhaites',
                'preferences.adress',
                'preferences.zone_geographique_prestataire',
                'preferences.competance_specifique',
                'preferences.langue_parler',
                'preferences.disponibility_du_prestataire',
                'preferences.mode_de_paiement',
            ],
        });
        if (!parent) {
            throw new common_1.NotFoundException(`Parent with id ${id} not found`);
        }
        const ParentGet = await this.nounuService.ReturnN([parent], [
            'besions_specifiques',
            'garde_enfants',
            'aide_menagere',
            'frequence_des_services',
            'horaire_souhaites',
            'adress',
            'zone_geographique_prestataire',
            'competance_specifique',
            'langue_parler',
            'disponibility_du_prestataire',
            'mode_de_paiement',
        ]);
        return ParentGet[0];
    }
    async create(createParentDto, files) {
        const { userId, ...parentData } = createParentDto;
        const savedParent = await this.parentsRepository.save({
            ...parentData,
            user: { id: userId },
        });
        if (!savedParent) {
            throw new common_1.BadRequestException('Parent not created');
        }
        if (files.imageParent?.length > 0) {
            const imageParent = files.imageParent[0];
            await this.mediaService.create({
                originalName: imageParent.originalname,
                filename: imageParent.filename,
                path: imageParent.path,
                originalUrl: `${database_providers_1.HOST}/uploads/${imageParent.filename}`,
                userId: userId,
                typeMedia: 'image-profil',
            });
        }
        const preferenceKeys = [
            'besions_specifiques',
            'garde_enfants',
            'aide_menagere',
            'frequence_des_services',
            'horaire_souhaites',
            'adress',
            'zone_geographique_prestataire',
            'competance_specifique',
            'langue_parler',
            'disponibility_du_prestataire',
            'mode_de_paiement',
        ];
        for (const key of preferenceKeys) {
            const value = JSON.parse(createParentDto[key]);
            if (Array.isArray(value)) {
                const preferenceEntities = value.map((el) => ({
                    parents: savedParent,
                    [key]: el.id,
                }));
                await this.preferenceRepository.save(preferenceEntities);
            }
        }
        return savedParent;
    }
    async update(id, updateParentDto, files) {
        try {
            const { userId, ...parentData } = updateParentDto;
            const existingParent = await this.parentsRepository.findOne({
                where: { id },
                relations: ['user'],
            });
            if (!existingParent) {
                throw new common_1.NotFoundException('Parent not found');
            }
            const updatedParent = await this.parentsRepository.save({
                ...existingParent,
                ...parentData,
                user: { id: userId },
            });
            if (!updatedParent) {
                throw new common_1.BadRequestException('Parent not updated');
            }
            if (files.imageParent?.length > 0) {
                const imageParent = files.imageParent[0];
                await this.mediaService.update({ id: existingParent.user.id, typeMedia: 'image-profil' }, {
                    originalName: imageParent.originalname,
                    filename: imageParent.filename,
                    path: imageParent.path,
                    originalUrl: `${database_providers_1.HOST}/uploads/${imageParent.filename}`,
                });
            }
            const preferenceKeys = [
                'besions_specifiques',
                'garde_enfants',
                'aide_menagere',
                'frequence_des_services',
                'horaire_souhaites',
                'adress',
                'zone_geographique_prestataire',
                'competance_specifique',
                'langue_parler',
                'disponibility_du_prestataire',
                'mode_de_paiement',
            ];
            for (const key of preferenceKeys) {
                const value = JSON.parse(updateParentDto[key]);
                if (Array.isArray(value)) {
                    await this.preferenceRepository.delete({
                        parents: { id },
                    });
                }
            }
            for (const key of preferenceKeys) {
                const value = JSON.parse(updateParentDto[key]);
                if (Array.isArray(value)) {
                    const preferenceEntities = value.map((el) => ({
                        parents: updatedParent,
                        [key]: el.id,
                    }));
                    await this.preferenceRepository.save(preferenceEntities);
                }
            }
            return await this.findOne(id);
        }
        catch (error) {
            console.log(error);
        }
    }
    async remove(id) {
        const result = await this.parentsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Parent with id ${id} not found`);
        }
    }
    async search(searchCriteria, page = 1, limit = 10) {
        const { besions_specifiques, garde_enfants, aide_menagere, frequence_des_services, horaire_souhaites, zone_geographique_prestataire, disponibility_du_prestataire, fullname, } = searchCriteria;
        const pageNum = parseInt(page.toString(), 10) || 1;
        const limitNum = parseInt(limit.toString(), 10) || 10;
        const _parents = await this.parentsRepository.find({
            relations: [
                'user',
                'user.medias',
                'user.medias.type_media',
                'preferences',
                'preferences.garde_enfants',
                'preferences.horaire_souhaites',
                'preferences.adress',
            ],
        });
        const parents = await this.nounuService.ReturnN(_parents, [
            'frequence_des_services',
            'horaire_souhaites',
            'adress',
        ]);
        const filteredParents = parents.filter((parent) => {
            if (fullname) {
                const hasMatchingFullname = parent.fullname
                    .toLowerCase()
                    .includes(fullname.toLowerCase());
                if (!hasMatchingFullname)
                    return false;
            }
            if (besions_specifiques && besions_specifiques.length > 0) {
                const hasMatchingBesoin = parent.preferences.besions_specifiques.some((besoin) => besions_specifiques.includes(besoin.id));
                if (!hasMatchingBesoin)
                    return false;
            }
            if (garde_enfants && garde_enfants.length > 0) {
                const hasMatchingGarde = parent.preferences.garde_enfants.some((garde) => garde_enfants.includes(garde.id));
                if (!hasMatchingGarde)
                    return false;
            }
            if (aide_menagere && aide_menagere.length > 0) {
                const hasMatchingAide = parent.preferences.aide_menagere.some((aide) => aide_menagere.includes(aide.id));
                if (!hasMatchingAide)
                    return false;
            }
            if (frequence_des_services && frequence_des_services.length > 0) {
                const hasMatchingFrequence = parent.preferences.frequence_des_services.some((frequence) => frequence_des_services.includes(frequence.id));
                if (!hasMatchingFrequence)
                    return false;
            }
            if (horaire_souhaites && horaire_souhaites.length > 0) {
                const hasMatchingHoraire = parent.preferences.horaire_souhaites.some((horaire) => horaire_souhaites.includes(horaire.id));
                if (!hasMatchingHoraire)
                    return false;
            }
            if (zone_geographique_prestataire &&
                zone_geographique_prestataire.length > 0) {
                const hasMatchingZone = parent.preferences.zone_geographique_prestataire.some((zone) => zone_geographique_prestataire.includes(zone.id));
                if (!hasMatchingZone)
                    return false;
            }
            if (disponibility_du_prestataire &&
                disponibility_du_prestataire.length > 0) {
                const hasMatchingDisponibility = parent.preferences.disponibility_du_prestataire.some((disponibility) => disponibility_du_prestataire.includes(disponibility.id));
                if (!hasMatchingDisponibility)
                    return false;
            }
            return true;
        });
        const total = filteredParents.length;
        const startIndex = (pageNum - 1) * limitNum;
        const endIndex = pageNum * limitNum;
        const paginatedData = filteredParents.slice(startIndex, endIndex);
        return {
            data: paginatedData,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum),
                hasNextPage: pageNum < Math.ceil(total / limitNum),
                hasPrevPage: pageNum > 1,
            },
        };
    }
};
exports.ParentsService = ParentsService;
exports.ParentsService = ParentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PARENT_REPOSITORY')),
    __param(1, (0, common_1.Inject)('PREFERENCE_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        media_service_1.MediaService,
        nounus_service_1.NounusService])
], ParentsService);
