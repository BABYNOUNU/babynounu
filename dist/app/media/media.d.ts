import { Medias } from './models/media.model';
import { DataSource } from 'typeorm';
export declare const MediaProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Medias>;
    inject: string[];
}[];
