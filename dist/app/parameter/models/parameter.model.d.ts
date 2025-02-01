import { TypeParameter } from './parameter_type.model';
import { Preference } from 'src/app/Preference/models/preference.model';
import { User } from 'src/app/user/user.model';
export declare class Parameter {
    id: Number;
    title: string;
    type_parameter: TypeParameter;
    preference: Preference;
    user: User;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
