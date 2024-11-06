"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlugUtils = void 0;
const slugify_1 = require("slugify");
class SlugUtils {
    constructor() { }
    async slug(text, Repository) {
        let newSlug;
        const _slug = (0, slugify_1.default)(`${text}-${Math.random().toString().substr(2, 6)}`, {
            replacement: '-',
            lower: true,
            trim: true,
            strict: false,
        });
        do {
            newSlug = await Repository.findOne({
                where: { slug: _slug },
            });
        } while (newSlug);
        return _slug;
    }
    async all(text, Repository) {
        let newSlug;
        const _slug = (0, slugify_1.default)(`${text}-${Math.random().toString().substr(2, 6)}`, {
            replacement: '-',
            lower: true,
            trim: true,
            strict: false,
        });
        do {
            newSlug = await Repository.findOne({
                where: { slug: _slug },
            });
        } while (newSlug);
        return _slug;
    }
}
exports.SlugUtils = SlugUtils;
//# sourceMappingURL=slug.utils.js.map