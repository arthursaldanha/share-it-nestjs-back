import { Module, DynamicModule, Global } from '@nestjs/common';
import { ioc } from '@/contexts/shared/infra/ioc';

@Global()
@Module({})
export class EnvironmentModule {
  static forRoot(): DynamicModule {
    return {
      module: EnvironmentModule,
      providers: [
        {
          provide: ioc.infrastructure.environment.databaseUrl,
          useValue: process.env['DATABASE_URL'],
        },
      ],
      exports: [ioc.infrastructure.environment.databaseUrl],
    };
  }
}
