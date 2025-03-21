import { Module } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { UserController } from './app/user/user.controller';
import { UserService } from './app/user/user.service';
import { AuthModule } from './app/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ParentModule } from './app/parent/parent.module';
import { PaiementModule } from './app/paiement/paiement.module';
import { SettingModule } from './app/setting/setting.module';
import { ChatModule } from './app/chat/chat.module';
import { NotificationModule } from './app/notification/notification.module';
import { MediaModule } from './app/media/media.module';
import { RoleModule } from './app/role/role.module';
import { AbonnementModule } from './app/abonnement/abonnement.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JobModule } from './app/job/job.module';
import { JobApplicationModule } from './app/job-application/job-application.module';
import { ParameterModule } from './app/parameter/parameter.module';
import { NounusModule } from './app/nounus/nounus.module';
import { NotificationGateway } from './app/notification/notification.gateway';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Dossier accessible publiquement
      serveRoot: '/uploads', // URL publique (http://localhost:3000/uploads)
    }), 
    UserModule,
    AuthModule,
    ParentModule,
    PaiementModule,
    SettingModule,
    ChatModule,
    NotificationModule,
    JobModule,
    MediaModule,
    RoleModule,
    AbonnementModule,
    JobModule,
    JobApplicationModule,
    ParameterModule,
    NounusModule
  ],
  controllers: [],
  providers: [],
  exports: []
})


export class AppModule {}
