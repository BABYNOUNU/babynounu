import { User } from 'src/app/user/user.model';
import { Repository } from 'typeorm';
export declare class SlugUtils {
    constructor();
    slug(text: string, Repository: Repository<User>): Promise<string>;
    all(text: string, Repository: Repository<any>): Promise<string>;
}
