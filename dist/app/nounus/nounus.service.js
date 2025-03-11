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
exports.NounusService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const media_service_1 = require("../media/media.service");
const database_providers_1 = require("../../database/database.providers");
let NounusService = class NounusService {
    nounuRepository;
    preferenceRepository;
    mediaService;
    constructor(nounuRepository, preferenceRepository, mediaService) {
        this.nounuRepository = nounuRepository;
        this.preferenceRepository = preferenceRepository;
        this.mediaService = mediaService;
    }
    async create(createNounuDto, files) {
        const { userId, ...nounuData } = createNounuDto;
        const savedNounu = await this.nounuRepository.save({
            ...nounuData,
            urgences: nounuData.urgences === 'true' ? true : false,
            flexibilite_tarifaire: nounuData.flexibilite_tarifaire === 'true' ? true : false,
            user: { id: userId },
        });
        if (!savedNounu) {
            throw new common_1.BadRequestException('Nounu not created');
        }
        console.log(files);
        if (files.imageNounu?.length > 0) {
            const imageNounu = files.imageNounu[0];
            await this.mediaService.create({
                originalName: imageNounu.originalname,
                filename: imageNounu.filename,
                path: imageNounu.path,
                originalUrl: `${database_providers_1.HOST}/uploads/${imageNounu.filename}`,
                userId: userId,
                typeMedia: 'image-profil',
            });
            if (files.documents?.length > 0) {
                for (const document of files.documents) {
                    await this.mediaService.create({
                        originalName: document.originalname,
                        filename: document.filename,
                        path: document.path,
                        originalUrl: `${database_providers_1.HOST}/uploads/${document.filename}`,
                        userId: userId,
                        typeMedia: 'document-verification',
                    });
                }
            }
            if (files.gallery?.length > 0) {
                for (const gallery of files.gallery) {
                    await this.mediaService.create({
                        originalName: gallery.originalname,
                        filename: gallery.filename,
                        path: gallery.path,
                        originalUrl: `${database_providers_1.HOST}/uploads/${gallery.filename}`,
                        userId: userId,
                        typeMedia: 'gallery-image',
                    });
                }
            }
        }
        const preferenceKeys = [
            'zone_de_travail',
            'horaire_disponible',
            'adress',
            'tranche_age_enfants',
            'competance_specifique',
            'langue_parler',
            'certifications_criteres'
        ];
        for (const key of preferenceKeys) {
            const value = JSON.parse(createNounuDto[key]);
            if (Array.isArray(value)) {
                const preferenceEntities = value.map((el) => ({
                    nounus: savedNounu,
                    [key]: el.id,
                }));
                await this.preferenceRepository.save(preferenceEntities);
            }
        }
        return savedNounu;
    }
    async findAll(userId) {
        console.log(userId);
        const nounus = await this.nounuRepository.find({
            relations: [
                'user',
                'user.medias',
                'user.medias.type_media',
                'preferences',
                'preferences.zone_de_travail',
                'preferences.horaire_disponible',
                'preferences.adress',
                'preferences.tranche_age_enfants',
                'preferences.competance_specifique',
                'preferences.langue_parler',
                'preferences.certifications_criteres',
            ],
            where: {
                user: {
                    id: (0, typeorm_1.Not)(userId.userId),
                },
            },
        });
        return await this.ReturnN(nounus, [
            'zone_de_travail',
            'horaire_disponible',
            'adress',
            'tranche_age_enfants',
            'competance_specifique',
            'langue_parler',
        ]);
    }
    async findOne(id) {
        const nounu = await this.nounuRepository.findOne({
            where: { id },
            relations: [
                'user',
                'user.medias',
                'preferences',
                'preferences.zone_de_travail',
                'preferences.horaire_disponible',
                'preferences.adress',
                'preferences.tranche_age_enfants',
                'preferences.competance_specifique',
                'preferences.certifications_criteres',
                'preferences.langue_parler',
                'user.medias.type_media',
            ],
        });
        if (!nounu) {
            throw new common_1.NotFoundException(`Nounus with ID ${id} not found`);
        }
        const nounuOne = await this.ReturnN([nounu], [
            'zone_de_travail',
            'horaire_disponible',
            'adress',
            'tranche_age_enfants',
            'competance_specifique',
            'langue_parler',
            'certifications_criteres'
        ]);
        return nounuOne[0];
    }
    async update(id, updateNounuDto, files) {
        const { userId, ...nounuData } = updateNounuDto;
        const existingNounu = await this.nounuRepository.findOne({
            where: { id: +id },
            relations: ['user'],
        });
        if (!existingNounu) {
            throw new common_1.NotFoundException('Nounu not found');
        }
        const updatedNounu = await this.nounuRepository.save({
            ...existingNounu,
            ...nounuData,
            urgences: nounuData.urgences === 'true' ? true : false,
            flexibilite_tarifaire: nounuData.flexibilite_tarifaire === 'true' ? true : false,
            user: { id: userId },
        });
        if (!updatedNounu) {
            throw new common_1.BadRequestException('Nounu not updated');
        }
        if (files.imageNounu?.length > 0) {
            const imageNounu = files.imageNounu[0];
            await this.mediaService.update({ id: existingNounu.user.id, typeMedia: 'image-profil' }, {
                originalName: imageNounu.originalname,
                filename: imageNounu.filename,
                path: imageNounu.path,
                originalUrl: `${database_providers_1.HOST}/uploads/${imageNounu.filename}`,
            });
        }
        if (files.documents?.length > 0) {
            for (const document of files.documents) {
                await this.mediaService.create({
                    originalName: document.originalname,
                    filename: document.filename,
                    path: document.path,
                    originalUrl: `${database_providers_1.HOST}/uploads/${document.filename}`,
                    userId: userId,
                    typeMedia: 'document-verification',
                });
            }
        }
        if (files.gallery?.length > 0) {
            for (const gallery of files.gallery) {
                await this.mediaService.create({
                    originalName: gallery.originalname,
                    filename: gallery.filename,
                    path: gallery.path,
                    originalUrl: `${database_providers_1.HOST}/uploads/${gallery.filename}`,
                    userId: userId,
                    typeMedia: 'gallery-image',
                });
            }
        }
        const preferenceKeys = [
            'zone_de_travail',
            'horaire_disponible',
            'adress',
            'tranche_age_enfants',
            'competance_specifique',
            'langue_parler',
            'certifications_criteres'
        ];
        for (const key of preferenceKeys) {
            const value = JSON.parse(updateNounuDto[key]);
            if (Array.isArray(value)) {
                await this.preferenceRepository.delete({ nounus: updatedNounu });
            }
        }
        for (const key of preferenceKeys) {
            const value = JSON.parse(updateNounuDto[key]);
            if (Array.isArray(value)) {
                const preferenceEntities = value.map((el) => ({
                    nounus: updatedNounu,
                    [key]: el.id,
                }));
                await this.preferenceRepository.save(preferenceEntities);
            }
        }
        return updatedNounu;
    }
    async remove(id) {
        const nounu = await this.findOne(id);
        await this.nounuRepository.remove(nounu);
    }
    async search(searchCriteria) {
        const { fullname, description, zone_de_travail, horaire_disponible, adress, tranche_age_enfants, competance_specifique, langue_parler, } = searchCriteria;
        const whereConditions = {};
        if (fullname) {
            whereConditions.fullname = (0, typeorm_1.Like)(`%${fullname}%`);
        }
        const nounus = await this.nounuRepository.find({
            where: {
                ...whereConditions,
            },
            relations: [
                'user',
                'user.medias',
                'user.medias.type_media',
                'preferences',
                'preferences.zone_de_travail',
                'preferences.horaire_disponible',
                'preferences.adress',
                'preferences.tranche_age_enfants',
                'preferences.competance_specifique',
                'preferences.langue_parler',
                'preferences.certifications_criteres',
            ],
        });
        const nounuOne = await this.ReturnN(nounus, [
            'zone_de_travail',
            'horaire_disponible',
            'adress',
            'tranche_age_enfants',
            'competance_specifique',
            'langue_parler',
            'certifications_criteres'
        ]);
        return nounuOne;
    }
    async ReturnN(datas, preferenceKey) {
        return datas.map((data) => {
            const aggregatedPreferences = {};
            preferenceKey.forEach((key) => {
                aggregatedPreferences[key] = [];
            });
            data.preferences.forEach((pref) => {
                preferenceKey.forEach((key) => {
                    if (pref[key])
                        aggregatedPreferences[key].push(pref[key]);
                });
            });
            return {
                ...data,
                image: data.user.medias.find((media) => media.type_media.slug === 'image-profil'),
                gallery: data.user.medias.filter((media) => media.type_media.slug === 'gallery-image'),
                imageDocuments: data.user.medias.filter((media) => media.type_media.slug === 'document-verification'),
                preferences: aggregatedPreferences,
            };
        });
    }
};
exports.NounusService = NounusService;
exports.NounusService = NounusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('NOUNUS_REPOSITORY')),
    __param(1, (0, common_1.Inject)('PREFERENCE_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        media_service_1.MediaService])
], NounusService);
