import { AbonnementService } from './abonnement.service';
import { CreateAbonnementDto } from './dtos/create-abonnement.dto';
export declare class AbonnementController {
    private readonly abonnementService;
    constructor(abonnementService: AbonnementService);
    createAbonnement(createAbonnementDto: CreateAbonnementDto): Promise<import("./models/abonnement.model").Abonnements>;
    getAbonnementsByUser(userId: string): Promise<import("./models/abonnement.model").Abonnements[]>;
    getAbonnementById(abonnementId: string): Promise<import("./models/abonnement.model").Abonnements>;
    hasActiveAbonnement(userId: string): Promise<{
        hasActiveSubscription: boolean;
    }>;
}
