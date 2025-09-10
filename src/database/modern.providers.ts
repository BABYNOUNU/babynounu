import { TypeOrmModule } from '@nestjs/typeorm';

// Import all entities
import { User } from '../app/user/user.model';
import { ProfilParents } from '../app/parent/models/parent.model';
import { ProfilNounus } from '../app/nounus/models/nounu.model';
import { Roles } from '../app/role/models/role.model';
import { Parameter } from '../app/parameter/models/parameter.model';
import { TypeParameter } from '../app/parameter/models/parameter_type.model';
import { Preference } from '../app/Preference/models/preference.model';
import { Job } from '../app/job/models/job.model';
import { JobApplication } from '../app/job-application/models/job-application.model';
import { Notification } from '../app/notification/models/notification.model';
import { Abonnements } from '../app/abonnement/models/abonnement.model';
import { Paiements } from '../app/paiement/models/paiement.model';
import { Medias } from '../app/media/models/media.model';
import { Rooms } from '../app/rooms/models/room.model';
import { Message } from '../app/messages/models/message.model';
import { Settings } from '../app/setting/models/setting.model';
import { UpdateApp } from '../app/administrateur/models/updateApp.model';
import { Contracts } from '../app/contracts/models/contracts.model';
import { RoomMessageCount } from '../app/rooms/models/unreadCount.model';

// Entités principales
export const CoreEntities = [
  User,
  ProfilParents,
  ProfilNounus,
  Roles,
];

// Entités de paramétrage
export const ParameterEntities = [
  Parameter,
  TypeParameter,
  Preference,
];

// Entités de jobs et applications
export const JobEntities = [
  Job,
  JobApplication,
];

// Entités de notifications
export const NotificationEntities = [
  Notification,
];

// Entités de paiement et abonnement
export const PaymentEntities = [
  Abonnements,
  Paiements,
];

// Entités de média
export const MediaEntities = [
  Medias,
];

// Entités de chat et rooms
export const ChatEntities = [
  Rooms,
  Message,
  RoomMessageCount,
];

// Entités de configuration
export const ConfigEntities = [
  Settings,
  UpdateApp,
];

// Entités de contrats
export const ContractEntities = [
  Contracts,
];

// Toutes les entités
export const AllEntities = [
  ...CoreEntities,
  ...ParameterEntities,
  ...JobEntities,
  ...NotificationEntities,
  ...PaymentEntities,
  ...MediaEntities,
  ...ChatEntities,
  ...ConfigEntities,
  ...ContractEntities,
];

// Modules TypeORM pour chaque groupe d'entités
export const CoreTypeOrmModule = TypeOrmModule.forFeature(CoreEntities);
export const ParameterTypeOrmModule = TypeOrmModule.forFeature(ParameterEntities);
export const JobTypeOrmModule = TypeOrmModule.forFeature(JobEntities);
export const NotificationTypeOrmModule = TypeOrmModule.forFeature(NotificationEntities);
export const PaymentTypeOrmModule = TypeOrmModule.forFeature(PaymentEntities);
export const MediaTypeOrmModule = TypeOrmModule.forFeature(MediaEntities);
export const ChatTypeOrmModule = TypeOrmModule.forFeature(ChatEntities);
export const ConfigTypeOrmModule = TypeOrmModule.forFeature(ConfigEntities);
export const ContractTypeOrmModule = TypeOrmModule.forFeature(ContractEntities);

// Module complet avec toutes les entités
export const AllEntitiesTypeOrmModule = TypeOrmModule.forFeature(AllEntities);

// Helper pour créer des modules TypeORM personnalisés
export const createTypeOrmModule = (entities: any[]) => {
  return TypeOrmModule.forFeature(entities);
};

// Types pour l'injection de dépendances
export type EntityRepository<T> = import('typeorm').Repository<T>;

// Constantes pour l'injection
export const REPOSITORY_TOKENS = {
  USER: 'UserRepository',
  PARENT: 'ParentRepository',
  NOUNOU: 'NounouRepository',
  ROLE: 'RoleRepository',
  PARAMETER: 'ParameterRepository',
  TYPE_PARAMETER: 'TypeParameterRepository',
  PREFERENCE: 'PreferenceRepository',
  JOB: 'JobRepository',
  JOB_APPLICATION: 'JobApplicationRepository',
  NOTIFICATION: 'NotificationRepository',
  ABONNEMENT: 'AbonnementRepository',
  PAIEMENT: 'PaiementRepository',
  MEDIA: 'MediaRepository',
  ROOM: 'RoomRepository',
  MESSAGE: 'MessageRepository',
  SETTINGS: 'SettingsRepository',
  UPDATE_APP: 'UpdateAppRepository',
  CONTRACT: 'ContractRepository',
  ROOM_MESSAGE_COUNT: 'RoomMessageCountRepository',
} as const;

// Export des types
export type RepositoryToken = typeof REPOSITORY_TOKENS[keyof typeof REPOSITORY_TOKENS];