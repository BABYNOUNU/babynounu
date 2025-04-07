import { Parents } from '../parent/models/parent.model';
import { Abonnements } from '../abonnement/models/abonnement.model';
import { Notification } from '../notification/models/notification.model';
import { Job } from '../job/models/job.model';
import { Paiements } from '../paiement/models/paiement.model';
import { JobApplication } from '../job-application/models/job-application.model';
import { Parameter } from '../parameter/models/parameter.model';
import { Nounus } from '../nounus/models/nounu.model';
import { Medias } from '../media/models/media.model';
import { Message } from '../messages/models/message.model';
export declare class User {
    id: string;
    slug: string;
    email: string;
    password: string;
    access_token: string;
    type_profil: Parameter;
    nounu: Nounus[];
    parent: Parents[];
    abonnement: Abonnements;
    medias: Medias[];
    notifications: Notification[];
    sentNotifications: Notification[];
    job_to_apply: JobApplication[];
    jobs: Job[];
    paiements: Paiements[];
    role: Parameter;
    messages: Message[];
}
