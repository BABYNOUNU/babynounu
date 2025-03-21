import { NotificationService } from './../notification/notification.service';
import { Repository } from 'typeorm';
import { Abonnements } from './models/abonnement.model';
import { CreateAbonnementDto } from './dtos/create-abonnement.dto';
import { PaymentService } from '../paiement/paiement.service';
import { Paiements } from '../paiement/models/paiement.model';
export declare class AbonnementService {
    private readonly abonnementRepository;
    private readonly payRepository;
    private readonly paymentService;
    private readonly NotificationService;
    constructor(abonnementRepository: Repository<Abonnements>, payRepository: Repository<Paiements>, paymentService: PaymentService, NotificationService: NotificationService);
    createAbonnement(createAbonnementDto: CreateAbonnementDto): Promise<Abonnements>;
    getAbonnementsByUser(userId: string): Promise<Abonnements[]>;
    getAbonnementById(abonnementId: string): Promise<Abonnements>;
    hasActiveAbonnement(userId: string): Promise<boolean>;
}
