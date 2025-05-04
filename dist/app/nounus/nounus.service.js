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
            'certifications_criteres',
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
    async findAllNotCurrentUser(userId) {
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
    async findAll() {
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
            throw new common_1.NotFoundException(`ProfilNounus with ID ${id} not found`);
        }
        const nounuOne = await this.ReturnN([nounu], [
            'zone_de_travail',
            'horaire_disponible',
            'adress',
            'tranche_age_enfants',
            'competance_specifique',
            'langue_parler',
            'certifications_criteres',
        ]);
        return nounuOne[0];
    }
    async update(id, updateNounuDto, files) {
        const { userId, ...nounuData } = updateNounuDto;
        const existingNounu = await this.nounuRepository.findOne({
            where: { id: id },
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
            'certifications_criteres',
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
        const _nounus = await this.nounuRepository.find({
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
        const nounus = await this.ReturnN(_nounus, [
            'zone_de_travail',
            'horaire_disponible',
            'adress',
            'tranche_age_enfants',
            'competance_specifique',
            'langue_parler',
            'certifications_criteres',
        ]);
        const filteredNounus = nounus.filter((nounu) => {
            if (fullname &&
                !nounu.fullname?.toLowerCase().includes(fullname?.toLowerCase())) {
                return false;
            }
            if (description &&
                !nounu.description?.toLowerCase().includes(description?.toLowerCase())) {
                return false;
            }
            if (zone_de_travail && zone_de_travail.length > 0) {
                const hasMatchingZone = nounu.preferences.zone_de_travail.some((zone) => zone_de_travail.includes(zone.id));
                if (!hasMatchingZone)
                    return false;
            }
            if (horaire_disponible && horaire_disponible.length > 0) {
                const hasMatchingHoraire = nounu.preferences.horaire_disponible.some((horaire) => horaire_disponible.includes(horaire.id));
                if (!hasMatchingHoraire)
                    return false;
            }
            if (adress && adress.length > 0) {
                const hasMatchingAdress = nounu.preferences.adress.some((addr) => adress.includes(addr.id));
                if (!hasMatchingAdress)
                    return false;
            }
            if (tranche_age_enfants && tranche_age_enfants.length > 0) {
                const hasMatchingAge = nounu.preferences.tranche_age_enfants.some((age) => tranche_age_enfants.includes(age.id));
                if (!hasMatchingAge)
                    return false;
            }
            if (competance_specifique && competance_specifique.length > 0) {
                const hasMatchingCompetence = nounu.preferences.competance_specifique.some((competence) => competance_specifique.includes(competence.id));
                if (!hasMatchingCompetence)
                    return false;
            }
            if (langue_parler && langue_parler.length > 0) {
                const hasMatchingLangue = nounu.preferences.langue_parler.some((langue) => langue_parler.includes(langue.id));
                if (!hasMatchingLangue)
                    return false;
            }
            return true;
        });
        return filteredNounus;
    }
    async getNonCertifiedNounus() {
        const _nounus = await this.nounuRepository.find({
            where: { certif: false },
            relations: [
                'user',
                'user.medias',
                'user.medias.type_media',
                'preferences',
            ],
        });
        return _nounus.map((nounu) => {
            const images = nounu.user.medias.filter((media) => media.type_media.slug === 'image-profil');
            const documents = nounu.user.medias.filter((media) => media.type_media.slug === 'document-verification');
            return {
                ...nounu,
                images,
                documents,
            };
        });
    }
    async approveCertification(nounuId) {
        const nounu = await this.nounuRepository.findOne({
            where: { id: nounuId },
        });
        if (!nounu) {
            throw new common_1.NotFoundException(`Nounu with id ${nounuId} not found`);
        }
        nounu.certif = true;
        await this.nounuRepository.save(nounu);
        return {
            certif: nounu.certif
        };
    }
    async updateStatus(nounuId, status) {
        const nounu = await this.nounuRepository.findOne({
            where: { id: nounuId },
        });
        if (!nounu) {
            throw new common_1.NotFoundException(`Nounu with id ${nounuId} not found`);
        }
        nounu.status = status;
        await this.nounuRepository.save(nounu);
        return {
            status: nounu.status
        };
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
    async ReturnSearchN(datas, preferenceKey) {
        return datas.map((data) => {
            const aggregatedPreferences = {};
            preferenceKey.forEach((key) => {
                aggregatedPreferences[key] = data.preferences
                    .map((pref) => pref[key])
                    .filter((value) => value !== undefined && value !== null)
                    .flat();
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
