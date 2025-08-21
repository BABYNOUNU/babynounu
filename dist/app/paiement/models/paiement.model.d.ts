import { Abonnements } from 'src/app/abonnement/models/abonnement.model';
import { User } from 'src/app/user/user.model';
export declare class Paiements {
    id: string;
    transaction_id: string;
    operator_id: string;
    payment_date: Date;
    amount: number;
    currency: string;
    status: string;
    payment_token: string;
    payment_type: string;
    paymentMethod: string;
    abonnement: Abonnements;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
