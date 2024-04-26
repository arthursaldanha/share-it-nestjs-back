import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ioc } from '@/contexts/shared/infra/ioc';
import {
  AppLogger,
  AxiosHttpClient,
  LoggingInterceptor,
  MySqlClient,
} from '@/contexts/bucket/infra/adapters';

@Module({
  providers: [
    {
      provide: ioc.infrastructure.adapters.logger,
      useClass: AppLogger,
    },
    {
      provide: APP_INTERCEPTOR,
      useFactory: (appLogger) => new LoggingInterceptor(appLogger),
      inject: [ioc.infrastructure.adapters.logger],
    },
    {
      provide: ioc.infrastructure.adapters.axiosHttpClient,
      useFactory: (appLogger) => new AxiosHttpClient(appLogger),
      inject: [ioc.infrastructure.adapters.logger],
    },
    {
      provide: ioc.infrastructure.adapters.mySqlClient,
      useFactory: () => {
        const client = new MySqlClient();
        client.connection;
        return client;
      },
    },
  ],
  exports: [
    ioc.infrastructure.adapters.logger,
    ioc.infrastructure.adapters.axiosHttpClient,
    ioc.infrastructure.adapters.mySqlClient,
  ],
})
export class AdaptersModule { }
