"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNounuDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_nounu_dto_1 = require("./create-nounu.dto");
class UpdateNounuDto extends (0, mapped_types_1.PartialType)(create_nounu_dto_1.CreateNounuDto) {
}
exports.UpdateNounuDto = UpdateNounuDto;
