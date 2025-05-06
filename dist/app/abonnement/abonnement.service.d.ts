import { NotificationService } from '../notification/notification.service';
import { Repository } from 'typeorm';
import { Abonnements } from './models/abonnement.model';
import { CreateAbonnementDto } from './dtos/create-abonnement.dto';
import { PaymentService } from '../paiement/paiement.service';
import { Paiements } from '../paiement/models/paiement.model';
import { NounusService } from '../nounus/nounus.service';
export declare class AbonnementService {
    private readonly abonnementRepository;
    private readonly paymentRepository;
    private readonly paymentService;
    private readonly notificationService;
    private readonly nounuService;
    private readonly SUBSCRIPTION_DURATION_DAYS;
    constructor(abonnementRepository: Repository<Abonnements>, paymentRepository: Repository<Paiements>, paymentService: PaymentService, notificationService: NotificationService, nounuService: NounusService);
    createPaymentPoint({ transactionId, userId, points }: {
        transactionId: any;
        userId: any;
        points: any;
    }): Promise<any>;
    createAbonnement(createAbonnementDto: CreateAbonnementDto): Promise<any>;
    private findPayment;
    private findExistingAbonnement;
    private validateCinetPayPayment;
    private createNewAbonnement;
    private sendSubscriptionNotification;
    private buildResponse;
    getAbonnementById(abonnementId: string): Promise<Abonnements>;
    getAbonnementByUserId(userId: string): Promise<any>;
    hasActiveAbonnement(userId: string): Promise<boolean>;
    private isSubscriptionActive;
    cancelAbonnement(abonnementId: string): Promise<void>;
}
