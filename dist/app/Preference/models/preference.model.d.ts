import { Parameter } from "src/app/parameter/models/parameter.model";
import { User } from "src/app/user/user.model";
export declare class Preference {
    id: Number;
    localization: Parameter[];
    user: User;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
