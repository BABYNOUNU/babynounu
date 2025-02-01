import { Repository } from 'typeorm';
import { Abonnements } from './models/abonnement.model';
import { CreateAbonnementDto } from './dtos/create-abonnement.dto';
import { NotificationGateway } from '../notification/notification.gateway';
export declare class AbonnementService {
    private readonly abonnementRepository;
    private readonly notificationGateway;
    constructor(abonnementRepository: Repository<Abonnements>, notificationGateway: NotificationGateway);
    createAbonnement(createAbonnementDto: CreateAbonnementDto): Promise<Abonnements>;
    getAbonnementsByUser(userId: string): Promise<Abonnements[]>;
    getAbonnementById(abonnementId: string): Promise<Abonnements>;
    hasActiveAbonnement(userId: string): Promise<boolean>;
}
