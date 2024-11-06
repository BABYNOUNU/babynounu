import { Nounus } from 'src/app/nounu/models/nounu.model';
import { Parents } from 'src/app/parent/models/parent.model';
export declare class Medias {
    id: string;
    url: string;
    size: number;
    type: string;
    is_profile: boolean;
    is_banner: boolean;
    is_galery: boolean;
    is_document: boolean;
    media_parent: Parents;
    media_nounu: Nounus;
}
