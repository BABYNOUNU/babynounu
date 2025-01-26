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
            type_profil: import("../setting/models/setting_type_profil.model").SettingTypeProfil;
            nounu: import("../nounu/models/nounu.model").Nounus;
            parent: import("../parent/models/parent.model").Parents;
            abonnement: import("../nounu/models/nounu.model").Nounus;
            notifications: import("../notification/models/notification.model").Notification[];
            jobs: import("../job/models/job.model").Job[];
            paiements: import("../paiement/models/paiement.model").Paiements[];
            role: import("../role/models/role.model").Roles;
        };
    }>;
    SignIn(signInBody: SginInAuthDto): Promise<{
        user: {
            access_token: string;
            profil: import("../nounu/models/nounu.model").Nounus | import("../parent/models/parent.model").Parents;
            id: string;
            slug: string;
            email: string;
            password: string;
            type_profil: import("../setting/models/setting_type_profil.model").SettingTypeProfil;
            nounu: import("../nounu/models/nounu.model").Nounus;
            parent: import("../parent/models/parent.model").Parents;
            abonnement: import("../nounu/models/nounu.model").Nounus;
            notifications: import("../notification/models/notification.model").Notification[];
            jobs: import("../job/models/job.model").Job[];
            paiements: import("../paiement/models/paiement.model").Paiements[];
            role: import("../role/models/role.model").Roles;
        };
    }>;
}
