"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const database_providers_1 = require("./database/database.providers");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        exceptionFactory: (validationErrors = []) => {
            return new common_1.BadRequestException(validationErrors.map((error) => ({
                path: error.property,
                message: Object.values(error.constraints).join(', '),
            })));
        },
    }));
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Your Api Bady Nounu')
        .addBearerAuth()
        .setDescription('Your API description')
        .setVersion('0.3.51')
        .addServer(database_providers_1.isProd ? 'https://api.babynounu.com/' : 'http://localhost:3000/', 'Local environment')
        .addServer('https://staging.yourapi.com/', 'Staging')
        .addServer('https://api.babynounu.com/', 'Production')
        .addTag('Baby Nounu')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
