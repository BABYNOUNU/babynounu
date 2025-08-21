import { DataSource } from 'typeorm';
export declare const isProd: boolean;
export declare const HOST: string;
export declare const WS_HOST: string;
export declare const databaseProviders: {
    provide: string;
    useFactory: () => Promise<DataSource>;
}[];
