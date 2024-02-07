import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  const config = new DocumentBuilder()
    .setTitle('Authentication service')
    .setDescription(
      'login, logout,  register and verify user accounts using JWT tokens',
    )
    .setVersion('1.0')
    .addTag('users')
    .build();
  const swaggerPath = '/api';
  const swaggerCDN = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.7.2';
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, document, {
    customCssUrl: [`${swaggerCDN}/swagger-ui.css`],
    customJs: [
      `${swaggerCDN}/swagger-ui-bundle.js`,
      `${swaggerCDN}/swagger-ui-standalone-preset.js`,
    ],
  });

  await app.listen(process.env.AUTHENTICATION_PORT);
}
bootstrap();
