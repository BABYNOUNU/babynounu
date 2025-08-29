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
const notification_service_1 = require("./../notification/notification.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const nounu_model_1 = require("./models/nounu.model");
const media_service_1 = require("../media/media.service");
const database_providers_1 = require("../../database/database.providers");
const preference_model_1 = require("../Preference/models/preference.model");
let NounusService = class NounusService {
    nounuRepository;
    preferenceRepository;
    notificationService;
    mediaService;
    constructor(nounuRepository, preferenceRepository, notificationService, mediaService) {
        this.nounuRepository = nounuRepository;
        this.preferenceRepository = preferenceRepository;
        this.notificationService = notificationService;
        this.mediaService = mediaService;
    }
    async create(createNounuDto, files) {
        const { userId, ...nounuData } = createNounuDto;
        const parsedPreferences = {};
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
            parsedPreferences[key] = JSON.parse(createNounuDto[key]);
        }
        const queryRunner = this.nounuRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const savedNounu = await queryRunner.manager.save(nounu_model_1.ProfilNounus, {
                ...nounuData,
                urgences: nounuData.urgences === 'true' ? true : false,
                flexibilite_tarifaire: nounuData.flexibilite_tarifaire === 'true' ? true : false,
                user: { id: userId },
            });
            const mediaToCreate = [];
            if (files.imageNounu?.length > 0) {
                const imageNounu = files.imageNounu[0];
                mediaToCreate.push({
                    originalName: imageNounu.originalname,
                    filename: imageNounu.filename,
                    path: imageNounu.path,
                    originalUrl: `${database_providers_1.HOST}/uploads/${imageNounu.filename}`,
                    userId: userId,
                    typeMedia: 'image-profil',
                });
                if (files.documents?.length > 0) {
                    for (const document of files.documents) {
                        mediaToCreate.push({
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
                        mediaToCreate.push({
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
            if (mediaToCreate.length > 0) {
                await Promise.all(mediaToCreate.map(media => this.mediaService.create(media)));
            }
            const preferencesToSave = [];
            for (const key of preferenceKeys) {
                const value = parsedPreferences[key];
                if (Array.isArray(value)) {
                    value.forEach(el => {
                        preferencesToSave.push({
                            nounus: savedNounu,
                            [key]: el.id,
                        });
                    });
                }
            }
            if (preferencesToSave.length > 0) {
                await queryRunner.manager.save(preference_model_1.Preference, preferencesToSave);
            }
            await queryRunner.commitTransaction();
            return savedNounu;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.BadRequestException('Erreur lors de la création du profil: ' + error.message);
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAllNotCurrentUser(userId, page = 1, limit = 10) {
        page = parseInt(page.toString(), 10) || 1;
        limit = parseInt(limit.toString(), 10) || 10;
        const skip = (page - 1) * limit;
        const [nounus, total] = await this.nounuRepository.findAndCount({
            relations: [
                'user',
                'user.medias',
                'user.medias.type_media',
                'preferences',
                'preferences.horaire_disponible',
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
        const formattedNounus = await this.ReturnN(nounus, [
            'horaire_disponible',
            'adress'
        ]);
        return {
            data: formattedNounus,
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
    async findAll() {
        const nounus = await this.nounuRepository.find({
            relations: [
                'user',
                'user.medias',
                'user.medias.type_media',
                'preferences',
                'preferences.horaire_disponible',
                'preferences.adress',
            ],
        });
        return await this.ReturnN(nounus, [
            'horaire_disponible',
            'adress',
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
        const queryRunner = this.nounuRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const existingNounu = await queryRunner.manager.findOne(nounu_model_1.ProfilNounus, {
                where: { id: id },
                relations: ['user'],
            });
            if (!existingNounu) {
                throw new common_1.NotFoundException('Nounu not found');
            }
            const updatedNounu = await queryRunner.manager.save(nounu_model_1.ProfilNounus, {
                ...existingNounu,
                ...nounuData,
                urgences: nounuData.urgences === 'true' ? true : false,
                flexibilite_tarifaire: nounuData.flexibilite_tarifaire === 'true' ? true : false,
                user: { id: userId },
            });
            const mediaPromises = [];
            if (files.imageNounu?.length > 0) {
                const imageNounu = files.imageNounu[0];
                mediaPromises.push(this.mediaService.update({ id: existingNounu.user.id, typeMedia: 'image-profil' }, {
                    originalName: imageNounu.originalname,
                    filename: imageNounu.filename,
                    path: imageNounu.path,
                    originalUrl: `${database_providers_1.HOST}/uploads/${imageNounu.filename}`,
                }));
            }
            if (files.documents?.length > 0) {
                const documentsToCreate = files.documents.map(document => ({
                    originalName: document.originalname,
                    filename: document.filename,
                    path: document.path,
                    originalUrl: `${database_providers_1.HOST}/uploads/${document.filename}`,
                    userId: userId,
                    typeMedia: 'document-verification',
                }));
                mediaPromises.push(Promise.all(documentsToCreate.map(doc => this.mediaService.create(doc))));
            }
            if (files.gallery?.length > 0) {
                const galleryToCreate = files.gallery.map(gallery => ({
                    originalName: gallery.originalname,
                    filename: gallery.filename,
                    path: gallery.path,
                    originalUrl: `${database_providers_1.HOST}/uploads/${gallery.filename}`,
                    userId: userId,
                    typeMedia: 'gallery-image',
                }));
                mediaPromises.push(Promise.all(galleryToCreate.map(img => this.mediaService.create(img))));
            }
            if (mediaPromises.length > 0) {
                await Promise.all(mediaPromises);
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
            const parsedPreferences = {};
            let hasPreferences = false;
            for (const key of preferenceKeys) {
                if (updateNounuDto[key]) {
                    parsedPreferences[key] = JSON.parse(updateNounuDto[key]);
                    if (Array.isArray(parsedPreferences[key]) && parsedPreferences[key].length > 0) {
                        hasPreferences = true;
                    }
                }
            }
            if (hasPreferences) {
                await queryRunner.manager.delete(preference_model_1.Preference, { nounus: { id: updatedNounu.id } });
                const allPreferences = [];
                for (const key of preferenceKeys) {
                    if (parsedPreferences[key] && Array.isArray(parsedPreferences[key])) {
                        const prefsForKey = parsedPreferences[key].map(el => ({
                            nounus: updatedNounu,
                            [key]: el.id,
                        }));
                        allPreferences.push(...prefsForKey);
                    }
                }
                if (allPreferences.length > 0) {
                    await queryRunner.manager.save(preference_model_1.Preference, allPreferences);
                }
            }
            await queryRunner.commitTransaction();
            return updatedNounu;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.BadRequestException('Erreur lors de la mise à jour du profil: ' + error.message);
        }
        finally {
            await queryRunner.release();
        }
    }
    async updatePoints(id, points) {
        const nounu = await this.findOne(id);
        if (!nounu) {
            throw new common_1.NotFoundException(`ProfilNounus with ID ${id} not found`);
        }
        this.nounuRepository.increment({ id }, 'points', points);
        return nounu;
    }
    async decrementPoints(id, points) {
        const nounu = await this.findOne(id);
        if (!nounu) {
            throw new common_1.NotFoundException(`ProfilNounus with ID ${id} not found`);
        }
        if (nounu.points < points) {
            throw new common_1.BadRequestException('Not enough points to decrement');
        }
        await this.nounuRepository.decrement({ id }, 'points', points);
        return await this.findOne(id);
    }
    async remove(id) {
        const nounu = await this.findOne(id);
        await this.nounuRepository.remove(nounu);
    }
    async search(searchCriteria, page = 1, limit = 1) {
        page = parseInt(page.toString(), 10) || 1;
        limit = parseInt(limit.toString(), 10) || 1;
        const { fullname, description, zone_de_travail, horaire_disponible, adress, tranche_age_enfants, competance_specifique, langue_parler, } = searchCriteria;
        let queryBuilder = this.nounuRepository.createQueryBuilder('nounu')
            .leftJoinAndSelect('nounu.user', 'user')
            .leftJoinAndSelect('user.medias', 'medias')
            .leftJoinAndSelect('medias.type_media', 'type_media')
            .leftJoinAndSelect('nounu.preferences', 'preferences')
            .leftJoinAndSelect('preferences.zone_de_travail', 'zone_de_travail')
            .leftJoinAndSelect('preferences.horaire_disponible', 'horaire_disponible')
            .leftJoinAndSelect('preferences.adress', 'adress')
            .leftJoinAndSelect('preferences.tranche_age_enfants', 'tranche_age_enfants')
            .leftJoinAndSelect('preferences.competance_specifique', 'competance_specifique')
            .leftJoinAndSelect('preferences.langue_parler', 'langue_parler')
            .leftJoinAndSelect('preferences.certifications_criteres', 'certifications_criteres');
        if (fullname) {
            queryBuilder = queryBuilder.andWhere('LOWER(nounu.fullname) LIKE LOWER(:fullname)', {
                fullname: `%${fullname}%`
            });
        }
        if (description) {
            queryBuilder = queryBuilder.andWhere('LOWER(nounu.description) LIKE LOWER(:description)', {
                description: `%${description}%`
            });
        }
        const total = await queryBuilder.getCount();
        queryBuilder = queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('nounu.createdAt', 'DESC');
        const _nounus = await queryBuilder.getMany();
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
        return {
            data: filteredNounus,
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
    async getNonCertifiedNounus() {
        const _nounus = await this.nounuRepository.find({
            where: { certif: 'Pending' },
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
            relations: ['user'],
        });
        if (!nounu) {
            throw new common_1.NotFoundException(`Nounu with id ${nounuId} not found`);
        }
        nounu.certif = 'Approved';
        await this.nounuRepository.save(nounu);
        this.notificationService.createNotification({
            type: 'PROFIL_DETAIL',
            userId: nounu.user.id,
            message: `Félicitations! Votre profil a été approuvé avec succès. Vous pouvez maintenant commencer à recevoir des demandes de garde d'enfants.`,
            is_read: false,
            senderUserId: nounu.user.id,
            tolinkId: nounuId.toString(),
        });
        return {
            certif: nounu.certif,
        };
    }
    async rejectCertification(nounuId) {
        const nounu = await this.nounuRepository.findOne({
            where: { id: nounuId },
            relations: ['user'],
        });
        if (!nounu) {
            throw new common_1.NotFoundException(`Nounu with id ${nounuId} not found`);
        }
        nounu.certif = 'Rejected';
        await this.nounuRepository.save(nounu);
        this.notificationService.createNotification({
            type: 'PROFIL_DETAIL',
            userId: nounu.user.id,
            message: `Désolé, votre profil a été rejeté. Veuillez vérifier vos documents et les informations fournies avant de soumettre à nouveau votre profil.`,
            is_read: false,
            senderUserId: nounu.user.id,
            tolinkId: nounuId.toString(),
        });
        return {
            certif: nounu.certif,
        };
    }
    async pendingCertification(nounuId) {
        const nounu = await this.nounuRepository.findOne({
            where: { id: nounuId },
            relations: ['user'],
        });
        if (!nounu) {
            throw new common_1.NotFoundException(`Nounu with id ${nounuId} not found`);
        }
        nounu.certif = 'Pending';
        await this.nounuRepository.save(nounu);
        this.notificationService.createNotification({
            type: 'PROFIL_DETAIL',
            userId: nounu.user.id,
            message: `Documents Modifier : Votre profil est en cours d'examen. Nous vous notifierons une fois la vérification terminée.`,
            is_read: false,
            senderUserId: nounu.user.id,
            tolinkId: nounuId,
        });
        return {
            certif: nounu.certif,
        };
    }
    async updateStatus(nounuId, status) {
        const nounu = await this.nounuRepository.findOne({
            where: { id: nounuId },
        });
        if (!nounu) {
            throw new common_1.NotFoundException(`Nounu with id ${nounuId} not found`);
        }
        if (nounu.points == 0) {
            throw new common_1.BadRequestException('Cannot change status when points are 0');
        }
        this.decrementPoints(nounuId, 50);
        nounu.status = status;
        await this.nounuRepository.save(nounu);
        return {
            status: nounu.status,
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
        notification_service_1.NotificationService,
        media_service_1.MediaService])
], NounusService);
