import { DataSource } from 'typeorm';
export declare const isProd: boolean;
export declare const HOST = "https://api.babynounu.com";
export declare const databaseProviders: {
    provide: string;
    useFactory: () => Promise<DataSource>;
}[];
