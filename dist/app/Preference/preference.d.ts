import { DataSource } from "typeorm";
import { Preference } from './models/preference.model';
export declare const PreferenceProvider: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Preference>;
    inject: string[];
}[];
