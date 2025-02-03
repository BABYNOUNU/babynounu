import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
export declare class ProfilesController {
    private readonly profilesService;
    constructor(profilesService: ProfilesService);
    createProfile(createProfileDto: CreateProfileDto, res: any): Promise<any>;
    updateProfile(id: number, updateProfileDto: UpdateProfileDto, res: any): Promise<any>;
    getProfileById(id: number, res: any): Promise<any>;
}
