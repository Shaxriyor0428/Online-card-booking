import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './logger/ali-exception';

async function start() {
  const PORT = process.env.PORT || 3333;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  app.useGlobalFilters(new AllExceptionsFilter(new Logger()));

  const config_swagger = new DocumentBuilder()
    .setTitle('Bank Card Online Application')
    .setDescription(
      'This project is an online card ordering system for banks, allowing clients to choose between digital and physical cards, track delivery, manage discounts, and securely store user and transaction information.',
    )
    .setVersion('7.0')
    .addTag('Nestjs, TypeOrm, Validation')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config_swagger);
  SwaggerModule.setup('api/docs', app, documentFactory);
  await app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
}

start();
