import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { isProd } from './database/database.providers';
import { json as jsonParser } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Augmente la limite de la taille des requêtes

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((error) => ({
            path: error.property,
            message: Object.values(error.constraints).join(', '),
          })),
        );
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Your Api Bady Nounu')
    .addBearerAuth()
    .setDescription('Your API description')
    .setVersion('0.3.51')
    .addServer(
      isProd ? 'https://api.babynounu.com/' : 'http://localhost:3000/',
      'Local environment',
    )
    .addServer('https://staging.yourapi.com/', 'Staging')
    .addServer('https://api.babynounu.com/', 'Production')
    .addTag('Baby Nounu')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT || 3000);
} 
bootstrap();
