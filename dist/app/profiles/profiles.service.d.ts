import { Repository } from 'typeorm';
import { Profile } from './models/profile.model';
import { User } from '../user/user.model';
import { Preference } from '../Preference/models/preference.model';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { Parameter } from '../parameter/models/parameter.model';
export declare class ProfilesService {
    private readonly profileRepository;
    private readonly userRepository;
    private readonly parameterRepository;
    private readonly preferenceRepository;
    constructor(profileRepository: Repository<Profile>, userRepository: Repository<User>, parameterRepository: Repository<Parameter>, preferenceRepository: Repository<Preference>);
    createProfile(createProfileDto: CreateProfileDto): Promise<Profile>;
    updateProfile(id: number, updateProfileDto: UpdateProfileDto): Promise<Profile>;
    getProfileById(id: number): Promise<Profile>;
}
