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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingGeneraleService = void 0;
const common_1 = require("@nestjs/common");
const slug_utils_1 = require("../../../utils/slug.utils");
let SettingGeneraleService = class SettingGeneraleService {
    constructor() { }
    async Verify_slug(Repository, { slug }) {
        const IsSlugExist = await Repository.findOne({
            where: { slug },
        });
        if (!IsSlugExist) {
            throw new common_1.BadRequestException({ message: 'Setting slug not exist' });
        }
    }
    async settings(Repository) {
        return await Repository.find();
    }
    async setting(Repository, { slug }) {
        return await Repository.find({ where: { slug: slug } });
    }
    async createSetting(Repository, { createSettingBody }) {
        const IsNameExist = await Repository.findOne({
            where: { name: createSettingBody.name.toLowerCase() },
        });
        if (IsNameExist) {
            throw new common_1.BadRequestException({ message: 'Setting name already exist' });
        }
        createSettingBody.slug = await new slug_utils_1.SlugUtils().all(createSettingBody.name, Repository);
        const newSetting = Repository.create({
            slug: createSettingBody.slug,
            name: createSettingBody.name,
            description: createSettingBody.description,
        });
        const settingSave = await Repository.save(newSetting);
        if (!settingSave) {
            throw new common_1.BadRequestException({ message: 'Setting not created' });
        }
        return {
            setting: {
                ...settingSave,
            },
        };
    }
    async updateSetting(Repository, { updateSettingBody }, { slug }) {
        await this.Verify_slug(Repository, { slug });
        const updateSetting = await Repository.update({ slug }, {
            name: updateSettingBody.name,
            description: updateSettingBody.description,
        });
        if (!updateSetting.affected) {
            throw new common_1.BadRequestException({ message: 'Setting not updated' });
        }
        return {
            setting: {
                ...(await Repository.findOne({ where: { slug: slug } })),
            },
        };
    }
    async deleteSetting(Repository, { slug }) {
        await this.Verify_slug(Repository, { slug });
        const deleteSetting = await Repository.delete({ slug });
        if (!deleteSetting.affected) {
            throw new common_1.BadRequestException({ message: 'Setting not deleted' });
        }
        return {
            setting: {
                slug,
                message: 'Setting deleted',
            },
        };
    }
};
exports.SettingGeneraleService = SettingGeneraleService;
exports.SettingGeneraleService = SettingGeneraleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SettingGeneraleService);
