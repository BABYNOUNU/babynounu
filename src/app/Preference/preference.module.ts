import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreferenceController } from './preference.controller';
import { PreferenceService } from './preference.service';
import { Preference } from './models/preference.model';
import { User } from '../user/user.model';
import { TypeParameter } from '../parameter/models/parameter_type.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Preference,
      User,
      TypeParameter
    ])
  ],
  controllers: [PreferenceController],
  providers: [PreferenceService],
  exports: [PreferenceService, TypeOrmModule]
})
export class PreferenceModule {}
