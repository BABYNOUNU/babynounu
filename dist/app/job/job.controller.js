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
exports.JobsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const job_service_1 = require("./job.service");
const create_job_dto_1 = require("./dtos/create-job.dto");
const update_job_dto_1 = require("./dtos/update-job.dto");
const media_config_1 = require("../../config/media.config");
const platform_express_1 = require("@nestjs/platform-express");
let JobsController = class JobsController {
    jobsService;
    constructor(jobsService) {
        this.jobsService = jobsService;
    }
    async createJob(createJobDto, files) {
        return this.jobsService.createJob(createJobDto, files);
    }
    async findAllJobs() {
        return this.jobsService.findAllJobs();
    }
    async findJobById(id) {
        return this.jobsService.findJobById(id);
    }
    async findAllJobByUser(userId) {
        return this.jobsService.findAllJobByUser(userId);
    }
    async updateJob(id, updateJobDto, files) {
        return this.jobsService.updateJob(id.toString(), updateJobDto, files);
    }
    async deleteJob(id) {
        return this.jobsService.deleteJob(id);
    }
    async getJobApplyByUserId(userId) {
        return this.jobsService.getJobApplyByUserId(userId);
    }
};
exports.JobsController = JobsController;
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'Images_videos', maxCount: 10 },
    ], {
        storage: media_config_1.storageMedia
    })),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new job posting' }),
    (0, swagger_1.ApiBody)({ type: create_job_dto_1.CreateJobDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Job created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_dto_1.CreateJobDto, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "createJob", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all job postings' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Jobs retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "findAllJobs", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a job posting by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Job retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Job not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "findJobById", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a job posting by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Job retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Job not found' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "findAllJobByUser", null);
__decorate([
    (0, common_1.Post)('update/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'Images_videos', maxCount: 10 },
    ], {
        storage: media_config_1.storageMedia
    })),
    (0, swagger_1.ApiOperation)({ summary: 'Update a job posting' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiBody)({ type: update_job_dto_1.UpdateJobDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Job updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Job not found' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_job_dto_1.UpdateJobDto, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "updateJob", null);
__decorate([
    (0, common_1.Post)('delete/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a job posting' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Job deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Job not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "deleteJob", null);
__decorate([
    (0, common_1.Get)('job-applications/user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get job applications by user ID' }),
    (0, swagger_1.ApiParam)({ name: 'userId', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Job applications retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found or no job applications' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "getJobApplyByUserId", null);
exports.JobsController = JobsController = __decorate([
    (0, swagger_1.ApiTags)('jobs'),
    (0, common_1.Controller)('jobs'),
    __metadata("design:paramtypes", [job_service_1.JobsService])
], JobsController);
