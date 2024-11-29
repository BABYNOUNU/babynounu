import { PartialType } from '@nestjs/mapped-types';
import { CreateNounuDto } from './create-nounu.dto';

export class UpdateNounuDto extends PartialType(CreateNounuDto) {}
