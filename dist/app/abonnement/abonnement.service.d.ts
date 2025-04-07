import { NotificationService } from '../notification/notification.service';
import { Repository } from 'typeorm';
import { Abonnements } from './models/abonnement.model';
import { CreateAbonnementDto } from './dtos/create-abonnement.dto';
import { PaymentService } from '../paiement/paiement.service';
import { Paiements } from '../paiement/models/paiement.model';
export declare class AbonnementService {
    private readonly abonnementRepository;
    private readonly paymentRepository;
    private readonly paymentService;
    private readonly notificationService;
    private readonly SUBSCRIPTION_DURATION_DAYS;
    constructor(abonnementRepository: Repository<Abonnements>, paymentRepository: Repository<Paiements>, paymentService: PaymentService, notificationService: NotificationService);
    createAbonnement(createAbonnementDto: CreateAbonnementDto): Promise<any>;
    private findPayment;
    private findExistingAbonnement;
    private validateCinetPayPayment;
    private createNewAbonnement;
    private sendSubscriptionNotification;
    private buildResponse;
    getAbonnementsByUser(userId: string): Promise<Abonnements[]>;
    getAbonnementById(abonnementId: string): Promise<Abonnements>;
    hasActiveAbonnement(userId: string): Promise<boolean>;
    private isSubscriptionActive;
}
