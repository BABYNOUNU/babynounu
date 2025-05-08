import { AuthService } from './auth.service';
import { SginInAuthDto } from './dto/signIn.dto';
import { SginUpAuthDto } from './dto/signUp.dto';
export declare class AuthController {
    private readonly AuthService;
    constructor(AuthService: AuthService);
    SignUp(signUpBody: SginUpAuthDto): Promise<{
        user: {
            access_token: string;
            id: string;
            slug: string;
            email: string;
            password: string;
            type_profil: import("../parameter/models/parameter.model").Parameter;
            nounu: import("../nounus/models/nounu.model").ProfilNounus[];
            parent: import("../parent/models/parent.model").ProfilParents[];
            abonnement: import("../abonnement/models/abonnement.model").Abonnements;
            medias: import("../media/models/media.model").Medias[];
            notifications: import("../notification/models/notification.model").Notification[];
            sentNotifications: import("../notification/models/notification.model").Notification[];
            job_to_apply: import("../job-application/models/job-application.model").JobApplication[];
            jobs: import("../job/models/job.model").Job[];
            paiements: import("../paiement/models/paiement.model").Paiements[];
            roomSender: import("../rooms/models/room.model").Rooms[];
            roomReceiver: import("../rooms/models/room.model").Rooms[];
            role: import("../parameter/models/parameter.model").Parameter;
            messages: import("../messages/models/message.model").Message[];
        };
    }>;
    SignIn(signInBody: SginInAuthDto): Promise<{
        user: {
            access_token: string;
            profil: import("../nounus/models/nounu.model").ProfilNounus[] | import("../parent/models/parent.model").ProfilParents[];
            id: string;
            slug: string;
            email: string;
            password: string;
            type_profil: import("../parameter/models/parameter.model").Parameter;
            nounu: import("../nounus/models/nounu.model").ProfilNounus[];
            parent: import("../parent/models/parent.model").ProfilParents[];
            abonnement: import("../abonnement/models/abonnement.model").Abonnements;
            medias: import("../media/models/media.model").Medias[];
            notifications: import("../notification/models/notification.model").Notification[];
            sentNotifications: import("../notification/models/notification.model").Notification[];
            job_to_apply: import("../job-application/models/job-application.model").JobApplication[];
            jobs: import("../job/models/job.model").Job[];
            paiements: import("../paiement/models/paiement.model").Paiements[];
            roomSender: import("../rooms/models/room.model").Rooms[];
            roomReceiver: import("../rooms/models/room.model").Rooms[];
            role: import("../parameter/models/parameter.model").Parameter;
            messages: import("../messages/models/message.model").Message[];
        };
    }>;
}
