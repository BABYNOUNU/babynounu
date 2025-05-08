import { DataSource } from 'typeorm';
import { Parameter } from './models/parameter.model';
export declare const ParameterProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Parameter>;
    inject: string[];
}[];
