import { Parameter } from "src/app/parameter/models/parameter.model";
import { User } from "src/app/user/user.model";
import { TypeParameter } from "src/app/parameter/models/parameter_type.model";
export declare class Preference {
    id: Number;
    parameter: Parameter[];
    parent: TypeParameter;
    user: User;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
