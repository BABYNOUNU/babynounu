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
    constructor(jobRepository) {
        this.jobRepository = jobRepository;
    }
    async createJob(createJobDto) {
        const job = this.jobRepository.create(createJobDto);
        return this.jobRepository.save(job);
    }
    async findAllJobs() {
        return this.jobRepository.find();
    }
    async findJobById(id) {
        const job = await this.jobRepository.findOne({ where: { id } });
        if (!job) {
            throw new common_1.NotFoundException(`Job with ID ${id} not found`);
        }
        return job;
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
    __metadata("design:paramtypes", [typeorm_1.Repository])
], JobsService);
