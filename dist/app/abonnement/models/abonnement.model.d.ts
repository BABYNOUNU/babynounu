import { Paiements } from 'src/app/paiement/models/paiement.model';
import { Parameter } from 'src/app/parameter/models/parameter.model';
import { User } from 'src/app/user/user.model';
export declare class Abonnements {
    id: string;
    paiement: Paiements;
    type: Parameter;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
