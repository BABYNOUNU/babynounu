import { Repository } from 'typeorm';
import { User } from '../user/user.model';
import { SginInAuthDto } from './dto/signIn.dto';
import { SginUpAuthDto } from './dto/signUp.dto';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '../role/models/role.model';
import { Parameter } from '../parameter/models/parameter.model';
import { Socket } from 'socket.io';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private readonly userRepository;
    private readonly roleRepository;
    private readonly paremeterProfileRepository;
    private readonly jwtService;
    private readonly userService;
    constructor(userRepository: Repository<User>, roleRepository: Repository<Roles>, paremeterProfileRepository: Repository<Parameter>, jwtService: JwtService, userService: UserService);
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
            role: Parameter;
            messages: import("../messages/models/message.model").Message[];
        };
    }>;
    signIn({ signInBody }: {
        signInBody: SginInAuthDto;
    }): Promise<{
        user: {
            access_token: string;
            profil: import("../nounus/models/nounu.model").ProfilNounus[] | import("../parent/models/parent.model").ProfilParents[];
            id: string;
            slug: string;
            email: string;
            password: string;
            type_profil: Parameter;
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
            role: Parameter;
            messages: import("../messages/models/message.model").Message[];
        };
    }>;
    authentificate(user: User): Promise<{
        access_token: string;
    }>;
    isUserAuthentificateExist(email: any): Promise<User>;
    getUserFromSocket(socket: Socket): Promise<User | null>;
}
