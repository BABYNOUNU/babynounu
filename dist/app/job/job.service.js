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
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const media_service_1 = require("../media/media.service");
const database_providers_1 = require("../../database/database.providers");
let JobsService = class JobsService {
    jobRepository;
    preferenceRepository;
    mediaService;
    constructor(jobRepository, preferenceRepository, mediaService) {
        this.jobRepository = jobRepository;
        this.preferenceRepository = preferenceRepository;
        this.mediaService = mediaService;
    }
    RelationShip = [
        'user',
        'user.parent',
        'medias',
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
        'preferences.equipement_menager',
        'preferences.criteres_specifiques',
        'preferences.criteres_selections',
        'preferences.certifications_criteres',
        'preferences.zone_de_travail',
        'preferences.type_services',
        'preferences.taches',
        'jobApplications',
    ];
    preferenceKeys = [
        'adress',
        'zone_de_travail',
        'type_services',
        'frequence_des_services',
        'horaire_souhaites',
        'garde_enfants',
        'competance_specifique',
        'besions_specifiques',
        'langue_parler',
        'aide_menagere',
        'equipement_menager',
        'certifications_criteres',
        'criteres_selections',
        'taches',
    ];
    async createJob(createJobDto, files) {
        const { user_id, ...jobData } = createJobDto;
        const saveJob = await this.jobRepository.save({
            titre: jobData.titre,
            description: jobData.description,
            moyens_de_contact: jobData.moyens_de_contact,
            inclusWeekend: jobData.inclus_weekend == 'true' ? true : false,
            nombreEnfants: jobData.nombre_enfants,
            experience_minimun: jobData.experience_minimun == 'true' ? true : false,
            annee_experience: jobData.annee_experience,
            tarifPropose: jobData.tarif,
            negociable: jobData.negociable == 'true' ? true : false,
            dateDebut: jobData.date_debut,
            missionUrgente: jobData.mission_urgente == 'true' ? true : false,
            descriptionComplementaire: jobData.description_complementaire,
            user: { id: user_id },
        });
        if (!saveJob) {
            throw new common_1.BadRequestException('Job not created');
        }
        if (files.Images_videos?.length > 0) {
            const Images_videos = files.Images_videos;
            Images_videos.forEach(async (file) => {
                await this.mediaService.create({
                    originalName: file.originalname,
                    filename: file.filename,
                    path: file.path,
                    originalUrl: `${database_providers_1.HOST}/uploads/${file.filename}`,
                    JobId: saveJob.id.toString(),
                    typeMedia: 'image-video-presentation',
                });
            });
        }
        const preferenceKeys = this.preferenceKeys;
        for (const key of preferenceKeys) {
            const value = JSON.parse(createJobDto[key]);
            if (value != undefined && Array.isArray(value)) {
                const preferenceEntities = value.map((el) => ({
                    jobs: saveJob,
                    [key]: el.id,
                }));
                await this.preferenceRepository.save(preferenceEntities);
            }
        }
        const job = await this.findJobById(saveJob.id);
        if (!job) {
            throw new common_1.NotFoundException(`Job with ID ${saveJob.id} not found`);
        }
        return job;
    }
    async findAllJobs() {
        const job = await this.jobRepository.find({
            relations: this.RelationShip,
        });
        const DataJobs = await this.ReturnN(job, this.preferenceKeys);
        return DataJobs;
    }
    async findJobById(id) {
        const job = await this.jobRepository.findOne({
            where: { id },
            relations: this.RelationShip,
        });
        if (!job) {
            throw new common_1.NotFoundException(`Job with ID ${id} not found`);
        }
        const DataJob = await this.ReturnN([job], this.preferenceKeys);
        return DataJob[0];
    }
    async findAllJobByUser(userId) {
        const jobUser = await this.jobRepository.find({
            where: { user: { id: userId } },
            relations: this.RelationShip,
        });
        if (!jobUser) {
            throw new common_1.NotFoundException(`Job with ID ${jobUser} not found`);
        }
        console.log(jobUser);
        const DataJob = await this.ReturnN(jobUser, this.preferenceKeys);
        return DataJob;
    }
    async updateJob(id, updateJobDto, files) {
        const { user_id, ...jobData } = updateJobDto;
        const existingJob = await this.jobRepository.findOne({
            where: { id: +id },
            relations: ['user'],
        });
        if (!existingJob) {
            throw new common_1.NotFoundException('Job not found');
        }
        const updatedJob = await this.jobRepository.save({
            ...existingJob,
            titre: jobData.titre || existingJob.titre,
            description: jobData.description || existingJob.description,
            moyens_de_contact: jobData.moyens_de_contact || existingJob.moyens_de_contact,
            inclusWeekend: jobData.inclus_weekend === 'true' ? true : false,
            nombreEnfants: jobData.nombre_enfants || existingJob.nombreEnfants,
            experience_minimun: jobData.experience_minimun === 'true' ? true : false,
            annee_experience: jobData.annee_experience || existingJob.annee_experience,
            tarifPropose: jobData.tarif || existingJob.tarifPropose,
            negociable: jobData.negociable === 'true' ? true : false,
            dateDebut: jobData.date_debut || existingJob.dateDebut,
            missionUrgente: jobData.mission_urgente === 'true' ? true : false,
            descriptionComplementaire: jobData.description_complementaire ||
                existingJob.descriptionComplementaire,
            user: { id: user_id || existingJob.user.id },
        });
        if (!updatedJob) {
            throw new common_1.BadRequestException('Job not updated');
        }
        if (files.Images_videos?.length > 0) {
            const Images_videos = files.Images_videos;
            Images_videos.forEach(async (file) => {
                await this.mediaService.create({
                    originalName: file.originalname,
                    filename: file.filename,
                    path: file.path,
                    originalUrl: `${database_providers_1.HOST}/uploads/${file.filename}`,
                    JobId: updatedJob.id.toString(),
                    typeMedia: 'image-video-presentation',
                });
            });
        }
        const preferenceKeys = this.preferenceKeys;
        for (const key of preferenceKeys) {
            const value = JSON.parse(updateJobDto[key]);
            if (value != undefined && Array.isArray(value)) {
                await this.preferenceRepository.delete({ jobs: updatedJob });
            }
        }
        for (const key of preferenceKeys) {
            const value = JSON.parse(updateJobDto[key]);
            if (value != undefined && Array.isArray(value)) {
                const preferenceEntities = value.map((el) => ({
                    jobs: updatedJob,
                    [key]: el.id,
                }));
                await this.preferenceRepository.save(preferenceEntities);
            }
        }
        const job = await this.findJobById(updatedJob.id);
        if (!job) {
            throw new common_1.NotFoundException(`Job with ID ${updatedJob.id} not found`);
        }
        return job;
    }
    async deleteJob(id) {
        const job = await this.findJobById(id);
        console.log(job);
        return this.jobRepository.softDelete({ id: job.id });
    }
    async getJobApplyByUserId(userId) {
        const jobUser = await this.jobRepository.find({
            where: { jobApplications: { user: { id: userId } } },
            relations: this.RelationShip,
        });
        if (!jobUser) {
            throw new common_1.NotFoundException(`Job with ID ${jobUser} not found`);
        }
        console.log(jobUser);
        const DataJob = await this.ReturnN(jobUser, this.preferenceKeys);
        return DataJob;
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
                preferences: aggregatedPreferences,
            };
        });
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('JOB_REPOSITORY')),
    __param(1, (0, common_1.Inject)('PREFERENCE_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        media_service_1.MediaService])
], JobsService);
