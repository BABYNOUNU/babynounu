import { Abonnements } from 'src/app/abonnement/models/abonnement.model';
import { User } from 'src/app/user/user.model';
export declare class Paiements {
    id: string;
    transaction_id: string;
    amount: number;
    currency: string;
    status: string;
    payment_token: string;
    paymentMethod: string;
    customer_name: string;
    customer_surname: string;
    customer_email: string;
    customer_phone_number: string;
    customer_address: string;
    customer_city: string;
    customer_country: string;
    customer_state: string;
    customer_zip_code: string;
    abonnement: Abonnements;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
