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
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const parameter_service_1 = require("../parameter/parameter.service");
let MediaService = class MediaService {
    mediaRepository;
    parameterService;
    constructor(mediaRepository, parameterService) {
        this.mediaRepository = mediaRepository;
        this.parameterService = parameterService;
    }
    async create(createMediaDto) {
        const newMedia = this.mediaRepository.create({
            ...createMediaDto,
            type_media: await this.parameterService.findOneBySlug(createMediaDto.typeMedia),
            [createMediaDto.userId ? 'user' : 'job']: { id: createMediaDto.userId ? createMediaDto.userId : createMediaDto.JobId },
        });
        const savedMedia = await this.mediaRepository.save(newMedia);
        return savedMedia;
    }
    async findOne(id) {
        return this.mediaRepository.findOne({ where: { id: id.toString() } });
    }
    async findAll() {
        return this.mediaRepository.find();
    }
    async getGalleryNounus(userId) {
        try {
            const NounuMedias = await this.mediaRepository.find({
                where: {
                    type_media: { slug: 'gallery-image' },
                    user: { id: userId }
                },
            });
            return NounuMedias;
        }
        catch (error) {
            console.log(error);
            throw new Error('Error while fetching gallery nounus');
        }
    }
    async update({ id, typeMedia }, updateMediaDto) {
        const media = await this.mediaRepository.find({ where: { user: { id }, type_media: { slug: typeMedia } } });
        if (!media) {
            throw new Error('Media not found');
        }
        for (let i = 0; i < media.length; i++) {
            const el = media[i];
            await this.mediaRepository.update(el.id, updateMediaDto);
        }
        return this.findOne(+id);
    }
    async deleteMany({ userId, typeMedia }) {
        await this.mediaRepository.delete({ user: { id: userId }, type_media: { slug: typeMedia } });
    }
    async deleteManyJob({ JobId, typeMedia }) {
        await this.mediaRepository.delete({ job: { id: +JobId }, type_media: { slug: typeMedia } });
    }
    async remove(id) {
        const media = await this.mediaRepository.findOne({ where: { id: id.toString() } });
        if (!media) {
            throw new Error('Media not found');
        }
        await this.mediaRepository.delete(id);
        return media;
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MEDIA_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        parameter_service_1.ParameterService])
], MediaService);
