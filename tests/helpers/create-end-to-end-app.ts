import { HttpAdapterHost } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '@/contexts/shared/infra/modules/app.module';
import { AllExceptionsFilter } from '@/contexts/shared/infra/exceptions.filter';

export const createEndToEndApp = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  const httpAdapter = app.get(HttpAdapterHost);

  const logger = app.get(Logger);
  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, logger));

  app.init();
  return { app };
};
