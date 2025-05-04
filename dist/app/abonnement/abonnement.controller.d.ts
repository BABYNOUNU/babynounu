import { AbonnementService } from './abonnement.service';
import { CreateAbonnementDto } from './dtos/create-abonnement.dto';
export declare class AbonnementController {
    private readonly abonnementService;
    constructor(abonnementService: AbonnementService);
    createAbonnement(createAbonnementDto: CreateAbonnementDto): Promise<any>;
    getAbonnementById(abonnementId: string): Promise<import("./models/abonnement.model").Abonnements>;
    getAbonnementByUserId(userId: string): Promise<any>;
    hasActiveAbonnement(userId: string): Promise<{
        hasActiveSubscription: boolean;
    }>;
    cancelAbonnement(abonnementId: string): Promise<void>;
}
