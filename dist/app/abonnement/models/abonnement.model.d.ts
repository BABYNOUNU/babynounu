import { Paiements } from 'src/app/paiement/models/paiement.model';
import { settingSubscriptionTypes } from 'src/app/setting/models/setting_subscription_type.model';
import { User } from 'src/app/user/user.model';
export declare class Abonnements {
    id: string;
    paiement: Paiements;
    type: settingSubscriptionTypes;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
