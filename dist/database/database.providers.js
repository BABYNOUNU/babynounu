"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const process_1 = require("process");
const typeorm_1 = require("typeorm");
const isProd = true;
const ProdDatabase = (dbProd, dbTest) => {
    return isProd ? dbProd : dbTest;
};
exports.databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new typeorm_1.DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: ProdDatabase(process_1.env.DB_USERNAME, process_1.env.DB_USERNAME_LOCAL),
                password: ProdDatabase(process_1.env.DB_PASSWORD, process_1.env.DB_PASSWORD_LOCAL),
                database: ProdDatabase(process_1.env.DB_DATABASE, process_1.env.DB_DATABASE_LOCAL),
                entities: [
                    __dirname + '/../**/*.model{.ts,.js}',
                ],
                synchronize: true,
            });
            return dataSource.initialize();
        },
    },
];
//# sourceMappingURL=database.providers.js.map