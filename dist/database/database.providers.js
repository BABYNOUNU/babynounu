"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = exports.HOST = exports.isProd = void 0;
const typeorm_1 = require("typeorm");
exports.isProd = true;
exports.HOST = exports.isProd ? 'https://api.babynounu.com' : 'http://localhost:3000';
const ProdDatabase = (dbProd, dbTest) => {
    return exports.isProd ? dbProd : dbTest;
};
exports.databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new typeorm_1.DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: ProdDatabase(process.env.DB_USERNAME, process.env.DB_USERNAME_LOCAL),
                password: ProdDatabase(process.env.DB_PASSWORD, process.env.DB_PASSWORD_LOCAL),
                database: ProdDatabase(process.env.DB_DATABASE, process.env.DB_DATABASE_LOCAL),
                entities: [
                    __dirname + '/../**/*.model{.ts,.js}',
                ],
                synchronize: true,
            });
            return dataSource.initialize();
        },
    },
];
