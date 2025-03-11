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
    async findAll() {
        return await this.parentsRepository.find({ relations: ['preferences'] });
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
                        parents: { id }
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
    async search(searchCriteria) {
        const { besions_specifiques, garde_enfants, aide_menagere, frequence_des_services, horaire_souhaites, zone_geographique_prestataire, disponibility_du_prestataire, } = searchCriteria;
        const parentQuery = this.parentsRepository
            .createQueryBuilder('parent')
            .leftJoinAndSelect('parent.preferences', 'preferences')
            .leftJoinAndSelect('parent.user', 'user');
        if (besions_specifiques) {
            parentQuery.andWhere('preferences.besions_specifiques = :besions_specifiques', { besions_specifiques });
        }
        if (garde_enfants) {
            parentQuery.andWhere('preferences.garde_enfants = :garde_enfants', {
                garde_enfants,
            });
        }
        if (aide_menagere) {
            parentQuery.andWhere('preferences.aide_menagere = :aide_menagere', {
                aide_menagere,
            });
        }
        if (frequence_des_services) {
            parentQuery.andWhere('preferences.frequence_des_services = :frequence_des_services', { frequence_des_services });
        }
        if (horaire_souhaites) {
            parentQuery.andWhere('preferences.horaire_souhaites = :horaire_souhaites', { horaire_souhaites });
        }
        if (zone_geographique_prestataire) {
            parentQuery.andWhere('preferences.zone_geographique_prestataire = :zone_geographique_prestataire', { zone_geographique_prestataire });
        }
        if (disponibility_du_prestataire) {
            parentQuery.andWhere('preferences.disponibility_du_prestataire = :disponibility_du_prestataire', { disponibility_du_prestataire });
        }
        const parents = await parentQuery.getMany();
        return parents;
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
