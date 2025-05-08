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
exports.ParameterService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let ParameterService = class ParameterService {
    parameterRepository;
    constructor(parameterRepository) {
        this.parameterRepository = parameterRepository;
    }
    async findAll() {
        const parameters = await this.parameterRepository.find({
            relations: { type_parameter: true },
        });
        const parametersGroupedByType = parameters.reduce((acc, parameter) => {
            const type = parameter.type_parameter.slug;
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(parameter);
            return acc;
        }, {});
        return parametersGroupedByType;
    }
    async findAllBySlug(typeParmaSlug) {
        return this.parameterRepository.find({
            where: { type_parameter: { slug: typeParmaSlug } },
            relations: { type_parameter: true },
        });
    }
    async findOneBySlug(slug) {
        const parameter = await this.parameterRepository.findOne({
            where: { slug },
            relations: ['type_parameter'],
        });
        if (!parameter) {
            throw new common_1.NotFoundException(`Parameter with slug ${slug} not found`);
        }
        return parameter;
    }
    async findByType(typeParametre) {
        return this.parameterRepository.find({
            where: { type_parameter: typeParametre },
            relations: { type_parameter: true },
        });
    }
    async create(createParameterDto) {
    }
    async update(id, updateParameterDto) {
        const parameter = await this.parameterRepository.findOne({ where: { id } });
        if (!parameter) {
            throw new common_1.NotFoundException('Paramètre non trouvé');
        }
        Object.assign(parameter, updateParameterDto);
        return this.parameterRepository.save(parameter);
    }
    async remove(id) {
        const parameter = await this.parameterRepository.findOne({ where: { id } });
        if (!parameter) {
            throw new common_1.NotFoundException('Paramètre non trouvé');
        }
        return this.parameterRepository.remove(parameter);
    }
};
exports.ParameterService = ParameterService;
exports.ParameterService = ParameterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PARAMETER_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ParameterService);
