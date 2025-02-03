import { TypeParameter } from './parameter_type.model';
import { Preference } from 'src/app/Preference/models/preference.model';
import { Profile } from 'src/app/profiles/models/profile.model';
export declare class Parameter {
    id: Number;
    name: string;
    type_parameter: TypeParameter;
    preference: Preference;
    profiles: Profile;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
