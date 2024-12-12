import { Repository } from 'typeorm';
import { User } from '../user/user.model';
import { SginInAuthDto } from './dto/signIn.dto';
import { SginUpAuthDto } from './dto/signUp.dto';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '../role/models/role.model';
import { Nounus } from '../nounu/models/nounu.model';
import { SettingTypeProfil } from '../setting/models/setting_type_profil.model';
export declare class AuthService {
    private readonly userRepository;
    private readonly roleRepository;
    private readonly nounuRepository;
    private readonly parentRepository;
    private readonly settingTypeProfil;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, roleRepository: Repository<Roles>, nounuRepository: Repository<Nounus>, parentRepository: Repository<Nounus>, settingTypeProfil: Repository<SettingTypeProfil>, jwtService: JwtService);
    signUp({ signUpBody }: {
        signUpBody: SginUpAuthDto;
    }): Promise<{
        user: {
            access_token: string;
            id: string;
            slug: string;
            email: string;
            password: string;
            type_profil: SettingTypeProfil;
            nounu: Nounus;
            parent: import("../parent/models/parent.model").Parents;
            abonnement: Nounus;
            role: Roles;
        };
    }>;
    signIn({ signInBody }: {
        signInBody: SginInAuthDto;
    }): Promise<{
        user: {
            access_token: string;
            profil: Nounus | import("../parent/models/parent.model").Parents;
            id: string;
            slug: string;
            email: string;
            password: string;
            type_profil: SettingTypeProfil;
            nounu: Nounus;
            parent: import("../parent/models/parent.model").Parents;
            abonnement: Nounus;
            role: Roles;
        };
    }>;
    authentificate(user: User): Promise<{
        access_token: string;
    }>;
    isUserAuthentificateExist(email: any): Promise<User>;
}
