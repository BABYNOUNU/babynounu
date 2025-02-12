import { Repository } from 'typeorm';
import { User } from '../user/user.model';
import { SginInAuthDto } from './dto/signIn.dto';
import { SginUpAuthDto } from './dto/signUp.dto';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '../role/models/role.model';
import { Parameter } from '../parameter/models/parameter.model';
export declare class AuthService {
    private readonly userRepository;
    private readonly roleRepository;
    private readonly paremeterProfileRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, roleRepository: Repository<Roles>, paremeterProfileRepository: Repository<Parameter>, jwtService: JwtService);
    signUp({ signUpBody }: {
        signUpBody: SginUpAuthDto;
    }): Promise<{
        user: {
            access_token: string;
            id: string;
            slug: string;
            email: string;
            password: string;
            type_profil: Parameter;
            nounu: import("../nounus/models/nounu.model").Nounus;
            parent: import("../parent/models/parent.model").Parents;
            abonnement: import("../abonnement/models/abonnement.model").Abonnements;
            medias: import("../media/models/media.model").Medias[];
            notifications: import("../notification/models/notification.model").Notification[];
            sentNotifications: import("../notification/models/notification.model").Notification[];
            conversations: import("../chat/models/conversation.model").Conversation[];
            job_to_apply: import("../job-application/models/job-application.model").JobApplication[];
            jobs: import("../job/models/job.model").Job[];
            paiements: import("../paiement/models/paiement.model").Paiements[];
            role: Parameter;
        };
    }>;
    signIn({ signInBody }: {
        signInBody: SginInAuthDto;
    }): Promise<{
        user: {
            access_token: string;
            profil: import("../parent/models/parent.model").Parents;
            id: string;
            slug: string;
            email: string;
            password: string;
            type_profil: Parameter;
            nounu: import("../nounus/models/nounu.model").Nounus;
            parent: import("../parent/models/parent.model").Parents;
            abonnement: import("../abonnement/models/abonnement.model").Abonnements;
            medias: import("../media/models/media.model").Medias[];
            notifications: import("../notification/models/notification.model").Notification[];
            sentNotifications: import("../notification/models/notification.model").Notification[];
            conversations: import("../chat/models/conversation.model").Conversation[];
            job_to_apply: import("../job-application/models/job-application.model").JobApplication[];
            jobs: import("../job/models/job.model").Job[];
            paiements: import("../paiement/models/paiement.model").Paiements[];
            role: Parameter;
        };
    }>;
    authentificate(user: User): Promise<{
        access_token: string;
    }>;
    isUserAuthentificateExist(email: any): Promise<User>;
}
