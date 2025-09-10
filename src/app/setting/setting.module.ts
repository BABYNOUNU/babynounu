import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { Roles } from '../role/models/role.model';
import { TypeParameter } from '../parameter/models/parameter_type.model';
import { Parameter } from '../parameter/models/parameter.model';
import { Abonnements } from '../abonnement/models/abonnement.model';
import { Notification } from '../notification/models/notification.model';
import { SettingProviders } from './setting';
import { DatabaseModule } from '../../database/database.module';
import { RoleModule } from '../role/role.module';
import { ParameterModule } from '../parameter/parameter.module';
import { AbonnementModule } from '../abonnement/abonnement.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    DatabaseModule,
    RoleModule,
    ParameterModule,
    AbonnementModule,
    NotificationModule,
    TypeOrmModule.forFeature([
      Roles,
      TypeParameter,
      Parameter,
      Abonnements,
      Notification
    ])
  ],
  controllers: [
    SettingController,
  ],
  providers: [SettingService, ...SettingProviders],
  exports: [SettingService, TypeOrmModule]
})
export class SettingModule {}
