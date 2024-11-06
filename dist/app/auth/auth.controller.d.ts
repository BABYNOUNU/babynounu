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
            parent: import("../parent/models/parent.model").Parents;
            nounu: import("../nounu/models/nounu.model").Nounus;
            abonnement: import("../nounu/models/nounu.model").Nounus;
            role: import("../role/models/role.model").Roles;
        };
    }>;
    SignIn(signInBody: SginInAuthDto): Promise<{
        user: {
            access_token: string;
            id: string;
            slug: string;
            email: string;
            password: string;
            parent: import("../parent/models/parent.model").Parents;
            nounu: import("../nounu/models/nounu.model").Nounus;
            abonnement: import("../nounu/models/nounu.model").Nounus;
            role: import("../role/models/role.model").Roles;
        };
    }>;
}
