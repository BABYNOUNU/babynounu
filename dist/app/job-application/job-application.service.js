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
exports.JobApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const notification_service_1 = require("../notification/notification.service");
let JobApplicationsService = class JobApplicationsService {
    jobApplicationRepository;
    userRepository;
    jobRepository;
    notificationService;
    constructor(jobApplicationRepository, userRepository, jobRepository, notificationService) {
        this.jobApplicationRepository = jobApplicationRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.notificationService = notificationService;
    }
    RelationShip = [
        'user', 'user.nounu', 'user.medias', 'user.medias.type_media',
        'medias',
        'jobs',
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
        'jobApplications',
    ];
    async findAll() {
        return this.jobApplicationRepository.find({ relations: ['user', 'job'] });
    }
    async findOne(id) {
        const jobApplication = await this.jobApplicationRepository.findOne({
            where: { id },
            relations: ['user', 'job'],
        });
        if (!jobApplication) {
            throw new common_1.NotFoundException(`JobApplication with ID ${id} not found`);
        }
        return jobApplication;
    }
    async create(createJobApplicationDto, userId) {
        const { userId: applicantUserId, jobId } = createJobApplicationDto;
        const existingApplication = await this.jobApplicationRepository.findOne({
            where: {
                user: { id: applicantUserId.toString() },
                jobs: { id: jobId },
            },
            select: ['id', 'is_apply'],
        });
        if (existingApplication) {
            const newApplyStatus = !existingApplication.is_apply;
            await this.jobApplicationRepository.update({ id: existingApplication.id }, { is_apply: newApplyStatus });
            existingApplication.is_apply = newApplyStatus;
            return existingApplication;
        }
        const newJobApplication = this.jobApplicationRepository.create({
            is_apply: true,
            user: { id: applicantUserId.toString() },
            jobs: { id: jobId },
        });
        const savedJobApplication = await this.jobApplicationRepository.save(newJobApplication);
        if (!savedJobApplication) {
            throw new common_1.NotFoundException(`Job with ID ${jobId} not found or could not be applied to.`);
        }
        await this.sendJobApplicationNotification(applicantUserId.toString(), jobId.toString(), userId);
        return savedJobApplication;
    }
    async sendJobApplicationNotification(applicantUserId, jobId, senderUserId) {
        await this.notificationService.createNotification({
            type: 'JOBS',
            userId: applicantUserId,
            message: `You have applied to job ${jobId}`,
            is_read: false,
            senderUserId: senderUserId,
        });
    }
    async update(id, updateJobApplicationDto) {
        const jobApplication = await this.jobApplicationRepository.preload({
            id,
            ...updateJobApplicationDto,
        });
        if (!jobApplication) {
            throw new common_1.NotFoundException(`JobApplication with ID ${id} not found`);
        }
        if (updateJobApplicationDto.userId) {
            const user = await this.userRepository.findOne({
                where: { id: updateJobApplicationDto.userId.toString() },
            });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${updateJobApplicationDto.userId} not found`);
            }
            jobApplication.user = user;
        }
        if (updateJobApplicationDto.jobId) {
            const job = await this.jobRepository.findOne({
                where: { id: updateJobApplicationDto.jobId },
            });
            if (!job) {
                throw new common_1.NotFoundException(`Job with ID ${updateJobApplicationDto.jobId} not found`);
            }
        }
        return this.jobApplicationRepository.save(jobApplication);
    }
    async remove(id) {
        const result = await this.jobApplicationRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`JobApplication with ID ${id} not found`);
        }
    }
    async getJobApplyByUser(userId) {
        try {
            const jobApplicationUser = await this.jobApplicationRepository.find({
                where: { jobs: { user: { id: userId } } },
                relations: ['jobs', 'user', 'user.nounu', 'user.medias', 'user.medias.type_media'],
            });
            if (!jobApplicationUser) {
                throw new common_1.NotFoundException(`JobApplication with ID ${jobApplicationUser} not found`);
            }
            const _jobApplicationUser = jobApplicationUser.map((data) => {
                return {
                    ...data,
                    image: data.user.medias?.find((media) => media.type_media.slug === 'image-profil'),
                };
            });
            return _jobApplicationUser;
        }
        catch (error) {
            console.log(error);
        }
    }
    async GetJobApplyByUserId(userId) {
        const jobApplicationUser = await this.jobApplicationRepository.find({
            where: { user: { id: userId } },
            relations: this.RelationShip,
        });
        if (!jobApplicationUser) {
            throw new common_1.NotFoundException(`JobApplication with ID ${jobApplicationUser} not found`);
        }
        const _jobApplicationUser = jobApplicationUser.map((data) => {
            return {
                ...data,
                image: data.user.medias?.find((media) => media.type_media.slug === 'image-profil'),
            };
        });
        return _jobApplicationUser.map((data) => {
            return {
                ...data,
                job: {
                    ...data.jobs,
                    image: data.jobs.user.medias?.find((media) => media.type_media.slug === 'image-profil'),
                }
            };
        });
    }
};
exports.JobApplicationsService = JobApplicationsService;
exports.JobApplicationsService = JobApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('JOB_APPLICATION_REPOSITORY')),
    __param(1, (0, common_1.Inject)('USER_REPOSITORY')),
    __param(2, (0, common_1.Inject)('JOB_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        notification_service_1.NotificationService])
], JobApplicationsService);
