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
let JobsService = class JobsService {
    jobRepository;
    settingDesiredTimesRepository;
    settingServiceFrequencyRepository;
    constructor(jobRepository, settingDesiredTimesRepository, settingServiceFrequencyRepository) {
        this.jobRepository = jobRepository;
        this.settingDesiredTimesRepository = settingDesiredTimesRepository;
        this.settingServiceFrequencyRepository = settingServiceFrequencyRepository;
    }
    async createJob(createJobDto) {
        const job = this.jobRepository.create({
            title: createJobDto.title,
            description: createJobDto.description,
            budget_min: createJobDto.budget_min,
            budget_max: createJobDto.budget_max,
            schedules_available: createJobDto.schedules_available,
            service_frequency: createJobDto.service_frequency,
            user: { id: createJobDto.user },
        });
        const saveJob = await this.jobRepository.save(job);
        if (!saveJob) {
            throw new common_1.BadRequestException({ message: 'Parent not created' });
        }
        const GetJob = await this.jobRepository.findOne({
            where: { id: saveJob.id },
            relations: ['user', 'user.parent'],
        });
        return GetJob;
    }
    async findAllJobs() {
        return this.jobRepository.find({
            relations: [
                'user',
                'user.parent',
                'user.parent.settingLanguages.language',
                'user.parent.settingAgeOfChildrens.AgeOfChildrens',
                'user.parent.settingDesiredTimes.time',
                'user.parent.settingAreaWorks.area',
                'user.parent.settingSpecificSkills.skill',
                'user.parent.settingSpecificNeeds.SpecificNeeds',
                'user.parent.settingGuardSchedules.GuardSchedules',
                'user.parent.settingHousekeepers.Housekeepers'
            ],
        });
    }
    async findJobById(id) {
        const job = await this.jobRepository.findOne({ where: { id }, relations: [
                'user',
                'user.parent',
                'user.parent.settingLanguages.language',
                'user.parent.settingAgeOfChildrens.AgeOfChildrens',
                'user.parent.settingDesiredTimes.time',
                'user.parent.settingAreaWorks.area',
                'user.parent.settingSpecificSkills.skill',
                'user.parent.settingSpecificNeeds.SpecificNeeds',
                'user.parent.settingGuardSchedules.GuardSchedules',
                'user.parent.settingHousekeepers.Housekeepers',
                'job_application'
            ] });
        if (!job) {
            throw new common_1.NotFoundException(`Job with ID ${id} not found`);
        }
        return job;
    }
    async findAllJobByUser(userId) {
        const jobUser = await this.jobRepository.find({ where: { user: { id: userId } }, relations: [
                'user',
                'user.parent',
                'user.parent.settingLanguages.language',
                'user.parent.settingAgeOfChildrens.AgeOfChildrens',
                'user.parent.settingDesiredTimes.time',
                'user.parent.settingAreaWorks.area',
                'user.parent.settingSpecificSkills.skill',
                'user.parent.settingSpecificNeeds.SpecificNeeds',
                'user.parent.settingGuardSchedules.GuardSchedules',
                'user.parent.settingHousekeepers.Housekeepers'
            ] });
        if (!jobUser) {
            throw new common_1.NotFoundException(`Job with ID ${jobUser} not found`);
        }
        return jobUser;
    }
    async updateJob(id, updateJobDto) {
        const job = await this.findJobById(id);
        Object.assign(job, updateJobDto);
        return this.jobRepository.save(job);
    }
    async deleteJob(id) {
        const job = await this.findJobById(id);
        return this.jobRepository.remove(job);
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('JOB_REPOSITORY')),
    __param(1, (0, common_1.Inject)('SETTING_DESIRED_TIME_REPOSITORY')),
    __param(2, (0, common_1.Inject)('SETTING_SERVICE_FREQUENCY_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], JobsService);
