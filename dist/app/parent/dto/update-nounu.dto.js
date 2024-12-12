"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNounuDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_parent_dto_1 = require("./create-parent.dto");
class UpdateNounuDto extends (0, mapped_types_1.PartialType)(create_parent_dto_1.CreateParentDto) {
}
exports.UpdateNounuDto = UpdateNounuDto;
