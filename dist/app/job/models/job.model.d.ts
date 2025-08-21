import { User } from 'src/app/user/user.model';
import { Notification } from 'src/app/notification/models/notification.model';
import { JobApplication } from 'src/app/job-application/models/job-application.model';
import { Preference } from 'src/app/Preference/models/preference.model';
import { Medias } from 'src/app/media/models/media.model';
export declare class Job {
    id: number;
    titre: string;
    description: string;
    moyens_de_contact: string;
    combinaison_service: boolean;
    inclusWeekend: boolean;
    nombreEnfants?: string;
    experience_minimun: boolean;
    annee_experience?: string;
    tarifPropose: string;
    negociable: boolean;
    dateDebut: string;
    missionUrgente: boolean;
    descriptionComplementaire: string;
    preferences: Preference[];
    jobApplications: JobApplication[];
    notifications: Notification[];
    medias: Medias[];
    user: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
