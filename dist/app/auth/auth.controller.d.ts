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
            nounu: import("../nounus/models/nounu.model").Nounus[];
            parent: import("../parent/models/parent.model").Parents[];
            abonnement: import("../abonnement/models/abonnement.model").Abonnements;
            medias: import("../media/models/media.model").Medias[];
            notifications: import("../notification/models/notification.model").Notification[];
            sentNotifications: import("../notification/models/notification.model").Notification[];
            conversations_sender: import("../chat/models/rooms.model").Rooms[];
            conversations_receiver: import("../chat/models/rooms.model").Rooms[];
            messages: import("../chat/models/rooms.model").Rooms[];
            job_to_apply: import("../job-application/models/job-application.model").JobApplication[];
            jobs: import("../job/models/job.model").Job[];
            paiements: import("../paiement/models/paiement.model").Paiements[];
            role: import("../parameter/models/parameter.model").Parameter;
        };
    }>;
    SignIn(signInBody: SginInAuthDto): Promise<{
        user: {
            access_token: string;
            profil: import("../nounus/models/nounu.model").Nounus[] | import("../parent/models/parent.model").Parents[];
            id: string;
            slug: string;
            email: string;
            password: string;
            type_profil: import("../parameter/models/parameter.model").Parameter;
            nounu: import("../nounus/models/nounu.model").Nounus[];
            parent: import("../parent/models/parent.model").Parents[];
            abonnement: import("../abonnement/models/abonnement.model").Abonnements;
            medias: import("../media/models/media.model").Medias[];
            notifications: import("../notification/models/notification.model").Notification[];
            sentNotifications: import("../notification/models/notification.model").Notification[];
            conversations_sender: import("../chat/models/rooms.model").Rooms[];
            conversations_receiver: import("../chat/models/rooms.model").Rooms[];
            messages: import("../chat/models/rooms.model").Rooms[];
            job_to_apply: import("../job-application/models/job-application.model").JobApplication[];
            jobs: import("../job/models/job.model").Job[];
            paiements: import("../paiement/models/paiement.model").Paiements[];
            role: import("../parameter/models/parameter.model").Parameter;
        };
    }>;
}
