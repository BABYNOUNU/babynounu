import { NotificationService } from './../notification/notification.service';
import { Repository } from 'typeorm';
import { Abonnements } from './models/abonnement.model';
import { CreateAbonnementDto } from './dtos/create-abonnement.dto';
import { NotificationGateway } from '../notification/notification.gateway';
import { PaymentService } from '../paiement/paiement.service';
export declare class AbonnementService {
    private readonly abonnementRepository;
    private readonly paymentService;
    private readonly NotificationService;
    private readonly notificationGateway;
    constructor(abonnementRepository: Repository<Abonnements>, paymentService: PaymentService, NotificationService: NotificationService, notificationGateway: NotificationGateway);
    createAbonnement(createAbonnementDto: CreateAbonnementDto): Promise<Abonnements>;
    getAbonnementsByUser(userId: string): Promise<Abonnements[]>;
    getAbonnementById(abonnementId: string): Promise<Abonnements>;
    hasActiveAbonnement(userId: string): Promise<boolean>;
}
