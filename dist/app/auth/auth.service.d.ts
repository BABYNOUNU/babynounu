import { Repository } from 'typeorm';
import { User } from '../user/user.model';
import { SginInAuthDto } from './dto/signIn.dto';
import { SginUpAuthDto } from './dto/signUp.dto';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '../role/models/role.model';
export declare class AuthService {
    private readonly userRepository;
    private readonly roleRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, roleRepository: Repository<Roles>, jwtService: JwtService);
    signUp({ signUpBody }: {
        signUpBody: SginUpAuthDto;
    }): Promise<{
        user: {
            access_token: string;
            id: string;
            slug: string;
            email: string;
            password: string;
            parent: import("../parent/models/parent.model").Parents;
            nounu: import("../nounu/models/nounu.model").Nounus;
            abonnement: import("../nounu/models/nounu.model").Nounus;
            role: Roles;
        };
    }>;
    signIn({ signInBody }: {
        signInBody: SginInAuthDto;
    }): Promise<{
        user: {
            access_token: string;
            id: string;
            slug: string;
            email: string;
            password: string;
            parent: import("../parent/models/parent.model").Parents;
            nounu: import("../nounu/models/nounu.model").Nounus;
            abonnement: import("../nounu/models/nounu.model").Nounus;
            role: Roles;
        };
    }>;
    authentificate(user: User): Promise<{
        access_token: string;
    }>;
    isUserAuthentificateExist(email: any): Promise<User>;
}
